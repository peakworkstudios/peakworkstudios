import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import {
  Rocket,
  Workflow,
  BarChart3,
  Calculator,
  ClipboardCheck,
  ChevronDown,
  Zap,
  Bot,
  ShieldCheck,
} from 'lucide-react';

/* ════════════════════════════════════════════
   HOOKS
   ════════════════════════════════════════════ */

function useInView(options = {}) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, isInView];
}

function useCountUp(end, isActive, duration = 2000) {
  const [count, setCount] = useState(0);
  const numericEnd = useMemo(() => parseFloat(String(end).replace(/[^0-9.]/g, '')), [end]);

  useEffect(() => {
    if (!isActive || numericEnd === 0) return;
    let start = 0;
    const startTime = performance.now();

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * numericEnd));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [isActive, numericEnd, duration]);

  return count;
}

/* ════════════════════════════════════════════
   ANIMATIONS
   ════════════════════════════════════════════ */

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const floatAnim = keyframes`
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-12px); }
`;

const pulseGlow = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(56, 189, 248, 0.3); }
  50%      { box-shadow: 0 0 20px 4px rgba(56, 189, 248, 0.15); }
`;

const subtleGlow = keyframes`
  0%, 100% { box-shadow: 0 4px 15px rgba(56, 189, 248, 0.2); }
  50%      { box-shadow: 0 4px 25px rgba(56, 189, 248, 0.35); }
`;


/* ════════════════════════════════════════════
   SHARED STYLED COMPONENTS
   ════════════════════════════════════════════ */

const SectionWrapper = styled.section`
  padding: 100px 40px;
  background: ${p => p.$bg || 'transparent'};
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 60px 20px;
  }
`;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

const FadeIn = styled.div`
  opacity: ${p => (p.$visible ? 1 : 0)};
  transform: translateY(${p => (p.$visible ? '0' : '30px')});
  transition: opacity 0.7s ease, transform 0.7s ease;
  transition-delay: ${p => p.$delay || '0s'};
`;

const SectionHeading = styled.h2`
  font-size: clamp(28px, 5vw, 44px);
  font-weight: 800;
  letter-spacing: -1px;
  color: ${p => p.theme.text};
  text-align: center;
  margin: 0 0 16px;
  line-height: 1.15;
`;

const SectionSub = styled.p`
  font-size: clamp(16px, 2.5vw, 19px);
  color: ${p => p.theme.textSecondary};
  text-align: center;
  max-width: 640px;
  margin: 0 auto 56px;
  line-height: 1.65;
`;

const Card = styled.div`
  background: ${p => p.theme.surface};
  border: 1px solid ${p => p.theme.border};
  border-radius: ${p => p.theme.borderRadius};
  padding: 32px;
  box-shadow: ${p => p.theme.cardShadow};
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${p => p.theme.cardHoverShadow};
  }
`;

const PrimaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: ${p => p.theme.primary};
  color: #000;
  padding: 14px 32px;
  border-radius: ${p => p.theme.borderRadius};
  font-size: 16px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.2s ease;

  animation: ${subtleGlow} 3s ease-in-out infinite;

  &:hover {
    background: ${p => p.theme.primaryHover};
    transform: translateY(-2px) scale(1.03);
    box-shadow: 0 6px 20px rgba(56, 189, 248, 0.3);
  }
`;

const SecondaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: transparent;
  color: ${p => p.theme.primary};
  border: 2px solid ${p => p.theme.primary};
  padding: 12px 28px;
  border-radius: ${p => p.theme.borderRadius};
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;

  &:hover {
    background: ${p => p.theme.primary}15;
    transform: translateY(-2px);
  }
`;

const SecondaryLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: transparent;
  color: ${p => p.theme.primary};
  border: 2px solid ${p => p.theme.primary};
  padding: 12px 28px;
  border-radius: ${p => p.theme.borderRadius};
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background: ${p => p.theme.primary}15;
    transform: translateY(-2px);
  }
`;

/* ════════════════════════════════════════════
   SECTION 1 — HERO
   ════════════════════════════════════════════ */

const HeroOuter = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: linear-gradient(
    170deg,
    ${p => p.theme.background} 0%,
    ${p => p.theme.surface} 40%,
    ${p => p.theme.background} 100%
  );
  padding: 120px 40px 100px;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 100px 20px 60px;
  }
