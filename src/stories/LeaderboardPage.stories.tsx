import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NavBar } from '../NavBar';
import { Button, IconButton } from '../Button';
import { Card } from '../Card';
import { Chip } from '../Chip';
import { Avatar } from '../Avatar';
import { HStack, VStack, Spacer } from '../Stack';
import { Popover } from '../Popover';
import { FilterTabs } from '../FilterTabs';
import { Progress } from '../Progress';

const meta: Meta = {
  title: 'Pages/LeaderboardPage',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

// ═══════════════════════════════════════════════════════════════
// ICONS
// ═══════════════════════════════════════════════════════════════

const TrophyIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10 1a2 2 0 00-2 2H5a2 2 0 00-2 2v1a5 5 0 004.5 4.975V13.5a.5.5 0 01-.5.5H5.5a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h9a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5H13a.5.5 0 01-.5-.5v-2.525A5 5 0 0017 6V5a2 2 0 00-2-2h-3a2 2 0 00-2-2zm0 2a1 1 0 011 1v5a3 3 0 11-2 0V4a1 1 0 011-1zM5 5h2v2.5a5.029 5.029 0 01-2-1.5V5zm10 0v1a5.029 5.029 0 01-2 1.5V5h2z" />
  </svg>
);

const FlameIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
    <path d="M9 16.5c-3.314 0-6-2.462-6-5.5 0-2.056 1.07-3.674 2.134-4.878.395-.447.79-.84 1.124-1.178.11-.111.212-.216.303-.314C7.356 3.79 8.5 2.25 8.5 1.5c0 0 .5 1.5 1.5 3 .667 1 1.5 1.5 1.5 1.5s-.167-1-.5-2c1.5 1 3 3.5 3 6 0 3.038-2.686 5.5-6 5.5z" />
  </svg>
);

const ChartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15.75 15.75H2.25V2.25" />
    <path d="M5.25 12.75l3-4.5 3 3 4.5-6" />
  </svg>
);

const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="5.25" r="3" />
    <path d="M3 15.75v-1.5a3 3 0 013-3h6a3 3 0 013 3v1.5" />
  </svg>
);

const UsersIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 15v-1.5a3 3 0 00-3-3H5.25a3 3 0 00-3 3V15" />
    <circle cx="7.125" cy="5.25" r="2.25" />
    <path d="M15.75 15v-1.5a3 3 0 00-2.25-2.9M12 2.6a3 3 0 010 5.3" />
  </svg>
);

const DocumentIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.5 1.5H4.5a1.5 1.5 0 00-1.5 1.5v12a1.5 1.5 0 001.5 1.5h9a1.5 1.5 0 001.5-1.5V6L10.5 1.5z" />
    <path d="M10.5 1.5V6H15M6 9h6M6 12h4" />
  </svg>
);

const AnnotationIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 9.75v4.5a1.5 1.5 0 01-1.5 1.5h-9A1.5 1.5 0 013 14.25v-9A1.5 1.5 0 014.5 3.75h4.5" />
    <path d="M12.75 2.25l3 3-6.75 6.75H6V9l6.75-6.75z" />
  </svg>
);

const MessageIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 11.25a1.5 1.5 0 01-1.5 1.5H5.25L2.25 15.75V4.5A1.5 1.5 0 013.75 3h9.75a1.5 1.5 0 011.5 1.5v6.75z" />
  </svg>
);

const BadgeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 11.25a3 3 0 100-6 3 3 0 000 6z" />
    <path d="M13.05 12.3l.45 4.2-4.5-2.4-4.5 2.4.45-4.2" />
    <path d="M9 1.5l1.65 3.45 3.6.45-2.7 2.55.6 3.45L9 9.75 5.85 11.4l.6-3.45-2.7-2.55 3.6-.45L9 1.5z" />
  </svg>
);

const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
  </svg>
);

const LevelIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12.75h3v3.75H3zM7.5 8.25h3v8.25h-3zM12 3.75h3V16.5h-3z" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2.25" y="3" width="13.5" height="12.75" rx="1.5" />
    <path d="M12 1.5v3M6 1.5v3M2.25 7.5h13.5" />
  </svg>
);

const ArrowUpIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 11V3M3.5 6.5L7 3l3.5 3.5" />
  </svg>
);

const ArrowDownIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 3v8M3.5 7.5L7 11l3.5-3.5" />
  </svg>
);

const ExportIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8.75 1a.75.75 0 00-1.5 0v6.59L5.03 5.37a.75.75 0 00-1.06 1.06l3.5 3.5a.75.75 0 001.06 0l3.5-3.5a.75.75 0 00-1.06-1.06L8.75 7.59V1z" />
    <path d="M1.75 9a.75.75 0 00-.75.75v3.5c0 .966.784 1.75 1.75 1.75h10.5A1.75 1.75 0 0015 13.25v-3.5a.75.75 0 00-1.5 0v3.5a.25.25 0 01-.25.25H2.75a.25.25 0 01-.25-.25v-3.5A.75.75 0 001.75 9z" />
  </svg>
);

const ProfileIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 8a3 3 0 100-6 3 3 0 000 6zM2 14s-1 0-1-1 1-4 7-4 7 3 7 4-1 1-1 1H2z" />
  </svg>
);

const LogoutIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path fillRule="evenodd" d="M3 3.5A1.5 1.5 0 014.5 2h5A1.5 1.5 0 0111 3.5v1a.5.5 0 01-1 0v-1a.5.5 0 00-.5-.5h-5a.5.5 0 00-.5.5v9a.5.5 0 00.5.5h5a.5.5 0 00.5-.5v-1a.5.5 0 011 0v1A1.5 1.5 0 019.5 14h-5A1.5 1.5 0 013 12.5v-9z" clipRule="evenodd" />
    <path fillRule="evenodd" d="M12.354 8.354a.5.5 0 000-.708l-2.5-2.5a.5.5 0 10-.708.708L11.293 8l-2.147 2.146a.5.5 0 00.708.708l2.5-2.5z" clipRule="evenodd" />
    <path fillRule="evenodd" d="M6 8a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5A.5.5 0 016 8z" clipRule="evenodd" />
  </svg>
);

const CrownIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 3l2.5 5 5.5 1-4 4 1 5.5-5-3-5 3 1-5.5-4-4 5.5-1L12 3z" />
  </svg>
);

// ═══════════════════════════════════════════════════════════════
// NAV DATA
// ═══════════════════════════════════════════════════════════════

const navItems = [
  { id: 'discover', label: 'Discover' },
  { id: 'corpuses', label: 'Corpuses' },
  { id: 'documents', label: 'Documents' },
  { id: 'labelsets', label: 'Label Sets' },
  { id: 'annotations', label: 'Annotations' },
  { id: 'extracts', label: 'Extracts' },
  { id: 'leaderboard', label: 'Leaderboard' },
];

const userMenuItems = [
  { id: 'exports', label: 'Exports', icon: <ExportIcon /> },
  { id: 'profile', label: 'Profile', icon: <ProfileIcon /> },
  { id: 'divider', label: '', divider: true },
  { id: 'logout', label: 'Logout', icon: <LogoutIcon />, danger: true },
];

// ═══════════════════════════════════════════════════════════════
// SAMPLE DATA
// ═══════════════════════════════════════════════════════════════

interface LeaderboardUser {
  id: string;
  name: string;
  avatar?: string;
  level: number;
  levelName: string;
  xp: number;
  xpToNextLevel: number;
  streak: number;
  rank: number;
  previousRank: number;
  annotations: number;
  documents: number;
  discussions: number;
  badges: number;
}

const sampleUsers: LeaderboardUser[] = [
  { id: '1', name: 'Sarah Chen', level: 12, levelName: 'Expert', xp: 4850, xpToNextLevel: 5000, streak: 23, rank: 1, previousRank: 1, annotations: 1243, documents: 156, discussions: 89, badges: 12 },
  { id: '2', name: 'John Scrudato', level: 10, levelName: 'Advanced', xp: 3200, xpToNextLevel: 4000, streak: 15, rank: 2, previousRank: 3, annotations: 892, documents: 89, discussions: 67, badges: 9 },
  { id: '3', name: 'Alex Rivera', level: 9, levelName: 'Advanced', xp: 2891, xpToNextLevel: 3500, streak: 8, rank: 3, previousRank: 2, annotations: 756, documents: 234, discussions: 45, badges: 8 },
  { id: '4', name: 'Emma Davis', level: 8, levelName: 'Intermediate', xp: 2100, xpToNextLevel: 2500, streak: 12, rank: 4, previousRank: 4, annotations: 543, documents: 67, discussions: 34, badges: 6 },
  { id: '5', name: 'Mike Johnson', level: 7, levelName: 'Intermediate', xp: 1800, xpToNextLevel: 2000, streak: 5, rank: 5, previousRank: 6, annotations: 432, documents: 45, discussions: 28, badges: 5 },
  { id: '6', name: 'Lisa Wang', level: 6, levelName: 'Contributor', xp: 1200, xpToNextLevel: 1500, streak: 3, rank: 6, previousRank: 5, annotations: 321, documents: 23, discussions: 19, badges: 4 },
  { id: '7', name: 'David Park', level: 5, levelName: 'Contributor', xp: 980, xpToNextLevel: 1200, streak: 7, rank: 7, previousRank: 8, annotations: 245, documents: 34, discussions: 12, badges: 3 },
  { id: '8', name: 'Rachel Green', level: 4, levelName: 'Learner', xp: 650, xpToNextLevel: 800, streak: 2, rank: 8, previousRank: 7, annotations: 178, documents: 12, discussions: 8, badges: 2 },
];

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  earnedCount: number;
  totalUsers: number;
  earned?: boolean;
  progress?: number;
}

const sampleBadges: Badge[] = [
  { id: '1', name: 'First Steps', description: 'Create your first annotation', icon: '🎯', color: '#059669', rarity: 'common', earnedCount: 156, totalUsers: 200, earned: true },
  { id: '2', name: 'Annotator', description: 'Create 100 annotations', icon: '✍️', color: '#0F766E', rarity: 'uncommon', earnedCount: 45, totalUsers: 200, earned: true },
  { id: '3', name: 'Conversationalist', description: 'Start 10 discussions', icon: '💬', color: '#2563EB', rarity: 'uncommon', earnedCount: 34, totalUsers: 200, earned: true, progress: 100 },
  { id: '4', name: 'Streak Master', description: 'Maintain a 7-day streak', icon: '🔥', color: '#D97706', rarity: 'rare', earnedCount: 23, totalUsers: 200, earned: false, progress: 71 },
  { id: '5', name: 'Document Curator', description: 'Upload 50 documents', icon: '📚', color: '#7C3AED', rarity: 'rare', earnedCount: 18, totalUsers: 200, earned: false, progress: 45 },
  { id: '6', name: 'Community Leader', description: 'Reach Level 10', icon: '👑', color: '#DC2626', rarity: 'epic', earnedCount: 8, totalUsers: 200, earned: false, progress: 80 },
  { id: '7', name: 'Legal Scholar', description: 'Annotate 1000 documents', icon: '🎓', color: '#0F766E', rarity: 'legendary', earnedCount: 3, totalUsers: 200, earned: false, progress: 12 },
  { id: '8', name: 'Founding Member', description: 'Join during beta', icon: '⭐', color: '#D97706', rarity: 'legendary', earnedCount: 12, totalUsers: 200, earned: true },
];

