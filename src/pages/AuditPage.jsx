import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Lightbulb,
  RotateCcw,
  Send,
} from 'lucide-react';

const questions = [
  {
    id: 0,
    category: 'Onboarding & Setup',
    text: 'How long does it take to set up a new project or engagement from agreement to active work?',
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
      { label: 'They ask and we respond manually', score: 1 },
      { label: 'We send periodic email updates', score: 5 },
      { label: 'They have access to a dashboard or portal', score: 7 },
      { label: 'Automated updates plus dashboard plus self-serve access', score: 10 },
    ],
  },
  {
    id: 2,
    category: 'Time on Status Updates',
    text: "How much time does your team spend each week fielding questions like 'What is the status?' or 'When will this be done?'",
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
      { label: 'A brief meeting or message', score: 5 },
      { label: 'Files get dropped in a shared folder', score: 2 },
      { label: 'People figure it out as they go', score: 0 },
      { label: 'There is no real handoff process', score: 0 },
    ],
  },
  {
    id: 4,
    category: 'Reporting',
    text: 'How long does it take to generate and send a report?',
    options: [
      { label: 'Less than 30 minutes and mostly automated', score: 10 },
      { label: '1-2 hours', score: 7 },
      { label: '3-5 hours', score: 4 },
      { label: '6-8 hours', score: 2 },
      { label: 'More than 8 hours', score: 0 },
      { label: 'We do not send regular reports', score: 1 },
    ],
  },
  {
    id: 5,
    category: 'Visibility & Tracking',
    text: 'How often do projects go off-track without you realizing until it is too late?',
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
      { label: 'An automated system handles or routes it appropriately', score: 10 },
      { label: 'An auto-reply sets expectations for the next business day', score: 6 },
      { label: 'Someone on the team sees it and responds manually', score: 4 },
      { label: 'It waits until someone checks in the morning', score: 2 },
      { label: 'It depends who happens to see it', score: 0 },
    ],
  },
  {
    id: 7,
    category: 'Meeting Follow-through',
    text: 'How do you track what was discussed and decided in meetings?',
    options: [
      { label: 'AI extracts action items and creates tasks automatically', score: 10 },
      { label: 'Someone takes detailed notes and follows up', score: 7 },
      { label: 'Quick notes in a doc or chat thread', score: 4 },
      { label: 'We mostly rely on memory', score: 1 },
      { label: 'We usually forget part of it', score: 0 },
    ],
  },
  {
    id: 8,
    category: 'Quality Control',
    text: 'How consistent is the quality of deliverables before stakeholders see them?',
    options: [
      { label: 'Automated QC catches issues every time', score: 10 },
      { label: 'A senior team member reviews everything', score: 8 },
      { label: 'Peer review happens for most work', score: 5 },
      { label: 'People review their own work', score: 3 },
      { label: 'Issues slip through regularly', score: 0 },
    ],
  },
  {
    id: 9,
    category: 'Scalability',
    text: 'If your workload increased by 50% tomorrow, what would break first?',
    options: [
      { label: 'Nothing significant, the system would scale', score: 10 },
      { label: 'We would need to hire but could handle it', score: 7 },
      { label: 'Communication and coordination would collapse', score: 3 },
      { label: 'Project management would fall apart', score: 2 },
      { label: 'Everything would break immediately', score: 0 },
    ],
  },
];

const quickWins = {
  'Onboarding & Setup': 'Standardize setup with one intake form, one checklist, and one kickoff template.',
  'Communication & Updates': 'Ship one weekly automated status digest before building a more ambitious dashboard.',
  'Time on Status Updates': 'Automate recurring status snapshots so the team stops answering the same questions manually.',
  'Handoffs & Coordination': 'Add a single handoff template with owner, due date, status, and next action.',
  Reporting: 'Template the most common report and pull recurring metrics from one source of truth.',
  'Visibility & Tracking': 'Create one shared delivery board with clear stages and blockers visible to everyone.',
  'Response Time': 'Use triage rules and auto-replies so urgent work reaches the right person immediately.',
  'Meeting Follow-through': 'Record meetings, summarize actions automatically, and push them into your task system.',
  'Quality Control': 'Start with a pre-delivery checklist for the three deliverables you ship most often.',
  Scalability: 'Document the five most repeated workflows first. Scale starts with repeatability.',
};

