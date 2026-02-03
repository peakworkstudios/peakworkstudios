import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import styled, { createGlobalStyle, keyframes, ThemeProvider } from 'styled-components';
import AutomationAuditReport from './pages/AutomationAuditReport';
import AIMeetingToAction from './pages/AIMeetingToAction';
import OpsReportingPack from './pages/OpsReportingPack';
import Writing from './pages/Writing';

// Define your light theme
const lightTheme = {
  primary: '#38bdf8', // Blue/Teal accent
  secondary: '#9E7FFF', // Secondary accent
  accent: '#f472b6', // Tertiary accent
  background: '#FFFFFF', // White background
  surface: '#F8F8F8', // Light grey for cards/sections
  text: '#1A1A1A', // Dark grey/black for main text
  textSecondary: '#6B7280', // Medium grey for secondary text
  border: '#E5E7EB', // Light grey for borders
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  borderRadius: '12px',
};

// Define your dark theme based on the provided palette
const darkTheme = {
  primary: '#38bdf8', // Keeping primary consistent for accent
  secondary: '#9E7FFF', // Keeping secondary consistent
  accent: '#f472b6', // Keeping accent consistent
  background: '#171717',
  surface: '#262626',
  text: '#FFFFFF',
  textSecondary: '#A3A3A3',
  border: '#2F2F2F',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  borderRadius: '12px',
};

// Global Styles for smooth scrolling and base typography
const GlobalStyle = createGlobalStyle`
  html {
    scroll-behavior: smooth;
  }
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: ${props => props.theme.fontFamily};
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.text};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.6;
    transition: background-color 0.3s ease, color 0.3s ease; /* Smooth transition for theme change */
  }

  *, *::before, *::after {
    box-sizing: inherit;
  }
`;

// Keyframes for subtle fade-in animation
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled Components
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
  transition: background-color 0.3s ease, color 0.3s ease;
`;

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: ${props => props.theme.background === '#FFFFFF' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(23, 23, 23, 0.9)'}; /* Dynamic transparency */
  backdrop-filter: blur(10px);
  padding: 15px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05); /* Subtle shadow */
  transition: background-color 0.3s ease;

  @media (max-width: 768px) {
    padding: 15px 20px;
  }
`;

const Logo = styled.div`
  font-size: 28px;
  color: ${props => props.theme.text};
  margin: 0;
  font-weight: 700;
  letter-spacing: -0.8px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: ${props => props.theme.primary};
  }

  @media (max-width: 768px) {
    font-size: 24px;
  }

  @media (max-width: 480px) { /* New: Smaller font for very small screens */
    font-size: 20px;
    letter-spacing: -0.5px;
  }
`;

const LogoSVG = styled.svg`
  width: 32px;
  height: 32px;
  margin-right: 10px;
  color: ${props => props.theme.primary};
  transition: transform 0.3s ease;

  ${Logo}:hover & {
    transform: rotate(5deg) scale(1.05);
  }

  @media (max-width: 768px) {
    width: 28px;
    height: 28px;
    margin-right: 8px;
  }

  @media (max-width: 480px) { /* New: Smaller SVG for very small screens */
    width: 24px;
    height: 24px;
    margin-right: 6px;
  }
`;

const DesktopNavLinks = styled.nav`
  display: flex;
  gap: 30px;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: ${props => props.theme.textSecondary};
  text-decoration: none;
  font-size: 17px;
  font-weight: 500;
  position: relative;
  transition: color 0.3s ease;
  cursor: pointer;
  padding: 5px 0;

  &:hover {
    color: ${props => props.theme.primary};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: ${props => props.theme.primary};
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const MobileNavLinks = styled.div`
  display: ${props => props.isOpen ? 'flex' : 'none'};
  flex-direction: column;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: ${props => props.theme.background};
  backdrop-filter: blur(10px);
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  z-index: 999;
  border-radius: 0 0 12px 12px;

  ${NavLink} {
    margin-bottom: 15px;
    padding: 10px 0;
    border-bottom: 1px solid ${props => props.theme.border};

    &:last-child {
      border-bottom: none;
      margin-bottom: 0;
    }
  }
