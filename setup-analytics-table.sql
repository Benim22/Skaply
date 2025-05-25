-- Skapa tabell för besöksstatistik
CREATE TABLE IF NOT EXISTS page_views (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    page_path TEXT NOT NULL,
    visitor_id TEXT NOT NULL,
    user_agent TEXT,
    referrer TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Skapa index för snabbare sökningar
CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views(created_at);
CREATE INDEX IF NOT EXISTS idx_page_views_page_path ON page_views(page_path);

-- Skapa vy för daglig statistik
CREATE OR REPLACE VIEW daily_analytics AS
SELECT 
    DATE_TRUNC('day', created_at) AS date,
    page_path,
    COUNT(DISTINCT visitor_id) AS unique_visitors,
    COUNT(*) AS total_views
FROM page_views
GROUP BY DATE_TRUNC('day', created_at), page_path
ORDER BY date DESC;

-- Funktion för att hämta översiktsstatistik
CREATE OR REPLACE FUNCTION get_analytics_overview(
    days_back INTEGER DEFAULT 30
)
RETURNS TABLE (
    total_visitors INTEGER,
    total_pageviews INTEGER,
    most_viewed_pages JSONB,
    daily_stats JSONB
) 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN QUERY
    WITH stats AS (
        -- Totala besökare och sidvisningar
        SELECT 
            COUNT(DISTINCT visitor_id) as visitors,
            COUNT(*) as pageviews
        FROM page_views
        WHERE created_at >= NOW() - (days_back || ' days')::INTERVAL
    ),
    popular_pages AS (
        -- Mest besökta sidor
        SELECT 
            page_path,
            COUNT(*) as views,
            COUNT(DISTINCT visitor_id) as unique_visitors
        FROM page_views
        WHERE created_at >= NOW() - (days_back || ' days')::INTERVAL
        GROUP BY page_path
        ORDER BY views DESC
        LIMIT 5
    ),
    daily AS (
        -- Daglig statistik
        SELECT 
            DATE_TRUNC('day', created_at)::DATE as date,
            COUNT(DISTINCT visitor_id) as visitors,
            COUNT(*) as views
        FROM page_views
        WHERE created_at >= NOW() - (days_back || ' days')::INTERVAL
        GROUP BY DATE_TRUNC('day', created_at)
        ORDER BY date DESC
    )
    SELECT 
        stats.visitors,
        stats.pageviews,
        COALESCE(
            jsonb_agg(
                jsonb_build_object(
                    'page', popular_pages.page_path,
                    'views', popular_pages.views,
                    'unique_visitors', popular_pages.unique_visitors
                )
            ),
            '[]'::jsonb
        ) as most_viewed_pages,
        COALESCE(
            jsonb_agg(
                jsonb_build_object(
                    'date', daily.date,
                    'visitors', daily.visitors,
                    'views', daily.views
                )
            ),
            '[]'::jsonb
        ) as daily_stats
    FROM 
        stats,
        popular_pages,
        daily
    GROUP BY stats.visitors, stats.pageviews;
END;
$$;

-- Ge tillgång till funktionen för autentiserade användare
GRANT EXECUTE ON FUNCTION get_analytics_overview(INTEGER) TO authenticated; 