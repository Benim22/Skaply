-- Lägg till geografiska kolumner till page_views tabellen
ALTER TABLE page_views 
ADD COLUMN IF NOT EXISTS ip_address INET,
ADD COLUMN IF NOT EXISTS country_code TEXT,
ADD COLUMN IF NOT EXISTS country_name TEXT,
ADD COLUMN IF NOT EXISTS region TEXT,
ADD COLUMN IF NOT EXISTS city TEXT,
ADD COLUMN IF NOT EXISTS latitude DECIMAL(10,8),
ADD COLUMN IF NOT EXISTS longitude DECIMAL(11,8),
ADD COLUMN IF NOT EXISTS timezone TEXT;

-- Skapa index för geografiska sökningar
CREATE INDEX IF NOT EXISTS idx_page_views_country ON page_views(country_code);
CREATE INDEX IF NOT EXISTS idx_page_views_region ON page_views(region);
CREATE INDEX IF NOT EXISTS idx_page_views_city ON page_views(city);

-- Skapa tabell för aktiva sessioner (realtidsdata)
CREATE TABLE IF NOT EXISTS active_sessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    visitor_id TEXT NOT NULL,
    current_page TEXT NOT NULL,
    ip_address INET,
    country_code TEXT,
    country_name TEXT,
    user_agent TEXT,
    last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    session_start TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index för aktiva sessioner
CREATE INDEX IF NOT EXISTS idx_active_sessions_visitor_id ON active_sessions(visitor_id);
CREATE INDEX IF NOT EXISTS idx_active_sessions_last_activity ON active_sessions(last_activity);
CREATE INDEX IF NOT EXISTS idx_active_sessions_country ON active_sessions(country_code);

