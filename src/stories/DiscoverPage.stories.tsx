import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from '../Chip';
import { Avatar } from '../Avatar';
import { SearchBox } from '../SearchBox';
import { FilterTabs } from '../FilterTabs';
import { StatBlock, StatGrid } from '../StatBlock';
import { CollectionCard } from '../CollectionCard';
import { ActivityFeed } from '../ActivityFeed';
import { ActionList } from '../ActionList';

const meta: Meta = {
  title: 'Pages/DiscoverPage',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

// User dropdown menu icons
const ExportsIcon = () => (
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

// Navigation component with responsive mobile menu
const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <header className="oc-discover-nav">
      <div className="oc-discover-nav__left">
        <div className="oc-discover-nav__logo">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="12" stroke="currentColor" strokeWidth="2" />
            <circle cx="14" cy="14" r="6" fill="currentColor" />
          </svg>
          <span className="oc-discover-nav__brand">Open Contracts</span>
          <Chip size="sm" variant="outline">v3.0.0</Chip>
        </div>
        <nav className="oc-discover-nav__links">
          <a href="#" className="oc-discover-nav__link oc-discover-nav__link--active">Discover</a>
          <a href="#" className="oc-discover-nav__link">Corpuses</a>
          <a href="#" className="oc-discover-nav__link">Documents</a>
          <a href="#" className="oc-discover-nav__link">Label Sets</a>
          <a href="#" className="oc-discover-nav__link">Annotations</a>
          <a href="#" className="oc-discover-nav__link">Extracts</a>
          <a href="#" className="oc-discover-nav__link">Leaderboard</a>
        </nav>
      </div>
      <div className="oc-discover-nav__right">
        <div className="oc-user-dropdown">
          <button
            className="oc-user-dropdown__trigger"
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            aria-expanded={userMenuOpen}
            aria-haspopup="true"
          >
            <Avatar name="John Scrudato" size="sm" />
            <span className="oc-user-dropdown__name">John Scrudato</span>
            <svg
              className={`oc-user-dropdown__chevron ${userMenuOpen ? 'oc-user-dropdown__chevron--open' : ''}`}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path d="M4.22 6.22a.75.75 0 011.06 0L8 8.94l2.72-2.72a.75.75 0 111.06 1.06l-3.25 3.25a.75.75 0 01-1.06 0L4.22 7.28a.75.75 0 010-1.06z" />
            </svg>
          </button>
          {userMenuOpen && (
            <>
              <div
                className="oc-user-dropdown__backdrop"
                onClick={() => setUserMenuOpen(false)}
              />
              <div className="oc-user-dropdown__menu">
                <button className="oc-user-dropdown__item" onClick={() => console.log('Exports clicked')}>
                  <ExportsIcon />
                  <span>Exports</span>
                </button>
                <button className="oc-user-dropdown__item" onClick={() => console.log('Profile clicked')}>
                  <ProfileIcon />
                  <span>Profile</span>
                </button>
                <div className="oc-user-dropdown__divider" />
                <button className="oc-user-dropdown__item oc-user-dropdown__item--danger" onClick={() => console.log('Logout clicked')}>
                  <LogoutIcon />
                  <span>Logout</span>
                </button>
              </div>
            </>
          )}
        </div>
        <button
          className="oc-discover-nav__mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.225 4.811a1 1 0 00-1.414 1.414L10.586 12 4.81 17.775a1 1 0 101.414 1.414L12 13.414l5.775 5.775a1 1 0 001.414-1.414L13.414 12l5.775-5.775a1 1 0 00-1.414-1.414L12 10.586 6.225 4.81z" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" />
            </svg>
          )}
        </button>
      </div>
      {mobileMenuOpen && (
        <div className="oc-discover-nav__mobile-menu">
          <nav className="oc-discover-nav__mobile-links">
            <a href="#" className="oc-discover-nav__mobile-link oc-discover-nav__mobile-link--active">Discover</a>
            <a href="#" className="oc-discover-nav__mobile-link">Corpuses</a>
            <a href="#" className="oc-discover-nav__mobile-link">Documents</a>
            <a href="#" className="oc-discover-nav__mobile-link">Label Sets</a>
            <a href="#" className="oc-discover-nav__mobile-link">Annotations</a>
            <a href="#" className="oc-discover-nav__mobile-link">Extracts</a>
            <a href="#" className="oc-discover-nav__mobile-link">Leaderboard</a>
          </nav>
        </div>
      )}
    </header>
  );
};

// Category filter tabs data
const categories = [
  { id: 'all', label: 'All' },
  { id: 'legislation', label: 'Legislation', count: '2.4K' },
  { id: 'contracts', label: 'Contracts', count: '12K' },
  { id: 'case-law', label: 'Case Law', count: '8.1K' },
  { id: 'knowledge', label: 'Knowledge', count: '340' },
];

