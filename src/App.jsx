import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Link } from 'react-router-dom';
import styled, { createGlobalStyle, ThemeProvider, keyframes } from 'styled-components';
import { Sun, Moon, Menu, X, ChevronUp, Mountain } from 'lucide-react';
import HomePage from './pages/HomePage';
import UseCasesPage from './pages/UseCasesPage';
import CalculatorPage from './pages/CalculatorPage';
import AuditPage from './pages/AuditPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';

// ─── Themes ───
const lightTheme = {
  primary: '#38bdf8',
  primaryHover: '#0ea5e9',
  secondary: '#9E7FFF',
  accent: '#f472b6',
  background: '#FFFFFF',
  surface: '#F8F9FA',
  surfaceHover: '#F0F1F3',
  text: '#1A1A1A',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  cardShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
  cardHoverShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
  headerBg: 'rgba(255, 255, 255, 0.85)',
  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  borderRadius: '12px',
  borderRadiusSm: '8px',
  borderRadiusLg: '16px',
};

const darkTheme = {
  primary: '#38bdf8',
  primaryHover: '#7dd3fc',
  secondary: '#9E7FFF',
  accent: '#f472b6',
  background: '#0F0F0F',
  surface: '#1A1A1A',
  surfaceHover: '#262626',
  text: '#F5F5F5',
  textSecondary: '#A3A3A3',
  border: '#2A2A2A',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  cardShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
  cardHoverShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
  headerBg: 'rgba(15, 15, 15, 0.85)',
  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  borderRadius: '12px',
  borderRadiusSm: '8px',
  borderRadiusLg: '16px',
};

// ─── Global Styles ───
const GlobalStyle = createGlobalStyle`
  html {
    scroll-behavior: smooth;
  }
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: ${p => p.theme.fontFamily};
    background-color: ${p => p.theme.background};
    color: ${p => p.theme.text};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.6;
    transition: background-color 0.3s ease, color 0.3s ease;
  }
  *, *::before, *::after {
    box-sizing: border-box;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  img {
    max-width: 100%;
    height: auto;
  }
`;

// ─── Scroll to top on route change ───
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// ─── Header ───
const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: ${p => p.theme.headerBg};
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 0 40px;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  border-bottom: 1px solid ${p => p.theme.border};
  transition: background-color 0.3s ease;

  @media (max-width: 768px) {
    padding: 0 20px;
    height: 56px;
  }
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 700;
  color: ${p => p.theme.text};
  letter-spacing: -0.5px;
  transition: color 0.3s ease;
  text-decoration: none;

  &:hover { color: ${p => p.theme.primary}; }

  svg {
    color: ${p => p.theme.primary};
    transition: transform 0.3s ease;
  }
  &:hover svg { transform: rotate(5deg) scale(1.05); }

  @media (max-width: 480px) {
    font-size: 15px;
    gap: 8px;
    svg { width: 22px; height: 22px; }
  }
`;

const DesktopNav = styled.nav`
  display: flex;
  gap: 32px;
  align-items: center;
  @media (max-width: 768px) { display: none; }
