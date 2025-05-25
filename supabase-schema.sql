-- Supabase SQL Schema för Skaply
-- Skapad för att hantera innehåll via admin dashboard

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- PROJEKT TABELL
-- =====================================================
CREATE TABLE IF NOT EXISTS projects (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    technologies TEXT[] NOT NULL DEFAULT '{}',
    project_link VARCHAR(500),
    featured BOOLEAN DEFAULT false,
    client VARCHAR(255),
    year VARCHAR(4),
    status VARCHAR(50) CHECK (status IN ('Pågående', 'Färdig', 'Pausad')),
    secondary_category VARCHAR(100),
    progress INTEGER CHECK (progress >= 0 AND progress <= 100),
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Index för snabbare queries
CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_projects_featured ON projects(featured);
CREATE INDEX idx_projects_status ON projects(status);

-- =====================================================
-- TJÄNSTER TABELL
-- =====================================================
CREATE TABLE IF NOT EXISTS services (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    service_id VARCHAR(50) UNIQUE NOT NULL, -- t.ex. 'web-development', 'app-development'
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    icon_name VARCHAR(50) NOT NULL, -- namn på Lucide icon
    color_from VARCHAR(7) NOT NULL, -- hex färg för gradient start
    color_to VARCHAR(7) NOT NULL, -- hex färg för gradient slut
    features TEXT[] NOT NULL DEFAULT '{}',
    technologies TEXT[] NOT NULL DEFAULT '{}',
    pricing_basic VARCHAR(50),
    pricing_standard VARCHAR(50),
    pricing_premium VARCHAR(50),
    pricing_hourly VARCHAR(50),
    pricing_description TEXT,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- =====================================================
-- FAQ TABELL
-- =====================================================
CREATE TABLE IF NOT EXISTS faq_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category VARCHAR(100), -- för att kunna gruppera FAQs
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- =====================================================
-- TESTIMONIALS TABELL
-- =====================================================
CREATE TABLE IF NOT EXISTS testimonials (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    initials VARCHAR(5) NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
    avatar_url VARCHAR(500), -- om ni vill lägga till profilbilder senare
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- =====================================================
-- NYHETSBREV PRENUMERATIONER TABELL
-- =====================================================
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT true,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    unsubscribed_at TIMESTAMP WITH TIME ZONE,
    ip_address INET, -- för att spåra spam
    source VARCHAR(100), -- var prenumerationen kom från (t.ex. 'homepage', 'blog')
    tags TEXT[] DEFAULT '{}', -- för segmentering
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Index för email lookups
CREATE INDEX idx_newsletter_email ON newsletter_subscriptions(email);
CREATE INDEX idx_newsletter_active ON newsletter_subscriptions(is_active);

-- =====================================================
-- ADMIN ANVÄNDARE TABELL (för admin dashboard)
-- =====================================================
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin', 'editor')),
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- =====================================================
-- TRIGGERS FÖR UPDATED_AT
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Skapa triggers för alla tabeller
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_faq_items_updated_at BEFORE UPDATE ON faq_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_newsletter_subscriptions_updated_at BEFORE UPDATE ON newsletter_subscriptions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================
-- Aktivera RLS för alla tabeller
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Policies för public read access (alla kan läsa)
CREATE POLICY "Public can read active projects" ON projects
    FOR SELECT USING (true);

CREATE POLICY "Public can read active services" ON services
    FOR SELECT USING (is_active = true);

CREATE POLICY "Public can read active FAQs" ON faq_items
    FOR SELECT USING (is_active = true);

CREATE POLICY "Public can read active testimonials" ON testimonials
    FOR SELECT USING (is_active = true);

-- Policy för newsletter subscriptions (endast insert för public)
CREATE POLICY "Public can subscribe to newsletter" ON newsletter_subscriptions
    FOR INSERT WITH CHECK (true);

-- Admin policies (kräver autentisering)
CREATE POLICY "Admins can do everything on projects" ON projects
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can do everything on services" ON services
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can do everything on faq_items" ON faq_items
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can do everything on testimonials" ON testimonials
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can do everything on newsletter_subscriptions" ON newsletter_subscriptions
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can read admin_users" ON admin_users
    FOR SELECT USING (auth.role() = 'authenticated');

-- =====================================================
-- EXEMPEL DATA (valfritt - ta bort om du inte vill ha det)
-- =====================================================
-- Lägg till befintliga projekt från koden
INSERT INTO projects (title, description, category, image_url, technologies, project_link, featured, client, year, status, progress, sort_order) VALUES
('Barberhaus', 'Komplett webbplattform för premium barberupplevelse byggd med Next.js och Tailwind CSS. Implementerade responsiv design, React Context API för flerspråksstöd, avancerat bokningssystem med Supabase-databas och JWT-autentisering. Designen kombinerar modern UI med klassiska barbertraditioner genom skräddarsydda animationer och optimerad användarupplevelse.', 'Webbutveckling', '/barberhaus.png', ARRAY['Next.js', 'Tailwind CSS', 'React', 'Vercel'], 'https://barberhaus.vercel.app/', true, 'Barberhaus Stockholm', '2025', 'Färdig', NULL, 1),
('MaxCor', 'Modern webbplats för byggföretaget MaxCor AB med elegant design och användarvänligt gränssnitt. Presenterar företagets totalentreprenadtjänster inom renovering, nybyggnation och projektledning. Implementerad med Next.js och TypeScript för optimal prestanda och SEO.', 'Webbutveckling', '/placeholders/placeholder-maxcor.png', ARRAY['Next.js', 'TypeScript', 'Tailwind CSS', 'Shadcn/UI', 'Framer Motion', 'Vercel'], 'https://max-cor.vercel.app/', true, 'MaxCor AB', '2025', 'Pågående', 75, 2),
('Moi Sushi & Pokébowl', 'Moi Sushi & Pokébowl är en mobilapplikation utvecklad för restaurangen Moi i Trelleborg, med målet att digitalisera och förbättra kundupplevelsen. Appen erbjuder en interaktiv meny där användare kan bläddra bland rätter, filtrera efter allergener och se detaljerad näringsinformation.', 'Apputveckling', '/placeholders/placeholder-moi.png', ARRAY['React Native', 'Expo', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Shadcn/ui'], 'https://github.com/Benim22/Moi-app', true, 'Moi Sushi & Pokébowl', '2025', 'Pågående', 75, 3);

-- Lägg till befintliga FAQ från koden
INSERT INTO faq_items (question, answer, sort_order) VALUES
('Vilka typer av företag arbetar ni med?', 'Vi arbetar med företag i alla storlekar, från startup till storföretag. Våra lösningar anpassas efter era specifika behov och mål. Vi har erfarenhet från olika branscher som e-handel, tjänsteföretag, fintech och många andra.', 1),
('Hur lång tid tar det att utveckla en webbplats?', 'Utvecklingstiden varierar beroende på projektets omfattning och komplexitet. En enklare webbplats kan ta 4-6 veckor, medan mer komplexa lösningar som e-handelsplattformar kan ta 2-4 månader. Vi diskuterar alltid tidslinjen i detalj under vårt första möte.', 2),
('Hur ser er utvecklingsprocess ut?', 'Vi följer en agil utvecklingsmetodik med iterativa leveranser. Processen börjar med en discovery-fas där vi definierar mål och krav, följt av design, utveckling, testning och lansering. Efter lansering erbjuder vi löpande förvaltning och vidareutveckling.', 3),
('Använder ni några specifika teknologier?', 'Vi specialiserar oss på moderna JavaScript-ramverk som React, Next.js och React Native. För backend använder vi ofta Node.js och Supabase. Vårt teknikval baseras alltid på vad som passar bäst för ert specifika projekt och långsiktiga behov.', 4),
('Hur prissätter ni era tjänster?', 'Vi erbjuder transparent prissättning baserat på projektets omfattning och komplexitet. För de flesta projekt arbetar vi med fast pris efter en grundlig behovsanalys. Vi erbjuder även löpande tim-baserade avtal för kontinuerligt samarbete och vidareutveckling.', 5),
('Erbjuder ni support efter lansering?', 'Ja, vi erbjuder olika nivåer av support och underhåll efter lansering. Detta kan inkludera teknisk support, innehållsuppdateringar, säkerhetsuppdateringar och prestanda-optimeringar. Vi skräddarsyr supportavtal efter era behov.', 6);

-- Lägg till befintliga testimonials från koden
INSERT INTO testimonials (name, company, content, initials, rating, sort_order) VALUES
('Anna Johansson', 'TechStart AB', 'Skaply hjälpte oss att bygga en modern webbplats som verkligen representerar vårt varumärke. Deras tekniska kunskap och kreativa lösningar överträffade våra förväntningar.', 'AJ', 5, 1),
('Erik Lindberg', 'Innovate Solutions', 'Vi anlitade Skaply för att utveckla vår företagsapp och resultatet blev fantastiskt. Appen är snabb, användarvänlig och har fått mycket positiv feedback från våra kunder.', 'EL', 5, 2),
('Maria Svensson', 'Digital Growth', 'Skaply levererade en AI-chatbot som har revolutionerat vår kundtjänst. Deras förståelse för våra behov och tekniska kompetens var imponerande.', 'MS', 4, 3); 