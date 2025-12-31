import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NavBar } from '../NavBar';
import { PageHeader } from '../PageHeader';
import { SearchInput } from '../SearchInput';
import { Card, CardBody } from '../Card';
import { Chip } from '../Chip';
import { Button, IconButton } from '../Button';
import { HStack, VStack } from '../Stack';
import { Avatar } from '../Avatar';
import { EmptyState } from '../EmptyState';
import { FilterTabs } from '../FilterTabs';

const meta: Meta = {
  title: 'Pages/CorpusListPage',
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

const DocumentIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
    <path d="M4 1a1 1 0 00-1 1v10a1 1 0 001 1h6a1 1 0 001-1V4.414A1 1 0 0010.707 4L8 1.293A1 1 0 007.586 1H4zm3.5 1.5v2a.5.5 0 00.5.5h2l-2.5-2.5z" />
  </svg>
);

const AnnotationIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
    <path d="M12.146 1.146a.5.5 0 01.708.708l-8 8a.5.5 0 01-.168.11l-3.5 1.5a.5.5 0 01-.65-.65l1.5-3.5a.5.5 0 01.11-.168l8-8z" />
  </svg>
);

const LabelIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
    <path d="M2 2v4.586l6 6L12.586 8l-6-6H2zm2 1a1 1 0 110 2 1 1 0 010-2z" />
  </svg>
);

const GlobeIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
    <path d="M6 0a6 6 0 100 12A6 6 0 006 0zM1.5 6c0-.51.084-1 .239-1.459l2.478 2.478a.5.5 0 00.283.141v.79a1 1 0 001 1h.5v1.507A4.505 4.505 0 011.5 6zm7.5 3.5v-1a.5.5 0 00-.5-.5h-1a.5.5 0 01-.5-.5v-.5a.5.5 0 01.5-.5h.5a.5.5 0 00.5-.5V5a.5.5 0 01.5-.5h.5a.5.5 0 00.4-.2l.894-1.192A4.5 4.5 0 019 9.5z" />
  </svg>
);

const LockIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
    <path d="M4 4V3a2 2 0 114 0v1h1a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1V5a1 1 0 011-1h1zm1 0h2V3a1 1 0 10-2 0v1z" />
  </svg>
);

const UsersIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
    <path d="M9 6a2 2 0 11-1.5 3.354L5.354 11.5A2 2 0 113 11c0-.177.023-.349.067-.513L5.146 8.41A2 2 0 019 6z" />
  </svg>
);

const MoreIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 4a1 1 0 110-2 1 1 0 010 2zm0 5a1 1 0 110-2 1 1 0 010 2zm0 5a1 1 0 110-2 1 1 0 010 2z" />
  </svg>
);

const GridIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M1 2.5A1.5 1.5 0 012.5 1h3A1.5 1.5 0 017 2.5v3A1.5 1.5 0 015.5 7h-3A1.5 1.5 0 011 5.5v-3zm8 0A1.5 1.5 0 0110.5 1h3A1.5 1.5 0 0115 2.5v3A1.5 1.5 0 0113.5 7h-3A1.5 1.5 0 019 5.5v-3zm-8 8A1.5 1.5 0 012.5 9h3A1.5 1.5 0 017 10.5v3A1.5 1.5 0 015.5 15h-3A1.5 1.5 0 011 13.5v-3zm8 0A1.5 1.5 0 0110.5 9h3a1.5 1.5 0 011.5 1.5v3a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 019 13.5v-3z" />
  </svg>
);

const ListIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path fillRule="evenodd" d="M2 4a1 1 0 100-2 1 1 0 000 2zm3.5-1.5a.5.5 0 000 1h8a.5.5 0 000-1h-8zm0 4a.5.5 0 000 1h8a.5.5 0 000-1h-8zm0 4a.5.5 0 000 1h8a.5.5 0 000-1h-8zM2 8a1 1 0 100-2 1 1 0 000 2zm0 4a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
  </svg>
);

const FolderIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <path d="M4 12a4 4 0 014-4h8.343a4 4 0 012.829 1.172l1.656 1.656A4 4 0 0023.657 12H32a4 4 0 014 4v16a4 4 0 01-4 4H8a4 4 0 01-4-4V12z" fill="currentColor" />
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
  { id: 'profile', label: 'Profile' },
  { id: 'divider', label: '', divider: true },
  { id: 'logout', label: 'Logout', danger: true },
];

// ═══════════════════════════════════════════════════════════════
// SAMPLE DATA
// ═══════════════════════════════════════════════════════════════

interface Corpus {
  id: string;
  title: string;
  description: string;
  owner: string;
  ownerEmail: string;
  visibility: 'public' | 'private' | 'shared';
  documentCount: number;
  annotationCount: number;
  labelSetCount: number;
  labelCount: number;
  labels: string[];
  lastUpdated: string;
  color: string;
  coverImage?: string;
}

const sampleCorpuses: Corpus[] = [
  {
    id: '1',
    title: 'Federal Securities Regulations',
    description: 'SEC filings and regulatory documents for compliance analysis',
    owner: 'Sarah Chen',
    ownerEmail: 'schen@lawfirm.com',
    visibility: 'public',
    documentCount: 156,
    annotationCount: 1243,
    labelSetCount: 2,
    labelCount: 45,
    labels: ['Securities', 'Compliance', 'Federal'],
    lastUpdated: '2 hours ago',
    color: '#0F766E',
    coverImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
  },
  {
    id: '2',
    title: 'Employment Contracts Archive',
    description: 'Standard employment agreements and amendments for reference',
    owner: 'Mike Johnson',
    ownerEmail: 'mjohnson@corp.com',
    visibility: 'private',
    documentCount: 89,
    annotationCount: 567,
    labelSetCount: 1,
    labelCount: 23,
    labels: ['Employment', 'HR', 'Contracts'],
    lastUpdated: '1 day ago',
    color: '#7C3AED',
  },
  {
    id: '3',
    title: 'M&A Due Diligence - Project Alpha',
    description: 'Confidential materials for ongoing acquisition review',
    owner: 'Alex Rivera',
    ownerEmail: 'arivera@lawfirm.com',
    visibility: 'shared',
    documentCount: 234,
    annotationCount: 2891,
    labelSetCount: 3,
    labelCount: 67,
    labels: ['M&A', 'Due Diligence', 'Confidential'],
    lastUpdated: '3 hours ago',
    color: '#DC2626',
    coverImage: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop',
  },
  {
    id: '4',
    title: 'Intellectual Property Portfolio',
    description: 'Patent filings, trademarks, and licensing agreements',
    owner: 'Emma Davis',
    ownerEmail: 'edavis@tech.co',
    visibility: 'private',
    documentCount: 67,
    annotationCount: 432,
    labelSetCount: 1,
    labelCount: 18,
    labels: ['IP', 'Patents', 'Licensing'],
    lastUpdated: '5 days ago',
    color: '#2563EB',
  },
  {
    id: '5',
    title: 'Real Estate Transactions',
    description: 'Commercial property leases and purchase agreements',
    owner: 'John Scrudato',
    ownerEmail: 'jscrudato@umich.edu',
    visibility: 'public',
    documentCount: 45,
    annotationCount: 289,
    labelSetCount: 1,
    labelCount: 12,
    labels: ['Real Estate', 'Commercial'],
    lastUpdated: '1 week ago',
    color: '#059669',
  },
  {
    id: '6',
    title: 'Privacy Policy Templates',
    description: 'GDPR and CCPA compliant privacy policy drafts',
    owner: 'Sarah Chen',
    ownerEmail: 'schen@lawfirm.com',
    visibility: 'public',
    documentCount: 23,
    annotationCount: 156,
    labelSetCount: 1,
    labelCount: 8,
    labels: ['Privacy', 'GDPR', 'Compliance'],
    lastUpdated: '2 weeks ago',
    color: '#F59E0B',
  },
  {
    id: '7',
    title: 'Test Corpus',
    description: 'A test corpus for development and experimentation',
    owner: 'John Scrudato',
    ownerEmail: 'jscrudato@umich.edu',
    visibility: 'private',
    documentCount: 0,
    annotationCount: 0,
    labelSetCount: 0,
    labelCount: 0,
    labels: [],
    lastUpdated: 'Just now',
    color: '#64748B',
  },
];