`;

const NavLinkStyled = styled(Link)`
  color: ${p => p.theme.textSecondary};
  font-size: 15px;
  font-weight: 500;
  position: relative;
  padding: 4px 0;
  transition: color 0.2s ease;
  &:hover { color: ${p => p.theme.text}; }
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: ${p => p.theme.primary};
    transition: width 0.3s ease;
  }
  &:hover::after { width: 100%; }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: ${p => p.theme.textSecondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 50%;
  transition: color 0.2s ease, background-color 0.2s ease;
  &:hover {
    color: ${p => p.theme.primary};
    background-color: ${p => p.theme.surface};
  }
`;

const HeaderCTA = styled(Link)`
  background: ${p => p.theme.primary};
  color: #000;
  padding: 8px 20px;
  border-radius: ${p => p.theme.borderRadius};
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s ease;
  &:hover {
    background: ${p => p.theme.primaryHover};
    transform: translateY(-1px);
  }
  @media (max-width: 480px) { display: none; }
`;

const MobileMenuBtn = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${p => p.theme.text};
  cursor: pointer;
  padding: 4px;
  @media (max-width: 768px) { display: flex; align-items: center; }
`;

const MobileMenu = styled.div`
  display: ${p => p.$open ? 'flex' : 'none'};
  flex-direction: column;
  position: fixed;
  top: 56px;
  left: 0;
  width: 100%;
  background: ${p => p.theme.background};
  border-bottom: 1px solid ${p => p.theme.border};
  padding: 16px 20px;
  z-index: 999;
  gap: 4px;
`;

const MobileNavItem = styled(Link)`
  color: ${p => p.theme.text};
  font-size: 16px;
  font-weight: 500;
  padding: 12px 0;
  border-bottom: 1px solid ${p => p.theme.border};
  &:last-child { border-bottom: none; }
`;

// ─── Footer ───
const FooterWrapper = styled.footer`
  width: 100%;
  background: ${p => p.theme.surface};
  border-top: 1px solid ${p => p.theme.border};
  padding: 60px 40px 30px;
  transition: background-color 0.3s ease;

  @media (max-width: 768px) {
    padding: 40px 20px 24px;
  }
`;

const FooterGrid = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  gap: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 28px;
  }
`;

const FooterCol = styled.div`
  h4 {
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: ${p => p.theme.text};
    margin: 0 0 16px;
  }
  p, a {
    font-size: 14px;
    color: ${p => p.theme.textSecondary};
    line-height: 1.8;
    display: block;
    transition: color 0.2s ease;
  }
  a:hover { color: ${p => p.theme.primary}; }
`;

const FooterBottom = styled.div`
  max-width: 1100px;
  margin: 40px auto 0;
  padding-top: 20px;
  border-top: 1px solid ${p => p.theme.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: ${p => p.theme.textSecondary};

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
    text-align: center;
  }
`;

// ─── Back to top ───
const BackToTop = styled.button`
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: ${p => p.theme.primary};
  color: #000;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${p => p.$visible ? 1 : 0};
  pointer-events: ${p => p.$visible ? 'auto' : 'none'};
  transition: opacity 0.3s ease, transform 0.2s ease;
  z-index: 50;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  &:hover { transform: translateY(-2px); }
`;

// ─── Cookie ───
const slideUp = keyframes`
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
`;

const CookieBanner = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${p => p.theme.surface};
  border-top: 1px solid ${p => p.theme.border};
  padding: 16px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  font-size: 14px;
  color: ${p => p.theme.textSecondary};
  z-index: 999;
  animation: ${slideUp} 0.3s ease-out;

  button {
    padding: 8px 20px;
    background: ${p => p.theme.primary};
    color: #000;
    border: none;
    border-radius: ${p => p.theme.borderRadius};
    font-weight: 600;
    cursor: pointer;
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 16px 20px;
    button { width: 100%; }
  }
`;