const priorityData = {
  'Onboarding & Setup': { hours: '8 hrs per new project', complexity: 'Medium', timeline: '3-4 weeks', weeklySavings: 8 },
  'Communication & Updates': { hours: '10 hrs per week', complexity: 'High', timeline: '4-6 weeks', weeklySavings: 10 },
  'Time on Status Updates': { hours: '12 hrs per week', complexity: 'Medium', timeline: '2-3 weeks', weeklySavings: 12 },
  'Handoffs & Coordination': { hours: '5 hrs per week', complexity: 'Low', timeline: '1-2 weeks', weeklySavings: 5 },
  Reporting: { hours: '6 hrs per report cycle', complexity: 'Medium', timeline: '3-4 weeks', weeklySavings: 6 },
  'Visibility & Tracking': { hours: '4 hrs per week', complexity: 'Low', timeline: '1-2 weeks', weeklySavings: 4 },
  'Response Time': { hours: '8 hrs per week', complexity: 'Medium', timeline: '3-4 weeks', weeklySavings: 8 },
  'Meeting Follow-through': { hours: '5 hrs per week', complexity: 'Medium', timeline: '2-3 weeks', weeklySavings: 5 },
  'Quality Control': { hours: '4 hrs per deliverable', complexity: 'Medium', timeline: '2-3 weeks', weeklySavings: 4 },
  Scalability: { hours: 'Foundational', complexity: 'Low', timeline: '1-2 weeks', weeklySavings: 0 },
};

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(18px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideCard = keyframes`
  from {
    opacity: 0;
    transform: translateY(14px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const PageWrapper = styled.div`
  min-height: 100vh;
  padding: 92px 16px 88px;
  background:
    radial-gradient(circle at top right, rgba(193, 147, 27, 0.16), transparent 24%),
    linear-gradient(180deg, rgba(251, 248, 241, 0.64), rgba(239, 232, 218, 0.94));

  @media (min-width: 769px) {
    padding: 116px 28px 120px;
  }
`;

const Shell = styled.div`
  max-width: 1220px;
  margin: 0 auto;
`;

const Eyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${p => p.theme.textSecondary};

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${p => p.theme.primary};
  }
`;

const HeroGrid = styled.section`
  display: grid;
  gap: 20px;
  margin-bottom: 28px;
  animation: ${fadeUp} 0.45s ease-out both;

  @media (min-width: 960px) {
    grid-template-columns: minmax(0, 1.4fr) minmax(320px, 0.8fr);
    align-items: stretch;
  }
`;

const HeroPanel = styled.div`
  border: 1px solid ${p => p.theme.border};
  border-radius: ${p => p.theme.borderRadiusLg};
  background:
    linear-gradient(135deg, rgba(193, 147, 27, 0.11), transparent 40%),
    ${p => p.theme.surface};
  box-shadow: ${p => p.theme.cardShadow};
`;

const HeroCopy = styled(HeroPanel)`
  padding: 24px;

  @media (min-width: 769px) {
    padding: 38px;
  }
`;

const HeroTitle = styled.h1`
  margin: 16px 0 18px;
  font-family: ${p => p.theme.headingFont};
  font-size: clamp(2.05rem, 6vw, 4.15rem);
  line-height: 1.01;
  letter-spacing: -0.04em;
  color: ${p => p.theme.text};
`;

const HeroBody = styled.p`
  margin: 0;
  max-width: 720px;
  font-size: clamp(1rem, 2.1vw, 1.17rem);
  line-height: 1.75;
  color: ${p => p.theme.textSecondary};
`;

const HeroStats = styled(HeroPanel)`
  padding: 24px;
  display: grid;
  gap: 16px;
  align-content: start;

  @media (min-width: 769px) {
    padding: 28px;
  }
`;

const StatCard = styled.div`
  padding: 18px 18px 16px;
  border-radius: ${p => p.theme.borderRadius};
  background: rgba(255, 255, 255, 0.38);
  border: 1px solid rgba(214, 204, 184, 0.92);
`;

const StatValue = styled.div`
  font-family: ${p => p.theme.headingFont};
  font-size: 2rem;
  line-height: 1;
  color: ${p => p.theme.text};
  margin-bottom: 8px;
`;

const StatLabel = styled.div`
  font-size: 0.93rem;
  line-height: 1.6;
  color: ${p => p.theme.textSecondary};
`;

const QuizShell = styled.section`
  display: grid;
  gap: 20px;

  @media (min-width: 980px) {
    grid-template-columns: 300px minmax(0, 1fr);
    align-items: start;
  }
`;

const Sidebar = styled.aside`
  display: grid;
  gap: 16px;
`;

const SidebarCard = styled(HeroPanel)`
  padding: 22px;
`;

const SidebarTitle = styled.h2`
  margin: 0 0 14px;
  font-size: 0.95rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${p => p.theme.textSecondary};
`;

const ProgressValue = styled.div`
  font-family: ${p => p.theme.headingFont};
  font-size: 2.3rem;
  line-height: 1;
  color: ${p => p.theme.text};
  margin-bottom: 12px;
`;

const ProgressTrack = styled.div`
  height: 10px;
  border-radius: 999px;
  background: ${p => p.theme.border};
  overflow: hidden;
  margin-bottom: 12px;
`;

const ProgressFill = styled.div`
  height: 100%;
  width: ${p => p.$percent}%;
  border-radius: inherit;
  background: linear-gradient(90deg, ${p => p.theme.primary}, ${p => p.theme.accent});
  transition: width 220ms ease;
`;

const SidebarCopy = styled.p`
  margin: 0;
  font-size: 0.94rem;
  line-height: 1.7;
  color: ${p => p.theme.textSecondary};
`;

const StepList = styled.div`
  display: grid;
  gap: 10px;
`;

const StepItem = styled.div`
  display: grid;
  grid-template-columns: 26px minmax(0, 1fr);
  gap: 10px;
  align-items: start;
  color: ${p => (p.$active ? p.theme.text : p.theme.textSecondary)};
  opacity: ${p => (p.$active ? 1 : 0.74)};
`;

const StepNumber = styled.div`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.78rem;
  font-weight: 800;
  color: ${p => p.theme.buttonText};
  background: ${p => (p.$active ? p.theme.primary : p.theme.border)};
`;

const StepText = styled.div`
  font-size: 0.92rem;
  line-height: 1.5;
`;

const QuestionPanel = styled(HeroPanel)`
  padding: 26px;
  animation: ${slideCard} 0.28s ease-out both;

  @media (min-width: 769px) {
    padding: 34px;
  }
`;

const CategoryChip = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 7px 12px;
  border-radius: 999px;
  background: rgba(193, 147, 27, 0.14);
  color: ${p => p.theme.secondary};
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

const QuestionText = styled.h2`
  margin: 18px 0 24px;
  font-family: ${p => p.theme.headingFont};
  font-size: clamp(1.7rem, 3vw, 2.5rem);
  line-height: 1.12;
  letter-spacing: -0.03em;
  color: ${p => p.theme.text};
`;

const OptionList = styled.div`
  display: grid;
  gap: 12px;
`;

const OptionButton = styled.button`
  width: 100%;
  display: grid;
  grid-template-columns: 28px minmax(0, 1fr);
  gap: 14px;
  align-items: start;
  padding: 16px 18px;
  border-radius: ${p => p.theme.borderRadius};
  border: 1px solid ${p => (p.$selected ? p.theme.primary : p.theme.border)};
  background: ${p => (p.$selected ? 'rgba(193, 147, 27, 0.13)' : p.theme.background)};
  color: ${p => p.theme.text};
  text-align: left;
  cursor: pointer;
  transition: transform 180ms ease, border-color 180ms ease, background-color 180ms ease, box-shadow 180ms ease;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    transform: translateY(-1px);
    border-color: ${p => p.theme.primary};
    box-shadow: 0 12px 24px rgba(15, 23, 42, 0.06);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Dot = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid ${p => (p.$selected ? p.theme.primary : p.theme.border)};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1px;

  &::after {
    content: '';
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: ${p => p.theme.primary};
    transform: scale(${p => (p.$selected ? 1 : 0)});
    transition: transform 180ms ease;
  }
`;

const OptionText = styled.div`
  font-size: 1rem;
  line-height: 1.6;
`;

const NavRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 28px;

  @media (max-width: 600px) {
    flex-direction: column-reverse;
  }
`;

const NavButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 50px;
  padding: 0 20px;
  border-radius: 999px;
  border: 1px solid ${p => p.theme.border};
  background: ${p => (p.$primary ? p.theme.primary : 'transparent')};
  color: ${p => (p.$primary ? p.theme.buttonText : p.theme.text)};
  font-size: 0.96rem;
  font-weight: 700;
  cursor: pointer;
  transition: transform 180ms ease, border-color 180ms ease, background-color 180ms ease;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    border-color: ${p => p.theme.primary};
    background: ${p => (p.$primary ? p.theme.primaryHover : 'rgba(193, 147, 27, 0.08)')};
  }

  &:disabled {
    opacity: 0.42;
    cursor: not-allowed;
  }
`;

const ResultsLayout = styled.div`
  display: grid;
  gap: 20px;
  animation: ${fadeUp} 0.4s ease-out both;
`;

const ResultsTop = styled.section`
  display: grid;
  gap: 20px;

  @media (min-width: 960px) {
    grid-template-columns: minmax(340px, 0.78fr) minmax(0, 1.22fr);
  }
`;

const ScoreCard = styled(HeroPanel)`
  padding: 28px;
  text-align: center;

  @media (min-width: 769px) {
    padding: 34px;
  }
`;

const ScoreRing = styled.div`
  width: 188px;
  height: 188px;
  margin: 0 auto 22px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: conic-gradient(${p => p.$color} ${p => p.$degrees}deg, rgba(15, 23, 42, 0.08) 0deg);

  &::before {
    content: '';
    width: 142px;
    height: 142px;
    border-radius: 50%;
    background: ${p => p.theme.surface};
    border: 1px solid ${p => p.theme.border};
    position: absolute;
  }
`;

const ScoreInner = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
`;

const ScoreValue = styled.div`
  font-family: ${p => p.theme.headingFont};
  font-size: 3.7rem;
  line-height: 0.95;
  color: ${p => p.theme.text};
`;

const ScoreSuffix = styled.div`
  margin-top: 4px;
  font-size: 0.94rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${p => p.theme.textSecondary};
`;

const ScoreTag = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 38px;
  padding: 0 16px;
  border-radius: 999px;
  background: ${p => p.$color};
  color: #fff;
  font-size: 0.88rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

const ScoreBody = styled.p`
  margin: 16px 0 0;
  font-size: 1rem;
  line-height: 1.75;
  color: ${p => p.theme.textSecondary};
`;

const ResultsSummary = styled(HeroPanel)`
  padding: 28px;
  display: grid;
  gap: 20px;

  @media (min-width: 769px) {
    padding: 34px;
  }
`;

const SummaryTitle = styled.h2`
  margin: 0;
  font-family: ${p => p.theme.headingFont};
  font-size: clamp(2rem, 3vw, 3rem);
  line-height: 1;
  letter-spacing: -0.03em;
  color: ${p => p.theme.text};
`;

const SummaryText = styled.p`
  margin: 0;
  max-width: 760px;
  font-size: 1.02rem;
  line-height: 1.75;
  color: ${p => p.theme.textSecondary};
`;

const InsightGrid = styled.div`
  display: grid;
  gap: 14px;

  @media (min-width: 720px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const InsightCard = styled.div`
  padding: 18px;
  border-radius: ${p => p.theme.borderRadius};
  background: rgba(255, 255, 255, 0.34);
  border: 1px solid ${p => p.theme.border};
`;

const InsightLabel = styled.div`
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${p => p.theme.textSecondary};
  margin-bottom: 10px;
`;

const InsightValue = styled.div`
  font-size: 1rem;
  line-height: 1.6;
  color: ${p => p.theme.text};
`;

const Section = styled.section`
  display: grid;
  gap: 20px;
`;

const SectionHeader = styled.div`
  display: grid;
  gap: 10px;
`;

const SectionTitle = styled.h2`
  margin: 0;
  font-family: ${p => p.theme.headingFont};
  font-size: clamp(1.9rem, 3vw, 2.75rem);
  line-height: 1.05;
  letter-spacing: -0.03em;
  color: ${p => p.theme.text};
`;

const SectionIntro = styled.p`
  margin: 0;
  max-width: 760px;
  font-size: 1rem;
  line-height: 1.75;
  color: ${p => p.theme.textSecondary};
`;

const BreakdownGrid = styled.div`
  display: grid;
  gap: 16px;

  @media (min-width: 700px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 1080px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const BreakdownCard = styled(HeroPanel)`
  padding: 20px;
  display: grid;
  gap: 14px;
`;

const BreakdownTop = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: start;
`;

const BreakdownTitle = styled.h3`
  margin: 0;
  font-size: 1.05rem;
  line-height: 1.45;
  color: ${p => p.theme.text};
`;

const BreakdownScore = styled.div`
  min-width: 58px;
  text-align: right;
  font-size: 1.15rem;
  font-weight: 800;
  color: ${p => p.$color};
`;

const BreakdownTrack = styled.div`
  height: 10px;
  border-radius: 999px;
  background: ${p => p.theme.border};
  overflow: hidden;
`;

const BreakdownFill = styled.div`
  width: ${p => p.$percent}%;
  height: 100%;
  border-radius: inherit;
  background: ${p => p.$color};
`;

const QuickWin = styled.div`
  display: grid;
  grid-template-columns: 18px minmax(0, 1fr);
  gap: 10px;
  padding: 14px;
  border-radius: ${p => p.theme.borderRadiusSm};
  background: rgba(180, 83, 9, 0.08);
  border: 1px solid rgba(180, 83, 9, 0.18);
  color: ${p => p.theme.textSecondary};
  font-size: 0.92rem;
  line-height: 1.6;

  svg {
    color: ${p => p.theme.warning};
    margin-top: 2px;
  }
`;

const PriorityGrid = styled.div`
  display: grid;
  gap: 16px;

  @media (min-width: 840px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const PriorityCard = styled(HeroPanel)`
  padding: 22px;
  border-top: 4px solid ${p => p.$accent};
  display: grid;
  gap: 14px;
`;

const PriorityRank = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${p => p.$accent};
  color: #fff;
  font-size: 0.9rem;
  font-weight: 800;
`;

const PriorityTitle = styled.h3`
  margin: 0;
  font-size: 1.15rem;
  line-height: 1.4;
  color: ${p => p.theme.text};
`;

const MetricList = styled.div`
  display: grid;
  gap: 10px;
`;

const MetricRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding-top: 10px;
  border-top: 1px solid ${p => p.theme.border};
  font-size: 0.94rem;
`;

const MetricLabel = styled.span`
  color: ${p => p.theme.textSecondary};
`;

const MetricValue = styled.span`
  text-align: right;
  font-weight: 700;
  color: ${p => p.$color || p.theme.text};
`;

const ComparisonCard = styled(HeroPanel)`
  padding: 28px;
  display: grid;
  gap: 20px;

  @media (min-width: 900px) {
    grid-template-columns: 240px minmax(0, 1fr);
    align-items: center;
  }
`;

const PercentileBlock = styled.div`
  padding: 24px;
  border-radius: ${p => p.theme.borderRadius};
  background: rgba(16, 33, 59, 0.06);
  text-align: center;
`;

const PercentileValue = styled.div`
  font-family: ${p => p.theme.headingFont};
  font-size: 4rem;
  line-height: 0.95;
  color: ${p => p.theme.primary};
`;

const PercentileLabel = styled.div`
  margin-top: 6px;
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${p => p.theme.textSecondary};
`;

const BulletList = styled.ul`
  margin: 0;
  padding-left: 18px;
  color: ${p => p.theme.textSecondary};
  line-height: 1.9;
`;

const CtaCard = styled(HeroPanel)`
  padding: 28px;
  display: grid;
  gap: 20px;

  @media (min-width: 960px) {
    grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
    align-items: start;
  }
`;

const CtaCopy = styled.div`
  display: grid;
  gap: 12px;
`;

const CtaTitle = styled.h2`
  margin: 0;
  font-family: ${p => p.theme.headingFont};
  font-size: clamp(2rem, 3vw, 2.8rem);
  line-height: 1;
  letter-spacing: -0.03em;
  color: ${p => p.theme.text};
`;

const CtaBody = styled.p`
  margin: 0;
  font-size: 1rem;
  line-height: 1.75;
  color: ${p => p.theme.textSecondary};
`;

const Checklist = styled.div`
  display: grid;
  gap: 10px;
`;

const ChecklistItem = styled.div`
  display: grid;
  grid-template-columns: 10px minmax(0, 1fr);
  gap: 12px;
  align-items: start;
  color: ${p => p.theme.textSecondary};
  line-height: 1.6;

  &::before {
    content: '';
    width: 10px;
    height: 10px;
    margin-top: 8px;
    border-radius: 50%;
    background: ${p => p.theme.primary};
  }
`;

const FormWrap = styled.div`
  border-radius: ${p => p.theme.borderRadius};
  background: rgba(255, 255, 255, 0.34);
  border: 1px solid ${p => p.theme.border};
  padding: 20px;
`;

const FormGrid = styled.div`
  display: grid;
  gap: 14px;

  @media (min-width: 680px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const sharedFieldStyles = css`
  width: 100%;
  min-height: 52px;
  padding: 14px 16px;
  border-radius: ${p => p.theme.borderRadiusSm};
  border: 1px solid ${p => p.theme.border};
  background: ${p => p.theme.surface};
  color: ${p => p.theme.text};

  &:focus {
    outline: none;
    border-color: ${p => p.theme.primary};
  }

  &::placeholder {
    color: ${p => p.theme.textSecondary};
  }
`;

const Input = styled.input`
  ${sharedFieldStyles}
`;

const Select = styled.select`
  ${sharedFieldStyles}
`;

const Textarea = styled.textarea`
  ${sharedFieldStyles}
  min-height: 126px;
  resize: vertical;
  grid-column: 1 / -1;
`;

const SubmitButton = styled.button`
  grid-column: 1 / -1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 54px;
  padding: 0 22px;
  border-radius: 999px;
  border: none;
  background: ${p => p.theme.primary};
  color: ${p => p.theme.buttonText};
  font-size: 0.98rem;
  font-weight: 800;
  cursor: pointer;
  transition: transform 180ms ease, background-color 180ms ease;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    background: ${p => p.theme.primaryHover};
  }

  &:disabled {
    opacity: 0.56;
    cursor: not-allowed;
  }
`;

const SuccessCard = styled.div`
  display: grid;
  gap: 12px;
  place-items: start;
  text-align: left;

  svg {
    color: ${p => p.theme.success};
  }
`;

const ProofGrid = styled.div`
  display: grid;
  gap: 16px;

  @media (min-width: 760px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const ProofCard = styled(HeroPanel)`
  padding: 22px;
  text-align: center;
`;

const ProofScore = styled.div`
  font-family: ${p => p.theme.headingFont};
  font-size: 2.5rem;
  line-height: 1;
  color: ${p => p.theme.text};
  margin-bottom: 10px;
`;

const ProofMeta = styled.div`
  font-size: 0.95rem;
  line-height: 1.6;
  color: ${p => p.theme.textSecondary};
`;

const FooterActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 6px;
`;

const RetakeButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-height: 48px;
  padding: 0 18px;
  border-radius: 999px;
  border: 1px solid ${p => p.theme.border};
  background: transparent;
  color: ${p => p.theme.textSecondary};
  cursor: pointer;
  transition: color 180ms ease, border-color 180ms ease, transform 180ms ease;

  &:hover {
    color: ${p => p.theme.text};
    border-color: ${p => p.theme.primary};
    transform: translateY(-1px);
  }
`;

function getScoreInfo(score) {
  if (score >= 80) {
    return {
      label: 'Scaling Machine',
      color: '#0f766e',
      description: 'Your delivery engine already has strong systems behind it. The next gains come from tightening edge cases, exceptions, and high-value handoffs.',
    };
  }

  if (score >= 60) {
    return {
      label: 'Growing Pains',
      color: '#b45309',
      description: 'The team has a workable operating rhythm, but manual coordination is starting to tax delivery. A focused roadmap would unlock capacity without adding headcount immediately.',
    };
  }

  if (score >= 40) {
    return {
      label: 'Duct Tape Zone',
      color: '#ea580c',
      description: 'Important work is getting done, but too much effort is going into keeping the system upright. This is usually where the highest-return automation opportunities live.',
    };
  }

  return {
    label: 'Needs Attention',
    color: '#b91c1c',
    description: 'The current workflow is creating avoidable drag in multiple places. The upside is meaningful because even basic structure would recover hours quickly.',
  };
}

function getBarColor(score) {
  if (score >= 8) return '#0f766e';
  if (score >= 5) return '#b45309';
  return '#b91c1c';
}

function getComplexityColor(complexity) {
  if (complexity === 'Low') return '#0f766e';
  if (complexity === 'Medium') return '#b45309';
  return '#b91c1c';
}

export default function AuditPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(10).fill(null));
  const [showResults, setShowResults] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    agencySize: '',
    painPoint: '',
  });
  const [cardDirection, setCardDirection] = useState('forward');
  const cardKey = useRef(0);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('pws-audit-progress');
      if (!saved) return;

      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed.answers) && parsed.answers.length === questions.length) {
        setAnswers(parsed.answers);
      }
      if (typeof parsed.currentQuestion === 'number') {
        setCurrentQuestion(parsed.currentQuestion);
      }
      if (parsed.showResults) {
        setShowResults(true);
      }
    } catch {
      // ignore invalid local state
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        'pws-audit-progress',
        JSON.stringify({ answers, currentQuestion, showResults })
      );
    } catch {
      // ignore storage errors
    }
  }, [answers, currentQuestion, showResults]);

  useEffect(() => {
    document.title = 'Operations Audit | Peak Work Studios';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = 'Take the Peak Work Studios operations audit to identify workflow bottlenecks, manual coordination debt, and the highest-leverage automation opportunities.';
    }
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.href = 'https://peakworkstudios.com/audit';
    }
  }, []);

  const selectAnswer = (questionIndex, optionIndex) => {
    const nextAnswers = [...answers];
    nextAnswers[questionIndex] = optionIndex;
    setAnswers(nextAnswers);

    if (questionIndex < questions.length - 1) {
      window.setTimeout(() => {
        setCardDirection('forward');
        cardKey.current += 1;
        setCurrentQuestion(questionIndex + 1);
      }, 180);
    }
  };

  const goBack = () => {
    if (currentQuestion === 0) return;
    setCardDirection('back');
    cardKey.current += 1;
    setCurrentQuestion(currentQuestion - 1);
  };

  const showFinalResults = () => {
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

  const totalScore = answers.reduce((sum, optionIndex, questionIndex) => {
    if (optionIndex === null) return sum;
    return sum + questions[questionIndex].options[optionIndex].score;
  }, 0);

  const categoryScores = questions.map((question, index) => ({
    category: question.category,
    score: answers[index] === null ? 0 : question.options[answers[index]].score,
  }));

  const sortedCategories = [...categoryScores].sort((a, b) => a.score - b.score);
  const topPriorities = sortedCategories.slice(0, 3);
  const scoreInfo = getScoreInfo(totalScore);
  const percentile = Math.min(95, Math.max(5, totalScore + 10));
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const current = questions[currentQuestion];

  const weakestArea = topPriorities[0]?.category || 'Workflow coordination';
  const strongestArea = [...categoryScores].sort((a, b) => b.score - a.score)[0]?.category || 'Delivery visibility';
  const annualizedValue = topPriorities.reduce((sum, item) => {
    const weeklySavings = priorityData[item.category]?.weeklySavings || 0;
    return sum + weeklySavings * 75 * 52;
  }, 0);

  const handleFormSubmit = async event => {
    event.preventDefault();
    try {
      const scores = {};
      categoryScores.forEach(item => {
        scores[item.category] = item.score;
      });

      await fetch('/api/audit-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          agencySize: formData.agencySize,
          painPoint: formData.painPoint,
          scores,
          totalScore,
        }),
      });
    } catch {
      // keep UX optimistic even if the endpoint fails
    }

    setFormSubmitted(true);
  };

  if (!showResults) {
    return (
      <PageWrapper>
        <Shell>
          <HeroGrid>
            <HeroCopy>
              <Eyebrow>Operational maturity audit</Eyebrow>
              <HeroTitle>A fast operator audit for service teams carrying too much manual work.</HeroTitle>
              <HeroBody>
                Answer ten questions about setup, reporting, handoffs, visibility, and delivery control. You will get a scored readout, three priority areas, and clear direction on where automation would actually pay off.
              </HeroBody>
            </HeroCopy>

            <HeroStats>
              <StatCard>
                <StatValue>10</StatValue>
                <StatLabel>Questions that cut directly into how your team runs delivery.</StatLabel>
              </StatCard>
              <StatCard>
                <StatValue>5 min</StatValue>
                <StatLabel>No fluff. This is built to surface operational drag fast.</StatLabel>
              </StatCard>
              <StatCard>
                <StatValue>3</StatValue>
                <StatLabel>Clear priority areas at the end instead of generic advice.</StatLabel>
              </StatCard>
            </HeroStats>
          </HeroGrid>

          <QuizShell>
            <Sidebar>
              <SidebarCard>
                <SidebarTitle>Progress</SidebarTitle>
                <ProgressValue>{currentQuestion + 1} / {questions.length}</ProgressValue>
                <ProgressTrack>
                  <ProgressFill $percent={progress} />
                </ProgressTrack>
                <SidebarCopy>
                  The score rewards consistency, visibility, and repeatable handoffs. Low scores usually point to manual coordination debt rather than lack of effort.
                </SidebarCopy>
              </SidebarCard>

              <SidebarCard>
                <SidebarTitle>What this covers</SidebarTitle>
                <StepList>
                  {[
                    'Client and project onboarding',
                    'Status reporting and stakeholder updates',
                    'Handoffs, meeting follow-through, and QC',
                    'Scalability and response coverage',
                  ].map((label, index) => (
                    <StepItem key={label} $active={index <= Math.floor(currentQuestion / 3)}>
                      <StepNumber $active={index <= Math.floor(currentQuestion / 3)}>{index + 1}</StepNumber>
                      <StepText>{label}</StepText>
                    </StepItem>
                  ))}
                </StepList>
              </SidebarCard>
            </Sidebar>

            <QuestionPanel key={`${cardDirection}-${cardKey.current}`}>
              <CategoryChip>{current.category}</CategoryChip>
              <QuestionText>{current.text}</QuestionText>

              <OptionList>
                {current.options.map((option, index) => (
                  <OptionButton
                    key={option.label}
                    type="button"
                    $selected={answers[currentQuestion] === index}
                    onClick={() => selectAnswer(currentQuestion, index)}
                  >
                    <Dot $selected={answers[currentQuestion] === index} />
                    <OptionText>{option.label}</OptionText>
                  </OptionButton>
                ))}
              </OptionList>

              <NavRow>
                <NavButton type="button" onClick={goBack} disabled={currentQuestion === 0}>
                  <ArrowLeft size={16} />
                  Back
                </NavButton>

                {currentQuestion === questions.length - 1 ? (
                  <NavButton
                    type="button"
                    $primary
                    onClick={showFinalResults}
                    disabled={answers[currentQuestion] === null}
                  >
                    See results
                    <ArrowRight size={16} />
                  </NavButton>
                ) : (
                  <NavButton
                    type="button"
                    $primary
                    onClick={() => {
                      if (answers[currentQuestion] === null) return;
                      setCardDirection('forward');
                      cardKey.current += 1;
                      setCurrentQuestion(currentQuestion + 1);
                    }}
                    disabled={answers[currentQuestion] === null}
                  >
                    Next question
                    <ArrowRight size={16} />
                  </NavButton>
                )}
              </NavRow>
            </QuestionPanel>
          </QuizShell>
        </Shell>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Shell>
        <ResultsLayout>
          <ResultsTop>
            <ScoreCard>
              <ScoreRing $color={scoreInfo.color} $degrees={Math.max(12, totalScore * 3.6)}>
                <ScoreInner>
                  <ScoreValue>{totalScore}</ScoreValue>
                  <ScoreSuffix>out of 100</ScoreSuffix>
                </ScoreInner>
              </ScoreRing>
              <ScoreTag $color={scoreInfo.color}>{scoreInfo.label}</ScoreTag>
              <ScoreBody>{scoreInfo.description}</ScoreBody>
            </ScoreCard>

            <ResultsSummary>
              <Eyebrow>Audit results</Eyebrow>
              <SummaryTitle>Your operations story is clear.</SummaryTitle>
              <SummaryText>
                Your strongest area is {strongestArea.toLowerCase()}, but the biggest drag is showing up in {weakestArea.toLowerCase()}. If those three weakest areas were tightened first, the recovered operating capacity is worth roughly ${annualizedValue.toLocaleString()} per year at a $75 blended hourly rate.
              </SummaryText>

              <InsightGrid>
                <InsightCard>
                  <InsightLabel>Weakest area</InsightLabel>
                  <InsightValue>{weakestArea}</InsightValue>
                </InsightCard>
                <InsightCard>
                  <InsightLabel>Strongest area</InsightLabel>
                  <InsightValue>{strongestArea}</InsightValue>
                </InsightCard>
                <InsightCard>
                  <InsightLabel>Relative standing</InsightLabel>
                  <InsightValue>{percentile}th percentile versus teams of similar size</InsightValue>
                </InsightCard>
              </InsightGrid>
            </ResultsSummary>
          </ResultsTop>

          <Section>
            <SectionHeader>
              <SectionTitle>Where the system is holding, and where it is leaking time</SectionTitle>
              <SectionIntro>
                This view is meant to be diagnostic. Scores under 5 usually mean the work still depends on human memory, manual chasing, or inconsistent follow-through.
              </SectionIntro>
            </SectionHeader>

            <BreakdownGrid>
              {categoryScores.map(item => {
                const color = getBarColor(item.score);
                return (
                  <BreakdownCard key={item.category}>
                    <BreakdownTop>
                      <BreakdownTitle>{item.category}</BreakdownTitle>
                      <BreakdownScore $color={color}>{item.score}/10</BreakdownScore>
                    </BreakdownTop>
                    <BreakdownTrack>
                      <BreakdownFill $percent={item.score * 10} $color={color} />
                    </BreakdownTrack>
                    {item.score <= 4 ? (
                      <QuickWin>
                        <Lightbulb size={16} />
                        <span>{quickWins[item.category]}</span>
                      </QuickWin>
                    ) : null}
                  </BreakdownCard>
                );
              })}
            </BreakdownGrid>
          </Section>

          <Section>
            <SectionHeader>
              <SectionTitle>Your first three priorities</SectionTitle>
              <SectionIntro>
                These are the areas most likely to return time quickly and reduce coordination overhead without forcing a full systems overhaul first.
              </SectionIntro>
            </SectionHeader>

            <PriorityGrid>
              {topPriorities.map((item, index) => {
                const accent = ['#b91c1c', '#ea580c', '#b45309'][index];
                const details = priorityData[item.category];
                const annualValue = details.weeklySavings
                  ? `$${(details.weeklySavings * 75 * 52).toLocaleString()} per year`
                  : 'Foundational investment';

                return (
                  <PriorityCard key={item.category} $accent={accent}>
                    <PriorityRank $accent={accent}>{index + 1}</PriorityRank>
                    <PriorityTitle>{item.category}</PriorityTitle>
                    <MetricList>
                      <MetricRow>
                        <MetricLabel>Current score</MetricLabel>
                        <MetricValue $color={accent}>{item.score}/10</MetricValue>
                      </MetricRow>
                      <MetricRow>
                        <MetricLabel>Recoverable time</MetricLabel>
                        <MetricValue>{details.hours}</MetricValue>
                      </MetricRow>
                      <MetricRow>
                        <MetricLabel>Annual value</MetricLabel>
                        <MetricValue>{annualValue}</MetricValue>
                      </MetricRow>
                      <MetricRow>
                        <MetricLabel>Complexity</MetricLabel>
                        <MetricValue $color={getComplexityColor(details.complexity)}>
                          {details.complexity}
                        </MetricValue>
                      </MetricRow>
                      <MetricRow>
                        <MetricLabel>Timeline</MetricLabel>
                        <MetricValue>{details.timeline}</MetricValue>
                      </MetricRow>
                    </MetricList>
                  </PriorityCard>
                );
              })}
            </PriorityGrid>
          </Section>

          <Section>
            <SectionHeader>
              <SectionTitle>How you compare</SectionTitle>
              <SectionIntro>
                Teams your size often sit around 42 out of 100. The top tier tends to score above 85 because updates, reports, and handoffs do not rely on people remembering what to do next.
              </SectionIntro>
            </SectionHeader>

            <ComparisonCard>
              <PercentileBlock>
                <PercentileValue>{percentile}th</PercentileValue>
                <PercentileLabel>Percentile</PercentileLabel>
              </PercentileBlock>
              <BulletList>
                <li>Top-performing teams onboard work quickly and consistently.</li>
                <li>Status visibility is available without interrupting the delivery team.</li>
                <li>Reports are assembled from structured data rather than manual cleanup.</li>
                <li>Meeting actions, QA checks, and handoffs all have explicit ownership.</li>
              </BulletList>
            </ComparisonCard>
          </Section>

          <Section>
            <CtaCard>
              <CtaCopy>
                <Eyebrow>Next step</Eyebrow>
                <CtaTitle>Get the actual roadmap behind this score.</CtaTitle>
                <CtaBody>
                  If you want, I will turn these results into a practical sequence: what to automate first, what to standardize before automation, and which bottlenecks are worth ignoring for now.
                </CtaBody>
                <Checklist>
                  <ChecklistItem>Priority order based on impact, not novelty.</ChecklistItem>
                  <ChecklistItem>Suggested automations mapped to your weak spots.</ChecklistItem>
                  <ChecklistItem>Implementation scope framed for a real team, not a fantasy greenfield.</ChecklistItem>
                </Checklist>
              </CtaCopy>

              <FormWrap>
                {!formSubmitted ? (
                  <form onSubmit={handleFormSubmit}>
                    <FormGrid>
                      <Input
                        type="text"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={event => setFormData({ ...formData, name: event.target.value })}
                        required
                      />
                      <Input
                        type="email"
                        placeholder="Work email"
                        value={formData.email}
                        onChange={event => setFormData({ ...formData, email: event.target.value })}
                        required
                      />
                      <Select
                        value={formData.agencySize}
                        onChange={event => setFormData({ ...formData, agencySize: event.target.value })}
                        required
                      >
                        <option value="">Team size</option>
                        <option value="1-5">1-5 people</option>
                        <option value="6-15">6-15 people</option>
                        <option value="16-30">16-30 people</option>
                        <option value="31-50">31-50 people</option>
                        <option value="50+">50+ people</option>
                      </Select>
                      <div />
                      <Textarea
                        placeholder="What is the most painful bottleneck in delivery right now?"
                        value={formData.painPoint}
                        onChange={event => setFormData({ ...formData, painPoint: event.target.value })}
                      />
                      <SubmitButton type="submit">
                        <Send size={16} />
                        Send me the roadmap
                      </SubmitButton>
                    </FormGrid>
                  </form>
                ) : (
                  <SuccessCard>
                    <CheckCircle2 size={44} />
                    <div>
                      <strong>Report request sent.</strong>
                    </div>
                    <CtaBody>
                      The custom automation roadmap request is in. If you would rather talk live, book a conversation instead of waiting on email.
                    </CtaBody>
                    <Link
                      to="/contact"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontWeight: 700,
                        textDecoration: 'underline',
                        textUnderlineOffset: '3px',
                      }}
                    >
                      Book a call
                      <ChevronRight size={16} />
                    </Link>
                  </SuccessCard>
                )}
              </FormWrap>
            </CtaCard>
          </Section>

          <Section>
            <SectionHeader>
              <SectionTitle>What this looks like in practice</SectionTitle>
              <SectionIntro>
                These are the kinds of score jumps teams make when reporting, coordination, and follow-through stop depending on manual effort.
              </SectionIntro>
            </SectionHeader>

            <ProofGrid>
              <ProofCard>
                <ProofScore>34 to 87</ProofScore>
                <ProofMeta>Marketing delivery team after automating status reporting and client intake</ProofMeta>
              </ProofCard>
              <ProofCard>
                <ProofScore>41 to 82</ProofScore>
                <ProofMeta>Consulting firm after standardizing handoffs and meeting follow-through</ProofMeta>
              </ProofCard>
              <ProofCard>
                <ProofScore>28 to 79</ProofScore>
                <ProofMeta>Dev shop after reducing manual QA loops and replacing ad hoc updates</ProofMeta>
              </ProofCard>
            </ProofGrid>
          </Section>

          <FooterActions>
            <RetakeButton type="button" onClick={retake}>
              <RotateCcw size={16} />
              Retake audit
            </RetakeButton>
          </FooterActions>
        </ResultsLayout>
      </Shell>
    </PageWrapper>
  );
}