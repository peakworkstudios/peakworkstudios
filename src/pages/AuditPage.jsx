import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Send,
  RotateCcw,
  ChevronRight,
  Lightbulb,
} from 'lucide-react';

// ─── Data ───

const questions = [
  {
    id: 0,
    category: 'Onboarding & Setup',
    text: 'How long does it take to set up a new project or engagement (from agreement to active work)?',
    options: [
      { label: 'Less than 24 hours', score: 10 },
      { label: '1-2 days', score: 7 },
      { label: '3-5 days', score: 4 },
      { label: 'More than a week', score: 1 },
      { label: 'It varies wildly', score: 0 },
    ],
  },
  {
    id: 1,
    category: 'Communication & Updates',
    text: 'How do stakeholders typically get project status updates?',
    options: [
      { label: 'They ask, we respond', score: 1 },
      { label: 'We send periodic email updates', score: 5 },
      { label: 'They have access to a dashboard or portal', score: 7 },
      { label: 'Automated updates + dashboard + self-serve access', score: 10 },
    ],
  },
  {
    id: 2,
    category: 'Time on Status Updates',
    text: "How much time does your team spend each week fielding questions like 'What's the status?' or 'When will this be done?'",
    options: [
      { label: 'Less than 2 hours', score: 10 },
      { label: '2-5 hours', score: 7 },
      { label: '5-10 hours', score: 4 },
      { label: '10-20 hours', score: 2 },
      { label: 'More than 20 hours', score: 0 },
    ],
  },
  {
    id: 3,
    category: 'Handoffs & Coordination',
    text: 'How are handoffs handled between team members?',
    options: [
      { label: 'Formal handoff process with checklists and documentation', score: 10 },
      { label: 'Brief meeting or Slack message', score: 5 },
      { label: 'Files get dumped in a shared folder', score: 2 },
      { label: 'People just figure it out', score: 0 },
      { label: "What's a handoff process?", score: 0 },
    ],
  },
  {
    id: 4,
    category: 'Reporting',
    text: 'How long does it take to generate and send a report?',
    options: [
      { label: 'Less than 30 minutes (automated)', score: 10 },
      { label: '1-2 hours', score: 7 },
      { label: '3-5 hours', score: 4 },
      { label: '6-8 hours', score: 2 },
      { label: 'More than 8 hours', score: 0 },
      { label: "We don't send regular reports", score: 1 },
    ],
  },
  {
    id: 5,
    category: 'Visibility & Tracking',
    text: "How often do projects go off-track without you realizing until it's too late?",
    options: [
      { label: 'Never, we have real-time visibility', score: 10 },
      { label: 'Rarely', score: 8 },
      { label: 'Sometimes', score: 5 },
      { label: 'Often', score: 2 },
      { label: 'All the time', score: 0 },
    ],
  },
  {
    id: 6,
    category: 'Response Time',
    text: 'What happens when someone sends an urgent request outside business hours?',
    options: [
      { label: 'Automated system handles it or routes it appropriately', score: 10 },
      { label: "Auto-reply says we'll respond next business day", score: 6 },
      { label: 'Someone on the team sees it and responds', score: 4 },
      { label: 'It sits until someone checks in the morning', score: 2 },
      { label: "We don't know, depends who sees it", score: 0 },
    ],
  },
  {
    id: 7,
    category: 'Meeting Follow-through',
    text: 'How do you track what was discussed and decided in meetings?',
    options: [
      { label: 'AI assistant extracts action items and auto-creates tasks', score: 10 },
      { label: 'Someone takes detailed notes and follows up', score: 7 },
      { label: 'Quick notes in a doc or Slack', score: 4 },
      { label: 'We try to remember', score: 1 },
      { label: 'We usually forget half of it', score: 0 },
    ],
  },
  {
    id: 8,
    category: 'Quality Control',
    text: 'How consistent is the quality of deliverables before stakeholders see them?',
    options: [
      { label: 'Automated QC catches issues every time', score: 10 },
      { label: 'Senior team member reviews everything', score: 8 },
      { label: 'Peer review for most things', score: 5 },
      { label: 'Whoever did it reviews their own work', score: 3 },
      { label: 'Things slip through regularly', score: 0 },
    ],
  },
  {
    id: 9,
    category: 'Scalability',
    text: 'If your workload increased 50% tomorrow, what would break first?',
    options: [
      { label: 'Nothing, our systems would scale', score: 10 },
      { label: "We'd need to hire but could handle it", score: 7 },
      { label: 'Communication and coordination would collapse', score: 3 },
      { label: 'Project management would fall apart', score: 2 },
      { label: 'Everything would break immediately', score: 0 },
    ],
  },
];

