import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NavBar } from '../NavBar';
import { SearchBox } from '../SearchBox';
import { Card, CardBody } from '../Card';
import { Button } from '../Button';
import { EmptyState } from '../EmptyState';
import { FilterTabs } from '../FilterTabs';
import { CollectionCard, CollectionList } from '../CollectionCard';
import { Popover } from '../Popover';

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

const FolderIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <path d="M4 12a4 4 0 014-4h8.343a4 4 0 012.829 1.172l1.656 1.656A4 4 0 0023.657 12H32a4 4 0 014 4v16a4 4 0 01-4 4H8a4 4 0 01-4-4V12z" fill="currentColor" />
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
// SAMPLE DATA - Simplified for minimal design
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
  labelCount: number;
  lastUpdated: string;
  category: 'legislation' | 'contracts' | 'case-law' | 'knowledge' | 'default';
  /** Optional thumbnail image */
  image?: string;
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
    labelCount: 45,
    lastUpdated: '2 hours ago',
    category: 'legislation',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=100&h=100&fit=crop',
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
    labelCount: 23,
    lastUpdated: '1 day ago',
    category: 'contracts',
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
    labelCount: 67,
    lastUpdated: '3 hours ago',
    category: 'contracts',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=100&h=100&fit=crop',
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
    labelCount: 18,
    lastUpdated: '5 days ago',
    category: 'knowledge',
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
    labelCount: 12,
    lastUpdated: '1 week ago',
    category: 'contracts',
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
    labelCount: 8,
    lastUpdated: '2 weeks ago',
    category: 'legislation',
  },
  {
    id: '7',
    title: 'Landmark Privacy Decisions',
    description: 'Curated collection of pivotal privacy rulings across jurisdictions',
    owner: 'John Scrudato',
    ownerEmail: 'jscrudato@umich.edu',
    visibility: 'public',
    documentCount: 78,
    annotationCount: 890,
    labelCount: 34,
    lastUpdated: 'Just now',
    category: 'case-law',
  },
];

// ═══════════════════════════════════════════════════════════════
// PAGE STYLES - Minimal, matching Discover page aesthetic
// ═══════════════════════════════════════════════════════════════

// Context menu styles
const contextMenuStyles = `
  .corpus-context-menu {
    min-width: 160px;
    padding: 6px 0;
    background: white;
    border: 1px solid #E2E8F0;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .corpus-context-menu__item {
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

  .corpus-context-menu__item:hover {
    background: #F1F5F9;
  }

  .corpus-context-menu__item--danger {
    color: #DC2626;
  }

  .corpus-context-menu__item--danger:hover {
    background: #FEF2F2;
  }

  .corpus-context-menu__divider {
    height: 1px;
    background: #E2E8F0;
    margin: 6px 0;
  }

  .corpus-context-menu__icon {
    width: 16px;
    height: 16px;
    opacity: 0.7;
  }
`;

const pageStyles = `
  .corpus-list-page {
    min-height: 100vh;
    background: var(--oc-bg-canvas, #FAFAFA);
    font-family: var(--oc-font-family, 'Inter', -apple-system, BlinkMacSystemFont, sans-serif);
  }

  .corpus-list-page__content {
    max-width: 900px;
    margin: 0 auto;
    padding: 48px 24px 80px;
  }

  /* Hero section matching Discover page */
  .corpus-list-page__hero {
    margin-bottom: 48px;
  }

  .corpus-list-page__title {
    font-family: 'Georgia', 'Times New Roman', serif;
    font-size: 42px;
    font-weight: 400;
    line-height: 1.2;
    color: #1E293B;
    margin: 0 0 16px;
  }

  .corpus-list-page__title span {
    color: #0F766E;
  }

  .corpus-list-page__subtitle {
    font-size: 17px;
    line-height: 1.6;
    color: #64748B;
    margin: 0 0 32px;
    max-width: 600px;
  }

  /* Action row */
  .corpus-list-page__actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 16px;
  }

  /* Search container */
  .corpus-list-page__search {
    margin-bottom: 16px;
  }

  /* Stats grid - matching Discover page */
  .corpus-list-page__stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px 48px;
    margin-bottom: 48px;
    padding: 32px 0;
  }

  .corpus-list-page__stat {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .corpus-list-page__stat-value {
    font-size: 36px;
    font-weight: 600;
    color: #0F766E;
    line-height: 1.1;
  }

  .corpus-list-page__stat-label {
    font-size: 15px;
    font-weight: 500;
    color: #1E293B;
  }

  .corpus-list-page__stat-desc {
    font-size: 13px;
    color: #94A3B8;
  }

  /* Section header styling (like Discover page) */
  .corpus-list-page__section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .corpus-list-page__section-title {
    font-family: 'Georgia', 'Times New Roman', serif;
    font-size: 24px;
    font-weight: 400;
    color: #0F766E;
    margin: 0;
  }

  .corpus-list-page__section-link {
    font-size: 14px;
    font-weight: 500;
    color: #64748B;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
  }

  .corpus-list-page__section-link:hover {
    color: #0F766E;
  }

  @media (max-width: 768px) {
    .corpus-list-page__content {
      padding: 32px 16px 60px;
    }

    .corpus-list-page__title {
      font-size: 32px;
    }

    .corpus-list-page__stats {
      gap: 24px 32px;
    }

    .corpus-list-page__stat-value {
      font-size: 28px;
    }
  }
`;