// Action icons for Get Started
const UploadIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 12.75v1.5a1.5 1.5 0 001.5 1.5h9a1.5 1.5 0 001.5-1.5v-1.5M12 6L9 3M9 3L6 6M9 3v9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const JoinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 6.75a3 3 0 11-6 0 3 3 0 016 0zM3.75 15.75v-.75a4.5 4.5 0 014.5-4.5h1.5M15 11.25v4.5M12.75 13.5h4.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CreateIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3.75 3.75h10.5v10.5H3.75zM9 6.75v4.5M6.75 9h4.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const GuideIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4.5 2.25h9a1.5 1.5 0 011.5 1.5v10.5a1.5 1.5 0 01-1.5 1.5h-9a1.5 1.5 0 01-1.5-1.5V3.75a1.5 1.5 0 011.5-1.5zM6.75 6h4.5M6.75 9h4.5M6.75 12h2.25" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Featured collections data - using CollectionCard props
const featuredCollections = [
  {
    id: 1,
    type: 'legislation' as const,
    badge: 'Legislation',
    status: 'Active discussion',
    title: 'US Federal Code - Annotated',
    description: 'Complete USC with community annotations linking to case law, regulatory guidance, and practical interpretations.',
    stats: ['54 titles', '34.2K annotations', '156 contributors'],
  },
  {
    id: 2,
    type: 'contracts' as const,
    badge: 'Contracts',
    status: '12 new annotations today',
    title: 'CUAD Contract Dataset',
    description: 'Contract Understanding Atticus Dataset — expert-annotated commercial agreements for ML training and legal research.',
    stats: ['510 contracts', '13.1K annotations', '42 contributors'],
  },
  {
    id: 3,
    type: 'case-law' as const,
    badge: 'Case Law',
    status: 'Recently updated',
    title: 'Landmark Privacy Decisions',
    description: 'Curated collection of pivotal privacy and data protection rulings across jurisdictions with comparative analysis.',
    stats: ['234 cases', '8.7K annotations', '89 contributors'],
  },
  {
    id: 4,
    type: 'knowledge' as const,
    badge: 'Knowledge Base',
    status: '3 new entries this week',
    title: 'Contract Clause Encyclopedia',
    description: 'Living reference of standard and non-standard contract clauses with usage guidance, risks, and negotiation notes.',
    stats: ['1,240 entries', '5.2K annotations', '203 contributors'],
  },
];

// Recent activity data - using ActivityItemData format
const recentActivity = [
  { id: 1, initials: 'SC', avatarColor: '#3B82F6', name: 'Sarah Chen', action: 'annotated', target: 'Liability Clause Analysis', time: '12m ago' },
  { id: 2, initials: 'MW', avatarColor: '#10B981', name: 'Marcus Webb', action: 'created', target: 'Indemnification Guide', time: '1h ago' },
  { id: 3, initials: 'RT', avatarColor: '#8B5CF6', name: 'Research Team', action: 'published', target: 'Contract Dataset v2.0', time: '3h ago' },
  { id: 4, initials: 'DR', avatarColor: '#EF4444', name: 'Dr. Rivera', action: 'commented on', target: 'Regulatory Compliance Review', time: '5h ago' },
];

// Get Started items for ActionList
const getStartedItems = [
  { id: 1, label: 'Upload your first document', icon: <UploadIcon /> },
  { id: 2, label: 'Join an existing project', icon: <JoinIcon /> },
  { id: 3, label: 'Create a new collection', icon: <CreateIcon /> },
  { id: 4, label: 'Read the contributor guide', icon: <GuideIcon /> },
];

// Organizations
const organizations = ['Stanford Law', 'NYU Law', 'Berkeley Law', 'EFF', 'ACLU', 'ACC', 'Atticus Project'];