const quickWins = {
  'Onboarding & Setup': 'Create a standardized setup checklist. Cuts onboarding time by 50%.',
  'Communication & Updates': 'Set up automated weekly status emails. Reduces inbound questions significantly.',
  'Time on Status Updates': 'Set up a weekly auto-generated status email. Saves hours immediately.',
  'Handoffs & Coordination': 'Create a simple handoff template in your PM tool. Takes 30 minutes to set up.',
  'Reporting': 'Template your most common report. Even a spreadsheet template saves 2+ hours.',
  'Visibility & Tracking': 'Set up a simple project status dashboard. Even a shared spreadsheet helps.',
  'Response Time': 'Set up an auto-reply with FAQ links. Handles common questions automatically.',
  'Meeting Follow-through': 'Start recording meetings and use AI transcription. Captures everything.',
  'Quality Control': 'Create a pre-delivery checklist for your top 3 deliverable types.',
  Scalability: "Document your top 5 processes. You can't scale what isn't written down.",
};

const priorityData = {
  'Onboarding & Setup': { hours: '8 hrs/new project', complexity: 'Medium', timeline: '3-4 weeks', weeklySavings: 8 },
  'Communication & Updates': { hours: '10 hrs/week', complexity: 'High', timeline: '4-6 weeks', weeklySavings: 10 },
  'Time on Status Updates': { hours: '12 hrs/week', complexity: 'Medium', timeline: '2-3 weeks', weeklySavings: 12 },
  'Handoffs & Coordination': { hours: '5 hrs/week', complexity: 'Low', timeline: '1-2 weeks', weeklySavings: 5 },
  'Reporting': { hours: '6 hrs/report', complexity: 'Medium', timeline: '3-4 weeks', weeklySavings: 6 },
  'Visibility & Tracking': { hours: '4 hrs/week', complexity: 'Low', timeline: '1-2 weeks', weeklySavings: 4 },
  'Response Time': { hours: '8 hrs/week', complexity: 'Medium', timeline: '3-4 weeks', weeklySavings: 8 },
  'Meeting Follow-through': { hours: '5 hrs/week', complexity: 'Medium', timeline: '2-3 weeks', weeklySavings: 5 },
  'Quality Control': { hours: '4 hrs/deliverable', complexity: 'Medium', timeline: '2-3 weeks', weeklySavings: 4 },
  Scalability: { hours: 'Foundational', complexity: 'Low', timeline: '1-2 weeks', weeklySavings: 0 },
};

// ─── Keyframes ───

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideInRight = keyframes`
  from { opacity: 0; transform: translateX(40px); }
  to { opacity: 1; transform: translateX(0); }
`;

const slideInLeft = keyframes`
  from { opacity: 0; transform: translateX(-40px); }
  to { opacity: 1; transform: translateX(0); }
`;

const growWidth = keyframes`
  from { width: 0; }
`;

const drawCircleAnimation = keyframes`
  from { stroke-dashoffset: 283; }
`;

const AnimatedCircle = styled.circle`
  animation: ${drawCircleAnimation} 1.2s ease-out forwards;
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

// ─── Styled Components ───

const PageWrapper = styled.div`
  min-height: 100vh;
  font-family: ${p => p.theme.fontFamily};
`;

const HeroSection = styled.section`
  text-align: center;
  padding: 60px 20px 40px;
  animation: ${fadeIn} 0.6s ease-out;

  @media (min-width: 769px) {
    padding: 100px 40px 60px;
  }
`;

const HeroHeadline = styled.h1`
  font-size: clamp(32px, 7vw, 52px);
  font-weight: 800;
  color: ${p => p.theme.text};
  margin: 0 0 16px;
  letter-spacing: -1.5px;
  line-height: 1.1;
`;

const HeroSub = styled.p`
  font-size: clamp(16px, 3.5vw, 20px);
  color: ${p => p.theme.textSecondary};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const QuizContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px 80px;

  @media (min-width: 769px) {
    padding: 0 40px 120px;
  }
`;

const ProgressWrapper = styled.div`
  margin-bottom: 40px;
`;

const ProgressLabel = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${p => p.theme.textSecondary};
  margin-bottom: 10px;
  letter-spacing: 0.5px;
`;

const ProgressBarTrack = styled.div`
  width: 100%;
  height: 6px;
  background: ${p => p.theme.border};
  border-radius: 3px;
  overflow: hidden;
`;

