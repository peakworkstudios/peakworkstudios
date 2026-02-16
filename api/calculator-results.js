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
          .map((cat, idx) => {
            const label = safeText(cat.label);
            const annualCost = formatCurrency(cat.annualCost);
            const bgColor = idx % 2 === 0 ? '#f1f5f9' : '#ffffff';
            return `
              <tr style="background:${bgColor};">
                <td style="padding:12px 16px;border-bottom:1px solid #e2e8f0;font-size:13px;color:#475569;">${label}</td>
                <td style="padding:12px 16px;border-bottom:1px solid #e2e8f0;text-align:right;font-weight:700;color:#ef4444;font-size:14px;">${annualCost}/yr</td>
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
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;max-width:640px;margin:0 auto;background:#ffffff;">
          <!-- Header -->
          <div style="text-align:center;padding:32px 24px;background:linear-gradient(135deg, #0c4a6e 0%, #075985 100%);border-bottom:4px solid #38bdf8;">
            <div style="font-size:28px;font-weight:800;color:#38bdf8;margin-bottom:6px;letter-spacing:-0.5px;">Peak Work Studios</div>
            <div style="font-size:15px;color:#e0f2fe;font-weight:500;">Your Hidden Cost Analysis</div>
          </div>

          <!-- CTA Box -->
          <div style="background:#f0f9ff;border-left:4px solid #38bdf8;padding:24px;margin:24px 24px 32px;border-radius:8px;">
            <div style="font-size:17px;font-weight:700;color:#0c4a6e;margin-bottom:12px;">Ready to reclaim this lost time?</div>
            <p style="font-size:14px;color:#475569;line-height:1.6;margin:0 0 16px;">Book a free 30-minute audit call to get your personalized automation roadmap.</p>
            <a href="https://peakworkstudios.com/contact" style="display:inline-block;background:#38bdf8;color:#000;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:700;font-size:15px;box-shadow:0 4px 12px rgba(56,189,248,0.3);">Book Your Free Audit</a>
          </div>

          <!-- Main Cost Display -->
          <div style="padding:0 24px;">
            <div style="text-align:center;margin-bottom:32px;">
              <div style="font-size:15px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Your Team Is Losing</div>
              <div style="font-size:56px;font-weight:900;color:#ef4444;letter-spacing:-3px;line-height:1;margin:8px 0;">${formatCurrency(totalAnnualCost)}</div>
              <div style="font-size:16px;color:#64748b;margin-top:8px;">per year in hidden costs</div>
            </div>

            <!-- What This Means Section -->
            <div style="background:#fef2f2;border-left:4px solid #ef4444;padding:20px;margin-bottom:32px;border-radius:8px;">
              <div style="font-size:14px;font-weight:700;color:#991b1b;margin-bottom:8px;">What This Means:</div>
              <ul style="margin:0;padding-left:20px;font-size:14px;color:#7f1d1d;line-height:1.7;">
                <li style="margin-bottom:6px;">That's <strong>${formatCurrency(totalAnnualCost / 12)}/month</strong> — equivalent to 2-3 full-time employees' salaries</li>
                <li style="margin-bottom:6px;">Your team spends <strong>${Math.round((totalAnnualCost / hourlyRate) / 52)} hours/week</strong> on repetitive work instead of client delivery</li>
                <li>With 70% automation, you'd save <strong style="color:#22c55e;">${formatCurrency(potentialSavings)}/year</strong></li>
              </ul>
            </div>

            <!-- Summary Table -->
            <h3 style="font-size:18px;font-weight:700;color:#0f172a;margin:32px 0 16px;">Your Cost Summary</h3>
            <table style="width:100%;border-collapse:collapse;margin:0 0 32px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
              <tbody>
                <tr style="background:#f1f5f9;">
                  <td style="padding:14px 16px;border-bottom:1px solid #e2e8f0;font-weight:600;color:#334155;font-size:14px;">Team size</td>
                  <td style="padding:14px 16px;border-bottom:1px solid #e2e8f0;text-align:right;font-weight:700;color:#38bdf8;font-size:14px;">${safeText(teamSize)} people</td>
                </tr>
                <tr>
                  <td style="padding:14px 16px;border-bottom:1px solid #e2e8f0;font-weight:600;color:#334155;font-size:14px;">Hourly rate</td>
                  <td style="padding:14px 16px;border-bottom:1px solid #e2e8f0;text-align:right;font-weight:700;color:#38bdf8;font-size:14px;">${formatCurrency(hourlyRate)}/hr</td>
                </tr>
                <tr style="background:#f1f5f9;">
                  <td style="padding:14px 16px;border-bottom:1px solid #e2e8f0;font-weight:600;color:#334155;font-size:14px;">Active clients</td>
                  <td style="padding:14px 16px;border-bottom:1px solid #e2e8f0;text-align:right;font-weight:700;color:#38bdf8;font-size:14px;">${safeText(clients)}</td>
                </tr>
                <tr>
                  <td style="padding:14px 16px;border-bottom:1px solid #e2e8f0;font-weight:600;color:#334155;font-size:14px;">Monthly cost</td>
                  <td style="padding:14px 16px;border-bottom:1px solid #e2e8f0;text-align:right;font-weight:700;color:#ef4444;font-size:14px;">${formatCurrency(totalAnnualCost / 12)}/mo</td>
                </tr>
                <tr style="background:#f1f5f9;">
                  <td style="padding:14px 16px;border-bottom:1px solid #e2e8f0;font-weight:600;color:#334155;font-size:14px;">Weekly cost</td>
                  <td style="padding:14px 16px;border-bottom:1px solid #e2e8f0;text-align:right;font-weight:700;color:#ef4444;font-size:14px;">${formatCurrency(totalAnnualCost / 52)}/wk</td>
                </tr>
                <tr style="background:#ecfdf5;border-top:2px solid #10b981;">
                  <td style="padding:14px 16px;font-weight:700;color:#065f46;font-size:15px;">Potential savings (70%)</td>
                  <td style="padding:14px 16px;text-align:right;font-weight:800;color:#22c55e;font-size:16px;">${formatCurrency(potentialSavings)}/yr</td>
                </tr>
              </tbody>
            </table>

            ${breakdownRows ? `
              <!-- Breakdown Table -->
              <h3 style="font-size:18px;font-weight:700;color:#0f172a;margin:32px 0 16px;">Cost Breakdown by Category</h3>
              <table style="width:100%;border-collapse:collapse;margin:0 0 32px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
                <tbody>${breakdownRows}</tbody>
              </table>
              
              <!-- Context Box -->
              <div style="background:#fffbeb;border-left:4px solid #f59e0b;padding:20px;margin-bottom:32px;border-radius:8px;">
                <div style="font-size:14px;font-weight:700;color:#92400e;margin-bottom:8px;">Quick Wins Available:</div>
                <p style="font-size:14px;color:#78350f;line-height:1.7;margin:0;">Most teams see their biggest savings from automating data entry, reporting, and follow-ups — these three alone typically save <strong>12-18 hours per week</strong> for the team.</p>
              </div>
            ` : ''}

            <!-- Social Proof -->
            <div style="background:#f0fdf4;border:1px solid #86efac;padding:20px;margin-bottom:32px;border-radius:8px;">
              <div style="font-size:14px;font-weight:700;color:#166534;margin-bottom:12px;">What Other Teams Report:</div>
              <div style="display:flex;justify-content:space-around;margin-top:16px;">
                <div style="text-align:center;">
                  <div style="font-size:28px;font-weight:800;color:#22c55e;">15+</div>
                  <div style="font-size:12px;color:#166534;">hours saved/week</div>
                </div>
                <div style="text-align:center;">
                  <div style="font-size:28px;font-weight:800;color:#22c55e;">40%</div>
                  <div style="font-size:12px;color:#166534;">fewer errors</div>
                </div>
                <div style="text-align:center;">
                  <div style="font-size:28px;font-weight:800;color:#22c55e;">2-3</div>
                  <div style="font-size:12px;color:#166534;">weeks to implement</div>
                </div>
              </div>
            </div>

            <!-- Final CTA -->
            <div style="text-align:center;padding:32px 0;border-top:2px solid #e2e8f0;margin-top:32px;">
              <h3 style="font-size:20px;font-weight:700;color:#0f172a;margin:0 0 12px;">Ready to Get This Time Back?</h3>
              <p style="font-size:14px;color:#64748b;margin:0 0 20px;line-height:1.6;">Book a free 30-minute call to discuss your specific workflow and get a custom automation plan.</p>
              <a href="https://peakworkstudios.com/contact" style="display:inline-block;background:#38bdf8;color:#000;padding:16px 40px;border-radius:8px;text-decoration:none;font-weight:700;font-size:16px;box-shadow:0 4px 12px rgba(56,189,248,0.3);">Schedule Your Free Audit</a>
            </div>
          </div>

          <!-- Footer -->
          <div style="background:#f8fafc;padding:24px;margin-top:32px;border-top:1px solid #e2e8f0;">
            <p style="font-size:11px;color:#64748b;line-height:1.6;margin:0 0 8px;"><strong>Disclaimer:</strong> This calculator provides estimates based on industry averages and typical automation outcomes. Actual savings vary by team workflow, team structure, and implementation scope. 70% savings represents an achievable target with comprehensive automation — not a guarantee.</p>
            <hr style="border:none;border-top:1px solid #cbd5e1;margin:16px 0;" />
            <p style="font-size:12px;color:#64748b;margin:8px 0;text-align:center;">
              <a href="mailto:no_reply@peakworkstudios.com?subject=unsubscribe" style="color:#64748b;text-decoration:underline;">Unsubscribe</a> · 
              <a href="https://peakworkstudios.com" style="color:#64748b;text-decoration:none;">peakworkstudios.com</a>
            </p>
            <p style="color:#94a3b8;font-size:11px;margin:8px 0;text-align:center;">Peak Work Studios · Calgary, Canada</p>
          </div>
        </div>
      `,
    });

    return res.status(200).json({ success: true, message: 'Results sent successfully.' });
  } catch (error) {
    console.error('Calculator results error:', error);
    return res.status(500).json({ error: 'Internal server error. Please try again.' });
  }
}
