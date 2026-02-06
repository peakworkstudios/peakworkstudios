import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AutomationAuditReport = ({ currentTheme, Section, FeatureCard, CallToActionButton }) => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Automation Audit Report | Peak Work Studios';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'A one-page diagnostic showing your top automation opportunities, impact estimates, and phased rollout plan for workflow automation.');
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Section minHeight="auto" style={{ paddingTop: '120px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'left', padding: '0 20px' }}>
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
            <h1 style={{ fontSize: 'clamp(32px, 8vw, 48px)', fontWeight: '700', color: currentTheme.text, marginBottom: '20px', lineHeight: '1.2' }}>
              Automation Audit Report
            </h1>
            <p style={{ fontSize: 'clamp(18px, 5vw, 22px)', color: currentTheme.textSecondary, lineHeight: '1.6', margin: '0' }}>
              A one-page diagnostic that shows your top automation opportunities, impact estimate, and a phased rollout plan.
            </p>
          </div>

          {/* What it is */}
          <div style={{ marginBottom: '50px', padding: '30px', backgroundColor: currentTheme.surface, borderRadius: currentTheme.borderRadius }}>
            <h2 style={{ fontSize: 'clamp(24px, 6vw, 28px)', color: currentTheme.text, marginTop: '0', marginBottom: '20px' }}>What it is</h2>
            <p style={{ fontSize: 'clamp(16px, 4vw, 17px)', lineHeight: '1.7', color: currentTheme.textSecondary, margin: '0' }}>
              After a 15-minute intake call, you receive a single-page report that maps your current workflow, identifies bottlenecks and failure points, and ranks your top 3 automation opportunities by effort versus impact. Each opportunity includes a clear implementation path, risk assessment, and estimated time savings. Think of it as a focused blueprint that tells you exactly what to build first and why.
            </p>
          </div>

          {/* Who it's for */}
          <div style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: 'clamp(24px, 6vw, 28px)', color: currentTheme.text, marginBottom: '25px' }}>Who it's for</h2>
            <div style={{ display: 'grid', gap: '20px' }}>
              <FeatureCard>
                <h3 style={{ fontSize: 'clamp(18px, 4vw, 20px)', marginTop: '0' }}>Teams with too much manual admin and follow-up work</h3>
                <p style={{ margin: '0', fontSize: 'clamp(15px, 4vw, 16px)' }}>You're spending 10+ hours per week on repetitive data entry, status updates, or chasing approvals.</p>
              </FeatureCard>
              <FeatureCard>
                <h3 style={{ fontSize: 'clamp(18px, 4vw, 20px)', marginTop: '0' }}>Businesses losing leads/customers in handoffs</h3>
                <p style={{ margin: '0', fontSize: 'clamp(15px, 4vw, 16px)' }}>Work falls through the cracks between sales → delivery, support → engineering, or intake → fulfillment.</p>
              </FeatureCard>
              <FeatureCard>
                <h3 style={{ fontSize: 'clamp(18px, 4vw, 20px)', marginTop: '0' }}>Owners who want "less chaos, more throughput"</h3>
                <p style={{ margin: '0', fontSize: 'clamp(15px, 4vw, 16px)' }}>You know automation would help, but don't know where to start or what's realistic given your budget and team size.</p>
              </FeatureCard>
            </div>
          </div>

          {/* What you receive */}
          <div style={{ marginBottom: '50px', padding: '30px', backgroundColor: currentTheme.surface, borderRadius: currentTheme.borderRadius }}>
            <h2 style={{ fontSize: 'clamp(24px, 6vw, 28px)', color: currentTheme.text, marginTop: '0', marginBottom: '25px' }}>What you receive (1-page format)</h2>
            <ul style={{ fontSize: 'clamp(15px, 4vw, 17px)', lineHeight: '1.9', color: currentTheme.textSecondary, paddingLeft: '25px', margin: '0' }}>
              <li><strong>Top 3 opportunities</strong> ranked by effort vs impact</li>
              <li><strong>Impact estimate</strong> for each: time saved, cycle time reduced, fewer errors</li>
              <li><strong>Phased rollout plan</strong>: Quick wins → Core workflow → Reliability</li>
              <li><strong>Risks + guardrails</strong>: what can break and how to prevent it</li>
              <li><strong>Recommended first build (MVP)</strong> with clear scope</li>
              <li><strong>Phase plan + owners</strong>: who does what, when</li>
            </ul>
          </div>

          {/* Example outline */}
          <div style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: 'clamp(24px, 6vw, 28px)', color: currentTheme.text, marginBottom: '25px' }}>Example outline</h2>
            <div style={{ padding: '30px', backgroundColor: currentTheme.background, borderRadius: currentTheme.borderRadius, border: `1px solid ${currentTheme.border}` }}>
              <div style={{ marginBottom: '30px' }}>
                <h3 style={{ fontSize: 'clamp(18px, 4vw, 20px)', color: currentTheme.primary, marginTop: '0', marginBottom: '15px' }}>Current Workflow Map</h3>
                <p style={{ fontSize: 'clamp(15px, 4vw, 16px)', color: currentTheme.textSecondary, margin: '0 0 10px 0' }}>
                  Intake → Fulfillment → Billing → Reporting
                </p>
                <p style={{ fontSize: 'clamp(14px, 3vw, 15px)', color: currentTheme.textSecondary, margin: '0', fontStyle: 'italic' }}>
                  Visual diagram showing handoff points, tools used, and current cycle time
                </p>
              </div>

              <div style={{ marginBottom: '30px' }}>
                <h3 style={{ fontSize: 'clamp(18px, 4vw, 20px)', color: currentTheme.primary, marginTop: '0', marginBottom: '15px' }}>Bottlenecks + Failure Points</h3>
                <ul style={{ fontSize: 'clamp(15px, 4vw, 16px)', color: currentTheme.textSecondary, paddingLeft: '20px', margin: '0' }}>
                  <li>Manual data entry from intake form → CRM (3hrs/week, 15% error rate)</li>
                  <li>Status email updates sent manually (2hrs/week, delayed 30% of time)</li>
                  <li>Invoice generation requires 4 copy-paste steps (1.5hrs/week, occasional missed line items)</li>
                </ul>
              </div>

              <div style={{ marginBottom: '30px' }}>
                <h3 style={{ fontSize: 'clamp(18px, 4vw, 20px)', color: currentTheme.primary, marginTop: '0', marginBottom: '15px' }}>Top 3 Opportunities</h3>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'clamp(14px, 3vw, 15px)', minWidth: '500px' }}>
                    <thead>
                      <tr style={{ borderBottom: `2px solid ${currentTheme.border}` }}>
                        <th style={{ textAlign: 'left', padding: 'clamp(8px, 2vw, 12px)', color: currentTheme.text, fontWeight: '600' }}>Opportunity</th>
                        <th style={{ textAlign: 'left', padding: 'clamp(8px, 2vw, 12px)', color: currentTheme.text, fontWeight: '600' }}>Effort</th>
                        <th style={{ textAlign: 'left', padding: 'clamp(8px, 2vw, 12px)', color: currentTheme.text, fontWeight: '600' }}>Risk</th>
                        <th style={{ textAlign: 'left', padding: 'clamp(8px, 2vw, 12px)', color: currentTheme.text, fontWeight: '600' }}>Est. Impact</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: `1px solid ${currentTheme.border}` }}>
                        <td style={{ padding: 'clamp(8px, 2vw, 12px)', color: currentTheme.textSecondary }}>Auto-sync intake → CRM</td>
                        <td style={{ padding: 'clamp(8px, 2vw, 12px)', color: currentTheme.textSecondary }}>Low (2 days)</td>
                        <td style={{ padding: 'clamp(8px, 2vw, 12px)', color: currentTheme.textSecondary }}>Low</td>
                        <td style={{ padding: 'clamp(8px, 2vw, 12px)', color: currentTheme.textSecondary }}>3hrs/week saved</td>
                      </tr>
                      <tr style={{ borderBottom: `1px solid ${currentTheme.border}` }}>
                        <td style={{ padding: 'clamp(8px, 2vw, 12px)', color: currentTheme.textSecondary }}>Status notification workflow</td>
                        <td style={{ padding: 'clamp(8px, 2vw, 12px)', color: currentTheme.textSecondary }}>Medium (4 days)</td>
                        <td style={{ padding: 'clamp(8px, 2vw, 12px)', color: currentTheme.textSecondary }}>Low</td>
                        <td style={{ padding: 'clamp(8px, 2vw, 12px)', color: currentTheme.textSecondary }}>2hrs/week + better CX</td>
                      </tr>
                      <tr>
                        <td style={{ padding: 'clamp(8px, 2vw, 12px)', color: currentTheme.textSecondary }}>Invoice auto-generation</td>
                        <td style={{ padding: 'clamp(8px, 2vw, 12px)', color: currentTheme.textSecondary }}>Medium (5 days)</td>
                        <td style={{ padding: 'clamp(8px, 2vw, 12px)', color: currentTheme.textSecondary }}>Medium</td>
                        <td style={{ padding: 'clamp(8px, 2vw, 12px)', color: currentTheme.textSecondary }}>1.5hrs/week + fewer errors</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={{ marginBottom: '30px' }}>
                <h3 style={{ fontSize: 'clamp(18px, 4vw, 20px)', color: currentTheme.primary, marginTop: '0', marginBottom: '15px' }}>Recommended First Build (MVP)</h3>
                <p style={{ fontSize: 'clamp(15px, 4vw, 16px)', color: currentTheme.textSecondary, margin: '0 0 10px 0' }}>
                  <strong>Start with:</strong> Auto-sync intake → CRM
                </p>
                <p style={{ fontSize: 'clamp(15px, 4vw, 16px)', color: currentTheme.textSecondary, margin: '0' }}>
                  <strong>Why:</strong> Low effort, low risk, immediate time savings, and sets foundation for status workflow in Phase 2
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: 'clamp(18px, 4vw, 20px)', color: currentTheme.primary, marginTop: '0', marginBottom: '15px' }}>Phase Plan + Owners</h3>
                <div style={{ fontSize: 'clamp(15px, 4vw, 16px)', color: currentTheme.textSecondary, lineHeight: '1.8' }}>
                  <p style={{ margin: '0 0 10px 0' }}><strong>Phase 1 (Quick Win):</strong> Auto-sync intake form [Owner: Operations Lead]</p>
                  <p style={{ margin: '0 0 10px 0' }}><strong>Phase 2 (Core Workflow):</strong> Status notifications + invoice generation [Owner: Finance + Ops]</p>
                  <p style={{ margin: '0' }}><strong>Phase 3 (Reliability):</strong> Error handling, logging, basic monitoring [Owner: Technical Lead]</p>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div style={{ marginBottom: '50px', padding: '30px', backgroundColor: currentTheme.surface, borderRadius: currentTheme.borderRadius }}>
            <h2 style={{ fontSize: 'clamp(24px, 6vw, 28px)', color: currentTheme.text, marginTop: '0', marginBottom: '20px' }}>Timeline</h2>
            <div style={{ fontSize: 'clamp(15px, 4vw, 17px)', lineHeight: '1.9', color: currentTheme.textSecondary }}>
              <p style={{ margin: '0 0 15px 0' }}><strong>Step 1:</strong> 15-minute intake call (we discuss your workflow, pain points, and goals)</p>
              <p style={{ margin: '0 0 15px 0' }}><strong>Step 2:</strong> 48–72 hours later, you receive your 1-page audit report</p>
              <p style={{ margin: '0' }}><strong>Step 3:</strong> Optional 15-minute follow-up to clarify or adjust recommendations</p>
            </div>
          </div>

          {/* CTA Block */}
          <div style={{ padding: '40px', backgroundColor: currentTheme.background, borderRadius: currentTheme.borderRadius, border: `2px solid ${currentTheme.primary}`, textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(28px, 7vw, 32px)', color: currentTheme.text, marginTop: '0', marginBottom: '20px' }}>Ready to see your automation opportunities?</h2>
            <p style={{ fontSize: 'clamp(16px, 4vw, 18px)', color: currentTheme.textSecondary, marginBottom: '30px' }}>
              Get your 1-page automation plan with clear priorities and phased rollout.
            </p>
            <CallToActionButton onClick={() => navigate('/#contact')}>Get a 1-page automation plan</CallToActionButton>
          </div>
        </div>
      </Section>
    </>
  );
};

export default AutomationAuditReport;
