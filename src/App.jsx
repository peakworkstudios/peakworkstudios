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
  primary: '#0a6b57',
  primaryHover: '#085646',
  secondary: '#0d1614',
  accent: '#8a5a00',
  background: '#f3f5f6',
  surface: '#ffffff',
  surfaceHover: '#eaeeef',
  text: '#0d1614',
  textSecondary: '#44514e',
  border: '#d3dbd9',
  success: '#0a6b57',
  warning: '#8a5a00',
  error: '#a3261b',
  signalTint: '#e0f0ec',
  reviewText: '#8a5a00',
  reviewTint: '#fbefd0',
  cardShadow: 'none',
  cardHoverShadow: 'none',
  ledgerShadow: '8px 8px 0 #0d1614',
  headerBg: 'rgba(255, 255, 255, 0.92)',
  gridLine: 'rgba(13, 22, 20, 0.08)',
  fontFamily: '"Public Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  headingFont: '"Bricolage Grotesque", "Helvetica Neue", sans-serif',
  monoFont: '"IBM Plex Mono", ui-monospace, monospace',
  buttonText: '#ffffff',
  borderRadius: '6px',
  borderRadiusSm: '4px',
  borderRadiusLg: '6px',
};

const darkTheme = {
  primary: '#3fbf9f',
  primaryHover: '#5fd0b3',
  secondary: '#e4ebe9',
  accent: '#f0b95a',
  background: '#0b1210',
  surface: '#111b18',
  surfaceHover: '#17251f',
  text: '#eef3f1',
  textSecondary: '#a9b8b4',
  border: '#26332f',
  success: '#3fbf9f',
  warning: '#f0b95a',
  error: '#f28b82',
  signalTint: 'rgba(63, 191, 159, 0.14)',
  reviewText: '#f0b95a',
  reviewTint: 'rgba(240, 185, 90, 0.14)',
  cardShadow: 'none',
  cardHoverShadow: 'none',
  ledgerShadow: '8px 8px 0 #3fbf9f',
  headerBg: 'rgba(17, 27, 24, 0.92)',
  gridLine: 'rgba(238, 243, 241, 0.08)',
  fontFamily: '"Public Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  headingFont: '"Bricolage Grotesque", "Helvetica Neue", sans-serif',
  monoFont: '"IBM Plex Mono", ui-monospace, monospace',
  buttonText: '#04140f',
  borderRadius: '6px',
  borderRadiusSm: '4px',
  borderRadiusLg: '6px',
};

const GlobalStyle = createGlobalStyle`
  html {
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    color: ${p => p.theme.text};
    background: ${p => p.theme.background};
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
    background: rgba(10, 107, 87, 0.24);
  }

  :focus-visible {
    outline: 3px solid rgba(10, 107, 87, 0.5);
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
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: ${p => p.theme.surface};
  border-bottom: 1px solid ${p => p.theme.border};
`;

const HeaderBar = styled.div`
  max-width: 1220px;
  margin: 0 auto;
  min-height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 8px 24px;

  @media (max-width: 768px) {
    min-height: 60px;
    padding: 8px 16px;
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
  background: #0d1614;
  color: #8fd6c3;
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
  padding: 10px 12px;
  border-radius: ${p => p.theme.borderRadiusSm};
  font-size: 14px;
  font-weight: 600;
  color: ${p => p.theme.textSecondary};
  transition: background-color 160ms ease-out, color 160ms ease-out;

  &:hover {
    color: ${p => p.theme.text};
    background: ${p => p.theme.surfaceHover};
  }

  &.active {
    color: ${p => p.theme.text};
    font-weight: 700;
    text-decoration: underline;
    text-decoration-color: ${p => p.theme.primary};
    text-decoration-thickness: 2px;
    text-underline-offset: 8px;
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
  min-height: 44px;
  padding: 0 20px;
  border-radius: ${p => p.theme.borderRadius};
  border: 1px solid ${p => p.theme.text};
  background: transparent;
  color: ${p => p.theme.text};
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 160ms ease-out, color 160ms ease-out;

  &:hover {
    background: ${p => p.theme.text};
    color: ${p => p.theme.background};
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

const menuIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: none;
  }
`;

const MobileMenu = styled.div`
  display: ${p => (p.$open ? 'grid' : 'none')};
  gap: 4px;
  max-height: calc(100vh - 60px);
  overflow-y: auto;
  padding: 8px 16px 16px;
  border-top: 1px solid ${p => p.theme.border};
  background: ${p => p.theme.surface};
  animation: ${menuIn} 200ms ease-out;
`;

const MobileNavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  min-height: 48px;
  padding: 0 12px;
  border-radius: ${p => p.theme.borderRadiusSm};
  font-size: 16px;
  font-weight: 600;
  color: ${p => p.theme.textSecondary};

  &:hover {
    background: ${p => p.theme.surfaceHover};
    color: ${p => p.theme.text};
  }

  &.active {
    color: ${p => p.theme.text};
    font-weight: 700;
    text-decoration: underline;
    text-decoration-color: ${p => p.theme.primary};
    text-decoration-thickness: 2px;
    text-underline-offset: 6px;
  }
`;

const MobileAudit = styled(MobileNavItem)`
  justify-content: center;
  margin-top: 8px;
  border: 1px solid ${p => p.theme.text};
  color: ${p => p.theme.text};
  font-weight: 700;
`;

const Main = styled.main`
  min-height: 100vh;
  padding-top: 88px;

  @media (max-width: 768px) {
    padding-top: 80px;
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
  border-radius: ${p => p.theme.borderRadius};
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
  border-radius: ${p => p.theme.borderRadius};
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
    if (!mobileMenuOpen) return undefined;
    const onKey = event => {
      if (event.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileMenuOpen]);

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
              <span>PeakWork Studios</span>
            </LogoLink>

            <DesktopNav>
              <NavItem to="/" end>Home</NavItem>
              <NavItem to="/use-cases">Use Cases</NavItem>
              <NavItem to="/calculator">Calculator</NavItem>
              <NavItem to="/about">About</NavItem>
              <NavItem to="/contact">Contact</NavItem>
            </DesktopNav>

            <HeaderRight>
              <IconButton onClick={toggleTheme} aria-label="Toggle color theme">
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </IconButton>
              <HeaderCTA to="/audit">Run the audit</HeaderCTA>
              <MobileMenuButton onClick={() => setMobileMenuOpen(current => !current)} aria-label="Toggle navigation menu" aria-expanded={mobileMenuOpen} aria-controls="mobile-menu">
                {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </MobileMenuButton>
            </HeaderRight>
          </HeaderBar>

          <MobileMenu id="mobile-menu" $open={mobileMenuOpen}>
            <MobileNavItem to="/" end>Home</MobileNavItem>
            <MobileNavItem to="/use-cases">Use Cases</MobileNavItem>
            <MobileNavItem to="/calculator">Calculator</MobileNavItem>
            <MobileNavItem to="/about">About</MobileNavItem>
            <MobileNavItem to="/contact">Contact</MobileNavItem>
            <MobileAudit to="/audit">Run the audit</MobileAudit>
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
                <p>PeakWork Studios designs workflow systems, AI assistants, and reporting operations for service teams that need reliability before scale.</p>
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
              <span>&copy; {new Date().getFullYear()} PeakWork Studios. All rights reserved.</span>
              <span>PeakWork Studios is a registered trade name owned and operated by 2607770 Alberta Inc.</span>
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
