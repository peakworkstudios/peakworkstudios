import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Blog configuration - easy to update links and content
const BLOG_URL = 'https://blog.kunaldeshmukh.com';

const blogPosts = [
  {
    id: 1,
    title: 'Designing workflows that survive handoffs',
    blurb: 'Why reliable automation starts with clarity, not tools.',
    url: `${BLOG_URL}/designing-workflows-that-survive-handoffs`
  },
  {
    id: 2,
    title: 'A practical approach to AI-assisted ops',
    blurb: 'Reduce busywork without creating fragile systems.',
    url: `${BLOG_URL}/practical-approach-to-ai-assisted-ops`
  },
  {
    id: 3,
    title: 'Automation audit checklist for SMEs',
    blurb: 'A lightweight review to spot high-leverage fixes.',
    url: `${BLOG_URL}/automation-audit-checklist-for-smes`
  },
  {
    id: 4,
    title: 'Keeping reporting trustworthy',
    blurb: 'Small changes that prevent KPI drift and rework.',
    url: `${BLOG_URL}/keeping-reporting-trustworthy`
  },
  {
    id: 5,
    title: 'From intake to delivery: stabilizing ops',
    blurb: 'What breaks most often and how to fix it.',
    url: `${BLOG_URL}/from-intake-to-delivery-stabilizing-ops`
  },
  {
    id: 6,
    title: 'AI tools are not a system',
    blurb: 'Treat automation as infrastructure, not a shortcut.',
    url: `${BLOG_URL}/ai-tools-are-not-a-system`
  }
];

const Writing = ({ currentTheme, Section, FeatureCard, CallToActionButton }) => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Writing | Kunal Deshmukh';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Practical guidance on reliable automation, workflow design, and maintainable systems for small and mid-sized teams.');
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Section minHeight="auto" style={{ paddingTop: '120px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ marginBottom: '30px' }}>
            <button 
              onClick={() => navigate('/')}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: currentTheme.primary, 
                fontSize: '16px', 
                cursor: 'pointer',
                padding: '0',
                marginBottom: '20px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              ← Back to home
            </button>
            <h1 style={{ fontSize: '56px', fontWeight: '700', color: currentTheme.text, marginBottom: '20px', lineHeight: '1.1' }}>
              Writing
            </h1>
            <p style={{ fontSize: '22px', color: currentTheme.textSecondary, lineHeight: '1.6', marginBottom: '15px' }}>
              Practical guidance on reliable automation, workflow design, and maintainable systems.
            </p>
            <p style={{ fontSize: '17px', color: currentTheme.textSecondary, marginBottom: '40px' }}>
              What you'll get: No fluff—just actionable patterns for reducing manual work, preventing handoff failures, and keeping systems running.
            </p>
            <CallToActionButton 
              as="a"
              href={BLOG_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginBottom: '20px' }}
            >
              Read the blog
            </CallToActionButton>
            <div style={{ fontSize: '14px', color: currentTheme.textSecondary, fontStyle: 'italic', marginTop: '15px' }}>
              Public-safe examples only.
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '30px', 
            marginTop: '60px',
            textAlign: 'left'
          }}>
            {blogPosts.map(post => (
              <FeatureCard
                key={post.id}
                as="a"
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ 
                  cursor: 'pointer', 
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <h3 style={{ 
                  fontSize: '22px', 
                  color: currentTheme.text, 
                  marginTop: '0', 
                  marginBottom: '15px',
                  lineHeight: '1.3'
                }}>
                  {post.title}
                </h3>
                <p style={{ 
                  fontSize: '16px', 
                  color: currentTheme.textSecondary, 
                  lineHeight: '1.6',
                  marginBottom: '20px',
                  flex: 1
                }}>
                  {post.blurb}
                </p>
                <div style={{ 
                  color: currentTheme.primary, 
                  fontWeight: '600', 
                  fontSize: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  Read article
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </FeatureCard>
            ))}
          </div>

          {/* Bottom CTA */}
          <div style={{ 
            marginTop: '80px', 
            padding: '50px 40px', 
            backgroundColor: currentTheme.surface, 
            borderRadius: currentTheme.borderRadius,
            textAlign: 'center'
          }}>
            <h2 style={{ fontSize: '32px', color: currentTheme.text, marginTop: '0', marginBottom: '20px' }}>
              Want more?
            </h2>
            <p style={{ fontSize: '18px', color: currentTheme.textSecondary, marginBottom: '30px', maxWidth: '600px', margin: '0 auto 30px' }}>
              Visit the full blog for deeper dives into workflow automation, ops patterns, and maintainable systems.
            </p>
            <CallToActionButton 
              as="a"
              href={BLOG_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit blog.kunaldeshmukh.com
            </CallToActionButton>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Writing;
