import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ArrowRight, Calendar, CheckCircle, Globe, Mail, MapPin } from 'lucide-react';

const PageWrapper = styled.div`
  min-height: 100vh;
  padding: 92px 16px 72px;
  background:
    radial-gradient(circle at top right, rgba(193, 147, 27, 0.12), transparent 24%),
    ${p => p.theme.background};

  @media (min-width: 769px) {
    padding: 116px 28px 96px;
  }
`;

const Shell = styled.div`
  max-width: 1220px;
  margin: 0 auto;
  display: grid;
  gap: 24px;
`;

const HeroGrid = styled.section`
  display: grid;
  gap: 20px;

  @media (min-width: 980px) {
    grid-template-columns: minmax(0, 1.18fr) minmax(320px, 0.82fr);
    align-items: stretch;
  }
`;

const Panel = styled.div`
  border: 1px solid ${p => p.theme.border};
  border-radius: ${p => p.theme.borderRadiusLg};
  background:
    linear-gradient(135deg, rgba(193, 147, 27, 0.11), transparent 40%),
    ${p => p.theme.surface};
  box-shadow: ${p => p.theme.cardShadow};
`;

const HeroPanel = styled(Panel)`
  padding: 28px;
  text-align: center;

  @media (min-width: 769px) {
    padding: 38px;
  }
`;

const SidePanel = styled(Panel)`
  padding: 24px;
  display: grid;
  gap: 16px;
  align-content: start;
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

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${p => p.theme.primary};
  }
`;

const HeroTitle = styled.h1`
  margin: 0 0 18px;
  font-family: ${p => p.theme.headingFont};
  font-size: clamp(34px, 6vw, 48px);
  line-height: 1.04;
  letter-spacing: -0.04em;
  color: ${p => p.theme.text};
`;

const HeroBody = styled.p`
  margin: 0 auto;
  max-width: 700px;
  font-size: clamp(17px, 2.7vw, 20px);
  line-height: 1.7;
  color: ${p => p.theme.textSecondary};
`;

const SideLabel = styled.div`
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${p => p.theme.textSecondary};
`;

const SideTitle = styled.h2`
  margin: 0;
  font-family: ${p => p.theme.headingFont};
  font-size: clamp(24px, 3vw, 32px);
  line-height: 1.04;
  letter-spacing: -0.03em;
  color: ${p => p.theme.text};
`;

const BulletStack = styled.div`
  display: grid;
  gap: 12px;
`;

const Bullet = styled.div`
  display: grid;
  grid-template-columns: 10px minmax(0, 1fr);
  gap: 12px;
  align-items: start;
  color: ${p => p.theme.textSecondary};
  line-height: 1.65;

  &::before {
    content: '';
    width: 10px;
    height: 10px;
    margin-top: 8px;
    border-radius: 50%;
    background: ${p => p.theme.primary};
  }
`;

const ContentGrid = styled.section`
  display: grid;
  gap: 20px;

  @media (min-width: 980px) {
    grid-template-columns: minmax(0, 1.08fr) minmax(320px, 0.92fr);
    align-items: start;
  }
`;

const FormCard = styled(Panel)`
  padding: 28px;

  @media (max-width: 768px) {
    padding: 24px 20px;
  }
`;

const CardTitle = styled.h2`
  margin: 0 0 12px;
  font-family: ${p => p.theme.headingFont};
  font-size: clamp(24px, 3vw, 30px);
  line-height: 1.06;
  letter-spacing: -0.03em;
  color: ${p => p.theme.text};
`;

const CardBody = styled.p`
  margin: 0 0 20px;
  font-size: 16px;
  line-height: 1.7;
  color: ${p => p.theme.textSecondary};
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const FullWidthGroup = styled(FormGroup)`
  grid-column: 1 / -1;
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

const fieldStyles = p => `
  width: 100%;
  padding: 14px 16px;
  font-size: 15px;
  font-family: inherit;
  color: ${p.theme.text};
  background: ${p.theme.background};
  border: 1px solid ${p.$error ? p.theme.error : p.theme.border};
  border-radius: ${p.theme.borderRadiusSm};
  outline: none;

  &:focus {
    border-color: ${p.theme.primary};
    box-shadow: 0 0 0 3px ${p.theme.primary}22;
  }

  &::placeholder {
    color: ${p.theme.textSecondary};
    opacity: 0.6;
  }
`;

