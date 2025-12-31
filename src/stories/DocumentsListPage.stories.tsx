import React, { useState, useRef, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NavBar } from '../NavBar';
import { PageHeader } from '../PageHeader';
import { SearchInput } from '../SearchInput';
import { Chip } from '../Chip';
import { Button, IconButton } from '../Button';
import { HStack } from '../Stack';
import { Avatar } from '../Avatar';
import { EmptyState } from '../EmptyState';
import { FilterTabs } from '../FilterTabs';
import { Spinner } from '../Progress';
import { Checkbox } from '../Checkbox';
import { Popover } from '../Popover';
import { FilterPanel, FilterValues, FilterSection } from '../FilterPanel';
import { filterPanelStyles } from '../FilterPanel/FilterPanel.styles';

const meta: Meta = {
  title: 'Pages/DocumentsListPage',
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

const FilterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M1.5 1.5A.5.5 0 012 1h12a.5.5 0 01.5.5v2a.5.5 0 01-.128.334L10 8.692V13.5a.5.5 0 01-.342.474l-3 1A.5.5 0 016 14.5V8.692L1.628 3.834A.5.5 0 011.5 3.5v-2z" />
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

const CompactIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M2.5 3.5A.5.5 0 013 3h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5zm0 4A.5.5 0 013 7h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5zm0 4a.5.5 0 01.5-.5h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5z" />
  </svg>
);

const MoreIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 4a1 1 0 110-2 1 1 0 010 2zm0 5a1 1 0 110-2 1 1 0 010 2zm0 5a1 1 0 110-2 1 1 0 010 2z" />
  </svg>
);

const PDFIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M6 2a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6H6z" fill="#DC2626" />
    <path d="M14 2v6h6" fill="#991B1B" />
    <path d="M14 2l6 6h-6V2z" fill="#FCA5A5" />
    <text x="7" y="17" fontSize="5" fontWeight="bold" fill="white">PDF</text>
  </svg>
);

const DOCXIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M6 2a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6H6z" fill="#2563EB" />
    <path d="M14 2v6h6" fill="#1E40AF" />
    <path d="M14 2l6 6h-6V2z" fill="#93C5FD" />
    <text x="5" y="17" fontSize="4.5" fontWeight="bold" fill="white">DOCX</text>
  </svg>
);

const TXTIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M6 2a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6H6z" fill="#64748B" />
    <path d="M14 2v6h6" fill="#475569" />
    <path d="M14 2l6 6h-6V2z" fill="#CBD5E1" />
    <text x="7" y="17" fontSize="5" fontWeight="bold" fill="white">TXT</text>
  </svg>
);

const OpenIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8.636 3.5a.5.5 0 00-.5-.5H1.5A1.5 1.5 0 000 4.5v10A1.5 1.5 0 001.5 16h10a1.5 1.5 0 001.5-1.5V7.864a.5.5 0 00-1 0V14.5a.5.5 0 01-.5.5h-10a.5.5 0 01-.5-.5v-10a.5.5 0 01.5-.5h6.636a.5.5 0 00.5-.5z" />
    <path d="M16 .5a.5.5 0 00-.5-.5h-5a.5.5 0 000 1h3.793L6.146 9.146a.5.5 0 10.708.708L15 1.707V5.5a.5.5 0 001 0v-5z" />
  </svg>
);

const ViewIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 011.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0114.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 011.172 8z" />
    <path d="M8 5.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM4.5 8a3.5 3.5 0 117 0 3.5 3.5 0 01-7 0z" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M.5 9.9a.5.5 0 01.5.5v2.5a1 1 0 001 1h12a1 1 0 001-1v-2.5a.5.5 0 011 0v2.5a2 2 0 01-2 2H2a2 2 0 01-2-2v-2.5a.5.5 0 01.5-.5z" />
    <path d="M7.646 11.854a.5.5 0 00.708 0l3-3a.5.5 0 00-.708-.708L8.5 10.293V1.5a.5.5 0 00-1 0v8.793L5.354 8.146a.5.5 0 10-.708.708l3 3z" />
  </svg>
);

const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M12.146.146a.5.5 0 01.708 0l3 3a.5.5 0 010 .708l-10 10a.5.5 0 01-.168.11l-5 2a.5.5 0 01-.65-.65l2-5a.5.5 0 01.11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 01.5.5v.5h.5a.5.5 0 01.5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 015 12.5V12h-.5a.5.5 0 01-.5-.5V11h-.5a.5.5 0 01-.468-.325z" />
  </svg>
);

const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z" />
    <path fillRule="evenodd" d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" clipRule="evenodd" />
  </svg>
);

const CheckboxIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="2" width="12" height="12" rx="2" />
  </svg>
);

const DocumentEmptyIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path d="M12 6a4 4 0 00-4 4v28a4 4 0 004 4h24a4 4 0 004-4V18l-12-12H12z" fill="currentColor" opacity="0.1" />
    <path d="M12 6a4 4 0 00-4 4v28a4 4 0 004 4h24a4 4 0 004-4V18l-12-12H12z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M28 6v12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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