// Activity data for the chart (last 12 weeks)
const activityData = [
  { week: 'W1', annotations: 45, documents: 12, discussions: 8 },
  { week: 'W2', annotations: 52, documents: 8, discussions: 12 },
  { week: 'W3', annotations: 38, documents: 15, discussions: 6 },
  { week: 'W4', annotations: 67, documents: 10, discussions: 14 },
  { week: 'W5', annotations: 72, documents: 18, discussions: 9 },
  { week: 'W6', annotations: 58, documents: 14, discussions: 11 },
  { week: 'W7', annotations: 89, documents: 22, discussions: 16 },
  { week: 'W8', annotations: 94, documents: 19, discussions: 13 },
  { week: 'W9', annotations: 78, documents: 16, discussions: 18 },
  { week: 'W10', annotations: 102, documents: 25, discussions: 21 },
  { week: 'W11', annotations: 95, documents: 20, discussions: 15 },
  { week: 'W12', annotations: 118, documents: 28, discussions: 24 },
];

// Heatmap data (last 52 weeks, 7 days each)
const generateHeatmapData = () => {
  const data: number[][] = [];
  for (let week = 0; week < 26; week++) {
    const weekData: number[] = [];
    for (let day = 0; day < 7; day++) {
      weekData.push(Math.floor(Math.random() * 5));
    }
    data.push(weekData);
  }
  return data;
};

const heatmapData = generateHeatmapData();

// ═══════════════════════════════════════════════════════════════
// PAGE STYLES
// ═══════════════════════════════════════════════════════════════

