import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NavBar } from '../NavBar';
import { SearchBox } from '../SearchBox';
import { Card, CardBody } from '../Card';
import { Button, IconButton } from '../Button';
import { EmptyState } from '../EmptyState';
import { FilterTabs } from '../FilterTabs';
import { Chip } from '../Chip';
import { Popover } from '../Popover';
import { Avatar } from '../Avatar';
import { HStack, VStack, Spacer } from '../Stack';

const meta: Meta = {
  title: 'Pages/LabelSetListPage',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

// ═══════════════════════════════════════════════════════════════
// ICONS
// ═══════════════════════════════════════════════════════════════

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 2a.75.75 0 01.75.75v4.5h4.5a.75.75 0 010 1.5h-4.5v4.5a.75.75 0 01-1.5 0v-4.5h-4.5a.75.75 0 010-1.5h4.5v-4.5A.75.75 0 018 2z" />
  </svg>
);

const TagIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M33.3 19.5L19.5 33.3a2.5 2.5 0 01-3.5 0L6.7 24a2.5 2.5 0 010-3.5L20.5 6.7A2.5 2.5 0 0122.3 6H32.5A2.5 2.5 0 0135 8.5v10.2a2.5 2.5 0 01-.7 1.8z" />
    <circle cx="27.5" cy="13.5" r="2" />
  </svg>
);

const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M11.013 1.427a1.75 1.75 0 012.474 0l1.086 1.086a1.75 1.75 0 010 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 01-.927-.928l.929-3.25a1.75 1.75 0 01.445-.758l8.61-8.61zm1.414 1.06a.25.25 0 00-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 000-.354l-1.086-1.086zM11.189 6.25L9.75 4.81l-6.286 6.287a.25.25 0 00-.064.108l-.558 1.953 1.953-.558a.249.249 0 00.108-.064l6.286-6.286z" />
  </svg>
);

const ShareIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M12.5 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm0-1a2.5 2.5 0 00-2.45 3.01L5.95 7.53a2.5 2.5 0 100 2.94l4.1 2.52a2.5 2.5 0 101.06-1.64l-4.1-2.52a2.5 2.5 0 000-.66l4.1-2.52A2.5 2.5 0 1012.5 2zM3.5 9a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm9 5a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
  </svg>
);

const DuplicateIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M10.5 3a.5.5 0 01.5.5V5h1.5a.5.5 0 010 1H11v1.5a.5.5 0 01-1 0V6H8.5a.5.5 0 010-1H10V3.5a.5.5 0 01.5-.5z" />
    <path d="M4 2a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H4zm0 1h8a1 1 0 011 1v8a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1z" />
  </svg>
);

const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z" />
    <path fillRule="evenodd" d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
  </svg>
);

const KebabIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16">
    <circle cx="8" cy="3" r="1.5" fill="currentColor" />
    <circle cx="8" cy="8" r="1.5" fill="currentColor" />
    <circle cx="8" cy="13" r="1.5" fill="currentColor" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 3l5 5-5 5" />
  </svg>
);

const GlobeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="7" cy="7" r="6" />
    <path d="M1 7h12M7 1c1.66 1.86 2.6 4.24 2.6 6.8s-.94 4.94-2.6 6.8c-1.66-1.86-2.6-4.24-2.6-6.8S5.34 2.86 7 1z" />
  </svg>
);

const LockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="6" width="8" height="6.5" rx="1" />
    <path d="M5 6V4.5a2 2 0 014 0V6" />
  </svg>
);

const UsersIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 12v-1a2 2 0 00-2-2h-4a2 2 0 00-2 2v1" />
    <circle cx="5.5" cy="5" r="2" />
    <path d="M12.5 12v-1a2 2 0 00-1.5-1.93M9 3.07a2 2 0 010 3.86" />
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

