import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { jsPDF } from 'jspdf';
import {
  Calculator,
  CheckCircle,
  Users,
  DollarSign,
  Clock,
  ArrowRight,
  Download,
  Mail,
  TrendingUp,
  BarChart3,
  Building,
  UserCheck,
} from 'lucide-react';

// ─── Helpers ───

const formatCurrency = (num) => {
  if (num == null || isNaN(num)) return '$0';
  return '$' + Math.round(num).toLocaleString('en-US');
};

const formatNumber = (num, decimals = 1) => {
  if (num == null || isNaN(num)) return '0';
  return Number(num).toFixed(decimals);
};

// ─── PDF Generation ───

const generateResultsPDF = ({
  teamSize,
  hourlyRate,
  clients,
  totalAnnualCost,
  potentialSavings,
  remainingCost,
  categoryBreakdown,
}) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let y = 20;

  // Header
  doc.setFontSize(24);
  doc.setFont(undefined, 'bold');
  doc.setTextColor(56, 189, 248);
  doc.text('Peak Work Studios', pageWidth / 2, y, { align: 'center' });
  y += 10;

  doc.setFontSize(12);
  doc.setFont(undefined, 'normal');
  doc.setTextColor(107, 114, 128);
  doc.text('Hidden Cost Analysis', pageWidth / 2, y, { align: 'center' });
  y += 12;

  // Horizontal line under header
  doc.setDrawColor(56, 189, 248);
  doc.setLineWidth(0.5);
  doc.line(15, y, pageWidth - 15, y);
  y += 10;

  // CTA Box
  doc.setDrawColor(56, 189, 248);
  doc.setFillColor(240, 249, 255);
  doc.rect(15, y, pageWidth - 30, 18, 'FD');
  
  // Center "Ready for full automation?" text manually
  doc.setFontSize(11);
  doc.setFont(undefined, 'normal');
  doc.setTextColor(26, 26, 26);
  const ctaText = 'Ready for full automation?';
  const ctaTextWidth = doc.getTextWidth(ctaText);
  const ctaX = pageWidth / 2 - ctaTextWidth / 2;
  doc.text(ctaText, ctaX, y + 5);
  
  // Center "Book Your Free Audit" link text manually
  doc.setTextColor(56, 189, 248);
  doc.setFont(undefined, 'bold');
  const linkText = 'Book Your Free Audit';
  const linkTextWidth = doc.getTextWidth(linkText);
  const linkX = pageWidth / 2 - linkTextWidth / 2;
  doc.textWithLink(linkText, linkX, y + 12, { pageNumber: 1 }, 'https://peakworkstudios.com/contact');
  
  y += 26;

  // Main Cost
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.setTextColor(26, 26, 26);
  doc.text('Your Team Is Losing:', 15, y);
  y += 12;

  doc.setFontSize(36);
  doc.setTextColor(239, 68, 68);
  doc.setFont(undefined, 'bold');
  doc.text(formatCurrency(totalAnnualCost), 15, y);
  y += 14;

  doc.setFontSize(11);
  doc.setTextColor(107, 114, 128);
  doc.setFont(undefined, 'normal');
  doc.text('per year in hidden costs', 15, y);
  y += 16;

  // Summary Table
  doc.setFontSize(10);
  
  const tableRows = [
    ['Team size', `${teamSize} people`],
    ['Hourly rate', `$${hourlyRate}/hr`],
    ['Active clients', `${clients}`],
    ['Monthly cost', formatCurrency(totalAnnualCost / 12)],
    ['Weekly cost', formatCurrency(totalAnnualCost / 52)],
    ['Daily cost', formatCurrency(totalAnnualCost / 260)],
    ['Potential savings (70%)', `${formatCurrency(potentialSavings)}/year`],
    ['Remaining cost', `${formatCurrency(remainingCost)}/year`],
  ];

  tableRows.forEach((row, idx) => {
    // Alternating row background
    if (idx % 2 === 0) {
      doc.setFillColor(249, 250, 251);
      doc.rect(15, y - 4, pageWidth - 30, 6.5, 'F');
    }
    
    doc.setTextColor(26, 26, 26);
    doc.setFont(undefined, 'bold');
    doc.text(row[0], 18, y);
    
    doc.setFont(undefined, 'normal');
    doc.setTextColor(56, 189, 248);
    doc.text(row[1], pageWidth - 18, y, { align: 'right' });
    
    y += 7;
  });

  y += 10;

  // Breakdown table if exists
  if (categoryBreakdown && categoryBreakdown.length > 0) {
    doc.setFontSize(12);
    doc.setTextColor(26, 26, 26);
    doc.setFont(undefined, 'bold');
    doc.text('Cost Breakdown by Category', 15, y);
    y += 10;

    doc.setFontSize(9);
    categoryBreakdown.forEach((cat) => {
      doc.setFont(undefined, 'normal');
      doc.setTextColor(26, 26, 26);
      doc.text(cat.label, 15, y);
      
      doc.setTextColor(56, 189, 248);
      doc.setFont(undefined, 'bold');
      doc.text(`${formatCurrency(cat.annualCost)}/yr`, pageWidth - 15, y, { align: 'right' });
      
      y += 6;
      
      if (y > pageHeight - 20) {
        doc.addPage();
        y = 20;
      }
    });
  }

  // Footer
  y = pageHeight - 15;
  doc.setFontSize(9);
  doc.setTextColor(153, 153, 153);
  doc.text('Peak Work Studios · Calgary, Canada', 15, y);
  doc.text(`Generated on ${new Date().toLocaleDateString()}`, pageWidth - 15, y, { align: 'right' });

  // Save
  doc.save(`delivery-cost-results-${new Date().toISOString().slice(0, 10)}.pdf`);
};

