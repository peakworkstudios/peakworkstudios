import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  ArrowRight,
  Bot,
  ChartColumn,
  CheckCheck,
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

const HeroPanel = styled(Panel)`
  padding: 28px;
  background:
    linear-gradient(135deg, rgba(193, 147, 27, 0.12), transparent 34%),
    linear-gradient(180deg, ${p => p.theme.surface} 0%, rgba(255, 255, 255, 0.35) 100%);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(${p => p.theme.gridLine} 1px, transparent 1px),
      linear-gradient(90deg, ${p => p.theme.gridLine} 1px, transparent 1px);
    background-size: 36px 36px;
    opacity: 0.4;
    pointer-events: none;
  }

  @media (min-width: 960px) {
    padding: 40px;
  }
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

const HeroTitle = styled.h1`
  max-width: 11ch;
  margin: 0;
  font-family: ${p => p.theme.headingFont};
  font-size: clamp(3rem, 8vw, 6rem);
  line-height: 0.93;
  letter-spacing: -0.04em;
  color: ${p => p.theme.text};
`;

const HeroLead = styled.p`
  max-width: 680px;
  margin: 24px 0 0;
  font-size: clamp(1rem, 2.3vw, 1.2rem);
  line-height: 1.8;
  color: ${p => p.theme.textSecondary};
`;

const HeroMeta = styled.p`
  max-width: 620px;
  margin: 18px 0 0;
  font-size: 14px;
  font-weight: 600;
  color: ${p => p.theme.text};
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
  border-radius: 999px;
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

const SecondaryAction = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 52px;
  padding: 0 22px;
  border-radius: 999px;
  border: 1px solid ${p => p.theme.border};
  background: ${p => p.theme.surface};
  color: ${p => p.theme.text};
  font-size: 15px;
  font-weight: 700;
  transition: transform 180ms ease, background-color 180ms ease;

  &:hover {
    transform: translateY(-1px);
    background: ${p => p.theme.surfaceHover};
  }
`;

const HeroNotes = styled.div`
  display: grid;
  gap: 10px;
  margin-top: 26px;
`;

const HeroNote = styled.div`
  max-width: 620px;
  padding: 12px 14px;
  border-left: 4px solid ${p => p.theme.primary};
  background: ${p => (p.theme.background === '#0b1220' ? 'rgba(17, 28, 46, 0.88)' : 'rgba(255, 255, 255, 0.55)')};
  font-size: 14px;
  color: ${p => (p.theme.background === '#0b1220' ? 'rgba(248, 250, 252, 0.9)' : p.theme.textSecondary)};
`;

const BriefCard = styled(Panel)`
  padding: 24px;
  background: ${p => (p.theme.background === '#0b1220'
    ? 'linear-gradient(180deg, rgba(17, 28, 46, 0.96) 0%, rgba(11, 18, 32, 0.98) 100%)'
    : p.theme.secondary)};
  color: ${p => (p.theme.background === '#0b1220' ? p.theme.text : '#f8fafc')};

  @media (min-width: 960px) {
    position: sticky;
    top: 118px;
  }
`;

const BriefLabel = styled.div`
  margin-bottom: 14px;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${p => (p.theme.background === '#0b1220' ? 'rgba(181, 192, 209, 0.9)' : 'rgba(248, 250, 252, 0.72)')};
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
  color: ${p => (p.theme.background === '#0b1220' ? 'rgba(219, 229, 246, 0.88)' : 'rgba(248, 250, 252, 0.76)')};
`;

const OpportunityList = styled.div`
  display: grid;
  gap: 14px;
  margin-top: 24px;
`;

const OpportunityItem = styled.div`
  padding-top: 14px;
  border-top: 1px solid ${p => (p.theme.background === '#0b1220' ? 'rgba(181, 192, 209, 0.16)' : 'rgba(248, 250, 252, 0.14)')};
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
  color: ${p => (p.theme.background === '#0b1220' ? 'rgba(248, 250, 252, 0.96)' : 'inherit')};