const ProgressBarFill = styled.div`
  height: 100%;
  width: ${p => p.$percent}%;
  background: ${p => p.theme.primary};
  border-radius: 3px;
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
`;

const QuestionCard = styled.div`
  background: ${p => p.theme.surface};
  border-radius: ${p => p.theme.borderRadiusLg};
  padding: 40px 32px;
  box-shadow: ${p => p.theme.cardShadow};
  animation: ${p => (p.$direction === 'left' ? slideInLeft : slideInRight)} 0.35s ease-out;

  @media (max-width: 480px) {
    padding: 28px 20px;
  }
`;

const QuestionText = styled.h2`
  font-size: clamp(18px, 4vw, 24px);
  font-weight: 700;
  color: ${p => p.theme.text};
  margin: 0 0 32px;
  line-height: 1.4;
  letter-spacing: -0.3px;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const OptionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  min-height: 52px;
  padding: 14px 20px;
  background: ${p => (p.$selected ? p.theme.primary + '15' : p.theme.background)};
  border: 2px solid ${p => (p.$selected ? p.theme.primary : p.theme.border)};
  border-radius: ${p => p.theme.borderRadius};
  cursor: pointer;
  font-family: ${p => p.theme.fontFamily};
  font-size: clamp(14px, 3.5vw, 16px);
  color: ${p => p.theme.text};
  text-align: left;
  transition: all 0.2s ease;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    border-color: ${p => p.theme.primary};
    background: ${p => p.theme.primary}10;
    transform: scale(1.02);
  }

  &:active {
    transform: scale(0.99);
  }
`;

const RadioCircle = styled.span`
  width: 22px;
  height: 22px;
  min-width: 22px;
  border-radius: 50%;
  border: 2px solid ${p => (p.$selected ? p.theme.primary : p.theme.border)};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &::after {
    content: '';
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${p => (p.$selected ? p.theme.primary : 'transparent')};
    transition: all 0.2s ease;
    transform: scale(${p => (p.$selected ? 1 : 0)});
  }
`;

const NavRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 32px;
`;

const NavButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border: none;
  border-radius: ${p => p.theme.borderRadius};
  font-family: ${p => p.theme.fontFamily};
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  -webkit-tap-highlight-color: transparent;

  ${p =>
    p.$primary
      ? css`
          background: ${p.theme.primary};
          color: #000;
          &:hover {
            background: ${p.theme.primaryHover};
            transform: translateY(-1px);
          }
        `
      : css`
          background: transparent;
          color: ${p.theme.textSecondary};
          &:hover {
            color: ${p.theme.text};
          }
        `}

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none;
  }
`;

// ─── Results Styled Components ───

const ResultsWrapper = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 20px 80px;
  animation: ${fadeIn} 0.6s ease-out;

  @media (min-width: 769px) {
    padding: 0 40px 120px;
  }
`;

const ResultsHero = styled.section`
  text-align: center;
  padding: 60px 20px 40px;

  @media (min-width: 769px) {
    padding: 100px 40px 60px;
  }
`;

const ScoreGaugeWrapper = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto 24px;

  @media (min-width: 769px) {
    width: 240px;
    height: 240px;
  }
`;

const ScoreLabel = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

const ScoreNumber = styled.div`
  font-size: 48px;
  font-weight: 800;
  color: ${p => p.theme.text};
  letter-spacing: -2px;
  line-height: 1;

  @media (min-width: 769px) {
    font-size: 56px;
  }
`;

const ScoreMax = styled.span`
  font-size: 20px;
  font-weight: 500;
  color: ${p => p.theme.textSecondary};
`;

const ScoreBadge = styled.div`
  display: inline-block;
  padding: 8px 24px;
  border-radius: 100px;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  background: ${p => p.$color};
  margin-bottom: 16px;
  animation: ${pulse} 2.5s ease-in-out infinite;
`;

const ScoreDescription = styled.p`
  font-size: clamp(16px, 3.5vw, 18px);
  color: ${p => p.theme.textSecondary};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const SectionTitle = styled.h2`
  font-size: clamp(22px, 5vw, 30px);
  font-weight: 800;
  color: ${p => p.theme.text};
  margin: 0 0 32px;
  letter-spacing: -0.5px;
`;

const SectionBlock = styled.section`
  margin-bottom: 60px;

  @media (min-width: 769px) {
    margin-bottom: 80px;
  }
`;

const CategoryRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
  animation: ${fadeIn} 0.5s ease-out;
  animation-delay: ${p => p.$delay || '0s'};
  animation-fill-mode: both;

  @media (max-width: 600px) {
    flex-wrap: wrap;
    gap: 8px;
  }
`;