// ─── App ───
function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('pws-dark-mode');
    if (saved !== null) return JSON.parse(saved);
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
  });

  const [cookieDismissed, setCookieDismissed] = useState(() => {
    return localStorage.getItem('pws-cookie-accepted') !== null;
  });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = isDarkMode ? darkTheme : lightTheme;

  useEffect(() => {
    localStorage.setItem('pws-dark-mode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ScrollToTop />

      <HeaderWrapper>
        <LogoLink to="/">
          <Mountain size={26} />
          <span>Peak Work Studios</span>
        </LogoLink>

        <DesktopNav>
          <NavLinkStyled to="/">Home</NavLinkStyled>
          <NavLinkStyled to="/use-cases">Use Cases</NavLinkStyled>
          <NavLinkStyled to="/calculator">Calculator</NavLinkStyled>
          <NavLinkStyled to="/audit">Audit</NavLinkStyled>
          <NavLinkStyled to="/about">About</NavLinkStyled>
          <NavLinkStyled to="/contact">Contact</NavLinkStyled>
        </DesktopNav>

        <HeaderRight>
          <ThemeToggle onClick={() => setIsDarkMode(!isDarkMode)} aria-label="Toggle dark mode">
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </ThemeToggle>
          <HeaderCTA to="/contact">Book a Discovery Call</HeaderCTA>
          <MobileMenuBtn onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </MobileMenuBtn>
        </HeaderRight>

        <MobileMenu $open={mobileMenuOpen}>
          <MobileNavItem to="/" onClick={closeMobile}>Home</MobileNavItem>
          <MobileNavItem to="/use-cases" onClick={closeMobile}>Use Cases</MobileNavItem>
          <MobileNavItem to="/calculator" onClick={closeMobile}>Calculator</MobileNavItem>
          <MobileNavItem to="/audit" onClick={closeMobile}>Audit</MobileNavItem>
          <MobileNavItem to="/about" onClick={closeMobile}>About</MobileNavItem>
          <MobileNavItem to="/contact" onClick={closeMobile}>Contact</MobileNavItem>
        </MobileMenu>
      </HeaderWrapper>

      <main style={{ paddingTop: '64px', minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/use-cases" element={<UseCasesPage />} />
          <Route path="/calculator" element={<CalculatorPage />} />
          <Route path="/audit" element={<AuditPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
        </Routes>
      </main>

      <FooterWrapper>
        <FooterGrid>
          <FooterCol>
            <h4>Peak Work Studios</h4>
            <p style={{ marginBottom: '8px' }}>AI &amp; Automation Consulting for professional service teams.</p>
            <p>Calgary, Canada</p>
          </FooterCol>
          <FooterCol>
            <h4>Resources</h4>
            <Link to="/">Home</Link>
            <Link to="/use-cases">Use Cases</Link>
            <Link to="/calculator">Calculator</Link>
            <Link to="/audit">Operations Audit</Link>
            <Link to="/about">About</Link>
          </FooterCol>
          <FooterCol>
            <h4>Connect</h4>
            <a href="https://kunaldeshmukh.com" target="_blank" rel="noopener noreferrer">kunaldeshmukh.com</a>
            <a href="mailto:audit@peakworkstudios.com">audit@peakworkstudios.com</a>
            <a href="https://linkedin.com/in/kunaldeshmukh" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://github.com/kunaldeshmukh" target="_blank" rel="noopener noreferrer">GitHub</a>
          </FooterCol>
          <FooterCol>
            <h4>Legal</h4>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </FooterCol>
        </FooterGrid>
        <FooterBottom>
          <span>&copy; {new Date().getFullYear()} Peak Work Studios. All rights reserved.</span>
          <ThemeToggle onClick={() => setIsDarkMode(!isDarkMode)} aria-label="Toggle dark mode" style={{ margin: 0 }}>
            {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
          </ThemeToggle>
        </FooterBottom>
      </FooterWrapper>

      <BackToTop
        $visible={showBackToTop}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        <ChevronUp size={20} />
      </BackToTop>

      {!cookieDismissed && (
        <CookieBanner>
          <p style={{ margin: 0 }}>We use local storage to save your theme preference and consent choice. See our <Link to="/privacy" style={{ textDecoration: 'underline' }}>Privacy Policy</Link> for details.</p>
          <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
            <button onClick={() => { setCookieDismissed(true); localStorage.setItem('pws-cookie-accepted', 'false'); }} style={{ background: 'transparent', color: 'inherit', border: `1px solid currentColor` }}>Decline</button>
            <button onClick={() => { setCookieDismissed(true); localStorage.setItem('pws-cookie-accepted', 'true'); }}>Accept</button>
          </div>
        </CookieBanner>
      )}
    </ThemeProvider>
  );
}

export default App;