`;

const OpportunityDetail = styled.p`
  margin: 8px 0 0;
  font-size: 14px;
  line-height: 1.7;
  color: ${p => (p.theme.background === '#0b1220' ? 'rgba(181, 192, 209, 0.92)' : 'rgba(248, 250, 252, 0.72)')};
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
  border-radius: 14px;
  background: rgba(193, 147, 27, 0.14);
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

const ActionGrid = styled.div`
  display: grid;
  gap: 16px;

  @media (min-width: 960px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ActionCard = styled(Panel)`
  padding: 24px;
  display: grid;
  align-content: start;
  gap: 16px;
`;

const ActionLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  font-weight: 800;
  color: ${p => p.theme.text};

  &:hover {
    color: ${p => p.theme.secondary};
  }
`;

const CTA = styled(Panel)`
  padding: 28px;
  background:
    linear-gradient(135deg, rgba(193, 147, 27, 0.22), transparent 42%),
    ${p => p.theme.secondary};
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

function HomePage() {
  return (
    <Page>
      <Section $hero>
        <Frame>
          <HeroPanel>
            <HeroGrid>
              <div>
                <Eyebrow>
                  <Dot />
                  Automation systems for service firms
                </Eyebrow>
                <HeroTitle>Automation for agencies that need order, not more noise.</HeroTitle>
                <HeroLead>
                  Peak Work Studios redesigns the messy middle of delivery operations: intake, routing, reporting,
                  approvals, follow-ups, and the AI assistants that support them. The goal is not novelty. The goal is
                  a calmer operation that scales without losing control.
                </HeroLead>
                <HeroMeta>
                  Best fit: agencies, consultancies, and professional service teams with 10 to 50 people.
                </HeroMeta>
                <ActionRow>
                  <PrimaryAction to="/contact">
                    Book a discovery call
                    <ArrowRight size={18} />
                  </PrimaryAction>
                  <SecondaryAction to="/audit">Run the operations audit</SecondaryAction>
                </ActionRow>
                <HeroNotes>
                  <HeroNote>
                    Built for teams that already know where the friction is, but need someone to turn it into a reliable system.
                  </HeroNote>
                  <HeroNote>
                    Human review, fallbacks, and documentation are part of the build. They are not optional cleanup afterward.
                  </HeroNote>
                </HeroNotes>
              </div>

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
            </HeroGrid>
          </HeroPanel>
        </Frame>
      </Section>

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
        </Frame>
      </Section>

      <Section>
        <Frame>
          <HeadingBlock>
            <SectionLabel>
              <Dot />
              Solution overview
            </SectionLabel>
            <SectionTitle>The site now sells systems, not vague automation.</SectionTitle>
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
              The redesign shifts the message away from generic AI hype and toward concrete operational transformation that buyers can recognize immediately.
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
              The previous design talked about outcomes, but it did not surface enough of the control layer. This version makes the guardrails visible because that is what serious buyers are evaluating.
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
            <SectionTitle>Choose the right entry point.</SectionTitle>
            <SectionIntro>
              Not every visitor is ready for a call. The site now gives three credible paths forward instead of forcing the same CTA everywhere.
            </SectionIntro>
          </HeadingBlock>

          <ActionGrid>
            {nextActions.map(item => {
              const Icon = item.icon;

              return (
                <ActionCard key={item.title}>
                  <IconWrap>
                    <Icon size={22} />
                  </IconWrap>
                  <CardTitle>{item.title}</CardTitle>
                  <CardBody>{item.body}</CardBody>
                  <ActionLink to={item.to}>
                    {item.cta}
                    <ArrowRight size={18} />
                  </ActionLink>
                </ActionCard>
              );
            })}
          </ActionGrid>
        </Frame>
      </Section>

      <Section>
        <Frame>
          <CTA>
            <CTAGrid>
              <div>
                <SectionLabel style={{ color: 'rgba(248, 250, 252, 0.72)' }}>
                  <Dot />
                  Peak Work Studios
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