const pageStyles = `
  .leaderboard-page {
    min-height: 100vh;
    background: var(--oc-bg-canvas, #FAFAFA);
    font-family: var(--oc-font-family, 'Inter', -apple-system, BlinkMacSystemFont, sans-serif);
  }

  .leaderboard-page__content {
    max-width: 1100px;
    margin: 0 auto;
    padding: 48px 24px 80px;
  }

  /* Hero */
  .leaderboard-hero {
    margin-bottom: 40px;
  }

  .leaderboard-hero__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 24px;
    margin-bottom: 32px;
  }

  .leaderboard-hero__title {
    font-family: 'Georgia', 'Times New Roman', serif;
    font-size: 42px;
    font-weight: 400;
    line-height: 1.2;
    color: #1E293B;
    margin: 0 0 12px;
  }

  .leaderboard-hero__title span {
    color: #0F766E;
  }

  .leaderboard-hero__subtitle {
    font-size: 17px;
    line-height: 1.6;
    color: #64748B;
    margin: 0;
    max-width: 500px;
  }

  /* View Toggle */
  .view-toggle {
    display: flex;
    background: white;
    border: 1px solid #E2E8F0;
    border-radius: 10px;
    padding: 4px;
    gap: 4px;
  }

  .view-toggle__btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    font-size: 14px;
    font-weight: 500;
    color: #64748B;
    background: transparent;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .view-toggle__btn:hover {
    color: #1E293B;
    background: #F8FAFC;
  }

  .view-toggle__btn--active {
    color: white;
    background: #0F766E;
  }

  .view-toggle__btn--active:hover {
    color: white;
    background: #0D9488;
  }

  /* Time Filter */
  .time-filter {
    display: flex;
    gap: 8px;
    margin-bottom: 32px;
  }

  .time-filter__btn {
    padding: 8px 16px;
    font-size: 13px;
    font-weight: 500;
    color: #64748B;
    background: white;
    border: 1px solid #E2E8F0;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .time-filter__btn:hover {
    border-color: #CBD5E1;
    color: #1E293B;
  }

  .time-filter__btn--active {
    background: #0F766E;
    border-color: #0F766E;
    color: white;
  }

  /* Stats Grid */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin-bottom: 40px;
  }

  .stat-card {
    background: white;
    border: 1px solid #E2E8F0;
    border-radius: 12px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .stat-card__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .stat-card__icon {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #F0FDFA;
    border-radius: 10px;
    color: #0F766E;
  }

  .stat-card__trend {
    display: flex;
    align-items: center;
    gap: 2px;
    font-size: 12px;
    font-weight: 600;
  }

  .stat-card__trend--up {
    color: #059669;
  }

  .stat-card__trend--down {
    color: #DC2626;
  }

  .stat-card__value {
    font-size: 32px;
    font-weight: 600;
    color: #1E293B;
    line-height: 1;
  }

  .stat-card__label {
    font-size: 14px;
    color: #64748B;
  }

  /* Podium */
  .podium {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    gap: 16px;
    margin-bottom: 40px;
    padding: 32px 24px 0;
    background: linear-gradient(180deg, #F0FDFA 0%, transparent 100%);
    border-radius: 16px;
  }

  .podium__place {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .podium__avatar-wrap {
    position: relative;
    margin-bottom: 12px;
  }

  .podium__crown {
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    color: #D97706;
  }

  .podium__rank-badge {
    position: absolute;
    bottom: -4px;
    right: -4px;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 700;
    color: white;
    border-radius: 50%;
    border: 2px solid white;
  }

  .podium__rank-badge--1 {
    background: linear-gradient(135deg, #D97706 0%, #F59E0B 100%);
  }

  .podium__rank-badge--2 {
    background: linear-gradient(135deg, #64748B 0%, #94A3B8 100%);
  }

  .podium__rank-badge--3 {
    background: linear-gradient(135deg, #B45309 0%, #D97706 100%);
  }

  .podium__name {
    font-size: 15px;
    font-weight: 600;
    color: #1E293B;
    margin-bottom: 4px;
  }

  .podium__stats {
    font-size: 13px;
    color: #64748B;
    margin-bottom: 12px;
  }

  .podium__bar {
    width: 100px;
    border-radius: 8px 8px 0 0;
  }

  .podium__bar--1 {
    height: 120px;
    background: linear-gradient(180deg, #0F766E 0%, #0D9488 100%);
  }

  .podium__bar--2 {
    height: 90px;
    background: linear-gradient(180deg, #475569 0%, #64748B 100%);
  }

  .podium__bar--3 {
    height: 70px;
    background: linear-gradient(180deg, #92400E 0%, #B45309 100%);
  }

  /* Activity Chart */
  .activity-chart {
    background: white;
    border: 1px solid #E2E8F0;
    border-radius: 12px;
    padding: 24px;
    margin-bottom: 32px;
  }

  .activity-chart__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
  }

  .activity-chart__title {
    font-size: 16px;
    font-weight: 600;
    color: #1E293B;
    margin: 0;
  }

  .activity-chart__legend {
    display: flex;
    gap: 16px;
  }

  .activity-chart__legend-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    color: #64748B;
  }

  .activity-chart__legend-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }

  .activity-chart__graph {
    height: 200px;
    display: flex;
    align-items: flex-end;
    gap: 8px;
    padding-bottom: 24px;
    border-bottom: 1px solid #E2E8F0;
  }

  .activity-chart__bar-group {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }

  .activity-chart__bars {
    display: flex;
    align-items: flex-end;
    gap: 2px;
    height: 160px;
  }

  .activity-chart__bar {
    width: 8px;
    border-radius: 4px;
    transition: height 0.3s ease;
  }

  .activity-chart__bar--annotations {
    background: #0F766E;
  }

  .activity-chart__bar--documents {
    background: #2563EB;
  }

  .activity-chart__bar--discussions {
    background: #7C3AED;
  }

  .activity-chart__label {
    font-size: 11px;
    color: #94A3B8;
  }

  /* Leaderboard Table */
  .leaderboard-table {
    background: white;
    border: 1px solid #E2E8F0;
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 32px;
  }

  .leaderboard-table__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 24px;
    border-bottom: 1px solid #E2E8F0;
  }

  .leaderboard-table__title {
    font-size: 16px;
    font-weight: 600;
    color: #1E293B;
    margin: 0;
  }

  .leaderboard-table__head {
    display: grid;
    grid-template-columns: 60px 1fr 100px 100px 100px 100px 80px;
    gap: 16px;
    padding: 12px 24px;
    background: #F8FAFC;
    border-bottom: 1px solid #E2E8F0;
    font-size: 12px;
    font-weight: 600;
    color: #64748B;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .leaderboard-table__row {
    display: grid;
    grid-template-columns: 60px 1fr 100px 100px 100px 100px 80px;
    gap: 16px;
    padding: 16px 24px;
    border-bottom: 1px solid #E2E8F0;
    align-items: center;
    transition: background 0.15s ease;
  }

  .leaderboard-table__row:last-child {
    border-bottom: none;
  }

  .leaderboard-table__row:hover {
    background: #F8FAFC;
  }

  .leaderboard-table__row--highlight {
    background: #F0FDFA;
  }

  .leaderboard-table__row--highlight:hover {
    background: #CCFBF1;
  }

  .leaderboard-table__rank {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .leaderboard-table__rank-num {
    font-size: 15px;
    font-weight: 600;
    color: #1E293B;
    width: 24px;
  }

  .leaderboard-table__rank-change {
    display: flex;
    align-items: center;
    font-size: 11px;
  }

  .leaderboard-table__rank-change--up {
    color: #059669;
  }

  .leaderboard-table__rank-change--down {
    color: #DC2626;
  }

  .leaderboard-table__rank-change--same {
    color: #94A3B8;
  }

  .leaderboard-table__user {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .leaderboard-table__user-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .leaderboard-table__user-name {
    font-size: 14px;
    font-weight: 500;
    color: #1E293B;
  }

  .leaderboard-table__user-level {
    font-size: 12px;
    color: #64748B;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .leaderboard-table__stat {
    font-size: 14px;
    color: #1E293B;
    font-weight: 500;
  }

  .leaderboard-table__streak {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 14px;
    font-weight: 600;
    color: #D97706;
  }

  /* Badge Grid */
  .badge-section {
    background: white;
    border: 1px solid #E2E8F0;
    border-radius: 12px;
    padding: 24px;
    margin-bottom: 32px;
  }

  .badge-section__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .badge-section__title {
    font-size: 16px;
    font-weight: 600;
    color: #1E293B;
    margin: 0;
  }

  .badge-section__count {
    font-size: 14px;
    color: #64748B;
  }

  .badge-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }

  .badge-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 20px 16px;
    background: #F8FAFC;
    border: 1px solid #E2E8F0;
    border-radius: 12px;
    transition: all 0.15s ease;
  }

  .badge-card:hover {
    border-color: #CBD5E1;
    transform: translateY(-2px);
  }

  .badge-card--earned {
    background: white;
  }

  .badge-card--locked {
    opacity: 0.6;
  }

  .badge-card__icon {
    font-size: 32px;
    margin-bottom: 12px;
  }

  .badge-card__name {
    font-size: 14px;
    font-weight: 600;
    color: #1E293B;
    margin-bottom: 4px;
  }

  .badge-card__description {
    font-size: 12px;
    color: #64748B;
    margin-bottom: 12px;
    line-height: 1.4;
  }

  .badge-card__rarity {
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: 4px 8px;
    border-radius: 4px;
    margin-bottom: 8px;
  }

  .badge-card__rarity--common {
    background: #F1F5F9;
    color: #64748B;
  }

  .badge-card__rarity--uncommon {
    background: #DCFCE7;
    color: #059669;
  }

  .badge-card__rarity--rare {
    background: #DBEAFE;
    color: #2563EB;
  }

  .badge-card__rarity--epic {
    background: #EDE9FE;
    color: #7C3AED;
  }

  .badge-card__rarity--legendary {
    background: #FEF3C7;
    color: #D97706;
  }

  .badge-card__progress-text {
    font-size: 11px;
    color: #64748B;
    margin-top: 4px;
  }

  .badge-card__earned-count {
    font-size: 11px;
    color: #94A3B8;
    margin-top: 4px;
  }

  /* Heatmap */
  .heatmap-section {
    background: white;
    border: 1px solid #E2E8F0;
    border-radius: 12px;
    padding: 24px;
  }

  .heatmap-section__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .heatmap-section__title {
    font-size: 16px;
    font-weight: 600;
    color: #1E293B;
    margin: 0;
  }

  .heatmap-section__legend {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    color: #64748B;
  }

  .heatmap-section__legend-scale {
    display: flex;
    gap: 2px;
  }

  .heatmap-section__legend-box {
    width: 12px;
    height: 12px;
    border-radius: 2px;
  }

  .heatmap {
    display: flex;
    gap: 3px;
  }

  .heatmap__week {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .heatmap__day {
    width: 12px;
    height: 12px;
    border-radius: 2px;
    background: #E2E8F0;
  }

  .heatmap__day--level-1 {
    background: #CCFBF1;
  }

  .heatmap__day--level-2 {
    background: #5EEAD4;
  }

  .heatmap__day--level-3 {
    background: #14B8A6;
  }

  .heatmap__day--level-4 {
    background: #0F766E;
  }

  /* My Stats View */
  .my-stats {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 24px;
  }

  .my-stats__main {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .my-stats__sidebar {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .profile-card {
    background: white;
    border: 1px solid #E2E8F0;
    border-radius: 12px;
    padding: 24px;
    text-align: center;
  }

  .profile-card__avatar {
    margin-bottom: 16px;
  }

  .profile-card__name {
    font-size: 20px;
    font-weight: 600;
    color: #1E293B;
    margin: 0 0 4px;
  }

  .profile-card__level {
    font-size: 14px;
    color: #0F766E;
    font-weight: 500;
    margin-bottom: 16px;
  }

  .profile-card__xp {
    margin-bottom: 8px;
  }

  .profile-card__xp-text {
    font-size: 12px;
    color: #64748B;
    margin-top: 4px;
  }

  .profile-card__stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #E2E8F0;
  }

  .profile-card__stat {
    text-align: center;
  }

  .profile-card__stat-value {
    font-size: 24px;
    font-weight: 600;
    color: #1E293B;
  }

  .profile-card__stat-label {
    font-size: 12px;
    color: #64748B;
  }

  .streak-card {
    background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%);
    border: 1px solid #F59E0B;
    border-radius: 12px;
    padding: 20px;
    text-align: center;
  }

  .streak-card__icon {
    font-size: 32px;
    margin-bottom: 8px;
  }

  .streak-card__value {
    font-size: 36px;
    font-weight: 700;
    color: #92400E;
    line-height: 1;
  }

  .streak-card__label {
    font-size: 14px;
    color: #B45309;
    font-weight: 500;
  }

  .streak-card__subtitle {
    font-size: 12px;
    color: #D97706;
    margin-top: 8px;
  }

  /* Responsive */
  @media (max-width: 1024px) {
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .leaderboard-table__head,
    .leaderboard-table__row {
      grid-template-columns: 50px 1fr 80px 80px 60px;
    }

    .leaderboard-table__head > *:nth-child(4),
    .leaderboard-table__row > *:nth-child(4),
    .leaderboard-table__head > *:nth-child(5),
    .leaderboard-table__row > *:nth-child(5) {
      display: none;
    }

    .badge-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .my-stats {
      grid-template-columns: 1fr;
    }

    .my-stats__sidebar {
      flex-direction: row;
    }

    .profile-card,
    .streak-card {
      flex: 1;
    }
  }

  @media (max-width: 768px) {
    .leaderboard-page__content {
      padding: 32px 16px 60px;
    }

    .leaderboard-hero__header {
      flex-direction: column;
    }

    .leaderboard-hero__title {
      font-size: 32px;
    }

    .view-toggle {
      width: 100%;
    }

    .view-toggle__btn {
      flex: 1;
      justify-content: center;
    }

    .stats-grid {
      grid-template-columns: 1fr 1fr;
    }

    .podium {
      padding: 24px 16px 0;
    }

    .podium__bar {
      width: 80px;
    }

    .leaderboard-table__head,
    .leaderboard-table__row {
      grid-template-columns: 40px 1fr 60px;
    }

    .leaderboard-table__head > *:nth-child(n+4),
    .leaderboard-table__row > *:nth-child(n+4) {
      display: none;
    }

    .badge-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .heatmap {
      overflow-x: auto;
      padding-bottom: 8px;
    }

    .activity-chart {
      overflow: hidden;
    }

    .activity-chart__header {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
    }

    .activity-chart__legend {
      flex-wrap: wrap;
      gap: 8px 16px;
    }

    .activity-chart__graph {
      overflow-x: auto;
      padding-bottom: 8px;
    }

    .activity-chart__bar-group {
      min-width: 24px;
    }

    .my-stats__sidebar {
      flex-direction: column;
    }
  }
`;

