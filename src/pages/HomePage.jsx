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
              <circle cx="30" cy="30" r="25" fill="none" stroke={currentTheme.primary} strokeWidth="2" opacity="0.6"/>
              <path d="M20 30 L28 38 L42 22" stroke={currentTheme.primary} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </BuilderAvatar>
          <BuilderInfo>
            <BuilderName>Peak Work Studios — Calgary, Canada</BuilderName>
            <div>Reliable automation services for SMEs</div>
          </BuilderInfo>
        </BuilderBadge>
        <h2>Reliable automation for SMEs—reduce manual processes and dropped handoffs.</h2>
        <p>Peak Work Studios designs AI-assisted workflows that minimize busywork, ensure follow-through, and keep systems stable after launch.</p>
        <CTAGroup>
          <CallToActionButton onClick={() => scrollToSection(contactRef)}>Schedule an Automation Consultation</CallToActionButton>
          <CallToActionButton style={{ backgroundColor: 'transparent', color: currentTheme.primary, border: `2px solid ${currentTheme.primary}`, boxShadow: 'none' }} onClick={() => scrollToSection(servicesRef)}>View our capabilities</CallToActionButton>
        </CTAGroup>
      </HeroSection>

      <Section id="services" ref={servicesRef} bgColor={currentTheme.surface} delay="0.2s">
        <h2>Our Approach</h2>
        <div style={{ maxWidth: '700px', margin: '0 auto 50px', padding: '30px', backgroundColor: currentTheme.background, borderRadius: currentTheme.borderRadius, border: `1px solid ${currentTheme.border}`, textAlign: 'left' }}>
          <h3 style={{ fontSize: '22px', color: currentTheme.primary, marginTop: '0', marginBottom: '20px' }}>What sets us apart</h3>
          <ul style={{ fontSize: '17px', lineHeight: '1.8', color: currentTheme.textSecondary, paddingLeft: '20px', margin: '0' }}>
            <li>Team of experienced automation engineers</li>
            <li>Secure, maintainable implementations</li>
            <li>Cost-aware solutions with no vendor lock-in</li>
            <li>1-page plan before we build—clarity from day one</li>
          </ul>
        </div>
        <FeaturesGrid>
          <FeatureCard>
            <h3>Manual work reduction</h3>
            <p>We eliminate repetitive data entry, copy-paste workflows, and status update busywork. Our clients typically free up 5-15 hours per week per person.</p>
          </FeatureCard>
          <FeatureCard>
            <h3>Handoff automation</h3>
            <p>Our systems prevent work from getting lost between tools, teams, or departments with automatic routing, notifications, and status tracking.</p>
          </FeatureCard>
          <FeatureCard>
            <h3>Reliable reporting</h3>
            <p>We build accurate, on-demand reporting systems without spreadsheet complexity. Real-time dashboards that your team can trust.</p>
          </FeatureCard>
        </FeaturesGrid>
      </Section>

      <Section id="work" ref={workRef} delay="0.3s">
        <h2>Sample Deliverables</h2>
        <p>Examples of what our team delivers—structured solutions you can implement immediately.</p>
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
        <h2>About Peak Work Studios</h2>
        <p>We build automation systems that reduce manual work, prevent dropped handoffs, and create reliable workflows your team can maintain.</p>
        
        <h3 style={{ fontSize: '28px', fontWeight: '700', color: currentTheme.text, marginTop: '60px', marginBottom: '30px' }}>How We Help SMEs</h3>
        <FeaturesGrid>
          <FeatureCard>
            <h3>Drowning in manual processes</h3>
            <p>When your team spends hours on repetitive tasks, we identify and eliminate bottlenecks with practical automation solutions.</p>
          </FeatureCard>
          <FeatureCard>
            <h3>Handoffs falling through cracks</h3>
            <p>Work getting lost between tools and teams? We design workflows that automatically route and track work through completion.</p>
          </FeatureCard>
          <FeatureCard>
            <h3>Systems becoming black boxes</h3>
            <p>We build maintainable solutions with clear documentation and ownership so your team stays in control.</p>
          </FeatureCard>
          <FeatureCard>
            <h3>Need reliability, not complexity</h3>
            <p>Our focus is on stability, error handling, and observability from day one—systems that hold up under pressure.</p>
          </FeatureCard>
        </FeaturesGrid>

        <h3 style={{ fontSize: '28px', fontWeight: '700', color: currentTheme.text, marginTop: '60px', marginBottom: '30px' }}>Our Process</h3>
        <FeaturesGrid>
          <FeatureCard>
            <h3>Assess</h3>
            <p>We start by mapping your current workflow and identifying specific pain points. No generic solutions—targeted fixes that address your team's real needs.</p>
          </FeatureCard>
          <FeatureCard>
            <h3>Build</h3>
            <p>Our team builds practical automation using proven tools and clear patterns. Everything is documented with attention to security, error handling, and edge cases.</p>
          </FeatureCard>
          <FeatureCard>
            <h3>Launch & Support</h3>
            <p>After launch, we set up monitoring and logging so you can see what's working. Your team stays in control with full visibility and documentation.</p>
          </FeatureCard>
        </FeaturesGrid>

        <div style={{ marginTop: '60px', padding: '40px', backgroundColor: currentTheme.background, borderRadius: currentTheme.borderRadius, border: `1px solid ${currentTheme.border}`, maxWidth: '800px', textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '30px', flexWrap: 'wrap' }}>
            <div style={{ width: '120px', height: '120px', borderRadius: '12px', backgroundColor: currentTheme.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: `2px solid ${currentTheme.border}` }}>
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="30" cy="30" r="25" fill="none" stroke={currentTheme.primary} strokeWidth="2" opacity="0.5"/>
                <path d="M20 30 L28 38 L42 22" stroke={currentTheme.primary} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div style={{ flex: 1, minWidth: '250px' }}>
              <h3 style={{ fontSize: '24px', color: currentTheme.primary, marginBottom: '15px', marginTop: '0' }}>Our Mission</h3>
              <p style={{ fontSize: '17px', lineHeight: '1.7', color: currentTheme.textSecondary, marginBottom: '0' }}>
                Peak Work Studios helps SMEs build maintainable, secure automation systems that free teams from busywork and keep operations running smoothly. Based in Calgary, our team brings expertise across process engineering, AI development, and operations.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section id="contact" ref={contactRef} delay="0.5s">
        <h2>Schedule an Automation Consultation</h2>
        <div style={{ maxWidth: '650px', margin: '0 auto 40px', textAlign: 'left', padding: '30px', backgroundColor: currentTheme.surface, borderRadius: currentTheme.borderRadius, border: `1px solid ${currentTheme.border}` }}>
          <h3 style={{ fontSize: '20px', color: currentTheme.text, marginTop: '0', marginBottom: '20px' }}>What to expect:</h3>
          <ul style={{ fontSize: '17px', lineHeight: '1.8', color: currentTheme.textSecondary, paddingLeft: '20px', margin: '0', listStyle: 'none' }}>
            <li style={{ marginBottom: '12px' }}>✓ Discovery call with our team</li>
            <li style={{ marginBottom: '12px' }}>✓ Receive a 1-page action plan (quick wins + phased rollout)</li>
            <li style={{ marginBottom: '0' }}>✓ No obligations—we'll advise honestly on fit and approach</li>
          </ul>
        </div>
        {/* ContactForm component will be passed here */}
      </Section>
    </>
  );
};

export default HomePage;
