import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import { CheckCircle, Calendar, Mail, MapPin, Globe, ArrowRight } from 'lucide-react';

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
  padding: 120px 40px 80px;
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

// ─── Section Heading ───
const SectionTitle = styled.h2`
  font-size: clamp(26px, 5vw, 36px);
  font-weight: 800;
  color: ${p => p.theme.text};
  letter-spacing: -0.5px;
  margin: 0 0 16px;
  text-align: center;
`;

const SectionSubtitle = styled.p`
  font-size: 17px;
  color: ${p => p.theme.textSecondary};
  line-height: 1.65;
  margin: 0 0 48px;
  text-align: center;
`;

// ─── Form ───
const FormWrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: ${p => p.theme.text};

  span {
    color: ${p => p.theme.error};
    margin-left: 2px;
  }
`;

const inputStyles = p => `
  width: 100%;
  padding: 14px;
  font-size: 15px;
  font-family: inherit;
  color: ${p.theme.text};
  background: ${p.theme.background};
  border: 1px solid ${p.$error ? p.theme.error : p.theme.border};
  border-radius: ${p.theme.borderRadiusSm};
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;

  &:focus {
    border-color: ${p.theme.primary};
    box-shadow: 0 0 0 3px ${p.theme.primary}22;
    transform: scale(1.01);
  }

  &::placeholder {
    color: ${p.theme.textSecondary};
    opacity: 0.6;
  }
`;

const Input = styled.input`
  ${p => inputStyles(p)}
`;

const Select = styled.select`
  ${p => inputStyles(p)}
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%236B7280' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
  padding-right: 40px;
`;

const Textarea = styled.textarea`
  ${p => inputStyles(p)}
  resize: vertical;
  min-height: 120px;
`;

const Honeypot = styled.div`
  position: absolute;
  left: -9999px;
  opacity: 0;
  height: 0;
  overflow: hidden;
`;

const FieldError = styled.span`
  font-size: 13px;
  color: ${p => p.theme.error};
  margin-top: 2px;
`;

const SubmitButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 16px 36px;
  background: ${p => p.theme.primary};
  color: #000;
  font-size: 16px;
  font-weight: 700;
  font-family: inherit;
  border: none;
  border-radius: ${p => p.theme.borderRadius};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: ${p => p.theme.primaryHover};
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(56, 189, 248, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

// ─── Success ───
const SuccessCard = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 48px 40px;
  text-align: center;
  background: ${p => p.theme.surface};
  border: 1px solid ${p => p.theme.border};
  border-radius: ${p => p.theme.borderRadius};
  box-shadow: ${p => p.theme.cardShadow};

  @media (max-width: 768px) {
    padding: 36px 24px;
  }
`;

const SuccessIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: ${p => p.theme.success}18;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  color: ${p => p.theme.success};
`;

const SuccessTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: ${p => p.theme.text};
  margin: 0 0 12px;
`;

const SuccessText = styled.p`
  font-size: 16px;
  color: ${p => p.theme.textSecondary};
  line-height: 1.7;
  margin: 0;
`;

// ─── Calendly ───
const CalendlyBlock = styled.div`
  max-width: 600px;
  margin: 48px auto 0;
  text-align: center;
  padding: 32px;
  background: ${p => p.theme.surface};
  border: 1px solid ${p => p.theme.border};
  border-radius: ${p => p.theme.borderRadius};
`;

const CalendlyHeading = styled.p`
  font-size: 17px;
  font-weight: 600;
  color: ${p => p.theme.text};
  margin: 0 0 16px;
`;

const CalendlyLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 28px;
  border: 2px solid ${p => p.theme.primary};
  border-radius: ${p => p.theme.borderRadius};
  color: ${p => p.theme.primary};
  font-size: 15px;
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    background: ${p => p.theme.primary};
    color: #000;
    transform: translateY(-2px);
  }
`;

// ─── Timeline ───
const TimelineList = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0;
  max-width: 700px;
  margin: 0 auto;
  counter-reset: timeline;
`;

const TimelineItem = styled.li`
  position: relative;
  padding: 0 0 32px 60px;
  counter-increment: timeline;
  transition: transform 0.25s ease;

  &:hover {
    transform: translateX(6px);
  }

  &:last-child {
    padding-bottom: 0;
  }

  &::before {
    content: counter(timeline);
    position: absolute;
    left: 0;
    top: 2px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: ${p => p.theme.primary}18;
    color: ${p => p.theme.primary};
    font-size: 16px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &::after {
    content: '';
    position: absolute;
    left: 19px;
    top: 46px;
    bottom: 0;
    width: 2px;
    background: ${p => p.theme.border};
  }

  &:last-child::after {
    display: none;
  }
`;

