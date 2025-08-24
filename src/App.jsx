import React, { useRef } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';

// Define your theme with the new minimalist, light palette
const theme = {
  primary: '#38bdf8', // Blue/Teal accent
  secondary: '#9E7FFF', // Secondary accent (if needed, otherwise can be removed)
  accent: '#f472b6', // Tertiary accent (if needed)
  background: '#FFFFFF', // White background
  surface: '#F8F8F8', // Light grey for cards/sections
  text: '#1A1A1A', // Dark grey/black for main text
  textSecondary: '#6B7280', // Medium grey for secondary text
  border: '#E5E7EB', // Light grey for borders
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  borderRadius: '12px', // Slightly smaller for a sleeker look
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
    font-family: ${theme.fontFamily};
    background-color: ${theme.background};
    color: ${theme.text};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.6;
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
  background-color: ${theme.background};
  color: ${theme.text};
`;

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.9); /* White with transparency */
  backdrop-filter: blur(10px);
  padding: 15px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05); /* Subtle shadow */

  @media (max-width: 768px) {
    padding: 15px 20px;
  }
`;

const Logo = styled.div`
  font-size: 28px;
  color: ${theme.text};
  margin: 0;
  font-weight: 700;
  letter-spacing: -0.8px;
  display: flex; /* Make it a flex container */
  align-items: center; /* Vertically align items */
  cursor: pointer; /* Indicate it's clickable */
  transition: color 0.3s ease;

  &:hover {
    color: ${theme.primary}; /* Change text color on hover */
  }

  @media (max-width: 768px) {
    font-size: 24px; /* Smaller for mobile */
  }
`;

const LogoSVG = styled.svg`
  width: 32px;
  height: 32px;
  margin-right: 10px;
  color: ${theme.primary}; /* Use primary color for the icon */
  transition: transform 0.3s ease;

  ${Logo}:hover & {
    transform: rotate(5deg) scale(1.05);
  }

  @media (max-width: 768px) {
    width: 28px;
    height: 28px;
    margin-right: 8px;
  }
`;

// Renamed from Nav to DesktopNavLinks to clarify its purpose
const DesktopNavLinks = styled.nav`
  display: flex;
  gap: 30px;
  align-items: center;

  @media (max-width: 768px) {
    display: none; /* Hide desktop nav links on mobile */
  }
`;

const NavLink = styled.a`
  color: ${theme.textSecondary};
  text-decoration: none;
  font-size: 17px;
  font-weight: 500;
  position: relative;
  transition: color 0.3s ease;
  cursor: pointer;
  padding: 5px 0;

  &:hover {
    color: ${theme.primary};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: ${theme.primary};
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const CallToActionButton = styled.a`
  background-color: ${theme.primary};
  color: ${theme.background}; /* Text color contrasts with primary */
  padding: 12px 25px;
  border: none;
  border-radius: ${theme.borderRadius};
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 6px 15px rgba(56, 189, 248, 0.3); /* Shadow based on primary color */
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #2fa8e0; /* Slightly darker primary */
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(56, 189, 248, 0.4);
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 14px;
  }
`;

const HeaderCTAButton = styled(CallToActionButton)`
  /* Removed margin-left here, spacing handled by RightHeaderGroup */
  padding: 10px 20px;
  font-size: 15px;

  @media (max-width: 768px) {
    padding: 8px 15px;
    font-size: 13px;
  }
`;

// New component to group CTA and Hamburger icon on the right
const RightHeaderGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 20px; /* Space between CTA and Hamburger */

  @media (max-width: 768px) {
    gap: 15px;
  }
`;

