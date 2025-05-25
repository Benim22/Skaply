# Admin Login Setup - Skaply

## Översikt
Nu har admin-panelen en säker inloggningsfunktion med hashade lösenord och autentisering.

## Steg 1: Kör SQL för admin-användare

### 1.1 Kör admin-user-setup.sql
1. Gå till SQL Editor i din Supabase dashboard
2. Kopiera hela innehållet från `admin-user-setup.sql`
3. Klistra in och kör SQL-koden

### 1.2 Fixa login-funktionen (om det finns problem)
Om du får login-fel, kör även `fix-admin-login.sql`:
1. Kopiera innehållet från `fix-admin-login.sql`
2. Kör SQL-koden i Supabase SQL Editor

### 1.3 Fixa RLS policies (om admin-panelen inte kan spara data)
Om du kan logga in men inte spara/uppdatera data, kör `fix-admin-rls-simple.sql`:
1. Kopiera innehållet från `fix-admin-rls-simple.sql`
2. Kör SQL-koden i Supabase SQL Editor

Detta kommer att:
- ✅ Aktivera pgcrypto extension för lösenordshashing
- ✅ Lägga till password_hash kolumn i admin_users tabellen
- ✅ Skapa din admin-användare med hashad lösenord
- ✅ Skapa förbättrade funktioner för lösenordsverifiering och login-tracking
- ✅ Sätta korrekta behörigheter för RPC-funktioner

## Steg 2: Testa inloggningen

### 2.1 Navigera till login-sidan
Gå till: `http://localhost:3000/admin/login`

### 2.2 Logga in med dina uppgifter
- **E-post:** lukage22@gmail.com
- **Lösenord:** Benim123

## Funktioner

### Säkerhet
- ✅ Bcrypt-hashade lösenord
- ✅ Säkra Supabase RPC-funktioner
- ✅ Session-hantering med localStorage
- ✅ Automatisk redirect till login om ej autentiserad
- ✅ Skyddade admin-routes

### Användarupplevelse
- ✅ Modern login-design med Skaply-tema
- ✅ Visa/dölj lösenord-funktion
- ✅ Loading-states och felhantering
- ✅ Toast-meddelanden för feedback
- ✅ Användarinfo i admin-panelen
- ✅ Säker utloggning

### Admin Dashboard
- ✅ Visar inloggad användares namn och roll
- ✅ Säker logout-funktion
- ✅ Skyddad åtkomst till alla admin-funktioner

## Databasstruktur

### Nya kolumner i admin_users
- `password_hash` - Bcrypt-hashad lösenord

### Nya funktioner
- `verify_admin_password()` - Verifierar lösenord säkert
- `update_admin_last_login()` - Uppdaterar senaste inloggning

## Säkerhetsaspekter

### Lösenordshantering
- Lösenord hashas med bcrypt (gen_salt('bf'))
- Inga lösenord lagras i klartext
- Säker verifiering via Supabase RPC

### Session-hantering
- Användardata lagras i localStorage
- Automatisk redirect vid ej autentiserad åtkomst
- Säker logout som rensar all session-data

### Databassäkerhet
- RPC-funktioner med SECURITY DEFINER
- Begränsad åtkomst till admin_users tabellen
- Automatisk tracking av last_login

## Framtida förbättringar
- [ ] JWT-tokens istället för localStorage
- [ ] Lösenordsåterställning via e-post
- [ ] Tvåfaktorsautentisering (2FA)
- [ ] Session timeout
- [ ] Audit log för admin-aktiviteter
- [ ] Rollbaserade behörigheter

## Felsökning

### Kan inte logga in
1. Kontrollera att `admin-user-setup.sql` har körts
2. Verifiera att pgcrypto extension är aktiverad
3. Kontrollera Supabase-anslutningen i .env.local

### Redirect-loop
1. Rensa localStorage: `localStorage.clear()`
2. Kontrollera att AuthProvider är korrekt implementerad

### RPC-funktioner fungerar inte
1. Kontrollera att funktionerna finns i Supabase
2. Verifiera att SECURITY DEFINER är satt
3. Kontrollera Supabase-behörigheter

## Support
För frågor eller problem, kontakta utvecklingsteamet. 