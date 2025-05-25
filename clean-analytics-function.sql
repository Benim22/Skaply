DROP FUNCTION IF EXISTS get_analytics_overview(integer);

CREATE OR REPLACE FUNCTION get_analytics_overview(
    days_back INTEGER DEFAULT 30
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    result JSON;
    total_visitors_count INTEGER := 0;
    total_pageviews_count INTEGER := 0;
    popular_pages_json JSON := '[]'::JSON;
    daily_stats_json JSON := '[]'::JSON;
BEGIN
    SELECT 
        COUNT(DISTINCT visitor_id),
        COUNT(*)
    INTO total_visitors_count, total_pageviews_count
    FROM page_views
    WHERE created_at >= NOW() - (days_back || ' days')::INTERVAL;

    SELECT COALESCE(
        JSON_AGG(
            JSON_BUILD_OBJECT(
                'page', page_path,
                'views', views,
                'unique_visitors', unique_visitors
            )
        ),
        '[]'::JSON
    )
    INTO popular_pages_json
    FROM (
        SELECT 
            page_path,
            COUNT(*) as views,
            COUNT(DISTINCT visitor_id) as unique_visitors
        FROM page_views
        WHERE created_at >= NOW() - (days_back || ' days')::INTERVAL
        GROUP BY page_path
        ORDER BY views DESC
        LIMIT 5
    ) popular;

    SELECT COALESCE(
        JSON_AGG(
            JSON_BUILD_OBJECT(
                'date', date,
                'visitors', visitors,
                'views', views
            ) ORDER BY date DESC
        ),
        '[]'::JSON
    )
    INTO daily_stats_json
    FROM (
        SELECT 
            DATE_TRUNC('day', created_at)::DATE as date,
            COUNT(DISTINCT visitor_id) as visitors,
            COUNT(*) as views
        FROM page_views
        WHERE created_at >= NOW() - (days_back || ' days')::INTERVAL
        GROUP BY DATE_TRUNC('day', created_at)
        ORDER BY date DESC
    ) daily;

    result := JSON_BUILD_OBJECT(
        'total_visitors', total_visitors_count,
        'total_pageviews', total_pageviews_count,
        'most_viewed_pages', popular_pages_json,
        'daily_stats', daily_stats_json
    );

    RETURN result;
END;
$$;

GRANT EXECUTE ON FUNCTION get_analytics_overview(INTEGER) TO anon, authenticated; 