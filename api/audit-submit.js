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
          .map(([category, score], idx) => {
            const bgColor = idx % 2 === 0 ? '#f1f5f9' : '#ffffff';
            const scoreColor = score >= 7 ? '#22c55e' : score >= 5 ? '#f59e0b' : '#ef4444';
            const status = score >= 7 ? 'Strong' : score >= 5 ? 'Moderate' : 'Needs Work';
            const benchmark = score >= 7 ? 'Above average' : score >= 5 ? 'Average' : 'Below average';
            return `
              <tr style="background:${bgColor};">
                <td style="padding:12px 16px;border-bottom:1px solid #e2e8f0;font-size:14px;color:#334155;font-weight:600;">${category}</td>
                <td style="padding:12px 16px;border-bottom:1px solid #e2e8f0;text-align:center;font-weight:800;color:${scoreColor};font-size:18px;">${score}/10</td>
                <td style="padding:12px 16px;border-bottom:1px solid #e2e8f0;text-align:right;font-size:12px;color:#64748b;">${status}<br/><span style="font-size:11px;">${benchmark}</span></td>
              </tr>
            `;
          })
          .join('')
      : '';
    
    const getScoreInterpretation = (score) => {
      if (score >= 70) return {
        level: 'Good',
        color: '#22c55e',
        message: "Your operations are in solid shape, but there's still room for optimization.",
        focus: 'Fine-tuning high-impact areas could save 5-8 hours per week.'
      };
      if (score >= 50) return {
        level: 'Moderate',
        color: '#f59e0b',
        message: "You have good foundations but significant inefficiencies are slowing you down.",
        focus: 'Strategic automation could save 10-15 hours per week.'
      };
      return {
        level: 'Needs Improvement',
        color: '#ef4444',
        message: "Your team is likely spending 40-60% of their time on manual work that could be automated.",
        focus: 'Comprehensive automation could save 15-20+ hours per week.'
      };
    };
    
    const interpretation = getScoreInterpretation(totalScore);
    
    const getQuickWins = (scores) => {
      if (!scores) return [];
      const wins = [];
      Object.entries(scores).forEach(([category, score]) => {
        if (score <= 5) {
          const tips = {
            'Data Management': 'Connect your CRM to your project management tool — saves 3-5 hrs/week',
            'Communication': 'Set up automated status digest emails — saves 2-4 hrs/week',
            'Reporting': 'Create live dashboards instead of manual reports — saves 5-7 hrs/week',
            'Task Management': 'Automate task creation from meeting notes — saves 2-3 hrs/week',
            'Client Onboarding': 'Build intake forms that auto-populate your systems — saves 3-4 hrs per client'
          };
          if (tips[category]) wins.push(tips[category]);
        }
      });
      return wins.slice(0, 3);
    };
    
    const quickWins = getQuickWins(scores);

    // Send results to the user
    await resend.emails.send({
      from: 'Peak Work Studios <no_reply@peakworkstudios.com>',
      to: email,
      subject: `Your Operations Audit Results: ${totalScore}/100 — Peak Work Studios`,
      headers: {
        'List-Unsubscribe': '<mailto:no_reply@peakworkstudios.com?subject=unsubscribe>',
      },
      html: `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;max-width:640px;margin:0 auto;background:#ffffff;">
          <!-- Header -->
          <div style="text-align:center;padding:32px 24px;background:linear-gradient(135deg, #0c4a6e 0%, #075985 100%);border-bottom:4px solid #38bdf8;">
            <div style="font-size:28px;font-weight:800;color:#38bdf8;margin-bottom:6px;letter-spacing:-0.5px;">Peak Work Studios</div>
            <div style="font-size:15px;color:#e0f2fe;font-weight:500;">Your Operations Audit Results</div>
          </div>

          <!-- Main Content -->
          <div style="padding:0 24px;">
            <!-- Greeting -->
            <div style="margin:32px 0 24px;">
              <h2 style="font-size:22px;font-weight:700;color:#0f172a;margin:0 0 8px;">Hi ${name},</h2>
              <p style="font-size:15px;color:#475569;line-height:1.6;margin:0;">Thanks for completing the audit. Here's what your operations look like right now and where you can improve.</p>
            </div>

            <!-- Score Display -->
            <div style="text-align:center;margin:32px 0;padding:32px;background:#f8fafc;border:2px solid #e2e8f0;border-radius:12px;">
              <div style="font-size:15px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;">Your Overall Score</div>
              <div style="font-size:64px;font-weight:900;color:${interpretation.color};letter-spacing:-3px;line-height:1;margin:8px 0;">${totalScore}<span style="font-size:32px;color:#94a3b8;">/100</span></div>
              <div style="font-size:16px;font-weight:700;color:#334155;margin-top:12px;">${interpretation.level}</div>
            </div>

            <!-- Interpretation -->
            <div style="background:#fef2f2;border-left:4px solid ${interpretation.color};padding:20px;margin-bottom:32px;border-radius:8px;">
              <div style="font-size:14px;font-weight:700;color:#7f1d1d;margin-bottom:8px;">What This Means:</div>
              <p style="font-size:14px;color:#7f1d1d;line-height:1.7;margin:0 0 12px;">${interpretation.message}</p>
              <p style="font-size:14px;color:#7f1d1d;line-height:1.7;margin:0;font-weight:600;">Focus area: ${interpretation.focus}</p>
            </div>

            <!-- Detailed Scores -->
            <h3 style="font-size:18px;font-weight:700;color:#0f172a;margin:32px 0 16px;">Category Breakdown</h3>
            ${scoreRows ? `
              <table style="width:100%;border-collapse:collapse;margin:0 0 32px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
                <thead>
                  <tr style="background:#0c4a6e;">
                    <th style="text-align:left;padding:12px 16px;color:#e0f2fe;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">Category</th>
                    <th style="text-align:center;padding:12px 16px;color:#e0f2fe;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">Score</th>
                    <th style="text-align:right;padding:12px 16px;color:#e0f2fe;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">Status</th>
                  </tr>
                </thead>
                <tbody>${scoreRows}</tbody>
              </table>
            ` : ''}

            <!-- Industry Benchmark -->
            <div style="background:#fffbeb;border-left:4px solid #f59e0b;padding:20px;margin-bottom:32px;border-radius:8px;">
              <div style="font-size:14px;font-weight:700;color:#92400e;margin-bottom:8px;">Industry Context:</div>
              <p style="font-size:14px;color:#78350f;line-height:1.7;margin:0;">Most 10-50 person teams score between 40-60 on this audit. Scores above 70 indicate well-optimized operations. Scores below 50 typically mean <strong>15-20 hours per week</strong> are lost to manual work.</p>
            </div>

            ${quickWins.length > 0 ? `
              <!-- Quick Wins -->
              <div style="background:#f0fdf4;border:1px solid #86efac;padding:20px;margin-bottom:32px;border-radius:8px;">
                <div style="font-size:14px;font-weight:700;color:#166534;margin-bottom:12px;">Your Quick Wins:</div>
                <ul style="margin:0;padding-left:20px;font-size:14px;color:#166534;line-height:1.8;">
                  ${quickWins.map(win => `<li style="margin-bottom:8px;">${win}</li>`).join('')}
                </ul>
              </div>
            ` : ''}

            <!-- CTA Section -->
            <div style="text-align:center;padding:32px 0;border-top:2px solid #e2e8f0;margin-top:32px;">
              <h3 style="font-size:20px;font-weight:700;color:#0f172a;margin:0 0 12px;">Want a Custom Action Plan?</h3>
              <p style="font-size:14px;color:#64748b;margin:0 0 20px;line-height:1.6;">Book a free 30-minute call to discuss your specific workflow and get prioritized recommendations.</p>
              <a href="https://calendly.com/peakworkstudios/30min" style="display:inline-block;background:#38bdf8;color:#000;padding:16px 40px;border-radius:8px;text-decoration:none;font-weight:700;font-size:16px;box-shadow:0 4px 12px rgba(56,189,248,0.3);">Schedule Your Free Call</a>
            </div>
          </div>

          <!-- Footer -->
          <div style="background:#f8fafc;padding:24px;margin-top:32px;border-top:1px solid #e2e8f0;">
            <p style="font-size:11px;color:#64748b;line-height:1.6;margin:0 0 8px;"><strong>Disclaimer:</strong> This audit provides a high-level assessment of common operational inefficiencies. Actual time savings and implementation complexity vary by team workflow, team structure, and tooling. Recommendations are based on typical outcomes — not guarantees.</p>
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
        <p><strong>Team Size:</strong> ${agencySize || 'Not provided'}</p>
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