// ─── Animations ───

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulseGlow = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(56, 189, 248, 0.15); }
  50% { box-shadow: 0 0 24px 4px rgba(56, 189, 248, 0.1); }
`;

// ─── Styled Components ───

const PageWrapper = styled.div`
  min-height: 100vh;
  background: ${p => p.theme.background};
  font-family: ${p => p.theme.fontFamily};
`;

const HeroSection = styled.section`
  text-align: center;
  padding: 100px 40px 80px;
  max-width: 800px;
  margin: 0 auto;
  animation: ${fadeInUp} 0.6s ease-out;

  @media (max-width: 768px) {
    padding: 60px 20px 40px;
  }
`;

const HeroHeadline = styled.h1`
  font-size: clamp(32px, 5vw, 48px);
  font-weight: 800;
  color: ${p => p.theme.text};
  letter-spacing: -1px;
  line-height: 1.15;
  margin: 0 0 20px;
`;

const HeroSub = styled.p`
  font-size: clamp(17px, 2.5vw, 20px);
  color: ${p => p.theme.textSecondary};
  line-height: 1.6;
  margin: 0;
`;

const CalculatorSection = styled.section`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 40px 100px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    padding: 0 20px 60px;
    gap: 32px;
  }
`;

const InputPanel = styled.div`
  animation: ${fadeInUp} 0.6s ease-out 0.1s both;
`;

const ResultsPanel = styled.div`
  position: sticky;
  top: 88px;
  animation: ${fadeInUp} 0.6s ease-out 0.2s both;

  @media (max-width: 900px) {
    position: static;
  }
`;

const Card = styled.div`
  background: ${p => p.theme.surface};
  border: 1px solid ${p => p.theme.border};
  border-radius: ${p => p.theme.borderRadiusLg};
  padding: 32px;
  box-shadow: ${p => p.theme.cardShadow};
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-3px) scale(1.005);
    box-shadow: ${p => p.theme.cardHoverShadow || p.theme.cardShadow};
  }

  @media (max-width: 768px) {
    padding: 24px 20px;
  }
`;

const SectionTitle = styled.h2`
  font-size: clamp(20px, 3vw, 24px);
  font-weight: 700;
  color: ${p => p.theme.text};
  margin: 0 0 28px;
  letter-spacing: -0.5px;
`;

const FieldGroup = styled.div`
  margin-bottom: 32px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const FieldLabel = styled.label`
  display: block;
  font-size: 15px;
  font-weight: 600;
  color: ${p => p.theme.text};
  margin-bottom: 8px;
`;

const HelpText = styled.span`
  display: block;
  font-size: 13px;
  color: ${p => p.theme.textSecondary};
  margin-bottom: 12px;
  line-height: 1.5;
`;

const SliderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const SliderValue = styled.div`
  min-width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
  color: ${p => p.theme.primary};
  background: ${p => p.theme.background};
  border: 1px solid ${p => p.theme.border};
  border-radius: ${p => p.theme.borderRadiusSm};
`;

const StyledSlider = styled.input.attrs({ type: 'range' })`
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: ${p => {
    const pct = ((p.value - p.min) / (p.max - p.min)) * 100;
    return `linear-gradient(to right, ${p.theme.primary} ${pct}%, ${p.theme.border} ${pct}%)`;
  }};
  outline: none;
  cursor: pointer;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: ${p => p.theme.primary};
    border: 3px solid ${p => p.theme.background};
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    cursor: pointer;
    transition: transform 0.15s ease;
  }

  &::-webkit-slider-thumb:hover {
    transform: scale(1.15);
  }

  &::-moz-range-thumb {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: ${p => p.theme.primary};
    border: 3px solid ${p => p.theme.background};
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    cursor: pointer;
  }
`;

const PresetRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
`;

const PresetButton = styled.button`
  padding: 8px 18px;
  font-size: 14px;
  font-weight: 600;
  border-radius: ${p => p.theme.borderRadiusSm};
  border: 1px solid ${p => p.$active ? p.theme.primary : p.theme.border};
  background: ${p => p.$active ? p.theme.primary : p.theme.background};
  color: ${p => p.$active ? '#000' : p.theme.text};
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: ${p => p.theme.fontFamily};

  &:hover {
    border-color: ${p => p.theme.primary};
    background: ${p => p.$active ? p.theme.primaryHover : p.theme.surfaceHover};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(56, 189, 248, 0.15);
  }

  &:active {
    transform: translateY(0);
  }