const Input = styled.input`
  ${p => fieldStyles(p)}
`;

const Select = styled.select`
  ${p => fieldStyles(p)}
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%236B7280' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
  padding-right: 40px;
`;

const Textarea = styled.textarea`
  ${p => fieldStyles(p)}
  min-height: 126px;
  resize: vertical;
`;

const FieldError = styled.span`
  font-size: 13px;
  color: ${p => p.theme.error};
`;

const Honeypot = styled.div`
  position: absolute;
  left: -9999px;
  opacity: 0;
  height: 0;
  overflow: hidden;
`;

const SubmitButton = styled.button`
  grid-column: 1 / -1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  min-height: 54px;
  padding: 0 22px;
  background: ${p => p.theme.primary};
  color: ${p => p.theme.buttonText};
  border: none;
  border-radius: 999px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.2s ease;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    background: ${p => p.theme.primaryHover};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const CalendlyBlock = styled.div`
  margin-top: 20px;
  padding: 24px;
  border-radius: ${p => p.theme.borderRadius};
  background: rgba(255, 255, 255, 0.34);
  border: 1px solid ${p => p.theme.border};
  text-align: center;
`;

const CalendlyHeading = styled.p`
  margin: 0 0 16px;
  font-size: 16px;
  font-weight: 600;
  color: ${p => p.theme.text};
`;

const CalendlyLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-height: 48px;
  padding: 0 22px;
  border: 2px solid ${p => p.theme.primary};
  border-radius: 999px;
  color: ${p => p.theme.primary};
  font-size: 15px;
  font-weight: 700;
  transition: background-color 0.2s ease, color 0.2s ease, transform 0.2s ease;

  &:hover {
    background: ${p => p.theme.primary};
    color: #000;
    transform: translateY(-1px);
  }
`;

const SuccessCard = styled(Panel)`
  padding: 36px 30px;
  text-align: center;
`;

const SuccessIcon = styled.div`
  width: 64px;
  height: 64px;
  margin: 0 auto 20px;
  border-radius: 50%;
  background: ${p => p.theme.success}18;
  color: ${p => p.theme.success};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SuccessTitle = styled.h3`
  margin: 0 0 10px;
  font-size: 24px;
  font-weight: 700;
  color: ${p => p.theme.text};
`;

const SuccessText = styled.p`
  margin: 0;
  font-size: 16px;
  line-height: 1.75;
  color: ${p => p.theme.textSecondary};
`;

const SideStack = styled.div`
  display: grid;
  gap: 20px;
`;

const InfoPanel = styled(Panel)`
  padding: 28px;

  @media (max-width: 768px) {
    padding: 24px 20px;
  }
`;

const TimelineList = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;
  counter-reset: timeline;
`;

const TimelineItem = styled.li`
  position: relative;
  padding: 0 0 28px 56px;
  counter-increment: timeline;

  &:last-child {
    padding-bottom: 0;
  }

  &::before {
    content: counter(timeline);
    position: absolute;
    left: 0;
    top: 2px;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: ${p => p.theme.primary}18;
    color: ${p => p.theme.primary};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    font-weight: 700;
  }

  &::after {
    content: '';
    position: absolute;
    left: 18px;
    top: 44px;
    bottom: 0;
    width: 2px;
    background: ${p => p.theme.border};
  }

  &:last-child::after {
    display: none;
  }
`;

const TimelineText = styled.p`
  margin: 0;
  padding-top: 7px;
  font-size: 15px;
  line-height: 1.75;
  color: ${p => p.theme.textSecondary};

  strong {
    color: ${p => p.theme.text};
  }
`;

const ContactGrid = styled.div`
  display: grid;
  gap: 14px;
`;

const ContactCard = styled.div`
  padding: 18px;
  border-radius: ${p => p.theme.borderRadius};
  background: rgba(255, 255, 255, 0.34);
  border: 1px solid ${p => p.theme.border};
`;

