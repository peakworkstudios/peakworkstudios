import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  ArrowRight,
  Bot,
  ChartColumn,
  CheckCheck,
  ChevronDown,
  ClipboardCheck,
  FileCheck,
  Gauge,
  Lock,
  MessagesSquare,
  ShieldCheck,
  Sparkles,
  Waypoints,
} from 'lucide-react';

const opportunityAreas = [
  {
    label: 'Status chasing',
    value: '5-10 hrs / week',
    detail: 'Project managers answering the same delivery questions in Slack, email, and meetings.',
  },
  {
    label: 'Report assembly',
    value: '3-6 hrs / report',
    detail: 'Pulling metrics from multiple tools, reformatting spreadsheets, and checking for mistakes.',
  },
  {
    label: 'Manual follow-up',
    value: '4-8 hrs / week',
    detail: 'Client reminders, internal nudges, and approval requests that still depend on memory.',
  },
];

const painPoints = [
  {
    title: 'Work lives in people, not systems',
    body: 'Critical handoffs still depend on who remembers the next step, which makes delivery quality fragile the moment volume goes up.',
  },
  {
    title: 'Teams duplicate the same admin work',
    body: 'Client data gets re-entered across CRMs, boards, docs, spreadsheets, and reporting decks because no one owns the flow end-to-end.',
  },
  {
    title: 'Leadership gets lagging visibility',
    body: 'By the time a report is assembled, the risk has already happened. The team knows the status, but the system does not.',
  },
];

const capabilities = [
  {
    icon: Waypoints,
    title: 'Workflow automation',
    body: 'Intake, project setup, routing, QA, approvals, follow-ups, and recurring operational steps stitched into one dependable flow.',
    bullets: ['Tool-agnostic implementation', 'Fallback paths when data breaks', 'Approval gates before external actions'],
  },
  {
    icon: Bot,
    title: 'Custom AI assistants',
    body: 'Task-specific assistants that summarize meetings, draft updates, answer internal questions, and prepare work without pretending to run the company.',
    bullets: ['Knowledge-grounded outputs', 'Human review where it matters', 'Clear boundaries on autonomy'],
  },
  {
    icon: ChartColumn,
    title: 'Reporting and visibility',
    body: 'Operational dashboards and scheduled reporting built from source systems so delivery, utilization, and risk are visible before clients feel it.',
    bullets: ['Leadership-ready summaries', 'Scheduled delivery', 'One version of the truth'],
  },
];

const transformationRows = [
  {
    label: 'New client setup',
    before: 'Checklist in someone’s head, scattered across email and notes.',
    after: 'Structured intake, auto-created records, routed tasks, and visible ownership.',
  },
  {
    label: 'Weekly reporting',
    before: 'Manual data pulls and slide polishing at the end of the week.',
    after: 'Metrics assembled from source tools with a final human QA pass.',
  },
  {
    label: 'Internal handoffs',
    before: 'Slack messages, vague context, and inconsistent next steps.',
    after: 'Assigned tasks with context, due dates, and escalation logic.',
  },
  {
    label: 'Meeting follow-through',
    before: 'Action items disappear into transcripts or memory.',
    after: 'Summaries, action items, and follow-ups prepared automatically for review.',
  },
];

const processSteps = [
  {
    step: '01',
    title: 'Audit the operation',
    body: 'We identify where the team is paying the manual-work tax and where automation can reduce risk fastest.',
  },
  {
    step: '02',
    title: 'Design the system',
    body: 'Flows, approvals, exceptions, ownership, and reporting are mapped before anything gets built.',
  },
  {
    step: '03',
    title: 'Build with guardrails',
    body: 'Automations and assistants are implemented with fallbacks, checkpoints, and practical operating constraints.',
  },
  {
    step: '04',
    title: 'Hand off cleanly',
    body: 'The team gets documentation, walkthroughs, and a system they can actually run after delivery.',
  },
];

const guardrails = [
  {
    icon: ShieldCheck,
    title: 'Human review stays in the loop',
    body: 'Nothing client-facing needs to go out blind. Approval gates are part of the architecture, not an afterthought.',
  },
  {
    icon: Lock,
    title: 'Audit trails and traceability',
    body: 'Actions, triggers, and decisions are visible so the team can understand what happened and why.',
  },
  {
    icon: FileCheck,
    title: 'Documented for the operator',
    body: 'The final system ships with instructions, ownership, and maintenance context instead of tribal knowledge.',
  },
  {
    icon: Gauge,
    title: 'Built for reliability first',
    body: 'If a tool fails, a record changes, or a request is incomplete, the flow degrades safely instead of silently breaking.',
  },
];

