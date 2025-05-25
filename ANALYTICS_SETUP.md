# Analytics Setup - Skaply Admin Dashboard

## Problem: Analytics visar fel eller tom data

### Steg 1: Kör SQL-setup i Supabase

1. Gå till din Supabase-dashboard
2. Navigera till **SQL Editor**
3. Kör först innehållet från `setup-analytics-table.sql`
4. Sedan kör innehållet från `fix-analytics-function.sql`

### Steg 2: Verifiera att allt fungerar

Kör denna SQL för att testa funktionen:

```sql
SELECT * FROM get_analytics_overview(30);
```

Du bör få ett JSON-objekt med:
- `total_visitors`: antal unika besökare
- `total_pageviews`: totalt antal sidvisningar
- `most_viewed_pages`: array med mest besökta sidor
- `daily_stats`: array med daglig statistik

### Steg 3: Testa besöksspårning

1. Besök hemsidan (inte admin-sidan)
2. Navigera mellan olika sidor
3. Kontrollera att data sparas:

```sql
SELECT * FROM page_views ORDER BY created_at DESC LIMIT 10;
```

### Steg 4: Kontrollera admin-dashboard

1. Gå till `/admin`
2. Logga in
3. På "Översikt"-fliken bör du se analytics-data

## Funktioner som ingår:

### Besöksspårning
- ✅ Automatisk spårning av alla sidvisningar
- ✅ Unika besökare via cookies
- ✅ User-agent och referrer-information
- ✅ Ignorerar admin-sidor och statiska filer

### Analytics Dashboard
- ✅ Totalt antal unika besökare
- ✅ Totalt antal sidvisningar
- ✅ Trendanalys (förändring från föregående dag)
- ✅ Interaktiv graf över besökare över tid
- ✅ Lista över mest besökta sidor

### Datalagring
- ✅ Effektiv databasstruktur med index
- ✅ Automatisk aggregering av daglig statistik
- ✅ Flexibel tidsperiod (standard 30 dagar)

## Felsökning:

### Problem 1: "Error fetching analytics: {}"
- Lösning: Kör `fix-analytics-function.sql` i Supabase SQL Editor

### Problem 2: Ingen data visas
- Kontrollera att `page_views` tabellen har data
- Besök hemsidan för att generera testdata

### Problem 3: Middleware fungerar inte
- Kontrollera att `middleware.ts` finns i projektets rot
- Starta om utvecklingsservern

### Problem 4: Grafen visas inte
- Kontrollera att `recharts` är installerat
- Kontrollera browser console för fel

## Framtida förbättringar:

1. **Geografisk data** - Lägg till IP-baserad lokalisering
2. **Enhetstyper** - Spåra mobil vs desktop
3. **Realtidsdata** - Live-uppdateringar av statistik
4. **Exportfunktioner** - CSV/PDF-export av rapporter
5. **Avancerade filter** - Filtrera per datum, sida, etc.

## Säkerhet:

- Analytics-data är endast tillgänglig för inloggade admin-användare
- Besöksspårning använder anonyma UUID:er
- Ingen personlig information sparas (endast teknisk metadata) 