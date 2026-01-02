import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NavBar } from '../NavBar';
import { Button, IconButton } from '../Button';
import { Card } from '../Card';
import { Chip } from '../Chip';
import { Avatar } from '../Avatar';
import { FilterTabs } from '../FilterTabs';
import { Popover } from '../Popover';

const meta: Meta = {
  title: 'Pages/AnnotationsListPage',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

// ═══════════════════════════════════════════════════════════════
// ICONS
// ═══════════════════════════════════════════════════════════════

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8.25" cy="8.25" r="5.25" />
    <path d="M15.75 15.75l-3-3" />
  </svg>
);

const FilterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 4.5h12M5.25 9h7.5M7.5 13.5h3" />
  </svg>
);

const DocumentIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 1.5H4.5a1.5 1.5 0 00-1.5 1.5v10a1.5 1.5 0 001.5 1.5h7a1.5 1.5 0 001.5-1.5V5L9.5 1.5z" />
    <path d="M9.5 1.5V5H13" />
  </svg>
);

const TextIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 3.5h11M2.5 8h8M2.5 12.5h5" />
  </svg>
);

const UserIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="7" cy="4" r="2.5" />
    <path d="M2.5 12.5v-1a3 3 0 013-3h3a3 3 0 013 3v1" />
  </svg>
);

const RobotIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
    <path d="M7 1a.5.5 0 01.5.5V3h2A1.5 1.5 0 0111 4.5v1a.5.5 0 01-1 0v-1a.5.5 0 00-.5-.5h-5a.5.5 0 00-.5.5v1a.5.5 0 01-1 0v-1A1.5 1.5 0 014.5 3h2V1.5A.5.5 0 017 1zM3 7a1 1 0 011-1h6a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1V7zm2.5 1a.5.5 0 100 1 .5.5 0 000-1zm3 0a.5.5 0 100 1 .5.5 0 000-1zM5 10.5a.5.5 0 01.5-.5h3a.5.5 0 010 1h-3a.5.5 0 01-.5-.5z" />
  </svg>
);

const GearIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="7" cy="7" r="2" />
    <path d="M7 1v1.5M7 11.5V13M1 7h1.5M11.5 7H13M2.75 2.75l1.06 1.06M10.19 10.19l1.06 1.06M2.75 11.25l1.06-1.06M10.19 3.81l1.06-1.06" />
  </svg>
);

const GlobeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="7" cy="7" r="5.5" />
    <path d="M1.5 7h11M7 1.5c-1.5 1.5-2 3.5-2 5.5s.5 4 2 5.5c1.5-1.5 2-3.5 2-5.5s-.5-4-2-5.5z" />
  </svg>
);

const UsersIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 12v-1a2 2 0 00-2-2h-4a2 2 0 00-2 2v1" />
    <circle cx="5.5" cy="4" r="2" />
    <path d="M12.5 12v-1a2 2 0 00-1.5-1.93M9 2.07a2 2 0 010 3.86" />
  </svg>
);

const LockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="6" width="8" height="6" rx="1" />
    <path d="M5 6V4a2 2 0 014 0v2" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 6l4 4 4-4" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.5 7.5v4a1 1 0 01-1 1h-7a1 1 0 01-1-1v-7a1 1 0 011-1h4M8.5 1.5h4v4M6 8l6-6" />
  </svg>
);

const AnnotationIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 9.75v4.5a1.5 1.5 0 01-1.5 1.5h-9A1.5 1.5 0 013 14.25v-9A1.5 1.5 0 014.5 3.75h4.5" />
    <path d="M12.75 2.25l3 3-6.75 6.75H6V9l6.75-6.75z" />
  </svg>
);

const TagIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15.75 9.75l-6-6a1.5 1.5 0 00-1.06-.44H3.75a1.5 1.5 0 00-1.5 1.5v4.94c0 .4.16.78.44 1.06l6 6a1.5 1.5 0 002.12 0l4.94-4.94a1.5 1.5 0 000-2.12z" />
    <circle cx="6" cy="6.75" r=".75" fill="currentColor" />
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

const ClockIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="6" r="4.5" />
    <path d="M6 3.5V6l1.5 1" />
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

interface Annotation {
  id: string;
  labelName: string;
  labelColor: string;
  type: 'doc' | 'text';
  taggedText?: string;
  source: 'human' | 'agent' | 'structural';
  visibility: 'public' | 'shared' | 'private';
  documentName: string;
  documentId: string;
  creatorName: string;
  creatorAvatar?: string;
  createdAt: string;
  labelSetName: string;
}

