# Admin Setup Instruktioner

## Problem: Admin-inloggning fungerar inte

### Steg 1: Kör SQL-setup i Supabase

1. Gå till din Supabase-dashboard
2. Navigera till **SQL Editor**
3. Kör innehållet från `setup-admin-functions.sql`

### Steg 2: Verifiera att funktionerna skapades

Kör denna SQL för att kontrollera:

```sql
SELECT routine_name, routine_type 
FROM information_schema.routines 
WHERE routine_schema = 'public' 
AND routine_name LIKE '%admin%';
```

Du bör se:
- `verify_admin_password` (function)
- `update_admin_last_login` (function)

### Steg 3: Kontrollera admin_users tabellen

```sql
SELECT * FROM admin_users;
```

Du bör se en användare:
- Email: `admin@skaply.se`
- Lösenord: `admin123`

### Steg 4: Testa inloggningen

1. Gå till `/admin/login`
2. Logga in med:
   - Email: `admin@skaply.se`
   - Lösenord: `admin123`

### Steg 5: Kontrollera browser console

Öppna Developer Tools och kolla Console-fliken för debug-meddelanden som:
- "Attempting login for: admin@skaply.se"
- "Supabase response: ..."
- "Login successful, user set: ..."

## Vanliga problem:

### Problem 1: "Admin-funktioner är inte konfigurerade"
- Lösning: Kör `setup-admin-functions.sql` i Supabase SQL Editor

### Problem 2: "Felaktig e-post eller lösenord"
- Kontrollera att admin-användaren finns i databasen
- Kontrollera att lösenordet är korrekt hashat

### Problem 3: Redirectar inte till dashboard
- Kontrollera browser console för fel
- Kontrollera att AuthProvider är korrekt konfigurerad

### Problem 4: "supabaseUrl is required" (Vercel)
- Lägg till miljövariabler i Vercel:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Debug-tips:

1. **Kontrollera Supabase-anslutning:**
```javascript
console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
console.log('Supabase Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 10) + '...')
```

2. **Kontrollera localStorage:**
```javascript
console.log('Stored user:', localStorage.getItem('admin_user'))
```

3. **Manuell test av funktioner:**
```sql
SELECT * FROM verify_admin_password('admin@skaply.se', 'admin123');
``` 