`;

const CustomRateInput = styled.input`
  width: 100px;
  padding: 8px 12px;
  font-size: 14px;
  font-weight: 600;
  border-radius: ${p => p.theme.borderRadiusSm};
  border: 1px solid ${p => p.theme.border};
  background: ${p => p.theme.background};
  color: ${p => p.theme.text};
  font-family: ${p => p.theme.fontFamily};
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: ${p => p.theme.primary};
  }

  &::placeholder {
    color: ${p => p.theme.textSecondary};
  }
`;

const CheckboxList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const CheckboxItem = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 16px;
  border-radius: ${p => p.theme.borderRadiusSm};
  border: 1px solid ${p => p.$checked ? p.theme.primary + '40' : p.theme.border};
  background: ${p => p.$checked ? p.theme.primary + '08' : p.theme.background};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${p => p.theme.primary}60;
    transform: translateX(4px);
    box-shadow: 0 2px 8px rgba(56, 189, 248, 0.08);
  }
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

const CustomCheckbox = styled.div`
  width: 20px;
  height: 20px;
  min-width: 20px;
  border-radius: 5px;
  border: 2px solid ${p => p.$checked ? p.theme.primary : p.theme.border};
  background: ${p => p.$checked ? p.theme.primary : 'transparent'};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  margin-top: 1px;

  &::after {
    content: '';
    width: 5px;
    height: 9px;
    border: solid ${p => p.$checked ? '#000' : 'transparent'};
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    margin-top: -2px;
  }
`;

const CheckboxText = styled.div`
  flex: 1;
`;

const CheckboxLabel = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${p => p.theme.text};
  margin-bottom: 2px;
`;

const CheckboxMeta = styled.div`
  font-size: 12px;
  color: ${p => p.theme.textSecondary};
`;

// ─── Results Styled ───

const subtleGlow = keyframes`
  0%, 100% { box-shadow: 0 0 8px 0 rgba(56, 189, 248, 0.06); }
  50% { box-shadow: 0 0 20px 6px rgba(56, 189, 248, 0.12); }
`;

const ResultsCard = styled(Card)`
  animation: ${pulseGlow} 3s ease-in-out infinite, ${subtleGlow} 4s ease-in-out infinite;

  &:hover {
    transform: translateY(-3px) scale(1.005);
  }
`;

const ResultsHeadline = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: ${p => p.theme.textSecondary};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 8px;
`;

const BigNumber = styled.div`
  font-size: clamp(36px, 6vw, 52px);
  font-weight: 800;
  color: ${p => p.theme.error};
  letter-spacing: -2px;
  line-height: 1.1;
  margin-bottom: 4px;
  transition: color 0.3s ease;
  font-variant-numeric: tabular-nums;
`;

const SubBreakdown = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 12px;
  padding-top: 16px;
  border-top: 1px solid ${p => p.theme.border};
`;

const SubStat = styled.div`
  font-size: 13px;
  color: ${p => p.theme.textSecondary};

  strong {
    display: block;
    font-size: 18px;
    font-weight: 700;
    color: ${p => p.theme.text};
    margin-bottom: 2px;
  }
`;

const EquivalentSection = styled.div`
  margin-top: 24px;
  padding: 20px;
  background: ${p => p.theme.background};
  border-radius: ${p => p.theme.borderRadiusSm};
  border: 1px solid ${p => p.theme.border};
`;

const EquivalentTitle = styled.div`
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: ${p => p.theme.textSecondary};
  margin-bottom: 12px;
`;

const EquivalentItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
  font-size: 15px;
  color: ${p => p.theme.text};

  svg {
    color: ${p => p.theme.primary};
    flex-shrink: 0;
  }

  strong {
    color: ${p => p.theme.primary};
    font-weight: 700;
  }
`;

// ─── Category Breakdown Bar ───

const BarContainer = styled.div`
  margin-top: 24px;
`;

const BarItem = styled.div`
  margin-bottom: 14px;
`;

const BarLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  font-weight: 600;
  color: ${p => p.theme.text};
  margin-bottom: 5px;
`;

const BarAmount = styled.span`
  color: ${p => p.theme.error};
  font-weight: 700;
  font-variant-numeric: tabular-nums;
`;

const BarTrack = styled.div`
  height: 8px;
  background: ${p => p.theme.border};
  border-radius: 4px;
  overflow: hidden;
`;

const BarFill = styled.div`
  height: 100%;
  width: ${p => p.$width}%;
  background: ${p => p.$color || p.theme.error};
  border-radius: 4px;
  transition: width 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.4s ease;
  opacity: 0.9;

  ${BarItem}:hover & {
    opacity: 1;
    filter: brightness(1.1);
  }
`;