const nextActions = [
  {
    icon: ClipboardCheck,
    title: 'Run the operations audit',
    body: 'Answer ten questions and surface the first automation priorities worth fixing.',
    to: '/audit',
    cta: 'Start the audit',
  },
  {
    icon: MessagesSquare,
    title: 'Review practical use cases',
    body: 'See where workflow automation, AI assistants, and reporting systems usually pay off fastest.',
    to: '/use-cases',
    cta: 'See use cases',
  },
  {
    icon: Sparkles,
    title: 'Estimate the cost of delay',
    body: 'Quantify what manual operations are costing the team before deciding what to automate first.',
    to: '/calculator',
    cta: 'Open calculator',
  },
];

const INK = '#0d1614';
const INK_TEXT = '#e4ebe9';
const INK_MUTED = '#c9d4d1';
const INK_ACCENT = '#8fd6c3';

const ledgerEntries = [
  {
    time: '09:02',
    what: 'Client intake routed, tasks created',
    tag: 'Logged',
    detail: 'Trigger, owner and every field written are recorded, so anyone can answer "what happened and why" without asking around.',
  },
  {
    time: '09:40',
    what: 'Weekly client report drafted',
    tag: 'Awaiting review',
    review: true,
    detail: 'Metrics are assembled from source tools. Nothing client-facing leaves until a named person approves it.',
  },
  {
    time: '10:15',
    what: 'CRM field missing, fallback used',
    tag: 'Fallback',
    detail: 'When a tool fails or a record is incomplete, the flow degrades safely and flags an owner instead of silently breaking.',
  },
];

const trustItems = [
  { k: 'Human review', title: 'Nothing goes out blind', body: 'Approval gates sit before every external action. They are part of the architecture.' },
  { k: 'Audit trail', title: 'Every step traceable', body: 'Actions, triggers and decisions are visible to the operator.' },
  { k: 'Fallbacks', title: 'Fails safe, not silent', body: 'Broken data or a down tool routes to an owner rather than disappearing.' },
];

const Page = styled.div`
  color: ${p => p.theme.text};
`;

const Section = styled.section`
  padding: ${p => (p.$hero ? '42px 16px 24px' : '36px 16px')};

  @media (min-width: 768px) {
    padding: ${p => (p.$hero ? '54px 24px 34px' : '48px 24px')};
  }
`;

const Frame = styled.div`
  max-width: 1220px;
  margin: 0 auto;
`;

const Panel = styled.div`
  position: relative;
  overflow: hidden;
  border: 1px solid ${p => p.theme.border};
  border-radius: ${p => (p.$tight ? p.theme.borderRadius : p.theme.borderRadiusLg)};
  background: ${p => (p.$dark ? p.theme.secondary : p.theme.surface)};
  color: ${p => (p.$dark ? '#f8fafc' : p.theme.text)};
  box-shadow: ${p => p.theme.cardShadow};
`;

const HeroGrid = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  gap: 28px;

  @media (min-width: 960px) {
    grid-template-columns: minmax(0, 1.4fr) minmax(320px, 0.86fr);
    align-items: start;
  }
`;

const Eyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 18px;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${p => p.theme.textSecondary};
`;

const Dot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${p => p.theme.primary};
`;

const HeroLead = styled.p`
  max-width: 680px;
  margin: 24px 0 0;
  font-size: clamp(1rem, 2.3vw, 1.2rem);
  line-height: 1.8;
  color: ${p => p.theme.textSecondary};
`;

const ActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
`;

const PrimaryAction = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 52px;
  padding: 0 22px;
  border-radius: ${p => p.theme.borderRadius};
  background: ${p => p.theme.primary};
  color: ${p => p.theme.buttonText};
  font-size: 15px;
  font-weight: 800;
  transition: transform 180ms ease, background-color 180ms ease;

  &:hover {
    transform: translateY(-1px);
    background: ${p => p.theme.primaryHover};
  }
`;

const BriefCard = styled(Panel)`
  padding: 24px;
  background: ${INK};
  color: #f8fafc;
  margin-top: 32px;