`;

const CallToActionButton = styled.a`
  background-color: ${props => props.theme.primary};
  color: ${props => props.theme.background};
  padding: 12px 25px;
  border: none;
  border-radius: ${props => props.theme.borderRadius};
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 6px 15px rgba(56, 189, 248, 0.3);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #2fa8e0;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(56, 189, 248, 0.4);
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 14px;
  }
`;

const HeaderCTAButton = styled(CallToActionButton)`
  padding: 10px 20px;
  font-size: 15px;

  @media (max-width: 768px) {
    padding: 8px 15px;
    font-size: 13px;
  }

  @media (max-width: 480px) { /* New: Hide CTA button on very small screens */
    display: none;
  }
`;

const RightHeaderGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    gap: 15px;
  }
`;

const HamburgerIcon = styled.div`
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 24px;
  cursor: pointer;
  padding: 2px 0;
  z-index: 1001;

  div {
    width: 100%;
    height: 3px;
    background-color: ${props => props.theme.text};
    border-radius: 2px;
    transition: all 0.3s ease;
    transform-origin: center;

    &:nth-child(1) {
      transform: ${props => props.isOpen ? 'rotate(45deg) translate(6px, 6px)' : 'rotate(0)'};
    }

    &:nth-child(2) {
      opacity: ${props => props.isOpen ? '0' : '1'};
    }

    &:nth-child(3) {
      transform: ${props => props.isOpen ? 'rotate(-45deg) translate(6px, -6px)' : 'rotate(0)'};
    }
  }

  &:hover div {
    background-color: ${props => props.theme.primary};
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

const ThemeToggleButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.textSecondary};
  cursor: pointer;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 50%;
  transition: color 0.3s ease, background-color 0.3s ease;

  &:hover {
    color: ${props => props.theme.primary};
    background-color: ${props => props.theme.surface};
  }

  svg {
    width: 24px;
    height: 24px;
  }

  @media (max-width: 768px) {
    font-size: 20px;
    padding: 6px;
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const SunIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
);

const MoonIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
);


const Section = styled.section`
  width: 100%;
  max-width: 1200px;
  padding: 100px 40px;
  margin-top: ${props => props.isFirst ? '80px' : '0'};
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: ${props => props.minHeight || 'auto'};
  background-color: ${props => props.bgColor || props.theme.background};
  border-radius: ${props => props.theme.borderRadius};
  margin-bottom: 40px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.03);
  animation: ${fadeIn} 0.8s ease-out forwards;
  animation-delay: ${props => props.delay || '0s'};
  opacity: 0;
  transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;

  &:last-of-type {
    margin-bottom: 0;
  }

  h2 {
    font-size: 48px;
    font-weight: 700;
    color: ${props => props.theme.text};
    margin-bottom: 20px;
    letter-spacing: -1px;
    transition: color 0.3s ease;
  }

  p {
    font-size: 19px;
    line-height: 1.6;
    color: ${props => props.theme.textSecondary};
    max-width: 800px;
    margin-bottom: 30px;
    transition: color 0.3s ease;
  }

  @media (max-width: 768px) {
    padding: 80px 20px;
    h2 {
      font-size: 36px;
    }
    p {
      font-size: 17px;
    }
  }
