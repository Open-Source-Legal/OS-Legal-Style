import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NavBar } from '../NavBar';
import { Button, IconButton } from '../Button';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '../Tabs';
import { StatBlock, StatGrid } from '../StatBlock';
import { Card, CardBody } from '../Card';
import { Chip } from '../Chip';
import { DataGrid, DataGridColumn, CellAction, SortDirection } from '../DataGrid';
import { EmptyState } from '../EmptyState';

const meta: Meta = {
  title: 'Pages/ExtractDetailPage',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

// ═══════════════════════════════════════════════════════════════
// ICONS
// ═══════════════════════════════════════════════════════════════

const BackIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path fillRule="evenodd" d="M7.78 12.53a.75.75 0 01-1.06 0L2.47 8.28a.75.75 0 010-1.06l4.25-4.25a.75.75 0 011.06 1.06L4.81 7h8.44a.75.75 0 010 1.5H4.81l2.97 2.97a.75.75 0 010 1.06z" clipRule="evenodd" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8.75 1a.75.75 0 00-1.5 0v6.59L5.53 5.87a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06L8.75 7.59V1z" />
    <path d="M1.75 10a.75.75 0 00-.75.75v2.5A1.75 1.75 0 002.75 15h10.5A1.75 1.75 0 0015 13.25v-2.5a.75.75 0 00-1.5 0v2.5a.25.25 0 01-.25.25H2.75a.25.25 0 01-.25-.25v-2.5a.75.75 0 00-.75-.75z" />
  </svg>
);

const RefreshIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path fillRule="evenodd" d="M8 3a5 5 0 104.546 2.914.5.5 0 01.908-.417A6 6 0 118 2v1z" clipRule="evenodd" />
    <path d="M8 4.466V.534a.25.25 0 01.41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 018 4.466z" />
  </svg>
);

const ViewSourceIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 3.5C4.136 3.5 1.04 6.534 0 8c1.04 1.466 4.136 4.5 8 4.5s6.96-3.034 8-4.5c-1.04-1.466-4.136-4.5-8-4.5zm0 7.5a3 3 0 110-6 3 3 0 010 6z" />
  </svg>
);

const CopyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z" />
    <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z" />
  </svg>
);

const FlagIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M2 2a1 1 0 011-1h10a1 1 0 01.707 1.707L10.414 6l3.293 3.293A1 1 0 0113 11H3a1 1 0 01-1-1V2z" />
  </svg>
);

const DocumentIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M4 1.5A1.5 1.5 0 015.5 0h5.586a.5.5 0 01.353.146l2.415 2.415a.5.5 0 01.146.353V14.5a1.5 1.5 0 01-1.5 1.5h-7A1.5 1.5 0 014 14.5v-13zM5.5 1a.5.5 0 00-.5.5v13a.5.5 0 00.5.5h7a.5.5 0 00.5-.5V3.707L10.293 1H5.5z" />
    <path d="M6 4.5a.5.5 0 01.5-.5h3a.5.5 0 010 1h-3a.5.5 0 01-.5-.5zm0 2a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5zm0 2a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5zm0 2a.5.5 0 01.5-.5h3a.5.5 0 010 1h-3a.5.5 0 01-.5-.5z" />
  </svg>
);

const ColumnIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M0 2a1 1 0 011-1h14a1 1 0 011 1v12a1 1 0 01-1 1H1a1 1 0 01-1-1V2zm5 0v12h6V2H5zM4 2H1v12h3V2zm8 0v12h3V2h-3z" />
  </svg>
);

const RowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M0 2a1 1 0 011-1h14a1 1 0 011 1v12a1 1 0 01-1 1H1a1 1 0 01-1-1V2zm1 4h14V2H1v4zm0 1v4h14V7H1zm0 5v2h14v-2H1z" />
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path fillRule="evenodd" d="M8 16A8 8 0 108 0a8 8 0 000 16zm3.78-9.72a.75.75 0 00-1.06-1.06L7 8.94 5.28 7.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.06 0l4.25-4.25z" clipRule="evenodd" />
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