// ─── Opportunity Section ───

const FullWidthSection = styled.section`
  max-width: 1100px;
  margin: 0 auto;
  padding: 100px 40px;

  @media (max-width: 768px) {
    padding: 60px 20px;
  }
`;

const OpportunityGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const OpportunityCard = styled(Card)`
  padding: 24px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${p => p.theme.cardHoverShadow};
  }
`;

const OpportunityHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;

  svg {
    color: ${p => p.theme.success};
    flex-shrink: 0;
  }
`;

const OpportunitySavings = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: ${p => p.theme.success};
  margin-bottom: 12px;
`;

const BulletList = styled.ul`
  margin: 0;
  padding-left: 18px;
  font-size: 13px;
  line-height: 1.7;
  color: ${p => p.theme.textSecondary};
`;

// ─── Chart Section ───

const ChartWrapper = styled.div`
  margin-top: 32px;
`;

const ChartBar = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
`;

const ChartLabel = styled.div`
  width: 140px;
  font-size: 13px;
  font-weight: 600;
  color: ${p => p.theme.text};
  text-align: right;
  flex-shrink: 0;

  @media (max-width: 480px) {
    width: 90px;
    font-size: 12px;
  }
`;

const ChartTrack = styled.div`
  flex: 1;
  height: 36px;
  background: ${p => p.theme.border};
  border-radius: ${p => p.theme.borderRadiusSm};
  overflow: hidden;
  position: relative;
`;

const ChartFill = styled.div`
  height: 100%;
  width: ${p => p.$width}%;
  background: ${p => p.$color};
  border-radius: ${p => p.theme.borderRadiusSm};
  transition: width 1s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.3s ease;
  display: flex;
  align-items: center;
  padding-left: 12px;
  font-size: 13px;
  font-weight: 700;
  color: #fff;
  white-space: nowrap;

  ${ChartBar}:hover & {
    filter: brightness(1.15);
  }
`;

// ─── CTA Section ───

const CTASection = styled.section`
  max-width: 1100px;
  margin: 0 auto;
  padding: 100px 40px;
  text-align: center;

  @media (max-width: 768px) {
    padding: 60px 20px;
  }
`;

const CTAGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-top: 40px;
  text-align: left;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CTACard = styled(Card)`
  padding: 32px;
  display: flex;
  flex-direction: column;
  ${p => p.$primary && `
    border-color: ${p.theme.primary}40;
    background: ${p.theme.primary}08;
  `}
`;

const CTACardTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: ${p => p.theme.text};
  margin: 0 0 16px;
`;

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 28px;
  border-radius: ${p => p.theme.borderRadius};
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  margin-top: auto;

  background: ${p => p.theme.primary};
  color: #000;

  &:hover {
    background: ${p => p.theme.primaryHover};
    transform: translateY(-1px);
  }
`;

const EmailRow = styled.div`
  display: flex;
  gap: 8px;
  margin-top: auto;
`;

const EmailInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  border-radius: ${p => p.theme.borderRadiusSm};
  border: 1px solid ${p => p.theme.border};
  background: ${p => p.theme.background};
  color: ${p => p.theme.text};
  font-size: 14px;
  font-family: ${p => p.theme.fontFamily};
  outline: none;

  &:focus {
    border-color: ${p => p.theme.primary};
  }

  &::placeholder {
    color: ${p => p.theme.textSecondary};
  }
`;

const EmailButton = styled.button`
  padding: 12px 20px;
  border-radius: ${p => p.theme.borderRadiusSm};
  border: 1px solid ${p => p.theme.primary};
  background: ${p => p.theme.primary};
  color: #000;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  font-family: ${p => p.theme.fontFamily};
  transition: all 0.2s ease;

  &:hover {
    background: ${p => p.theme.primaryHover};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const EmailStatus = styled.div`
  margin-top: 10px;
  font-size: 13px;
  color: ${p => (p.$type === 'error' ? p.theme.error : p.theme.success)};