// ═══════════════════════════════════════════════════════════════
// PAGE STYLES
// ═══════════════════════════════════════════════════════════════

const pageStyles = `
  .corpus-list-page {
    min-height: 100vh;
    background: var(--oc-bg-canvas, #FAFAFA);
    font-family: var(--oc-font-family, 'Inter', -apple-system, BlinkMacSystemFont, sans-serif);
  }

  .corpus-list-page__content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 32px 24px;
  }

  .corpus-list-page__header {
    margin-bottom: 24px;
  }

  .corpus-list-page__toolbar {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 24px;
    flex-wrap: wrap;
  }

  .corpus-list-page__search {
    flex: 1;
    min-width: 200px;
    max-width: 400px;
  }

  .corpus-list-page__view-toggle {
    display: flex;
    align-items: center;
    background: var(--oc-bg-surface, white);
    border: 1px solid var(--oc-border-default, #E2E8F0);
    border-radius: var(--oc-radius-md, 8px);
    padding: 3px;
  }

  .corpus-list-page__view-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    padding: 0;
    background: transparent;
    border: none;
    border-radius: var(--oc-radius-sm, 6px);
    color: var(--oc-fg-tertiary, #94A3B8);
    cursor: pointer;
    transition: all var(--oc-duration-fast, 0.15s) var(--oc-easing-default);
  }

  .corpus-list-page__view-btn:hover {
    color: var(--oc-fg-secondary, #475569);
  }

  .corpus-list-page__view-btn--active {
    background: var(--oc-bg-surface-hover, #F1F5F9);
    color: var(--oc-fg-primary, #1E293B);
  }

  /* Grid Layout */
  .corpus-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: 20px;
  }

  /* Corpus Card */
  .corpus-card {
    display: flex;
    flex-direction: column;
    background: var(--oc-bg-surface, white);
    border: 1px solid var(--oc-border-default, #E2E8F0);
    border-radius: var(--oc-radius-lg, 12px);
    overflow: hidden;
    transition: all var(--oc-duration-fast, 0.15s) var(--oc-easing-default);
    cursor: pointer;
  }

  .corpus-card:hover {
    border-color: var(--oc-border-strong, #CBD5E1);
    box-shadow: var(--oc-shadow-md, 0 4px 6px rgba(15, 23, 42, 0.04));
    transform: translateY(-2px);
  }

  .corpus-card__cover {
    position: relative;
    height: 120px;
    overflow: hidden;
    background: linear-gradient(135deg, var(--cover-color, #0F766E) 0%, color-mix(in srgb, var(--cover-color, #0F766E) 70%, black) 100%);
  }

  .corpus-card__cover-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .corpus-card__cover-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 50%);
  }

  .corpus-card__cover-icon {
    position: absolute;
    bottom: 12px;
    left: 16px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    border-radius: var(--oc-radius-md, 8px);
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  }

  .corpus-card__cover-icon svg {
    width: 24px;
    height: 24px;
  }

  .corpus-card__header {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    padding: 16px 20px 0;
  }

  .corpus-card__header--with-cover {
    padding-top: 12px;
  }

  .corpus-card__icon {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--oc-radius-md, 8px);
    flex-shrink: 0;
  }

  .corpus-card__icon svg {
    width: 28px;
    height: 28px;
  }

  .corpus-card__title-row {
    flex: 1;
    min-width: 0;
  }

  .corpus-card__title {
    font-size: 16px;
    font-weight: 600;
    color: var(--oc-fg-primary, #1E293B);
    margin: 0 0 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .corpus-card__visibility {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    font-weight: 500;
  }

  .corpus-card__visibility--public {
    color: var(--oc-success, #059669);
  }

  .corpus-card__visibility--private {
    color: var(--oc-fg-tertiary, #94A3B8);
  }

  .corpus-card__visibility--shared {
    color: var(--oc-info, #0891B2);
  }

  .corpus-card__menu {
    flex-shrink: 0;
  }

  .corpus-card__body {
    padding: 12px 20px 16px;
    flex: 1;
  }

  .corpus-card__description {
    font-size: 14px;
    color: var(--oc-fg-secondary, #475569);
    margin: 0 0 12px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-height: 1.5;
  }

  .corpus-card__labels {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .corpus-card__stats {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 12px 20px;
    background: var(--oc-bg-canvas, #FAFAFA);
    border-top: 1px solid var(--oc-border-default, #E2E8F0);
  }

  .corpus-card__stat {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    color: var(--oc-fg-tertiary, #94A3B8);
  }

  .corpus-card__stat-value {
    font-weight: 600;
    color: var(--oc-fg-secondary, #475569);
  }

  .corpus-card__stat-none {
    font-style: italic;
    opacity: 0.6;
  }

  .corpus-card__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 20px;
    border-top: 1px solid var(--oc-border-default, #E2E8F0);
  }

  .corpus-card__owner {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: var(--oc-fg-secondary, #475569);
  }

  .corpus-card__updated {
    font-size: 12px;
    color: var(--oc-fg-tertiary, #94A3B8);
  }

  /* List View */
  .corpus-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .corpus-list-item {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px 20px;
    background: var(--oc-bg-surface, white);
    border: 1px solid var(--oc-border-default, #E2E8F0);
    border-radius: var(--oc-radius-lg, 12px);
    cursor: pointer;
    transition: all var(--oc-duration-fast, 0.15s) var(--oc-easing-default);
  }

  .corpus-list-item:hover {
    border-color: var(--oc-border-strong, #CBD5E1);
    background: var(--oc-bg-surface-hover, #F8FAFC);
  }

  .corpus-list-item__icon {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--oc-radius-md, 8px);
    flex-shrink: 0;
  }

  .corpus-list-item__icon svg {
    width: 24px;
    height: 24px;
  }

  .corpus-list-item__content {
    flex: 1;
    min-width: 0;
  }

  .corpus-list-item__title-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 4px;
  }

  .corpus-list-item__title {
    font-size: 15px;
    font-weight: 600;
    color: var(--oc-fg-primary, #1E293B);
    margin: 0;
  }

  .corpus-list-item__description {
    font-size: 13px;
    color: var(--oc-fg-secondary, #475569);
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .corpus-list-item__stats {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-shrink: 0;
  }

  .corpus-list-item__meta {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 4px;
    flex-shrink: 0;
    min-width: 120px;
  }

  .corpus-list-item__owner {
    font-size: 13px;
    color: var(--oc-fg-secondary, #475569);
  }

  .corpus-list-item__updated {
    font-size: 12px;
    color: var(--oc-fg-tertiary, #94A3B8);
  }

  @media (max-width: 768px) {
    .corpus-list-page__content {
      padding: 16px;
    }

    .corpus-grid {
      grid-template-columns: 1fr;
    }

    .corpus-list-item {
      flex-wrap: wrap;
    }

    .corpus-list-item__stats {
      display: none;
    }

    .corpus-list-item__meta {
      width: 100%;
      flex-direction: row;
      justify-content: space-between;
      margin-top: 8px;
      padding-top: 8px;
      border-top: 1px solid var(--oc-border-default, #E2E8F0);
    }
  }
`;

