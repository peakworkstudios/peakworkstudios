// Vercel Serverless Function: Audit Results Submission

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
    const { name, email, agencySize, painPoint, scores, totalScore } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address.' });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const scoreRows = scores
      ? Object.entries(scores)
          .map(([category, score]) => `<tr><td style="padding:8px;border-bottom:1px solid #eee;">${category}</td><td style="padding:8px;border-bottom:1px solid #eee;text-align:center;">${score}/10</td></tr>`)
          .join('')
      : '';

    // Send results to the user
    await resend.emails.send({
      from: 'Peak Work Studios <no_reply@peakworkstudios.com>',
      to: email,
      subject: `Your Client Chaos Audit Results: ${totalScore}/100`,
      headers: {
        'List-Unsubscribe': '<mailto:no_reply@peakworkstudios.com?subject=unsubscribe>',
      },
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          <h1 style="color:#38bdf8;">Your Client Chaos Audit Results</h1>
          <p>Hi ${name},</p>
          <p>Thanks for completing the Client Chaos Audit. Here's your breakdown:</p>
          <h2 style="text-align:center;font-size:48px;color:#38bdf8;margin:24px 0;">${totalScore}/100</h2>
          ${scoreRows ? `<table style="width:100%;border-collapse:collapse;margin:24px 0;"><thead><tr><th style="text-align:left;padding:8px;border-bottom:2px solid #38bdf8;">Category</th><th style="text-align:center;padding:8px;border-bottom:2px solid #38bdf8;">Score</th></tr></thead><tbody>${scoreRows}</tbody></table>` : ''}
          <p>Want to talk through your results? <a href="https://calendly.com/peakworkstudios/30min" style="color:#38bdf8;">Book a free 30-minute audit call</a>.</p>
          <hr style="border:none;border-top:1px solid #eee;margin:24px 0;" />
          <p style="color:#999;font-size:12px;margin:8px 0;"><a href="mailto:no_reply@peakworkstudios.com?subject=unsubscribe" style="color:#999;text-decoration:none;">Unsubscribe from emails</a></p>
          <p style="color:#999;font-size:12px;margin-top:8px;">Peak Work Studios &middot; Calgary, Canada</p>
        </div>
      `,
    });

    // Notify yourself
    await resend.emails.send({
      from: 'Peak Work Studios <no_reply@peakworkstudios.com>',
      to: 'kunal.deshmukh@hotmail.com',
      subject: `New Audit Submission: ${name} (${totalScore}/100)`,
      headers: {
        'List-Unsubscribe': '<mailto:no_reply@peakworkstudios.com?subject=unsubscribe>',
      },
      html: `
        <h2>New Audit Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Agency Size:</strong> ${agencySize || 'Not provided'}</p>
        <p><strong>Pain Point:</strong> ${painPoint || 'Not provided'}</p>
        <p><strong>Total Score:</strong> ${totalScore}/100</p>
        ${scoreRows ? `<table style="width:100%;border-collapse:collapse;margin:16px 0;"><thead><tr><th style="text-align:left;padding:8px;border-bottom:2px solid #38bdf8;">Category</th><th style="text-align:center;padding:8px;border-bottom:2px solid #38bdf8;">Score</th></tr></thead><tbody>${scoreRows}</tbody></table>` : ''}
        <hr style="border:none;border-top:1px solid #eee;margin:24px 0;" />
        <p style="font-size:12px;color:#999;margin:8px 0;"><a href="mailto:no_reply@peakworkstudios.com?subject=unsubscribe" style="color:#999;text-decoration:none;">Unsubscribe from notifications</a></p>
      `,
    });

    return res.status(200).json({ success: true, message: 'Audit results sent successfully.' });
  } catch (error) {
    console.error('Audit submission error:', error);
    return res.status(500).json({ error: 'Internal server error. Please try again.' });
  }
}
