// Vercel Serverless Function: Contact Form Submission

import { Resend } from 'resend';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, agencyName, teamSize, clientCount, painPoint, source, website } = req.body;

    // Honeypot check
    if (website) {
      return res.status(200).json({ success: true });
    }

    // Basic validation
    if (!name || !email || !painPoint) {
      return res.status(400).json({ error: 'Name, email, and pain point are required.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address.' });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'Peak Work Studios <no_reply@peakworkstudios.com>',
      to: 'kunal.deshmukh@hotmail.com',
      subject: `New Contact: ${name} from ${agencyName || 'Unknown Agency'}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Agency:</strong> ${agencyName || 'Not provided'}</p>
        <p><strong>Team Size:</strong> ${teamSize || 'Not provided'}</p>
        <p><strong>Active Clients:</strong> ${clientCount || 'Not provided'}</p>
        <p><strong>Pain Point:</strong> ${painPoint}</p>
        <p><strong>Source:</strong> ${source || 'Not provided'}</p>
      `,
    });

    return res.status(200).json({ success: true, message: 'Form submitted successfully.' });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ error: 'Internal server error. Please try again.' });
  }
}