const sampleAnnotations: Annotation[] = [
  {
    id: '1',
    labelName: 'Governing Law',
    labelColor: '#0F766E',
    type: 'text',
    taggedText: 'This Agreement shall be governed by and construed in accordance with the laws of the State of Delaware...',
    source: 'human',
    visibility: 'public',
    documentName: 'Master Services Agreement v2.docx',
    documentId: 'doc-1',
    creatorName: 'Sarah Chen',
    createdAt: '2 hours ago',
    labelSetName: 'Contract Clauses',
  },
  {
    id: '2',
    labelName: 'Confidentiality',
    labelColor: '#7C3AED',
    type: 'text',
    taggedText: 'Each party agrees to maintain in confidence all Confidential Information disclosed by the other party...',
    source: 'agent',
    visibility: 'shared',
    documentName: 'NDA - Acme Corp.pdf',
    documentId: 'doc-2',
    creatorName: 'Claude Assistant',
    createdAt: '5 hours ago',
    labelSetName: 'Contract Clauses',
  },
  {
    id: '3',
    labelName: 'Employment Agreement',
    labelColor: '#2563EB',
    type: 'doc',
    source: 'structural',
    visibility: 'public',
    documentName: 'Employment Contract - J. Smith.pdf',
    documentId: 'doc-3',
    creatorName: 'System',
    createdAt: '1 day ago',
    labelSetName: 'Document Types',
  },
  {
    id: '4',
    labelName: 'Termination',
    labelColor: '#DC2626',
    type: 'text',
    taggedText: 'Either party may terminate this Agreement upon thirty (30) days prior written notice to the other party...',
    source: 'human',
    visibility: 'private',
    documentName: 'Vendor Agreement - TechCo.docx',
    documentId: 'doc-4',
    creatorName: 'John Scrudato',
    createdAt: '2 days ago',
    labelSetName: 'Contract Clauses',
  },
  {
    id: '5',
    labelName: 'Indemnification',
    labelColor: '#D97706',
    type: 'text',
    taggedText: 'Contractor shall indemnify, defend, and hold harmless the Company from and against any and all claims...',
    source: 'agent',
    visibility: 'public',
    documentName: 'Consulting Agreement.pdf',
    documentId: 'doc-5',
    creatorName: 'Claude Assistant',
    createdAt: '3 days ago',
    labelSetName: 'Contract Clauses',
  },
  {
    id: '6',
    labelName: 'Non-Disclosure Agreement',
    labelColor: '#059669',
    type: 'doc',
    source: 'structural',
    visibility: 'shared',
    documentName: 'NDA - Beta Partner.pdf',
    documentId: 'doc-6',
    creatorName: 'System',
    createdAt: '4 days ago',
    labelSetName: 'Document Types',
  },
  {
    id: '7',
    labelName: 'Payment Terms',
    labelColor: '#0891B2',
    type: 'text',
    taggedText: 'Payment shall be due within thirty (30) days of receipt of invoice. Late payments shall accrue interest...',
    source: 'human',
    visibility: 'public',
    documentName: 'Service Level Agreement.docx',
    documentId: 'doc-7',
    creatorName: 'Emma Davis',
    createdAt: '5 days ago',
    labelSetName: 'Contract Clauses',
  },
  {
    id: '8',
    labelName: 'Intellectual Property',
    labelColor: '#9333EA',
    type: 'text',
    taggedText: 'All intellectual property rights in the Work Product shall be owned exclusively by the Company...',
    source: 'agent',
    visibility: 'shared',
    documentName: 'Work for Hire Agreement.pdf',
    documentId: 'doc-8',
    creatorName: 'Claude Assistant',
    createdAt: '1 week ago',
    labelSetName: 'Contract Clauses',
  },
];

// ═══════════════════════════════════════════════════════════════
// PAGE STYLES
// ═══════════════════════════════════════════════════════════════