-- Funktion för att uppdatera aktiva sessioner
CREATE OR REPLACE FUNCTION update_active_session(
    p_visitor_id TEXT,
    p_current_page TEXT,
    p_ip_address INET DEFAULT NULL,
    p_country_code TEXT DEFAULT NULL,
    p_country_name TEXT DEFAULT NULL,
    p_user_agent TEXT DEFAULT NULL
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Uppdatera eller skapa aktiv session
    INSERT INTO active_sessions (
        visitor_id, 
        current_page, 
        ip_address, 
        country_code, 
        country_name, 
        user_agent, 
        last_activity
    )
    VALUES (
        p_visitor_id, 
        p_current_page, 
        p_ip_address, 
        p_country_code, 
        p_country_name, 
        p_user_agent, 
        NOW()
    )
    ON CONFLICT (visitor_id) 
    DO UPDATE SET
        current_page = EXCLUDED.current_page,
        ip_address = COALESCE(EXCLUDED.ip_address, active_sessions.ip_address),
        country_code = COALESCE(EXCLUDED.country_code, active_sessions.country_code),
        country_name = COALESCE(EXCLUDED.country_name, active_sessions.country_name),
        user_agent = COALESCE(EXCLUDED.user_agent, active_sessions.user_agent),
        last_activity = NOW();
END;
$$;

-- Funktion för att rensa gamla sessioner (äldre än 5 minuter)
CREATE OR REPLACE FUNCTION cleanup_inactive_sessions()
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    DELETE FROM active_sessions 
    WHERE last_activity < NOW() - INTERVAL '5 minutes';
    
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RETURN deleted_count;
END;
$$;

-- Funktion för att hämta realtidsdata
CREATE OR REPLACE FUNCTION get_realtime_analytics()
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    result JSON;
    active_visitors_count INTEGER := 0;
    recent_pageviews JSON := '[]'::JSON;
    visitors_by_country JSON := '[]'::JSON;
    active_pages JSON := '[]'::JSON;
BEGIN
    -- Rensa gamla sessioner först
    PERFORM cleanup_inactive_sessions();
    
    -- Räkna aktiva besökare
    SELECT COUNT(DISTINCT visitor_id)
    INTO active_visitors_count
    FROM active_sessions;
    
    -- Hämta senaste sidvisningar (senaste 10 minuterna)
    SELECT COALESCE(
        JSON_AGG(
            JSON_BUILD_OBJECT(
                'page', page_path,
                'country', country_name,
                'time', created_at,
                'visitor_id', LEFT(visitor_id, 8)
            ) ORDER BY created_at DESC
        ),
        '[]'::JSON
    )
    INTO recent_pageviews
    FROM page_views
    WHERE created_at >= NOW() - INTERVAL '10 minutes'
    LIMIT 20;
    
    -- Hämta besökare per land
    SELECT COALESCE(
        JSON_AGG(
            JSON_BUILD_OBJECT(
                'country_code', country_code,
                'country_name', country_name,
                'visitors', visitors
            ) ORDER BY visitors DESC
        ),
        '[]'::JSON
    )
    INTO visitors_by_country
    FROM (
        SELECT 
            country_code,
            country_name,
            COUNT(DISTINCT visitor_id) as visitors
        FROM active_sessions
        WHERE country_code IS NOT NULL
        GROUP BY country_code, country_name
        ORDER BY visitors DESC
        LIMIT 10
    ) countries;
    
    -- Hämta aktiva sidor
    SELECT COALESCE(
        JSON_AGG(
            JSON_BUILD_OBJECT(
                'page', current_page,
                'visitors', visitors
            ) ORDER BY visitors DESC
        ),
        '[]'::JSON
    )
    INTO active_pages
    FROM (
        SELECT 
            current_page,
            COUNT(DISTINCT visitor_id) as visitors
        FROM active_sessions
        GROUP BY current_page
        ORDER BY visitors DESC
        LIMIT 10
    ) pages;
    
    -- Bygg slutresultat
    result := JSON_BUILD_OBJECT(
        'active_visitors', active_visitors_count,
        'recent_pageviews', recent_pageviews,
        'visitors_by_country', visitors_by_country,
        'active_pages', active_pages
    );
    
    RETURN result;
END;
$$;

-- Funktion för att hämta geografisk statistik
CREATE OR REPLACE FUNCTION get_geographic_analytics(
    days_back INTEGER DEFAULT 30
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    result JSON;
    countries_data JSON := '[]'::JSON;
    cities_data JSON := '[]'::JSON;
    regions_data JSON := '[]'::JSON;
BEGIN
    -- Hämta länderstatistik
    SELECT COALESCE(
        JSON_AGG(
            JSON_BUILD_OBJECT(
                'country_code', country_code,
                'country_name', country_name,
                'visitors', visitors,
                'pageviews', pageviews
            ) ORDER BY visitors DESC
        ),
        '[]'::JSON
    )
    INTO countries_data
    FROM (
        SELECT 
            country_code,
            country_name,
            COUNT(DISTINCT visitor_id) as visitors,
            COUNT(*) as pageviews
        FROM page_views
        WHERE created_at >= NOW() - (days_back || ' days')::INTERVAL
        AND country_code IS NOT NULL
        GROUP BY country_code, country_name
        ORDER BY visitors DESC
        LIMIT 20
    ) countries;
    
    -- Hämta stadsstatistik
    SELECT COALESCE(
        JSON_AGG(
            JSON_BUILD_OBJECT(
                'city', city,
                'country', country_name,
                'visitors', visitors,
                'latitude', latitude,
                'longitude', longitude
            ) ORDER BY visitors DESC
        ),
        '[]'::JSON
    )
    INTO cities_data
    FROM (
        SELECT 
            city,
            country_name,
            COUNT(DISTINCT visitor_id) as visitors,
            AVG(latitude) as latitude,
            AVG(longitude) as longitude
        FROM page_views
        WHERE created_at >= NOW() - (days_back || ' days')::INTERVAL
        AND city IS NOT NULL
        AND latitude IS NOT NULL
        AND longitude IS NOT NULL
        GROUP BY city, country_name
        ORDER BY visitors DESC
        LIMIT 50
    ) cities;
    
    -- Hämta regionstatistik
    SELECT COALESCE(
        JSON_AGG(
            JSON_BUILD_OBJECT(
                'region', region,
                'country', country_name,
                'visitors', visitors
            ) ORDER BY visitors DESC
        ),
        '[]'::JSON
    )
    INTO regions_data
    FROM (
        SELECT 
            region,
            country_name,
            COUNT(DISTINCT visitor_id) as visitors
        FROM page_views
        WHERE created_at >= NOW() - (days_back || ' days')::INTERVAL
        AND region IS NOT NULL
        GROUP BY region, country_name
        ORDER BY visitors DESC
        LIMIT 20
    ) regions;
    
    -- Bygg slutresultat
    result := JSON_BUILD_OBJECT(
        'countries', countries_data,
        'cities', cities_data,
        'regions', regions_data
    );
    
    RETURN result;
END;
$$;

-- Ge behörigheter
GRANT EXECUTE ON FUNCTION update_active_session(TEXT, TEXT, INET, TEXT, TEXT, TEXT) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION cleanup_inactive_sessions() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION get_realtime_analytics() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION get_geographic_analytics(INTEGER) TO anon, authenticated;

-- Lägg till unik constraint för visitor_id i active_sessions
ALTER TABLE active_sessions DROP CONSTRAINT IF EXISTS unique_visitor_session;
ALTER TABLE active_sessions ADD CONSTRAINT unique_visitor_session UNIQUE (visitor_id); 