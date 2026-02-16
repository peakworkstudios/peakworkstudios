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

const TermsPage = () => {
  const [heroRef, heroInView] = useInView();
  const [contentRef, contentInView] = useInView();

  useEffect(() => {
    document.title = 'Terms of Service | Peak Work Studios';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = 'Terms of Service for Peak Work Studios. Review the terms governing your use of our website and services.';
    }
  }, []);

  return (
    <PageWrapper>
      <HeroSection ref={heroRef}>
        <FadeIn $visible={heroInView}>
          <HeroHeadline>Terms of Service</HeroHeadline>
          <HeroSub>Effective date: February 15, 2026</HeroSub>
        </FadeIn>
      </HeroSection>

      <Section ref={contentRef}>
        <FadeIn $visible={contentInView}>
          <Paragraph>
            These Terms of Service ("Terms") govern your use of the Peak Work Studios website at peakworkstudios.com ("Website") and any services provided by Peak Work Studios ("we", "us", or "our"). By accessing or using the Website, you agree to be bound by these Terms.
          </Paragraph>

          <SectionTitle>1. Services Description</SectionTitle>
          <Paragraph>
            Peak Work Studios provides AI and automation consulting services for professional service teams. Our Website includes informational content, a contact form, and interactive tools including a Hidden Cost Calculator and an Operations Audit.
          </Paragraph>

          <SectionTitle>2. Calculator and Audit Tools</SectionTitle>
          <Paragraph>
            The Hidden Cost Calculator and Operations Audit are provided for informational and educational purposes only. Results are estimates based on the inputs you provide and general industry assumptions. They are not financial advice, guarantees of savings, or promises of specific outcomes.
          </Paragraph>
          <Paragraph>
            Actual costs, savings, and implementation timelines vary significantly depending on your team's workflows, tools, and organizational structure. You should not make business decisions based solely on these estimates without consulting a qualified professional.
          </Paragraph>

          <SectionTitle>3. Use of the Website</SectionTitle>
          <Paragraph>You agree to use the Website only for lawful purposes and in a manner that does not:</Paragraph>
          <List>
            <li>Violate any applicable laws or regulations.</li>
            <li>Submit false, misleading, or spam content through our forms.</li>
            <li>Attempt to interfere with the Website's operation, security, or availability.</li>
            <li>Scrape, copy, or reproduce the Website's content without written permission.</li>
          </List>

          <SectionTitle>4. Intellectual Property</SectionTitle>
          <Paragraph>
            All content on this Website — including text, design, graphics, logos, calculator logic, and audit methodology — is the property of Peak Work Studios and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works from our content without prior written consent.
          </Paragraph>

          <SectionTitle>5. Privacy</SectionTitle>
          <Paragraph>
            Your use of the Website is also governed by our <InlineLink to="/privacy">Privacy Policy</InlineLink>, which describes how we collect, use, and protect your information.
          </Paragraph>

          <SectionTitle>6. Consulting Services</SectionTitle>
          <Paragraph>
            Any consulting services provided by Peak Work Studios are subject to a separate agreement between you and Peak Work Studios. These Terms govern only your use of the Website and its free tools.
          </Paragraph>

          <SectionTitle>7. Disclaimer of Warranties</SectionTitle>
          <Paragraph>
            The Website and its tools are provided "as is" and "as available" without warranties of any kind, either express or implied. We do not warrant that the Website will be uninterrupted, error-free, or free of harmful components. We make no representations about the accuracy or completeness of calculator or audit results.
          </Paragraph>

          <SectionTitle>8. Limitation of Liability</SectionTitle>
          <Paragraph>
            To the fullest extent permitted by law, Peak Work Studios shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the Website, its tools, or any decisions made based on information provided on the Website.
          </Paragraph>

          <SectionTitle>9. Changes to These Terms</SectionTitle>
          <Paragraph>
            We may update these Terms from time to time. Changes will be posted on this page with an updated effective date. Your continued use of the Website after changes are posted constitutes acceptance of the updated Terms.
          </Paragraph>

          <SectionTitle>10. Governing Law</SectionTitle>
          <Paragraph>
            These Terms are governed by and construed in accordance with the laws of the Province of Alberta, Canada. Any disputes arising from these Terms or your use of the Website shall be subject to the exclusive jurisdiction of the courts of Alberta, Canada.
          </Paragraph>

          <SectionTitle>11. Contact Us</SectionTitle>
          <Paragraph>
            If you have questions about these Terms, contact us at{' '}
            <ExternalLink href="mailto:audit@peakworkstudios.com">audit@peakworkstudios.com</ExternalLink>.
          </Paragraph>
          <Paragraph style={{ marginTop: '8px' }}>
            Peak Work Studios<br />
            Calgary, Alberta, Canada
          </Paragraph>

          <Paragraph style={{ marginTop: '48px', fontSize: '14px', borderTop: `1px solid`, borderColor: 'inherit', paddingTop: '24px' }}>
            <InlineLink to="/privacy">Privacy Policy</InlineLink> &middot;{' '}
            <InlineLink to="/">Back to Home</InlineLink>
          </Paragraph>
        </FadeIn>
      </Section>
    </PageWrapper>
  );
};

export default TermsPage;