type DocumentType = 'pdf' | 'docx' | 'txt';
type DocumentStatus = 'processed' | 'processing' | 'error' | 'pending';

interface Document {
  id: string;
  name: string;
  type: DocumentType;
  size: string;
  pages?: number;
  uploadedBy: string;
  uploadedAt: string;
  status: DocumentStatus;
  thumbnail?: string;
  corpus?: string;
}

const sampleDocuments: Document[] = [
  {
    id: '1',
    name: 'EtonPharmaceuticalsInc_20191114_10-Q_EX-10.1_11893941_EX-10.1_Development_Agreement.pdf',
    type: 'pdf',
    size: '2.4 MB',
    pages: 24,
    uploadedBy: 'John Scrudato',
    uploadedAt: '2 hours ago',
    status: 'processed',
    corpus: 'SEC Filings Q4 2019',
  },
  {
    id: '2',
    name: 'EtonPharmaceuticalsInc_20191114_10-Q_EX-10.1_11893941_EX-10.2_License_Agreement.pdf',
    type: 'pdf',
    size: '1.8 MB',
    pages: 18,
    uploadedBy: 'John Scrudato',
    uploadedAt: '2 hours ago',
    status: 'processed',
    corpus: 'SEC Filings Q4 2019',
  },
  {
    id: '3',
    name: 'EtonPharmaceuticalsInc_20191114_10-Q_EX-10.1_11893941_EX-10.3_Supply_Agreement.pdf',
    type: 'pdf',
    size: '3.1 MB',
    pages: 32,
    uploadedBy: 'John Scrudato',
    uploadedAt: '2 hours ago',
    status: 'processing',
    corpus: 'SEC Filings Q4 2019',
  },
  {
    id: '4',
    name: 'EtonPharmaceuticalsInc_20191114_10-Q_EX-10.1_11893941_EX-10.4_Distribution_Agreement.pdf',
    type: 'pdf',
    size: '2.9 MB',
    pages: 28,
    uploadedBy: 'John Scrudato',
    uploadedAt: '3 hours ago',
    status: 'processed',
    corpus: 'SEC Filings Q4 2019',
  },
  {
    id: '5',
    name: 'Master_Services_Agreement_2024.pdf',
    type: 'pdf',
    size: '1.2 MB',
    pages: 15,
    uploadedBy: 'Sarah Chen',
    uploadedAt: '1 day ago',
    status: 'processed',
    corpus: 'Client Contracts',
  },
  {
    id: '6',
    name: 'NDA_Template_Standard.docx',
    type: 'docx',
    size: '245 KB',
    pages: 4,
    uploadedBy: 'Mike Johnson',
    uploadedAt: '3 days ago',
    status: 'processed',
    corpus: 'Templates',
  },
  {
    id: '7',
    name: 'Employment_Contract_JSmith.pdf',
    type: 'pdf',
    size: '890 KB',
    pages: 8,
    uploadedBy: 'Emma Davis',
    uploadedAt: '1 week ago',
    status: 'processed',
    corpus: 'HR Documents',
  },
  {
    id: '8',
    name: 'Board_Meeting_Notes_Q4.txt',
    type: 'txt',
    size: '45 KB',
    uploadedBy: 'Alex Rivera',
    uploadedAt: '2 weeks ago',
    status: 'error',
  },
];

// ═══════════════════════════════════════════════════════════════
// PAGE STYLES
// ═══════════════════════════════════════════════════════════════

