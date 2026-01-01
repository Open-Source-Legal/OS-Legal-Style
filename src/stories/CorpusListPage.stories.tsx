import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NavBar } from '../NavBar';
import { SearchBox } from '../SearchBox';
import { Card, CardBody } from '../Card';
import { Button } from '../Button';
import { EmptyState } from '../EmptyState';
import { FilterTabs } from '../FilterTabs';
import { CollectionCard, CollectionList } from '../CollectionCard';
import { FilterPanel, FilterValues, FilterSection } from '../FilterPanel';
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

  /* Compact inline stats */
  .corpus-list-page__stats {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    margin-bottom: 32px;
    padding: 16px 0;
    border-bottom: 1px solid var(--oc-border-default, #E2E8F0);
  }

  .corpus-list-page__stat {
    display: flex;
    align-items: baseline;
    gap: 6px;
  }

  .corpus-list-page__stat-value {
    font-size: 20px;
    font-weight: 600;
    color: #0F766E;
  }

  .corpus-list-page__stat-label {
    font-size: 14px;
    color: #64748B;
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
      gap: 16px;
    }

    .corpus-list-page__stat-value {
      font-size: 18px;
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

const getCategoryBadge = (category: Corpus['category']) => {
  switch (category) {
    case 'legislation':
      return 'Legislation';
    case 'contracts':
      return 'Contracts';
    case 'case-law':
      return 'Case Law';
    case 'knowledge':
      return 'Knowledge';
    default:
      return 'Collection';
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

// Filter panel sections
const advancedFilterSections: FilterSection[] = [
  {
    key: 'category',
    label: 'Category',
    type: 'checkbox',
    options: [
      { value: 'legislation', label: 'Legislation', count: 2 },
      { value: 'contracts', label: 'Contracts', count: 3 },
      { value: 'case-law', label: 'Case Law', count: 1 },
      { value: 'knowledge', label: 'Knowledge', count: 1 },
    ],
  },
  {
    key: 'owner',
    label: 'Owner',
    type: 'checkbox',
    searchable: true,
    searchPlaceholder: 'Search owners...',
    options: [
      { value: 'schen', label: 'Sarah Chen', count: 2 },
      { value: 'mjohnson', label: 'Mike Johnson', count: 1 },
      { value: 'arivera', label: 'Alex Rivera', count: 1 },
      { value: 'edavis', label: 'Emma Davis', count: 1 },
      { value: 'jscrudato', label: 'John Scrudato', count: 2 },
    ],
  },
  {
    key: 'updated',
    label: 'Last Updated',
    type: 'date-range',
  },
];

export const Default: StoryObj = {
  name: 'Corpus List (Reimagined)',
  render: () => {
    const [activeNav, setActiveNav] = useState('corpuses');
    const [searchValue, setSearchValue] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');
    const [filterPanelOpen, setFilterPanelOpen] = useState(false);
    const [advancedFilters, setAdvancedFilters] = useState<FilterValues>({
      category: [],
      owner: [],
      updated: { from: '', to: '' },
    });

    const filterItems = [
      { id: 'all', label: 'All' },
      { id: 'my', label: 'My Corpuses', count: '2' },
      { id: 'shared', label: 'Shared', count: '1' },
      { id: 'public', label: 'Public', count: '4' },
    ];

    // Count active advanced filters
    const advancedFilterCount = Object.values(advancedFilters).reduce((count, val) => {
      if (Array.isArray(val)) return count + val.length;
      if (val && (val.from || val.to)) return count + 1;
      return count;
    }, 0);

    const filteredCorpuses = sampleCorpuses.filter(corpus => {
      if (activeFilter === 'my') return corpus.ownerEmail === 'jscrudato@umich.edu';
      if (activeFilter === 'shared') return corpus.visibility === 'shared';
      if (activeFilter === 'public') return corpus.visibility === 'public';
      return true;
    });

    // Calculate totals for stats
    const totalDocs = sampleCorpuses.reduce((sum, c) => sum + c.documentCount, 0);
    const totalAnnotations = sampleCorpuses.reduce((sum, c) => sum + c.annotationCount, 0);

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

              {/* Filter tabs with separate filter icon popover */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Popover
                  open={filterPanelOpen}
                  onOpenChange={setFilterPanelOpen}
                  placement="bottom"
                  content={
                    <FilterPanel
                      title="Advanced Filters"
                      sections={advancedFilterSections}
                      values={advancedFilters}
                      onChange={setAdvancedFilters}
                      onApply={() => setFilterPanelOpen(false)}
                      onCancel={() => setFilterPanelOpen(false)}
                    />
                  }
                >
                  <button
                    type="button"
                    className="oc-filter-tabs__icon-button"
                    aria-label="Advanced filters"
                    style={{
                      position: 'relative',
                      ...(advancedFilterCount > 0 ? { borderColor: '#0F766E', color: '#0F766E' } : {}),
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 18 18" fill="currentColor">
                      <path d="M1.5 2.25A.75.75 0 012.25 1.5h13.5a.75.75 0 01.75.75v2.25a.75.75 0 01-.22.53L11.25 9.56v5.19a.75.75 0 01-.39.66l-3 1.5a.75.75 0 01-1.11-.66V9.56L1.72 5.03a.75.75 0 01-.22-.53V2.25z" />
                    </svg>
                    {advancedFilterCount > 0 && (
                      <span style={{
                        position: 'absolute',
                        top: '-4px',
                        right: '-4px',
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        background: '#0F766E',
                        color: 'white',
                        fontSize: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        {advancedFilterCount}
                      </span>
                    )}
                  </button>
                </Popover>
                <FilterTabs
                  items={filterItems}
                  value={activeFilter}
                  onChange={setActiveFilter}
                />
              </div>
            </section>

            {/* Compact inline stats */}
            <div className="corpus-list-page__stats">
              <div className="corpus-list-page__stat">
                <span className="corpus-list-page__stat-value">{sampleCorpuses.length}</span>
                <span className="corpus-list-page__stat-label">corpuses</span>
              </div>
              <div className="corpus-list-page__stat">
                <span className="corpus-list-page__stat-value">{totalDocs.toLocaleString()}</span>
                <span className="corpus-list-page__stat-label">documents</span>
              </div>
              <div className="corpus-list-page__stat">
                <span className="corpus-list-page__stat-value">{totalAnnotations.toLocaleString()}</span>
                <span className="corpus-list-page__stat-label">annotations</span>
              </div>
            </div>

            {/* Corpus list */}
            <section>
              <div className="corpus-list-page__section-header">
                <h2 className="corpus-list-page__section-title">
                  {activeFilter === 'all' ? 'All Corpuses' : filterItems.find(f => f.id === activeFilter)?.label}
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
                    badge={getCategoryBadge(corpus.category)}
                    status={`${getVisibilityStatus(corpus.visibility)} • Updated ${corpus.lastUpdated}`}
                    title={corpus.title}
                    description={corpus.description}
                    stats={formatStats(corpus)}
                    image={corpus.image}
                    onClick={() => console.log('Open corpus:', corpus.id)}
                    onMenuClick={(e) => console.log('Menu clicked:', corpus.id, e)}
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