// ═══════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════

interface CorpusCardComponentProps {
  corpus: Corpus;
  onClick?: () => void;
}

const CorpusCardComponent: React.FC<CorpusCardComponentProps> = ({ corpus, onClick }) => {
  const visibilityIcon = {
    public: <GlobeIcon />,
    private: <LockIcon />,
    shared: <UsersIcon />,
  };

  const visibilityLabel = {
    public: 'Public',
    private: 'Private',
    shared: 'Shared',
  };

  const hasCover = !!corpus.coverImage;

  return (
    <div className="corpus-card" onClick={onClick}>
      {/* Cover area - shows image or gradient */}
      <div
        className="corpus-card__cover"
        style={{ '--cover-color': corpus.color } as React.CSSProperties}
      >
        {corpus.coverImage && (
          <>
            <img src={corpus.coverImage} alt="" className="corpus-card__cover-image" />
            <div className="corpus-card__cover-overlay" />
          </>
        )}
        <div className="corpus-card__cover-icon" style={{ color: corpus.color }}>
          <FolderIcon />
        </div>
      </div>

      <div className={`corpus-card__header ${hasCover ? 'corpus-card__header--with-cover' : ''}`}>
        <div className="corpus-card__title-row">
          <h3 className="corpus-card__title">{corpus.title}</h3>
          <span className={`corpus-card__visibility corpus-card__visibility--${corpus.visibility}`}>
            {visibilityIcon[corpus.visibility]}
            {visibilityLabel[corpus.visibility]}
          </span>
        </div>
        <IconButton
          variant="ghost"
          size="sm"
          aria-label="More options"
          className="corpus-card__menu"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreIcon />
        </IconButton>
      </div>

      <div className="corpus-card__body">
        <p className="corpus-card__description">{corpus.description}</p>
        {corpus.labels.length > 0 && (
          <div className="corpus-card__labels">
            {corpus.labels.map((label, i) => (
              <Chip key={i} size="sm" variant="soft" color="default">
                {label}
              </Chip>
            ))}
          </div>
        )}
      </div>

      <div className="corpus-card__stats">
        <div className="corpus-card__stat">
          <DocumentIcon />
          <span className="corpus-card__stat-value">{corpus.documentCount}</span>
          docs
        </div>
        <div className="corpus-card__stat">
          <AnnotationIcon />
          <span className="corpus-card__stat-value">{corpus.annotationCount.toLocaleString()}</span>
        </div>
        <div className="corpus-card__stat">
          <LabelIcon />
          {corpus.labelSetCount > 0 ? (
            <>
              <span className="corpus-card__stat-value">{corpus.labelCount}</span>
              labels
            </>
          ) : (
            <span className="corpus-card__stat-none">No labels</span>
          )}
        </div>
      </div>

      <div className="corpus-card__footer">
        <div className="corpus-card__owner">
          <Avatar fallback={corpus.owner.split(' ').map(n => n[0]).join('')} size="xs" />
          {corpus.owner}
        </div>
        <span className="corpus-card__updated">{corpus.lastUpdated}</span>
      </div>
    </div>
  );
};