const pageStyles = `
  .documents-page {
    min-height: 100vh;
    background: var(--oc-bg-canvas, #FAFAFA);
    font-family: var(--oc-font-family, 'Inter', -apple-system, BlinkMacSystemFont, sans-serif);
  }

  .documents-page__content {
    max-width: 1400px;
    margin: 0 auto;
    padding: 32px 24px;
  }

  .documents-page__header {
    margin-bottom: 24px;
  }

  .documents-page__toolbar {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 24px;
    flex-wrap: wrap;
  }

  .documents-page__search {
    flex: 1;
    min-width: 200px;
    max-width: 480px;
  }

  .documents-page__actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .documents-page__view-toggle {
    display: flex;
    align-items: center;
    background: var(--oc-bg-surface, white);
    border: 1px solid var(--oc-border-default, #E2E8F0);
    border-radius: var(--oc-radius-md, 8px);
    padding: 3px;
  }

  .documents-page__view-btn {
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

  .documents-page__view-btn:hover {
    color: var(--oc-fg-secondary, #475569);
  }

  .documents-page__view-btn--active {
    background: var(--oc-bg-surface-hover, #F1F5F9);
    color: var(--oc-fg-primary, #1E293B);
  }

  /* Selection bar */
  .documents-page__selection-bar {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 12px 16px;
    margin-bottom: 16px;
    background: var(--oc-accent, #0F766E);
    color: white;
    border-radius: var(--oc-radius-lg, 12px);
    font-size: 14px;
    font-weight: 500;
  }

  .documents-page__selection-count {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }

  .documents-page__selection-actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .documents-page__selection-bar button {
    padding: 6px 12px;
    background: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: var(--oc-radius-md, 8px);
    color: white;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.15s;
    white-space: nowrap;
  }

  .documents-page__selection-bar button:hover {
    background: rgba(255, 255, 255, 0.25);
  }

  /* Grid Layout */
  .documents-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
  }

  /* Document Card */
  .document-card {
    position: relative;
    display: flex;
    flex-direction: column;
    background: var(--oc-bg-surface, white);
    border: 1px solid var(--oc-border-default, #E2E8F0);
    border-radius: var(--oc-radius-lg, 12px);
    overflow: hidden;
    transition: all var(--oc-duration-fast, 0.15s) var(--oc-easing-default);
    cursor: pointer;
  }

  .document-card:hover {
    border-color: var(--oc-border-strong, #CBD5E1);
    box-shadow: var(--oc-shadow-md, 0 4px 6px rgba(15, 23, 42, 0.04));
    transform: translateY(-2px);
  }

  .document-card--selected {
    border-color: var(--oc-accent, #0F766E);
    box-shadow: 0 0 0 2px rgba(15, 118, 110, 0.2);
  }

  .document-card__checkbox {
    position: absolute;
    top: 12px;
    left: 12px;
    z-index: 10;
    opacity: 0;
    transition: opacity 0.15s;
  }

  .document-card:hover .document-card__checkbox,
  .document-card--selected .document-card__checkbox {
    opacity: 1;
  }

  .document-card__preview {
    position: relative;
    height: 180px;
    background: var(--oc-bg-canvas, #F8FAFC);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .document-card__preview-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: blur(0.5px);
  }

  .document-card__preview-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 20px;
  }

  .document-card__preview-icon {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .document-card__preview-icon svg {
    width: 48px;
    height: 48px;
  }

  .document-card__preview-lines {
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 80%;
    max-width: 180px;
  }

  .document-card__preview-line {
    height: 6px;
    background: var(--oc-border-default, #E2E8F0);
    border-radius: 3px;
  }

  .document-card__preview-line:nth-child(1) { width: 100%; }
  .document-card__preview-line:nth-child(2) { width: 85%; }
  .document-card__preview-line:nth-child(3) { width: 90%; }
  .document-card__preview-line:nth-child(4) { width: 70%; }

  .document-card__type-badge {
    position: absolute;
    top: 12px;
    right: 12px;
  }

  .document-card__processing {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    background: rgba(248, 250, 252, 0.9);
    backdrop-filter: blur(2px);
  }

  .document-card__processing-text {
    font-size: 13px;
    font-weight: 500;
    color: var(--oc-fg-secondary, #475569);
  }

  .document-card__body {
    padding: 16px;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .document-card__name {
    font-size: 14px;
    font-weight: 600;
    color: var(--oc-fg-primary, #1E293B);
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-height: 1.4;
    word-break: break-word;
  }

  .document-card__meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    color: var(--oc-fg-tertiary, #94A3B8);
  }

  .document-card__meta-item {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .document-card__meta-separator {
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: var(--oc-fg-tertiary, #94A3B8);
    opacity: 0.5;
  }

  .document-card__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    border-top: 1px solid var(--oc-border-default, #E2E8F0);
    background: var(--oc-bg-canvas, #FAFAFA);
  }

  .document-card__uploader {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    color: var(--oc-fg-secondary, #475569);
  }

  .document-card__menu {
    opacity: 0;
    transition: opacity 0.15s;
  }

  .document-card:hover .document-card__menu {
    opacity: 1;
  }

  /* Context Menu */
  .context-menu {
    position: absolute;
    z-index: 100;
    min-width: 200px;
    background: var(--oc-bg-surface, white);
    border: 1px solid var(--oc-border-default, #E2E8F0);
    border-radius: var(--oc-radius-lg, 12px);
    box-shadow: var(--oc-shadow-lg, 0 8px 16px rgba(15, 23, 42, 0.06));
    padding: 6px;
    overflow: hidden;
  }

  .context-menu__header {
    padding: 8px 12px;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--oc-fg-tertiary, #94A3B8);
    border-bottom: 1px solid var(--oc-border-default, #E2E8F0);
    margin: 0 -6px 6px;
    padding-left: 18px;
    padding-right: 18px;
    background: var(--oc-bg-canvas, #FAFAFA);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 280px;
  }

  .context-menu__item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    font-size: 14px;
    color: var(--oc-fg-primary, #1E293B);
    background: transparent;
    border: none;
    border-radius: var(--oc-radius-md, 8px);
    cursor: pointer;
    transition: background 0.1s;
    width: 100%;
    text-align: left;
  }

  .context-menu__item:hover {
    background: var(--oc-bg-surface-hover, #F1F5F9);
  }

  .context-menu__item--primary {
    color: var(--oc-accent, #0F766E);
    font-weight: 500;
  }

  .context-menu__item--danger {
    color: var(--oc-error, #DC2626);
  }

  .context-menu__item-icon {
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.7;
  }

  .context-menu__separator {
    height: 1px;
    background: var(--oc-border-default, #E2E8F0);
    margin: 6px 0;
  }

  /* List View */
  .documents-list {
    display: flex;
    flex-direction: column;
    gap: 2px;
    background: var(--oc-bg-surface, white);
    border: 1px solid var(--oc-border-default, #E2E8F0);
    border-radius: var(--oc-radius-lg, 12px);
    overflow: hidden;
  }

  .documents-list__header {
    display: grid;
    grid-template-columns: 40px 1fr 100px 100px 120px 150px 48px;
    gap: 16px;
    padding: 12px 16px;
    background: var(--oc-bg-canvas, #FAFAFA);
    border-bottom: 1px solid var(--oc-border-default, #E2E8F0);
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--oc-fg-tertiary, #94A3B8);
  }

  .document-list-item {
    display: grid;
    grid-template-columns: 40px 1fr 100px 100px 120px 150px 48px;
    gap: 16px;
    padding: 12px 16px;
    align-items: center;
    cursor: pointer;
    transition: background 0.1s;
  }

  .document-list-item:hover {
    background: var(--oc-bg-surface-hover, #F8FAFC);
  }

  .document-list-item--selected {
    background: rgba(15, 118, 110, 0.04);
  }

  .document-list-item:not(:last-child) {
    border-bottom: 1px solid var(--oc-border-default, #E2E8F0);
  }

  .document-list-item__icon {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .document-list-item__icon svg {
    width: 32px;
    height: 32px;
  }

  .document-list-item__name {
    font-size: 14px;
    font-weight: 500;
    color: var(--oc-fg-primary, #1E293B);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .document-list-item__type {
    font-size: 12px;
    text-transform: uppercase;
    color: var(--oc-fg-tertiary, #94A3B8);
  }

  .document-list-item__size {
    font-size: 13px;
    color: var(--oc-fg-secondary, #475569);
  }

  .document-list-item__status {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .document-list-item__uploader {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: var(--oc-fg-secondary, #475569);
  }

  .document-list-item__actions {
    display: flex;
    justify-content: flex-end;
    opacity: 0;
    transition: opacity 0.1s;
  }

  .document-list-item:hover .document-list-item__actions {
    opacity: 1;
  }

  /* Compact View */
  .documents-compact {
    display: flex;
    flex-direction: column;
    gap: 2px;
    background: var(--oc-bg-surface, white);
    border: 1px solid var(--oc-border-default, #E2E8F0);
    border-radius: var(--oc-radius-lg, 12px);
    overflow: hidden;
  }

  .document-compact-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 16px;
    cursor: pointer;
    transition: background 0.1s;
  }

  .document-compact-item:hover {
    background: var(--oc-bg-surface-hover, #F8FAFC);
  }

  .document-compact-item:not(:last-child) {
    border-bottom: 1px solid var(--oc-border-default, #E2E8F0);
  }

  .document-compact-item__checkbox {
    flex-shrink: 0;
  }

  .document-compact-item__icon {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }

  .document-compact-item__icon svg {
    width: 20px;
    height: 20px;
  }

  .document-compact-item__name {
    flex: 1;
    font-size: 13px;
    font-weight: 500;
    color: var(--oc-fg-primary, #1E293B);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .document-compact-item__meta {
    font-size: 12px;
    color: var(--oc-fg-tertiary, #94A3B8);
    flex-shrink: 0;
  }

  @media (max-width: 900px) {
    .documents-page__content {
      padding: 16px;
    }

    .documents-page__toolbar {
      flex-direction: column;
      align-items: stretch;
    }

    .documents-page__search {
      max-width: none;
    }

    .documents-page__actions {
      justify-content: space-between;
    }

    .documents-page__selection-bar {
      flex-wrap: wrap;
      gap: 8px;
    }

    .documents-page__selection-bar button {
      padding: 6px 10px;
      font-size: 12px;
    }

    .documents-grid {
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    }

    .documents-list__header,
    .document-list-item {
      grid-template-columns: 32px 1fr 80px 48px;
    }

    .documents-list__header > :nth-child(3),
    .documents-list__header > :nth-child(5),
    .documents-list__header > :nth-child(6),
    .document-list-item > :nth-child(3),
    .document-list-item > :nth-child(5),
    .document-list-item > :nth-child(6) {
      display: none;
    }

    /* Hide FilterTabs on mobile, show only search + filters button */
    .documents-page__filter-tabs {
      display: none;
    }
  }

  @media (max-width: 600px) {
    .documents-grid {
      grid-template-columns: 1fr;
    }

    .document-card__checkbox {
      opacity: 1;
      background: white;
      border-radius: var(--oc-radius-md, 8px);
      padding: 4px;
    }

    .documents-page__selection-bar {
      padding: 10px 12px;
      font-size: 13px;
    }

    .documents-page__selection-bar button {
      flex: 1;
      min-width: 0;
      text-align: center;
    }

    .documents-page__selection-count {
      width: 100%;
      margin-bottom: 4px;
    }

    .documents-page__selection-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      width: 100%;
    }
  }
`;