const pageStyles = `
  .annotations-page {
    min-height: 100vh;
    background: var(--oc-bg-canvas, #FAFAFA);
    font-family: var(--oc-font-family, 'Inter', -apple-system, BlinkMacSystemFont, sans-serif);
  }

  .annotations-page__content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 48px 24px 80px;
  }

  /* Hero */
  .annotations-hero {
    margin-bottom: 40px;
  }

  .annotations-hero__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 24px;
    margin-bottom: 32px;
  }

  .annotations-hero__title {
    font-family: 'Georgia', 'Times New Roman', serif;
    font-size: 42px;
    font-weight: 400;
    line-height: 1.2;
    color: #1E293B;
    margin: 0 0 12px;
  }

  .annotations-hero__title span {
    color: #0F766E;
  }

  .annotations-hero__subtitle {
    font-size: 17px;
    line-height: 1.6;
    color: #64748B;
    margin: 0;
    max-width: 500px;
  }

  /* Stats Row */
  .annotations-stats {
    display: flex;
    gap: 32px;
    padding: 20px 24px;
    background: white;
    border: 1px solid #E2E8F0;
    border-radius: 12px;
    margin-bottom: 32px;
  }

  .annotations-stat {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .annotations-stat__icon {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #F0FDFA;
    border-radius: 10px;
    color: #0F766E;
  }

  .annotations-stat__content {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .annotations-stat__value {
    font-size: 24px;
    font-weight: 600;
    color: #1E293B;
    line-height: 1;
  }

  .annotations-stat__label {
    font-size: 13px;
    color: #64748B;
  }

  .annotations-stat__divider {
    width: 1px;
    height: 40px;
    background: #E2E8F0;
  }

  /* Filter Bar */
  .annotations-filters {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 24px;
  }

  .annotations-filters__row {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .annotations-filters__search {
    flex: 1;
    max-width: 400px;
    position: relative;
  }

  .annotations-filters__search-icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: #94A3B8;
    pointer-events: none;
  }

  .annotations-filters__search-input {
    width: 100%;
    height: 44px;
    padding: 0 16px 0 44px;
    font-size: 14px;
    color: #1E293B;
    background: white;
    border: 1px solid #E2E8F0;
    border-radius: 10px;
    outline: none;
    transition: all 0.15s ease;
  }

  .annotations-filters__search-input:focus {
    border-color: #0F766E;
    box-shadow: 0 0 0 3px rgba(15, 118, 110, 0.1);
  }

  .annotations-filters__search-input::placeholder {
    color: #94A3B8;
  }

  .annotations-filters__dropdowns {
    display: flex;
    gap: 8px;
  }

  .filter-dropdown {
    position: relative;
  }

  .filter-dropdown__trigger {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 10px 12px;
    font-size: 13px;
    font-weight: 500;
    color: #64748B;
    background: white;
    border: 1px solid #E2E8F0;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .filter-dropdown__trigger:hover {
    border-color: #CBD5E1;
    color: #1E293B;
  }

  .filter-dropdown__trigger--active {
    border-color: #0F766E;
    color: #0F766E;
    background: #F0FDFA;
  }

  .filter-dropdown__icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Annotation Cards Grid */
  .annotations-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  .annotation-card {
    background: white;
    border: 1px solid #E2E8F0;
    border-radius: 12px;
    padding: 20px;
    transition: all 0.15s ease;
    cursor: pointer;
  }

  .annotation-card:hover {
    border-color: #CBD5E1;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
  }

  .annotation-card__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 12px;
  }

  .annotation-card__label {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .annotation-card__label-color {
    width: 12px;
    height: 12px;
    border-radius: 3px;
    flex-shrink: 0;
  }

  .annotation-card__label-name {
    font-size: 15px;
    font-weight: 600;
    color: #1E293B;
  }

  .annotation-card__badges {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .annotation-card__badge {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 6px;
    background: #F1F5F9;
    color: #64748B;
  }

  .annotation-card__badge--human {
    background: #DBEAFE;
    color: #2563EB;
  }

  .annotation-card__badge--agent {
    background: #EDE9FE;
    color: #7C3AED;
  }

  .annotation-card__badge--structural {
    background: #FEF3C7;
    color: #D97706;
  }

  .annotation-card__type {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 8px;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    border-radius: 4px;
    background: #F1F5F9;
    color: #64748B;
  }

  .annotation-card__type--doc {
    background: #DBEAFE;
    color: #2563EB;
  }

  .annotation-card__type--text {
    background: #F0FDFA;
    color: #0F766E;
  }

  .annotation-card__text {
    font-size: 14px;
    line-height: 1.6;
    color: #475569;
    margin-bottom: 16px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .annotation-card__text--highlight {
    background: linear-gradient(to bottom, transparent 60%, rgba(15, 118, 110, 0.15) 60%);
  }

  .annotation-card__doc-label {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px;
    background: #F8FAFC;
    border-radius: 8px;
    margin-bottom: 16px;
    font-size: 13px;
    color: #64748B;
  }

  .annotation-card__doc-label-icon {
    color: #2563EB;
  }

  .annotation-card__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 16px;
    border-top: 1px solid #F1F5F9;
  }

  .annotation-card__document {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: #64748B;
    text-decoration: none;
    transition: color 0.15s ease;
  }

  .annotation-card__document:hover {
    color: #0F766E;
  }

  .annotation-card__document-icon {
    color: #94A3B8;
  }

  .annotation-card__document-name {
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .annotation-card__meta {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .annotation-card__creator {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: #64748B;
  }

  .annotation-card__time {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    color: #94A3B8;
  }

  .annotation-card__visibility {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #94A3B8;
  }

  .annotation-card__visibility--public {
    color: #059669;
  }

  .annotation-card__visibility--shared {
    color: #2563EB;
  }

  .annotation-card__visibility--private {
    color: #64748B;
  }

  /* Label Set Tag */
  .annotation-card__labelset {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 3px 8px;
    font-size: 11px;
    font-weight: 500;
    color: #64748B;
    background: #F1F5F9;
    border-radius: 4px;
    margin-bottom: 12px;
  }

  /* Empty State */
  .annotations-empty {
    grid-column: 1 / -1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 80px 24px;
    text-align: center;
  }

  .annotations-empty__icon {
    width: 64px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #F1F5F9;
    border-radius: 16px;
    color: #94A3B8;
    margin-bottom: 24px;
  }

  .annotations-empty__title {
    font-size: 18px;
    font-weight: 600;
    color: #1E293B;
    margin: 0 0 8px;
  }

  .annotations-empty__description {
    font-size: 14px;
    color: #64748B;
    margin: 0;
    max-width: 300px;
  }

  /* Responsive */
  @media (max-width: 1024px) {
    .annotations-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 768px) {
    .annotations-page__content {
      padding: 32px 16px 60px;
    }

    .annotations-hero__header {
      flex-direction: column;
    }

    .annotations-hero__title {
      font-size: 32px;
    }

    .annotations-stats {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .annotations-stat__divider {
      display: none;
    }

    .annotations-stat {
      padding: 12px;
      background: #F8FAFC;
      border-radius: 8px;
    }

    .annotations-filters__row {
      flex-wrap: wrap;
    }

    .annotations-filters__search {
      max-width: none;
      width: 100%;
    }

    .annotations-filters__dropdowns {
      width: 100%;
      overflow-x: auto;
      padding-bottom: 4px;
    }

    .annotation-card__document-name {
      max-width: 120px;
    }

    .annotation-card__footer {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
    }

    .annotation-card__meta {
      width: 100%;
      justify-content: space-between;
    }
  }
`;