`;

const HeroContent = styled.div`
  max-width: 780px;
  text-align: center;
  position: relative;
  z-index: 2;
  animation: ${fadeInUp} 0.8s ease both;
`;

const HeroH1 = styled.h1`
  font-size: clamp(32px, 6vw, 56px);
  font-weight: 800;
  letter-spacing: -1.5px;
  line-height: 1.1;
  color: ${p => p.theme.text};
  margin: 0 0 24px;
`;

const HeroSub = styled.p`
  font-size: clamp(16px, 2.5vw, 20px);
  color: ${p => p.theme.textSecondary};
  line-height: 1.7;
  max-width: 600px;
  margin: 0 auto 40px;
`;

const HeroCTAGroup = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 40px;
`;

const TrustBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: ${p => p.theme.textSecondary};
  background: ${p => p.theme.surface};
  border: 1px solid ${p => p.theme.border};
  padding: 10px 20px;
  border-radius: 100px;
`;

/* Decorative CSS-only illustration */
const HeroVisual = styled.div`
  position: absolute;
  bottom: 60px;
  right: 10%;
  width: 180px;
  height: 120px;
  opacity: 0.12;
  pointer-events: none;

  &::before,
  &::after {
    content: '';
    position: absolute;
    border-radius: 8px;
  }

  &::before {
    width: 60px;
    height: 60px;
    top: 0;
    left: 0;
    border: 3px dashed ${p => p.theme.textSecondary};
    transform: rotate(-8deg);
    animation: ${floatAnim} 4s ease-in-out infinite;
  }

  &::after {
    width: 60px;
    height: 60px;
    bottom: 0;
    right: 0;
    border: 3px solid ${p => p.theme.primary};
    transform: rotate(4deg);
    animation: ${floatAnim} 4s ease-in-out 1s infinite;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const HeroVisualLeft = styled.div`
  position: absolute;
  top: 30%;
  left: 6%;
  width: 100px;
  height: 100px;
  opacity: 0.08;
  pointer-events: none;

  &::before {
    content: '';
    position: absolute;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 3px solid ${p => p.theme.primary};
    animation: ${floatAnim} 5s ease-in-out 0.5s infinite;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

function HeroSection() {
  const handleScrollToHow = useCallback(() => {
    const el = document.getElementById('how-it-works');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <HeroOuter>
      <HeroVisualLeft />
      <HeroVisual />
      <HeroContent>
        <HeroH1>Turn Agency Chaos Into Predictable Profit 🚀</HeroH1>
        <HeroSub>
          Stop losing 15+ hours per week to broken client handoffs, manual
          status updates, and reporting hell. Get reliable AI-assisted
          automation that scales with you.
        </HeroSub>
        <HeroCTAGroup>
          <PrimaryButton to="/calculator">
            <Calculator size={18} />
            Calculate What Chaos Costs You 💰
          </PrimaryButton>
          <SecondaryButton onClick={handleScrollToHow}>
            See How It Works
          </SecondaryButton>
        </HeroCTAGroup>
        <TrustBadge>
          <ShieldCheck size={16} />
          Trusted by agencies managing 50+ clients simultaneously
        </TrustBadge>
      </HeroContent>
    </HeroOuter>
  );
}

/* ════════════════════════════════════════════
   SECTION 2 — SOCIAL PROOF
   ════════════════════════════════════════════ */

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled(Card)`
  text-align: center;
  padding: 40px 24px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-6px) scale(1.03);
  }
`;

const StatNumber = styled.div`
  font-size: clamp(36px, 5vw, 48px);
  font-weight: 800;
  color: ${p => p.theme.primary};
  letter-spacing: -1px;
  margin-bottom: 8px;
`;

const StatLabel = styled.div`
  font-size: 15px;
  color: ${p => p.theme.textSecondary};
  line-height: 1.5;