const CorpusListItemComponent: React.FC<CorpusCardComponentProps> = ({ corpus, onClick }) => {
  const visibilityIcon = {
    public: <GlobeIcon />,
    private: <LockIcon />,
    shared: <UsersIcon />,
  };

  return (
    <div className="corpus-list-item" onClick={onClick}>
      <div
        className="corpus-list-item__icon"
        style={{ backgroundColor: `${corpus.color}15`, color: corpus.color }}
      >
        <FolderIcon />
      </div>

      <div className="corpus-list-item__content">
        <div className="corpus-list-item__title-row">
          <h4 className="corpus-list-item__title">{corpus.title}</h4>
          <span className={`corpus-card__visibility corpus-card__visibility--${corpus.visibility}`}>
            {visibilityIcon[corpus.visibility]}
          </span>
        </div>
        <p className="corpus-list-item__description">{corpus.description}</p>
      </div>

      <div className="corpus-list-item__stats">
        <div className="corpus-card__stat">
          <DocumentIcon />
          <span className="corpus-card__stat-value">{corpus.documentCount}</span>
        </div>
        <div className="corpus-card__stat">
          <AnnotationIcon />
          <span className="corpus-card__stat-value">{corpus.annotationCount.toLocaleString()}</span>
        </div>
        <div className="corpus-card__stat">
          <LabelIcon />
          {corpus.labelSetCount > 0 ? (
            <span className="corpus-card__stat-value">{corpus.labelCount}</span>
          ) : (
            <span className="corpus-card__stat-none">—</span>
          )}
        </div>
      </div>

      <div className="corpus-list-item__meta">
        <span className="corpus-list-item__owner">{corpus.owner}</span>
        <span className="corpus-list-item__updated">{corpus.lastUpdated}</span>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// STORY
// ═══════════════════════════════════════════════════════════════

export const Default: StoryObj = {
  name: 'Corpus List (Reimagined)',
  render: () => {
    const [activeNav, setActiveNav] = useState('corpuses');
    const [searchValue, setSearchValue] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [activeFilter, setActiveFilter] = useState('all');

    const filterItems = [
      { id: 'all', label: 'All Corpuses', count: 7 },
      { id: 'my', label: 'My Corpuses', count: 3 },
      { id: 'shared', label: 'Shared with Me', count: 1 },
      { id: 'public', label: 'Public', count: 3 },
    ];

    const filteredCorpuses = sampleCorpuses.filter(corpus => {
      if (activeFilter === 'my') return corpus.ownerEmail === 'jscrudato@umich.edu';
      if (activeFilter === 'shared') return corpus.visibility === 'shared';
      if (activeFilter === 'public') return corpus.visibility === 'public';
      return true;
    });

    return (
      <>
        <style>{pageStyles}</style>
        <div className="corpus-list-page">
          <NavBar
            brandName="Open Contracts"
            version="v3.0.0b3"
            items={navItems}
            activeId={activeNav}
            onNavigate={setActiveNav}
            userName="John Scrudato"
            userMenuItems={userMenuItems}
          />

          <div className="corpus-list-page__content">
            <div className="corpus-list-page__header">
              <PageHeader
                title="Corpuses"
                subtitle="Manage your document collections and collaborative workspaces"
                actions={
                  <Button variant="primary" size="sm" leftIcon={<PlusIcon />}>
                    New Corpus
                  </Button>
                }
              />
            </div>

            <div className="corpus-list-page__toolbar">
              <FilterTabs
                items={filterItems}
                value={activeFilter}
                onChange={setActiveFilter}
              />

              <div style={{ flex: 1 }} />

              <div className="corpus-list-page__search">
                <SearchInput
                  placeholder="Search corpuses..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  fullWidth
                />
              </div>

              <div className="corpus-list-page__view-toggle">
                <button
                  className={`corpus-list-page__view-btn ${viewMode === 'grid' ? 'corpus-list-page__view-btn--active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  title="Grid view"
                >
                  <GridIcon />
                </button>
                <button
                  className={`corpus-list-page__view-btn ${viewMode === 'list' ? 'corpus-list-page__view-btn--active' : ''}`}
                  onClick={() => setViewMode('list')}
                  title="List view"
                >
                  <ListIcon />
                </button>
              </div>
            </div>

            {viewMode === 'grid' ? (
              <div className="corpus-grid">
                {filteredCorpuses.map(corpus => (
                  <CorpusCardComponent
                    key={corpus.id}
                    corpus={corpus}
                    onClick={() => console.log('Open corpus:', corpus.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="corpus-list">
                {filteredCorpuses.map(corpus => (
                  <CorpusListItemComponent
                    key={corpus.id}
                    corpus={corpus}
                    onClick={() => console.log('Open corpus:', corpus.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </>
    );
  },
};

export const Empty: StoryObj = {
  name: 'Empty State',
  render: () => {
    const [activeNav, setActiveNav] = useState('corpuses');

    return (
      <>
        <style>{pageStyles}</style>
        <div className="corpus-list-page">
          <NavBar
            brandName="Open Contracts"
            version="v3.0.0b3"
            items={navItems}
            activeId={activeNav}
            onNavigate={setActiveNav}
            userName="John Scrudato"
            userMenuItems={userMenuItems}
          />

          <div className="corpus-list-page__content">
            <div className="corpus-list-page__header">
              <PageHeader
                title="Corpuses"
                subtitle="Manage your document collections and collaborative workspaces"
                actions={
                  <Button variant="primary" size="sm" leftIcon={<PlusIcon />}>
                    New Corpus
                  </Button>
                }
              />
            </div>

            <Card>
              <CardBody>
                <EmptyState
                  icon={<FolderIcon />}
                  title="No corpuses yet"
                  description="Create your first corpus to start organizing documents, annotations, and collaborative analysis."
                  size="lg"
                  action={
                    <Button variant="primary" leftIcon={<PlusIcon />}>
                      Create Your First Corpus
                    </Button>
                  }
                />
              </CardBody>
            </Card>
          </div>
        </div>
      </>
    );
  },
};
