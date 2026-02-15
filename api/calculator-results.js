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
      subject: 'Your Hidden Cost Analysis — Peak Work Studios',
      headers: {
        'List-Unsubscribe': '<mailto:no_reply@peakworkstudios.com?subject=unsubscribe>',
      },
      html: `
        <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;">
          <div style="text-align:center;margin-bottom:24px;padding-bottom:24px;border-bottom:2px solid #38bdf8;">
            <div style="font-size:24px;font-weight:800;color:#38bdf8;margin-bottom:4px;">Peak Work Studios</div>
            <div style="font-size:14px;color:#6b7280;">Hidden Cost Analysis</div>
          </div>

          <div style="background:linear-gradient(135deg, rgba(56,189,248,0.08), rgba(56,189,248,0.05));border:1px solid rgba(56,189,248,0.25);border-radius:12px;padding:20px;margin-bottom:32px;text-align:center;">
            <div style="font-size:16px;font-weight:700;color:#1a1a1a;margin-bottom:8px;">Ready for the full automation roadmap?</div>
            <a href="https://peakworkstudios.com/contact" style="display:inline-block;background:#38bdf8;color:#000;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">Book Your Free Audit</a>
          </div>

          <h1 style="color:#38bdf8;margin:0 0 8px;font-size:20px;">Your Delivery Cost Results</h1>
          <h2 style="font-size:48px;font-weight:800;color:#ef4444;letter-spacing:-2px;margin:16px 0;">${formatCurrency(totalAnnualCost)}</h2>
          <p style="font-size:14px;color:#6b7280;margin-bottom:16px;">per year in hidden costs</p>

          <table style="width:100%;border-collapse:collapse;margin:24px 0;background:#f9fafb;border-radius:8px;overflow:hidden;">
            <tbody>
              <tr>
                <td style="padding:14px 16px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#1a1a1a;">Team size</td>
                <td style="padding:14px 16px;border-bottom:1px solid #e5e7eb;text-align:right;font-weight:600;color:#38bdf8;">${safeText(teamSize)} people</td>
              </tr>
              <tr>
                <td style="padding:14px 16px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#1a1a1a;">Hourly rate</td>
                <td style="padding:14px 16px;border-bottom:1px solid #e5e7eb;text-align:right;font-weight:600;color:#38bdf8;">${formatCurrency(hourlyRate)}/hr</td>
              </tr>
              <tr>
                <td style="padding:14px 16px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#1a1a1a;">Active clients</td>
                <td style="padding:14px 16px;border-bottom:1px solid #e5e7eb;text-align:right;font-weight:600;color:#38bdf8;">${safeText(clients)}</td>
              </tr>
              <tr>
                <td style="padding:14px 16px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#1a1a1a;">Potential savings (70%)</td>
                <td style="padding:14px 16px;border-bottom:1px solid #e5e7eb;text-align:right;font-weight:600;color:#22c55e;">${formatCurrency(potentialSavings)}/yr</td>
              </tr>
              <tr>
                <td style="padding:14px 16px;font-weight:600;color:#1a1a1a;">Remaining cost</td>
                <td style="padding:14px 16px;text-align:right;font-weight:600;color:#38bdf8;">${formatCurrency(remainingCost)}/yr</td>
              </tr>
            </tbody>
          </table>

          ${breakdownRows ? '<h3 style="font-size:16px;font-weight:700;color:#1a1a1a;margin:24px 0 12px;">Cost Breakdown by Category</h3><table style="width:100%;border-collapse:collapse;margin:0 0 24px;background:#f9fafb;border-radius:8px;overflow:hidden;"><tbody>' + breakdownRows + '</tbody></table>' : ''}

          <p style="margin-top:24px;">If you want the full automation roadmap, book a free audit call.</p>
          <p><a href="https://peakworkstudios.com/contact" style="color:#38bdf8;">Book your audit</a></p>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;" />
          <p style="font-size:12px;color:#6b7280;margin:8px 0;"><a href="mailto:no_reply@peakworkstudios.com?subject=unsubscribe" style="color:#6b7280;text-decoration:none;">Unsubscribe from emails</a></p>
          <p style="color:#999;font-size:12px;margin-top:8px;">Peak Work Studios · Calgary, Canada</p>
        </div>
      `,
    });

    return res.status(200).json({ success: true, message: 'Results sent successfully.' });
  } catch (error) {
    console.error('Calculator results error:', error);
    return res.status(500).json({ error: 'Internal server error. Please try again.' });
  }
}
