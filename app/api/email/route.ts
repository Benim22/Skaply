import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const {
      name,
      email,
      phone,
      company,
      website,
      service,
      serviceLevel,
      projectStart,
      budget,
      additionalServices,
      message
    } = body;

    // Hitta tjänstens fullständiga namn baserat på id
    const serviceNames: { [key: string]: string } = {
      web: "Webbutveckling",
      app: "Apputveckling",
      ai: "AI-lösningar",
      design: "Grafisk design",
      "digital-marketing": "Digital Marknadsföring",
      ecommerce: "E-handel"
    };

    // Hitta nivåns fullständiga namn baserat på id
    const levelNames: { [key: string]: string } = {
      basic: "Basic",
      standard: "Standard",
      premium: "Premium"
    };

    // Hitta tidsramsens fullständiga namn baserat på id
    const timeframeNames: { [key: string]: string } = {
      asap: "Så snart som möjligt",
      "within-month": "Inom en månad",
      "1-3-months": "1-3 månader",
      "3-6-months": "3-6 månader",
      planning: "Bara i planeringsstadiet"
    };

    // Hitta budgetens fullständiga namn baserat på id
    const budgetNames: { [key: string]: string } = {
      "under-10k": "Under 10 000 kr",
      "10k-25k": "10 000 - 25 000 kr",
      "25k-50k": "25 000 - 50 000 kr",
      "50k-100k": "50 000 - 100 000 kr",
      "over-100k": "Över 100 000 kr",
      "not-sure": "Osäker/Önskar rådgivning"
    };

    // Hitta tilläggstjänsternas fullständiga namn baserat på id
    const additionalServiceNames: { [key: string]: string } = {
      seo: "SEO-optimering",
      content: "Innehållsproduktion",
      hosting: "Hosting och underhåll",
      analytics: "Analys och uppföljning",
      training: "Utbildning",
      "ai-chatbot": "AI-chattbot för kundservice",
      multilingual: "Flerspråksstöd",
      newsletter: "Nyhetsbrevssystem",
      booking: "Bokningssystem",
      payment: "Betalningslösningar",
      "social-media": "Social media-integration",
      security: "Säkerhetsoptimering",
      accessibility: "Tillgänglighetsanpassning"
    };

    // Formatera tilläggstjänsterna som text
    const additionalServicesText = additionalServices && additionalServices.length > 0
      ? additionalServices.map(id => additionalServiceNames[id]).join(", ")
      : "Inga valda";

    // Skapa transportör för Nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT),
      secure: true,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD
      }
    });

    // Formatera e-postmeddelande
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO || "info@skaply.se",
      subject: `Ny konsultationsförfrågan från ${name}`,
      html: `
        <h1>Ny konsultationsförfrågan</h1>
        <h2>Projektdetaljer</h2>
        <p><strong>Tjänst:</strong> ${serviceNames[service] || service}</p>
        <p><strong>Paketnivå:</strong> ${levelNames[serviceLevel] || serviceLevel}</p>
        <p><strong>Projektstart:</strong> ${timeframeNames[projectStart] || projectStart}</p>
        <p><strong>Budget:</strong> ${budgetNames[budget] || budget}</p>
        <p><strong>Tilläggstjänster:</strong> ${additionalServicesText}</p>
        
        <h2>Kontaktuppgifter</h2>
        <p><strong>Namn:</strong> ${name}</p>
        <p><strong>E-post:</strong> ${email}</p>
        ${phone ? `<p><strong>Telefon:</strong> ${phone}</p>` : ''}
        ${company ? `<p><strong>Företag:</strong> ${company}</p>` : ''}
        ${website ? `<p><strong>Webbplats:</strong> ${website}</p>` : ''}
        
        <h2>Meddelande</h2>
        <p>${message.replace(/\\n/g, '<br>')}</p>
      `
    };

    // Skicka e-post
    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      status: 'success',
      message: 'E-post skickad framgångsrikt'
    });
  } catch (error) {
    console.error('E-postfel:', error);
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'Kunde inte skicka e-post',
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
} 