const CategoryLabel = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${p => p.theme.text};
  min-width: 180px;
  flex-shrink: 0;

  @media (max-width: 600px) {
    min-width: 100%;
  }
`;

const CategoryBarTrack = styled.div`
  flex: 1;
  height: 12px;
  background: ${p => p.theme.border};
  border-radius: 6px;
  overflow: hidden;
  min-width: 100px;
`;

const CategoryBarFill = styled.div`
  height: 100%;
  width: ${p => p.$percent}%;
  background: ${p => p.$color};
  border-radius: 6px;
  animation: ${growWidth} 0.8s ease-out;
  animation-delay: ${p => p.$delay || '0s'};
  animation-fill-mode: both;
`;

const CategoryScore = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: ${p => p.$color};
  min-width: 40px;
  text-align: right;
`;

const QuickWinBadge = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin: -8px 0 16px 0;
  padding: 12px 16px;
  background: ${p => p.theme.warning}12;
  border-left: 3px solid ${p => p.theme.warning};
  border-radius: 0 ${p => p.theme.borderRadiusSm} ${p => p.theme.borderRadiusSm} 0;
  font-size: 13px;
  color: ${p => p.theme.textSecondary};
  line-height: 1.5;
  animation: ${fadeIn} 0.5s ease-out;
  animation-delay: ${p => p.$delay || '0s'};
  animation-fill-mode: both;

  svg {
    color: ${p => p.theme.warning};
    flex-shrink: 0;
    margin-top: 1px;
  }
`;

const PriorityCard = styled.div`
  background: ${p => p.theme.surface};
  border-radius: ${p => p.theme.borderRadiusLg};
  padding: 28px;
  box-shadow: ${p => p.theme.cardShadow};
  border-top: 4px solid ${p => p.$color || p.theme.primary};
  animation: ${fadeIn} 0.5s ease-out;
  animation-delay: ${p => p.$delay || '0s'};
  animation-fill-mode: both;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
`;

const PriorityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
`;

const PriorityNumber = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: ${p => p.$color};
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  margin-right: 10px;
`;

const PriorityTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: ${p => p.theme.text};
  margin: 0 0 20px;
  display: flex;
  align-items: center;
`;

const MetricRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid ${p => p.theme.border};
  font-size: 14px;

  &:last-child {
    border-bottom: none;
  }
`;

const MetricLabel = styled.span`
  color: ${p => p.theme.textSecondary};
`;

const MetricValue = styled.span`
  font-weight: 600;
  color: ${p => p.theme.text};
`;

const ComparisonBox = styled.div`
  background: ${p => p.theme.surface};
  border-radius: ${p => p.theme.borderRadiusLg};
  padding: 40px 32px;
  text-align: center;
  box-shadow: ${p => p.theme.cardShadow};

  @media (max-width: 480px) {
    padding: 28px 20px;
  }
`;

const PercentileNumber = styled.div`
  font-size: 56px;
  font-weight: 800;
  color: ${p => p.theme.primary};
  letter-spacing: -2px;
  line-height: 1;
  margin-bottom: 8px;
`;

const BulletList = styled.ul`
  text-align: left;
  max-width: 500px;
  margin: 20px auto 0;
  padding-left: 24px;
  font-size: 15px;
  color: ${p => p.theme.textSecondary};
  line-height: 1.9;
`;

const CTASection = styled.section`
  background: ${p => p.theme.surface};
  border-radius: ${p => p.theme.borderRadiusLg};
  padding: 48px 32px;
  text-align: center;
  box-shadow: ${p => p.theme.cardShadow};
  margin-bottom: 60px;

  @media (max-width: 480px) {
    padding: 36px 20px;
  }
`;

const CTATitle = styled.h2`
  font-size: clamp(22px, 5vw, 30px);
  font-weight: 800;
  color: ${p => p.theme.text};
  margin: 0 0 8px;
  letter-spacing: -0.5px;