`;

const STATS = [
  { value: '67', prefix: '$', suffix: 'K', label: '💰 Saved per year in PM labor costs' },
  { value: '18', prefix: '', suffix: 'hrs', label: '⏱️ Recovered per week per account manager' },
  { value: '3', prefix: '', suffix: 'x', label: '⚡ More clients handled with the same team' },
  { value: '0', prefix: '', suffix: '', display: 'Zero', label: '✅ Missed deliverables or dropped handoffs' },
];

function StatItem({ stat, isActive }) {
  const count = useCountUp(stat.value, isActive);
  const display = stat.display
    ? (isActive ? stat.display : '0')
    : `${stat.prefix}${count}${stat.suffix}`;

  return (
    <StatCard>
      <StatNumber>{display}</StatNumber>
      <StatLabel>{stat.label}</StatLabel>
    </StatCard>
  );
}

const MemoStatItem = React.memo(StatItem);

function SocialProofSection() {
  const [ref, inView] = useInView();

  return (
    <SectionWrapper $bg="transparent">
      <Container ref={ref}>
        <FadeIn $visible={inView}>
          <SectionHeading>📊 Real Results for Real Agencies</SectionHeading>
          <SectionSub>Numbers from agencies that replaced chaos with systems.</SectionSub>
        </FadeIn>
        <FadeIn $visible={inView} $delay="0.15s">
          <StatsGrid>
            {STATS.map((s, i) => (
              <MemoStatItem key={i} stat={s} isActive={inView} />
            ))}
          </StatsGrid>
        </FadeIn>
      </Container>
    </SectionWrapper>
  );
}

/* ════════════════════════════════════════════
   SECTION 3 — VALUE PROP
   ════════════════════════════════════════════ */

const ValueGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ValueCard = styled(Card)`
  text-align: left;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-6px) scale(1.02);
  }
`;

const ValueIconWrap = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${p => p.theme.borderRadiusSm};
  background: ${p => p.theme.primary}18;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${p => p.theme.primary};
  margin-bottom: 20px;
`;

const ValueTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: ${p => p.theme.text};
  margin: 0 0 16px;
`;

const BulletList = styled.ul`
  margin: 0;
  padding: 0 0 0 18px;
  list-style: disc;

  li {
    font-size: 15px;
    color: ${p => p.theme.textSecondary};
    line-height: 1.75;
  }
`;

const VALUE_COLS = [
  {
    icon: Rocket,
    title: 'Onboarding That Runs Itself',
    bullets: [
      'Auto-generate contracts & SOWs from templates',
      'Trigger payment collection & deposit tracking',
      'Spin up project folders, channels, and boards',
      'Send branded welcome sequences & next steps',
      'AI-powered kickoff brief from intake forms',
    ],
  },
  {
    icon: Workflow,
    title: 'Delivery Without the Chaos',
    bullets: [
      'Real-time status updates across all channels',
      'AI communication hub for client questions',
      'Automated handoffs between departments',
      'Milestone tracking with proactive alerts',
      'Quality control checklists before delivery',
    ],
  },
  {
    icon: BarChart3,
    title: 'Reporting That Writes Itself',
    bullets: [
      'Auto-generated weekly & monthly client reports',
      'Invoice creation triggered by milestones',
      'Data pulled from tools your team already uses',
      'Real-time dashboards for ops and leadership',
      'Financial reporting tied to project profitability',
    ],
  },
];


/* ════════════════════════════════════════════
   SECTION 4 — PAIN POINTS
   ════════════════════════════════════════════ */

const PainGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FlipCard = styled.div`
  perspective: 800px;
  height: 280px;

  @media (max-width: 480px) {
    height: 300px;
  }
`;

const FlipInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s ease;
  transform-style: preserve-3d;

  ${FlipCard}:hover & {
    transform: rotateY(180deg);
  }
`;

const FlipFace = styled.div`
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  border-radius: ${p => p.theme.borderRadius};
  border: 1px solid ${p => p.theme.border};
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const FlipFront = styled(FlipFace)`
  background: ${p => p.theme.surface};
  box-shadow: ${p => p.theme.cardShadow};
`;

const FlipBack = styled(FlipFace)`
  background: linear-gradient(135deg, ${p => p.theme.primary}12, ${p => p.theme.surface});
  transform: rotateY(180deg);
  border-color: ${p => p.theme.primary}40;
`;

const PainTitle = styled.h3`
  font-size: 22px;
  font-weight: 700;
  color: ${p => p.theme.text};
  margin: 0 0 12px;
`;

const PainText = styled.p`
  font-size: 15px;
  color: ${p => p.theme.textSecondary};
  line-height: 1.65;
  margin: 0;
`;

const SolutionLabel = styled.span`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${p => p.theme.primary};
  margin-bottom: 12px;
`;

const HoverHint = styled.span`
  font-size: 13px;
  color: ${p => p.theme.primary};
  margin-top: auto;
  font-weight: 600;
