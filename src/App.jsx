import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Routes, Route, useLocation, Link, NavLink } from 'react-router-dom';
import styled, { ThemeProvider, createGlobalStyle, keyframes } from 'styled-components';
import { Sun, Moon, Menu, X, ChevronUp, Mountain } from 'lucide-react';

const HomePage = lazy(() => import('./pages/HomePage'));
const UseCasesPage = lazy(() => import('./pages/UseCasesPage'));
const CalculatorPage = lazy(() => import('./pages/CalculatorPage'));
const AuditPage = lazy(() => import('./pages/AuditPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));

const lightTheme = {
  primary: '#c1931b',
  primaryHover: '#a67d16',
  secondary: '#10213b',
  accent: '#d3b26a',
  background: '#efe8da',
  surface: '#fbf8f1',
  surfaceHover: '#f3ecde',
  text: '#0f172a',
  textSecondary: '#475569',
  border: '#d6ccb8',
  success: '#0f766e',
  warning: '#b45309',
  error: '#b91c1c',
  cardShadow: '0 18px 50px rgba(15, 23, 42, 0.08)',
  cardHoverShadow: '0 24px 60px rgba(15, 23, 42, 0.12)',
  headerBg: 'rgba(251, 248, 241, 0.78)',
  gridLine: 'rgba(15, 23, 42, 0.08)',
  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  headingFont: '"Newsreader", Georgia, serif',
  buttonText: '#1a1304',
  borderRadius: '22px',
  borderRadiusSm: '14px',
  borderRadiusLg: '32px',
};

const darkTheme = {
  primary: '#d0ad52',
  primaryHover: '#e0bf6d',
  secondary: '#dbe5f6',
  accent: '#c7a24a',
  background: '#0b1220',
  surface: '#111c2e',
  surfaceHover: '#16243b',
  text: '#f8fafc',
  textSecondary: '#b5c0d1',
  border: '#24344e',
  success: '#34d399',
  warning: '#f59e0b',
  error: '#f87171',
  cardShadow: '0 18px 50px rgba(2, 6, 23, 0.32)',
  cardHoverShadow: '0 24px 60px rgba(2, 6, 23, 0.42)',
  headerBg: 'rgba(17, 28, 46, 0.8)',
  gridLine: 'rgba(219, 229, 246, 0.08)',
  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  headingFont: '"Newsreader", Georgia, serif',
  buttonText: '#140f02',
  borderRadius: '22px',
  borderRadiusSm: '14px',
  borderRadiusLg: '32px',
};

const GlobalStyle = createGlobalStyle`
  html {
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    color: ${p => p.theme.text};
    background:
      radial-gradient(circle at top left, rgba(193, 147, 27, 0.16), transparent 26%),
      linear-gradient(180deg, ${p => p.theme.background} 0%, ${p => p.theme.surface} 100%);
    font-family: ${p => p.theme.fontFamily};
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
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

  button,
  input,
  textarea,
  select {
    font: inherit;
  }

  ::selection {
    background: rgba(193, 147, 27, 0.24);
  }

  :focus-visible {
    outline: 3px solid rgba(193, 147, 27, 0.42);
    outline-offset: 3px;
  }

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }

    *, *::before, *::after {
      animation: none !important;
      transition: none !important;
    }
  }
`;

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const Shell = styled.div`
  min-height: 100vh;
`;

const HeaderWrap = styled.header`
  position: fixed;
  top: 16px;
  left: 16px;
  right: 16px;
  z-index: 1000;

  @media (max-width: 768px) {
    top: 10px;
    left: 10px;
    right: 10px;
  }
`;

const HeaderBar = styled.div`
  max-width: 1220px;
  margin: 0 auto;
  min-height: 74px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 14px 18px 14px 22px;
  border: 1px solid ${p => p.theme.border};
  border-radius: 999px;
  background: ${p => p.theme.headerBg};
  box-shadow: ${p => p.theme.cardShadow};
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);

  @media (max-width: 768px) {
    min-height: 66px;
    border-radius: 24px;
    padding: 12px 14px 12px 18px;
  }
`;

const LogoLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.01em;
  color: ${p => p.theme.text};

  &:hover {
    color: ${p => p.theme.secondary};
  }

  span:last-child {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const LogoMark = styled.span`
  width: 38px;
  height: 38px;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: ${p => p.theme.secondary};
  color: ${p => p.theme.primary};
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
`;

const DesktopNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 920px) {
    display: none;
  }
`;

const NavItem = styled(NavLink)`
  padding: 10px 14px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 600;
  color: ${p => p.theme.textSecondary};
  transition: background-color 180ms ease, color 180ms ease;

  &.active,
  &:hover {
    color: ${p => p.theme.text};
    background: ${p => p.theme.surfaceHover};
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const IconButton = styled.button`
  width: 42px;
  height: 42px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid ${p => p.theme.border};
  background: ${p => p.theme.surface};
  color: ${p => p.theme.textSecondary};
  cursor: pointer;
  transition: transform 180ms ease, background-color 180ms ease, color 180ms ease;

  &:hover {
    transform: translateY(-1px);
    color: ${p => p.theme.text};
    background: ${p => p.theme.surfaceHover};
  }
`;

const HeaderCTA = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 46px;
  padding: 0 20px;
  border-radius: 999px;
  background: ${p => p.theme.primary};
  color: ${p => p.theme.buttonText};
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
  transition: transform 180ms ease, background-color 180ms ease;

  &:hover {
    transform: translateY(-1px);
    background: ${p => p.theme.primaryHover};
  }

  @media (max-width: 640px) {
    display: none;
  }
`;

const MobileMenuButton = styled(IconButton)`
  display: none;

  @media (max-width: 920px) {
    display: inline-flex;
  }
`;

const MobileMenu = styled.div`
  max-width: 1220px;
  margin: 12px auto 0;
  display: ${p => (p.$open ? 'grid' : 'none')};
  gap: 6px;
  padding: 12px;
  border: 1px solid ${p => p.theme.border};
  border-radius: 24px;
  background: ${p => p.theme.surface};
  box-shadow: ${p => p.theme.cardShadow};
`;

const MobileNavItem = styled(NavLink)`
  padding: 14px 16px;
  border-radius: 16px;
  font-size: 15px;
  font-weight: 600;
  color: ${p => p.theme.textSecondary};

  &.active,
  &:hover {
    background: ${p => p.theme.surfaceHover};
    color: ${p => p.theme.text};
  }
`;

const Main = styled.main`
  min-height: 100vh;
  padding-top: 108px;

  @media (max-width: 768px) {
    padding-top: 96px;
  }
`;

const RouteFallback = styled.div`
  min-height: calc(100vh - 180px);
  display: grid;
  place-items: center;
  padding: 32px 16px;
`;

const RouteFallbackCard = styled.div`
  min-width: min(280px, 100%);
  padding: 22px 24px;
  border-radius: ${p => p.theme.borderRadius};
  border: 1px solid ${p => p.theme.border};
  background: ${p => p.theme.surface};
  box-shadow: ${p => p.theme.cardShadow};
  text-align: center;

  strong {
    display: block;
    font-family: ${p => p.theme.headingFont};
    font-size: 30px;
    line-height: 1;
    margin-bottom: 8px;
  }

  p {
    margin: 0;
    font-size: 14px;
    color: ${p => p.theme.textSecondary};
  }
`;

const Footer = styled.footer`
  padding: 28px 16px 40px;
`;

const FooterFrame = styled.div`
  max-width: 1220px;
  margin: 0 auto;
  padding: 34px;
  border-radius: ${p => p.theme.borderRadiusLg};
  background: ${p => p.theme.surface};
  border: 1px solid ${p => p.theme.border};
  box-shadow: ${p => p.theme.cardShadow};

  @media (max-width: 768px) {
    padding: 26px 22px;
  }
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr 1fr;
  gap: 28px;

  @media (max-width: 960px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const FooterColumn = styled.div`
  h4 {
    margin: 0 0 14px;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${p => p.theme.textSecondary};
  }

  p,
  a {
    margin: 0;
    display: block;
    font-size: 14px;
    line-height: 1.8;
    color: ${p => p.theme.textSecondary};
  }

  a:hover {
    color: ${p => p.theme.text};
  }
`;

const FooterBrand = styled.div`
  display: grid;
  gap: 12px;

  strong {
    font-family: ${p => p.theme.headingFont};
    font-size: 30px;
    line-height: 1;
    color: ${p => p.theme.text};
  }
`;

const FooterBottom = styled.div`
  margin-top: 28px;
  padding-top: 20px;
  border-top: 1px solid ${p => p.theme.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  color: ${p => p.theme.textSecondary};
  font-size: 13px;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const BackToTop = styled.button`
  position: fixed;
  right: 22px;
  bottom: 22px;
  width: 48px;
  height: 48px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid ${p => p.theme.border};
  background: ${p => p.theme.secondary};
  color: ${p => p.theme.primary};
  cursor: pointer;
  opacity: ${p => (p.$visible ? 1 : 0)};
  pointer-events: ${p => (p.$visible ? 'auto' : 'none')};
  box-shadow: ${p => p.theme.cardShadow};
  transition: opacity 180ms ease, transform 180ms ease;
  z-index: 950;

  &:hover {
    transform: translateY(-2px);
  }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(16px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const CookieBanner = styled.div`
  position: fixed;
  left: 16px;
  right: 16px;
  bottom: 16px;
  z-index: 980;
`;

const CookiePanel = styled.div`
  max-width: 820px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 18px;
  border-radius: 24px;
  border: 1px solid ${p => p.theme.border};
  background: ${p => p.theme.surface};
  box-shadow: ${p => p.theme.cardShadow};
  animation: ${slideUp} 180ms ease-out;

  p {
    margin: 0;
    font-size: 14px;
    color: ${p => p.theme.textSecondary};
  }

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const CookieActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 640px) {
    width: 100%;
  }
`;

const CookieButton = styled.button`
  min-height: 42px;
  padding: 0 16px;
  border-radius: 999px;
  border: 1px solid ${p => (p.$primary ? p.theme.primary : p.theme.border)};
  background: ${p => (p.$primary ? p.theme.primary : 'transparent')};
  color: ${p => (p.$primary ? p.theme.buttonText : p.theme.text)};
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;

  @media (max-width: 640px) {
    flex: 1;
  }
`;

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('pws-dark-mode');
    if (saved !== null) {
      return JSON.parse(saved);
    }

    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [cookieDismissed, setCookieDismissed] = useState(() => {
    return localStorage.getItem('pws-cookie-accepted') !== null;
  });
  const location = useLocation();
  const theme = isDarkMode ? darkTheme : lightTheme;

  useEffect(() => {
    localStorage.setItem('pws-dark-mode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 520);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleTheme = () => setIsDarkMode(current => !current);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ScrollToTop />
      <Shell>
        <HeaderWrap>
          <HeaderBar>
            <LogoLink to="/">
              <LogoMark>
                <Mountain size={20} />
              </LogoMark>
              <span>Peak Work Studios</span>
            </LogoLink>

            <DesktopNav>
              <NavItem to="/" end>Home</NavItem>
              <NavItem to="/use-cases">Use Cases</NavItem>
              <NavItem to="/calculator">Calculator</NavItem>
              <NavItem to="/audit">Audit</NavItem>
              <NavItem to="/about">About</NavItem>
              <NavItem to="/contact">Contact</NavItem>
            </DesktopNav>

            <HeaderRight>
              <IconButton onClick={toggleTheme} aria-label="Toggle color theme">
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </IconButton>
              <HeaderCTA to="/contact">Book a Discovery Call</HeaderCTA>
              <MobileMenuButton onClick={() => setMobileMenuOpen(current => !current)} aria-label="Toggle navigation menu">
                {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </MobileMenuButton>
            </HeaderRight>
          </HeaderBar>

          <MobileMenu $open={mobileMenuOpen}>
            <MobileNavItem to="/" end>Home</MobileNavItem>
            <MobileNavItem to="/use-cases">Use Cases</MobileNavItem>
            <MobileNavItem to="/calculator">Calculator</MobileNavItem>
            <MobileNavItem to="/audit">Audit</MobileNavItem>
            <MobileNavItem to="/about">About</MobileNavItem>
            <MobileNavItem to="/contact">Contact</MobileNavItem>
          </MobileMenu>
        </HeaderWrap>

        <Main style={{ paddingBottom: cookieDismissed ? 0 : '132px' }}>
          <Suspense
            fallback={
              <RouteFallback>
                <RouteFallbackCard>
                  <strong>Loading</strong>
                  <p>Bringing the next page into view.</p>
                </RouteFallbackCard>
              </RouteFallback>
            }
          >
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
          </Suspense>
        </Main>

        <Footer>
          <FooterFrame>
            <FooterGrid>
              <FooterBrand>
                <strong>Automation without the agency mess.</strong>
                <p>Peak Work Studios designs workflow systems, AI assistants, and reporting operations for service teams that need reliability before scale.</p>
                <p>Calgary, Canada</p>
              </FooterBrand>

              <FooterColumn>
                <h4>Navigate</h4>
                <Link to="/">Home</Link>
                <Link to="/use-cases">Use Cases</Link>
                <Link to="/calculator">Calculator</Link>
                <Link to="/audit">Audit</Link>
                <Link to="/contact">Contact</Link>
              </FooterColumn>

              <FooterColumn>
                <h4>Contact</h4>
                <a href="mailto:info@peakworkstudios.com">info@peakworkstudios.com</a>
                <a href="https://linkedin.com/in/kunaldeshmukh" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="https://kunaldeshmukh.com" target="_blank" rel="noopener noreferrer">kunaldeshmukh.com</a>
                <a href="https://github.com/codestorycooked" target="_blank" rel="noopener noreferrer">GitHub</a>
              </FooterColumn>

              <FooterColumn>
                <h4>Legal</h4>
                <Link to="/privacy">Privacy Policy</Link>
                <Link to="/terms">Terms of Service</Link>
              </FooterColumn>
            </FooterGrid>

            <FooterBottom>
              <span>&copy; {new Date().getFullYear()} Peak Work Studios. All rights reserved.</span>
              <span>Built for service firms that need human review, clear audit trails, and maintainable automation.</span>
            </FooterBottom>
          </FooterFrame>
        </Footer>

        <BackToTop
          $visible={showBackToTop}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
        >
          <ChevronUp size={20} />
        </BackToTop>

        {!cookieDismissed && (
          <CookieBanner>
            <CookiePanel>
              <p>
                We use local storage to remember your theme and consent preference. Read the <Link to="/privacy" style={{ textDecoration: 'underline' }}>privacy policy</Link> for details.
              </p>
              <CookieActions>
                <CookieButton onClick={() => { setCookieDismissed(true); localStorage.setItem('pws-cookie-accepted', 'false'); }}>
                  Decline
                </CookieButton>
                <CookieButton
                  $primary
                  onClick={() => { setCookieDismissed(true); localStorage.setItem('pws-cookie-accepted', 'true'); }}
                >
                  Accept
                </CookieButton>
              </CookieActions>
            </CookiePanel>
          </CookieBanner>
        )}
      </Shell>
    </ThemeProvider>
  );
}

export default App;