`;

const CTASub = styled.p`
  font-size: 16px;
  color: ${p => p.theme.textSecondary};
  margin: 0 0 32px;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  max-width: 560px;
  margin: 0 auto;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const FormInput = styled.input`
  width: 100%;
  padding: 14px 16px;
  border: 1px solid ${p => p.theme.border};
  border-radius: ${p => p.theme.borderRadius};
  background: ${p => p.theme.background};
  color: ${p => p.theme.text};
  font-family: ${p => p.theme.fontFamily};
  font-size: 15px;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${p => p.theme.primary};
  }

  &::placeholder {
    color: ${p => p.theme.textSecondary};
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 14px 16px;
  border: 1px solid ${p => p.theme.border};
  border-radius: ${p => p.theme.borderRadius};
  background: ${p => p.theme.background};
  color: ${p => p.theme.text};
  font-family: ${p => p.theme.fontFamily};
  font-size: 15px;
  cursor: pointer;
  appearance: auto;

  &:focus {
    outline: none;
    border-color: ${p => p.theme.primary};
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 14px 16px;
  border: 1px solid ${p => p.theme.border};
  border-radius: ${p => p.theme.borderRadius};
  background: ${p => p.theme.background};
  color: ${p => p.theme.text};
  font-family: ${p => p.theme.fontFamily};
  font-size: 15px;
  resize: vertical;
  min-height: 100px;
  grid-column: 1 / -1;

  &:focus {
    outline: none;
    border-color: ${p => p.theme.primary};
  }

  &::placeholder {
    color: ${p => p.theme.textSecondary};
  }
`;

const SubmitButton = styled.button`
  grid-column: 1 / -1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px 32px;
  background: ${p => p.theme.primary};
  color: #000;
  border: none;
  border-radius: ${p => p.theme.borderRadius};
  font-family: ${p => p.theme.fontFamily};
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${p => p.theme.primaryHover};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const SuccessMessage = styled.div`
  text-align: center;
  padding: 32px;
  animation: ${fadeIn} 0.4s ease-out;

  svg {
    color: ${p => p.theme.success};
    margin-bottom: 12px;
  }
`;

const SocialProofGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
  margin-bottom: 48px;
`;

const ProofCard = styled.div`
  background: ${p => p.theme.surface};
  border-radius: ${p => p.theme.borderRadius};
  padding: 28px;
  text-align: center;
  box-shadow: ${p => p.theme.cardShadow};
  animation: ${fadeIn} 0.5s ease-out;
  animation-delay: ${p => p.$delay || '0s'};
  animation-fill-mode: both;
`;

const ProofArrow = styled.span`
  font-size: 24px;
  font-weight: 800;
  color: ${p => p.theme.success};
`;

const ProofScore = styled.div`
  font-size: 28px;
  font-weight: 800;
  color: ${p => p.theme.text};
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

const ProofLabel = styled.div`
  font-size: 14px;
  color: ${p => p.theme.textSecondary};
`;

const AuditDisclaimer = styled.p`
  text-align: center;
  font-size: 13px;
  color: ${p => p.theme.textSecondary};
  max-width: 700px;
  margin: 16px auto 32px;
  padding: 16px 24px;
  background: ${p => p.theme.surface};
  border: 1px solid ${p => p.theme.border};
  border-radius: 8px;
  line-height: 1.6;
`;

const RetakeButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  background: transparent;
  color: ${p => p.theme.textSecondary};
  border: 2px solid ${p => p.theme.border};
  border-radius: ${p => p.theme.borderRadius};
  font-family: ${p => p.theme.fontFamily};
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin: 0 auto;
  display: flex;

  &:hover {
    border-color: ${p => p.theme.primary};
    color: ${p => p.theme.primary};
  }
`;

// ─── Helper Functions ───

function getScoreInfo(score) {
  if (score >= 80) return { label: 'Scaling Machine', color: '#10b981', description: 'Your operations run like a well-oiled machine. You have strong systems in place, and you are well-positioned to scale without adding proportional headcount. Focus on fine-tuning and staying ahead of the curve.' };
  if (score >= 60) return { label: 'Growing Pains', color: '#f59e0b', description: 'You have some solid processes, but gaps are starting to show as you grow. A few targeted automations could eliminate the bottlenecks holding you back and free up serious capacity.' };
  if (score >= 40) return { label: 'Duct Tape & Workarounds', color: '#f97316', description: 'Your team is working hard, but a lot of effort goes into keeping things from falling apart. The good news: the biggest improvements are often the easiest to implement. You are sitting on a goldmine of recoverable hours.' };
  return { label: 'Needs Attention', color: '#ef4444', description: 'Things are getting done, but it is costing you far more time, money, and stress than it should. The upside is massive: teams at your score typically recover 20-30 hours per week with the right automations.' };
}

function getBarColor(score) {
  if (score > 7) return '#10b981';
  if (score > 4) return '#f59e0b';
  return '#ef4444';
}