`;

const PAINS = [
  {
    title: '🔥 Onboarding Hell',
    pain: 'Every new client takes 2 weeks of back-and-forth emails, missing assets, forgotten logins, and repeated questions. Your team dreads the first 30 days.',
    solution: 'With automation: 3 hours, start to finish. Contracts, payments, folders, access, welcome emails, and kickoff briefs -- all triggered automatically.',
  },
  {
    title: 'Status Update Treadmill',
    pain: 'Account managers spend 6+ hours per week copy-pasting updates between Slack, email, and project tools. Clients still ask "where are we?" every Monday.',
    solution: 'AI-powered status hub answers 85% of client questions instantly. Your team focuses on strategy, not Slack pings.',
  },
  {
    title: 'Reporting Nightmare',
    pain: 'End of month means 3 days of pulling data from 6 tools, formatting spreadsheets, and praying the numbers match. Reports go out late. Every. Single. Month.',
    solution: 'Reports auto-generate from live data. Formatted, branded, and delivered on schedule. Your team reviews -- not builds.',
  },
  {
    title: '💸 Scope Creep & Surprises',
    pain: 'Projects go 20% over budget before anyone notices. Deliverables slip without warning. The first person to find out is usually the client.',
    solution: 'Automated budget monitoring, milestone tracking, and proactive alerts. You see problems before they become client conversations.',
  },
];

function PainPointsSection() {
  const [ref, inView] = useInView();

  return (
    <SectionWrapper>
      <Container ref={ref}>
        <FadeIn $visible={inView}>
          <SectionHeading>Sound Familiar?</SectionHeading>
          <SectionSub>
            Hover over each card to see the fix.
          </SectionSub>
        </FadeIn>
        <FadeIn $visible={inView} $delay="0.15s">
          <PainGrid>
            {PAINS.map((p, i) => (
              <FlipCard key={i}>
                <FlipInner>
                  <FlipFront>
                    <PainTitle>{p.title}</PainTitle>
                    <PainText>{p.pain}</PainText>
                    <HoverHint>Hover to see the fix &rarr;</HoverHint>
                  </FlipFront>
                  <FlipBack>
                    <SolutionLabel>With Peak Work Studios</SolutionLabel>
                    <PainTitle>{p.title}</PainTitle>
                    <PainText>{p.solution}</PainText>
                  </FlipBack>
                </FlipInner>
              </FlipCard>
            ))}
          </PainGrid>
        </FadeIn>
      </Container>
    </SectionWrapper>
  );
}

/* ════════════════════════════════════════════
   SECTION 5 — HOW IT WORKS
   ════════════════════════════════════════════ */

const TimelineWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0;
  position: relative;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0;
    padding-left: 32px;
  }
`;

const TimelineStep = styled.div`
  flex: 1;
  text-align: center;
  position: relative;
  padding: 0 12px;

  @media (max-width: 768px) {
    text-align: left;
    padding: 0 0 40px 24px;

    &:last-child {
      padding-bottom: 0;
    }
  }
`;

const TimelineCircle = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${p => p.theme.primary};
  color: #000;
  font-weight: 800;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  position: relative;
  z-index: 2;
  animation: ${pulseGlow} 3s ease-in-out infinite;

  @media (max-width: 768px) {
    position: absolute;
    left: -32px;
    top: 0;
    width: 40px;
    height: 40px;
    margin: 0;
  }
`;

const TimelineLine = styled.div`
  position: absolute;
  top: 24px;
  left: calc(50% + 24px);
  right: calc(-50% + 24px);
  height: 2px;
  background: ${p => p.theme.border};

  @media (max-width: 768px) {
    top: 40px;
    bottom: 0;
    left: -12px;
    right: auto;
    width: 2px;
    height: calc(100% - 40px);
  }
`;

const StepDuration = styled.span`
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${p => p.theme.primary};
  margin-bottom: 8px;
`;

const StepTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: ${p => p.theme.text};
  margin: 0 0 12px;
`;

const StepDesc = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    font-size: 14px;
    color: ${p => p.theme.textSecondary};
    line-height: 1.7;
    &::before {
      content: '\u2713 ';
      color: ${p => p.theme.primary};
      font-weight: 700;
    }
  }
