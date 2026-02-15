import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import { User, Shield, Cog, Zap, Linkedin, Github, ArrowRight } from 'lucide-react';

// ─── Hooks ───
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

// ─── Animation Wrapper ───
const FadeIn = styled.div`
  opacity: ${p => (p.$visible ? 1 : 0)};
  transform: translateY(${p => (p.$visible ? '0' : '30px')});
  transition: opacity 0.7s ease, transform 0.7s ease;
  transition-delay: ${p => p.$delay || '0s'};
`;

// ─── Layout ───
const PageWrapper = styled.div`
  width: 100%;
`;

const Section = styled.section`
  max-width: 1100px;
  margin: 0 auto;
  padding: 100px 40px;
  background: ${p => p.$bg || 'transparent'};

  @media (max-width: 768px) {
    padding: 60px 20px;
  }
`;

const FullWidthSection = styled.section`
  width: 100%;
  background: ${p => p.$bg || 'transparent'};
`;

const SectionInner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 100px 40px;

  @media (max-width: 768px) {
    padding: 60px 20px;
  }
`;

// ─── Hero ───
const HeroSection = styled.section`
  max-width: 1100px;
  margin: 0 auto;
  padding: 120px 40px 100px;
  text-align: center;

  @media (max-width: 768px) {
    padding: 80px 20px 60px;
  }
`;

const HeroHeadline = styled.h1`
  font-size: clamp(32px, 6vw, 52px);
  font-weight: 800;
  color: ${p => p.theme.text};
  letter-spacing: -1px;
  margin: 0 0 20px;
  line-height: 1.15;
`;

const HeroSub = styled.p`
  font-size: clamp(17px, 3vw, 21px);
  color: ${p => p.theme.textSecondary};
  line-height: 1.65;
  max-width: 680px;
  margin: 0 auto;
`;

// ─── Story ───
const StoryGrid = styled.div`
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 40px;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    justify-items: center;
    text-align: center;
  }
`;

const AvatarOuter = styled.div`
  width: 120px;
  height: 120px;
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

const StoryText = styled.div`
  font-size: 17px;
  line-height: 1.8;
  color: ${p => p.theme.textSecondary};

  p {
    margin: 0 0 18px;
  }

  strong {
    color: ${p => p.theme.text};
    font-weight: 600;
  }
`;

// ─── Section Heading ───
const SectionTitle = styled.h2`
  font-size: clamp(26px, 5vw, 36px);
  font-weight: 800;
  color: ${p => p.theme.text};
  letter-spacing: -0.5px;
  margin: 0 0 16px;
  text-align: ${p => p.$align || 'center'};
`;

const SectionSubtitle = styled.p`
  font-size: 17px;
  color: ${p => p.theme.textSecondary};
  line-height: 1.65;
  margin: 0 0 48px;
  text-align: ${p => p.$align || 'center'};
  max-width: ${p => p.$maxWidth || 'none'};
`;

// ─── Cards ───
const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: ${p => p.theme.surface};
  border: 1px solid ${p => p.theme.border};
  border-radius: ${p => p.theme.borderRadius};
  padding: 32px 28px;
  box-shadow: ${p => p.theme.cardShadow};
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${p => p.theme.cardHoverShadow};
  }
`;

const CardIcon = styled.div`
  width: 44px;
  height: 44px;
  border-radius: ${p => p.theme.borderRadiusSm};
  background: ${p => p.theme.primary}18;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  color: ${p => p.theme.primary};
`;

const CardTitle = styled.h3`
  font-size: 19px;
  font-weight: 700;
  color: ${p => p.theme.text};
  margin: 0 0 12px;
`;

const CardBody = styled.p`
  font-size: 15px;
  line-height: 1.7;
  color: ${p => p.theme.textSecondary};
  margin: 0;
`;

// ─── Approach ───
const ApproachContent = styled.div`
  max-width: 760px;
  margin: 0 auto;
  font-size: 17px;
  line-height: 1.8;
  color: ${p => p.theme.textSecondary};

  p {
    margin: 0 0 18px;
  }

  strong {
    color: ${p => p.theme.text};
    font-weight: 600;
  }