`;

const HeroSection = styled(Section)`
  min-height: 100vh;
  background: linear-gradient(135deg, ${props => props.theme.background} 0%, ${props => props.theme.surface} 100%);
  position: relative;
  overflow: hidden;
  padding: 80px 40px;
  margin-top: 0;
  border-radius: 0;
  box-shadow: none;
  transition: background 0.3s ease;

  h2 {
    font-size: 72px;
    max-width: 900px;
    line-height: 1.1;
    z-index: 2;
    position: relative;
    animation: ${fadeIn} 1s ease-out forwards;
    animation-delay: 0.2s;
    color: ${props => props.theme.text};
  }

  p {
    font-size: 24px;
    max-width: 700px;
    z-index: 2;
    position: relative;
    animation: ${fadeIn} 1s ease-out forwards;
    animation-delay: 0.4s;
    color: ${props => props.theme.textSecondary};
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 48px;
    }
    p {
      font-size: 20px;
    }
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 50px;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const FeatureCard = styled.div`
  background-color: ${props => props.theme.background};
  padding: 30px;
  border-radius: ${props => props.theme.borderRadius};
  text-align: left;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;
  border: 1px solid ${props => props.theme.border};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }

  h3 {
    font-size: 24px;
    color: ${props => props.theme.primary};
    margin-bottom: 15px;
    transition: color 0.3s ease;
  }

  p {
    font-size: 16px;
    color: ${props => props.theme.textSecondary};
    line-height: 1.5;
    margin-bottom: 0;
    transition: color 0.3s ease;
  }

  @media (max-width: 768px) {
    padding: 25px;
    h3 {
      font-size: 20px;
    }
    p {
      font-size: 15px;
    }
  }
`;

const ContactButtonContainer = styled.div`
  margin-top: 30px;
`;

const BuilderBadge = styled.div`
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    gap: 15px;
    margin-bottom: 30px;
  }
`;

const BuilderAvatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${props => props.theme.surface};
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid ${props => props.theme.border};
  flex-shrink: 0;

  @media (max-width: 480px) {
    width: 50px;
    height: 50px;

    svg {
      width: 28px;
      height: 28px;
    }
  }
`;

const BuilderInfo = styled.div`
  text-align: left;
  font-size: 15px;
  line-height: 1.5;
  color: ${props => props.theme.textSecondary};

  @media (max-width: 480px) {
    font-size: 14px;
    text-align: center;
  }
`;

const BuilderName = styled.div`
  font-weight: 600;
  color: ${props => props.theme.text};
`;

const CTAGroup = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 40px;
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 15px;
    margin-top: 30px;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    width: 100%;
    max-width: 350px;
    margin-left: auto;
    margin-right: auto;

    button, a {
      width: 100%;
    }
  }
`;

