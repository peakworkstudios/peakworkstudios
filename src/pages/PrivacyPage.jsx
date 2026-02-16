import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
  max-width: 800px;
  margin: 0 auto;
  padding: 100px 40px;

  @media (max-width: 768px) {
    padding: 60px 20px;
  }
`;

const HeroSection = styled.section`
  max-width: 800px;
  margin: 0 auto;
  padding: 120px 40px 60px;
  text-align: center;

  @media (max-width: 768px) {
    padding: 80px 20px 40px;
  }
`;

const HeroHeadline = styled.h1`
  font-size: clamp(28px, 5vw, 44px);
  font-weight: 800;
  letter-spacing: -1px;
  color: ${p => p.theme.text};
  margin: 0 0 12px;
  line-height: 1.15;
`;

const HeroSub = styled.p`
  font-size: 16px;
  color: ${p => p.theme.textSecondary};
  line-height: 1.6;
  margin: 0;
`;

const SectionTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: ${p => p.theme.text};
  margin: 48px 0 16px;
  line-height: 1.3;

  &:first-of-type {
    margin-top: 0;
  }
`;

const Paragraph = styled.p`
  font-size: 15px;
  color: ${p => p.theme.textSecondary};
  line-height: 1.8;
  margin: 0 0 16px;
`;

const List = styled.ul`
  margin: 0 0 16px;
  padding-left: 24px;

  li {
    font-size: 15px;
    color: ${p => p.theme.textSecondary};
    line-height: 1.8;
    margin-bottom: 4px;
  }
`;

const InlineLink = styled(Link)`
  color: ${p => p.theme.primary};
  text-decoration: underline;
  &:hover { opacity: 0.8; }
`;

const ExternalLink = styled.a`
  color: ${p => p.theme.primary};
  text-decoration: underline;
  &:hover { opacity: 0.8; }
`;

const PrivacyPage = () => {
  const [heroRef, heroInView] = useInView();
  const [contentRef, contentInView] = useInView();

  useEffect(() => {
    document.title = 'Privacy Policy | Peak Work Studios';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = 'Privacy Policy for Peak Work Studios. Learn how we collect, use, and protect your information.';
    }
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.href = 'https://peakworkstudios.com/privacy';
    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) { robots = document.createElement('meta'); robots.name = 'robots'; document.head.appendChild(robots); }
    robots.content = 'noindex, follow';
    return () => { if (robots) robots.content = 'index, follow'; };
  }, []);

  return (
    <PageWrapper>
      <HeroSection ref={heroRef}>
        <FadeIn $visible={heroInView}>
          <HeroHeadline>Privacy Policy</HeroHeadline>
          <HeroSub>Effective date: February 15, 2026</HeroSub>
        </FadeIn>
      </HeroSection>

      <Section ref={contentRef}>
        <FadeIn $visible={contentInView}>
          <Paragraph>
            Peak Work Studios ("we", "us", or "our") operates the website at peakworkstudios.com. This Privacy Policy explains how we collect, use, and protect your information when you use our website and services.
          </Paragraph>

          <SectionTitle>1. Information We Collect</SectionTitle>
          <Paragraph>We collect information that you voluntarily provide through our website forms:</Paragraph>
          <List>
            <li><strong>Contact form:</strong> Name, email address, company name, team size, number of clients/projects, and a description of your pain point.</li>
            <li><strong>Operations Audit:</strong> Name, email address, team size, and your responses to audit questions.</li>
            <li><strong>Hidden Cost Calculator:</strong> Email address (when you request results by email), along with the team size, hourly rate, and client count you enter into the calculator.</li>
          </List>
          <Paragraph>We do not collect information passively through tracking scripts or analytics tools beyond what is described below.</Paragraph>

          <SectionTitle>2. How We Use Your Information</SectionTitle>
          <List>
            <li>To respond to your inquiries submitted through the contact form.</li>
            <li>To send you your calculator results or audit results by email when you request them.</li>
            <li>To notify ourselves internally when a new form submission or audit is completed.</li>
            <li>To improve our website and services based on how our tools are used.</li>
          </List>
          <Paragraph>We do not sell, rent, or share your personal information with third parties for marketing purposes.</Paragraph>

          <SectionTitle>3. Cookies and Local Storage</SectionTitle>
          <Paragraph>Our website uses browser local storage (not traditional cookies) to remember:</Paragraph>
          <List>
            <li><strong>Theme preference:</strong> Whether you selected light or dark mode (<code>pws-dark-mode</code>).</li>
            <li><strong>Cookie consent:</strong> Whether you accepted or declined our consent banner (<code>pws-cookie-accepted</code>).</li>
            <li><strong>Calculator state:</strong> Your calculator inputs are saved locally so you can return to your results.</li>
          </List>
          <Paragraph>This data is stored only in your browser and is not transmitted to our servers.</Paragraph>

          <SectionTitle>4. Third-Party Services</SectionTitle>
          <Paragraph>We use the following third-party services to operate our website:</Paragraph>
          <List>
            <li><strong>Vercel:</strong> Website hosting and serverless function execution. Vercel may collect basic access logs (IP address, request timestamps). See <ExternalLink href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Vercel's Privacy Policy</ExternalLink>.</li>
            <li><strong>Resend:</strong> Email delivery service used to send calculator results, audit results, and contact form notifications. See <ExternalLink href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Resend's Privacy Policy</ExternalLink>.</li>
            <li><strong>Google Fonts:</strong> Web fonts loaded from Google's servers. See <ExternalLink href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google's Privacy Policy</ExternalLink>.</li>
          </List>

          <SectionTitle>5. Data Retention</SectionTitle>
          <Paragraph>
            Form submissions are delivered to us via email. We do not store your data in a database. Email records are retained in our email inbox and may be deleted at our discretion. Calculator and audit results sent to you are retained in your own email inbox.
          </Paragraph>

          <SectionTitle>6. Your Rights</SectionTitle>
          <Paragraph>You have the right to:</Paragraph>
          <List>
            <li>Request that we delete any personal information we hold about you.</li>
            <li>Opt out of future emails by using the unsubscribe link included in every email we send.</li>
            <li>Clear your local storage data at any time through your browser settings.</li>
          </List>

          <SectionTitle>7. Children's Privacy</SectionTitle>
          <Paragraph>
            Our website and services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children.
          </Paragraph>

          <SectionTitle>8. Changes to This Policy</SectionTitle>
          <Paragraph>
            We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date. Your continued use of the website after changes are posted constitutes acceptance of the updated policy.
          </Paragraph>

          <SectionTitle>9. Contact Us</SectionTitle>
          <Paragraph>
            If you have questions about this Privacy Policy or wish to exercise your rights, contact us at{' '}
            <ExternalLink href="mailto:info@peakworkstudios.com">info@peakworkstudios.com</ExternalLink>.
          </Paragraph>
          <Paragraph style={{ marginTop: '8px' }}>
            Peak Work Studios<br />
            Calgary, Alberta, Canada
          </Paragraph>

          <Paragraph style={{ marginTop: '48px', fontSize: '14px', borderTop: `1px solid`, borderColor: 'inherit', paddingTop: '24px' }}>
            <InlineLink to="/terms">Terms of Service</InlineLink> &middot;{' '}
            <InlineLink to="/">Back to Home</InlineLink>
          </Paragraph>
        </FadeIn>
      </Section>
    </PageWrapper>
  );
};

export default PrivacyPage;