// New component for the 3-line hamburger icon
const HamburgerIcon = styled.div`
  display: none; /* Hidden by default on desktop */
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 24px;
  cursor: pointer;
  padding: 2px 0; /* Add some padding for better click area */
  z-index: 1001; /* Ensure it's above other elements if needed */

  div {
    width: 100%;
    height: 3px;
    background-color: ${theme.text};
    border-radius: 2px;
    transition: all 0.3s ease;
  }

  &:hover div {
    background-color: ${theme.primary};
  }

  @media (max-width: 768px) {
    display: flex; /* Show on mobile */
  }
`;

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
  background-color: ${props => props.bgColor || theme.background};
  border-radius: ${theme.borderRadius};
  margin-bottom: 40px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.03); /* Lighter shadow */
  animation: ${fadeIn} 0.8s ease-out forwards;
  animation-delay: ${props => props.delay || '0s'};
  opacity: 0;

  &:last-of-type {
    margin-bottom: 0;
  }

  h2 {
    font-size: 48px;
    font-weight: 700;
    color: ${theme.text};
    margin-bottom: 20px;
    letter-spacing: -1px;
  }

  p {
    font-size: 19px;
    line-height: 1.6;
    color: ${theme.textSecondary};
    max-width: 800px;
    margin-bottom: 30px;
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
  background: linear-gradient(135deg, ${theme.background} 0%, ${theme.surface} 100%);
  position: relative;
  overflow: hidden;
  padding-top: 0;
  margin-top: 0;
  border-radius: 0;
  box-shadow: none;

  h2 {
    font-size: 72px;
    max-width: 900px;
    line-height: 1.1;
    z-index: 2;
    position: relative;
    animation: ${fadeIn} 1s ease-out forwards;
    animation-delay: 0.2s;
    color: ${theme.text};
  }

  p {
    font-size: 24px;
    max-width: 700px;
    z-index: 2;
    position: relative;
    animation: ${fadeIn} 1s ease-out forwards;
    animation-delay: 0.4s;
    color: ${theme.textSecondary};
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
  background-color: ${theme.background};
  padding: 30px;
  border-radius: ${theme.borderRadius};
  text-align: left;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid ${theme.border};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }

  h3 {
    font-size: 24px;
    color: ${theme.primary};
    margin-bottom: 15px;
  }

  p {
    font-size: 16px;
    color: ${theme.textSecondary};
    line-height: 1.5;
    margin-bottom: 0;
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

const Footer = styled.footer`
  width: 100%;
  background-color: ${theme.surface};
  color: ${theme.textSecondary};
  text-align: center;
  padding: 30px 20px;
  border-top: 1px solid ${theme.border};
  font-size: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;

  a {
    color: ${theme.textSecondary};
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: ${theme.primary};
    }
  }
`;

// App Component
function App() {
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <Header>
          <Logo onClick={() => scrollToSection(heroRef)}>
            <LogoSVG viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 4L28 16H4L16 4Z" fill="currentColor"/>
              <path d="M16 12L24 20H8L16 12Z" fill="currentColor" opacity="0.6"/>
            </LogoSVG>
            <span>Peak Work Studios</span>
          </Logo>

          {/* Desktop Navigation Links - hidden on mobile */}
          <DesktopNavLinks>
            <NavLink onClick={() => scrollToSection(heroRef)}>Home</NavLink>
            <NavLink onClick={() => scrollToSection(servicesRef)}>Services</NavLink>
            <NavLink onClick={() => scrollToSection(aboutRef)}>About</NavLink>
            <NavLink onClick={() => scrollToSection(contactRef)}>Contact</NavLink>
          </DesktopNavLinks>

          {/* Group for CTA and Hamburger Icon */}
          <RightHeaderGroup>
            <HeaderCTAButton href="https://calendly.com/peakworkstudios/30min" target="_blank" rel="noopener noreferrer">Book a Call</HeaderCTAButton>
            {/* Hamburger Icon - visible only on mobile */}
            <HamburgerIcon>
              <div />
              <div />
              <div />
            </HamburgerIcon>
          </RightHeaderGroup>
        </Header>

        <HeroSection id="home" ref={heroRef} minHeight="100vh">
          <h2>AI Automation for Modern Businesses.</h2>
          <p>We help companies save time and scale with custom AI workflows and automations.</p>
          <CallToActionButton href="https://calendly.com/peakworkstudios/30min" target="_blank" rel="noopener noreferrer">Book a Free Strategy Call</CallToActionButton>
        </HeroSection>

        <Section id="services" ref={servicesRef} bgColor={theme.surface} delay="0.2s">
          <h2>Our Solutions for Peak Performance</h2>
          <p>Leverage the power of AI to transform your operations, enhance efficiency, and unlock new growth opportunities.</p>
          <FeaturesGrid>
            <FeatureCard>
              <h3>Workflow Automation</h3>
              <p>Automate repetitive tasks, streamline processes, and free up your team to focus on strategic initiatives.</p>
            </FeatureCard>
            <FeatureCard>
              <h3>AI Chatbots</h3>
              <p>Deploy intelligent chatbots for customer support, lead generation, and internal communication, available 24/7.</p>
            </FeatureCard>
            <FeatureCard>
              <h3>Reporting & Analytics</h3>
              <p>Gain deeper insights with AI-powered data analysis and automated reporting, turning data into actionable intelligence.</p>
            </FeatureCard>
          </FeaturesGrid>
        </Section>

        <Section id="about" ref={aboutRef} bgColor={theme.surface} delay="0.4s"> {/* Adjusted delay */}
          <h2>About Peak Work Studios</h2>
          <p>With 20 years in software & cloud, we bring real-world expertise to AI-powered business solutions. At Peak Work Studios, we are dedicated to crafting bespoke AI automation strategies that drive tangible results. Our approach is rooted in understanding your unique challenges and delivering solutions that are not just innovative, but also practical and scalable.</p>
        </Section>

        <Section id="contact" ref={contactRef} delay="0.6s"> {/* Adjusted delay */}
          <h2>Ready to Explore Your Automation Opportunities?</h2>
          <p>Let's connect to discuss how custom AI workflows can transform your business operations and accelerate your growth.</p>
          <ContactButtonContainer>
            <CallToActionButton href="https://calendly.com/peakworkstudios/30min" target="_blank" rel="noopener noreferrer">Book a Call</CallToActionButton>
          </ContactButtonContainer>
        </Section>

        <Footer>
          <span>&copy; 2025 Peak Work Studios | Calgary, Canada</span>
          <a href="https://www.linkedin.com/company/peak-work-studios" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </Footer>
      </AppContainer>
    </>
  );
}

export default App;