// ═══════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════

const SourceBadge: React.FC<{ source: Annotation['source'] }> = ({ source }) => {
  const config = {
    human: { icon: <UserIcon />, className: 'annotation-card__badge--human', title: 'Human annotated' },
    agent: { icon: <RobotIcon />, className: 'annotation-card__badge--agent', title: 'AI annotated' },
    structural: { icon: <GearIcon />, className: 'annotation-card__badge--structural', title: 'Structural' },
  };

  const { icon, className, title } = config[source];

  return (
    <div className={`annotation-card__badge ${className}`} title={title}>
      {icon}
    </div>
  );
};

const VisibilityIcon: React.FC<{ visibility: Annotation['visibility'] }> = ({ visibility }) => {
  const config = {
    public: { icon: <GlobeIcon />, className: 'annotation-card__visibility--public', title: 'Public' },
    shared: { icon: <UsersIcon />, className: 'annotation-card__visibility--shared', title: 'Shared' },
    private: { icon: <LockIcon />, className: 'annotation-card__visibility--private', title: 'Private' },
  };

  const { icon, className, title } = config[visibility];

  return (
    <div className={`annotation-card__visibility ${className}`} title={title}>
      {icon}
    </div>
  );
};

const AnnotationCard: React.FC<{ annotation: Annotation }> = ({ annotation }) => (
  <div className="annotation-card">
    <div className="annotation-card__header">
      <div className="annotation-card__label">
        <div className="annotation-card__label-color" style={{ backgroundColor: annotation.labelColor }} />
        <span className="annotation-card__label-name">{annotation.labelName}</span>
      </div>
      <div className="annotation-card__badges">
        <SourceBadge source={annotation.source} />
        <div className={`annotation-card__type annotation-card__type--${annotation.type}`}>
          {annotation.type === 'doc' ? <><DocumentIcon /> Doc</> : <><TextIcon /> Text</>}
        </div>
      </div>
    </div>

    <div className="annotation-card__labelset">
      <TagIcon /> {annotation.labelSetName}
    </div>

    {annotation.type === 'text' && annotation.taggedText ? (
      <p className="annotation-card__text">
        <span className="annotation-card__text--highlight">{annotation.taggedText}</span>
      </p>
    ) : (
      <div className="annotation-card__doc-label">
        <DocumentIcon className="annotation-card__doc-label-icon" />
        Applies to entire document
      </div>
    )}

    <div className="annotation-card__footer">
      <a href="#" className="annotation-card__document">
        <DocumentIcon className="annotation-card__document-icon" />
        <span className="annotation-card__document-name">{annotation.documentName}</span>
        <ExternalLinkIcon />
      </a>
      <div className="annotation-card__meta">
        <div className="annotation-card__creator">
          <Avatar name={annotation.creatorName} size="xs" />
          {annotation.creatorName}
        </div>
        <div className="annotation-card__time">
          <ClockIcon /> {annotation.createdAt}
        </div>
        <VisibilityIcon visibility={annotation.visibility} />
      </div>
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════════
// MAIN PAGE COMPONENT
// ═══════════════════════════════════════════════════════════════

type AnnotationType = 'all' | 'doc' | 'text';
type SourceType = 'all' | 'human' | 'agent' | 'structural';
type VisibilityType = 'all' | 'public' | 'shared' | 'private';

const AnnotationsListPage: React.FC = () => {
  const [typeFilter, setTypeFilter] = useState<AnnotationType>('all');
  const [sourceFilter, setSourceFilter] = useState<SourceType>('all');
  const [visibilityFilter, setVisibilityFilter] = useState<VisibilityType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const typeTabs = [
    { id: 'all', label: 'All Types' },
    { id: 'doc', label: 'Doc Labels', icon: <DocumentIcon /> },
    { id: 'text', label: 'Text Labels', icon: <TextIcon /> },
  ];

  const sourceTabs = [
    { id: 'all', label: 'All Sources' },
    { id: 'human', label: 'Human', icon: <UserIcon /> },
    { id: 'agent', label: 'AI Agent', icon: <RobotIcon /> },
    { id: 'structural', label: 'Structural', icon: <GearIcon /> },
  ];

  const filteredAnnotations = sampleAnnotations.filter((annotation) => {
    if (typeFilter !== 'all' && annotation.type !== typeFilter) return false;
    if (sourceFilter !== 'all' && annotation.source !== sourceFilter) return false;
    if (visibilityFilter !== 'all' && annotation.visibility !== visibilityFilter) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        annotation.labelName.toLowerCase().includes(query) ||
        annotation.taggedText?.toLowerCase().includes(query) ||
        annotation.documentName.toLowerCase().includes(query)
      );
    }
    return true;
  });

  const stats = {
    total: sampleAnnotations.length,
    docLabels: sampleAnnotations.filter(a => a.type === 'doc').length,
    textLabels: sampleAnnotations.filter(a => a.type === 'text').length,
    byHumans: sampleAnnotations.filter(a => a.source === 'human').length,
  };

  return (
    <>
      <style>{pageStyles}</style>
      <div className="annotations-page">
        <NavBar
          brandName="Open Contracts"
          brandVersion="v3.0.0"
          items={navItems}
          activeId="annotations"
          onNavigate={() => {}}
          userName="John Scrudato"
          userMenuItems={userMenuItems}
          onUserMenuSelect={() => {}}
        />

        <div className="annotations-page__content">
          {/* Hero */}
          <div className="annotations-hero">
            <div className="annotations-hero__header">
              <div>
                <h1 className="annotations-hero__title">
                  Browse <span>annotations</span>
                </h1>
                <p className="annotations-hero__subtitle">
                  Explore and discover annotations across your documents. Filter by type, source, or visibility.
                </p>
              </div>
              <Button variant="primary">
                <AnnotationIcon /> New Annotation
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="annotations-stats">
            <div className="annotations-stat">
              <div className="annotations-stat__icon">
                <AnnotationIcon />
              </div>
              <div className="annotations-stat__content">
                <div className="annotations-stat__value">{stats.total.toLocaleString()}</div>
                <div className="annotations-stat__label">Total Annotations</div>
              </div>
            </div>
            <div className="annotations-stat__divider" />
            <div className="annotations-stat">
              <div className="annotations-stat__icon">
                <DocumentIcon />
              </div>
              <div className="annotations-stat__content">
                <div className="annotations-stat__value">{stats.docLabels}</div>
                <div className="annotations-stat__label">Doc Labels</div>
              </div>
            </div>
            <div className="annotations-stat__divider" />
            <div className="annotations-stat">
              <div className="annotations-stat__icon">
                <TextIcon />
              </div>
              <div className="annotations-stat__content">
                <div className="annotations-stat__value">{stats.textLabels}</div>
                <div className="annotations-stat__label">Text Labels</div>
              </div>
            </div>
            <div className="annotations-stat__divider" />
            <div className="annotations-stat">
              <div className="annotations-stat__icon">
                <UserIcon />
              </div>
              <div className="annotations-stat__content">
                <div className="annotations-stat__value">{stats.byHumans}</div>
                <div className="annotations-stat__label">Human Annotated</div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="annotations-filters">
            <div className="annotations-filters__row">
              <div className="annotations-filters__search">
                <div className="annotations-filters__search-icon">
                  <SearchIcon />
                </div>
                <input
                  type="text"
                  className="annotations-filters__search-input"
                  placeholder="Search annotations by label, text, or document..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="annotations-filters__dropdowns">
                <button
                  className={`filter-dropdown__trigger ${visibilityFilter !== 'all' ? 'filter-dropdown__trigger--active' : ''}`}
                  onClick={() => setVisibilityFilter(visibilityFilter === 'all' ? 'public' : 'all')}
                >
                  {visibilityFilter === 'public' && <GlobeIcon />}
                  {visibilityFilter === 'shared' && <UsersIcon />}
                  {visibilityFilter === 'private' && <LockIcon />}
                  {visibilityFilter === 'all' ? 'Visibility' : visibilityFilter.charAt(0).toUpperCase() + visibilityFilter.slice(1)}
                  <ChevronDownIcon />
                </button>
              </div>
            </div>
            <div className="annotations-filters__row">
              <FilterTabs
                items={typeTabs}
                value={typeFilter}
                onChange={(id) => setTypeFilter(id as AnnotationType)}
              />
            </div>
            <div className="annotations-filters__row">
              <FilterTabs
                items={sourceTabs}
                value={sourceFilter}
                onChange={(id) => setSourceFilter(id as SourceType)}
              />
            </div>
          </div>

          {/* Annotations Grid */}
          <div className="annotations-grid">
            {filteredAnnotations.length > 0 ? (
              filteredAnnotations.map((annotation) => (
                <AnnotationCard key={annotation.id} annotation={annotation} />
              ))
            ) : (
              <div className="annotations-empty">
                <div className="annotations-empty__icon">
                  <AnnotationIcon />
                </div>
                <h3 className="annotations-empty__title">No annotations found</h3>
                <p className="annotations-empty__description">
                  Try adjusting your filters or search query to find what you're looking for.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

// ═══════════════════════════════════════════════════════════════
// STORIES
// ═══════════════════════════════════════════════════════════════

export const Default: StoryObj = {
  render: () => <AnnotationsListPage />,
};

export const Empty: StoryObj = {
  render: () => {
    const EmptyView: React.FC = () => (
      <>
        <style>{pageStyles}</style>
        <div className="annotations-page">
          <NavBar
            brandName="Open Contracts"
            brandVersion="v3.0.0"
            items={navItems}
            activeId="annotations"
            onNavigate={() => {}}
            userName="John Scrudato"
            userMenuItems={userMenuItems}
            onUserMenuSelect={() => {}}
          />

          <div className="annotations-page__content">
            <div className="annotations-hero">
              <div className="annotations-hero__header">
                <div>
                  <h1 className="annotations-hero__title">
                    Browse <span>annotations</span>
                  </h1>
                  <p className="annotations-hero__subtitle">
                    Explore and discover annotations across your documents.
                  </p>
                </div>
                <Button variant="primary">
                  <AnnotationIcon /> New Annotation
                </Button>
              </div>
            </div>

            <div className="annotations-grid">
              <div className="annotations-empty">
                <div className="annotations-empty__icon">
                  <AnnotationIcon />
                </div>
                <h3 className="annotations-empty__title">No annotations yet</h3>
                <p className="annotations-empty__description">
                  Start annotating documents to see them here. Create your first annotation to get started.
                </p>
                <div style={{ marginTop: '24px' }}>
                  <Button variant="primary">
                    <AnnotationIcon /> Create Annotation
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );

    return <EmptyView />;
  },
};