interface ExtractRow {
  id: string;
  documentName: string;
  partyA: string;
  partyB: string;
  effectiveDate: string;
  terminationDate: string;
  contractValue: number;
  governingLaw: string;
  hasAutoRenewal: boolean;
}

const sampleRows: ExtractRow[] = [
  {
    id: '1',
    documentName: 'Master_Services_Agreement_2024.pdf',
    partyA: 'Acme Corporation',
    partyB: 'TechStart Inc',
    effectiveDate: '2024-01-15',
    terminationDate: '2025-01-15',
    contractValue: 250000,
    governingLaw: 'Delaware',
    hasAutoRenewal: true,
  },
  {
    id: '2',
    documentName: 'Software_License_v2.3.pdf',
    partyA: 'BigCorp LLC',
    partyB: 'CloudSoft Solutions',
    effectiveDate: '2024-03-01',
    terminationDate: '2026-03-01',
    contractValue: 75000,
    governingLaw: 'California',
    hasAutoRenewal: true,
  },
  {
    id: '3',
    documentName: 'NDA_ResearchPartners.pdf',
    partyA: 'Innovation Labs',
    partyB: 'Research Partners Co',
    effectiveDate: '2024-02-10',
    terminationDate: '2025-02-10',
    contractValue: 0,
    governingLaw: 'New York',
    hasAutoRenewal: false,
  },
  {
    id: '4',
    documentName: 'Employment_Contract_JSmith.pdf',
    partyA: 'Startup XYZ',
    partyB: 'John Smith',
    effectiveDate: '2024-04-01',
    terminationDate: '2027-04-01',
    contractValue: 150000,
    governingLaw: 'Texas',
    hasAutoRenewal: false,
  },
  {
    id: '5',
    documentName: 'Commercial_Lease_MainSt.pdf',
    partyA: 'Property Holdings Inc',
    partyB: 'Retail Store Co',
    effectiveDate: '2023-06-01',
    terminationDate: '2028-06-01',
    contractValue: 500000,
    governingLaw: 'Illinois',
    hasAutoRenewal: true,
  },
  {
    id: '6',
    documentName: 'Distribution_Agreement_APAC.pdf',
    partyA: 'Global Products Ltd',
    partyB: 'Asia Pacific Distributors',
    effectiveDate: '2024-05-01',
    terminationDate: '2026-05-01',
    contractValue: 1200000,
    governingLaw: 'Singapore',
    hasAutoRenewal: true,
  },
  {
    id: '7',
    documentName: 'Consulting_Agreement_Q4.pdf',
    partyA: 'Advisory Services Inc',
    partyB: 'Strategic Consulting Group',
    effectiveDate: '2024-10-01',
    terminationDate: '2025-03-31',
    contractValue: 85000,
    governingLaw: 'Massachusetts',
    hasAutoRenewal: false,
  },
  {
    id: '8',
    documentName: 'Joint_Venture_Agreement.pdf',
    partyA: 'Venture Capital Partners',
    partyB: 'Emerging Tech Startup',
    effectiveDate: '2024-01-01',
    terminationDate: '2029-01-01',
    contractValue: 5000000,
    governingLaw: 'Delaware',
    hasAutoRenewal: false,
  },
];

interface DocumentInfo {
  id: string;
  name: string;
  type: string;
  size: string;
  extractedRows: number;
  status: 'completed' | 'partial' | 'failed';
}