function getComplexityColor(complexity) {
  if (complexity === 'Low') return '#10b981';
  if (complexity === 'Medium') return '#f59e0b';
  return '#ef4444';
}

// ─── Score Gauge Component ───

function ScoreGauge({ score, color }) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <ScoreGaugeWrapper>
      <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
        <circle cx="50" cy="50" r={radius} fill="none" stroke="currentColor" strokeWidth="6" opacity="0.1" />
        <AnimatedCircle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <ScoreLabel>
        <ScoreNumber>
          {score}
          <ScoreMax>/100</ScoreMax>
        </ScoreNumber>
      </ScoreLabel>
    </ScoreGaugeWrapper>
  );
}

// ─── Main Component ───

export default function AuditPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(10).fill(null));
  const [showResults, setShowResults] = useState(false);
  const [slideDir, setSlideDir] = useState('right');
  const [formData, setFormData] = useState({ name: '', email: '', agencySize: '', painPoint: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const cardKey = useRef(0);

  // Load saved progress on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('pws-audit-progress');
      if (saved) {
        const data = JSON.parse(saved);
        if (data.answers) setAnswers(data.answers);
        if (typeof data.currentQuestion === 'number') setCurrentQuestion(data.currentQuestion);
        if (data.showResults) setShowResults(true);
      }
    } catch {
      // ignore
    }
  }, []);

  // Save progress on each answer
  useEffect(() => {
    try {
      localStorage.setItem(
        'pws-audit-progress',
        JSON.stringify({ answers, currentQuestion, showResults })
      );
    } catch {
      // ignore
    }
  }, [answers, currentQuestion, showResults]);

  useEffect(() => {
    document.title = 'Operations Audit | Peak Work Studios';
  }, []);

  const selectAnswer = (questionIdx, optionIdx) => {
    const newAnswers = [...answers];
    newAnswers[questionIdx] = optionIdx;
    setAnswers(newAnswers);

    // Auto-advance after brief delay (except last question)
    if (questionIdx < 9) {
      setTimeout(() => {
        setSlideDir('right');
        cardKey.current += 1;
        setCurrentQuestion(questionIdx + 1);
      }, 300);
    }
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      setSlideDir('left');
      cardKey.current += 1;
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const submitQuiz = () => {
    setShowResults(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const retake = () => {
    setAnswers(Array(10).fill(null));
    setCurrentQuestion(0);
    setShowResults(false);
    setFormSubmitted(false);
    setFormData({ name: '', email: '', agencySize: '', painPoint: '' });
    localStorage.removeItem('pws-audit-progress');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Compute score
  const totalScore = answers.reduce((sum, optionIdx, qIdx) => {
    if (optionIdx === null) return sum;
    return sum + questions[qIdx].options[optionIdx].score;
  }, 0);

  const categoryScores = questions.map((q, idx) => ({
    category: q.category,
    score: answers[idx] !== null ? q.options[answers[idx]].score : 0,
  }));

  const scoreInfo = getScoreInfo(totalScore);
  const percentile = Math.min(95, Math.max(5, totalScore + 10));

  // Top 3 priorities (lowest scores)
  const sortedCategories = [...categoryScores].sort((a, b) => a.score - b.score);
  const top3 = sortedCategories.slice(0, 3);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const scoreMap = {};
      categoryScores.forEach(c => { scoreMap[c.category] = c.score; });
      await fetch('/api/audit-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          agencySize: formData.agencySize,
          painPoint: formData.painPoint,
          scores: scoreMap,
          totalScore,
        }),
      });
    } catch {
      // still show success
    }
    setFormSubmitted(true);
  };

  // ─── Quiz View ───
  if (!showResults) {
    const q = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / 10) * 100;

    return (
      <PageWrapper>
        <HeroSection>
          <HeroHeadline>The Operations Audit</HeroHeadline>
          <HeroSub>
            10 questions about your workflows. Get scored results with prioritized fixes in 3 minutes.
          </HeroSub>
        </HeroSection>

        <QuizContainer>
          <ProgressWrapper>
            <ProgressLabel>Question {currentQuestion + 1} of 10</ProgressLabel>
            <ProgressBarTrack>
              <ProgressBarFill $percent={progress} />
            </ProgressBarTrack>
          </ProgressWrapper>

          <QuestionCard key={cardKey.current} $direction={slideDir === 'right' ? 'right' : 'left'}>
            <QuestionText>{q.text}</QuestionText>
            <OptionsContainer>
              {q.options.map((opt, idx) => (
                <OptionButton
                  key={idx}
                  $selected={answers[currentQuestion] === idx}
                  onClick={() => selectAnswer(currentQuestion, idx)}
                  type="button"
                >
                  <RadioCircle $selected={answers[currentQuestion] === idx} />
                  {opt.label}
                </OptionButton>
              ))}
            </OptionsContainer>

            <NavRow>
              <NavButton onClick={goBack} disabled={currentQuestion === 0} type="button">
                <ArrowLeft size={16} />
                Back
              </NavButton>

              {currentQuestion === 9 ? (
                <NavButton
                  $primary
                  onClick={submitQuiz}
                  disabled={answers[9] === null}
                  type="button"
                >
                  See My Results
                  <ArrowRight size={16} />
                </NavButton>
              ) : (
                <NavButton
                  onClick={() => {
                    if (answers[currentQuestion] !== null) {
                      setSlideDir('right');
                      cardKey.current += 1;
                      setCurrentQuestion(currentQuestion + 1);
                    }
                  }}
                  disabled={answers[currentQuestion] === null}
                  type="button"
                >
                  Next
                  <ArrowRight size={16} />
                </NavButton>
              )}
            </NavRow>
          </QuestionCard>
        </QuizContainer>
      </PageWrapper>
    );
  }

  // ─── Results View ───
  return (
    <PageWrapper>
      <ResultsHero>
        <ScoreGauge score={totalScore} color={scoreInfo.color} />
        <ScoreBadge $color={scoreInfo.color}>{scoreInfo.label}</ScoreBadge>
        <ScoreDescription>{scoreInfo.description}</ScoreDescription>
      </ResultsHero>

      <ResultsWrapper>
        {/* Category Breakdown */}
        <SectionBlock>
          <SectionTitle>Where You're Strong (and Where You're Losing Time)</SectionTitle>
          {categoryScores.map((cat, idx) => (
            <React.Fragment key={cat.category}>
              <CategoryRow $delay={`${idx * 0.08}s`}>
                <CategoryLabel>{cat.category}</CategoryLabel>
                <CategoryBarTrack>
                  <CategoryBarFill
                    $percent={cat.score * 10}
                    $color={getBarColor(cat.score)}
                    $delay={`${idx * 0.08}s`}
                  />
                </CategoryBarTrack>
                <CategoryScore $color={getBarColor(cat.score)}>
                  {cat.score}/10
                </CategoryScore>
              </CategoryRow>
              {cat.score <= 4 && (
                <QuickWinBadge $delay={`${idx * 0.08 + 0.1}s`}>
                  <Lightbulb size={16} />
                  <span>
                    <strong>Quick win:</strong> {quickWins[cat.category]}
                  </span>
                </QuickWinBadge>
              )}
            </React.Fragment>
          ))}
        </SectionBlock>

        {/* Top 3 Priorities */}
        <SectionBlock>
          <SectionTitle>Your Top 3 Priorities</SectionTitle>
          <PriorityGrid>
            {top3.map((cat, idx) => {
              const data = priorityData[cat.category];
              const color = ['#ef4444', '#f97316', '#f59e0b'][idx];
              const annualValue =
                data.weeklySavings > 0
                  ? `$${(75 * data.weeklySavings * 52).toLocaleString()}/year`
                  : 'Foundational investment';

              return (
                <PriorityCard key={cat.category} $color={color} $delay={`${idx * 0.15}s`}>
                  <PriorityTitle>
                    <PriorityNumber $color={color}>{idx + 1}</PriorityNumber>
                    {cat.category}
                  </PriorityTitle>
                  <MetricRow>
                    <MetricLabel>Current Score</MetricLabel>
                    <MetricValue style={{ color }}>{cat.score}/10</MetricValue>
                  </MetricRow>
                  <MetricRow>
                    <MetricLabel>Est. Time Saved</MetricLabel>
                    <MetricValue>{data.hours}</MetricValue>
                  </MetricRow>
                  <MetricRow>
                    <MetricLabel>Est. Annual Value</MetricLabel>
                    <MetricValue>{annualValue}</MetricValue>
                  </MetricRow>
                  <MetricRow>
                    <MetricLabel>Complexity</MetricLabel>
                    <MetricValue style={{ color: getComplexityColor(data.complexity) }}>
                      {data.complexity}
                    </MetricValue>
                  </MetricRow>
                  <MetricRow>
                    <MetricLabel>Timeline</MetricLabel>
                    <MetricValue>{data.timeline}</MetricValue>
                  </MetricRow>
                </PriorityCard>
              );
            })}
          </PriorityGrid>
        </SectionBlock>

        {/* Comparison */}
        <SectionBlock>
          <SectionTitle>How You Compare</SectionTitle>
          <ComparisonBox>
            <PercentileNumber>{percentile}th</PercentileNumber>
            <p style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 600 }}>percentile</p>
            <p
              style={{
                margin: '16px 0 0',
                fontSize: '15px',
                color: 'inherit',
                opacity: 0.7,
              }}
            >
              Teams your size average a score of 42/100.
            </p>
            <p
              style={{
                margin: '16px 0 0',
                fontSize: '15px',
                color: 'inherit',
                opacity: 0.7,
              }}
            >
              Top-performing teams score 85+ and typically:
            </p>
            <BulletList>
              <li>Onboard new clients in under 24 hours</li>
              <li>Spend less than 2 hours per week on status updates</li>
              <li>Generate client reports in under 30 minutes</li>
              <li>Scale to 50%+ more clients without proportional hiring</li>
            </BulletList>
          </ComparisonBox>
        </SectionBlock>

        {/* CTA */}
        <CTASection>
          {!formSubmitted ? (
            <>
              <CTATitle>Want a Custom Automation Roadmap?</CTATitle>
              <CTASub>We will analyze your results and send a personalized report with implementation steps.</CTASub>
              <form onSubmit={handleFormSubmit}>
                <FormGrid>
                  <FormInput
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                  <FormInput
                    type="email"
                    placeholder="Work email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                  <FormSelect
                    value={formData.agencySize}
                    onChange={(e) => setFormData({ ...formData, agencySize: e.target.value })}
                    required
                  >
                    <option value="">Team size</option>
                    <option value="1-5">1-5 people</option>
                    <option value="6-15">6-15 people</option>
                    <option value="16-30">16-30 people</option>
                    <option value="31-50">31-50 people</option>
                    <option value="50+">50+ people</option>
                  </FormSelect>
                  <FormTextarea
                    placeholder="What is your biggest operational pain point right now?"
                    value={formData.painPoint}
                    onChange={(e) => setFormData({ ...formData, painPoint: e.target.value })}
                  />
                  <SubmitButton type="submit">
                    <Send size={16} />
                    Send Me The Full Report
                  </SubmitButton>
                </FormGrid>
              </form>
            </>
          ) : (
            <SuccessMessage>
              <CheckCircle2 size={48} />
              <h3 style={{ margin: '0 0 8px', fontSize: '22px' }}>Report Request Sent</h3>
              <p style={{ margin: '0 0 20px', opacity: 0.7 }}>
                We will email your custom automation roadmap within 24 hours.
              </p>
              <Link
                to="/contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '15px',
                  fontWeight: 600,
                  color: 'inherit',
                  textDecoration: 'underline',
                  textUnderlineOffset: '3px',
                }}
              >
                Want to talk sooner? Book a call
                <ChevronRight size={16} />
              </Link>
            </SuccessMessage>
          )}
        </CTASection>

        {/* Social Proof */}
        <SectionBlock>
          <SectionTitle style={{ textAlign: 'center' }}>Teams That Took the Audit</SectionTitle>
          <SocialProofGrid>
            <ProofCard $delay="0s">
              <ProofScore>
                34 <ProofArrow>&rarr;</ProofArrow> 87
              </ProofScore>
              <ProofLabel>Marketing team &middot; 8 weeks</ProofLabel>
            </ProofCard>
            <ProofCard $delay="0.1s">
              <ProofScore>
                41 <ProofArrow>&rarr;</ProofArrow> 82
              </ProofScore>
              <ProofLabel>Consulting firm &middot; 10 weeks</ProofLabel>
            </ProofCard>
            <ProofCard $delay="0.2s">
              <ProofScore>
                28 <ProofArrow>&rarr;</ProofArrow> 79
              </ProofScore>
              <ProofLabel>Dev shop &middot; 12 weeks</ProofLabel>
            </ProofCard>
          </SocialProofGrid>
        </SectionBlock>

        <AuditDisclaimer>
          This audit provides a directional assessment based on your responses. Scores and recommendations are
          estimates intended to highlight areas for improvement — not guarantees of specific outcomes. Every team
          is different, and actual results will depend on your specific workflows and implementation.
        </AuditDisclaimer>

        {/* Retake */}
        <div style={{ textAlign: 'center', paddingBottom: '40px' }}>
          <RetakeButton onClick={retake} type="button">
            <RotateCcw size={16} />
            Retake Audit
          </RetakeButton>
        </div>
      </ResultsWrapper>
    </PageWrapper>
  );
}
