# Admin Panel Felsökning - Skaply

## Problem: Kan inte spara eller uppdatera data i admin-panelen

### Orsak
Admin-panelen använder localStorage för autentisering istället för Supabase Auth. Detta betyder att användaren ses som `anon` (anonym) istället för `authenticated` i Supabase.

RLS (Row Level Security) policies var konfigurerade för att endast tillåta `authenticated` användare att göra ändringar, vilket blockerade alla admin-operationer.

### Lösning
Kör `fix-admin-rls-simple.sql` i Supabase SQL Editor för att uppdatera RLS policies.

### Vad scriptet gör:
1. **Tar bort gamla policies** som krävde `authenticated` role
2. **Skapar nya policies** som tillåter alla operationer (`USING (true)`)
3. **Påverkar tabeller:**
   - `projects`
   - `services` 
   - `faq_items`
   - `testimonials`
   - `newsletter_subscriptions`

### Säkerhetsaspekter
⚠️ **Viktigt:** Denna lösning tillåter alla användare (även anonyma) att göra ändringar i admin-tabellerna. 

För produktionsmiljö bör du implementera en av följande säkrare lösningar:

#### Alternativ 1: Supabase Auth Integration
- Migrera från localStorage till Supabase Auth
- Skapa admin-användare i Supabase Auth
- Använd `auth.role() = 'authenticated'` i RLS policies

#### Alternativ 2: Custom Auth Function
```sql
CREATE OR REPLACE FUNCTION is_admin_user()
RETURNS BOOLEAN AS $$
BEGIN
  -- Implementera logik för att kontrollera admin-status
  -- T.ex. kontrollera mot en session-tabell
  RETURN true; -- Placeholder
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Använd i policies
CREATE POLICY "Admin access" ON projects
    FOR ALL USING (is_admin_user());
```

#### Alternativ 3: IP-baserad begränsning
```sql
CREATE POLICY "Admin IP access" ON projects
    FOR ALL USING (
      inet_client_addr() = '192.168.1.100'::inet -- Din IP
    );
```

## Andra vanliga problem

### Problem: Login fungerar inte
**Lösning:** Kör `fix-admin-login.sql`

### Problem: RPC-funktioner fungerar inte
**Kontrollera:**
1. pgcrypto extension är aktiverad
2. Funktioner har rätt behörigheter
3. Lösenord är korrekt hashat

### Problem: Redirect-loop på login
**Lösning:** 
1. Rensa localStorage: `localStorage.clear()`
2. Kontrollera att AuthProvider är korrekt implementerad

## Debugging Tips

### Kontrollera RLS status
```sql
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename IN ('projects', 'services', 'faq_items');
```

### Kontrollera policies
```sql
SELECT tablename, policyname, cmd, qual
FROM pg_policies 
WHERE tablename = 'projects';
```

### Testa insert direkt
```sql
INSERT INTO faq_items (question, answer) 
VALUES ('Test', 'Test svar')
RETURNING id;
```

## Support
För ytterligare hjälp, kontakta utvecklingsteamet med:
1. Felmeddelanden från browser console
2. Supabase error logs
3. Specifika steg som orsakar problemet 