const sampleDocuments: DocumentInfo[] = [
  { id: '1', name: 'Master_Services_Agreement_2024.pdf', type: 'PDF', size: '2.4 MB', extractedRows: 1, status: 'completed' },
  { id: '2', name: 'Software_License_v2.3.pdf', type: 'PDF', size: '1.8 MB', extractedRows: 1, status: 'completed' },
  { id: '3', name: 'NDA_ResearchPartners.pdf', type: 'PDF', size: '890 KB', extractedRows: 1, status: 'completed' },
  { id: '4', name: 'Employment_Contract_JSmith.pdf', type: 'PDF', size: '1.2 MB', extractedRows: 1, status: 'completed' },
  { id: '5', name: 'Commercial_Lease_MainSt.pdf', type: 'PDF', size: '3.1 MB', extractedRows: 1, status: 'completed' },
  { id: '6', name: 'Distribution_Agreement_APAC.pdf', type: 'PDF', size: '2.7 MB', extractedRows: 1, status: 'completed' },
  { id: '7', name: 'Consulting_Agreement_Q4.pdf', type: 'PDF', size: '950 KB', extractedRows: 1, status: 'completed' },
  { id: '8', name: 'Joint_Venture_Agreement.pdf', type: 'PDF', size: '4.2 MB', extractedRows: 1, status: 'completed' },
];

// ═══════════════════════════════════════════════════════════════
// PAGE STYLES
// ═══════════════════════════════════════════════════════════════

const pageStyles = `
  .extract-detail-page {
    min-height: 100vh;
    background: var(--oc-bg-canvas, #FAFAFA);
    font-family: var(--oc-font-family, 'Inter', -apple-system, BlinkMacSystemFont, sans-serif);
  }

  .extract-detail-page__content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 32px 24px 80px;
  }

  /* Back link */
  .extract-detail-page__back {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 24px;
    padding: 8px 0;
    font-size: 14px;
    font-weight: 500;
    color: var(--oc-fg-secondary, #64748B);
    text-decoration: none;
    background: none;
    border: none;
    cursor: pointer;
    transition: color 0.15s;
  }

  .extract-detail-page__back:hover {
    color: var(--oc-fg-primary, #1E293B);
  }

  /* Header */
  .extract-detail-page__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 24px;
    margin-bottom: 32px;
  }

  .extract-detail-page__header-main {
    flex: 1;
    min-width: 0;
  }

  .extract-detail-page__title-row {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 8px;
    flex-wrap: wrap;
  }

  .extract-detail-page__title {
    font-family: 'Georgia', 'Times New Roman', serif;
    font-size: 32px;
    font-weight: 400;
    color: var(--oc-fg-primary, #1E293B);
    margin: 0;
    line-height: 1.2;
  }

  .extract-detail-page__meta {
    font-size: 14px;
    color: var(--oc-fg-secondary, #64748B);
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
  }

  .extract-detail-page__meta-separator {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: var(--oc-fg-tertiary, #94A3B8);
  }

  .extract-detail-page__actions {
    display: flex;
    gap: 8px;
    flex-shrink: 0;
  }

  /* Stats section */
  .extract-detail-page__stats {
    margin-bottom: 32px;
  }

  /* Tabs section */
  .extract-detail-page__tabs {
    margin-bottom: 24px;
  }

  /* Data section */
  .extract-detail-page__data-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  .extract-detail-page__data-title {
    font-size: 14px;
    font-weight: 600;
    color: var(--oc-fg-secondary, #64748B);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .extract-detail-page__data-count {
    font-size: 13px;
    color: var(--oc-fg-tertiary, #94A3B8);
  }

  /* Documents list */
  .extract-detail-page__documents {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .extract-detail-page__document {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 16px;
    background: var(--oc-bg-surface, #FFFFFF);
    border: 1px solid var(--oc-border-default, #E2E8F0);
    border-radius: var(--oc-radius-md, 8px);
    transition: border-color 0.15s;
  }

  .extract-detail-page__document:hover {
    border-color: var(--oc-border-strong, #CBD5E1);
  }

  .extract-detail-page__document-icon {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    background: var(--oc-bg-surface-hover, #F1F5F9);
    color: var(--oc-fg-secondary, #64748B);
    flex-shrink: 0;
  }

  .extract-detail-page__document-info {
    flex: 1;
    min-width: 0;
  }

  .extract-detail-page__document-name {
    font-size: 14px;
    font-weight: 500;
    color: var(--oc-fg-primary, #1E293B);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .extract-detail-page__document-meta {
    font-size: 12px;
    color: var(--oc-fg-tertiary, #94A3B8);
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 2px;
  }

  .extract-detail-page__document-status {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .extract-detail-page__document-status--completed {
    color: #065F46;
  }

  .extract-detail-page__document-status svg {
    width: 12px;
    height: 12px;
  }

  /* Schema column */
  .extract-detail-page__schema {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .extract-detail-page__schema-col {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    background: var(--oc-bg-surface, #FFFFFF);
    border: 1px solid var(--oc-border-default, #E2E8F0);
    border-radius: var(--oc-radius-md, 8px);
  }

  .extract-detail-page__schema-col-icon {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    background: var(--oc-bg-surface-hover, #F1F5F9);
    color: var(--oc-fg-secondary, #64748B);
  }

  .extract-detail-page__schema-col-info {
    flex: 1;
  }

  .extract-detail-page__schema-col-name {
    font-size: 14px;
    font-weight: 500;
    color: var(--oc-fg-primary, #1E293B);
  }

  .extract-detail-page__schema-col-type {
    font-size: 12px;
    color: var(--oc-fg-tertiary, #94A3B8);
    margin-top: 2px;
  }

  @media (max-width: 768px) {
    .extract-detail-page__content {
      padding: 24px 16px 60px;
    }

    .extract-detail-page__header {
      flex-direction: column;
    }

    .extract-detail-page__title {
      font-size: 26px;
    }

    .extract-detail-page__actions {
      width: 100%;
    }
  }
`;