// ═══════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════

const getDocumentIcon = (type: DocumentType) => {
  switch (type) {
    case 'pdf':
      return <PDFIcon />;
    case 'docx':
      return <DOCXIcon />;
    default:
      return <TXTIcon />;
  }
};

const getStatusChip = (status: DocumentStatus) => {
  switch (status) {
    case 'processed':
      return <Chip size="sm" variant="soft" color="success">Processed</Chip>;
    case 'processing':
      return <Chip size="sm" variant="soft" color="warning">Processing</Chip>;
    case 'error':
      return <Chip size="sm" variant="soft" color="error">Error</Chip>;
    default:
      return <Chip size="sm" variant="soft" color="default">Pending</Chip>;
  }
};

interface ContextMenuProps {
  document: Document;
  position: { x: number; y: number };
  onClose: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ document: doc, position, onClose }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    window.document.addEventListener('mousedown', handleClickOutside);
    return () => window.document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="context-menu"
      style={{ top: position.y, left: position.x }}
    >
      <div className="context-menu__header" title={doc.name}>
        {doc.name}
      </div>
      <button className="context-menu__item context-menu__item--primary">
        <span className="context-menu__item-icon"><OpenIcon /></span>
        Open Document
      </button>
      <button className="context-menu__item">
        <span className="context-menu__item-icon"><ViewIcon /></span>
        View Details
      </button>
      <button className="context-menu__item">
        <span className="context-menu__item-icon"><DownloadIcon /></span>
        Download PDF
      </button>
      <div className="context-menu__separator" />
      <button className="context-menu__item">
        <span className="context-menu__item-icon"><EditIcon /></span>
        Edit Document
      </button>
      <button className="context-menu__item">
        <span className="context-menu__item-icon"><CheckboxIcon /></span>
        Select
      </button>
      <div className="context-menu__separator" />
      <button className="context-menu__item context-menu__item--danger">
        <span className="context-menu__item-icon"><TrashIcon /></span>
        Delete
      </button>
    </div>
  );
};