export const Default: StoryObj = {
  render: () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchValue, setSearchValue] = useState('');

    return (
      <>
        <style>{`
          .oc-discover-page {
            min-height: 100vh;
            background: #FAFAFA;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          }

          /* Navigation */
          .oc-discover-nav {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            padding: 12px 24px;
            background: var(--oc-bg-sidebar, #0F172A);
            color: white;
          }

          .oc-discover-nav__left {
            display: flex;
            align-items: center;
            gap: 32px;
          }

          .oc-discover-nav__logo {
            display: flex;
            align-items: center;
            gap: 10px;
            color: white;
          }

          .oc-discover-nav__brand {
            font-weight: 600;
            font-size: 15px;
          }

          .oc-discover-nav__links {
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .oc-discover-nav__link {
            padding: 8px 12px;
            color: rgba(255, 255, 255, 0.7);
            text-decoration: none;
            font-size: 14px;
            font-weight: 500;
            border-radius: 6px;
            transition: all 0.15s ease;
          }

          .oc-discover-nav__link:hover {
            color: white;
            background: rgba(255, 255, 255, 0.1);
          }

          .oc-discover-nav__link--active {
            color: white;
            background: rgba(255, 255, 255, 0.15);
          }

          .oc-discover-nav__right {
            display: flex;
            align-items: center;
            gap: 12px;
            color: rgba(255, 255, 255, 0.9);
          }

          /* User dropdown */
          .oc-user-dropdown {
            position: relative;
          }

          .oc-user-dropdown__trigger {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 6px 10px 6px 6px;
            background: transparent;
            border: none;
            border-radius: 8px;
            color: rgba(255, 255, 255, 0.9);
            cursor: pointer;
            transition: all 0.15s ease;
          }

          .oc-user-dropdown__trigger:hover {
            background: rgba(255, 255, 255, 0.1);
          }

          .oc-user-dropdown__name {
            font-size: 14px;
            font-weight: 500;
          }

          .oc-user-dropdown__chevron {
            transition: transform 0.2s ease;
            opacity: 0.7;
          }

          .oc-user-dropdown__chevron--open {
            transform: rotate(180deg);
          }

          .oc-user-dropdown__backdrop {
            position: fixed;
            inset: 0;
            z-index: 100;
          }

          .oc-user-dropdown__menu {
            position: absolute;
            top: calc(100% + 8px);
            right: 0;
            min-width: 180px;
            padding: 6px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            z-index: 101;
            animation: dropdownSlide 0.15s ease;
          }

          @keyframes dropdownSlide {
            from { opacity: 0; transform: translateY(-4px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .oc-user-dropdown__item {
            display: flex;
            align-items: center;
            gap: 10px;
            width: 100%;
            padding: 10px 12px;
            background: transparent;
            border: none;
            border-radius: 6px;
            color: #475569;
            font-size: 14px;
            font-weight: 500;
            text-align: left;
            cursor: pointer;
            transition: all 0.15s ease;
          }

          .oc-user-dropdown__item:hover {
            background: #F1F5F9;
            color: #0F172A;
          }

          .oc-user-dropdown__item--danger { color: #DC2626; }
          .oc-user-dropdown__item--danger:hover { background: #FEF2F2; color: #DC2626; }

          .oc-user-dropdown__divider {
            height: 1px;
            margin: 6px 0;
            background: #E2E8F0;
          }

          /* Mobile menu */
          .oc-discover-nav__mobile-toggle {
            display: none;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            padding: 0;
            background: rgba(255, 255, 255, 0.1);
            border: none;
            border-radius: 8px;
            color: white;
            cursor: pointer;
          }

          .oc-discover-nav__mobile-menu {
            display: none;
            width: 100%;
            padding: 16px 0 8px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            margin-top: 12px;
          }

          .oc-discover-nav__mobile-links {
            display: flex;
            flex-direction: column;
            gap: 4px;
          }

          .oc-discover-nav__mobile-link {
            padding: 12px 16px;
            color: rgba(255, 255, 255, 0.7);
            text-decoration: none;
            font-size: 15px;
            font-weight: 500;
            border-radius: 8px;
          }

          .oc-discover-nav__mobile-link--active {
            color: white;
            background: rgba(255, 255, 255, 0.15);
          }

          @media (max-width: 1100px) {
            .oc-discover-nav__links { display: none; }
            .oc-discover-nav__mobile-toggle { display: flex; }
            .oc-discover-nav__mobile-menu { display: block; }
          }

          @media (max-width: 768px) {
            .oc-discover-nav { padding: 12px 16px; }
            .oc-user-dropdown__name, .oc-user-dropdown__chevron { display: none; }
            .oc-user-dropdown__trigger { padding: 4px; }
            .oc-discover-nav__logo .oc-chip { display: none; }
          }

          @media (max-width: 480px) {
            .oc-discover-nav__brand { display: none; }
          }

          /* Main content container */
          .oc-discover-content {
            max-width: 900px;
            margin: 0 auto;
            padding: 48px 24px 80px;
          }

          @media (max-width: 768px) {
            .oc-discover-content { padding: 32px 16px 60px; }
          }

          /* Hero Section - Clean & Minimal */
          .oc-hero-minimal {
            margin-bottom: 48px;
          }

          .oc-hero-minimal__title {
            font-family: 'Georgia', 'Times New Roman', serif;
            font-size: 42px;
            font-weight: 400;
            line-height: 1.2;
            color: #1E293B;
            margin: 0 0 16px;
          }

          .oc-hero-minimal__title span {
            color: #0F766E;
          }

          @media (max-width: 768px) {
            .oc-hero-minimal__title { font-size: 32px; }
          }

          .oc-hero-minimal__subtitle {
            font-size: 17px;
            line-height: 1.6;
            color: #64748B;
            margin: 0 0 32px;
            max-width: 600px;
          }

          /* Search container wrapper */
          .oc-search-container {
            margin-bottom: 16px;
          }

          /* Section Header */
          .oc-section-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 20px;
          }

          .oc-section-header__title {
            font-family: 'Georgia', 'Times New Roman', serif;
            font-size: 24px;
            font-weight: 400;
            color: #0F766E;
            margin: 0;
          }

          .oc-section-header__link {
            font-size: 14px;
            font-weight: 500;
            color: #64748B;
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 4px;
          }

          .oc-section-header__link:hover {
            color: #0F766E;
          }

          /* Organizations */
          .oc-orgs-section {

          }

          .oc-orgs-section__title {
            font-size: 14px;
            font-weight: 600;
            color: #1E293B;
            margin: 0 0 16px;
          }

          .oc-orgs-chips {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }

          .oc-org-chip {
            padding: 8px 16px;
            background: white;
            border: 1px solid #E2E8F0;
            border-radius: 20px;
            font-size: 14px;
            color: #475569;
          }

          .oc-org-chip--more {
            color: #94A3B8;
          }
        `}</style>

        <div className="oc-discover-page">
          <NavBar />

          <main className="oc-discover-content">
            {/* Hero Section */}
            <section className="oc-hero-minimal">
              <h1 className="oc-hero-minimal__title">
                The open platform for<br />
                <span>legal knowledge</span>
              </h1>
              <p className="oc-hero-minimal__subtitle">
                Collaboratively annotate legislation, contracts, case law, and legal knowledge.
                Built by the community, for the community.
              </p>

              {/* Search */}
              <div className="oc-search-container">
                <SearchBox
                  placeholder="Search across all legal knowledge..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onSubmit={(value) => console.log('Search:', value)}
                />
              </div>

              {/* Category Tabs */}
              <div style={{ marginBottom: 48 }}>
                <FilterTabs
                  items={categories}
                  value={activeCategory}
                  onChange={setActiveCategory}
                />
              </div>
            </section>

            {/* Stats Grid */}
            <section style={{ marginBottom: 56 }}>
              <StatGrid columns={2}>
                <StatBlock value="23K+" label="Documents" sublabel="across all domains" />
                <StatBlock value="142K" label="Annotations" sublabel="community contributed" />
                <StatBlock value="1.2K" label="Contributors" sublabel="from 64 countries" />
                <StatBlock value="89" label="Organizations" sublabel="participating" />
              </StatGrid>
            </section>

            {/* Featured Collections */}
            <section style={{ marginBottom: 56 }}>
              <div className="oc-section-header">
                <h2 className="oc-section-header__title">Featured Collections</h2>
                <a href="#" className="oc-section-header__link">
                  View all
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M6.22 4.22a.75.75 0 011.06 0l3.25 3.25a.75.75 0 010 1.06l-3.25 3.25a.75.75 0 01-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 010-1.06z" />
                  </svg>
                </a>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {featuredCollections.map((collection) => (
                  <CollectionCard
                    key={collection.id}
                    type={collection.type}
                    badge={collection.badge}
                    status={collection.status}
                    title={collection.title}
                    description={collection.description}
                    stats={collection.stats}
                  />
                ))}
              </div>
            </section>

            {/* Recent Activity */}
            <section style={{ marginBottom: 56 }}>
              <div className="oc-section-header">
                <h2 className="oc-section-header__title">Recent Activity</h2>
              </div>

              <ActivityFeed
                items={recentActivity}
                viewAllUrl="#"
                viewAllText="View all activity"
              />
            </section>

            {/* Get Started */}
            <section style={{ marginBottom: 56 }}>
              <h3 className="oc-get-started__title" style={{ fontSize: 16, fontWeight: 600, color: '#1E293B', marginBottom: 16 }}>Get Started</h3>
              <ActionList
                items={getStartedItems}
                variant="card"
                onItemClick={(item) => console.log('Clicked:', item.label)}
              />
            </section>

            {/* Contributing Organizations */}
            <section className="oc-orgs-section">
              <h3 className="oc-orgs-section__title">Contributing Organizations</h3>
              <div className="oc-orgs-chips">
                {organizations.map((org) => (
                  <span key={org} className="oc-org-chip">{org}</span>
                ))}
                <span className="oc-org-chip oc-org-chip--more">+82 more</span>
              </div>
            </section>
          </main>
        </div>
      </>
    );
  },
};