// ═══════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════

const StatCard: React.FC<{
  icon: React.ReactNode;
  value: number | string;
  label: string;
  trend?: number;
}> = ({ icon, value, label, trend }) => (
  <div className="stat-card">
    <div className="stat-card__header">
      <div className="stat-card__icon">{icon}</div>
      {trend !== undefined && (
        <div className={`stat-card__trend ${trend >= 0 ? 'stat-card__trend--up' : 'stat-card__trend--down'}`}>
          {trend >= 0 ? <ArrowUpIcon /> : <ArrowDownIcon />}
          {Math.abs(trend)}%
        </div>
      )}
    </div>
    <div className="stat-card__value">{value}</div>
    <div className="stat-card__label">{label}</div>
  </div>
);

const Podium: React.FC<{ users: LeaderboardUser[] }> = ({ users }) => {
  const [first, second, third] = [users[0], users[1], users[2]];

  return (
    <div className="podium">
      {/* Second place */}
      <div className="podium__place">
        <div className="podium__avatar-wrap">
          <Avatar name={second.name} size="lg" />
          <div className="podium__rank-badge podium__rank-badge--2">2</div>
        </div>
        <div className="podium__name">{second.name}</div>
        <div className="podium__stats">{second.annotations.toLocaleString()} annotations</div>
        <div className="podium__bar podium__bar--2" />
      </div>

      {/* First place */}
      <div className="podium__place">
        <div className="podium__avatar-wrap">
          <div className="podium__crown"><CrownIcon /></div>
          <Avatar name={first.name} size="xl" />
          <div className="podium__rank-badge podium__rank-badge--1">1</div>
        </div>
        <div className="podium__name">{first.name}</div>
        <div className="podium__stats">{first.annotations.toLocaleString()} annotations</div>
        <div className="podium__bar podium__bar--1" />
      </div>

      {/* Third place */}
      <div className="podium__place">
        <div className="podium__avatar-wrap">
          <Avatar name={third.name} size="lg" />
          <div className="podium__rank-badge podium__rank-badge--3">3</div>
        </div>
        <div className="podium__name">{third.name}</div>
        <div className="podium__stats">{third.annotations.toLocaleString()} annotations</div>
        <div className="podium__bar podium__bar--3" />
      </div>
    </div>
  );
};