interface DocumentCardProps {
  document: Document;
  selected?: boolean;
  onSelect?: (id: string) => void;
  onContextMenu?: (e: React.MouseEvent, doc: Document) => void;
}

const DocumentCard: React.FC<DocumentCardProps> = ({
  document: doc,
  selected = false,
  onSelect,
  onContextMenu,
}) => {
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    onContextMenu?.(e, doc);
  };

  return (
    <div
      className={`document-card ${selected ? 'document-card--selected' : ''}`}
      onClick={() => console.log('Open document:', doc.id)}
      onContextMenu={handleContextMenu}
    >
      <div className="document-card__checkbox" onClick={(e) => e.stopPropagation()}>
        <Checkbox
          checked={selected}
          onChange={() => onSelect?.(doc.id)}
        />
      </div>

      <div className="document-card__preview">
        <div className="document-card__preview-placeholder">
          <div className="document-card__preview-icon">
            {getDocumentIcon(doc.type)}
          </div>
          <div className="document-card__preview-lines">
            <div className="document-card__preview-line" />
            <div className="document-card__preview-line" />
            <div className="document-card__preview-line" />
            <div className="document-card__preview-line" />
          </div>
        </div>

        <div className="document-card__type-badge">
          <Chip size="sm" variant="solid" color="default">
            {doc.type.toUpperCase()}
          </Chip>
        </div>

        {doc.status === 'processing' && (
          <div className="document-card__processing">
            <Spinner size="md" />
            <span className="document-card__processing-text">Processing...</span>
          </div>
        )}
      </div>

      <div className="document-card__body">
        <h4 className="document-card__name" title={doc.name}>{doc.name}</h4>
        <div className="document-card__meta">
          <span className="document-card__meta-item">{doc.size}</span>
          {doc.pages && (
            <>
              <span className="document-card__meta-separator" />
              <span className="document-card__meta-item">{doc.pages} pages</span>
            </>
          )}
          {doc.corpus && (
            <>
              <span className="document-card__meta-separator" />
              <span className="document-card__meta-item">{doc.corpus}</span>
            </>
          )}
        </div>
      </div>

      <div className="document-card__footer">
        <div className="document-card__uploader">
          <Avatar fallback={doc.uploadedBy.split(' ').map(n => n[0]).join('')} size="xs" />
          <span>{doc.uploadedAt}</span>
        </div>
        <div className="document-card__menu">
          {getStatusChip(doc.status)}
        </div>
      </div>
    </div>
  );
};

interface DocumentListItemProps {
  document: Document;
  selected?: boolean;
  onSelect?: (id: string) => void;
  onContextMenu?: (e: React.MouseEvent, doc: Document) => void;
}