const TimelineText = styled.p`
  font-size: 16px;
  line-height: 1.7;
  color: ${p => p.theme.textSecondary};
  margin: 0;
  padding-top: 8px;

  strong {
    color: ${p => p.theme.text};
  }
`;

// ─── Other Ways ───
const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  max-width: 700px;
  margin: 0 auto;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const ContactCard = styled.div`
  text-align: center;
  padding: 28px 20px;
  background: ${p => p.theme.surface};
  border: 1px solid ${p => p.theme.border};
  border-radius: ${p => p.theme.borderRadius};
  box-shadow: ${p => p.theme.cardShadow};
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${p => p.theme.cardHoverShadow};
  }
`;

const ContactCardIcon = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: ${p => p.theme.primary}18;
  color: ${p => p.theme.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 14px;
`;

const ContactCardLabel = styled.p`
  font-size: 13px;
  color: ${p => p.theme.textSecondary};
  margin: 0 0 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
`;

const ContactCardValue = styled.a`
  font-size: 15px;
  font-weight: 500;
  color: ${p => p.theme.text};
  transition: color 0.2s ease;
  word-break: break-all;

  &:hover {
    color: ${p => p.theme.primary};
  }
`;

// ─── Validation ───
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Name is required.';
  if (!values.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!emailRegex.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!values.painPoint.trim()) errors.painPoint = 'Please describe your biggest pain point.';
  return errors;
}

// ─── Component ───
const ContactPage = () => {
  const theme = useTheme();
  const [heroRef, heroInView] = useInView();

  useEffect(() => {
    document.title = 'Contact | Peak Work Studios';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = 'Get in touch with Peak Work Studios. Book a discovery call to discuss workflow automation for your team.';
    }
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.href = 'https://peakworkstudios.com/contact';
  }, []);
  const [formRef, formInView] = useInView();
  const [timelineRef, timelineInView] = useInView();
  const [contactRef, contactInView] = useInView();

  const [form, setForm] = useState({
    name: '',
    email: '',
    agency: '',
    teamSize: '',
    activeClients: '',
    painPoint: '',
    referralSource: '',
    honeypot: '',
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot check
    if (form.honeypot) return;

    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    try {
      const { honeypot, agency, activeClients, referralSource, ...rest } = form;
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...rest,
          agencyName: agency,
          clientCount: activeClients,
          source: referralSource,
          website: honeypot,
        }),
      });
      setSubmitted(true);
    } catch {
      // Still show success to prevent leaking info
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageWrapper>
      {/* Hero */}
      <HeroSection ref={heroRef}>
        <FadeIn $visible={heroInView}>
          <HeroHeadline>Let's Talk About Your Operations</HeroHeadline>
          <HeroSub>
            30-minute call. No sales pitch. Just an honest conversation about what's slowing you down.
          </HeroSub>
        </FadeIn>
      </HeroSection>

      {/* Form */}
      <Section style={{ paddingTop: 0 }} ref={formRef}>
        <FadeIn $visible={formInView}>
        {submitted ? (
          <>
            <SuccessCard>
              <SuccessIcon>
                <CheckCircle size={32} />
              </SuccessIcon>
              <SuccessTitle>Message received.</SuccessTitle>
              <SuccessText>
                I'll review your submission within 24 hours and reach out to schedule a call. In the meantime, feel free to book directly on Calendly if you'd prefer.
              </SuccessText>
            </SuccessCard>
            <CalendlyBlock>
              <CalendlyHeading>Prefer to jump straight on a call?</CalendlyHeading>
              <CalendlyLink
                href="https://calendly.com/peakworkstudios/30min"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Calendar size={18} />
                Book a 30-minute call
              </CalendlyLink>
            </CalendlyBlock>
          </>
        ) : (
          <>
            <FormWrapper>
              <Form onSubmit={handleSubmit} noValidate>
                <FormGroup>
                  <Label>Name <span>*</span></Label>
                  <Input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    $error={!!errors.name}
                  />
                  {errors.name && <FieldError>{errors.name}</FieldError>}
                </FormGroup>

                <FormGroup>
                  <Label>Email <span>*</span></Label>
                  <Input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    $error={!!errors.email}
                  />
                  {errors.email && <FieldError>{errors.email}</FieldError>}
                </FormGroup>

                <FormGroup>
                  <Label>Company name</Label>
                  <Input
                    type="text"
                    name="agency"
                    value={form.agency}
                    onChange={handleChange}
                    placeholder="Optional"
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Team size</Label>
                  <Select name="teamSize" value={form.teamSize} onChange={handleChange}>
                    <option value="">Select team size</option>
                    <option value="1-10">1-10</option>
                    <option value="11-25">11-25</option>
                    <option value="26-50">26-50</option>
                    <option value="50+">50+</option>
                  </Select>
                </FormGroup>

                <FormGroup>
                  <Label>Number of active clients/projects</Label>
                  <Select name="activeClients" value={form.activeClients} onChange={handleChange}>
                    <option value="">Select number of clients/projects</option>
                    <option value="1-10">1-10</option>
                    <option value="11-25">11-25</option>
                    <option value="26-50">26-50</option>
                    <option value="51-100">51-100</option>
                    <option value="100+">100+</option>
                  </Select>
                </FormGroup>

                <FormGroup>
                  <Label>What's your biggest operational pain point right now? <span>*</span></Label>
                  <Textarea
                    name="painPoint"
                    value={form.painPoint}
                    onChange={handleChange}
                    placeholder="E.g., We spend 10 hours a week on manual reporting, or onboarding new projects takes too long..."
                    rows={5}
                    $error={!!errors.painPoint}
                  />
                  {errors.painPoint && <FieldError>{errors.painPoint}</FieldError>}
                </FormGroup>

                <FormGroup>
                  <Label>How did you hear about us?</Label>
                  <Select name="referralSource" value={form.referralSource} onChange={handleChange}>
                    <option value="">Select an option</option>
                    <option value="Web search">Web search</option>
                    <option value="Referral">Referral</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Other">Other</option>
                  </Select>
                </FormGroup>

                <Honeypot aria-hidden="true">
                  <input
                    type="text"
                    name="honeypot"
                    value={form.honeypot}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </Honeypot>

                <SubmitButton type="submit" disabled={submitting}>
                  {submitting ? 'Sending...' : 'Send Message'}
                  {!submitting && <ArrowRight size={18} />}
                </SubmitButton>
              </Form>
            </FormWrapper>

            <CalendlyBlock>
              <CalendlyHeading>Prefer to jump straight on a call?</CalendlyHeading>
              <CalendlyLink
                href="https://calendly.com/peakworkstudios/30min"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Calendar size={18} />
                Book a 30-minute call
              </CalendlyLink>
            </CalendlyBlock>
          </>
        )}
        </FadeIn>
      </Section>

      {/* What to Expect */}
      <FullWidthSection $bg={theme.surface}>
        <SectionInner ref={timelineRef}>
          <FadeIn $visible={timelineInView}>
          <SectionTitle>What to Expect</SectionTitle>
          <SectionSubtitle>
            A clear, low-pressure process from start to finish.
          </SectionSubtitle>
          <TimelineList>
            <TimelineItem>
              <TimelineText>I'll review your submission within 24 hours</TimelineText>
            </TimelineItem>
            <TimelineItem>
              <TimelineText>We'll schedule a 30-minute call</TimelineText>
            </TimelineItem>
            <TimelineItem>
              <TimelineText>You walk me through your current workflows and pain points</TimelineText>
            </TimelineItem>
            <TimelineItem>
              <TimelineText>I'll identify 2-3 quick wins and map out a longer-term plan</TimelineText>
            </TimelineItem>
            <TimelineItem>
              <TimelineText>You'll get a 1-page automation roadmap within 48 hours</TimelineText>
            </TimelineItem>
            <TimelineItem>
              <TimelineText>Zero commitment. If it makes sense, great. If not, you got free consulting.</TimelineText>
            </TimelineItem>
          </TimelineList>
          </FadeIn>
        </SectionInner>
      </FullWidthSection>

      {/* Other Ways to Reach */}
      <Section ref={contactRef}>
        <FadeIn $visible={contactInView}>
        <SectionTitle>📧 Other Ways to Reach Me</SectionTitle>
        <SectionSubtitle>
          Pick whichever works best for you.
        </SectionSubtitle>
        <ContactGrid>
          <ContactCard>
            <ContactCardIcon>
              <Mail size={20} />
            </ContactCardIcon>
            <ContactCardLabel>Email</ContactCardLabel>
            <ContactCardValue href="mailto:info@peakworkstudios.com">
              info@peakworkstudios.com
            </ContactCardValue>
          </ContactCard>
          <ContactCard>
            <ContactCardIcon>
              <MapPin size={20} />
            </ContactCardIcon>
            <ContactCardLabel>📍 Location</ContactCardLabel>
            <ContactCardValue as="span">Calgary, Canada</ContactCardValue>
          </ContactCard>
          <ContactCard>
            <ContactCardIcon>
              <Globe size={20} />
            </ContactCardIcon>
            <ContactCardLabel>🌐 Personal Site</ContactCardLabel>
            <ContactCardValue
              href="https://kunaldeshmukh.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              kunaldeshmukh.com
            </ContactCardValue>
          </ContactCard>
        </ContactGrid>
        </FadeIn>
      </Section>
    </PageWrapper>
  );
};

export default ContactPage;
