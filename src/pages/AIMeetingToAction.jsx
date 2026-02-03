import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AIMeetingToAction = ({ currentTheme, Section, FeatureCard, CallToActionButton }) => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'AI Meeting-to-Action System | Kunal Deshmukh';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Turn meeting notes into structured decisions, action items, owners, and risks—ready for Jira, Confluence, or email.');
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
              AI Meeting-to-Action System
            </h1>
            <p style={{ fontSize: '22px', color: currentTheme.textSecondary, lineHeight: '1.6', margin: '0' }}>
              Turn notes into decisions, action items, owners, and risks—ready for email, Jira, or Confluence.
            </p>
          </div>

          {/* What it is */}
          <div style={{ marginBottom: '50px', padding: '30px', backgroundColor: currentTheme.surface, borderRadius: currentTheme.borderRadius }}>
            <h2 style={{ fontSize: '28px', color: currentTheme.text, marginTop: '0', marginBottom: '20px' }}>What it is</h2>
            <p style={{ fontSize: '17px', lineHeight: '1.7', color: currentTheme.textSecondary, margin: '0' }}>
              A lightweight AI system that processes meeting notes or transcripts and extracts structured information: decisions made, action items with owners and due dates, identified risks or blockers, and follow-up questions. The output is formatted for immediate use in your project management tool or as a follow-up email—no manual reformatting required. The system is privacy-scoped, meaning no sensitive data is stored or used for training.
            </p>
          </div>

          {/* Who it's for */}
          <div style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '28px', color: currentTheme.text, marginBottom: '25px' }}>Who it's for</h2>
            <div style={{ display: 'grid', gap: '20px' }}>
              <FeatureCard>
                <h3 style={{ fontSize: '20px', marginTop: '0' }}>Teams who lose track of what was decided</h3>
                <p style={{ margin: '0', fontSize: '16px' }}>You have meetings, but action items get lost in notes or never make it to Jira. Everyone has a different version of "what we agreed on."</p>
              </FeatureCard>
              <FeatureCard>
                <h3 style={{ fontSize: '20px', marginTop: '0' }}>Managers tired of chasing follow-ups</h3>
                <p style={{ margin: '0', fontSize: '16px' }}>You spend 30 minutes after every meeting manually creating tickets or emailing summaries to the team.</p>
              </FeatureCard>
              <FeatureCard>
                <h3 style={{ fontSize: '20px', marginTop: '0' }}>Teams with remote or async work patterns</h3>
                <p style={{ margin: '0', fontSize: '16px' }}>Not everyone attends every meeting. You need clear, structured summaries that anyone can act on without watching a recording.</p>
              </FeatureCard>
            </div>
          </div>

          {/* What you receive */}
          <div style={{ marginBottom: '50px', padding: '30px', backgroundColor: currentTheme.surface, borderRadius: currentTheme.borderRadius }}>
            <h2 style={{ fontSize: '28px', color: currentTheme.text, marginTop: '0', marginBottom: '25px' }}>What the system outputs</h2>
            <ul style={{ fontSize: '17px', lineHeight: '1.9', color: currentTheme.textSecondary, paddingLeft: '25px', margin: '0' }}>
              <li><strong>Decisions:</strong> What was decided, with context</li>
              <li><strong>Action items:</strong> What needs to be done, by whom, by when</li>
              <li><strong>Owners:</strong> Clear assignment of responsibility</li>
              <li><strong>Due dates:</strong> Extracted or inferred from discussion</li>
              <li><strong>Risks/Blockers:</strong> Issues flagged for attention</li>
              <li><strong>Follow-up questions:</strong> Unresolved items that need clarification</li>
            </ul>
          </div>

          {/* Example output */}
          <div style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '28px', color: currentTheme.text, marginBottom: '25px' }}>Example output (public-safe)</h2>
            <div style={{ padding: '30px', backgroundColor: currentTheme.background, borderRadius: currentTheme.borderRadius, border: `1px solid ${currentTheme.border}`, fontFamily: 'monospace', fontSize: '15px', lineHeight: '1.8', color: currentTheme.textSecondary }}>
              <div style={{ marginBottom: '25px' }}>
                <div style={{ color: currentTheme.primary, fontWeight: '600', marginBottom: '10px' }}>DECISIONS</div>
                <div>• We're moving forward with the phased rollout approach</div>
                <div>• Will use Zapier for quick win, then evaluate custom build for Phase 2</div>
                <div>• Finance team owns invoice automation, Ops owns intake sync</div>
              </div>

              <div style={{ marginBottom: '25px' }}>
                <div style={{ color: currentTheme.primary, fontWeight: '600', marginBottom: '10px' }}>ACTION ITEMS</div>
                <div style={{ marginBottom: '8px' }}>
                  <div><strong>[Alex]</strong> Set up intake form → CRM sync</div>
                  <div style={{ paddingLeft: '20px', fontSize: '14px', color: currentTheme.textSecondary }}>Due: Feb 10 | Est: 2 days</div>
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <div><strong>[Jordan]</strong> Document current invoice workflow</div>
                  <div style={{ paddingLeft: '20px', fontSize: '14px', color: currentTheme.textSecondary }}>Due: Feb 8 | Est: 4 hours</div>
                </div>
                <div>
                  <div><strong>[Sam]</strong> Review error handling requirements with team</div>
                  <div style={{ paddingLeft: '20px', fontSize: '14px', color: currentTheme.textSecondary }}>Due: Feb 12 | Est: 1 hour</div>
                </div>
              </div>

              <div style={{ marginBottom: '25px' }}>
                <div style={{ color: currentTheme.warning, fontWeight: '600', marginBottom: '10px' }}>RISKS / BLOCKERS</div>
                <div>• CRM API rate limits unclear—need to verify with vendor</div>
                <div>• No current error monitoring in place; need basic alerting before launch</div>
              </div>

              <div>
                <div style={{ color: currentTheme.textSecondary, fontWeight: '600', marginBottom: '10px' }}>FOLLOW-UP QUESTIONS</div>
                <div>• Who approves invoices if auto-generated? Does Finance need a review step?</div>
                <div>• What happens if intake form schema changes? Need versioning plan?</div>
              </div>
            </div>
            <div style={{ marginTop: '20px', padding: '20px', backgroundColor: currentTheme.surface, borderRadius: currentTheme.borderRadius, fontSize: '15px', color: currentTheme.textSecondary, fontStyle: 'italic' }}>
              <strong>Privacy note:</strong> We keep prompts and outputs scoped to your workspace. No sensitive data is required for the sample system, and you control what gets processed.
            </div>
          </div>

          {/* How it works */}
          <div style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '28px', color: currentTheme.text, marginBottom: '25px' }}>How it works</h2>
            <div style={{ display: 'grid', gap: '20px' }}>
              <FeatureCard>
                <h3 style={{ fontSize: '20px', marginTop: '0' }}>1. Input your meeting notes</h3>
                <p style={{ margin: '0', fontSize: '16px' }}>Paste notes, upload a transcript, or integrate with your meeting tool (Zoom, Teams, etc.). The system handles messy, unstructured input.</p>
              </FeatureCard>
              <FeatureCard>
                <h3 style={{ fontSize: '20px', marginTop: '0' }}>2. AI extracts structured data</h3>
                <p style={{ margin: '0', fontSize: '16px' }}>The system identifies decisions, action items, owners, dates, and risks using context-aware processing. No manual tagging required.</p>
              </FeatureCard>
              <FeatureCard>
                <h3 style={{ fontSize: '20px', marginTop: '0' }}>3. Export or sync to your tools</h3>
                <p style={{ margin: '0', fontSize: '16px' }}>Copy formatted output for email, create Jira tickets automatically, or push to Confluence as a page. Choose your workflow.</p>
              </FeatureCard>
            </div>
          </div>

          {/* Timeline */}
          <div style={{ marginBottom: '50px', padding: '30px', backgroundColor: currentTheme.surface, borderRadius: currentTheme.borderRadius }}>
            <h2 style={{ fontSize: '28px', color: currentTheme.text, marginTop: '0', marginBottom: '20px' }}>Timeline</h2>
            <div style={{ fontSize: '17px', lineHeight: '1.9', color: currentTheme.textSecondary }}>
              <p style={{ margin: '0 0 15px 0' }}><strong>Discovery:</strong> 15-minute call to understand your meeting cadence and tool stack</p>
              <p style={{ margin: '0 0 15px 0' }}><strong>MVP build:</strong> 5–7 days to implement core extraction + formatting</p>
              <p style={{ margin: '0 0 15px 0' }}><strong>Testing:</strong> 3–5 meetings to refine prompts and output format</p>
              <p style={{ margin: '0' }}><strong>Handoff:</strong> Documentation + training on how to use and maintain the system</p>
            </div>
          </div>

          {/* CTA Block */}
          <div style={{ padding: '40px', backgroundColor: currentTheme.background, borderRadius: currentTheme.borderRadius, border: `2px solid ${currentTheme.primary}`, textAlign: 'center' }}>
            <h2 style={{ fontSize: '32px', color: currentTheme.text, marginTop: '0', marginBottom: '20px' }}>Stop losing decisions and action items</h2>
            <p style={{ fontSize: '18px', color: currentTheme.textSecondary, marginBottom: '30px' }}>
              Get a 1-page plan showing how this system fits your workflow.
            </p>
            <CallToActionButton onClick={() => navigate('/#contact')}>Get a 1-page automation plan</CallToActionButton>
          </div>
        </div>
      </Section>
    </>
  );
};

export default AIMeetingToAction;