`;

const BriefLabel = styled.div`
  margin-bottom: 14px;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${p => (p.theme.background === '#0b1210' ? 'rgba(181, 192, 209, 0.9)' : 'rgba(248, 250, 252, 0.72)')};
`;

const BriefTitle = styled.h2`
  margin: 0;
  font-family: ${p => p.theme.headingFont};
  font-size: 36px;
  line-height: 1;
  letter-spacing: -0.04em;
`;

const BriefText = styled.p`
  margin: 14px 0 0;
  font-size: 15px;
  line-height: 1.75;
  color: ${p => (p.theme.background === '#0b1210' ? 'rgba(219, 229, 246, 0.88)' : 'rgba(248, 250, 252, 0.76)')};
`;

const OpportunityList = styled.div`
  display: grid;
  gap: 14px;
  margin-top: 24px;
`;

const OpportunityItem = styled.div`
  padding-top: 14px;
  border-top: 1px solid ${p => (p.theme.background === '#0b1210' ? 'rgba(181, 192, 209, 0.16)' : 'rgba(248, 250, 252, 0.14)')};
`;

const OpportunityValue = styled.div`
  font-size: 22px;
  font-weight: 800;
  color: ${p => p.theme.primary};
`;

const OpportunityLabel = styled.div`
  margin-top: 4px;
  font-size: 15px;
  font-weight: 700;
  color: ${p => (p.theme.background === '#0b1210' ? 'rgba(248, 250, 252, 0.96)' : 'inherit')};
`;

const OpportunityDetail = styled.p`
  margin: 8px 0 0;
  font-size: 14px;
  line-height: 1.7;
  color: ${p => (p.theme.background === '#0b1210' ? 'rgba(181, 192, 209, 0.92)' : 'rgba(248, 250, 252, 0.72)')};
`;

const HeadingBlock = styled.div`
  display: grid;
  gap: 12px;
  max-width: 760px;
  margin-bottom: 28px;
`;

const SectionLabel = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${p => p.theme.textSecondary};
`;

const SectionTitle = styled.h2`
  margin: 0;
  font-family: ${p => p.theme.headingFont};
  font-size: clamp(2.2rem, 5vw, 4rem);
  line-height: 0.98;
  letter-spacing: -0.04em;
`;

const SectionIntro = styled.p`
  margin: 0;
  max-width: 680px;
  font-size: 17px;
  line-height: 1.85;
  color: ${p => p.theme.textSecondary};
`;

const PainGrid = styled.div`
  display: grid;
  gap: 16px;

  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const PainCard = styled(Panel)`
  padding: 24px;
`;

const CardIndex = styled.div`
  margin-bottom: 22px;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${p => p.theme.primary};
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 22px;
  line-height: 1.2;
`;

const CardBody = styled.p`
  margin: 14px 0 0;
  font-size: 15px;
  line-height: 1.8;
  color: ${p => p.theme.textSecondary};
