import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NavBar } from '../NavBar';
import { SearchBox } from '../SearchBox';
import { Button } from '../Button';
import { EmptyState } from '../EmptyState';
import { FilterTabs } from '../FilterTabs';
import { Popover } from '../Popover';
import { ExtractCard, ExtractList, ExtractStatus } from '../ExtractCard';

const meta: Meta = {
  title: 'Pages/ExtractsListPage',
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

const TableIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="currentColor">
    <path d="M6 8a4 4 0 014-4h20a4 4 0 014 4v24a4 4 0 01-4 4H10a4 4 0 01-4-4V8zm4-2a2 2 0 00-2 2v6h24V8a2 2 0 00-2-2H10zm22 10H8v16a2 2 0 002 2h20a2 2 0 002-2V16zm-22 4h8v4H10v-4zm10 0h10v4H20v-4zm-10 6h8v4H10v-4zm10 0h10v4H20v-4z" />
  </svg>
);

const ViewIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 3.5C4.136 3.5 1.04 6.534 0 8c1.04 1.466 4.136 4.5 8 4.5s6.96-3.034 8-4.5c-1.04-1.466-4.136-4.5-8-4.5zm0 7.5a3 3 0 110-6 3 3 0 010 6z" />
  </svg>
);

const DuplicateIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M4 2a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H4zm0 1h8a1 1 0 011 1v8a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1z" />
  </svg>
);

const ExportIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8.75 1a.75.75 0 00-1.5 0v6.59L5.53 5.87a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06L8.75 7.59V1z" />
    <path d="M1.75 10a.75.75 0 00-.75.75v2.5A1.75 1.75 0 002.75 15h10.5A1.75 1.75 0 0015 13.25v-2.5a.75.75 0 00-1.5 0v2.5a.25.25 0 01-.25.25H2.75a.25.25 0 01-.25-.25v-2.5a.75.75 0 00-.75-.75z" />
  </svg>
);

const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
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

interface Extract {
  id: string;
  name: string;
  description?: string;
  corpusName: string;
  status: ExtractStatus;
  progress?: number;
  documentCount: number;
  columnCount: number;
  rowCount?: number;
  createdAt: string;
  completedAt?: string;
  createdBy: string;
}

const sampleExtracts: Extract[] = [
  {
    id: '1',
    name: 'Contract Key Terms',
    description: 'Extract party names, effective dates, termination clauses, and financial terms',
    corpusName: 'SEC Filings 2024',
    status: 'completed',
    documentCount: 156,
    columnCount: 8,
    rowCount: 1243,
    createdAt: '2 days ago',
    completedAt: '1 day ago',
    createdBy: 'John Scrudato',
  },
  {
    id: '2',
    name: 'Party Identification',
    description: 'Identify and extract all party names and their roles in agreements',
    corpusName: 'M&A Due Diligence',
    status: 'running',
    progress: 67,
    documentCount: 234,
    columnCount: 5,
    createdAt: '2 hours ago',
    createdBy: 'Sarah Chen',
  },
  {
    id: '3',
    name: 'Financial Metrics',
    description: 'Extract revenue figures, valuations, and financial covenants',
    corpusName: 'Annual Reports',
    status: 'queued',
    documentCount: 89,
    columnCount: 12,
    createdAt: '30 minutes ago',
    createdBy: 'John Scrudato',
  },
  {
    id: '4',
    name: 'Termination Provisions',
    corpusName: 'Employment Contracts',
    status: 'completed',
    documentCount: 45,
    columnCount: 6,
    rowCount: 312,
    createdAt: '1 week ago',
    completedAt: '6 days ago',
    createdBy: 'Mike Johnson',
  },
  {
    id: '5',
    name: 'IP Assignments',
    description: 'Extract intellectual property transfer and licensing terms',
    corpusName: 'IP Portfolio',
    status: 'failed',
    documentCount: 23,
    columnCount: 4,
    createdAt: '3 days ago',
    createdBy: 'Emma Davis',
  },
  {
    id: '6',
    name: 'Confidentiality Terms',
    corpusName: 'NDA Collection',
    status: 'pending',
    documentCount: 78,
    columnCount: 3,
    createdAt: 'Just now',
    createdBy: 'John Scrudato',
  },
  {
    id: '7',
    name: 'Compliance Requirements',
    description: 'GDPR, CCPA, and other regulatory compliance obligations',
    corpusName: 'Privacy Policies',
    status: 'completed',
    documentCount: 34,
    columnCount: 7,
    rowCount: 189,
    createdAt: '4 days ago',
    completedAt: '3 days ago',
    createdBy: 'Sarah Chen',
  },
];

// ═══════════════════════════════════════════════════════════════
// PAGE STYLES
// ═══════════════════════════════════════════════════════════════