`;

const STEPS = [
  {
    num: 1,
    title: 'Audit',
    duration: '1 Week',
    items: ['Intake call & discovery', 'Process mapping', 'Bottleneck identification', 'Deliverable: 1-page roadmap'],
  },
  {
    num: 2,
    title: 'Build',
    duration: '3-6 Weeks',
    items: ['Custom automation build', 'Maintainable & secure', 'AI assistant training', 'Weekly check-in calls'],
  },
  {
    num: 3,
    title: 'Launch',
    duration: '1 Week',
    items: ['Team training sessions', 'Docs & runbooks', 'Monitoring setup', 'Pilot with select clients'],
  },
  {
    num: 4,
    title: 'Support',
    duration: 'Ongoing',
    items: ['Monthly check-ins', 'Troubleshooting & fixes', 'Scaling guidance', 'New automations as needed'],
  },
];

function HowItWorksSection() {
  const [ref, inView] = useInView();

  return (
    <SectionWrapper id="how-it-works">
      <Container ref={ref}>
        <FadeIn $visible={inView}>
          <SectionHeading>Simple Process. Serious Results. 💡</SectionHeading>
          <SectionSub>
            From audit to ongoing support in four clear steps.
          </SectionSub>
        </FadeIn>
        <FadeIn $visible={inView} $delay="0.15s">
          <TimelineWrapper>
            {STEPS.map((step, i) => (
              <TimelineStep key={i}>
                {i < STEPS.length - 1 && <TimelineLine />}
                <TimelineCircle>{step.num}</TimelineCircle>
                <StepDuration>{step.duration}</StepDuration>
                <StepTitle>{step.title}</StepTitle>
                <StepDesc>
                  {step.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </StepDesc>
              </TimelineStep>
            ))}
          </TimelineWrapper>
        </FadeIn>
      </Container>
    </SectionWrapper>
  );
}

/* ════════════════════════════════════════════
   SECTION 6 — AI CAPABILITIES
   ════════════════════════════════════════════ */

const AIGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const AICard = styled(Card)`
  text-align: left;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-6px) scale(1.02);
  }
`;

const AICardIconWrap = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${p => p.theme.borderRadiusSm};
  background: ${p => p.theme.primary}18;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${p => p.theme.primary};
  margin-bottom: 20px;
`;

const AICardTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: ${p => p.theme.text};
  margin: 0 0 16px;
`;

const AIResult = styled.div`
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid ${p => p.theme.border};
  font-size: 14px;
  font-weight: 600;
  color: ${p => p.theme.primary};
  line-height: 1.6;
`;

const Disclaimer = styled.p`
  text-align: center;
  font-size: 14px;
  color: ${p => p.theme.textSecondary};
  max-width: 600px;
  margin: 40px auto 0;
  padding: 16px 24px;
  background: ${p => p.theme.surface};
  border: 1px solid ${p => p.theme.border};
  border-radius: ${p => p.theme.borderRadiusSm};
`;

const AI_BOXES = [
  {
    icon: Bot,
    title: '24/7 Client Communication Hub',
    bullets: [
      'Answers common client questions instantly',
      'Routes complex queries to the right team member',
      'Maintains context across email, Slack, and chat',
      'Provides project status without human lookup',
      'Learns your agency\'s tone and terminology',
    ],
    result: '85% of client questions handled instantly. Your team only touches the 15% that actually need them.',
  },
  {
    icon: Zap,
    title: 'AI Meeting Assistant',
    bullets: [
      'Captures decisions, action items, and owners',
      'Creates structured notes in your PM tool',
      'Flags risks and unresolved questions',
      'Generates follow-up emails automatically',
      'Tracks commitments across meetings',
    ],
    result: 'No more "what did we decide?" confusion. Every meeting produces clear next steps, automatically.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality Control Agent',
    bullets: [
      'Reviews deliverables against project briefs',
      'Checks for brand guideline compliance',
      'Flags inconsistencies before client review',
      'Validates data accuracy in reports',
      'Runs checklists automatically at each stage',
    ],
    result: 'Catch errors before clients do. Reduce revision rounds by 40% or more.',
  },
];

function AISection() {
  const [ref, inView] = useInView();

  return (
    <SectionWrapper $bg="transparent">
      <Container ref={ref}>
        <FadeIn $visible={inView}>
          <SectionHeading>🤖 AI That Actually Works (Not Just Hype)</SectionHeading>
          <SectionSub>
            AI assistants that handle the repetitive stuff so your team can focus on strategy and relationships.
          </SectionSub>
        </FadeIn>
        <FadeIn $visible={inView} $delay="0.15s">
          <AIGrid>
            {AI_BOXES.map((box, i) => (
              <AICard key={i}>
                <AICardIconWrap>
                  <box.icon size={24} />
                </AICardIconWrap>
                <AICardTitle>{box.title}</AICardTitle>
                <BulletList>
                  {box.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </BulletList>
                <AIResult>{box.result}</AIResult>
              </AICard>
            ))}
          </AIGrid>
        </FadeIn>
        <FadeIn $visible={inView} $delay="0.3s">
          <Disclaimer>
            All AI systems include human oversight and approval workflows. You stay in control.
          </Disclaimer>
        </FadeIn>
      </Container>
    </SectionWrapper>
  );
}

/* ════════════════════════════════════════════
   SECTION 7 — LEAD MAGNETS
   ════════════════════════════════════════════ */

const LeadGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const LeadCard = styled(Card)`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px 36px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-6px) scale(1.02);
  }
