import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OpsReportingPack = ({ currentTheme, Section, FeatureCard, CallToActionButton }) => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Ops Reporting Pack | Kunal Deshmukh';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Weekly status and KPI snapshot templates with simple, reliable collection process for operations reporting.');
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Section minHeight="auto" style={{ paddingTop: '120px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}>
          <div style={{ marginBottom: '30px' }}>
            <button 
              onClick={() => navigate('/')}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: currentTheme.primary, 
                fontSize: '16px', 
                cursor: 'pointer',
                padding: '0',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              ← Back to home
            </button>
            <h1 style={{ fontSize: '48px', fontWeight: '700', color: currentTheme.text, marginBottom: '20px', lineHeight: '1.2' }}>
              Ops Reporting Pack
            </h1>
            <p style={{ fontSize: '22px', color: currentTheme.textSecondary, lineHeight: '1.6', margin: '0' }}>
              Weekly status + KPI snapshot templates with a simple, reliable collection process.
            </p>
          </div>

          {/* What it is */}
          <div style={{ marginBottom: '50px', padding: '30px', backgroundColor: currentTheme.surface, borderRadius: currentTheme.borderRadius }}>
            <h2 style={{ fontSize: '28px', color: currentTheme.text, marginTop: '0', marginBottom: '20px' }}>What it is</h2>
            <p style={{ fontSize: '17px', lineHeight: '1.7', color: currentTheme.textSecondary, margin: '0' }}>
              A set of lightweight, proven templates for weekly operational reporting: a status update format for what happened this week, a KPI snapshot showing target vs actual performance, and a definitions sheet that documents what each metric means and how it's calculated. The pack includes a simple collection process so your team can populate reports consistently without hunting for data or reinventing the format each week.
            </p>
          </div>

          {/* Who it's for */}
          <div style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '28px', color: currentTheme.text, marginBottom: '25px' }}>Who it's for</h2>
            <div style={{ display: 'grid', gap: '20px' }}>
              <FeatureCard>
                <h3 style={{ fontSize: '20px', marginTop: '0' }}>Teams with inconsistent reporting formats</h3>
                <p style={{ margin: '0', fontSize: '16px' }}>Every week's update looks different. Your stakeholders never know where to look for key information.</p>
              </FeatureCard>
              <FeatureCard>
                <h3 style={{ fontSize: '20px', marginTop: '0' }}>Managers who spend too much time compiling reports</h3>
                <p style={{ margin: '0', fontSize: '16px' }}>You manually pull data from 5 different tools, paste it into a doc, format it, and send it out. This takes 2+ hours every week.</p>
              </FeatureCard>
              <FeatureCard>
                <h3 style={{ fontSize: '20px', marginTop: '0' }}>Teams where "we don't know what the numbers mean"</h3>
                <p style={{ margin: '0', fontSize: '16px' }}>Someone leaves or is on vacation, and suddenly no one knows how to calculate the KPIs or what "good" looks like.</p>
              </FeatureCard>
            </div>
          </div>

          {/* What you receive */}
          <div style={{ marginBottom: '50px', padding: '30px', backgroundColor: currentTheme.surface, borderRadius: currentTheme.borderRadius }}>
            <h2 style={{ fontSize: '28px', color: currentTheme.text, marginTop: '0', marginBottom: '25px' }}>Templates included</h2>
            <ul style={{ fontSize: '17px', lineHeight: '1.9', color: currentTheme.textSecondary, paddingLeft: '25px', margin: '0' }}>
              <li><strong>Weekly Status Template:</strong> Consistent format for accomplishments, blockers, next week's focus</li>
              <li><strong>KPI Snapshot:</strong> Table with metric name, target, actual, variance, and notes</li>
              <li><strong>Definitions Sheet:</strong> Documents what each KPI means, how it's calculated, and who owns it</li>
              <li><strong>Collection Process:</strong> Simple checklist for gathering data weekly without manual hunting</li>
              <li><strong>Example Reports:</strong> Pre-filled samples showing proper usage (public-safe data)</li>
            </ul>
          </div>

          {/* Example KPI snapshot */}
          <div style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '28px', color: currentTheme.text, marginBottom: '25px' }}>Example: KPI Snapshot</h2>
            <div style={{ padding: '30px', backgroundColor: currentTheme.background, borderRadius: currentTheme.borderRadius, border: `1px solid ${currentTheme.border}` }}>
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '18px', color: currentTheme.primary, marginTop: '0', marginBottom: '10px' }}>Week of Feb 3, 2026</h3>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px' }}>
                    <thead>
                      <tr style={{ borderBottom: `2px solid ${currentTheme.border}`, backgroundColor: currentTheme.surface }}>
                        <th style={{ textAlign: 'left', padding: '12px 10px', color: currentTheme.text }}>Metric</th>
                        <th style={{ textAlign: 'right', padding: '12px 10px', color: currentTheme.text }}>Target</th>
                        <th style={{ textAlign: 'right', padding: '12px 10px', color: currentTheme.text }}>Actual</th>
                        <th style={{ textAlign: 'left', padding: '12px 10px', color: currentTheme.text }}>Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: `1px solid ${currentTheme.border}` }}>
                        <td style={{ padding: '12px 10px', color: currentTheme.textSecondary }}>Tickets closed</td>
                        <td style={{ textAlign: 'right', padding: '12px 10px', color: currentTheme.textSecondary }}>50</td>
                        <td style={{ textAlign: 'right', padding: '12px 10px', color: currentTheme.success, fontWeight: '600' }}>53</td>
                        <td style={{ padding: '12px 10px', color: currentTheme.textSecondary, fontSize: '14px' }}>Above target, sprint went well</td>
                      </tr>
                      <tr style={{ borderBottom: `1px solid ${currentTheme.border}` }}>
                        <td style={{ padding: '12px 10px', color: currentTheme.textSecondary }}>Avg response time (hrs)</td>
                        <td style={{ textAlign: 'right', padding: '12px 10px', color: currentTheme.textSecondary }}>{'< 4'}</td>
                        <td style={{ textAlign: 'right', padding: '12px 10px', color: currentTheme.warning, fontWeight: '600' }}>6.2</td>
                        <td style={{ padding: '12px 10px', color: currentTheme.textSecondary, fontSize: '14px' }}>Spike on Tuesday, now resolved</td>
                      </tr>
                      <tr style={{ borderBottom: `1px solid ${currentTheme.border}` }}>
                        <td style={{ padding: '12px 10px', color: currentTheme.textSecondary }}>Customer satisfaction</td>
                        <td style={{ textAlign: 'right', padding: '12px 10px', color: currentTheme.textSecondary }}>≥ 4.5</td>
                        <td style={{ textAlign: 'right', padding: '12px 10px', color: currentTheme.success, fontWeight: '600' }}>4.7</td>
                        <td style={{ padding: '12px 10px', color: currentTheme.textSecondary, fontSize: '14px' }}>Strong feedback this week</td>
                      </tr>
                      <tr>
                        <td style={{ padding: '12px 10px', color: currentTheme.textSecondary }}>Uptime %</td>
                        <td style={{ textAlign: 'right', padding: '12px 10px', color: currentTheme.textSecondary }}>99.5%</td>
                        <td style={{ textAlign: 'right', padding: '12px 10px', color: currentTheme.error, fontWeight: '600' }}>98.1%</td>
                        <td style={{ padding: '12px 10px', color: currentTheme.textSecondary, fontSize: '14px' }}>Outage on Wed 2pm (45 min)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div style={{ padding: '20px', backgroundColor: currentTheme.surface, borderRadius: '8px', fontSize: '15px', color: currentTheme.textSecondary }}>
                <strong>Key Insight:</strong> Response time spike correlates with outage event. Team prioritizing stability fixes this week.
              </div>
            </div>
          </div>

          {/* Example definitions sheet */}
          <div style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '28px', color: currentTheme.text, marginBottom: '25px' }}>Example: Definitions Sheet (excerpt)</h2>
            <div style={{ padding: '30px', backgroundColor: currentTheme.background, borderRadius: currentTheme.borderRadius, border: `1px solid ${currentTheme.border}` }}>
              <div style={{ marginBottom: '25px', paddingBottom: '25px', borderBottom: `1px solid ${currentTheme.border}` }}>
                <h3 style={{ fontSize: '20px', color: currentTheme.primary, marginTop: '0', marginBottom: '12px' }}>Tickets Closed</h3>
                <div style={{ fontSize: '16px', lineHeight: '1.8', color: currentTheme.textSecondary }}>
                  <p style={{ margin: '0 0 10px 0' }}><strong>Definition:</strong> Total number of support tickets marked "Closed" or "Resolved" during the reporting week (Monday 12:00am - Sunday 11:59pm)</p>
                  <p style={{ margin: '0 0 10px 0' }}><strong>Source:</strong> Jira query: <code style={{ backgroundColor: currentTheme.surface, padding: '2px 6px', borderRadius: '4px', fontSize: '14px' }}>status = Closed AND resolved &gt;= startOfWeek()</code></p>
                  <p style={{ margin: '0 0 10px 0' }}><strong>Target rationale:</strong> Based on team velocity (10 tickets/person/week × 5 people = 50)</p>
                  <p style={{ margin: '0' }}><strong>Owner:</strong> Support Team Lead</p>
                </div>
              </div>

              <div style={{ marginBottom: '25px', paddingBottom: '25px', borderBottom: `1px solid ${currentTheme.border}` }}>
                <h3 style={{ fontSize: '20px', color: currentTheme.primary, marginTop: '0', marginBottom: '12px' }}>Avg Response Time (hrs)</h3>
                <div style={{ fontSize: '16px', lineHeight: '1.8', color: currentTheme.textSecondary }}>
                  <p style={{ margin: '0 0 10px 0' }}><strong>Definition:</strong> Average time from ticket creation to first human response (excludes auto-replies)</p>
                  <p style={{ margin: '0 0 10px 0' }}><strong>Source:</strong> Support dashboard → Reports → Time to First Response (weekly view)</p>
                  <p style={{ margin: '0 0 10px 0' }}><strong>Target rationale:</strong> SLA commitment is 4 hours during business hours</p>
                  <p style={{ margin: '0' }}><strong>Owner:</strong> Support Operations Manager</p>
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: '20px', color: currentTheme.primary, marginTop: '0', marginBottom: '12px' }}>Customer Satisfaction</h3>
                <div style={{ fontSize: '16px', lineHeight: '1.8', color: currentTheme.textSecondary }}>
                  <p style={{ margin: '0 0 10px 0' }}><strong>Definition:</strong> Average rating from post-ticket surveys (1-5 scale)</p>
                  <p style={{ margin: '0 0 10px 0' }}><strong>Source:</strong> Survey tool export → calculate mean of all responses where rating provided</p>
                  <p style={{ margin: '0 0 10px 0' }}><strong>Target rationale:</strong> Industry benchmark for B2B support is 4.3; we aim higher at 4.5</p>
                  <p style={{ margin: '0' }}><strong>Owner:</strong> Customer Experience Lead</p>
                </div>
              </div>
            </div>
          </div>

          {/* Collection process */}
          <div style={{ marginBottom: '50px', padding: '30px', backgroundColor: currentTheme.surface, borderRadius: currentTheme.borderRadius }}>
            <h2 style={{ fontSize: '28px', color: currentTheme.text, marginTop: '0', marginBottom: '25px' }}>Simple collection process</h2>
            <div style={{ fontSize: '17px', lineHeight: '1.9', color: currentTheme.textSecondary }}>
              <p style={{ margin: '0 0 15px 0' }}><strong>Monday morning (30 minutes):</strong></p>
              <ul style={{ margin: '0 0 20px 0', paddingLeft: '25px' }}>
                <li>Run saved Jira query for "Tickets closed"</li>
                <li>Export support dashboard "Time to First Response" report</li>
                <li>Pull survey tool data for previous week's ratings</li>
                <li>Check uptime monitor for weekly availability %</li>
              </ul>
              <p style={{ margin: '0 0 15px 0' }}><strong>Fill KPI snapshot:</strong> Paste numbers into template, add brief notes for anything off-target</p>
              <p style={{ margin: '0' }}><strong>Send report:</strong> Email or post to Slack by 10am Monday (takes {'< 5'} minutes once data is gathered)</p>
            </div>
          </div>

          {/* What you get */}
          <div style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '28px', color: currentTheme.text, marginBottom: '25px' }}>What you receive</h2>
            <div style={{ display: 'grid', gap: '20px' }}>
              <FeatureCard>
                <h3 style={{ fontSize: '20px', marginTop: '0' }}>Templates (Google Docs or Excel)</h3>
                <p style={{ margin: '0', fontSize: '16px' }}>Pre-formatted weekly status and KPI snapshot templates, ready to copy and use. Includes formulas for variance calculations.</p>
              </FeatureCard>
              <FeatureCard>
                <h3 style={{ fontSize: '20px', marginTop: '0' }}>Definitions sheet</h3>
                <p style={{ margin: '0', fontSize: '16px' }}>Documentation of each metric: what it means, how to calculate it, where to find source data, and who owns it.</p>
              </FeatureCard>
              <FeatureCard>
                <h3 style={{ fontSize: '20px', marginTop: '0' }}>Collection checklist</h3>
                <p style={{ margin: '0', fontSize: '16px' }}>Step-by-step process for gathering data weekly. Designed to take {'< 30'} minutes once set up.</p>
              </FeatureCard>
            </div>
          </div>

          {/* Timeline */}
          <div style={{ marginBottom: '50px', padding: '30px', backgroundColor: currentTheme.surface, borderRadius: currentTheme.borderRadius }}>
            <h2 style={{ fontSize: '28px', color: currentTheme.text, marginTop: '0', marginBottom: '20px' }}>Timeline</h2>
            <div style={{ fontSize: '17px', lineHeight: '1.9', color: currentTheme.textSecondary }}>
              <p style={{ margin: '0 0 15px 0' }}><strong>Discovery call:</strong> 15 minutes to understand your current KPIs and reporting cadence</p>
              <p style={{ margin: '0 0 15px 0' }}><strong>Template customization:</strong> 2-3 days to adapt templates to your metrics and format preferences</p>
              <p style={{ margin: '0 0 15px 0' }}><strong>Definitions + process doc:</strong> 1-2 days to document each metric and create collection checklist</p>
              <p style={{ margin: '0' }}><strong>Handoff:</strong> 30-minute walkthrough showing how to use the templates and maintain them over time</p>
            </div>
          </div>

          {/* CTA Block */}
          <div style={{ padding: '40px', backgroundColor: currentTheme.background, borderRadius: currentTheme.borderRadius, border: `2px solid ${currentTheme.primary}`, textAlign: 'center' }}>
            <h2 style={{ fontSize: '32px', color: currentTheme.text, marginTop: '0', marginBottom: '20px' }}>Ready for consistent, reliable reporting?</h2>
            <p style={{ fontSize: '18px', color: currentTheme.textSecondary, marginBottom: '30px' }}>
              Get a 1-page plan showing how the Ops Reporting Pack fits your team's workflow.
            </p>
            <CallToActionButton onClick={() => navigate('/#contact')}>Get a 1-page automation plan</CallToActionButton>
          </div>
        </div>
      </Section>
    </>
  );
};

export default OpsReportingPack;