`;

// ─── Background ───
const BackgroundGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const BackgroundItem = styled.div`
  padding: 24px 28px;
  background: ${p => p.theme.surface};
  border: 1px solid ${p => p.theme.border};
  border-radius: ${p => p.theme.borderRadius};
  font-size: 16px;
  line-height: 1.7;
  color: ${p => p.theme.textSecondary};
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${p => p.theme.cardHoverShadow};
  }

  strong {
    color: ${p => p.theme.text};
    display: block;
    margin-bottom: 6px;
    font-weight: 600;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 32px;
  justify-content: center;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border: 1px solid ${p => p.theme.border};
  border-radius: ${p => p.theme.borderRadius};
  font-size: 15px;
  font-weight: 500;
  color: ${p => p.theme.text};
  background: ${p => p.theme.surface};
  transition: all 0.2s ease;

  &:hover {
    border-color: ${p => p.theme.primary};
    color: ${p => p.theme.primary};
    transform: translateY(-2px);
    box-shadow: ${p => p.theme.cardShadow};
  }

  svg {
    flex-shrink: 0;
  }
`;

// ─── CTA ───
const CTABlock = styled.div`
  text-align: center;
`;

const CTAHeadline = styled.h2`
  font-size: clamp(26px, 5vw, 36px);
  font-weight: 800;
  color: ${p => p.theme.text};
  letter-spacing: -0.5px;
  margin: 0 0 28px;
`;

const CTAButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 36px;
  background: ${p => p.theme.primary};
  color: #000;
  font-size: 16px;
  font-weight: 700;
  border: none;
  border-radius: ${p => p.theme.borderRadius};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${p => p.theme.primaryHover};
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(56, 189, 248, 0.3);
  }
`;

// ─── Component ───
const AboutPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [heroRef, heroInView] = useInView();
  const [storyRef, storyInView] = useInView();
  const [philRef, philInView] = useInView();
  const [approachRef, approachInView] = useInView();
  const [bgRef, bgInView] = useInView();
  const [ctaRef, ctaInView] = useInView();

  return (
    <PageWrapper>
      {/* Hero */}
      <HeroSection ref={heroRef}>
        <FadeIn $visible={heroInView}>
          <HeroHeadline>🏔️ Why Peak Work Studios Exists</HeroHeadline>
          <HeroSub>
            I got tired of watching talented agencies hit a ceiling because their operations couldn't keep up.
          </HeroSub>
        </FadeIn>
      </HeroSection>

      {/* Story */}
      <FullWidthSection $bg={theme.surface}>
        <SectionInner ref={storyRef}>
          <FadeIn $visible={storyInView}>
          <StoryGrid>
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
            <StoryText>
              <p>
                <strong>I'm Kunal Deshmukh.</strong> I've spent more than 15 years building software systems, data pipelines, and automation frameworks across industries. A few years ago, I started working closely with a creative agency — helping them streamline reporting, automate client onboarding, and fix the handoff problems that kept burning hours every week.
              </p>
              <p>
                What I saw surprised me. This was a talented, fast-moving team — great work, loyal clients, solid reputation. But behind the scenes, everything ran on spreadsheets, manual follow-ups, and tribal knowledge. Projects slipped through cracks. Reporting took half a day. Onboarding a new client meant reinventing the wheel every time.
              </p>
              <p>
                The more agencies I talked to, the more I saw the same pattern: <strong>teams hitting $2-5M in revenue and stalling</strong> — not because of talent or demand, but because their operations couldn't scale. They were spending so much time on process overhead that the actual creative work suffered.
              </p>
              <p>
                That's why I built Peak Work Studios. Not as a dev shop. Not as an AI consultancy. As a focused automation practice for agencies that are ready to stop fighting their own operations and start scaling with confidence.
              </p>
            </StoryText>
          </StoryGrid>
          </FadeIn>
        </SectionInner>
      </FullWidthSection>

      {/* Philosophy */}
      <Section ref={philRef}>
        <FadeIn $visible={philInView}>
        <SectionTitle>💡 How I Think About Automation</SectionTitle>
        <SectionSubtitle>
          Three principles that guide every system I build.
        </SectionSubtitle>
        <CardsGrid>
          <Card>
            <CardIcon>
              <Shield size={22} />
            </CardIcon>
            <CardTitle>🛡️ Reliability Over Flashiness</CardTitle>
            <CardBody>
              I'd rather build something boring that works every single time than something impressive that breaks when a client sends an edge-case request at 11pm. The systems I build handle the weird inputs, the retry logic, the error notifications — because that's where trust is built.
            </CardBody>
          </Card>
          <Card>
            <CardIcon>
              <Cog size={22} />
            </CardIcon>
            <CardTitle>⚡ Simple to Run, Hard to Break</CardTitle>
            <CardBody>
              Your team shouldn't need to be technical to use what I build. If an automation requires a manual from an engineer to operate, it's a failure. Everything comes with clear documentation, runbooks, and enough guardrails that your ops team can own it day one.
            </CardBody>
          </Card>
          <Card>
            <CardIcon>
              <Zap size={22} />
            </CardIcon>
            <CardTitle>🎯 Built for How Agencies Actually Work</CardTitle>
            <CardBody>
              Agency work is messy, fast-moving, and client-driven. I don't try to force your team into rigid workflows. Instead, I build systems that flex with how you actually operate — handling scope changes, last-minute requests, and the creative chaos that comes with the territory.
            </CardBody>
          </Card>
        </CardsGrid>
        </FadeIn>
      </Section>

      {/* Approach */}
      <FullWidthSection $bg={theme.surface}>
        <SectionInner ref={approachRef}>
          <FadeIn $visible={approachInView}>
          <SectionTitle>🚀 What Makes This Different</SectionTitle>
          <SectionSubtitle $maxWidth="700px" style={{ margin: '0 auto 48px' }}>
            It's not about the tools — it's about understanding the work.
          </SectionSubtitle>
          <ApproachContent>
            <p>
              Most automation consultants start with the technology. I start by understanding your actual workflow — sitting with your team, watching how work moves from intake to delivery, and mapping where time gets wasted.
            </p>
            <p>
              <strong>I follow an 80/20 approach.</strong> The goal isn't to automate everything — it's to identify the 20% of process friction that causes 80% of the pain and eliminate it systematically. Quick wins first, then structured improvements over time.
            </p>
            <p>
              Every system I build comes with documentation, runbooks, and a clear handoff. You'll never be dependent on me to keep things running. The automation is yours — maintainable, understandable, and built to last.
            </p>
          </ApproachContent>
          </FadeIn>
        </SectionInner>
      </FullWidthSection>

      {/* Background */}
      <Section ref={bgRef}>
        <FadeIn $visible={bgInView}>
        <SectionTitle>The Technical Stuff</SectionTitle>
        <SectionSubtitle>
          A brief look at what's behind the curtain.
        </SectionSubtitle>
        <BackgroundGrid>
          <BackgroundItem>
            <strong>15+ years in software engineering and data systems</strong>
            From enterprise platforms to startup MVPs, I've built and scaled systems across the full stack.
          </BackgroundItem>
          <BackgroundItem>
            <strong>Built ETL pipelines, automation frameworks, and ops tools</strong>
            Real-world experience with the plumbing that keeps businesses running behind the scenes.
          </BackgroundItem>
          <BackgroundItem>
            <strong>Specialized in making complex systems simple</strong>
            Taking tangled workflows and turning them into clean, repeatable processes your team can own.
          </BackgroundItem>
          <BackgroundItem>
            <strong>Based in Calgary, Canada</strong>
            Working with agencies across North America, available in Mountain and Pacific time zones.
          </BackgroundItem>
        </BackgroundGrid>
        <SocialLinks>
          <SocialLink href="https://linkedin.com/in/kunaldeshmukh" target="_blank" rel="noopener noreferrer">
            <Linkedin size={18} />
            LinkedIn
          </SocialLink>
          <SocialLink href="https://github.com/kunaldeshmukh" target="_blank" rel="noopener noreferrer">
            <Github size={18} />
            GitHub
          </SocialLink>
        </SocialLinks>
        </FadeIn>
      </Section>

      {/* CTA */}
      <FullWidthSection $bg={theme.surface}>
        <SectionInner ref={ctaRef}>
          <FadeIn $visible={ctaInView}>
          <CTABlock>
            <CTAHeadline>Ready to Stop Fighting Your Operations?</CTAHeadline>
            <CTAButton onClick={() => navigate('/calculator')}>
              🤝 See What Automation Could Save You
              <ArrowRight size={18} />
            </CTAButton>
          </CTABlock>
          </FadeIn>
        </SectionInner>
      </FullWidthSection>
    </PageWrapper>
  );
};

export default AboutPage;
