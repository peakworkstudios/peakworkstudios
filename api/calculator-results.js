// Vercel Serverless Function: Calculator Results Email

import { Resend } from 'resend';

const formatCurrency = (value) => {
  const num = Number(value);
  if (!Number.isFinite(num)) return '$0';
  return `$${Math.round(num).toLocaleString('en-US')}`;
};

const safeText = (value) => String(value ?? '').replace(/[<>]/g, '');

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
    const {
      email,
      teamSize,
      hourlyRate,
      clients,
      totalAnnualCost,
      potentialSavings,
      remainingCost,
      categoryBreakdown,
    } = req.body || {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ error: 'Valid email is required.' });
    }

    const breakdownRows = Array.isArray(categoryBreakdown)
      ? categoryBreakdown
          .map((cat) => {
            const label = safeText(cat.label);
            const annualCost = formatCurrency(cat.annualCost);
            return `
              <tr>
                <td style="padding:8px;border-bottom:1px solid #eee;">${label}</td>
                <td style="padding:8px;border-bottom:1px solid #eee;text-align:right;">${annualCost}/yr</td>
              </tr>
            `;
          })
          .join('')
      : '';

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'Peak Work Studios <no_reply@peakworkstudios.com>',
      to: email,
      subject: 'Your Delivery Cost Results',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;">
          <h1 style="color:#38bdf8;">Your Delivery Cost Results</h1>
          <p>Here is a summary of your calculator inputs and estimated costs.</p>
          <table style="width:100%;border-collapse:collapse;margin:16px 0;">
            <tbody>
              <tr>
                <td style="padding:8px;border-bottom:1px solid #eee;">Team size</td>
                <td style="padding:8px;border-bottom:1px solid #eee;text-align:right;">${safeText(teamSize)}</td>
              </tr>
              <tr>
                <td style="padding:8px;border-bottom:1px solid #eee;">Hourly rate</td>
                <td style="padding:8px;border-bottom:1px solid #eee;text-align:right;">$${safeText(hourlyRate)}</td>
              </tr>
              <tr>
                <td style="padding:8px;border-bottom:1px solid #eee;">Active clients</td>
                <td style="padding:8px;border-bottom:1px solid #eee;text-align:right;">${safeText(clients)}</td>
              </tr>
              <tr>
                <td style="padding:8px;border-bottom:1px solid #eee;">Estimated annual cost</td>
                <td style="padding:8px;border-bottom:1px solid #eee;text-align:right;">${formatCurrency(totalAnnualCost)}</td>
              </tr>
              <tr>
                <td style="padding:8px;border-bottom:1px solid #eee;">Potential savings (up to 70%)</td>
                <td style="padding:8px;border-bottom:1px solid #eee;text-align:right;">${formatCurrency(potentialSavings)}</td>
              </tr>
              <tr>
                <td style="padding:8px;border-bottom:1px solid #eee;">Remaining cost</td>
                <td style="padding:8px;border-bottom:1px solid #eee;text-align:right;">${formatCurrency(remainingCost)}</td>
              </tr>
            </tbody>
          </table>
          ${breakdownRows ? `
            <h2 style="font-size:18px;margin:24px 0 12px;">Category Breakdown</h2>
            <table style="width:100%;border-collapse:collapse;">
              <thead>
                <tr>
                  <th style="text-align:left;padding:8px;border-bottom:2px solid #38bdf8;">Category</th>
                  <th style="text-align:right;padding:8px;border-bottom:2px solid #38bdf8;">Annual Cost</th>
                </tr>
              </thead>
              <tbody>
                ${breakdownRows}
              </tbody>
            </table>
          ` : ''}
          <p style="margin-top:24px;">If you want the full automation roadmap, book a free audit call.</p>
          <p><a href="https://peakworkstudios.com/contact" style="color:#38bdf8;">Book your audit</a></p>
          <p style="color:#999;font-size:12px;margin-top:32px;">Peak Work Studios · Calgary, Canada</p>
        </div>
      `,
    });

    return res.status(200).json({ success: true, message: 'Results sent successfully.' });
  } catch (error) {
    console.error('Calculator results error:', error);
    return res.status(500).json({ error: 'Internal server error. Please try again.' });
  }
}