`;

// ─── Social Proof ───

const SocialProofSection = styled.section`
  max-width: 1100px;
  margin: 0 auto;
  padding: 80px 40px 100px;
  text-align: center;

  @media (max-width: 768px) {
    padding: 40px 20px 60px;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-top: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled(Card)`
  padding: 28px 20px;
  text-align: center;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-4px) scale(1.02);
  }
`;

const StatNumber = styled.div`
  font-size: 32px;
  font-weight: 800;
  color: ${p => p.theme.primary};
  margin-bottom: 6px;
  letter-spacing: -1px;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: ${p => p.theme.textSecondary};
  line-height: 1.4;
`;

const Divider = styled.div`
  height: 1px;
  background: ${p => p.theme.border};
  max-width: 1100px;
  margin: 0 auto;
`;

const Disclaimer = styled.p`
  text-align: center;
  font-size: 13px;
  color: ${p => p.theme.textSecondary};
  max-width: 700px;
  margin: 32px auto;
  padding: 16px 24px;
  background: ${p => p.theme.surface};
  border: 1px solid ${p => p.theme.border};
  border-radius: 8px;
  line-height: 1.6;
`;

// ─── Category Data ───

const CATEGORIES = [
  {
    key: 'dataEntry',
    label: 'Manual data entry and copy-paste between tools',
    meta: 'Typical time: 5-10 hours/week for the team',
    bullets: [
      'Automated data syncing between your CRM, PM tool, and spreadsheets',
      'Eliminate double-entry and reduce errors across systems',
    ],
  },
  {
    key: 'statusUpdates',
    label: 'Status updates and progress tracking',
    meta: 'Typical time: 8-12 hours/week for the team',
    bullets: [
      'Auto-generated dashboards pull live data from your tools',
      'Scheduled digest emails replace ad-hoc update requests',
    ],
  },
  {
    key: 'reporting',
    label: 'Manual reporting and data compilation',
    meta: 'Typical time: 5-8 hours per report',
    bullets: [
      'Real-time dashboards pull data automatically from your tools',
      'One-click report generation replaces hours of spreadsheet work',
    ],
  },
  {
    key: 'meetings',
    label: 'Meeting notes and follow-up tasks',
    meta: 'Typical time: 3-5 hours/week',
    bullets: [
      'AI transcription with auto-extracted action items and assignments',
      'Follow-up tasks created automatically in your project management tool',
    ],
  },
  {
    key: 'handoffs',
    label: 'Handoffs and coordination between team members',
    meta: 'Typical time: 2-4 hours per handoff',
    bullets: [
      'Structured handoff checklists with automatic context transfer',
      'No more lost files or missed context when work changes hands',
    ],
  },
  {
    key: 'followUps',
    label: 'Repetitive emails, reminders, and follow-ups',
    meta: 'Typical time: 4-6 hours/week',
    bullets: [
      'Automated scheduling of routine communications and reminders',
      'Templated follow-ups triggered by project milestones or deadlines',
    ],
  },
  {
    key: 'infoRequests',
    label: 'Answering repeated questions and info requests',
    meta: 'Typical time: 1-2 hours/day across team',
    bullets: [
      'Knowledge base and self-serve tools handle common questions instantly',
      'Structured request forms capture details upfront and route to the right person',
    ],
  },
  {
    key: 'qc',
    label: 'Quality checks and review processes',
    meta: 'Typical time: 3-5 hours per deliverable',
    bullets: [
      'Automated QA checklists and review workflows catch issues early',
      'Standardized approval pipelines ensure consistent quality every time',
    ],
  },
];

const RATE_PRESETS = [50, 75, 100, 125];

// ─── Calculation Logic ───

const calcWeeklyHours = (key, teamSize, clients) => {
  switch (key) {
    case 'dataEntry':
      return Math.min(teamSize * 1.5, clients * 0.5 + 3);
    case 'statusUpdates':
      return Math.min(clients * 0.5, teamSize * 2.5);
    case 'reporting':
      return (clients * 5) / 4.33;
    case 'meetings':
      return 4;
    case 'handoffs':
      return teamSize * 1.5;
    case 'followUps':
      return Math.min(clients * 0.3 + 2, 8);
    case 'infoRequests':
      return clients * 0.4;
    case 'qc':
      return teamSize * 1.5;
    default:
      return 0;
  }
};

// ─── Animated Number Component ───

const AnimatedNumber = ({ value, prefix = '', suffix = '' }) => {
  const [display, setDisplay] = useState(value);
  const rafRef = useRef(null);
  const startRef = useRef(display);
  const startTimeRef = useRef(null);

  useEffect(() => {
    startRef.current = display;
    startTimeRef.current = null;
    const duration = 500;

    const animate = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = startRef.current + (value - startRef.current) * eased;
      setDisplay(current);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <span>
      {prefix}
      {Math.round(display).toLocaleString('en-US')}
      {suffix}
    </span>
  );
};

// ─── Main Component ───

const CalculatorPage = () => {
  // ─── State ───
  const [teamSize, setTeamSize] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('pws-calc'));
      return saved?.teamSize ?? 10;
    } catch { return 10; }
  });

  const [hourlyRate, setHourlyRate] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('pws-calc'));
      return saved?.hourlyRate ?? 75;
    } catch { return 75; }
  });

  const [customRate, setCustomRate] = useState('');
  const [isCustomRate, setIsCustomRate] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('pws-calc'));
      return saved?.isCustomRate ?? false;
    } catch { return false; }
  });

  const [clients, setClients] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('pws-calc'));
      return saved?.clients ?? 20;
    } catch { return 20; }
  });

  const [checked, setChecked] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('pws-calc'));
      if (saved?.checked) return saved.checked;
    } catch { /* noop */ }
    return CATEGORIES.reduce((acc, c) => ({ ...acc, [c.key]: true }), {});
  });

  const [email, setEmail] = useState('');
  const [isSendingResults, setIsSendingResults] = useState(false);
  const [sendStatus, setSendStatus] = useState(null);

  // ─── Persist to localStorage ───
  useEffect(() => {
    const data = { teamSize, hourlyRate, isCustomRate, clients, checked };
    localStorage.setItem('pws-calc', JSON.stringify(data));
  }, [teamSize, hourlyRate, isCustomRate, clients, checked]);

  // ─── URL hash sync ───
  useEffect(() => {
    const checkedKeys = Object.keys(checked).filter(k => checked[k]).join(',');
    const hash = `#t=${teamSize}&r=${hourlyRate}&c=${clients}&k=${checkedKeys}`;
    window.history.replaceState(null, '', hash);
  }, [teamSize, hourlyRate, clients, checked]);

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    try {
      const params = new URLSearchParams(hash.slice(1));
      const t = parseInt(params.get('t'));
      const r = parseInt(params.get('r'));
      const c = parseInt(params.get('c'));
      const k = params.get('k');
      if (t >= 1 && t <= 50) setTeamSize(t);
      if (r > 0) {
        setHourlyRate(r);
        if (!RATE_PRESETS.includes(r)) {
          setIsCustomRate(true);
          setCustomRate(String(r));
        }
      }
      if (c >= 5 && c <= 100) setClients(c);
      if (k) {
        const keys = k.split(',');
        const newChecked = {};
        CATEGORIES.forEach(cat => {
          newChecked[cat.key] = keys.includes(cat.key);
        });
        setChecked(newChecked);
      }
    } catch { /* noop */ }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── Calculations ───
  const categoryBreakdown = useMemo(() => {
    return CATEGORIES
      .filter(c => checked[c.key])
      .map(c => {
        const weeklyHours = calcWeeklyHours(c.key, teamSize, clients);
        const annualCost = weeklyHours * hourlyRate * 52;
        return { ...c, weeklyHours, annualCost };
      })
      .sort((a, b) => b.annualCost - a.annualCost);
  }, [teamSize, hourlyRate, clients, checked]);

  const totalAnnualCost = useMemo(() => {
    return categoryBreakdown.reduce((sum, c) => sum + c.annualCost, 0);
  }, [categoryBreakdown]);

  const potentialSavings = totalAnnualCost * 0.7;
  const remainingCost = totalAnnualCost * 0.3;
  const maxCategoryCost = categoryBreakdown.length > 0 ? categoryBreakdown[0].annualCost : 1;

  const handleToggle = useCallback((key) => {
    setChecked(prev => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const handlePresetRate = useCallback((rate) => {
    setHourlyRate(rate);
    setIsCustomRate(false);
    setCustomRate('');
  }, []);

  const handleCustomRate = useCallback((e) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setCustomRate(val);
    if (val && parseInt(val) > 0) {
      setHourlyRate(parseInt(val));
      setIsCustomRate(true);
    }
  }, []);

  const handleSendResults = useCallback(async () => {
    if (isSendingResults) return;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSendStatus({ type: 'error', message: 'Enter a valid email address.' });
      return;
    }

    setIsSendingResults(true);
    setSendStatus(null);

    try {
      // Test mode: skip API call when running locally
      const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      if (isLocalhost) {
        setSendStatus({ type: 'success', message: 'Email sent! Generating PDF...' });
      } else {
        const response = await fetch('/api/calculator-results', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            teamSize,
            hourlyRate,
            clients,
            totalAnnualCost,
            potentialSavings,
            remainingCost,
            categoryBreakdown: categoryBreakdown.map(cat => ({
              label: cat.label,
              weeklyHours: cat.weeklyHours,
              annualCost: cat.annualCost,
            })),
          }),
        });

        if (!response.ok) {
          const data = await response.json().catch(() => null);
          throw new Error(data?.error || 'Unable to send results. Please try again.');
        }

        setSendStatus({ type: 'success', message: 'Email sent! Generating PDF...' });
      }

      // Generate PDF after successful email send
      setTimeout(() => {
        generateResultsPDF({
          teamSize,
          hourlyRate,
          clients,
          totalAnnualCost,
          potentialSavings,
          remainingCost,
          categoryBreakdown,
        });
        setSendStatus({ type: 'success', message: 'Results sent and PDF downloaded.' });
      }, 1000);
    } catch (error) {
      setSendStatus({ type: 'error', message: error.message || 'Unable to send results.' });
    } finally {
      setIsSendingResults(false);
    }
  }, [
    isSendingResults,
    email,
    teamSize,
    hourlyRate,
    clients,
    totalAnnualCost,
    potentialSavings,
    remainingCost,
    categoryBreakdown,
  ]);

  // ─── Document title ───
  useEffect(() => {
    document.title = 'Hidden Cost Calculator | Peak Work Studios';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = 'Calculate how much manual work is costing your team. Free interactive calculator for professional service teams.';
    }
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.href = 'https://peakworkstudios.com/calculator';
  }, []);

  const chartMax = totalAnnualCost || 1;

  return (
    <PageWrapper>
      {/* ─── Hero ─── */}
      <HeroSection>
        <HeroHeadline>How Much Is Manual Work Costing Your Team?</HeroHeadline>
        <HeroSub>
          Most teams are surprised when they see the real numbers. Find out in 90 seconds.
        </HeroSub>
      </HeroSection>

      {/* ─── Calculator ─── */}
      <CalculatorSection>
        <InputPanel>
          <Card>
            <SectionTitle>Tell us about your team:</SectionTitle>

            {/* Team Size */}
            <FieldGroup>
              <FieldLabel>How many people are on your team?</FieldLabel>
              <HelpText>Project managers, account managers, designers, developers, copywriters</HelpText>
              <SliderRow>
                <StyledSlider
                  min={1}
                  max={50}
                  value={teamSize}
                  onChange={e => setTeamSize(parseInt(e.target.value))}
                />
                <SliderValue>{teamSize}</SliderValue>
              </SliderRow>
            </FieldGroup>

            {/* Hourly Rate */}
            <FieldGroup>
              <FieldLabel>Average hourly rate (internal cost):</FieldLabel>
              <HelpText>Think salary + benefits + overhead divided by billable hours</HelpText>
              <PresetRow>
                {RATE_PRESETS.map(rate => (
                  <PresetButton
                    key={rate}
                    $active={hourlyRate === rate && !isCustomRate}
                    onClick={() => handlePresetRate(rate)}
                  >
                    ${rate}
                  </PresetButton>
                ))}
                <CustomRateInput
                  placeholder="Custom"
                  value={customRate}
                  onChange={handleCustomRate}
                  onFocus={() => setIsCustomRate(true)}
                />
              </PresetRow>
            </FieldGroup>

            {/* Clients */}
            <FieldGroup>
              <FieldLabel>How many active clients or projects do you manage?</FieldLabel>
              <SliderRow>
                <StyledSlider
                  min={5}
                  max={100}
                  value={clients}
                  onChange={e => setClients(parseInt(e.target.value))}
                />
                <SliderValue>{clients}</SliderValue>
              </SliderRow>
            </FieldGroup>

            {/* Categories */}
            <FieldGroup>
              <FieldLabel>What's eating up your team's time?</FieldLabel>
              <HelpText>Select all that apply to your team</HelpText>
              <CheckboxList>
                {CATEGORIES.map(cat => (
                  <CheckboxItem key={cat.key} $checked={checked[cat.key]}>
                    <HiddenCheckbox
                      checked={checked[cat.key]}
                      onChange={() => handleToggle(cat.key)}
                    />
                    <CustomCheckbox $checked={checked[cat.key]} />
                    <CheckboxText>
                      <CheckboxLabel>{cat.label}</CheckboxLabel>
                      <CheckboxMeta>{cat.meta}</CheckboxMeta>
                    </CheckboxText>
                  </CheckboxItem>
                ))}
              </CheckboxList>
            </FieldGroup>
          </Card>
        </InputPanel>

        {/* ─── Results Panel ─── */}
        <ResultsPanel>
          <ResultsCard>
            <ResultsHeadline>Your Team Is Losing:</ResultsHeadline>
            <BigNumber>
              <AnimatedNumber value={totalAnnualCost} prefix="$" />
            </BigNumber>
            <div style={{ fontSize: '15px', fontWeight: 600, color: 'inherit', opacity: 0.6, marginBottom: 4 }}>
              per year
            </div>

            <SubBreakdown>
              <SubStat>
                <strong>{formatCurrency(totalAnnualCost / 12)}</strong>
                per month
              </SubStat>
              <SubStat>
                <strong>{formatCurrency(totalAnnualCost / 52)}</strong>
                per week
              </SubStat>
              <SubStat>
                <strong>{formatCurrency(totalAnnualCost / 260)}</strong>
                per day
              </SubStat>
            </SubBreakdown>

            {/* Equivalents */}
            <EquivalentSection>
              <EquivalentTitle>That's Equivalent To:</EquivalentTitle>
              <EquivalentItem>
                <Users size={18} />
                <span><strong>{formatNumber(totalAnnualCost / 52000)}</strong> full-time salaries (at $52k/yr)</span>
              </EquivalentItem>
              <EquivalentItem>
                <Building size={18} />
                <span><strong>{formatNumber(totalAnnualCost / 5000, 0)}</strong> months of office rent (at $5k/mo)</span>
              </EquivalentItem>
            </EquivalentSection>

            {/* Category Bars */}
            {categoryBreakdown.length > 0 && (
              <BarContainer>
                <EquivalentTitle style={{ marginTop: 24 }}>Cost Breakdown:</EquivalentTitle>
                {categoryBreakdown.map(cat => (
                  <BarItem key={cat.key}>
                    <BarLabel>
                      <span>{cat.label.split('(')[0].trim()}</span>
                      <BarAmount>{formatCurrency(cat.annualCost)}/yr</BarAmount>
                    </BarLabel>
                    <BarTrack>
                      <BarFill $width={(cat.annualCost / maxCategoryCost) * 100} />
                    </BarTrack>
                  </BarItem>
                ))}
              </BarContainer>
            )}
          </ResultsCard>
        </ResultsPanel>
      </CalculatorSection>

      <Divider />

      {/* ─── Opportunity Breakdown ─── */}
      {categoryBreakdown.length > 0 && (
        <FullWidthSection>
          <SectionTitle style={{ textAlign: 'center', fontSize: 'clamp(24px, 4vw, 32px)' }}>
            Here's What You Could Recover:
          </SectionTitle>
          <p style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 8px', fontSize: 16, opacity: 0.65 }}>
            With targeted automation, you can recover up to 70% of these costs.
          </p>
          <OpportunityGrid>
            {categoryBreakdown.map(cat => (
              <OpportunityCard key={cat.key}>
                <OpportunityHeader>
                  <CheckCircle size={20} />
                  <span style={{ fontWeight: 600, fontSize: 15 }}>{cat.label.split('(')[0].trim()}</span>
                </OpportunityHeader>
                <OpportunitySavings>Save {formatCurrency(cat.annualCost * 0.7)}/year</OpportunitySavings>
                <BulletList>
                  {cat.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </BulletList>
              </OpportunityCard>
            ))}
          </OpportunityGrid>
        </FullWidthSection>
      )}

      <Divider />

      {/* ─── Bar Chart ─── */}
      <FullWidthSection>
        <SectionTitle style={{ textAlign: 'center', fontSize: 'clamp(24px, 4vw, 32px)' }}>
          Annual Cost vs. Savings
        </SectionTitle>
        <ChartWrapper>
          <ChartBar>
            <ChartLabel>Current Annual Cost</ChartLabel>
            <ChartTrack>
              <ChartFill $width={100} $color="#ef4444">
                {formatCurrency(totalAnnualCost)}
              </ChartFill>
            </ChartTrack>
          </ChartBar>
          <ChartBar>
            <ChartLabel>Potential Savings</ChartLabel>
            <ChartTrack>
              <ChartFill
                $width={chartMax > 0 ? (potentialSavings / chartMax) * 100 : 0}
                $color="#10b981"
              >
                {formatCurrency(potentialSavings)}
              </ChartFill>
            </ChartTrack>
          </ChartBar>
          <ChartBar>
            <ChartLabel>Remaining Cost</ChartLabel>
            <ChartTrack>
              <ChartFill
                $width={chartMax > 0 ? (remainingCost / chartMax) * 100 : 0}
                $color="#6B7280"
              >
                {formatCurrency(remainingCost)}
              </ChartFill>
            </ChartTrack>
          </ChartBar>
        </ChartWrapper>
      </FullWidthSection>

      <Divider />

      {/* ─── CTA ─── */}
      <CTASection>
        <SectionTitle style={{ fontSize: 'clamp(24px, 4vw, 32px)', textAlign: 'center' }}>
          Want The Full Automation Roadmap?
        </SectionTitle>
        <CTAGrid>
          <CTACard $primary>
            <CTACardTitle>Get Your Free 30-Minute Audit</CTACardTitle>
            <BulletList style={{ marginBottom: 24 }}>
              <li>Personalized automation roadmap for your team</li>
              <li>Top 3 quick wins ranked by ROI</li>
              <li>Implementation timeline and cost estimates</li>
              <li>No obligation, no sales pressure</li>
            </BulletList>
            <CTAButton to="/contact">
              Book Your Audit <ArrowRight size={16} />
            </CTAButton>
          </CTACard>

          <CTACard>
            <CTACardTitle>Download Your Results</CTACardTitle>
            <BulletList style={{ marginBottom: 24 }}>
              <li>PDF summary of your cost breakdown</li>
              <li>Category-by-category savings estimates</li>
              <li>Share with your team or partners</li>
              <li>Reference for future planning</li>
            </BulletList>
            <EmailRow>
              <EmailInput
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <EmailButton onClick={handleSendResults} disabled={isSendingResults}>
                <Download size={16} />
              </EmailButton>
            </EmailRow>
            {sendStatus && (
              <EmailStatus $type={sendStatus.type}>{sendStatus.message}</EmailStatus>
            )}
          </CTACard>
        </CTAGrid>
      </CTASection>

      <Divider />

      <Disclaimer>
        These estimates are based on industry averages and the inputs you provided. Actual results will vary depending on your
        specific workflows, tools, and team structure. This calculator is intended to give a directional sense of where time
        is being spent — not a guarantee of savings.
      </Disclaimer>
    </PageWrapper>
  );
};

export default CalculatorPage;