`;

const LeadIconWrap = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: ${p => p.theme.primary}18;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${p => p.theme.primary};
  margin-bottom: 24px;
`;

const LeadTitle = styled.h3`
  font-size: 22px;
  font-weight: 700;
  color: ${p => p.theme.text};
  margin: 0 0 12px;
`;

const LeadDesc = styled.p`
  font-size: 15px;
  color: ${p => p.theme.textSecondary};
  line-height: 1.65;
  margin: 0 0 8px;
`;

const LeadTime = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${p => p.theme.primary};
  margin-bottom: 24px;
`;

function LeadMagnetsSection() {
  const [ref, inView] = useInView();

  return (
    <SectionWrapper>
      <Container ref={ref}>
        <FadeIn $visible={inView}>
          <SectionHeading>Start Free. See The Numbers First. 🎯</SectionHeading>
          <SectionSub>
            No commitment. No sales call. Just data.
          </SectionSub>
        </FadeIn>
        <FadeIn $visible={inView} $delay="0.15s">
          <LeadGrid>
            <LeadCard>
              <LeadIconWrap>
                <Calculator size={28} />
              </LeadIconWrap>
              <LeadTitle>Agency Delivery Cost Calculator</LeadTitle>
              <LeadDesc>
                Find out exactly how much manual processes are costing your
                agency in time, money, and missed growth. Get a personalized
                breakdown in under two minutes.
              </LeadDesc>
              <LeadTime>Takes 90 seconds</LeadTime>
              <PrimaryButton to="/calculator">
                Calculate Your Costs
              </PrimaryButton>
            </LeadCard>
            <LeadCard>
              <LeadIconWrap>
                <ClipboardCheck size={28} />
              </LeadIconWrap>
              <LeadTitle>Client Chaos Audit</LeadTitle>
              <LeadDesc>
                Score your agency across onboarding, delivery, reporting, and
                communication. See exactly where the bottlenecks are and what
                to fix first.
              </LeadDesc>
              <LeadTime>Takes 3 minutes</LeadTime>
              <PrimaryButton to="/audit">
                Take The Audit
              </PrimaryButton>
            </LeadCard>
          </LeadGrid>
        </FadeIn>
      </Container>
    </SectionWrapper>
  );
}

/* ════════════════════════════════════════════
   SECTION 8 — ABOUT BRIEF
   ════════════════════════════════════════════ */

const AboutRow = styled.div`
  display: flex;
  gap: 48px;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 32px;
  }
`;

const AvatarOuter = styled.div`
  width: 160px;
  height: 160px;
  perspective: 600px;
  flex-shrink: 0;
`;

const AvatarInner = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;

  ${AvatarOuter}:hover & {
    transform: rotateY(180deg);
  }
`;

const AvatarFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  backface-visibility: hidden;
  border: 3px solid ${p => p.theme.border};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const AvatarBack = styled(AvatarFace)`
  transform: rotateY(180deg);
`;

const AboutText = styled.div`
  flex: 1;

  h3 {
    font-size: 20px;
    font-weight: 700;
    color: ${p => p.theme.primary};
    margin: 0 0 8px;
  }

  p {
    font-size: 16px;
    color: ${p => p.theme.textSecondary};
    line-height: 1.7;
    margin: 0 0 24px;
  }
`;