interface LabelSet {
  id: string;
  title: string;
  description: string;
  owner: string;
  ownerEmail: string;
  visibility: 'public' | 'private' | 'shared';
  docLabelCount: number;
  spanLabelCount: number;
  usedInCorpuses: number;
  lastUpdated: string;
  colors: string[]; // Preview of label colors
}

const sampleLabelSets: LabelSet[] = [
  {
    id: '1',
    title: 'Contract Clause Types',
    description: 'Comprehensive set for categorizing contract clauses and provisions',
    owner: 'John Scrudato',
    ownerEmail: 'john@opencontracts.io',
    visibility: 'public',
    docLabelCount: 5,
    spanLabelCount: 12,
    usedInCorpuses: 23,
    lastUpdated: '2 hours ago',
    colors: ['#0F766E', '#2563EB', '#7C3AED', '#DC2626'],
  },
  {
    id: '2',
    title: 'SEC Filing Categories',
    description: 'Labels for classifying SEC regulatory filings and forms',
    owner: 'Sarah Chen',
    ownerEmail: 'sarah@lawfirm.com',
    visibility: 'public',
    docLabelCount: 8,
    spanLabelCount: 6,
    usedInCorpuses: 15,
    lastUpdated: '1 day ago',
    colors: ['#059669', '#D97706', '#0F766E'],
  },
  {
    id: '3',
    title: 'Due Diligence Markers',
    description: 'Risk indicators and key terms for M&A due diligence review',
    owner: 'Alex Rivera',
    ownerEmail: 'alex@lawfirm.com',
    visibility: 'shared',
    docLabelCount: 3,
    spanLabelCount: 24,
    usedInCorpuses: 8,
    lastUpdated: '3 hours ago',
    colors: ['#DC2626', '#D97706', '#059669', '#2563EB'],
  },
  {
    id: '4',
    title: 'Employment Terms',
    description: 'Labels for employment contract provisions and benefits',
    owner: 'Mike Johnson',
    ownerEmail: 'mike@corp.com',
    visibility: 'private',
    docLabelCount: 4,
    spanLabelCount: 18,
    usedInCorpuses: 4,
    lastUpdated: '5 days ago',
    colors: ['#7C3AED', '#EC4899', '#0F766E'],
  },
  {
    id: '5',
    title: 'Privacy Compliance',
    description: 'GDPR, CCPA, and privacy regulation compliance markers',
    owner: 'Emma Davis',
    ownerEmail: 'emma@tech.co',
    visibility: 'public',
    docLabelCount: 6,
    spanLabelCount: 15,
    usedInCorpuses: 31,
    lastUpdated: '1 week ago',
    colors: ['#0F766E', '#059669', '#2563EB'],
  },
  {
    id: '6',
    title: 'Intellectual Property',
    description: 'Patent, trademark, and licensing agreement labels',
    owner: 'John Scrudato',
    ownerEmail: 'john@opencontracts.io',
    visibility: 'public',
    docLabelCount: 7,
    spanLabelCount: 9,
    usedInCorpuses: 12,
    lastUpdated: '2 weeks ago',
    colors: ['#2563EB', '#7C3AED', '#D97706', '#DC2626'],
  },
];

// ═══════════════════════════════════════════════════════════════
// PAGE STYLES
// ═══════════════════════════════════════════════════════════════

const contextMenuStyles = `
  .labelset-context-menu {
    min-width: 160px;
    padding: 6px 0;
    background: white;
    border: 1px solid #E2E8F0;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .labelset-context-menu__item {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding: 10px 14px;
    background: transparent;
    border: none;
    font-size: 14px;
    color: #334155;
    text-align: left;
    cursor: pointer;
    transition: background 0.15s;
  }

  .labelset-context-menu__item:hover {
    background: #F1F5F9;
  }

  .labelset-context-menu__item--danger {
    color: #DC2626;
  }

  .labelset-context-menu__item--danger:hover {
    background: #FEF2F2;
  }

  .labelset-context-menu__divider {
    height: 1px;
    background: #E2E8F0;
    margin: 6px 0;
  }

  .labelset-context-menu__icon {
    width: 16px;
    height: 16px;
    opacity: 0.7;
  }
`;