// ═══════════════════════════════════════════════════════════════
// HELPER - Map visibility to status text
// ═══════════════════════════════════════════════════════════════

const getVisibilityStatus = (visibility: 'public' | 'private' | 'shared') => {
  switch (visibility) {
    case 'public':
      return 'Public';
    case 'private':
      return 'Private';
    case 'shared':
      return 'Shared with team';
  }
};

const formatStats = (corpus: Corpus): string[] => {
  const stats: string[] = [];
  if (corpus.documentCount > 0) {
    stats.push(`${corpus.documentCount} docs`);
  }
  if (corpus.annotationCount > 0) {
    stats.push(`${corpus.annotationCount.toLocaleString()} annotations`);
  }
  if (corpus.labelCount > 0) {
    stats.push(`${corpus.labelCount} labels`);
  }
  return stats;
};

// ═══════════════════════════════════════════════════════════════
// STORY
// ═══════════════════════════════════════════════════════════════

export const Default: StoryObj = {
  name: 'Corpus List (Reimagined)',
  render: () => {
    const [activeNav, setActiveNav] = useState('corpuses');
    const [searchValue, setSearchValue] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');

    const filterItems = [
      { id: 'all', label: 'All' },
      { id: 'my', label: 'My Corpuses', count: '2' },
      { id: 'shared', label: 'Shared', count: '1' },
      { id: 'public', label: 'Public', count: '4' },
    ];

    const filteredCorpuses = sampleCorpuses.filter(corpus => {
      if (activeFilter === 'my') return corpus.ownerEmail === 'jscrudato@umich.edu';
      if (activeFilter === 'shared') return corpus.visibility === 'shared';
      if (activeFilter === 'public') return corpus.visibility === 'public';
      return true;
    });

    // Calculate totals for stats
    const totalDocs = sampleCorpuses.reduce((sum, c) => sum + c.documentCount, 0);
    const totalAnnotations = sampleCorpuses.reduce((sum, c) => sum + c.annotationCount, 0);

    // Track which menu is open
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);

    // Context menu component
    const CorpusContextMenu = ({ corpus, onClose }: { corpus: Corpus; onClose: () => void }) => (
      <div className="corpus-context-menu">
        <button className="corpus-context-menu__item" onClick={() => { console.log('Edit:', corpus.id); onClose(); }}>
          <EditIcon />
          Edit
        </button>
        <button className="corpus-context-menu__item" onClick={() => { console.log('Share:', corpus.id); onClose(); }}>
          <ShareIcon />
          Share
        </button>
        <button className="corpus-context-menu__item" onClick={() => { console.log('Duplicate:', corpus.id); onClose(); }}>
          <DuplicateIcon />
          Duplicate
        </button>
        <div className="corpus-context-menu__divider" />
        <button className="corpus-context-menu__item corpus-context-menu__item--danger" onClick={() => { console.log('Delete:', corpus.id); onClose(); }}>
          <TrashIcon />
          Delete
        </button>
      </div>
    );

    return (
      <>
        <style>{pageStyles}{contextMenuStyles}</style>
        <div className="corpus-list-page">
          <NavBar
            brandName="Open Contracts"
            version="v3.0.0"
            items={navItems}
            activeId={activeNav}
            onNavigate={setActiveNav}
            userName="John Scrudato"
            userMenuItems={userMenuItems}
          />

          <main className="corpus-list-page__content">
            {/* Hero section - matching Discover page */}
            <section className="corpus-list-page__hero">
              <h1 className="corpus-list-page__title">
                Your <span>corpuses</span>
              </h1>
              <p className="corpus-list-page__subtitle">
                Organize documents, collaborate on annotations, and build knowledge collections.
              </p>

              {/* Search */}
              <div className="corpus-list-page__search">
                <SearchBox
                  placeholder="Search your corpuses..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onSubmit={(value) => console.log('Search:', value)}
                />
              </div>

              {/* Filter tabs - clean, no icon */}
              <FilterTabs
                items={filterItems}
                value={activeFilter}
                onChange={setActiveFilter}
              />
            </section>

            {/* Stats grid - matching Discover page */}
            <div className="corpus-list-page__stats">
              <div className="corpus-list-page__stat">
                <span className="corpus-list-page__stat-value">{sampleCorpuses.length}</span>
                <span className="corpus-list-page__stat-label">Corpuses</span>
                <span className="corpus-list-page__stat-desc">in your library</span>
              </div>
              <div className="corpus-list-page__stat">
                <span className="corpus-list-page__stat-value">{totalDocs.toLocaleString()}</span>
                <span className="corpus-list-page__stat-label">Documents</span>
                <span className="corpus-list-page__stat-desc">across all corpuses</span>
              </div>
              <div className="corpus-list-page__stat">
                <span className="corpus-list-page__stat-value">{totalAnnotations.toLocaleString()}</span>
                <span className="corpus-list-page__stat-label">Annotations</span>
                <span className="corpus-list-page__stat-desc">total contributions</span>
              </div>
              <div className="corpus-list-page__stat">
                <span className="corpus-list-page__stat-value">{sampleCorpuses.filter(c => c.visibility === 'shared').length}</span>
                <span className="corpus-list-page__stat-label">Shared</span>
                <span className="corpus-list-page__stat-desc">with collaborators</span>
              </div>
            </div>

            {/* Corpus list */}
            <section>
              <div className="corpus-list-page__section-header">
                <h2 className="corpus-list-page__section-title">
                  {activeFilter === 'all' ? 'Your Corpuses' : filterItems.find(f => f.id === activeFilter)?.label}
                </h2>
                <Button variant="primary" size="sm" leftIcon={<PlusIcon />}>
                  New Corpus
                </Button>
              </div>

              <CollectionList gap="md">
                {filteredCorpuses.map(corpus => (
                  <CollectionCard
                    key={corpus.id}
                    type={corpus.category}
                    status={`${getVisibilityStatus(corpus.visibility)} • Updated ${corpus.lastUpdated}`}
                    title={corpus.title}
                    description={corpus.description}
                    stats={formatStats(corpus)}
                    onClick={() => console.log('Open corpus:', corpus.id)}
                    menu={
                      <Popover
                        open={openMenuId === corpus.id}
                        onOpenChange={(open) => setOpenMenuId(open ? corpus.id : null)}
                        placement="bottom"
                        content={
                          <CorpusContextMenu
                            corpus={corpus}
                            onClose={() => setOpenMenuId(null)}
                          />
                        }
                      >
                        <button
                          type="button"
                          className="oc-collection-card__menu-button"
                          aria-label="Open menu"
                        >
                          <KebabIcon />
                        </button>
                      </Popover>
                    }
                  />
                ))}
              </CollectionList>
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
    const [activeNav, setActiveNav] = useState('corpuses');

    return (
      <>
        <style>{pageStyles}</style>
        <div className="corpus-list-page">
          <NavBar
            brandName="Open Contracts"
            version="v3.0.0"
            items={navItems}
            activeId={activeNav}
            onNavigate={setActiveNav}
            userName="John Scrudato"
            userMenuItems={userMenuItems}
          />

          <main className="corpus-list-page__content">
            {/* Hero section */}
            <section className="corpus-list-page__hero">
              <h1 className="corpus-list-page__title">
                Your <span>corpuses</span>
              </h1>
              <p className="corpus-list-page__subtitle">
                Organize documents, collaborate on annotations, and build knowledge collections.
              </p>
            </section>

            {/* Empty state */}
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
          </main>
        </div>
      </>
    );
  },
};
