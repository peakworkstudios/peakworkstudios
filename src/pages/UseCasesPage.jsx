import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

/* ════════════════════════════════════════════
   STYLED COMPONENTS
   ════════════════════════════════════════════ */

const PageWrapper = styled.div`
  min-height: 100vh;
  background: ${p => p.theme.background};
`;

const HeroSection = styled.section`
  padding: 80px 40px 60px;
  text-align: center;
  max-width: 900px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 60px 20px 40px;
  }
`;

const HeroLabel = styled.div`
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: ${p => p.theme.primary};
  margin-bottom: 16px;
`;

const HeroTitle = styled.h1`
  font-size: clamp(36px, 6vw, 56px);
  font-weight: 900;
  letter-spacing: -2px;
  color: ${p => p.theme.text};
  margin: 0 0 20px;
  line-height: 1.1;
`;

const HeroSubtitle = styled.p`
  font-size: clamp(17px, 2.5vw, 20px);
  color: ${p => p.theme.textSecondary};
  line-height: 1.65;
  max-width: 700px;
  margin: 0 auto;
`;

const Section = styled.section`
  padding: 60px 40px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

const SectionTitle = styled.h2`
  font-size: clamp(24px, 4vw, 32px);
  font-weight: 700;
  color: ${p => p.theme.text};
  margin: 0 0 32px;
  letter-spacing: -0.5px;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: ${p => p.theme.surface};
  border: 1px solid ${p => p.theme.border};
  border-radius: ${p => p.theme.borderRadius};
  padding: 28px;
  box-shadow: ${p => p.theme.cardShadow};
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${p => p.theme.cardHoverShadow};
    border-color: ${p => p.theme.primary}40;
  }
`;

const CardTitle = styled.h3`
  font-size: 19px;
  font-weight: 700;
  color: ${p => p.theme.text};
  margin: 0 0 12px;
  line-height: 1.3;
`;

const CardDescription = styled.p`
  font-size: 15px;
  color: ${p => p.theme.textSecondary};
  line-height: 1.6;
  margin: 0 0 16px;
`;

const CardOutcome = styled.div`
  padding-top: 16px;
  border-top: 1px solid ${p => p.theme.border};
  font-size: 14px;
  color: ${p => p.theme.textSecondary};

  strong {
    color: ${p => p.theme.success};
    font-weight: 700;
  }
`;

const NoteSection = styled.div`
  max-width: 900px;
  margin: 60px auto 0;
  padding: 24px 32px;
  background: ${p => p.theme.surface};
  border: 1px solid ${p => p.theme.border};
  border-radius: ${p => p.theme.borderRadius};
  font-size: 14px;
  color: ${p => p.theme.textSecondary};
  line-height: 1.7;
  text-align: center;

  @media (max-width: 768px) {
    padding: 20px 24px;
    margin: 40px 20px 0;
  }
`;

const CTASection = styled.section`
  padding: 80px 40px;
  text-align: center;
  background: ${p => p.theme.surface};
  border-top: 1px solid ${p => p.theme.border};

  @media (max-width: 768px) {
    padding: 60px 20px;
  }
`;

const CTAHeading = styled.h2`
  font-size: clamp(28px, 5vw, 40px);
  font-weight: 800;
  color: ${p => p.theme.text};
  margin: 0 0 16px;
  letter-spacing: -1px;
`;

const CTACopy = styled.p`
  font-size: clamp(16px, 2.5vw, 18px);
  color: ${p => p.theme.textSecondary};
  max-width: 640px;
  margin: 0 auto 32px;
  line-height: 1.65;
`;

const CTAButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`;

const PrimaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: ${p => p.theme.primary};
  color: #000;
  padding: 16px 36px;
  border-radius: ${p => p.theme.borderRadius};
  font-size: 16px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(56, 189, 248, 0.25);

  &:hover {
    background: ${p => p.theme.primaryHover};
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(56, 189, 248, 0.35);
  }

  @media (max-width: 480px) {
    width: 100%;
    max-width: 320px;
  }
`;

const SecondaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: transparent;
  color: ${p => p.theme.primary};
  border: 2px solid ${p => p.theme.primary};
  padding: 14px 34px;
  border-radius: ${p => p.theme.borderRadius};
  font-size: 16px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background: ${p => p.theme.primary}15;
    transform: translateY(-2px);
  }

  @media (max-width: 480px) {
    width: 100%;
    max-width: 320px;
  }
`;

/* ════════════════════════════════════════════
   DATA
   ════════════════════════════════════════════ */

const WORKFLOW_CASES = [
  {
    title: 'Intake → Qualification → Routing',
    description: 'Automatically capture lead info, score based on criteria, and route to the right person with context.',
    outcome: 'Saves 3-5 hrs/week, zero leads lost in handoff',
  },
  {
    title: 'Follow-ups & Escalations',
    description: 'Auto-send reminders, status checks, and escalate stalled projects based on rules.',
    outcome: 'Saves 4-6 hrs/week, fewer dropped balls',
  },
  {
    title: 'Meeting → Action Items',
    description: 'Transcribe meetings, extract tasks, assign owners, and create tickets automatically.',
    outcome: 'Saves 2-3 hrs/week, no more "who was supposed to do that?"',
  },
  {
    title: 'Client Status Reporting',
    description: 'Pull data from tools, format reports, and queue for review before sending.',
    outcome: 'Reports in 30 mins instead of 6 hours',
  },
  {
    title: 'Proposal / SOW Generation',
    description: 'Intake forms auto-populate proposal templates with pricing, scope, and timelines.',
    outcome: 'Proposals in 15 mins instead of 2-3 hours',
  },
  {
    title: 'Invoice + Payment Chasing',
    description: 'Track unpaid invoices, send reminders, escalate overdue accounts automatically.',
    outcome: 'Saves 2-4 hrs/week, faster collections',
  },
];