// ═══════════════════════════════════════════════════════════════
// STORY
// ═══════════════════════════════════════════════════════════════

export const Default: StoryObj = {
  name: 'Extract Detail (Reimagined)',
  render: () => {
    const [activeNav, setActiveNav] = useState('extracts');
    const [activeTab, setActiveTab] = useState('data');
    const [sortColumn, setSortColumn] = useState<string>('documentName');
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

    const columns: DataGridColumn<ExtractRow>[] = [
      {
        key: 'documentName',
        label: 'Document',
        width: '20%',
        sortable: true,
        showCellActions: true,
        render: (value) => {
          const name = String(value);
          return (
            <span title={name} style={{
              display: 'block',
              maxWidth: '200px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>
              {name.replace('.pdf', '')}
            </span>
          );
        },
      },
      {
        key: 'partyA',
        label: 'Party A',
        sortable: true,
        showCellActions: true,
      },
      {
        key: 'partyB',
        label: 'Party B',
        sortable: true,
        showCellActions: true,
      },
      {
        key: 'effectiveDate',
        label: 'Effective',
        type: 'date',
        sortable: true,
        width: '110px',
        showCellActions: true,
      },
      {
        key: 'terminationDate',
        label: 'Termination',
        type: 'date',
        sortable: true,
        width: '110px',
        showCellActions: true,
      },
      {
        key: 'contractValue',
        label: 'Value',
        align: 'right',
        sortable: true,
        width: '120px',
        showCellActions: true,
        render: (value) => {
          const num = value as number;
          if (num === 0) return <span style={{ color: '#94A3B8' }}>—</span>;
          return `$${num.toLocaleString()}`;
        },
      },
      {
        key: 'governingLaw',
        label: 'Gov. Law',
        sortable: true,
        width: '100px',
        showCellActions: true,
      },
      {
        key: 'hasAutoRenewal',
        label: 'Auto-Renew',
        type: 'boolean',
        align: 'center',
        width: '100px',
      },
    ];

    const cellActions: CellAction<ExtractRow>[] = [
      {
        id: 'view',
        label: 'View in document',
        icon: <ViewSourceIcon />,
        onClick: (value, row, column) => {
          alert(`Viewing "${column.label}" in document: ${row.documentName}`);
        },
      },
      {
        id: 'copy',
        label: 'Copy value',
        icon: <CopyIcon />,
        onClick: (value) => {
          navigator.clipboard?.writeText(String(value));
          alert('Copied to clipboard');
        },
      },
      {
        id: 'flag',
        label: 'Flag for review',
        icon: <FlagIcon />,
        onClick: (value, row, column) => {
          alert(`Flagged "${column.label}" in ${row.documentName} for review`);
        },
      },
    ];

    const sortedData = [...sampleRows].sort((a, b) => {
      if (!sortColumn || !sortDirection) return 0;
      const aVal = a[sortColumn as keyof ExtractRow];
      const bVal = b[sortColumn as keyof ExtractRow];
      const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      return sortDirection === 'asc' ? cmp : -cmp;
    });

    const schemaColumns = [
      { name: 'Document Name', type: 'Text' },
      { name: 'Party A', type: 'Text' },
      { name: 'Party B', type: 'Text' },
      { name: 'Effective Date', type: 'Date' },
      { name: 'Termination Date', type: 'Date' },
      { name: 'Contract Value', type: 'Number (Currency)' },
      { name: 'Governing Law', type: 'Text' },
      { name: 'Auto-Renewal', type: 'Boolean' },
    ];

    return (
      <>
        <style>{pageStyles}</style>
        <div className="extract-detail-page">
          <NavBar
            brandName="Open Contracts"
            version="v3.0.0"
            items={navItems}
            activeId={activeNav}
            onNavigate={setActiveNav}
            userName="John Scrudato"
            userMenuItems={userMenuItems}
          />

          <main className="extract-detail-page__content">
            {/* Back link */}
            <button className="extract-detail-page__back" onClick={() => console.log('Back')}>
              <BackIcon />
              Back to Extracts
            </button>

            {/* Header */}
            <header className="extract-detail-page__header">
              <div className="extract-detail-page__header-main">
                <div className="extract-detail-page__title-row">
                  <h1 className="extract-detail-page__title">Contract Key Terms</h1>
                  <Chip size="sm" color="success" static>
                    Completed
                  </Chip>
                </div>
                <div className="extract-detail-page__meta">
                  <span>from SEC Filings 2024</span>
                  <span className="extract-detail-page__meta-separator" />
                  <span>Created Sep 8, 2025</span>
                  <span className="extract-detail-page__meta-separator" />
                  <span>Completed Sep 9, 2025</span>
                </div>
              </div>
              <div className="extract-detail-page__actions">
                <IconButton
                  icon={<RefreshIcon />}
                  variant="ghost"
                  size="md"
                  aria-label="Re-run extract"
                  onClick={() => console.log('Re-run')}
                />
                <Button
                  variant="secondary"
                  size="sm"
                  leftIcon={<DownloadIcon />}
                  onClick={() => console.log('Export')}
                >
                  Export CSV
                </Button>
              </div>
            </header>

            {/* Stats */}
            <div className="extract-detail-page__stats">
              <StatGrid columns={4}>
                <StatBlock
                  value="8"
                  label="Documents"
                  description="processed"
                  icon={<DocumentIcon />}
                />
                <StatBlock
                  value="8"
                  label="Columns"
                  description="in schema"
                  icon={<ColumnIcon />}
                />
                <StatBlock
                  value="8"
                  label="Rows"
                  description="extracted"
                  icon={<RowIcon />}
                />
                <StatBlock
                  value="100%"
                  label="Success Rate"
                  description="all documents"
                  icon={<CheckIcon />}
                />
              </StatGrid>
            </div>

            {/* Tabs */}
            <div className="extract-detail-page__tabs">
              <Tabs value={activeTab} onChange={setActiveTab}>
                <TabList>
                  <Tab value="data">Data</Tab>
                  <Tab value="documents">Documents</Tab>
                  <Tab value="schema">Schema</Tab>
                </TabList>

                <TabPanels>
                  {/* Data Tab */}
                  <TabPanel value="data">
                    <div style={{ marginTop: 24 }}>
                      <div className="extract-detail-page__data-header">
                        <span className="extract-detail-page__data-title">Extracted Data</span>
                        <span className="extract-detail-page__data-count">
                          {selectedKeys.length > 0
                            ? `${selectedKeys.length} of ${sampleRows.length} selected`
                            : `${sampleRows.length} rows`
                          }
                        </span>
                      </div>
                      <DataGrid
                        columns={columns}
                        data={sortedData}
                        rowKey="id"
                        selectable
                        selectedKeys={selectedKeys}
                        onSelectionChange={setSelectedKeys}
                        sortColumn={sortColumn}
                        sortDirection={sortDirection}
                        onSortChange={(col, dir) => {
                          setSortColumn(col);
                          setSortDirection(dir);
                        }}
                        cellActions={cellActions}
                        stickyHeader
                        maxHeight="500px"
                        onRowClick={(row) => console.log('Row clicked:', row)}
                      />
                    </div>
                  </TabPanel>

                  {/* Documents Tab */}
                  <TabPanel value="documents">
                    <div style={{ marginTop: 24 }}>
                      <div className="extract-detail-page__data-header">
                        <span className="extract-detail-page__data-title">Source Documents</span>
                        <span className="extract-detail-page__data-count">{sampleDocuments.length} documents</span>
                      </div>
                      <div className="extract-detail-page__documents">
                        {sampleDocuments.map(doc => (
                          <div key={doc.id} className="extract-detail-page__document">
                            <div className="extract-detail-page__document-icon">
                              <DocumentIcon />
                            </div>
                            <div className="extract-detail-page__document-info">
                              <div className="extract-detail-page__document-name">{doc.name}</div>
                              <div className="extract-detail-page__document-meta">
                                <span>{doc.type}</span>
                                <span>•</span>
                                <span>{doc.size}</span>
                                <span>•</span>
                                <span>{doc.extractedRows} row extracted</span>
                              </div>
                            </div>
                            <div className={`extract-detail-page__document-status extract-detail-page__document-status--${doc.status}`}>
                              <CheckIcon />
                              <span>Completed</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabPanel>

                  {/* Schema Tab */}
                  <TabPanel value="schema">
                    <div style={{ marginTop: 24 }}>
                      <div className="extract-detail-page__data-header">
                        <span className="extract-detail-page__data-title">Extract Schema</span>
                        <span className="extract-detail-page__data-count">{schemaColumns.length} columns</span>
                      </div>
                      <div className="extract-detail-page__schema">
                        {schemaColumns.map((col, i) => (
                          <div key={i} className="extract-detail-page__schema-col">
                            <div className="extract-detail-page__schema-col-icon">
                              <ColumnIcon />
                            </div>
                            <div className="extract-detail-page__schema-col-info">
                              <div className="extract-detail-page__schema-col-name">{col.name}</div>
                              <div className="extract-detail-page__schema-col-type">{col.type}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </div>
          </main>
        </div>
      </>
    );
  },
};

export const Running: StoryObj = {
  name: 'Running State',
  render: () => {
    const [activeNav, setActiveNav] = useState('extracts');

    return (
      <>
        <style>{pageStyles}</style>
        <div className="extract-detail-page">
          <NavBar
            brandName="Open Contracts"
            version="v3.0.0"
            items={navItems}
            activeId={activeNav}
            onNavigate={setActiveNav}
            userName="John Scrudato"
            userMenuItems={userMenuItems}
          />

          <main className="extract-detail-page__content">
            <button className="extract-detail-page__back" onClick={() => console.log('Back')}>
              <BackIcon />
              Back to Extracts
            </button>

            <header className="extract-detail-page__header">
              <div className="extract-detail-page__header-main">
                <div className="extract-detail-page__title-row">
                  <h1 className="extract-detail-page__title">Party Identification</h1>
                  <Chip size="sm" color="info" static>
                    Running
                  </Chip>
                </div>
                <div className="extract-detail-page__meta">
                  <span>from M&A Due Diligence</span>
                  <span className="extract-detail-page__meta-separator" />
                  <span>Started 10 minutes ago</span>
                </div>
              </div>
            </header>

            <div className="extract-detail-page__stats">
              <StatGrid columns={4}>
                <StatBlock
                  value="67%"
                  label="Progress"
                  description="157 of 234 docs"
                />
                <StatBlock
                  value="5"
                  label="Columns"
                  description="in schema"
                />
                <StatBlock
                  value="412"
                  label="Rows"
                  description="extracted so far"
                />
                <StatBlock
                  value="~3 min"
                  label="Remaining"
                  description="estimated"
                />
              </StatGrid>
            </div>

            <Card>
              <CardBody>
                <div style={{ padding: '32px 0', textAlign: 'center' }}>
                  <div style={{ marginBottom: 16 }}>
                    <div style={{
                      width: 48,
                      height: 48,
                      margin: '0 auto',
                      borderRadius: '50%',
                      border: '4px solid #E2E8F0',
                      borderTopColor: 'var(--oc-accent, #E85A4F)',
                      animation: 'spin 1s linear infinite',
                    }} />
                    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                  </div>
                  <h3 style={{ margin: '0 0 8px', fontSize: 18, fontWeight: 600, color: '#1E293B' }}>
                    Extraction in progress...
                  </h3>
                  <p style={{ margin: 0, color: '#64748B', fontSize: 14 }}>
                    Processing document 157 of 234. You can leave this page and check back later.
                  </p>
                </div>
              </CardBody>
            </Card>
          </main>
        </div>
      </>
    );
  },
};

export const Empty: StoryObj = {
  name: 'Empty / No Data',
  render: () => {
    const [activeNav, setActiveNav] = useState('extracts');

    return (
      <>
        <style>{pageStyles}</style>
        <div className="extract-detail-page">
          <NavBar
            brandName="Open Contracts"
            version="v3.0.0"
            items={navItems}
            activeId={activeNav}
            onNavigate={setActiveNav}
            userName="John Scrudato"
            userMenuItems={userMenuItems}
          />

          <main className="extract-detail-page__content">
            <button className="extract-detail-page__back" onClick={() => console.log('Back')}>
              <BackIcon />
              Back to Extracts
            </button>

            <header className="extract-detail-page__header">
              <div className="extract-detail-page__header-main">
                <div className="extract-detail-page__title-row">
                  <h1 className="extract-detail-page__title">IP Assignments</h1>
                  <Chip size="sm" color="error" static>
                    Failed
                  </Chip>
                </div>
                <div className="extract-detail-page__meta">
                  <span>from IP Portfolio</span>
                  <span className="extract-detail-page__meta-separator" />
                  <span>Created 3 days ago</span>
                </div>
              </div>
              <div className="extract-detail-page__actions">
                <Button
                  variant="primary"
                  size="sm"
                  leftIcon={<RefreshIcon />}
                  onClick={() => console.log('Retry')}
                >
                  Retry Extract
                </Button>
              </div>
            </header>

            <Card>
              <CardBody>
                <EmptyState
                  title="Extraction failed"
                  description="The extraction could not be completed due to unsupported document formats. Please check the source documents and try again."
                  size="lg"
                  action={
                    <Button variant="secondary" onClick={() => console.log('View details')}>
                      View Error Details
                    </Button>
                  }
                />
              </CardBody>
            </Card>
          </main>
        </div>
      </>
    );
  },
};
