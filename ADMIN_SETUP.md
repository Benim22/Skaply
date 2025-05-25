# Admin Dashboard Setup - Skaply

## Översikt
Detta är en komplett admin dashboard för att hantera innehåll på Skaply webbplats. Du kan enkelt lägga till, redigera och ta bort projekt, tjänster, FAQ och testimonials.

## Steg 1: Supabase Setup

### 1.1 Skapa Supabase projekt
1. Gå till [supabase.com](https://supabase.com)
2. Skapa ett nytt projekt
3. Kopiera din Project URL och Anon Key

### 1.2 Kör SQL Schema
1. Gå till SQL Editor i din Supabase dashboard
2. Kopiera hela innehållet från `supabase-schema.sql`
3. Klistra in och kör SQL-koden

### 1.3 Miljövariabler
Skapa en `.env.local` fil i projektets rot med:

```
NEXT_PUBLIC_SUPABASE_URL=din_supabase_projekt_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=din_supabase_anon_key
```

## Steg 2: Installera Dependencies
```bash
npm install @supabase/supabase-js --legacy-peer-deps
```

## Steg 3: Starta utvecklingsservern
```bash
npm run dev
```

## Steg 4: Åtkomst till Admin Dashboard
Navigera till: `http://localhost:3000/admin`

## Funktioner

### Projekt
- ✅ Lägg till nya projekt
- ✅ Redigera befintliga projekt
- ✅ Ta bort projekt
- ✅ Markera som utvalt projekt
- ✅ Sätt status (Pågående, Färdig, Pausad)
- ✅ Progress tracking för pågående projekt

### Tjänster
- ✅ Hantera tjänster med prissättning
- ✅ Färggradienter för visuell design
- ✅ Lucide ikoner
- ✅ Funktioner och teknologier
- ✅ Aktivera/inaktivera tjänster

### FAQ
- ✅ Lägg till vanliga frågor
- ✅ Kategorisera frågor
- ✅ Sorteringsordning
- ✅ Aktivera/inaktivera frågor

### Testimonials/Omdömen
- ✅ Hantera kundomdömen
- ✅ Stjärnbetyg (1-5)
- ✅ Automatisk generering av initialer
- ✅ Markera som utvalt omdöme

### Nyhetsbrev
- ✅ Visa alla prenumeranter
- ✅ Exportera till CSV
- ✅ Avprenumerera/återprenumerera
- ✅ Sökfunktion
- ✅ Statistik över aktiva/inaktiva

## Säkerhet

### Row Level Security (RLS)
- ✅ Publika läsrättigheter för aktiva poster
- ✅ Admin-rättigheter för alla operationer
- ✅ Säker hantering av nyhetsbrev-prenumerationer

### Policies
- Alla kan läsa aktiva projekt, tjänster, FAQ och testimonials
- Endast autentiserade användare kan skapa/uppdatera/ta bort
- Publika användare kan endast prenumerera på nyhetsbrev

## Databasstruktur

### Tabeller
1. **projects** - Projekt med teknologier, status, progress
2. **services** - Tjänster med prissättning och funktioner
3. **faq_items** - Vanliga frågor med kategorier
4. **testimonials** - Kundomdömen med betyg
5. **newsletter_subscriptions** - Nyhetsbrev-prenumerationer
6. **admin_users** - Admin-användare (för framtida autentisering)

### Automatiska funktioner
- ✅ UUID primärnycklar
- ✅ Automatiska timestamps (created_at, updated_at)
- ✅ Triggers för uppdatering av updated_at
- ✅ Index för prestanda

## Framtida förbättringar
- [ ] Autentisering för admin-användare
- [ ] Bilduppladdning till Supabase Storage
- [ ] Bulk-operationer
- [ ] Drag & drop sortering
- [ ] Email-mallar för nyhetsbrev
- [ ] Analytics dashboard

## Support
För frågor eller problem, kontakta utvecklingsteamet. 