const AI_CASES = [
  {
    title: 'Support / Email Triage Assistant',
    description: 'AI reads incoming emails, categorizes, drafts replies — human reviews before sending.',
    outcome: 'Saves 5-8 hrs/week, faster response time',
  },
  {
    title: 'Internal Knowledge Assistant',
    description: 'Chat interface answers questions from your docs, SOPs, and past projects with source citations.',
    outcome: 'Saves 1-2 hrs/day across team, onboarding 3x faster',
  },
  {
    title: 'Quality / Compliance Checker',
    description: 'AI reviews deliverables against checklists, flags missing items or errors before delivery.',
    outcome: 'Catches 80% of QA issues, saves 3-5 hrs per project',
  },
  {
    title: 'Voice Assistant for Calls & Scheduling',
    description: 'Takes calls, books meetings, answers FAQs — escalates complex requests to humans.',
    outcome: 'Handles 60-70% of inbound calls, saves 4-6 hrs/week',
  },
];

const RELIABILITY_CASES = [
  {
    title: 'Monitoring + Failure Alerts',
    description: 'Track automation health, get instant alerts when workflows break or stall.',
    outcome: 'Issues caught in hours, not days',
  },
  {
    title: 'Data Cleanup + De-duplication',
    description: 'Merge duplicate contacts, standardize formats, clean up CRM and spreadsheets automatically.',
    outcome: 'Saves 2-3 hrs/week, data accuracy up 40%',
  },
];

/* ════════════════════════════════════════════
   COMPONENT
   ════════════════════════════════════════════ */

function UseCasesPage() {
  useEffect(() => {
    document.title = 'Automation + AI Use Cases | Peak Work Studios';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = 'See what we build: Workflow automation and custom AI assistants that eliminate repetitive work for professional service teams.';
    }
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.href = 'https://peakworkstudios.com/use-cases';
  }, []);

  return (
    <PageWrapper>
      {/* Hero */}
      <HeroSection>
        <HeroLabel>Peak Work Studios</HeroLabel>
        <HeroTitle>Automation + AI Use Cases</HeroTitle>
        <HeroSubtitle>
          We eliminate repetitive, error-prone work using workflow automation or custom AI assistants (chat + voice).
        </HeroSubtitle>
      </HeroSection>

      {/* Section A: Workflow Automation */}
      <Section>
        <SectionTitle>Workflow Automation</SectionTitle>
        <CardGrid>
          {WORKFLOW_CASES.map((useCase, idx) => (
            <Card key={idx}>
              <CardTitle>{useCase.title}</CardTitle>
              <CardDescription>{useCase.description}</CardDescription>
              <CardOutcome>
                <strong>Typical outcome:</strong> {useCase.outcome}
              </CardOutcome>
            </Card>
          ))}
        </CardGrid>
      </Section>

      {/* Section B: Custom AI Assistants */}
      <Section>
        <SectionTitle>Custom AI Assistants (Chat + Voice)</SectionTitle>
        <CardGrid>
          {AI_CASES.map((useCase, idx) => (
            <Card key={idx}>
              <CardTitle>{useCase.title}</CardTitle>
              <CardDescription>{useCase.description}</CardDescription>
              <CardOutcome>
                <strong>Typical outcome:</strong> {useCase.outcome}
              </CardOutcome>
            </Card>
          ))}
        </CardGrid>
      </Section>

      {/* Section C: Reliability & Ops */}
      <Section>
        <SectionTitle>Reliability & Ops (So it doesn't break quietly)</SectionTitle>
        <CardGrid>
          {RELIABILITY_CASES.map((useCase, idx) => (
            <Card key={idx}>
              <CardTitle>{useCase.title}</CardTitle>
              <CardDescription>{useCase.description}</CardDescription>
              <CardOutcome>
                <strong>Typical outcome:</strong> {useCase.outcome}
              </CardOutcome>
            </Card>
          ))}
        </CardGrid>

        <NoteSection>
          <strong>How we implement:</strong> We use workflow automation platforms (Zapier, Make, n8n) or build custom AI systems (agents, chat, voice) with monitoring and documentation so your team can own it.
        </NoteSection>
      </Section>

      {/* CTA Section */}
      <CTASection>
        <CTAHeading>Want to see what you're losing to manual work?</CTAHeading>
        <CTACopy>
          Use the calculator to estimate time + cost leakage, or book a discovery call for a 1-page automation plan.
        </CTACopy>
        <CTAButtons>
          <PrimaryButton to="/calculator">Calculate Your Hidden Costs</PrimaryButton>
          <SecondaryButton to="/contact">Book Discovery Call</SecondaryButton>
        </CTAButtons>
      </CTASection>
    </PageWrapper>
  );
}

export default UseCasesPage;
