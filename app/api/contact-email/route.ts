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
      message
    } = body;

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
      subject: `Nytt kontaktformulär från ${name}`,
      html: `
        <h1>Nytt meddelande från kontaktformuläret</h1>
        
        <h2>Kontaktuppgifter</h2>
        <p><strong>Namn:</strong> ${name}</p>
        <p><strong>E-post:</strong> ${email}</p>
        ${phone ? `<p><strong>Telefon:</strong> ${phone}</p>` : ''}
        ${company ? `<p><strong>Företag:</strong> ${company}</p>` : ''}
        
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