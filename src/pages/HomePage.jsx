import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = ({ currentTheme, CallToActionButton, Section, HeroSection, FeaturesGrid, FeatureCard, BuilderBadge, BuilderAvatar, BuilderInfo, BuilderName, CTAGroup }) => {
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const workRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const navigate = useNavigate();

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <HeroSection id="home" ref={heroRef} minHeight="100vh">
        <BuilderBadge>
          <BuilderAvatar>
            <svg width="32" height="32" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="30" cy="20" r="10" fill={currentTheme.textSecondary} opacity="0.4"/>
              <path d="M12 48c0-10 8-18 18-18s18 8 18 18" stroke={currentTheme.textSecondary} strokeWidth="2.5" opacity="0.4" fill="none"/>
            </svg>
          </BuilderAvatar>
          <BuilderInfo>
            <BuilderName>Kunal Deshmukh — Calgary, Canada</BuilderName>
            <div>Practical automation systems for SMEs</div>
          </BuilderInfo>
        </BuilderBadge>
        <h2>Stop losing work to manual processes and dropped handoffs.</h2>
        <p>Get reliable automation that reduces busywork, catches follow-ups, and gives you accurate reporting—without the complexity.</p>
        <CTAGroup>
          <CallToActionButton onClick={() => scrollToSection(contactRef)}>Get a 1-page automation plan</CallToActionButton>
          <CallToActionButton style={{ backgroundColor: 'transparent', color: currentTheme.primary, border: `2px solid ${currentTheme.primary}`, boxShadow: 'none' }} onClick={() => scrollToSection(servicesRef)}>See sample deliverables</CallToActionButton>
        </CTAGroup>
      </HeroSection>

      <Section id="services" ref={servicesRef} bgColor={currentTheme.surface} delay="0.2s">
        <h2>How this works</h2>
        <div style={{ maxWidth: '700px', margin: '0 auto 50px', padding: '30px', backgroundColor: currentTheme.background, borderRadius: currentTheme.borderRadius, border: `1px solid ${currentTheme.border}`, textAlign: 'left' }}>
          <h3 style={{ fontSize: '22px', color: currentTheme.primary, marginTop: '0', marginBottom: '20px' }}>Proof of approach</h3>
          <ul style={{ fontSize: '17px', lineHeight: '1.8', color: currentTheme.textSecondary, paddingLeft: '20px', margin: '0' }}>
            <li>Maintainable — Your team can understand and modify it</li>
            <li>Secure — Basic auth, input validation, and audit trails from day one</li>
            <li>Cost-aware — No hidden scaling costs or vendor lock-in surprises</li>
            <li>1-page plan before build — Know what you're getting before we start</li>
          </ul>
        </div>
        <FeaturesGrid>
          <FeatureCard>
            <h3>Manual work reduction</h3>
            <p>Eliminate repetitive data entry, copy-paste workflows, and status update busywork. Free up 5-15 hours per week per person.</p>
          </FeatureCard>
          <FeatureCard>
            <h3>Handoff automation</h3>
            <p>Stop losing work between tools, teams, or departments. Automatic routing, notifications, and status tracking.</p>
          </FeatureCard>
          <FeatureCard>
            <h3>Reliable reporting</h3>
            <p>Get accurate, on-demand reports without spreadsheet gymnastics. Real-time dashboards that actually match your data.</p>
          </FeatureCard>
        </FeaturesGrid>
      </Section>

      <Section id="work" ref={workRef} delay="0.3s">
        <h2>Public-safe deliverables and templates</h2>
        <p>Examples of what you receive—no client names, just the approach and structure.</p>
        <FeaturesGrid>
          <FeatureCard 
            onClick={() => navigate('/work/automation-audit-report')}
            style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
              <h3 style={{ margin: 0 }}>Automation Audit Report</h3>
              <span style={{ fontSize: '12px', padding: '4px 10px', backgroundColor: currentTheme.surface, borderRadius: '6px', color: currentTheme.primary, fontWeight: '600' }}>Template</span>
            </div>
            <p style={{ marginBottom: '15px' }}>One-page diagnostic showing top opportunities, impact estimates, and phased rollout plan.</p>
            <ul style={{ fontSize: '15px', lineHeight: '1.7', color: currentTheme.textSecondary, paddingLeft: '20px', margin: '0 0 15px 0', textAlign: 'left' }}>
              <li>Top 3 opportunities ranked by effort vs impact</li>
              <li>Phased rollout: quick wins → core workflow → reliability</li>
              <li>Risks + guardrails to prevent breakage</li>
            </ul>
            <div style={{ color: currentTheme.primary, fontWeight: '600', fontSize: '15px', marginTop: 'auto' }}>
              View sample report →
            </div>
          </FeatureCard>
          <FeatureCard 
            onClick={() => navigate('/work/ai-meeting-to-action')}
            style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
              <h3 style={{ margin: 0 }}>AI Meeting-to-Action System</h3>
              <span style={{ fontSize: '12px', padding: '4px 10px', backgroundColor: currentTheme.surface, borderRadius: '6px', color: currentTheme.primary, fontWeight: '600' }}>System</span>
            </div>
            <p style={{ marginBottom: '15px' }}>Turn notes into decisions, action items, owners, and risks—ready for Jira or Confluence.</p>
            <ul style={{ fontSize: '15px', lineHeight: '1.7', color: currentTheme.textSecondary, paddingLeft: '20px', margin: '0 0 15px 0', textAlign: 'left' }}>
              <li>Extracts decisions, actions, owners, and due dates</li>
              <li>Flags risks, blockers, and follow-up questions</li>
              <li>Privacy-scoped: no sensitive data required</li>
            </ul>
            <div style={{ color: currentTheme.primary, fontWeight: '600', fontSize: '15px', marginTop: 'auto' }}>
              View system details →
            </div>
          </FeatureCard>
          <FeatureCard 
            onClick={() => navigate('/work/ops-reporting-pack')}
            style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
              <h3 style={{ margin: 0 }}>Ops Reporting Pack</h3>
              <span style={{ fontSize: '12px', padding: '4px 10px', backgroundColor: currentTheme.surface, borderRadius: '6px', color: currentTheme.primary, fontWeight: '600' }}>Pack</span>
            </div>
            <p style={{ marginBottom: '15px' }}>Weekly status + KPI snapshot templates with simple, reliable collection process.</p>
            <ul style={{ fontSize: '15px', lineHeight: '1.7', color: currentTheme.textSecondary, paddingLeft: '20px', margin: '0 0 15px 0', textAlign: 'left' }}>
              <li>Weekly status template with consistent format</li>
              <li>KPI snapshot with target vs actual tracking</li>
              <li>Definitions sheet: what each metric means</li>
            </ul>
            <div style={{ color: currentTheme.primary, fontWeight: '600', fontSize: '15px', marginTop: 'auto' }}>
              View templates →
            </div>
          </FeatureCard>
        </FeaturesGrid>
      </Section>

      <Section id="about" ref={aboutRef} bgColor={currentTheme.surface} delay="0.4s">
        <h2>About</h2>
        <p>Building automation that reduces manual work, prevents dropped handoffs, and creates systems your team can maintain.</p>
        
        <h3 style={{ fontSize: '28px', fontWeight: '700', color: currentTheme.text, marginTop: '60px', marginBottom: '30px' }}>What I Help With</h3>
        <FeaturesGrid>
          <FeatureCard>
            <h3>You're drowning in manual processes</h3>
            <p>Your team spends hours on repetitive tasks that should be automated. I help identify and eliminate these bottlenecks with practical automation.</p>
          </FeatureCard>
          <FeatureCard>
            <h3>Handoffs keep falling through the cracks</h3>
            <p>Work gets lost between tools and teams. I design workflows that automatically route and track work through completion.</p>
          </FeatureCard>
          <FeatureCard>
            <h3>Nobody knows how it works anymore</h3>
            <p>Your systems have become black boxes. I build maintainable solutions with clear documentation and ownership.</p>
          </FeatureCard>
          <FeatureCard>
            <h3>You need reliability, not just features</h3>
            <p>Systems that break at 2am aren't helpful. I focus on stability, error handling, and basic observability from day one.</p>
          </FeatureCard>
        </FeaturesGrid>

        <h3 style={{ fontSize: '28px', fontWeight: '700', color: currentTheme.text, marginTop: '60px', marginBottom: '30px' }}>How I Work</h3>
        <FeaturesGrid>
          <FeatureCard>
            <h3>Plan</h3>
            <p>We start by mapping your current workflow and identifying specific pain points. No generic solutions—just targeted fixes that address your team's real needs.</p>
          </FeatureCard>
          <FeatureCard>
            <h3>Build</h3>
            <p>I build practical automation using proven tools and clear patterns. Everything is documented as we go, with attention to security, error handling, and edge cases.</p>
          </FeatureCard>
          <FeatureCard>
            <h3>Observe</h3>
            <p>After launch, I set up basic monitoring and logging so you can see what's working and catch issues early. Your team stays in control.</p>
          </FeatureCard>
        </FeaturesGrid>

        <div style={{ marginTop: '60px', padding: '40px', backgroundColor: currentTheme.background, borderRadius: currentTheme.borderRadius, border: `1px solid ${currentTheme.border}`, maxWidth: '800px', textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '30px', flexWrap: 'wrap' }}>
            <div style={{ width: '120px', height: '120px', borderRadius: '12px', backgroundColor: currentTheme.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: `2px solid ${currentTheme.border}` }}>
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="30" cy="20" r="12" fill={currentTheme.textSecondary} opacity="0.3"/>
                <path d="M10 50c0-11 9-20 20-20s20 9 20 20" stroke={currentTheme.textSecondary} strokeWidth="3" opacity="0.3" fill="none"/>
              </svg>
            </div>
            <div style={{ flex: 1, minWidth: '250px' }}>
              <h3 style={{ fontSize: '24px', color: currentTheme.primary, marginBottom: '15px', marginTop: '0' }}>About Kunal</h3>
              <p style={{ fontSize: '17px', lineHeight: '1.7', color: currentTheme.textSecondary, marginBottom: '0' }}>
                I'm Kunal Deshmukh, based in Calgary. I build practical automation systems for small and mid-sized teams—focused on reliability, clear ownership, and workflows your team can actually maintain.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section id="contact" ref={contactRef} delay="0.5s">
        <h2>Get a Workflow Automation Audit</h2>
        <div style={{ maxWidth: '650px', margin: '0 auto 40px', textAlign: 'left', padding: '30px', backgroundColor: currentTheme.surface, borderRadius: currentTheme.borderRadius, border: `1px solid ${currentTheme.border}` }}>
          <h3 style={{ fontSize: '20px', color: currentTheme.text, marginTop: '0', marginBottom: '20px' }}>What to expect:</h3>
          <ul style={{ fontSize: '17px', lineHeight: '1.8', color: currentTheme.textSecondary, paddingLeft: '20px', margin: '0', listStyle: 'none' }}>
            <li style={{ marginBottom: '12px' }}>✓ 15-minute intake call</li>
            <li style={{ marginBottom: '12px' }}>✓ You get a 1-page action plan (quick wins + phased rollout)</li>
            <li style={{ marginBottom: '0' }}>✓ No pressure—if I'm not a fit, I'll say so</li>
          </ul>
        </div>
        {/* ContactForm component will be passed here */}
      </Section>
    </>
  );
};

export default HomePage;
