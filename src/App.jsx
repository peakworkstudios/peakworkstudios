import React, { useState, useEffect, useRef } from 'react';
import styled, { createGlobalStyle, keyframes, ThemeProvider } from 'styled-components';

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
  padding-top: 0;
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

// App Component
function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('isDarkMode');
    return savedTheme ? JSON.parse(savedTheme) : false; // Default to light mode
  });

  useEffect(() => {
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const currentTheme = isDarkMode ? darkTheme : lightTheme;

  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <ThemeProvider theme={currentTheme}>
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

          <DesktopNavLinks>
            <NavLink onClick={() => scrollToSection(heroRef)}>Home</NavLink>
            <NavLink onClick={() => scrollToSection(servicesRef)}>Services</NavLink>
            <NavLink onClick={() => scrollToSection(aboutRef)}>About</NavLink>
            <NavLink onClick={() => scrollToSection(contactRef)}>Contact</NavLink>
          </DesktopNavLinks>

          <RightHeaderGroup>
            <ThemeToggleButton onClick={() => setIsDarkMode(!isDarkMode)}>
              {isDarkMode ? <SunIcon /> : <MoonIcon />}
            </ThemeToggleButton>
            <HeaderCTAButton href="https://calendly.com/peakworkstudios/30min" target="_blank" rel="noopener noreferrer">Book a Call</HeaderCTAButton>
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

        <Section id="services" ref={servicesRef} bgColor={currentTheme.surface} delay="0.2s">
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

        <Section id="about" ref={aboutRef} bgColor={currentTheme.surface} delay="0.4s">
          <h2>About Peak Work Studios</h2>
          <p>With 20 years in software & cloud, we bring real-world expertise to AI-powered business solutions. At Peak Work Studios, we are dedicated to crafting bespoke AI automation strategies that drive tangible results. Our approach is rooted in understanding your unique challenges and delivering solutions that are not just innovative, but also practical and scalable.</p>
        </Section>

        <Section id="contact" ref={contactRef} delay="0.6s">
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
    </ThemeProvider>
  );
}

export default App;