const DocumentListItem: React.FC<DocumentListItemProps> = ({
  document: doc,
  selected = false,
  onSelect,
  onContextMenu,
}) => {
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    onContextMenu?.(e, doc);
  };

  return (
    <div
      className={`document-list-item ${selected ? 'document-list-item--selected' : ''}`}
      onClick={() => console.log('Open document:', doc.id)}
      onContextMenu={handleContextMenu}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <Checkbox
          checked={selected}
          onChange={() => onSelect?.(doc.id)}
        />
      </div>
      <div className="document-list-item__icon">
        {getDocumentIcon(doc.type)}
      </div>
      <span className="document-list-item__name" title={doc.name}>{doc.name}</span>
      <span className="document-list-item__type">{doc.type}</span>
      <span className="document-list-item__size">{doc.size}</span>
      <div className="document-list-item__status">
        {getStatusChip(doc.status)}
      </div>
      <div className="document-list-item__uploader">
        <Avatar fallback={doc.uploadedBy.split(' ').map(n => n[0]).join('')} size="xs" />
        <span>{doc.uploadedAt}</span>
      </div>
      <div className="document-list-item__actions">
        <IconButton
          variant="ghost"
          size="sm"
          aria-label="More options"
          onClick={(e) => {
            e.stopPropagation();
            onContextMenu?.(e, doc);
          }}
        >
          <MoreIcon />
        </IconButton>
      </div>
    </div>
  );
};

interface DocumentCompactItemProps {
  document: Document;
  selected?: boolean;
  onSelect?: (id: string) => void;
}

