# Realtidsdata och Geografisk Analys - Setup

## Översikt
Vi har nu implementerat avancerad analytics med realtidsdata och geografisk spårning för admin-dashboarden.

## Steg 1: Kör SQL-setup i Supabase

1. Gå till din Supabase-dashboard
2. Navigera till **SQL Editor**
3. Kör först `clean-analytics-function.sql` (om du inte redan gjort det)
4. Sedan kör `setup-realtime-geo-analytics.sql`

## Steg 2: Testa funktionaliteten

### Testa realtidsdata:
```sql
SELECT * FROM get_realtime_analytics();
```

### Testa geografisk data:
```sql
SELECT * FROM get_geographic_analytics(30);
```

### Kontrollera aktiva sessioner:
```sql
SELECT * FROM active_sessions;
```

## Nya funktioner:

### 🔴 Realtidsdata
- **Aktiva besökare just nu** - Visar antal besökare som är aktiva (senaste 5 minuterna)
- **Live-feed av sidvisningar** - Realtidsuppdateringar av senaste sidvisningar
- **Aktiva besökare per land** - Geografisk fördelning av aktiva besökare
- **Mest aktiva sidor** - Vilka sidor som besöks mest just nu
- **Automatisk uppdatering** - Data uppdateras var 30:e sekund

### 🌍 Geografisk analys
- **Interaktiv världskarta** - Visar besökare på en världskarta med markörer
- **Besökare per land** - Detaljerad statistik per land med flaggor
- **Besökare per stad** - Stadsvis fördelning med koordinater
- **Besökare per region** - Regional statistik
- **Heatmap-funktionalitet** - Markörer som ändrar storlek baserat på antal besökare

### 📊 Förbättrad spårning
- **IP-baserad geolokalisering** - Automatisk identifiering av land/stad
- **Sessionshantering** - Spårar aktiva sessioner i realtid
- **Optimerad API-användning** - Cachar geografisk data för att spara API-anrop
- **Automatisk rensning** - Tar bort inaktiva sessioner äldre än 5 minuter

## Teknisk implementation:

### Middleware-förbättringar:
- Hämtar verklig IP-adress från olika headers
- Integrerar med ipapi.co för geografisk data
- Uppdaterar både page_views och active_sessions
- Cachar geo-data för att undvika onödiga API-anrop

### Nya databastabeller:
- `active_sessions` - Spårar aktiva besökare
- Utökad `page_views` med geografiska kolumner

### React-komponenter:
- `RealtimeAnalytics` - Realtidsdata med auto-uppdatering
- `GeographicAnalytics` - Geografisk analys med flikar
- `WorldMap` - Interaktiv karta med Leaflet

## Säkerhet och prestanda:

### API-begränsningar:
- ipapi.co: 1000 gratis requests/dag
- Cachar geo-data för att minimera API-anrop
- Endast nya IP-adresser triggar geo-lookup

### Databasprestanda:
- Index på alla geografiska kolumner
- Automatisk rensning av gamla sessioner
- Optimerade SQL-frågor med COALESCE

### Realtidsuppdateringar:
- 30 sekunders intervall för att balansera prestanda
- Endast aktiva sessioner (senaste 5 minuterna)
- Effektiv datahantering med JSON-aggregering

## Felsökning:

### Problem 1: Kartan visas inte
- Kontrollera att Leaflet CSS laddas korrekt
- Kontrollera browser console för JavaScript-fel
- Starta om utvecklingsservern

### Problem 2: Ingen geografisk data
- Kontrollera att middleware körs korrekt
- Besök hemsidan från olika IP-adresser
- Kontrollera ipapi.co API-status

### Problem 3: Realtidsdata uppdateras inte
- Kontrollera att active_sessions tabellen får data
- Kontrollera browser console för fel
- Verifiera att cleanup-funktionen körs

### Problem 4: Middleware fungerar inte
- Kontrollera att middleware.ts finns i projektets rot
- Starta om utvecklingsservern
- Kontrollera att matcher-konfigurationen är korrekt

## Framtida förbättringar:

1. **WebSocket-integration** - Riktigt realtidsdata utan polling
2. **Avancerade filter** - Filtrera data per tidsperiod, land, etc.
3. **Export-funktioner** - Exportera geografisk data till CSV/PDF
4. **Alertsystem** - Notifikationer vid höga besökssiffror
5. **A/B-testning** - Spåra olika versioner av sidor
6. **Konverteringsspårning** - Spåra mål och konverteringar
7. **Bot-detektion** - Filtrera bort bot-trafik
8. **GDPR-compliance** - Anonymisering av IP-adresser

## Miljövariabler (valfritt):

För produktionsmiljö kan du lägga till:
```env
# Alternativ geo-API (om du vill använda en annan tjänst)
GEO_API_KEY=your_api_key_here
GEO_API_URL=https://api.alternative-service.com
```

## Användning:

1. **Gå till Admin Dashboard** (`/admin`)
2. **Klicka på "Realtidsdata"** för att se aktiva besökare
3. **Klicka på "Geografisk data"** för att se världskartan
4. **Data uppdateras automatiskt** var 30:e sekund för realtidsdata

Denna implementation ger dig professionell analytics-funktionalitet som konkurrerar med Google Analytics för grundläggande spårning! 