const ContactCardIcon = styled.div`
  width: 42px;
  height: 42px;
  margin-bottom: 12px;
  border-radius: 50%;
  background: ${p => p.theme.primary}18;
  color: ${p => p.theme.primary};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContactCardLabel = styled.p`
  margin: 0 0 4px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${p => p.theme.textSecondary};
`;

const ContactCardValue = styled.a`
  font-size: 15px;
  font-weight: 500;
  color: ${p => p.theme.text};
  word-break: break-word;

  &:hover {
    color: ${p => p.theme.primary};
  }
`;

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

export default function ContactPage() {
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

  useEffect(() => {
    document.title = 'Contact | Peak Work Studios';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = 'Get in touch with Peak Work Studios. Book a discovery call to discuss workflow automation for your team.';
    }
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.href = 'https://peakworkstudios.com/contact';
  }, []);

  const handleChange = event => {
    const { name, value } = event.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
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
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageWrapper>
      <Shell>
        <HeroGrid>
          <HeroPanel>
            <Eyebrow>Discovery conversation</Eyebrow>
            <HeroTitle>Talk through the workflows your team should not still be handling by hand.</HeroTitle>
            <HeroBody>
              A short working session about delivery friction, reporting overhead, and where operational automation would create the clearest return first.
            </HeroBody>
          </HeroPanel>

          <SidePanel>
            <SideLabel>Best fit</SideLabel>
            <SideTitle>Built for teams with real workflow drag, not vague curiosity.</SideTitle>
            <BulletStack>
              <Bullet>Useful when status chasing, reporting, handoffs, or follow-up work keep showing up as delivery friction.</Bullet>
              <Bullet>You get a practical conversation, not a generic discovery script.</Bullet>
              <Bullet>The outcome is a concrete next-step view of what to standardize, automate, or ignore for now.</Bullet>
            </BulletStack>
          </SidePanel>
        </HeroGrid>

        <ContentGrid>
          <div>
            {!submitted ? (
              <>
                <FormCard>
                  <CardTitle>Start the conversation</CardTitle>
                  <CardBody>
                    Share the team context and the main operating pain point. The goal is to get enough signal quickly, not force you through a bloated intake flow.
                  </CardBody>
                  <Form onSubmit={handleSubmit} noValidate>
                    <FormGroup>
                      <Label>Name <span>*</span></Label>
                      <Input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your full name" $error={!!errors.name} />
                      {errors.name ? <FieldError>{errors.name}</FieldError> : null}
                    </FormGroup>

                    <FormGroup>
                      <Label>Email <span>*</span></Label>
                      <Input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@company.com" $error={!!errors.email} />
                      {errors.email ? <FieldError>{errors.email}</FieldError> : null}
                    </FormGroup>

                    <FormGroup>
                      <Label>Company name</Label>
                      <Input type="text" name="agency" value={form.agency} onChange={handleChange} placeholder="Optional" />
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
                      <Label>Number of active clients or projects</Label>
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
                      <Label>How did you hear about us?</Label>
                      <Select name="referralSource" value={form.referralSource} onChange={handleChange}>
                        <option value="">Select an option</option>
                        <option value="Web search">Web search</option>
                        <option value="Referral">Referral</option>
                        <option value="LinkedIn">LinkedIn</option>
                        <option value="Other">Other</option>
                      </Select>
                    </FormGroup>

                    <FullWidthGroup>
                      <Label>What&apos;s your biggest operational pain point right now? <span>*</span></Label>
                      <Textarea
                        name="painPoint"
                        value={form.painPoint}
                        onChange={handleChange}
                        placeholder="For example: weekly reporting takes too long, onboarding is inconsistent, or handoffs create delays."
                        $error={!!errors.painPoint}
                      />
                      {errors.painPoint ? <FieldError>{errors.painPoint}</FieldError> : null}
                    </FullWidthGroup>

                    <Honeypot aria-hidden="true">
                      <input type="text" name="honeypot" value={form.honeypot} onChange={handleChange} tabIndex={-1} autoComplete="off" />
                    </Honeypot>

                    <SubmitButton type="submit" disabled={submitting}>
                      {submitting ? 'Sending...' : 'Send message'}
                      {!submitting ? <ArrowRight size={18} /> : null}
                    </SubmitButton>
                  </Form>
                </FormCard>

                <CalendlyBlock>
                  <CalendlyHeading>Prefer to jump straight on a call?</CalendlyHeading>
                  <CalendlyLink href="https://calendly.com/peakworkstudios/30min" target="_blank" rel="noopener noreferrer">
                    <Calendar size={18} />
                    Book a 30-minute call
                  </CalendlyLink>
                </CalendlyBlock>
              </>
            ) : (
              <>
                <SuccessCard>
                  <SuccessIcon>
                    <CheckCircle size={32} />
                  </SuccessIcon>
                  <SuccessTitle>Message received.</SuccessTitle>
                  <SuccessText>
                    I&apos;ll review your note within 24 hours and reach out to schedule a call. If you&apos;d rather move faster, you can book directly on Calendly.
                  </SuccessText>
                </SuccessCard>

                <CalendlyBlock>
                  <CalendlyHeading>Prefer to jump straight on a call?</CalendlyHeading>
                  <CalendlyLink href="https://calendly.com/peakworkstudios/30min" target="_blank" rel="noopener noreferrer">
                    <Calendar size={18} />
                    Book a 30-minute call
                  </CalendlyLink>
                </CalendlyBlock>
              </>
            )}
          </div>

          <SideStack>
            <InfoPanel>
              <CardTitle>What to expect</CardTitle>
              <CardBody>Clear process, low friction, and something concrete at the end.</CardBody>
              <TimelineList>
                <TimelineItem>
                  <TimelineText><strong>Within 24 hours:</strong> I review the note and identify where the workflow is actually breaking down.</TimelineText>
                </TimelineItem>
                <TimelineItem>
                  <TimelineText><strong>30-minute conversation:</strong> we walk through your current delivery process, tools, and failure points.</TimelineText>
                </TimelineItem>
                <TimelineItem>
                  <TimelineText><strong>Priority setting:</strong> we isolate the two or three bottlenecks most worth fixing first.</TimelineText>
                </TimelineItem>
                <TimelineItem>
                  <TimelineText><strong>Quick wins:</strong> I map short-term automation or process fixes against the broader operating plan.</TimelineText>
                </TimelineItem>
                <TimelineItem>
                  <TimelineText><strong>Within 48 hours:</strong> you get a concise one-page roadmap with the right next moves.</TimelineText>
                </TimelineItem>
                <TimelineItem>
                  <TimelineText><strong>No obligation:</strong> if it makes sense to continue, we do. If not, you still leave with a better operating picture.</TimelineText>
                </TimelineItem>
              </TimelineList>
            </InfoPanel>

            <InfoPanel>
              <CardTitle>Other ways to reach us</CardTitle>
              <CardBody>Use whichever channel is easiest.</CardBody>
              <ContactGrid>
                <ContactCard>
                  <ContactCardIcon>
                    <Mail size={20} />
                  </ContactCardIcon>
                  <ContactCardLabel>Email</ContactCardLabel>
                  <ContactCardValue href="mailto:info@peakworkstudios.com">info@peakworkstudios.com</ContactCardValue>
                </ContactCard>

                <ContactCard>
                  <ContactCardIcon>
                    <MapPin size={20} />
                  </ContactCardIcon>
                  <ContactCardLabel>Location</ContactCardLabel>
                  <ContactCardValue as="span">Calgary, Canada</ContactCardValue>
                </ContactCard>

                <ContactCard>
                  <ContactCardIcon>
                    <Globe size={20} />
                  </ContactCardIcon>
                  <ContactCardLabel>Personal Site</ContactCardLabel>
                  <ContactCardValue href="https://kunaldeshmukh.com" target="_blank" rel="noopener noreferrer">
                    kunaldeshmukh.com
                  </ContactCardValue>
                </ContactCard>
              </ContactGrid>
            </InfoPanel>
          </SideStack>
        </ContentGrid>
      </Shell>
    </PageWrapper>
  );
}