`;

const CapabilityGrid = styled.div`
  display: grid;
  gap: 18px;

  @media (min-width: 960px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const CapabilityCard = styled(Panel)`
  padding: 26px;
`;

const IconWrap = styled.div`
  width: 48px;
  height: 48px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${p => p.theme.borderRadius};
  background: ${p => p.theme.signalTint};
  color: ${p => p.theme.primary};
`;

const CapabilityList = styled.ul`
  margin: 18px 0 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 10px;

  li {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 14px;
    line-height: 1.7;
    color: ${p => p.theme.textSecondary};
  }
`;

const MiniCheck = styled(CheckCheck)`
  margin-top: 3px;
  flex-shrink: 0;
  color: ${p => p.theme.primary};
`;

const TablePanel = styled(Panel)`
  padding: 20px;
`;

const Table = styled.div`
  display: grid;
`;

const TableHeader = styled.div`
  display: none;

  @media (min-width: 900px) {
    display: grid;
    grid-template-columns: 1.1fr 1fr 1fr;
    padding: 0 18px 14px;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${p => p.theme.textSecondary};
  }
`;

const TableRow = styled.div`
  display: grid;
  gap: 12px;
  padding: 18px;
  border-top: 1px solid ${p => p.theme.border};

  @media (min-width: 900px) {
    grid-template-columns: 1.1fr 1fr 1fr;
    align-items: start;
  }
`;

const RowLabel = styled.div`
  font-size: 18px;
  font-weight: 800;
`;

const RowColumn = styled.div`
  display: grid;
  gap: 6px;

  strong {
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${p => p.theme.textSecondary};

    @media (min-width: 900px) {
      display: none;
    }
  }

  p {
    margin: 0;
    font-size: 15px;
    line-height: 1.8;
    color: ${p => p.theme.textSecondary};
  }
`;

const ProcessGrid = styled.div`
  display: grid;
  gap: 16px;

  @media (min-width: 960px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const ProcessCard = styled(Panel)`
  padding: 24px;
  min-height: 100%;
`;

const ProcessStep = styled.div`
  margin-bottom: 18px;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${p => p.theme.primary};
`;

const GuardrailGrid = styled.div`
  display: grid;
  gap: 16px;

  @media (min-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const GuardrailCard = styled(Panel)`
  padding: 24px;
`;

const CTA = styled(Panel)`
  padding: 28px;
  background: #0d1614;
  color: #f8fafc;

  @media (min-width: 900px) {
    padding: 38px;
  }
`;

const CTAGrid = styled.div`
  display: grid;
  gap: 24px;

  @media (min-width: 900px) {
    grid-template-columns: minmax(0, 1.2fr) auto;
    align-items: center;
  }
`;

const CTATitle = styled.h2`
  margin: 0;
  font-family: ${p => p.theme.headingFont};
  font-size: clamp(2.2rem, 4vw, 3.6rem);
  line-height: 0.98;
  letter-spacing: -0.04em;
`;

const CTAText = styled.p`
  margin: 16px 0 0;
  max-width: 640px;
  font-size: 16px;
  line-height: 1.85;
  color: rgba(248, 250, 252, 0.76);
`;

const CTAAction = styled(PrimaryAction)`
  justify-self: start;
  background: ${p => p.theme.primary};

  @media (min-width: 900px) {
    justify-self: end;
  }
`;

const HeroPanel = styled.div`
  position: relative;
  padding: 8px 0 0;
`;

const HeroTitle = styled.h1`
  max-width: 16ch;
  margin: 0;
  font-family: ${p => p.theme.headingFont};
  font-size: clamp(2.5rem, 6.2vw, 4.75rem);
  font-weight: 800;
  line-height: 0.98;
  letter-spacing: -0.035em;
  color: ${p => p.theme.text};

  em {
    font-style: normal;
    color: ${p => p.theme.primary};
  }
`;

const HeroTextLink = styled(Link)`
  font-size: 15px;
  color: ${p => p.theme.textSecondary};
  text-decoration: underline;
  text-underline-offset: 4px;

  &:hover {
    color: ${p => p.theme.text};
  }
`;

const Ledger = styled.aside`
  background: ${p => p.theme.surface};
  border: 1px solid ${p => p.theme.text};
  border-radius: ${p => p.theme.borderRadius};
  box-shadow: ${p => p.theme.ledgerShadow};
`;

const LedgerHead = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
  border-bottom: 1px solid ${p => p.theme.text};
  font-family: ${p => p.theme.monoFont};
  font-size: 13px;
  letter-spacing: 0.06em;
  text-transform: uppercase;

  span:last-child {
    color: ${p => p.theme.primary};
  }
`;

const LedgerEntry = styled.div`
  border-bottom: 1px solid ${p => p.theme.border};

  &:last-child {
    border-bottom: 0;
  }
`;

const LedgerButton = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  min-height: 56px;
  padding: 12px 16px;
  border: 0;
  background: transparent;
  color: inherit;
  text-align: left;
  cursor: pointer;

  &:hover {
    background: ${p => p.theme.surfaceHover};
  }

  @media (max-width: 479px) {
    align-items: flex-start;
  }
`;

const LedgerTime = styled.span`
  flex: none;
  font-family: ${p => p.theme.monoFont};
  font-size: 13px;
  color: ${p => p.theme.textSecondary};
`;

const LedgerWhat = styled.span`
  flex: 1 1 0;
  min-width: 0;
  font-weight: 500;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  @media (max-width: 479px) {
    white-space: normal;
    overflow: visible;
  }
`;

const LedgerTag = styled.span`
  flex: none;
  padding: 6px 8px;
  border-radius: 3px;
  font-family: ${p => p.theme.monoFont};
  font-size: 12px;
  line-height: 1;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  background: ${p => (p.$review ? p.theme.reviewTint : p.theme.signalTint)};
  color: ${p => (p.$review ? p.theme.reviewText : p.theme.primary)};
`;

const LedgerChevron = styled(ChevronDown)`
  flex: none;
  transition: transform 160ms ease-out;
  transform: rotate(${p => (p.$open ? '180deg' : '0deg')});
`;

const LedgerDetail = styled.p`
  margin: 0;
  padding: 0 16px 16px;
  font-size: 15px;
  color: ${p => p.theme.textSecondary};
`;

const TrustStrip = styled.section`
  border-block: 1px solid ${p => p.theme.border};
  background: ${p => p.theme.surface};
`;

const TrustGrid = styled.div`
  max-width: 1220px;
  margin: 0 auto;
  display: grid;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const TrustItem = styled.div`
  padding: 24px 16px;
  border-bottom: 1px solid ${p => p.theme.border};

  &:last-child {
    border-bottom: 0;
  }

  h3 {
    margin: 0 0 8px;
    font-family: ${p => p.theme.headingFont};
    font-size: 1.125rem;
  }

  p {
    margin: 0;
    font-size: 15px;
    color: ${p => p.theme.textSecondary};
  }

  @media (min-width: 768px) {
    padding: 32px 24px;
    border-bottom: 0;
    border-right: 1px solid ${p => p.theme.border};

    &:last-child {
      border-right: 0;
    }
  }
`;

const TrustKicker = styled.span`
  display: block;
  margin-bottom: 12px;
  font-family: ${p => p.theme.monoFont};
  font-size: 12px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${p => p.theme.primary};
`;

const NextGrid = styled.div`
  display: grid;
  gap: 24px;

  @media (min-width: 900px) {
    grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr);
  }
`;

const NextPrimary = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  padding: 32px;
  border-radius: ${p => p.theme.borderRadius};
  background: ${INK};
  color: ${INK_TEXT};

  h3 {
    margin: 0;
    font-family: ${p => p.theme.headingFont};
    font-size: 1.75rem;
    line-height: 1.1;
    letter-spacing: -0.02em;
    color: #ffffff;
  }

  p {
    margin: 0;
    max-width: 46ch;
    color: ${INK_MUTED};
  }
`;

const NextKicker = styled.span`
  font-family: ${p => p.theme.monoFont};
  font-size: 13px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${INK_ACCENT};
`;

const NextPrimaryLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 48px;
  padding: 0 24px;
  border-radius: ${p => p.theme.borderRadius};
  background: #ffffff;
  color: ${INK};
  font-weight: 600;
  transition: background-color 160ms ease-out;

  &:hover {
    background: #e0f0ec;
  }
`;

const NextRows = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const NextRowsLabel = styled.p`
  margin: 0;
  font-family: ${p => p.theme.monoFont};
  font-size: 13px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${p => p.theme.textSecondary};
`;

const NextRow = styled(Link)`
  display: flex;
  align-items: center;
  gap: 16px;
  min-height: 88px;
  padding: 16px 24px;
  border: 1px solid ${p => p.theme.border};
  border-radius: ${p => p.theme.borderRadius};
  background: ${p => p.theme.surface};
  color: ${p => p.theme.text};
  transition: border-color 160ms ease-out;

  &:hover {
    border-color: ${p => p.theme.text};
  }

  strong {
    display: block;
    font-family: ${p => p.theme.headingFont};
    font-size: 1.125rem;
  }

  span {
    display: block;
    font-size: 15px;
    color: ${p => p.theme.textSecondary};
  }

  em {
    flex: none;
    font-style: normal;
    font-weight: 600;
    white-space: nowrap;
    color: ${p => p.theme.primary};
  }
`;


function HomePage() {
  const [openEntry, setOpenEntry] = useState(null);

  return (
    <Page>
      <Section $hero>
        <Frame>
          <HeroPanel>
            <HeroGrid>
              <div>
                <Eyebrow>
                  <Dot />
                  Delivery ops for 10-50 person agencies
                </Eyebrow>
                <HeroTitle>
                  Stop chasing status. <em>Run delivery on a system.</em>
                </HeroTitle>
                <HeroLead>
                  We replace Slack pings, spreadsheet reports and tool duct-tape with automation your team can audit,
                  override and own. Every action logged. Every client-facing step reviewed by a human.
                </HeroLead>
                <ActionRow>
                  <PrimaryAction to="/audit">
                    Run the operations audit
                    <ArrowRight size={18} />
                  </PrimaryAction>
                  <HeroTextLink to="/use-cases">See use cases first</HeroTextLink>
                </ActionRow>
              </div>

              <Ledger aria-label="Example delivery ledger">
                <LedgerHead>
                  <span>Delivery ledger - example</span>
                  <span>Live</span>
                </LedgerHead>
                {ledgerEntries.map((entry, index) => {
                  const open = openEntry === index;

                  return (
                    <LedgerEntry key={entry.what}>
                      <LedgerButton
                        type="button"
                        aria-expanded={open}
                        aria-controls={`ledger-detail-${index}`}
                        onClick={() => setOpenEntry(open ? null : index)}
                      >
                        <LedgerTime>{entry.time}</LedgerTime>
                        <LedgerWhat>{entry.what}</LedgerWhat>
                        <LedgerTag $review={entry.review}>{entry.tag}</LedgerTag>
                        <LedgerChevron size={16} $open={open} aria-hidden="true" />
                      </LedgerButton>
                      {open && <LedgerDetail id={`ledger-detail-${index}`}>{entry.detail}</LedgerDetail>}
                    </LedgerEntry>
                  );
                })}
              </Ledger>
            </HeroGrid>
          </HeroPanel>
        </Frame>
      </Section>

      <TrustStrip aria-label="Guardrails">
        <TrustGrid>
          {trustItems.map(item => (
            <TrustItem key={item.k}>
              <TrustKicker>{item.k}</TrustKicker>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </TrustItem>
          ))}
        </TrustGrid>
      </TrustStrip>

      <Section>
        <Frame>
          <HeadingBlock>
            <SectionLabel>
              <Dot />
              The problem statement
            </SectionLabel>
            <SectionTitle>Most agency operations break in the same place.</SectionTitle>
            <SectionIntro>
              Not at strategy. Not at sales. They break in the handoffs, the repetitive admin, and the reporting layer that no one has time to build properly.
            </SectionIntro>
          </HeadingBlock>

          <PainGrid>
            {painPoints.map((item, index) => (
              <PainCard key={item.title}>
                <CardIndex>Issue {String(index + 1).padStart(2, '0')}</CardIndex>
                <CardTitle>{item.title}</CardTitle>
                <CardBody>{item.body}</CardBody>
              </PainCard>
            ))}
          </PainGrid>

              <BriefCard>
                <BriefLabel>Operator brief</BriefLabel>
                <BriefTitle>Where manual work usually hides</BriefTitle>
                <BriefText>
                  These are the patterns that repeatedly show up in service businesses before process debt starts to affect margin, pace, and client confidence.
                </BriefText>

                <OpportunityList>
                  {opportunityAreas.map(item => (
                    <OpportunityItem key={item.label}>
                      <OpportunityValue>{item.value}</OpportunityValue>
                      <OpportunityLabel>{item.label}</OpportunityLabel>
                      <OpportunityDetail>{item.detail}</OpportunityDetail>
                    </OpportunityItem>
                  ))}
                </OpportunityList>
              </BriefCard>
        </Frame>
      </Section>

      <Section>
        <Frame>
          <HeadingBlock>
            <SectionLabel>
              <Dot />
              Solution overview
            </SectionLabel>
            <SectionTitle>We build operating systems, not vague automation.</SectionTitle>
            <SectionIntro>
              The offer is clearer when it is broken into operational capabilities people already understand: workflow automation, purpose-built AI support, and reporting that creates real visibility.
            </SectionIntro>
          </HeadingBlock>

          <CapabilityGrid>
            {capabilities.map(item => {
              const Icon = item.icon;

              return (
                <CapabilityCard key={item.title}>
                  <IconWrap>
                    <Icon size={22} />
                  </IconWrap>
                  <CardTitle style={{ marginTop: '18px' }}>{item.title}</CardTitle>
                  <CardBody>{item.body}</CardBody>
                  <CapabilityList>
                    {item.bullets.map(point => (
                      <li key={point}>
                        <MiniCheck size={16} />
                        <span>{point}</span>
                      </li>
                    ))}
                  </CapabilityList>
                </CapabilityCard>
              );
            })}
          </CapabilityGrid>
        </Frame>
      </Section>

      <Section>
        <Frame>
          <HeadingBlock>
            <SectionLabel>
              <Dot />
              Before and after
            </SectionLabel>
            <SectionTitle>Replace duct-tape operations with a visible system.</SectionTitle>
            <SectionIntro>
              Concrete operational change, not generic AI hype: these are the workflows agency teams recognise immediately.
            </SectionIntro>
          </HeadingBlock>

          <TablePanel>
            <Table>
              <TableHeader>
                <div>Workflow</div>
                <div>Before</div>
                <div>After</div>
              </TableHeader>

              {transformationRows.map(row => (
                <TableRow key={row.label}>
                  <RowLabel>{row.label}</RowLabel>
                  <RowColumn>
                    <strong>Before</strong>
                    <p>{row.before}</p>
                  </RowColumn>
                  <RowColumn>
                    <strong>After</strong>
                    <p>{row.after}</p>
                  </RowColumn>
                </TableRow>
              ))}
            </Table>
          </TablePanel>
        </Frame>
      </Section>

      <Section>
        <Frame>
          <HeadingBlock>
            <SectionLabel>
              <Dot />
              Engagement flow
            </SectionLabel>
            <SectionTitle>A straightforward build process that keeps risk low.</SectionTitle>
            <SectionIntro>
              Buyers do not need another mystery process. They need to know how the work will be scoped, built, and transferred back to their team.
            </SectionIntro>
          </HeadingBlock>

          <ProcessGrid>
            {processSteps.map(step => (
              <ProcessCard key={step.step}>
                <ProcessStep>{step.step}</ProcessStep>
                <CardTitle>{step.title}</CardTitle>
                <CardBody>{step.body}</CardBody>
              </ProcessCard>
            ))}
          </ProcessGrid>
        </Frame>
      </Section>

      <Section>
        <Frame>
          <HeadingBlock>
            <SectionLabel>
              <Dot />
              Reliability layer
            </SectionLabel>
            <SectionTitle>Trust comes from the operating model, not the headline.</SectionTitle>
            <SectionIntro>
              Serious buyers evaluate the control layer, so the guardrails are stated plainly: human review, traceability, documentation and safe failure.
            </SectionIntro>
          </HeadingBlock>

          <GuardrailGrid>
            {guardrails.map(item => {
              const Icon = item.icon;

              return (
                <GuardrailCard key={item.title}>
                  <IconWrap>
                    <Icon size={22} />
                  </IconWrap>
                  <CardTitle style={{ marginTop: '18px' }}>{item.title}</CardTitle>
                  <CardBody>{item.body}</CardBody>
                </GuardrailCard>
              );
            })}
          </GuardrailGrid>
        </Frame>
      </Section>

      <Section>
        <Frame>
          <HeadingBlock>
            <SectionLabel>
              <Dot />
              Next action
            </SectionLabel>
            <SectionTitle>One clear next step. Two ways to look first.</SectionTitle>
            <SectionIntro>
              Start with the audit. If you are not ready to answer questions, look at use cases or put a number on the cost of delay first.
            </SectionIntro>
          </HeadingBlock>

          <NextGrid>
            <NextPrimary>
              <NextKicker>Start here</NextKicker>
              <h3>{nextActions[0].title}</h3>
              <p>{nextActions[0].body}</p>
              <NextPrimaryLink to={nextActions[0].to}>
                {nextActions[0].cta}
                <ArrowRight size={18} />
              </NextPrimaryLink>
            </NextPrimary>
            <NextRows>
              <NextRowsLabel>Not ready to answer questions?</NextRowsLabel>
              {nextActions.slice(1).map(item => (
                <NextRow key={item.title} to={item.to}>
                  <div style={{ flex: '1 1 0', minWidth: 0 }}>
                    <strong>{item.title}</strong>
                    <span>{item.body}</span>
                  </div>
                  <em>{item.cta} -&gt;</em>
                </NextRow>
              ))}
            </NextRows>
          </NextGrid>
        </Frame>
      </Section>

      <Section>
        <Frame>
          <CTA>
            <CTAGrid>
              <div>
                <SectionLabel style={{ color: 'rgba(248, 250, 252, 0.72)' }}>
                  <Dot />
                  PeakWork Studios
                </SectionLabel>
                <CTATitle>Find the first workflow worth fixing.</CTATitle>
                <CTAText>
                  If the team is already feeling the drag of manual coordination, the next step is usually not a bigger tech stack. It is a tighter operating system.
                </CTAText>
              </div>
              <CTAAction to="/contact">
                Talk through your workflow
                <ArrowRight size={18} />
              </CTAAction>
            </CTAGrid>
          </CTA>
        </Frame>
      </Section>
    </Page>
  );
}

export default HomePage;