const contextMenuStyles = `
  .extract-context-menu {
    min-width: 160px;
    padding: 6px 0;
    background: white;
    border: 1px solid #E2E8F0;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .extract-context-menu__item {
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

  .extract-context-menu__item:hover {
    background: #F1F5F9;
  }

  .extract-context-menu__item--danger {
    color: #DC2626;
  }

  .extract-context-menu__item--danger:hover {
    background: #FEF2F2;
  }

  .extract-context-menu__divider {
    height: 1px;
    background: #E2E8F0;
    margin: 6px 0;
  }

  .extract-context-menu__icon {
    width: 16px;
    height: 16px;
    opacity: 0.7;
  }
`;

const pageStyles = `
  .extracts-list-page {
    min-height: 100vh;
    background: var(--oc-bg-canvas, #FAFAFA);
    font-family: var(--oc-font-family, 'Inter', -apple-system, BlinkMacSystemFont, sans-serif);
  }

  .extracts-list-page__content {
    max-width: 900px;
    margin: 0 auto;
    padding: 48px 24px 80px;
  }

  /* Hero section */
  .extracts-list-page__hero {
    margin-bottom: 48px;
  }

  .extracts-list-page__title {
    font-family: 'Georgia', 'Times New Roman', serif;
    font-size: 42px;
    font-weight: 400;
    line-height: 1.2;
    color: #1E293B;
    margin: 0 0 16px;
  }

  .extracts-list-page__title span {
    color: var(--oc-accent, #E85A4F);
  }

  .extracts-list-page__subtitle {
    font-size: 17px;
    line-height: 1.6;
    color: #64748B;
    margin: 0 0 32px;
    max-width: 600px;
  }

  /* Search container */
  .extracts-list-page__search {
    margin-bottom: 16px;
  }

  /* Stats grid */
  .extracts-list-page__stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 32px;
    margin-bottom: 48px;
    padding: 32px 0;
  }

  .extracts-list-page__stat {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .extracts-list-page__stat-value {
    font-size: 36px;
    font-weight: 600;
    color: var(--oc-accent, #E85A4F);
    line-height: 1.1;
  }

  .extracts-list-page__stat-label {
    font-size: 15px;
    font-weight: 500;
    color: #1E293B;
  }

  .extracts-list-page__stat-desc {
    font-size: 13px;
    color: #94A3B8;
  }

  /* Section header */
  .extracts-list-page__section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .extracts-list-page__section-title {
    font-family: 'Georgia', 'Times New Roman', serif;
    font-size: 24px;
    font-weight: 400;
    color: var(--oc-accent, #E85A4F);
    margin: 0;
  }

  @media (max-width: 768px) {
    .extracts-list-page__content {
      padding: 32px 16px 60px;
    }

    .extracts-list-page__title {
      font-size: 32px;
    }

    .extracts-list-page__stats {
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;
    }

    .extracts-list-page__stat-value {
      font-size: 28px;
    }
  }
`;

// ═══════════════════════════════════════════════════════════════
// STORY
// ═══════════════════════════════════════════════════════════════