function AboutSection() {
  const [ref, inView] = useInView();

  return (
    <SectionWrapper>
      <Container ref={ref}>
        <FadeIn $visible={inView}>
          <SectionHeading>🏔️ Built by Someone Who's Seen the Chaos</SectionHeading>
          <div style={{ height: 40 }} />
        </FadeIn>
        <FadeIn $visible={inView} $delay="0.15s">
          <AboutRow>
            <AvatarOuter>
              <AvatarInner>
                <AvatarFace>
                  <img src="/kunal-avatar.svg" alt="Kunal Deshmukh illustration" />
                </AvatarFace>
                <AvatarBack>
                  <img src="/kunal-avatar.jpeg" alt="Kunal Deshmukh" />
                </AvatarBack>
              </AvatarInner>
            </AvatarOuter>
            <AboutText>
              <h3>Kunal Deshmukh</h3>
              <p>
                15+ years building systems that keep teams sane. I have worked
                inside agencies, consulted for agencies, and built the internal
                tools agencies wished they had. Now I help growing agencies
                (10-50 people) replace their duct-tape processes with
                automation that actually sticks -- maintainable, secure, and
                designed so your team stays in control.
              </p>
              <SecondaryLink to="/about">
                Learn More About My Approach
              </SecondaryLink>
            </AboutText>
          </AboutRow>
        </FadeIn>
      </Container>
    </SectionWrapper>
  );
}

/* ════════════════════════════════════════════
   SECTION 9 — FAQ
   ════════════════════════════════════════════ */

const FAQList = styled.div`
  max-width: 720px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FAQItem = styled.div`
  border: 1px solid ${p => p.theme.border};
  border-radius: ${p => p.theme.borderRadiusSm};
  overflow: hidden;
  background: ${p => p.theme.surface};
  transition: box-shadow 0.2s ease, transform 0.2s ease;

  &:hover {
    box-shadow: ${p => p.theme.cardShadow};
    transform: translateX(4px);
  }
`;

const FAQQuestion = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 16px;
  font-weight: 600;
  color: ${p => p.theme.text};
  text-align: left;
  gap: 16px;

  svg {
    flex-shrink: 0;
    color: ${p => p.theme.textSecondary};
    transition: transform 0.3s ease;
    transform: rotate(${p => (p.$open ? '180deg' : '0deg')});
  }
`;

const FAQAnswer = styled.div`
  max-height: ${p => (p.$open ? '300px' : '0')};
  overflow: hidden;
  transition: max-height 0.35s ease;
`;

const FAQAnswerInner = styled.div`
  padding: 0 24px 20px;
  font-size: 15px;
  color: ${p => p.theme.textSecondary};
  line-height: 1.7;
`;

const FAQS = [
  {
    q: "We've tried automation before. It broke after two months.",
    a: "Most automation fails because it's built without error handling, monitoring, or documentation. I build systems with proper retry logic, failure alerts, and clear runbooks so your team knows exactly what to do when (not if) something needs attention. Plus, I stick around for ongoing support.",
  },
  {
    q: 'Our process is too custom for automation.',
    a: "In my experience, 70-80% of agency delivery processes follow the same patterns: onboarding, status tracking, reporting, invoicing. The remaining 20-30% is where your competitive advantage lives -- and that's the part your team should focus on, not the repetitive stuff.",
  },
  {
    q: 'What if our tools change?',
    a: "I build tool-agnostic automation layers. The core logic sits between your tools, not inside them. So when you swap your PM tool or add a new CRM, we update the connections -- not rebuild from scratch. Modular design is a core principle.",
  },
  {
    q: 'How long until we see ROI?',
    a: "Most agencies see measurable time savings within the first month after launch. Full ROI -- where the system has paid for itself in recovered hours and prevented errors -- typically happens within 3-6 months depending on scope.",
  },
  {
    q: 'Do we need technical people on staff?',
    a: "Nope. Everything I build is designed for non-technical teams. Your account managers and ops leads will use dashboards, buttons, and simple interfaces -- not code. I also provide training and documentation so your team feels confident from day one.",
  },
  {
    q: 'What if AI makes mistakes with clients?',
    a: "Every AI system I build includes human approval workflows. Client-facing communications are drafted by AI and reviewed by your team before sending. You set the confidence thresholds -- AI handles the easy stuff automatically, and flags anything uncertain for human review.",
  },
];

