# Lägg till tjänster i databasen

För att lägga till exempel-tjänster i services-tabellen, kör följande SQL-kommando i Supabase SQL Editor:

## Steg 1: Kör SQL-filen
Kopiera innehållet från `add-sample-services.sql` och kör det i Supabase SQL Editor.

## Steg 2: Verifiera att tjänsterna har lagts till
```sql
SELECT service_id, title, pricing_basic, pricing_standard, is_active 
FROM services 
ORDER BY sort_order;
```

## Vad som läggs till:
- **Webbutveckling** - Skräddarsydda webbplatser och webbapplikationer
- **Apputveckling** - Mobilapplikationer för iOS och Android  
- **UI/UX Design** - Användarcentrerad design
- **Digital Marknadsföring** - Strategisk digital marknadsföring
- **E-handelslösningar** - Kompletta e-handelslösningar
- **Underhåll & Support** - Kontinuerligt underhåll och teknisk support

Varje tjänst innehåller:
- Titel och beskrivning
- Ikon och färggradienter
- Lista med funktioner
- Lista med teknologier
- Prissättning (basic, standard, premium, hourly)
- Prisbeskrivning

Efter att ha kört SQL-kommandot kommer tjänsterna att visas i admin-panelen under "Tjänster" och på frontend i tjänstesektionen. 