const pageStyles = `
  .labelset-list-page {
    min-height: 100vh;
    background: var(--oc-bg-canvas, #FAFAFA);
    font-family: var(--oc-font-family, 'Inter', -apple-system, BlinkMacSystemFont, sans-serif);
  }

  .labelset-list-page__content {
    max-width: 900px;
    margin: 0 auto;
    padding: 48px 24px 80px;
  }

  /* Hero section */
  .labelset-list-page__hero {
    margin-bottom: 48px;
  }

  .labelset-list-page__title {
    font-family: 'Georgia', 'Times New Roman', serif;
    font-size: 42px;
    font-weight: 400;
    line-height: 1.2;
    color: #1E293B;
    margin: 0 0 16px;
  }

  .labelset-list-page__title span {
    color: #0F766E;
  }

  .labelset-list-page__subtitle {
    font-size: 17px;
    line-height: 1.6;
    color: #64748B;
    margin: 0 0 32px;
    max-width: 600px;
  }

  /* Stats grid */
  .labelset-list-page__stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
    margin-bottom: 48px;
    padding: 32px 0;
  }

  .labelset-list-page__stat {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .labelset-list-page__stat-value {
    font-size: 36px;
    font-weight: 600;
    color: #0F766E;
    line-height: 1.1;
  }

  .labelset-list-page__stat-label {
    font-size: 15px;
    font-weight: 500;
    color: #1E293B;
  }

  .labelset-list-page__stat-desc {
    font-size: 13px;
    color: #94A3B8;
  }

  /* Action row */
  .labelset-list-page__actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 16px;
  }

  /* Search and filters */
  .labelset-list-page__toolbar {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 24px;
  }

  .labelset-list-page__search {
    flex: 1;
    max-width: 400px;
  }

  /* Section header */
  .labelset-list-page__section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .labelset-list-page__section-title {
    font-family: 'Georgia', 'Times New Roman', serif;
    font-size: 24px;
    font-weight: 400;
    color: #0F766E;
    margin: 0;
  }

  /* Label Set Card */
  .labelset-card {
    display: flex;
    align-items: flex-start;
    gap: 20px;
    padding: 20px 24px;
    background: white;
    border: 1px solid #E2E8F0;
    border-radius: 12px;
    transition: all 0.15s ease;
    cursor: pointer;
    text-decoration: none;
    color: inherit;
  }

  .labelset-card:hover {
    border-color: #CBD5E1;
    box-shadow: 0 4px 12px rgba(15, 23, 42, 0.04);
  }

  .labelset-card__icon {
    width: 56px;
    height: 56px;
    background: linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%);
    border: 1px solid #E2E8F0;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #94A3B8;
    flex-shrink: 0;
    position: relative;
    overflow: hidden;
  }

  .labelset-card__color-strip {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 4px;
    display: flex;
  }

  .labelset-card__color-segment {
    flex: 1;
  }

  .labelset-card__content {
    flex: 1;
    min-width: 0;
  }

  .labelset-card__header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 4px;
  }

  .labelset-card__title {
    font-size: 16px;
    font-weight: 600;
    color: #1E293B;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .labelset-card__visibility {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    color: #64748B;
    flex-shrink: 0;
  }

  .labelset-card__description {
    font-size: 14px;
    color: #64748B;
    margin: 0 0 12px;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .labelset-card__meta {
    display: flex;
    align-items: center;
    gap: 16px;
    font-size: 13px;
    color: #94A3B8;
  }

  .labelset-card__meta-item {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .labelset-card__meta-value {
    font-weight: 500;
    color: #64748B;
  }

  .labelset-card__actions {
    display: flex;
    align-items: center;
    gap: 4px;
    flex-shrink: 0;
    opacity: 0;
    transition: opacity 0.15s ease;
  }

  .labelset-card:hover .labelset-card__actions {
    opacity: 1;
  }

  /* List */
  .labelset-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  /* Empty state */
  .labelset-empty {
    text-align: center;
    padding: 64px 24px;
    background: white;
    border: 1px solid #E2E8F0;
    border-radius: 12px;
  }

  .labelset-empty__icon {
    width: 64px;
    height: 64px;
    margin: 0 auto 20px;
    color: #94A3B8;
  }

  .labelset-empty__title {
    font-size: 18px;
    font-weight: 600;
    color: #1E293B;
    margin: 0 0 8px;
  }

  .labelset-empty__description {
    font-size: 14px;
    color: #64748B;
    margin: 0 0 24px;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
  }

  @media (max-width: 768px) {
    .labelset-list-page__content {
      padding: 32px 16px 60px;
    }

    .labelset-list-page__title {
      font-size: 32px;
    }

    .labelset-list-page__stats {
      grid-template-columns: 1fr;
      gap: 24px;
    }

    .labelset-list-page__stat-value {
      font-size: 28px;
    }

    .labelset-list-page__toolbar {
      flex-direction: column;
      align-items: stretch;
    }

    .labelset-list-page__search {
      max-width: none;
    }

    .labelset-card {
      flex-direction: column;
      gap: 16px;
    }

    .labelset-card__actions {
      opacity: 1;
    }
  }
`;