const ActivityChart: React.FC = () => {
  const maxValue = Math.max(...activityData.map(d => d.annotations));

  return (
    <div className="activity-chart">
      <div className="activity-chart__header">
        <h3 className="activity-chart__title">Activity Trends</h3>
        <div className="activity-chart__legend">
          <div className="activity-chart__legend-item">
            <div className="activity-chart__legend-dot" style={{ background: '#0F766E' }} />
            Annotations
          </div>
          <div className="activity-chart__legend-item">
            <div className="activity-chart__legend-dot" style={{ background: '#2563EB' }} />
            Documents
          </div>
          <div className="activity-chart__legend-item">
            <div className="activity-chart__legend-dot" style={{ background: '#7C3AED' }} />
            Discussions
          </div>
        </div>
      </div>
      <div className="activity-chart__graph">
        {activityData.map((data, i) => (
          <div key={i} className="activity-chart__bar-group">
            <div className="activity-chart__bars">
              <div
                className="activity-chart__bar activity-chart__bar--annotations"
                style={{ height: `${(data.annotations / maxValue) * 100}%` }}
              />
              <div
                className="activity-chart__bar activity-chart__bar--documents"
                style={{ height: `${(data.documents / maxValue) * 100}%` }}
              />
              <div
                className="activity-chart__bar activity-chart__bar--discussions"
                style={{ height: `${(data.discussions / maxValue) * 100}%` }}
              />
            </div>
            <div className="activity-chart__label">{data.week}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const LeaderboardTable: React.FC<{ users: LeaderboardUser[]; metric: string; currentUserId?: string }> = ({ users, metric, currentUserId }) => {
  const getMetricValue = (user: LeaderboardUser) => {
    switch (metric) {
      case 'annotations': return user.annotations;
      case 'documents': return user.documents;
      case 'discussions': return user.discussions;
      case 'badges': return user.badges;
      default: return user.annotations;
    }
  };

  return (
    <div className="leaderboard-table">
      <div className="leaderboard-table__header">
        <h3 className="leaderboard-table__title">Rankings</h3>
      </div>
      <div className="leaderboard-table__head">
        <div>Rank</div>
        <div>User</div>
        <div>Annotations</div>
        <div>Documents</div>
        <div>Discussions</div>
        <div>Badges</div>
        <div>Streak</div>
      </div>
      {users.map((user) => {
        const rankChange = user.previousRank - user.rank;
        return (
          <div
            key={user.id}
            className={`leaderboard-table__row ${user.id === currentUserId ? 'leaderboard-table__row--highlight' : ''}`}
          >
            <div className="leaderboard-table__rank">
              <span className="leaderboard-table__rank-num">{user.rank}</span>
              <span className={`leaderboard-table__rank-change ${
                rankChange > 0 ? 'leaderboard-table__rank-change--up' :
                rankChange < 0 ? 'leaderboard-table__rank-change--down' :
                'leaderboard-table__rank-change--same'
              }`}>
                {rankChange > 0 && <ArrowUpIcon />}
                {rankChange < 0 && <ArrowDownIcon />}
                {rankChange === 0 && '—'}
              </span>
            </div>
            <div className="leaderboard-table__user">
              <Avatar name={user.name} size="sm" />
              <div className="leaderboard-table__user-info">
                <div className="leaderboard-table__user-name">{user.name}</div>
                <div className="leaderboard-table__user-level">
                  <LevelIcon /> Level {user.level} · {user.levelName}
                </div>
              </div>
            </div>
            <div className="leaderboard-table__stat">{user.annotations.toLocaleString()}</div>
            <div className="leaderboard-table__stat">{user.documents.toLocaleString()}</div>
            <div className="leaderboard-table__stat">{user.discussions.toLocaleString()}</div>
            <div className="leaderboard-table__stat">{user.badges}</div>
            <div className="leaderboard-table__streak">
              <FlameIcon /> {user.streak}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const BadgeGrid: React.FC<{ badges: Badge[] }> = ({ badges }) => (
  <div className="badge-section">
    <div className="badge-section__header">
      <h3 className="badge-section__title">Badges</h3>
      <div className="badge-section__count">
        {badges.filter(b => b.earned).length} / {badges.length} earned
      </div>
    </div>
    <div className="badge-grid">
      {badges.map((badge) => (
        <div key={badge.id} className={`badge-card ${badge.earned ? 'badge-card--earned' : 'badge-card--locked'}`}>
          <div className="badge-card__icon">{badge.icon}</div>
          <div className="badge-card__name">{badge.name}</div>
          <div className="badge-card__description">{badge.description}</div>
          <div className={`badge-card__rarity badge-card__rarity--${badge.rarity}`}>
            {badge.rarity}
          </div>
          {!badge.earned && badge.progress !== undefined && (
            <>
              <Progress value={badge.progress} max={100} size="sm" />
              <div className="badge-card__progress-text">{badge.progress}% complete</div>
            </>
          )}
          {badge.earned && (
            <div className="badge-card__earned-count">
              {badge.earnedCount} users earned
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

const Heatmap: React.FC = () => (
  <div className="heatmap-section">
    <div className="heatmap-section__header">
      <h3 className="heatmap-section__title">Contribution Activity</h3>
      <div className="heatmap-section__legend">
        Less
        <div className="heatmap-section__legend-scale">
          <div className="heatmap-section__legend-box" style={{ background: '#E2E8F0' }} />
          <div className="heatmap-section__legend-box" style={{ background: '#CCFBF1' }} />
          <div className="heatmap-section__legend-box" style={{ background: '#5EEAD4' }} />
          <div className="heatmap-section__legend-box" style={{ background: '#14B8A6' }} />
          <div className="heatmap-section__legend-box" style={{ background: '#0F766E' }} />
        </div>
        More
      </div>
    </div>
    <div className="heatmap">
      {heatmapData.map((week, weekIndex) => (
        <div key={weekIndex} className="heatmap__week">
          {week.map((level, dayIndex) => (
            <div
              key={dayIndex}
              className={`heatmap__day ${level > 0 ? `heatmap__day--level-${level}` : ''}`}
              title={`${level} contributions`}
            />
          ))}
        </div>
      ))}
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════════
// MAIN PAGE COMPONENT
// ═══════════════════════════════════════════════════════════════

type ViewMode = 'community' | 'personal';
type TimePeriod = 'week' | 'month' | 'year' | 'all';
type MetricType = 'annotations' | 'documents' | 'discussions' | 'badges';

const LeaderboardPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('community');
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('all');
  const [metric, setMetric] = useState<MetricType>('annotations');

  const currentUser = sampleUsers[1]; // John Scrudato

  const metricTabs = [
    { id: 'annotations', label: 'Annotations', icon: <AnnotationIcon /> },
    { id: 'documents', label: 'Documents', icon: <DocumentIcon /> },
    { id: 'discussions', label: 'Discussions', icon: <MessageIcon /> },
    { id: 'badges', label: 'Badges', icon: <BadgeIcon /> },
  ];

  return (
    <>
      <style>{pageStyles}</style>
      <div className="leaderboard-page">
        <NavBar
          brandName="Open Contracts"
          brandVersion="v3.0.0"
          items={navItems}
          activeId="leaderboard"
          onNavigate={() => {}}
          userName="John Scrudato"
          userMenuItems={userMenuItems}
          onUserMenuSelect={() => {}}
        />

        <div className="leaderboard-page__content">
          {/* Hero */}
          <div className="leaderboard-hero">
            <div className="leaderboard-hero__header">
              <div>
                <h1 className="leaderboard-hero__title">
                  Community <span>leaderboard</span>
                </h1>
                <p className="leaderboard-hero__subtitle">
                  Track your progress, earn badges, and see how you rank among contributors.
                </p>
              </div>

              <div className="view-toggle">
                <button
                  className={`view-toggle__btn ${viewMode === 'community' ? 'view-toggle__btn--active' : ''}`}
                  onClick={() => setViewMode('community')}
                >
                  <UsersIcon /> Community
                </button>
                <button
                  className={`view-toggle__btn ${viewMode === 'personal' ? 'view-toggle__btn--active' : ''}`}
                  onClick={() => setViewMode('personal')}
                >
                  <UserIcon /> My Stats
                </button>
              </div>
            </div>

            <div className="time-filter">
              {(['week', 'month', 'year', 'all'] as TimePeriod[]).map((period) => (
                <button
                  key={period}
                  className={`time-filter__btn ${timePeriod === period ? 'time-filter__btn--active' : ''}`}
                  onClick={() => setTimePeriod(period)}
                >
                  {period === 'week' && 'This Week'}
                  {period === 'month' && 'This Month'}
                  {period === 'year' && 'This Year'}
                  {period === 'all' && 'All Time'}
                </button>
              ))}
            </div>
          </div>

          {viewMode === 'community' ? (
            <>
              {/* Stats Grid */}
              <div className="stats-grid">
                <StatCard icon={<UsersIcon />} value="1,247" label="Active Contributors" trend={12} />
                <StatCard icon={<AnnotationIcon />} value="142K" label="Annotations Created" trend={8} />
                <StatCard icon={<DocumentIcon />} value="23K" label="Documents Uploaded" trend={15} />
                <StatCard icon={<BadgeIcon />} value="3,891" label="Badges Awarded" trend={23} />
              </div>

              {/* Podium */}
              <Podium users={sampleUsers} />

              {/* Category Tabs */}
              <div style={{ marginBottom: '24px' }}>
                <FilterTabs
                  items={metricTabs}
                  value={metric}
                  onChange={(id) => setMetric(id as MetricType)}
                />
              </div>

              {/* Activity Chart */}
              <ActivityChart />

              {/* Leaderboard Table */}
              <LeaderboardTable users={sampleUsers} metric={metric} currentUserId={currentUser.id} />

              {/* Badge Section */}
              <BadgeGrid badges={sampleBadges} />
            </>
          ) : (
            <div className="my-stats">
              <div className="my-stats__main">
                {/* Personal Stats */}
                <div className="stats-grid" style={{ marginBottom: 0 }}>
                  <StatCard icon={<AnnotationIcon />} value={currentUser.annotations.toLocaleString()} label="Annotations" trend={15} />
                  <StatCard icon={<DocumentIcon />} value={currentUser.documents.toLocaleString()} label="Documents" trend={8} />
                  <StatCard icon={<MessageIcon />} value={currentUser.discussions.toLocaleString()} label="Discussions" trend={22} />
                  <StatCard icon={<BadgeIcon />} value={currentUser.badges} label="Badges" trend={10} />
                </div>

                {/* Activity Chart */}
                <ActivityChart />

                {/* Heatmap */}
                <Heatmap />

                {/* Badges */}
                <BadgeGrid badges={sampleBadges} />
              </div>

              <div className="my-stats__sidebar">
                {/* Profile Card */}
                <div className="profile-card">
                  <div className="profile-card__avatar">
                    <Avatar name={currentUser.name} size="xl" />
                  </div>
                  <h2 className="profile-card__name">{currentUser.name}</h2>
                  <div className="profile-card__level">
                    Level {currentUser.level} · {currentUser.levelName}
                  </div>
                  <div className="profile-card__xp">
                    <Progress value={currentUser.xp} max={currentUser.xpToNextLevel} size="sm" />
                    <div className="profile-card__xp-text">
                      {currentUser.xp.toLocaleString()} / {currentUser.xpToNextLevel.toLocaleString()} XP
                    </div>
                  </div>
                  <div className="profile-card__stats">
                    <div className="profile-card__stat">
                      <div className="profile-card__stat-value">#{currentUser.rank}</div>
                      <div className="profile-card__stat-label">Global Rank</div>
                    </div>
                    <div className="profile-card__stat">
                      <div className="profile-card__stat-value">Top 5%</div>
                      <div className="profile-card__stat-label">Percentile</div>
                    </div>
                  </div>
                </div>

                {/* Streak Card */}
                <div className="streak-card">
                  <div className="streak-card__icon">🔥</div>
                  <div className="streak-card__value">{currentUser.streak}</div>
                  <div className="streak-card__label">Day Streak</div>
                  <div className="streak-card__subtitle">Keep it going!</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// ═══════════════════════════════════════════════════════════════
// STORIES
// ═══════════════════════════════════════════════════════════════

export const Default: StoryObj = {
  render: () => <LeaderboardPage />,
};

export const PersonalStats: StoryObj = {
  render: () => {
    const PersonalView: React.FC = () => {
      const [timePeriod, setTimePeriod] = useState<TimePeriod>('all');
      const currentUser = sampleUsers[1];

      return (
        <>
          <style>{pageStyles}</style>
          <div className="leaderboard-page">
            <NavBar
              brandName="Open Contracts"
              brandVersion="v3.0.0"
              items={navItems}
              activeId="leaderboard"
              onNavigate={() => {}}
              userName="John Scrudato"
              userMenuItems={userMenuItems}
              onUserMenuSelect={() => {}}
            />

            <div className="leaderboard-page__content">
              <div className="leaderboard-hero">
                <div className="leaderboard-hero__header">
                  <div>
                    <h1 className="leaderboard-hero__title">
                      Your <span>stats</span>
                    </h1>
                    <p className="leaderboard-hero__subtitle">
                      Track your contributions and progress over time.
                    </p>
                  </div>

                  <div className="view-toggle">
                    <button className="view-toggle__btn">
                      <UsersIcon /> Community
                    </button>
                    <button className="view-toggle__btn view-toggle__btn--active">
                      <UserIcon /> My Stats
                    </button>
                  </div>
                </div>

                <div className="time-filter">
                  {(['week', 'month', 'year', 'all'] as TimePeriod[]).map((period) => (
                    <button
                      key={period}
                      className={`time-filter__btn ${timePeriod === period ? 'time-filter__btn--active' : ''}`}
                      onClick={() => setTimePeriod(period)}
                    >
                      {period === 'week' && 'This Week'}
                      {period === 'month' && 'This Month'}
                      {period === 'year' && 'This Year'}
                      {period === 'all' && 'All Time'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="my-stats">
                <div className="my-stats__main">
                  <div className="stats-grid" style={{ marginBottom: 0 }}>
                    <StatCard icon={<AnnotationIcon />} value={currentUser.annotations.toLocaleString()} label="Annotations" trend={15} />
                    <StatCard icon={<DocumentIcon />} value={currentUser.documents.toLocaleString()} label="Documents" trend={8} />
                    <StatCard icon={<MessageIcon />} value={currentUser.discussions.toLocaleString()} label="Discussions" trend={22} />
                    <StatCard icon={<BadgeIcon />} value={currentUser.badges} label="Badges" trend={10} />
                  </div>
                  <ActivityChart />
                  <Heatmap />
                  <BadgeGrid badges={sampleBadges} />
                </div>

                <div className="my-stats__sidebar">
                  <div className="profile-card">
                    <div className="profile-card__avatar">
                      <Avatar name={currentUser.name} size="xl" />
                    </div>
                    <h2 className="profile-card__name">{currentUser.name}</h2>
                    <div className="profile-card__level">
                      Level {currentUser.level} · {currentUser.levelName}
                    </div>
                    <div className="profile-card__xp">
                      <Progress value={currentUser.xp} max={currentUser.xpToNextLevel} size="sm" />
                      <div className="profile-card__xp-text">
                        {currentUser.xp.toLocaleString()} / {currentUser.xpToNextLevel.toLocaleString()} XP
                      </div>
                    </div>
                    <div className="profile-card__stats">
                      <div className="profile-card__stat">
                        <div className="profile-card__stat-value">#{currentUser.rank}</div>
                        <div className="profile-card__stat-label">Global Rank</div>
                      </div>
                      <div className="profile-card__stat">
                        <div className="profile-card__stat-value">Top 5%</div>
                        <div className="profile-card__stat-label">Percentile</div>
                      </div>
                    </div>
                  </div>

                  <div className="streak-card">
                    <div className="streak-card__icon">🔥</div>
                    <div className="streak-card__value">{currentUser.streak}</div>
                    <div className="streak-card__label">Day Streak</div>
                    <div className="streak-card__subtitle">Keep it going!</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    };

    return <PersonalView />;
  },
};