// ContactForm Component
const ContactForm = ({ theme, page, source }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    website: '' // honeypot
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const CALENDLY_URL = 'https://calendly.com/peakworkstudios/30min';
  const CONTACT_ENDPOINT = 'https://contact-c5cvmgvaja-uc.a.run.app/api/contact';
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (e) => {
    if (error) {
      setError('');
    }
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Honeypot check - if filled, it's a bot
    if (formData.website) {
      return;
    }

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all required fields.');
      return;
    }

    if (!EMAIL_REGEX.test(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    const trimmedMessage = formData.message.trim();
    if (trimmedMessage.length < 10 || trimmedMessage.length > 4000) {
      setError('Message must be between 10 and 4000 characters.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Send to Firebase Cloud Function
      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          message: formData.message,
          source,
          page,
          website: formData.website
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setIsSuccess(true);
      setFormData({ name: '', email: '', company: '', message: '', website: '' });
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Something went wrong. Please email hello@kunaldeshmukh.com.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '50px 30px', backgroundColor: theme.surface, borderRadius: theme.borderRadius, border: `2px solid ${theme.success}`, textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '20px' }}>✓</div>
        <h3 style={{ fontSize: '24px', color: theme.text, marginBottom: '15px', marginTop: '0' }}>Thanks for reaching out!</h3>
        <p style={{ fontSize: '17px', color: theme.textSecondary, marginBottom: '30px' }}>Thanks — I got your note. I’ll reply within 1–2 business days.</p>
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setIsSuccess(false)}
            style={{ 
              padding: '12px 24px', 
              fontSize: '16px', 
              backgroundColor: 'transparent', 
              color: theme.primary, 
              border: `2px solid ${theme.primary}`, 
              borderRadius: theme.borderRadius, 
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}
          >
            Send another message
          </button>
          <a 
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              padding: '12px 24px', 
              fontSize: '16px', 
              backgroundColor: theme.primary, 
              color: theme.background, 
              border: 'none', 
              borderRadius: theme.borderRadius, 
              cursor: 'pointer',
              fontWeight: '600',
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'all 0.3s ease'
            }}
          >
            Prefer to book time instead?
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto', width: '100%', textAlign: 'left' }}>
      {/* Honeypot field - hidden from users */}
      <input 
        type="text" 
        name="website" 
        value={formData.website}
        onChange={handleChange}
        style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px' }}
        tabIndex="-1"
        autoComplete="off"
      />

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', fontSize: '15px', fontWeight: '600', color: theme.text, marginBottom: '8px' }}>
          Name *
        </label>
        <input 
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your name"
          required
          autoComplete="name"
          style={{
            width: '100%',
            padding: '14px 16px',
            fontSize: '16px',
            border: `1px solid ${theme.border}`,
            borderRadius: theme.borderRadius,
            backgroundColor: theme.background,
            color: theme.text,
            outline: 'none',
            transition: 'all 0.3s ease',
            fontFamily: theme.fontFamily
          }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', fontSize: '15px', fontWeight: '600', color: theme.text, marginBottom: '8px' }}>
          Email *
        </label>
        <input 
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your@email.com"
          required
          autoComplete="email"
          inputMode="email"
          style={{
            width: '100%',
            padding: '14px 16px',
            fontSize: '16px',
            border: `1px solid ${theme.border}`,
            borderRadius: theme.borderRadius,
            backgroundColor: theme.background,
            color: theme.text,
            outline: 'none',
            transition: 'all 0.3s ease',
            fontFamily: theme.fontFamily
          }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', fontSize: '15px', fontWeight: '600', color: theme.text, marginBottom: '8px' }}>
          Company (optional)
        </label>
        <input 
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Your company name"
          autoComplete="organization"
          style={{
            width: '100%',
            padding: '14px 16px',
            fontSize: '16px',
            border: `1px solid ${theme.border}`,
            borderRadius: theme.borderRadius,
            backgroundColor: theme.background,
            color: theme.text,
            outline: 'none',
            transition: 'all 0.3s ease',
            fontFamily: theme.fontFamily
          }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', fontSize: '15px', fontWeight: '600', color: theme.text, marginBottom: '8px' }}>
          What's the manual work you hate most? *
        </label>
        <textarea 
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="e.g., 'We spend 10 hours/week manually copying data between systems' or 'Customer follow-ups keep falling through the cracks'"
          required
          rows="5"
          autoComplete="off"
          maxLength={4000}
          style={{
            width: '100%',
            padding: '14px 16px',
            fontSize: '16px',
            border: `1px solid ${theme.border}`,
            borderRadius: theme.borderRadius,
            backgroundColor: theme.background,
            color: theme.text,
            outline: 'none',
            transition: 'all 0.3s ease',
            fontFamily: theme.fontFamily,
            resize: 'vertical'
          }}
        />
      </div>

      {error && (
        <div style={{ 
          padding: '12px 16px', 
          backgroundColor: 'rgba(239, 68, 68, 0.1)', 
          color: theme.error, 
          borderRadius: theme.borderRadius,
          marginBottom: '20px',
          fontSize: '15px',
          border: `1px solid ${theme.error}`
        }}>
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        style={{
          width: '100%',
          padding: '16px 24px',
          fontSize: '17px',
          fontWeight: '600',
          backgroundColor: isSubmitting ? theme.textSecondary : theme.primary,
          color: theme.background,
          border: 'none',
          borderRadius: theme.borderRadius,
          cursor: isSubmitting ? 'not-allowed' : 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: isSubmitting ? 'none' : '0 6px 15px rgba(56, 189, 248, 0.3)'
        }}
      >
        {isSubmitting ? 'Submitting...' : 'Send my inquiry'}
      </button>
    </form>
  );
};

const Footer = styled.footer`
  width: 100%;
  background-color: ${props => props.theme.surface};
  color: ${props => props.theme.textSecondary};
  text-align: center;
  padding: 40px 20px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.02);
  font-size: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;

  a {
    color: ${props => props.theme.textSecondary};
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: ${props => props.theme.primary};
    }
  }
`;

const CookieNotice = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${props => props.theme.surface};
  border-top: 1px solid ${props => props.theme.border};
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  font-size: 14px;
  color: ${props => props.theme.textSecondary};
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1);
  z-index: 999;
  animation: slideUp 0.3s ease-out;

  @keyframes slideUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }

  p {
    margin: 0;
    flex: 1;
  }

  button {
    padding: 10px 20px;
    background-color: ${props => props.theme.primary};
    color: ${props => props.theme.background};
    border: none;
    border-radius: ${props => props.theme.borderRadius};
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    flex-shrink: 0;

    &:hover {
      box-shadow: 0 4px 12px rgba(56, 189, 248, 0.3);
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 16px 20px;

    button {
      width: 100%;
    }
  }
`;

// App Component
function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('isDarkMode');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  const [cookieAccepted, setCookieAccepted] = useState(() => {
    const savedCookie = localStorage.getItem('cookieAccepted');
    return savedCookie ? JSON.parse(savedCookie) : false;
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  useEffect(() => {
    // Handle hash navigation for same-page links
    if (location.hash) {
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else if (location.pathname === '/') {
      window.scrollTo(0, 0);
    }
  }, [location]);

  const currentTheme = isDarkMode ? darkTheme : lightTheme;

  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const workRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToSection = (ref) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      ref.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isDetailPage = location.pathname.startsWith('/work/');

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyle />
      <AppContainer>
        <Header>
          <Logo onClick={() => navigate('/')}>
            <LogoSVG viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 4L28 16H4L16 4Z" fill="currentColor"/>
              <path d="M16 12L24 20H8L16 12Z" fill="currentColor" opacity="0.6"/>
            </LogoSVG>
            <span>Kunal Deshmukh</span>
          </Logo>

          <DesktopNavLinks>
            <NavLink onClick={() => navigate('/')}>Home</NavLink>
            <NavLink onClick={() => { navigate('/'); setTimeout(() => scrollToSection(workRef), 100); }}>Work</NavLink>
            <NavLink onClick={() => navigate('/writing')}>Writing</NavLink>
            <NavLink onClick={() => { navigate('/'); setTimeout(() => scrollToSection(aboutRef), 100); }}>About</NavLink>
            <NavLink onClick={() => { navigate('/'); setTimeout(() => scrollToSection(contactRef), 100); }}>Contact</NavLink>
          </DesktopNavLinks>

          <RightHeaderGroup>
            <ThemeToggleButton onClick={() => setIsDarkMode(!isDarkMode)}>
              {isDarkMode ? <SunIcon /> : <MoonIcon />}
            </ThemeToggleButton>
            <HeaderCTAButton onClick={() => { navigate('/'); setTimeout(() => scrollToSection(contactRef), 100); }}>Get your plan</HeaderCTAButton>
            <HamburgerIcon isOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <div />
              <div />
              <div />
            </HamburgerIcon>
          </RightHeaderGroup>

          <MobileNavLinks isOpen={isMobileMenuOpen}>
            <NavLink onClick={() => { navigate('/'); setIsMobileMenuOpen(false); }}>Home</NavLink>
            <NavLink onClick={() => { navigate('/'); setTimeout(() => scrollToSection(workRef), 100); setIsMobileMenuOpen(false); }}>Work</NavLink>
            <NavLink onClick={() => { navigate('/writing'); setIsMobileMenuOpen(false); }}>Writing</NavLink>
            <NavLink onClick={() => { navigate('/'); setTimeout(() => scrollToSection(aboutRef), 100); setIsMobileMenuOpen(false); }}>About</NavLink>
            <NavLink onClick={() => { navigate('/'); setTimeout(() => scrollToSection(contactRef), 100); setIsMobileMenuOpen(false); }}>Contact</NavLink>
          </MobileNavLinks>
        </Header>

        <Routes>
          <Route path="/" element={
            <>
              <HeroSection id="home" ref={heroRef} minHeight="100vh">
                <h2>Stop losing work to manual processes and dropped handoffs.</h2>
                <p>Get reliable automation that reduces busywork, catches follow-ups, and gives you accurate reporting—without the complexity.</p>
                <CTAGroup>
                  <CallToActionButton onClick={() => scrollToSection(contactRef)}>Get a 1-page automation plan</CallToActionButton>
                  <CallToActionButton style={{ backgroundColor: 'transparent', color: currentTheme.primary, border: `2px solid ${currentTheme.primary}`, boxShadow: 'none' }} onClick={() => scrollToSection(workRef)}>See sample deliverables</CallToActionButton>
                </CTAGroup>
              </HeroSection>

              <Section id="services" ref={servicesRef} bgColor={currentTheme.surface} delay="0.2s">
                <h2>How this works</h2>
                <div style={{ maxWidth: '700px', margin: '0 auto 50px', padding: '30px', backgroundColor: currentTheme.background, borderRadius: currentTheme.borderRadius, border: `1px solid ${currentTheme.border}`, textAlign: 'left' }}>
                  <h3 style={{ fontSize: '22px', color: currentTheme.primary, marginTop: '0', marginBottom: '20px' }}>Proof of approach</h3>
                  <ul style={{ fontSize: '17px', lineHeight: '1.8', color: currentTheme.textSecondary, paddingLeft: '20px', margin: '0' }}>
                    <li>Maintainable — Your team can understand and modify it</li>
                    <li>Secure — Basic auth, input validation, and audit trails from day one</li>
                    <li>Cost-aware — No hidden scaling costs or vendor lock-in surprises</li>
                    <li>1-page plan before build — Know what you're getting before we start</li>
                  </ul>
                </div>
                <FeaturesGrid>
                  <FeatureCard>
                    <h3>Manual work reduction</h3>
                    <p>Eliminate repetitive data entry, copy-paste workflows, and status update busywork. Free up 5-15 hours per week per person.</p>
                  </FeatureCard>
                  <FeatureCard>
                    <h3>Handoff automation</h3>
                    <p>Stop losing work between tools, teams, or departments. Automatic routing, notifications, and status tracking.</p>
                  </FeatureCard>
                  <FeatureCard>
                    <h3>Reliable reporting</h3>
                    <p>Get accurate, on-demand reports without spreadsheet gymnastics. Real-time dashboards that actually match your data.</p>
                  </FeatureCard>
                </FeaturesGrid>
              </Section>

              <Section id="work" ref={workRef} delay="0.3s">
                <h2>Public-safe deliverables and templates</h2>
                <p>Examples of what you receive—no client names, just the approach and structure.</p>
                <FeaturesGrid>
                  <FeatureCard 
                    onClick={() => navigate('/work/automation-audit-report')}
                    style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                      <h3 style={{ margin: 0 }}>Automation Audit Report</h3>
                      <span style={{ fontSize: '12px', padding: '4px 10px', backgroundColor: currentTheme.surface, borderRadius: '6px', color: currentTheme.primary, fontWeight: '600' }}>Template</span>
                    </div>
                    <p style={{ marginBottom: '15px' }}>One-page diagnostic showing top opportunities, impact estimates, and phased rollout plan.</p>
                    <ul style={{ fontSize: '15px', lineHeight: '1.7', color: currentTheme.textSecondary, paddingLeft: '20px', margin: '0 0 15px 0', textAlign: 'left' }}>
                      <li>Top 3 opportunities ranked by effort vs impact</li>
                      <li>Phased rollout: quick wins → core workflow → reliability</li>
                      <li>Risks + guardrails to prevent breakage</li>
                    </ul>
                    <div style={{ color: currentTheme.primary, fontWeight: '600', fontSize: '15px', marginTop: 'auto' }}>
                      View sample report →
                    </div>
                  </FeatureCard>
                  <FeatureCard 
                    onClick={() => navigate('/work/ai-meeting-to-action')}
                    style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                      <h3 style={{ margin: 0 }}>AI Meeting-to-Action System</h3>
                      <span style={{ fontSize: '12px', padding: '4px 10px', backgroundColor: currentTheme.surface, borderRadius: '6px', color: currentTheme.primary, fontWeight: '600' }}>System</span>
                    </div>
                    <p style={{ marginBottom: '15px' }}>Turn notes into decisions, action items, owners, and risks—ready for Jira or Confluence.</p>
                    <ul style={{ fontSize: '15px', lineHeight: '1.7', color: currentTheme.textSecondary, paddingLeft: '20px', margin: '0 0 15px 0', textAlign: 'left' }}>
                      <li>Extracts decisions, actions, owners, and due dates</li>
                      <li>Flags risks, blockers, and follow-up questions</li>
                      <li>Privacy-scoped: no sensitive data required</li>
                    </ul>
                    <div style={{ color: currentTheme.primary, fontWeight: '600', fontSize: '15px', marginTop: 'auto' }}>
                      View system details →
                    </div>
                  </FeatureCard>
                  <FeatureCard 
                    onClick={() => navigate('/work/ops-reporting-pack')}
                    style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                      <h3 style={{ margin: 0 }}>Ops Reporting Pack</h3>
                      <span style={{ fontSize: '12px', padding: '4px 10px', backgroundColor: currentTheme.surface, borderRadius: '6px', color: currentTheme.primary, fontWeight: '600' }}>Pack</span>
                    </div>
                    <p style={{ marginBottom: '15px' }}>Weekly status + KPI snapshot templates with simple, reliable collection process.</p>
                    <ul style={{ fontSize: '15px', lineHeight: '1.7', color: currentTheme.textSecondary, paddingLeft: '20px', margin: '0 0 15px 0', textAlign: 'left' }}>
                      <li>Weekly status template with consistent format</li>
                      <li>KPI snapshot with target vs actual tracking</li>
                      <li>Definitions sheet: what each metric means</li>
                    </ul>
                    <div style={{ color: currentTheme.primary, fontWeight: '600', fontSize: '15px', marginTop: 'auto' }}>
                      View templates →
                    </div>
                  </FeatureCard>
                </FeaturesGrid>
              </Section>

              <Section id="about" ref={aboutRef} bgColor={currentTheme.surface} delay="0.4s">
                <h2>About</h2>
                <p>Building automation that reduces manual work, prevents dropped handoffs, and creates systems your team can maintain.</p>
                
                <h3 style={{ fontSize: '28px', fontWeight: '700', color: currentTheme.text, marginTop: '60px', marginBottom: '30px' }}>What I Help With</h3>
                <FeaturesGrid>
                  <FeatureCard>
                    <h3>You're drowning in manual processes</h3>
                    <p>Your team spends hours on repetitive tasks that should be automated. I help identify and eliminate these bottlenecks with practical automation.</p>
                  </FeatureCard>
                  <FeatureCard>
                    <h3>Handoffs keep falling through the cracks</h3>
                    <p>Work gets lost between tools and teams. I design workflows that automatically route and track work through completion.</p>
                  </FeatureCard>
                  <FeatureCard>
                    <h3>Nobody knows how it works anymore</h3>
                    <p>Your systems have become black boxes. I build maintainable solutions with clear documentation and ownership.</p>
                  </FeatureCard>
                  <FeatureCard>
                    <h3>You need reliability, not just features</h3>
                    <p>Systems that break at 2am aren't helpful. I focus on stability, error handling, and basic observability from day one.</p>
                  </FeatureCard>
                </FeaturesGrid>

                <h3 style={{ fontSize: '28px', fontWeight: '700', color: currentTheme.text, marginTop: '60px', marginBottom: '30px' }}>How I Work</h3>
                <FeaturesGrid>
                  <FeatureCard>
                    <h3>Plan</h3>
                    <p>We start by mapping your current workflow and identifying specific pain points. No generic solutions—just targeted fixes that address your team's real needs.</p>
                  </FeatureCard>
                  <FeatureCard>
                    <h3>Build</h3>
                    <p>I build practical automation using proven tools and clear patterns. Everything is documented as we go, with attention to security, error handling, and edge cases.</p>
                  </FeatureCard>
                  <FeatureCard>
                    <h3>Observe</h3>
                    <p>After launch, I set up basic monitoring and logging so you can see what's working and catch issues early. Your team stays in control.</p>
                  </FeatureCard>
                </FeaturesGrid>

                <div style={{ marginTop: '60px', padding: '40px', backgroundColor: currentTheme.background, borderRadius: currentTheme.borderRadius, border: `1px solid ${currentTheme.border}`, maxWidth: '800px', textAlign: 'left' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '30px', flexWrap: 'wrap' }}>
                    <div style={{ width: '120px', height: '120px', borderRadius: '12px', backgroundColor: currentTheme.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: `2px solid ${currentTheme.border}` }}>
                      <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="30" cy="20" r="12" fill={currentTheme.textSecondary} opacity="0.3"/>
                        <path d="M10 50c0-11 9-20 20-20s20 9 20 20" stroke={currentTheme.textSecondary} strokeWidth="3" opacity="0.3" fill="none"/>
                      </svg>
                    </div>
                    <div style={{ flex: 1, minWidth: '250px' }}>
                      <h3 style={{ fontSize: '24px', color: currentTheme.primary, marginBottom: '15px', marginTop: '0' }}>About Kunal</h3>
                      <p style={{ fontSize: '17px', lineHeight: '1.7', color: currentTheme.textSecondary, marginBottom: '0' }}>
                        I'm Kunal Deshmukh, based in Calgary. I build practical automation systems for small and mid-sized teams—focused on reliability, clear ownership, and workflows your team can actually maintain.
                      </p>
                    </div>
                  </div>
                </div>
              </Section>

              <Section id="contact" ref={contactRef} delay="0.5s">
                <h2>Get a Workflow Automation Audit</h2>
                <div style={{ maxWidth: '650px', margin: '0 auto 40px', textAlign: 'left', padding: '30px', backgroundColor: currentTheme.surface, borderRadius: currentTheme.borderRadius, border: `1px solid ${currentTheme.border}` }}>
                  <h3 style={{ fontSize: '20px', color: currentTheme.text, marginTop: '0', marginBottom: '20px' }}>What to expect:</h3>
                  <ul style={{ fontSize: '17px', lineHeight: '1.8', color: currentTheme.textSecondary, paddingLeft: '20px', margin: '0', listStyle: 'none' }}>
                    <li style={{ marginBottom: '12px' }}>✓ 15-minute intake call</li>
                    <li style={{ marginBottom: '12px' }}>✓ You get a 1-page action plan (quick wins + phased rollout)</li>
                    <li style={{ marginBottom: '0' }}>✓ No pressure—if I'm not a fit, I'll say so</li>
                  </ul>
                </div>
                <ContactForm theme={currentTheme} page={location.pathname} source="kunaldeshmukh" />
              </Section>
            </>
          } />
          <Route path="/work/automation-audit-report" element={
            <AutomationAuditReport currentTheme={currentTheme} Section={Section} FeatureCard={FeatureCard} CallToActionButton={CallToActionButton} />
          } />
          <Route path="/work/ai-meeting-to-action" element={
            <AIMeetingToAction currentTheme={currentTheme} Section={Section} FeatureCard={FeatureCard} CallToActionButton={CallToActionButton} />
          } />
          <Route path="/work/ops-reporting-pack" element={
            <OpsReportingPack currentTheme={currentTheme} Section={Section} FeatureCard={FeatureCard} CallToActionButton={CallToActionButton} />
          } />
          <Route path="/writing" element={
            <Writing currentTheme={currentTheme} Section={Section} FeatureCard={FeatureCard} CallToActionButton={CallToActionButton} />
          } />
        </Routes>

        <Footer>
          <span>&copy; {new Date().getFullYear()} Kunal Deshmukh | Calgary, Canada</span>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
            <CallToActionButton onClick={() => { navigate('/'); setTimeout(() => scrollToSection(contactRef), 100); }}>Get your automation plan</CallToActionButton>
            <a href="https://www.linkedin.com/in/kunaldeshmukh" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </Footer>

        {!cookieAccepted && (
          <CookieNotice theme={currentTheme}>
            <p>We use cookies to enhance your experience. By continuing, you accept our use of cookies.</p>
            <button onClick={() => {
              setCookieAccepted(true);
              localStorage.setItem('cookieAccepted', JSON.stringify(true));
            }}>
              Accept
            </button>
          </CookieNotice>
        )}
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