function FAQSection() {
  const [ref, inView] = useInView();
  const [openIdx, setOpenIdx] = useState(null);

  const toggle = useCallback(
    (i) => setOpenIdx((prev) => (prev === i ? null : i)),
    []
  );

  return (
    <SectionWrapper>
      <Container ref={ref}>
        <FadeIn $visible={inView}>
          <SectionHeading>Common Questions</SectionHeading>
          <div style={{ height: 40 }} />
        </FadeIn>
        <FadeIn $visible={inView} $delay="0.1s">
          <FAQList>
            {FAQS.map((faq, i) => (
              <FAQItem key={i}>
                <FAQQuestion
                  $open={openIdx === i}
                  onClick={() => toggle(i)}
                  aria-expanded={openIdx === i}
                >
                  {faq.q}
                  <ChevronDown size={18} />
                </FAQQuestion>
                <FAQAnswer $open={openIdx === i}>
                  <FAQAnswerInner>{faq.a}</FAQAnswerInner>
                </FAQAnswer>
              </FAQItem>
            ))}
          </FAQList>
        </FadeIn>
      </Container>
    </SectionWrapper>
  );
}

/* ════════════════════════════════════════════
   SECTION 10 — FINAL CTA
   ════════════════════════════════════════════ */

const FinalCTAOuter = styled.section`
  padding: 100px 40px;
  background: linear-gradient(
    170deg,
    ${p => p.theme.surface} 0%,
    ${p => p.theme.background} 50%,
    ${p => p.theme.surface} 100%
  );
  text-align: center;

  @media (max-width: 768px) {
    padding: 60px 20px;
  }
`;

const FinalCTAGroup = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 32px;
`;

const FinePrint = styled.p`
  font-size: 14px;
  color: ${p => p.theme.textSecondary};
  margin: 0;
  line-height: 1.7;
`;

function FinalCTASection() {
  const [ref, inView] = useInView();

  return (
    <FinalCTAOuter>
      <Container ref={ref}>
        <FadeIn $visible={inView}>
          <SectionHeading>⚡ Ready to Stop Wasting 15+ Hours Per Week?</SectionHeading>
          <SectionSub>
            Start with data. See what chaos is costing you.
          </SectionSub>
          <FinalCTAGroup>
            <PrimaryButton to="/calculator">
              Calculate Your Hidden Costs
            </PrimaryButton>
            <SecondaryLink to="/audit">
              Take The Chaos Audit
            </SecondaryLink>
          </FinalCTAGroup>
          <FinePrint>
            No commitment. No sales call. Just numbers.
          </FinePrint>
          <FinePrint style={{ marginTop: 8 }}>
            Peak Work Studios &middot; Calgary, Canada &middot; Kunal Deshmukh, 15+ years in automation &amp; ops
          </FinePrint>
        </FadeIn>
      </Container>
    </FinalCTAOuter>
  );
}

/* ════════════════════════════════════════════
   VALUE PROP SECTION FIX — use theme via prop
   ════════════════════════════════════════════ */

const ValueSectionWrapper = styled(SectionWrapper)`
  background: ${p => p.theme.surface};
`;

/* ════════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════════ */

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <SocialProofSection />
      <ValuePropSectionFixed />
      <PainPointsSection />
      <HowItWorksSection />
      <AISection />
      <LeadMagnetsSection />
      <AboutSection />
      <FAQSection />
      <FinalCTASection />
    </>
  );
};

/* Fix the ValuePropSection to use the proper styled wrapper */
function ValuePropSectionFixed() {
  const [ref, inView] = useInView();

  return (
    <ValueSectionWrapper>
      <Container ref={ref}>
        <FadeIn $visible={inView}>
          <SectionHeading>🎯 The Agency Delivery Accelerator</SectionHeading>
          <SectionSub>
            End-to-end client journey automation. From signed contract to final
            invoice.
          </SectionSub>
        </FadeIn>
        <FadeIn $visible={inView} $delay="0.15s">
          <ValueGrid>
            {VALUE_COLS.map((col, i) => (
              <ValueCard key={i}>
                <ValueIconWrap>
                  <col.icon size={24} />
                </ValueIconWrap>
                <ValueTitle>{col.title}</ValueTitle>
                <BulletList>
                  {col.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </BulletList>
              </ValueCard>
            ))}
          </ValueGrid>
        </FadeIn>
      </Container>
    </ValueSectionWrapper>
  );
}

export default HomePage;