export const Default: StoryObj = {
  name: 'Extracts List (Reimagined)',
  render: () => {
    const [activeNav, setActiveNav] = useState('extracts');
    const [searchValue, setSearchValue] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);

    const filterItems = [
      { id: 'all', label: 'All' },
      { id: 'running', label: 'Running', count: '1' },
      { id: 'completed', label: 'Completed', count: '3' },
      { id: 'failed', label: 'Failed', count: '1' },
    ];

    const filteredExtracts = sampleExtracts.filter(extract => {
      if (activeFilter === 'running') return ['running', 'queued', 'pending'].includes(extract.status);
      if (activeFilter === 'completed') return extract.status === 'completed';
      if (activeFilter === 'failed') return extract.status === 'failed';
      return true;
    });

    // Calculate stats
    const totalExtracts = sampleExtracts.length;
    const completedExtracts = sampleExtracts.filter(e => e.status === 'completed').length;
    const totalRows = sampleExtracts.reduce((sum, e) => sum + (e.rowCount || 0), 0);
    const runningExtracts = sampleExtracts.filter(e => ['running', 'queued', 'pending'].includes(e.status)).length;

    // Context menu component
    const ExtractContextMenu = ({ extract, onClose }: { extract: Extract; onClose: () => void }) => (
      <div className="extract-context-menu">
        <button className="extract-context-menu__item" onClick={() => { console.log('View:', extract.id); onClose(); }}>
          <ViewIcon />
          View details
        </button>
        <button className="extract-context-menu__item" onClick={() => { console.log('Export:', extract.id); onClose(); }}>
          <ExportIcon />
          Export CSV
        </button>
        <button className="extract-context-menu__item" onClick={() => { console.log('Duplicate:', extract.id); onClose(); }}>
          <DuplicateIcon />
          Duplicate
        </button>
        <div className="extract-context-menu__divider" />
        <button className="extract-context-menu__item extract-context-menu__item--danger" onClick={() => { console.log('Delete:', extract.id); onClose(); }}>
          <TrashIcon />
          Delete
        </button>
      </div>
    );

    return (
      <>
        <style>{pageStyles}{contextMenuStyles}</style>
        <div className="extracts-list-page">
          <NavBar
            brandName="Open Contracts"
            version="v3.0.0"
            items={navItems}
            activeId={activeNav}
            onNavigate={setActiveNav}
            userName="John Scrudato"
            userMenuItems={userMenuItems}
          />

          <main className="extracts-list-page__content">
            {/* Hero section */}
            <section className="extracts-list-page__hero">
              <h1 className="extracts-list-page__title">
                Data <span>Extracts</span>
              </h1>
              <p className="extracts-list-page__subtitle">
                Extract structured data from your document corpuses. Define schemas, run extractions, and export results.
              </p>

              {/* Search */}
              <div className="extracts-list-page__search">
                <SearchBox
                  placeholder="Search extracts..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onSubmit={(value) => console.log('Search:', value)}
                />
              </div>

              {/* Filter tabs */}
              <FilterTabs
                items={filterItems}
                value={activeFilter}
                onChange={setActiveFilter}
              />
            </section>

            {/* Stats grid */}
            <div className="extracts-list-page__stats">
              <div className="extracts-list-page__stat">
                <span className="extracts-list-page__stat-value">{totalExtracts}</span>
                <span className="extracts-list-page__stat-label">Extracts</span>
                <span className="extracts-list-page__stat-desc">total created</span>
              </div>
              <div className="extracts-list-page__stat">
                <span className="extracts-list-page__stat-value">{completedExtracts}</span>
                <span className="extracts-list-page__stat-label">Completed</span>
                <span className="extracts-list-page__stat-desc">ready to view</span>
              </div>
              <div className="extracts-list-page__stat">
                <span className="extracts-list-page__stat-value">{totalRows.toLocaleString()}</span>
                <span className="extracts-list-page__stat-label">Rows</span>
                <span className="extracts-list-page__stat-desc">extracted data</span>
              </div>
              <div className="extracts-list-page__stat">
                <span className="extracts-list-page__stat-value">{runningExtracts}</span>
                <span className="extracts-list-page__stat-label">In Progress</span>
                <span className="extracts-list-page__stat-desc">currently running</span>
              </div>
            </div>

            {/* Extract list */}
            <section>
              <div className="extracts-list-page__section-header">
                <h2 className="extracts-list-page__section-title">
                  {activeFilter === 'all' ? 'Your Extracts' : filterItems.find(f => f.id === activeFilter)?.label}
                </h2>
                <Button variant="primary" size="sm" leftIcon={<PlusIcon />}>
                  New Extract
                </Button>
              </div>

              <ExtractList gap="md">
                {filteredExtracts.map(extract => (
                  <ExtractCard
                    key={extract.id}
                    name={extract.name}
                    description={extract.description}
                    corpusName={extract.corpusName}
                    status={extract.status}
                    progress={extract.progress}
                    documentCount={extract.documentCount}
                    columnCount={extract.columnCount}
                    rowCount={extract.rowCount}
                    createdAt={extract.createdAt}
                    completedAt={extract.completedAt}
                    onClick={() => console.log('Open extract:', extract.id)}
                    menu={
                      <Popover
                        open={openMenuId === extract.id}
                        onOpenChange={(open) => setOpenMenuId(open ? extract.id : null)}
                        placement="bottom"
                        content={
                          <ExtractContextMenu
                            extract={extract}
                            onClose={() => setOpenMenuId(null)}
                          />
                        }
                      >
                        <button
                          type="button"
                          className="oc-extract-card__menu-button"
                          aria-label="Open menu"
                        >
                          <KebabIcon />
                        </button>
                      </Popover>
                    }
                  />
                ))}
              </ExtractList>
            </section>
          </main>
        </div>
      </>
    );
  },
};

export const Empty: StoryObj = {
  name: 'Empty State',
  render: () => {
    const [activeNav, setActiveNav] = useState('extracts');

    return (
      <>
        <style>{pageStyles}</style>
        <div className="extracts-list-page">
          <NavBar
            brandName="Open Contracts"
            version="v3.0.0"
            items={navItems}
            activeId={activeNav}
            onNavigate={setActiveNav}
            userName="John Scrudato"
            userMenuItems={userMenuItems}
          />

          <main className="extracts-list-page__content">
            {/* Hero section */}
            <section className="extracts-list-page__hero">
              <h1 className="extracts-list-page__title">
                Data <span>Extracts</span>
              </h1>
              <p className="extracts-list-page__subtitle">
                Extract structured data from your document corpuses. Define schemas, run extractions, and export results.
              </p>
            </section>

            {/* Empty state */}
            <EmptyState
              icon={<TableIcon />}
              title="No extracts yet"
              description="Create your first extract to pull structured data from your documents. Define the columns you need and let the system do the rest."
              size="lg"
              action={
                <Button variant="primary" leftIcon={<PlusIcon />}>
                  Create Your First Extract
                </Button>
              }
            />
          </main>
        </div>
      </>
    );
  },
};