// ═══════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════

const LabelSetCardIcon: React.FC<{ colors: string[] }> = ({ colors }) => (
  <div className="labelset-card__icon">
    <TagIcon />
    <div className="labelset-card__color-strip">
      {colors.slice(0, 4).map((color, i) => (
        <div
          key={i}
          className="labelset-card__color-segment"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  </div>
);

const VisibilityBadge: React.FC<{ visibility: 'public' | 'private' | 'shared' }> = ({ visibility }) => {
  const config = {
    public: { icon: <GlobeIcon />, label: 'Public' },
    private: { icon: <LockIcon />, label: 'Private' },
    shared: { icon: <UsersIcon />, label: 'Shared' },
  };

  const { icon, label } = config[visibility];

  return (
    <span className="labelset-card__visibility">
      {icon}
      {label}
    </span>
  );
};

const LabelSetContextMenu: React.FC = () => (
  <div className="labelset-context-menu">
    <button className="labelset-context-menu__item">
      <span className="labelset-context-menu__icon"><EditIcon /></span>
      Edit
    </button>
    <button className="labelset-context-menu__item">
      <span className="labelset-context-menu__icon"><ShareIcon /></span>
      Share
    </button>
    <button className="labelset-context-menu__item">
      <span className="labelset-context-menu__icon"><DuplicateIcon /></span>
      Duplicate
    </button>
    <div className="labelset-context-menu__divider" />
    <button className="labelset-context-menu__item labelset-context-menu__item--danger">
      <span className="labelset-context-menu__icon"><TrashIcon /></span>
      Delete
    </button>
  </div>
);

const LabelSetCard: React.FC<{ labelSet: LabelSet }> = ({ labelSet }) => (
  <div className="labelset-card">
    <LabelSetCardIcon colors={labelSet.colors} />
    <div className="labelset-card__content">
      <div className="labelset-card__header">
        <h3 className="labelset-card__title">{labelSet.title}</h3>
        <VisibilityBadge visibility={labelSet.visibility} />
      </div>
      <p className="labelset-card__description">{labelSet.description}</p>
      <div className="labelset-card__meta">
        <span className="labelset-card__meta-item">
          <span className="labelset-card__meta-value">{labelSet.docLabelCount + labelSet.spanLabelCount}</span> labels
        </span>
        <span className="labelset-card__meta-item">
          Used in <span className="labelset-card__meta-value">{labelSet.usedInCorpuses}</span> corpuses
        </span>
        <span className="labelset-card__meta-item">
          {labelSet.lastUpdated}
        </span>
      </div>
    </div>
    <div className="labelset-card__actions">
      <Popover
        trigger={
          <IconButton
            variant="ghost"
            size="sm"
            aria-label="More actions"
            onClick={(e) => e.stopPropagation()}
          >
            <KebabIcon />
          </IconButton>
        }
        content={<LabelSetContextMenu />}
        position="bottom-end"
      />
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════════
// MAIN PAGE COMPONENT
// ═══════════════════════════════════════════════════════════════

type FilterType = 'all' | 'my' | 'public' | 'shared';

const LabelSetListPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filterTabs = [
    { id: 'all', label: 'All', count: sampleLabelSets.length },
    { id: 'my', label: 'My Label Sets', count: sampleLabelSets.filter(ls => ls.owner === 'John Scrudato').length },
    { id: 'public', label: 'Public', count: sampleLabelSets.filter(ls => ls.visibility === 'public').length },
    { id: 'shared', label: 'Shared with me', count: sampleLabelSets.filter(ls => ls.visibility === 'shared').length },
  ];

  const filteredLabelSets = sampleLabelSets.filter((ls) => {
    const matchesSearch =
      ls.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ls.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      activeFilter === 'all' ||
      (activeFilter === 'my' && ls.owner === 'John Scrudato') ||
      (activeFilter === 'public' && ls.visibility === 'public') ||
      (activeFilter === 'shared' && ls.visibility === 'shared');

    return matchesSearch && matchesFilter;
  });

  const totalLabels = sampleLabelSets.reduce((sum, ls) => sum + ls.docLabelCount + ls.spanLabelCount, 0);
  const totalUsage = sampleLabelSets.reduce((sum, ls) => sum + ls.usedInCorpuses, 0);

  return (
    <>
      <style>{pageStyles}</style>
      <style>{contextMenuStyles}</style>
      <div className="labelset-list-page">
        <NavBar
          brandName="Open Contracts"
          brandVersion="v3.0.0"
          items={navItems}
          activeId="labelsets"
          onNavigate={() => {}}
          userName="John Scrudato"
          userMenuItems={userMenuItems}
          onUserMenuSelect={() => {}}
        />

        <div className="labelset-list-page__content">
          <div className="labelset-list-page__hero">
            <h1 className="labelset-list-page__title">
              Organize with <span>label sets</span>
            </h1>
            <p className="labelset-list-page__subtitle">
              Create reusable collections of labels for categorizing documents and annotating text spans.
              Share label sets with your team or the community.
            </p>
          </div>

          <div className="labelset-list-page__stats">
            <div className="labelset-list-page__stat">
              <div className="labelset-list-page__stat-value">{sampleLabelSets.length}</div>
              <div className="labelset-list-page__stat-label">Label Sets</div>
              <div className="labelset-list-page__stat-desc">available to you</div>
            </div>
            <div className="labelset-list-page__stat">
              <div className="labelset-list-page__stat-value">{totalLabels}</div>
              <div className="labelset-list-page__stat-label">Total Labels</div>
              <div className="labelset-list-page__stat-desc">across all sets</div>
            </div>
            <div className="labelset-list-page__stat">
              <div className="labelset-list-page__stat-value">{totalUsage}</div>
              <div className="labelset-list-page__stat-label">Corpus Uses</div>
              <div className="labelset-list-page__stat-desc">active deployments</div>
            </div>
          </div>

          <div className="labelset-list-page__actions">
            <Button variant="primary">
              <PlusIcon /> New Label Set
            </Button>
          </div>

          <div className="labelset-list-page__toolbar">
            <div className="labelset-list-page__search">
              <SearchBox
                placeholder="Search label sets..."
                value={searchQuery}
                onChange={setSearchQuery}
                onSubmit={() => {}}
              />
            </div>
            <Spacer />
            <FilterTabs
              items={filterTabs}
              value={activeFilter}
              onChange={(id) => setActiveFilter(id as FilterType)}
            />
          </div>

          {filteredLabelSets.length > 0 ? (
            <div className="labelset-list">
              {filteredLabelSets.map((labelSet) => (
                <LabelSetCard key={labelSet.id} labelSet={labelSet} />
              ))}
            </div>
          ) : (
            <div className="labelset-empty">
              <div className="labelset-empty__icon">
                <TagIcon />
              </div>
              <h3 className="labelset-empty__title">
                {searchQuery ? `No label sets match "${searchQuery}"` : 'No label sets yet'}
              </h3>
              <p className="labelset-empty__description">
                {searchQuery
                  ? 'Try a different search term or create a new label set.'
                  : 'Create your first label set to start organizing your annotations.'}
              </p>
              <Button variant="primary">
                <PlusIcon /> Create Label Set
              </Button>
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
  render: () => <LabelSetListPage />,
};

export const Empty: StoryObj = {
  render: () => {
    const EmptyPage: React.FC = () => {
      return (
        <>
          <style>{pageStyles}</style>
          <div className="labelset-list-page">
            <NavBar
              brandName="Open Contracts"
              brandVersion="v3.0.0"
              items={navItems}
              activeId="labelsets"
              onNavigate={() => {}}
              userName="John Scrudato"
              userMenuItems={userMenuItems}
              onUserMenuSelect={() => {}}
            />

            <div className="labelset-list-page__content">
              <div className="labelset-list-page__hero">
                <h1 className="labelset-list-page__title">
                  Organize with <span>label sets</span>
                </h1>
                <p className="labelset-list-page__subtitle">
                  Create reusable collections of labels for categorizing documents and annotating text spans.
                  Share label sets with your team or the community.
                </p>
              </div>

              <div className="labelset-empty">
                <div className="labelset-empty__icon">
                  <TagIcon />
                </div>
                <h3 className="labelset-empty__title">No label sets yet</h3>
                <p className="labelset-empty__description">
                  Create your first label set to start organizing your annotations.
                  Label sets can be shared with your team or made public for the community.
                </p>
                <Button variant="primary">
                  <PlusIcon /> Create Your First Label Set
                </Button>
              </div>
            </div>
          </div>
        </>
      );
    };

    return <EmptyPage />;
  },
};

export const SearchResults: StoryObj = {
  render: () => {
    const SearchResultsPage: React.FC = () => {
      const [searchQuery] = useState('contract');

      const filteredLabelSets = sampleLabelSets.filter(
        (ls) =>
          ls.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ls.description.toLowerCase().includes(searchQuery.toLowerCase())
      );

      return (
        <>
          <style>{pageStyles}</style>
          <style>{contextMenuStyles}</style>
          <div className="labelset-list-page">
            <NavBar
              brandName="Open Contracts"
              brandVersion="v3.0.0"
              items={navItems}
              activeId="labelsets"
              onNavigate={() => {}}
              userName="John Scrudato"
              userMenuItems={userMenuItems}
              onUserMenuSelect={() => {}}
            />

            <div className="labelset-list-page__content">
              <div className="labelset-list-page__hero">
                <h1 className="labelset-list-page__title">
                  Organize with <span>label sets</span>
                </h1>
                <p className="labelset-list-page__subtitle">
                  Create reusable collections of labels for categorizing documents and annotating text spans.
                  Share label sets with your team or the community.
                </p>
              </div>

              <div className="labelset-list-page__toolbar">
                <div className="labelset-list-page__search">
                  <SearchBox
                    placeholder="Search label sets..."
                    value={searchQuery}
                    onChange={() => {}}
                    onSubmit={() => {}}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '16px', fontSize: '14px', color: '#64748B' }}>
                {filteredLabelSets.length} results for "{searchQuery}"
              </div>

              <div className="labelset-list">
                {filteredLabelSets.map((labelSet) => (
                  <LabelSetCard key={labelSet.id} labelSet={labelSet} />
                ))}
              </div>
            </div>
          </div>
        </>
      );
    };

    return <SearchResultsPage />;
  },
};