const DocumentCompactItem: React.FC<DocumentCompactItemProps> = ({
  document: doc,
  selected = false,
  onSelect,
}) => {
  return (
    <div className="document-compact-item">
      <div className="document-compact-item__checkbox" onClick={(e) => e.stopPropagation()}>
        <Checkbox
          checked={selected}
          onChange={() => onSelect?.(doc.id)}
        />
      </div>
      <div className="document-compact-item__icon">
        {getDocumentIcon(doc.type)}
      </div>
      <span className="document-compact-item__name" title={doc.name}>{doc.name}</span>
      <span className="document-compact-item__meta">{doc.size}</span>
      {getStatusChip(doc.status)}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// STORY
// ═══════════════════════════════════════════════════════════════

// Filter sections for FilterPanel
const filterSections: FilterSection[] = [
  {
    key: 'type',
    label: 'Document Type',
    type: 'checkbox',
    options: [
      { value: 'pdf', label: 'PDF', count: 6 },
      { value: 'docx', label: 'Word Document', count: 1 },
      { value: 'txt', label: 'Plain Text', count: 1 },
    ],
  },
  {
    key: 'status',
    label: 'Status',
    type: 'checkbox',
    options: [
      { value: 'processed', label: 'Processed', count: 6 },
      { value: 'processing', label: 'Processing', count: 1 },
      { value: 'error', label: 'Error', count: 1 },
    ],
  },
  {
    key: 'corpus',
    label: 'Corpus',
    type: 'checkbox',
    options: [
      { value: 'sec-filings', label: 'SEC Filings Q4 2019', count: 4 },
      { value: 'contracts', label: 'Client Contracts', count: 1 },
      { value: 'templates', label: 'Templates', count: 1 },
      { value: 'hr', label: 'HR Documents', count: 1 },
    ],
  },
  {
    key: 'uploadDate',
    label: 'Upload Date',
    type: 'date-range',
  },
];

export const Default: StoryObj = {
  name: 'Documents List (Reimagined)',
  render: () => {
    const [activeNav, setActiveNav] = useState('documents');
    const [searchValue, setSearchValue] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'list' | 'compact'>('grid');
    const [activeFilter, setActiveFilter] = useState('all');
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [contextMenu, setContextMenu] = useState<{
      document: Document;
      position: { x: number; y: number };
    } | null>(null);
    const [filterValues, setFilterValues] = useState<FilterValues>({
      type: [],
      status: [],
      corpus: [],
      uploadDate: { from: '', to: '' },
    });
    const [filterOpen, setFilterOpen] = useState(false);

    const filterItems = [
      { id: 'all', label: 'All Documents', count: 8 },
      { id: 'processed', label: 'Processed', count: 6 },
      { id: 'processing', label: 'Processing', count: 1 },
      { id: 'error', label: 'Errors', count: 1 },
    ];

    const getActiveFilterCount = () => {
      let count = 0;
      Object.entries(filterValues).forEach(([, val]) => {
        if (Array.isArray(val)) {
          count += val.length;
        } else if (val && (val.from || val.to)) {
          count += 1;
        }
      });
      return count;
    };

    const filteredDocuments = sampleDocuments.filter(doc => {
      if (activeFilter === 'processed') return doc.status === 'processed';
      if (activeFilter === 'processing') return doc.status === 'processing';
      if (activeFilter === 'error') return doc.status === 'error';
      return true;
    });

    const handleSelect = (id: string) => {
      setSelectedIds(prev => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        return next;
      });
    };

    const handleSelectAll = () => {
      if (selectedIds.size === filteredDocuments.length) {
        setSelectedIds(new Set());
      } else {
        setSelectedIds(new Set(filteredDocuments.map(d => d.id)));
      }
    };

    const handleContextMenu = (e: React.MouseEvent, doc: Document) => {
      e.preventDefault();
      setContextMenu({
        document: doc,
        position: { x: e.clientX, y: e.clientY },
      });
    };

    const activeFilterCount = getActiveFilterCount();

    return (
      <>
        <style>{pageStyles}</style>
        <style>{filterPanelStyles}</style>
        <div className="documents-page">
          <NavBar
            brandName="Open Contracts"
            version="v3.0.0b3"
            items={navItems}
            activeId={activeNav}
            onNavigate={setActiveNav}
            userName="John Scrudato"
            userMenuItems={userMenuItems}
          />

          <div className="documents-page__content">
            <div className="documents-page__header">
              <PageHeader
                title="Documents"
                subtitle="Browse and manage all documents in your corpus"
                actions={
                  <HStack gap="sm">
                    <Popover
                      open={filterOpen}
                      onOpenChange={setFilterOpen}
                      placement="bottom"
                      content={
                        <FilterPanel
                          sections={filterSections}
                          values={filterValues}
                          onChange={setFilterValues}
                          onApply={() => setFilterOpen(false)}
                          onCancel={() => setFilterOpen(false)}
                        />
                      }
                    >
                      <Button variant="ghost" size="sm" leftIcon={<FilterIcon />}>
                        Filters{activeFilterCount > 0 && ` (${activeFilterCount})`}
                      </Button>
                    </Popover>
                    <Button variant="primary" size="sm" leftIcon={<PlusIcon />}>
                      Upload
                    </Button>
                  </HStack>
                }
              />
            </div>

            <div className="documents-page__toolbar">
              <div className="documents-page__filter-tabs">
                <FilterTabs
                  items={filterItems}
                  value={activeFilter}
                  onChange={setActiveFilter}
                />
              </div>

              <div style={{ flex: 1 }} />

              <div className="documents-page__search">
                <SearchInput
                  placeholder="Search for document containing text..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  fullWidth
                />
              </div>

              <div className="documents-page__actions">
                <div className="documents-page__view-toggle">
                  <button
                    className={`documents-page__view-btn ${viewMode === 'grid' ? 'documents-page__view-btn--active' : ''}`}
                    onClick={() => setViewMode('grid')}
                    title="Grid view"
                  >
                    <GridIcon />
                  </button>
                  <button
                    className={`documents-page__view-btn ${viewMode === 'list' ? 'documents-page__view-btn--active' : ''}`}
                    onClick={() => setViewMode('list')}
                    title="List view"
                  >
                    <ListIcon />
                  </button>
                  <button
                    className={`documents-page__view-btn ${viewMode === 'compact' ? 'documents-page__view-btn--active' : ''}`}
                    onClick={() => setViewMode('compact')}
                    title="Compact view"
                  >
                    <CompactIcon />
                  </button>
                </div>
              </div>
            </div>

            {selectedIds.size > 0 && (
              <div className="documents-page__selection-bar">
                <span className="documents-page__selection-count">
                  <Checkbox
                    checked={selectedIds.size === filteredDocuments.length}
                    onChange={handleSelectAll}
                  />
                  <span>{selectedIds.size} document{selectedIds.size > 1 ? 's' : ''} selected</span>
                </span>
                <div style={{ flex: 1 }} />
                <div className="documents-page__selection-actions">
                  <button>Download</button>
                  <button>Move to Corpus</button>
                  <button>Delete</button>
                  <button onClick={() => setSelectedIds(new Set())}>Clear</button>
                </div>
              </div>
            )}

            {viewMode === 'grid' && (
              <div className="documents-grid">
                {filteredDocuments.map(doc => (
                  <DocumentCard
                    key={doc.id}
                    document={doc}
                    selected={selectedIds.has(doc.id)}
                    onSelect={handleSelect}
                    onContextMenu={handleContextMenu}
                  />
                ))}
              </div>
            )}

            {viewMode === 'list' && (
              <div className="documents-list">
                <div className="documents-list__header">
                  <Checkbox
                    checked={selectedIds.size === filteredDocuments.length && filteredDocuments.length > 0}
                    onChange={handleSelectAll}
                  />
                  <span>Name</span>
                  <span>Type</span>
                  <span>Size</span>
                  <span>Status</span>
                  <span>Uploaded</span>
                  <span></span>
                </div>
                {filteredDocuments.map(doc => (
                  <DocumentListItem
                    key={doc.id}
                    document={doc}
                    selected={selectedIds.has(doc.id)}
                    onSelect={handleSelect}
                    onContextMenu={handleContextMenu}
                  />
                ))}
              </div>
            )}

            {viewMode === 'compact' && (
              <div className="documents-compact">
                {filteredDocuments.map(doc => (
                  <DocumentCompactItem
                    key={doc.id}
                    document={doc}
                    selected={selectedIds.has(doc.id)}
                    onSelect={handleSelect}
                  />
                ))}
              </div>
            )}

            {contextMenu && (
              <ContextMenu
                document={contextMenu.document}
                position={contextMenu.position}
                onClose={() => setContextMenu(null)}
              />
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
    const [activeNav, setActiveNav] = useState('documents');

    return (
      <>
        <style>{pageStyles}</style>
        <div className="documents-page">
          <NavBar
            brandName="Open Contracts"
            version="v3.0.0b3"
            items={navItems}
            activeId={activeNav}
            onNavigate={setActiveNav}
            userName="John Scrudato"
            userMenuItems={userMenuItems}
          />

          <div className="documents-page__content">
            <div className="documents-page__header">
              <PageHeader
                title="Documents"
                subtitle="Browse and manage all documents in your corpus"
                actions={
                  <Button variant="primary" size="sm" leftIcon={<PlusIcon />}>
                    Upload
                  </Button>
                }
              />
            </div>

            <div
              style={{
                background: 'var(--oc-bg-surface, white)',
                border: '1px solid var(--oc-border-default, #E2E8F0)',
                borderRadius: 'var(--oc-radius-lg, 12px)',
                padding: '64px 24px',
              }}
            >
              <EmptyState
                icon={<DocumentEmptyIcon />}
                title="No documents yet"
                description="Upload your first document to get started with document analysis, annotation, and AI-powered insights."
                size="lg"
                action={
                  <Button variant="primary" leftIcon={<PlusIcon />}>
                    Upload Your First Document
                  </Button>
                }
              />
            </div>
          </div>
        </div>
      </>
    );
  },
};

export const WithSelection: StoryObj = {
  name: 'With Selection',
  render: () => {
    const [activeNav, setActiveNav] = useState('documents');
    const [searchValue, setSearchValue] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'list' | 'compact'>('grid');
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set(['1', '2', '4']));

    const handleSelect = (id: string) => {
      setSelectedIds(prev => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        return next;
      });
    };

    const handleSelectAll = () => {
      if (selectedIds.size === sampleDocuments.length) {
        setSelectedIds(new Set());
      } else {
        setSelectedIds(new Set(sampleDocuments.map(d => d.id)));
      }
    };

    return (
      <>
        <style>{pageStyles}</style>
        <div className="documents-page">
          <NavBar
            brandName="Open Contracts"
            version="v3.0.0b3"
            items={navItems}
            activeId={activeNav}
            onNavigate={setActiveNav}
            userName="John Scrudato"
            userMenuItems={userMenuItems}
          />

          <div className="documents-page__content">
            <div className="documents-page__header">
              <PageHeader
                title="Documents"
                subtitle="Browse and manage all documents in your corpus"
                actions={
                  <HStack gap="sm">
                    <Button variant="ghost" size="sm" leftIcon={<FilterIcon />}>
                      Filters
                    </Button>
                    <Button variant="primary" size="sm" leftIcon={<PlusIcon />}>
                      Upload
                    </Button>
                  </HStack>
                }
              />
            </div>

            <div className="documents-page__toolbar">
              <div className="documents-page__search">
                <SearchInput
                  placeholder="Search for document containing text..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  fullWidth
                />
              </div>

              <div style={{ flex: 1 }} />

              <div className="documents-page__actions">
                <div className="documents-page__view-toggle">
                  <button
                    className={`documents-page__view-btn ${viewMode === 'grid' ? 'documents-page__view-btn--active' : ''}`}
                    onClick={() => setViewMode('grid')}
                    title="Grid view"
                  >
                    <GridIcon />
                  </button>
                  <button
                    className={`documents-page__view-btn ${viewMode === 'list' ? 'documents-page__view-btn--active' : ''}`}
                    onClick={() => setViewMode('list')}
                    title="List view"
                  >
                    <ListIcon />
                  </button>
                  <button
                    className={`documents-page__view-btn ${viewMode === 'compact' ? 'documents-page__view-btn--active' : ''}`}
                    onClick={() => setViewMode('compact')}
                    title="Compact view"
                  >
                    <CompactIcon />
                  </button>
                </div>
              </div>
            </div>

            {selectedIds.size > 0 && (
              <div className="documents-page__selection-bar">
                <Checkbox
                  checked={selectedIds.size === sampleDocuments.length}
                  onChange={handleSelectAll}
                />
                <span>{selectedIds.size} document{selectedIds.size > 1 ? 's' : ''} selected</span>
                <div style={{ flex: 1 }} />
                <button>Download</button>
                <button>Move to Corpus</button>
                <button>Delete</button>
                <button onClick={() => setSelectedIds(new Set())}>Clear</button>
              </div>
            )}

            <div className="documents-grid">
              {sampleDocuments.map(doc => (
                <DocumentCard
                  key={doc.id}
                  document={doc}
                  selected={selectedIds.has(doc.id)}
                  onSelect={handleSelect}
                />
              ))}
            </div>
          </div>
        </div>
      </>
    );
  },
};
