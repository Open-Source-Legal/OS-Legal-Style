import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NavBar } from '../NavBar';
import { Sidebar, SidebarHeader, SidebarNav, SidebarItem, SidebarSection, SidebarFooter } from '../Sidebar';
import { PageHeader } from '../PageHeader';
import { SearchInput } from '../SearchInput';
import { Chip } from '../Chip';
import { Button, IconButton } from '../Button';
import { Card, CardHeader, CardBody } from '../Card';
import { EmptyState } from '../EmptyState';
import { HStack, VStack, Spacer } from '../Stack';
import { Avatar, AvatarGroup } from '../Avatar';
import {
  DiscussionList,
  DiscussionItem,
  DiscussionFilters,
  DiscussionStats,
  NewDiscussionButton,
  DiscussionSortOption,
} from '../Discussion';
import {
  ThreadView,
  ThreadPost,
  ThreadReply,
  ThreadMeta,
  ThreadInput,
  ThreadAction,
  ReactionBar,
  ReactionButton,
  LinkedResource,
  ResourceList,
  Mention,
} from '../Thread';
import { ChatInput } from '../Chat';
import {
  FileSystem,
  FileSystemLayout,
  FileSystemSidebar,
  FileSystemMain,
  FolderTree,
  FileList,
  FilePathBreadcrumb,
  FileSystemToolbar,
  ToolbarButton,
  ToolbarSeparator,
  FileSystemItem,
} from '../FileSystem';

const meta: Meta = {
  title: 'Pages/CorpusDetailPage',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

// ═══════════════════════════════════════════════════════════════
// ICONS
// ═══════════════════════════════════════════════════════════════

const HomeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.25 6.75L9 1.5l6.75 5.25v8.25a1.5 1.5 0 01-1.5 1.5H3.75a1.5 1.5 0 01-1.5-1.5V6.75z" />
    <path d="M6.75 16.5V9h4.5v7.5" />
  </svg>
);

const DocumentIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.5 1.5H4.5a1.5 1.5 0 00-1.5 1.5v12a1.5 1.5 0 001.5 1.5h9a1.5 1.5 0 001.5-1.5V6L10.5 1.5z" />
    <path d="M10.5 1.5V6H15" />
  </svg>
);

const AnnotationIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 9.75v4.5a1.5 1.5 0 01-1.5 1.5h-9A1.5 1.5 0 013 14.25v-9A1.5 1.5 0 014.5 3.75h4.5" />
    <path d="M12.75 2.25l3 3-6.75 6.75H6V9l6.75-6.75z" />
  </svg>
);

const AnalysisIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15.75 15.75H2.25V2.25" />
    <path d="M5.25 12.75l3-4.5 3 3 4.5-6" />
  </svg>
);

const ExtractIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="12" height="12" rx="1.5" />
    <path d="M3 7.5h12M7.5 7.5V15" />
  </svg>
);

const DiscussionIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 11.25a1.5 1.5 0 01-1.5 1.5H5.25L2.25 15.75V4.5A1.5 1.5 0 013.75 3h9.75a1.5 1.5 0 011.5 1.5v6.75z" />
  </svg>
);

const AnalyticsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 13.5V9M9 13.5V4.5M13.5 13.5v-3" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="9" r="2.25" />
    <path d="M14.7 11.1a1.2 1.2 0 00.24 1.32l.04.04a1.455 1.455 0 11-2.06 2.06l-.04-.04a1.2 1.2 0 00-1.32-.24 1.2 1.2 0 00-.72 1.1v.11a1.455 1.455 0 01-2.91 0v-.06a1.2 1.2 0 00-.78-1.1 1.2 1.2 0 00-1.32.24l-.04.04a1.455 1.455 0 11-2.06-2.06l.04-.04a1.2 1.2 0 00.24-1.32 1.2 1.2 0 00-1.1-.72h-.11a1.455 1.455 0 010-2.91h.06a1.2 1.2 0 001.1-.78 1.2 1.2 0 00-.24-1.32l-.04-.04a1.455 1.455 0 112.06-2.06l.04.04a1.2 1.2 0 001.32.24h.06a1.2 1.2 0 00.72-1.1v-.11a1.455 1.455 0 012.91 0v.06a1.2 1.2 0 00.72 1.1 1.2 1.2 0 001.32-.24l.04-.04a1.455 1.455 0 112.06 2.06l-.04.04a1.2 1.2 0 00-.24 1.32v.06a1.2 1.2 0 001.1.72h.11a1.455 1.455 0 010 2.91h-.06a1.2 1.2 0 00-1.1.72z" />
  </svg>
);

const BadgeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 11.25a3 3 0 100-6 3 3 0 000 6z" />
    <path d="M13.05 12.3l.45 4.2-4.5-2.4-4.5 2.4.45-4.2M9 1.5l1.65 3.45L14.25 5.4l-2.7 2.55.6 3.45L9 9.75 5.85 11.4l.6-3.45-2.7-2.55 3.6-.45L9 1.5z" />
  </svg>
);

const CollapseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11.25 6.75L6.75 11.25M6.75 6.75l4.5 4.5" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11.25 13.5L6.75 9l4.5-4.5" />
  </svg>
);

const PlusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M9 3.75v10.5M3.75 9h10.5" />
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

const MessageIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 11.25a1.5 1.5 0 01-1.5 1.5H5.25L2.25 15.75V4.5A1.5 1.5 0 013.75 3h9.75a1.5 1.5 0 011.5 1.5v6.75z" />
    <path d="M6 7.5h6M6 10.5h3" />
  </svg>
);

const MenuIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M3 4.5h12M3 9h12M3 13.5h12" />
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
// PAGE STYLES
// ═══════════════════════════════════════════════════════════════

const pageStyles = `
  .corpus-page {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background: var(--oc-bg-canvas, #FAFAFA);
    font-family: var(--oc-font-family, 'Inter', -apple-system, BlinkMacSystemFont, sans-serif);
  }

  .corpus-layout {
    display: flex;
    flex: 1;
    overflow: hidden;
  }

  /* Corpus Sidebar */
  .corpus-sidebar {
    width: 280px;
    min-width: 280px;
    background: var(--oc-bg-surface, white);
    border-right: 1px solid var(--oc-border-default, #E2E8F0);
    display: flex;
    flex-direction: column;
    transition: width 0.2s ease, min-width 0.2s ease;
  }

  .corpus-sidebar--collapsed {
    width: 72px;
    min-width: 72px;
  }

  .corpus-sidebar__header {
    padding: 20px;
    border-bottom: 1px solid var(--oc-border-default, #E2E8F0);
  }

  .corpus-sidebar__header-row {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
  }

  .corpus-sidebar__meta {
    flex: 1;
    min-width: 0;
  }

  .corpus-sidebar__label {
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--oc-fg-tertiary, #94A3B8);
    margin-bottom: 4px;
  }

  .corpus-sidebar__title {
    font-size: 15px;
    font-weight: 600;
    color: var(--oc-fg-primary, #1E293B);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .corpus-sidebar__collapse {
    flex-shrink: 0;
  }

  .corpus-sidebar__nav {
    flex: 1;
    overflow-y: auto;
    padding: 12px 0;
  }

  .corpus-sidebar__footer {
    padding: 16px 20px;
    border-top: 1px solid var(--oc-border-default, #E2E8F0);
  }

  /* Main Content */
  .corpus-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .corpus-main__header {
    padding: 0 32px;
    background: var(--oc-bg-surface, white);
    border-bottom: 1px solid var(--oc-border-default, #E2E8F0);
  }

  .corpus-main__search {
    padding: 16px 32px;
    background: var(--oc-bg-surface, white);
    border-bottom: 1px solid var(--oc-border-default, #E2E8F0);
  }

  .corpus-main__content {
    flex: 1;
    overflow-y: auto;
    padding: 32px;
  }

  .corpus-main__inner {
    max-width: 1000px;
    margin: 0 auto;
  }

  /* Badge in sidebar item */
  .sidebar-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 20px;
    height: 20px;
    padding: 0 6px;
    background: var(--oc-bg-surface-hover, #F1F5F9);
    border-radius: 10px;
    font-size: 11px;
    font-weight: 600;
    color: var(--oc-fg-secondary, #475569);
  }

  .sidebar-badge--active {
    background: var(--oc-accent, #0F766E);
    color: white;
  }

  /* Empty discussions styling */
  .empty-discussions {
    text-align: center;
    padding: 48px 24px;
  }

  .empty-discussions__icon {
    width: 64px;
    height: 64px;
    margin: 0 auto 16px;
    color: var(--oc-fg-tertiary, #94A3B8);
  }

  .empty-discussions__title {
    font-size: 18px;
    font-weight: 600;
    color: var(--oc-fg-primary, #1E293B);
    margin: 0 0 8px;
  }

  .empty-discussions__description {
    font-size: 14px;
    color: var(--oc-fg-secondary, #475569);
    margin: 0 0 24px;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
  }

  /* Header row with mobile toggle */
  .corpus-header-row {
    display: flex;
    align-items: flex-start;
    gap: 12px;
  }

  .corpus-header-row .oc-page-header {
    flex: 1;
    min-width: 0;
  }

  /* Mobile menu toggle button */
  .corpus-mobile-toggle {
    display: none;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    padding: 0;
    background: var(--oc-bg-surface, white);
    border: 1px solid var(--oc-border-default, #E2E8F0);
    border-radius: 8px;
    color: var(--oc-fg-secondary, #475569);
    cursor: pointer;
    flex-shrink: 0;
    margin-top: 4px;
  }

  .corpus-mobile-toggle:hover {
    background: var(--oc-bg-surface-hover, #F1F5F9);
    border-color: var(--oc-border-strong, #CBD5E1);
  }

  /* Mobile sidebar backdrop */
  .corpus-sidebar-backdrop {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 40;
  }

  .corpus-sidebar-backdrop--visible {
    display: block;
  }

  @media (max-width: 900px) {
    .corpus-mobile-toggle {
      display: flex;
    }

    .corpus-sidebar {
      position: fixed;
      z-index: 50;
      left: 0;
      top: 0;
      bottom: 0;
      box-shadow: var(--oc-shadow-xl, 0 8px 16px rgba(15, 23, 42, 0.06), 0 20px 25px rgba(15, 23, 42, 0.05));
      transform: translateX(-100%);
      transition: transform 0.25s ease;
    }

    .corpus-sidebar--open {
      transform: translateX(0);
    }

    .corpus-sidebar--collapsed {
      width: 280px;
      min-width: 280px;
    }

    .corpus-main__header,
    .corpus-main__search,
    .corpus-main__content {
      padding-left: 16px;
      padding-right: 16px;
    }

    .corpus-main__header {
      padding-top: 12px;
      padding-bottom: 12px;
    }

    .corpus-main__search {
      padding-top: 12px;
      padding-bottom: 12px;
    }

    .corpus-main__content {
      padding-top: 16px;
      padding-bottom: 16px;
    }

    /* Stack header row vertically on mobile */
    .corpus-header-row {
      flex-direction: column;
      align-items: stretch;
      gap: 8px;
    }

    .corpus-mobile-toggle {
      width: 40px;
      margin-top: 0;
    }

    /* Stack PageHeader title and actions */
    .corpus-header-row .oc-page-header__row {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
    }

    /* Hide header actions on mobile - empty state has the CTA */
    .corpus-header-row .oc-page-header__actions {
      display: none;
    }

    /* Compact empty state */
    .corpus-main__inner .oc-card {
      padding: 0;
    }

    .corpus-main__inner .oc-empty-state {
      padding: 32px 16px;
    }
  }

  @media (max-width: 600px) {
    .corpus-sidebar {
      width: 100%;
      min-width: 100%;
      max-width: 320px;
    }

    .corpus-main__content {
      padding: 12px;
    }
  }
`;

// ═══════════════════════════════════════════════════════════════
// STORY
// ═══════════════════════════════════════════════════════════════

export const Default: StoryObj = {
  render: () => {
    const [activeNav, setActiveNav] = useState('corpuses');
    const [activeSidebarItem, setActiveSidebarItem] = useState('discussions');
    const [searchValue, setSearchValue] = useState('');
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    const sidebarItems = [
      { id: 'home', icon: <HomeIcon />, label: 'Home' },
      { id: 'documents', icon: <DocumentIcon />, label: 'Documents', badge: 3 },
      { id: 'annotations', icon: <AnnotationIcon />, label: 'Annotations', badge: 2 },
      { id: 'analyses', icon: <AnalysisIcon />, label: 'Analyses' },
      { id: 'extracts', icon: <ExtractIcon />, label: 'Extracts' },
      { id: 'discussions', icon: <DiscussionIcon />, label: 'Discussions', badge: 1, active: true },
      { id: 'analytics', icon: <AnalyticsIcon />, label: 'Analytics' },
      { id: 'settings', icon: <SettingsIcon />, label: 'Settings' },
      { id: 'badges', icon: <BadgeIcon />, label: 'Badges' },
    ];

    return (
      <>
        <style>{pageStyles}</style>
        <div className="corpus-page">
          {/* Top Navigation */}
          <NavBar
            brandName="Open Contracts"
            version="v3.0.0b3"
            items={navItems}
            activeId={activeNav}
            onNavigate={setActiveNav}
            userName="John Scrudato"
            userMenuItems={userMenuItems}
          />

          <div className="corpus-layout">
            {/* Mobile Sidebar Backdrop */}
            <div
              className={`corpus-sidebar-backdrop ${mobileSidebarOpen ? 'corpus-sidebar-backdrop--visible' : ''}`}
              onClick={() => setMobileSidebarOpen(false)}
            />

            {/* Corpus Sidebar */}
            <aside className={[
              'corpus-sidebar',
              sidebarCollapsed && 'corpus-sidebar--collapsed',
              mobileSidebarOpen && 'corpus-sidebar--open',
            ].filter(Boolean).join(' ')}>
              <div className="corpus-sidebar__header">
                <div className="corpus-sidebar__header-row">
                  {!sidebarCollapsed && (
                    <div className="corpus-sidebar__meta">
                      <div className="corpus-sidebar__label">Corpus</div>
                      <div className="corpus-sidebar__title">My First Corpus</div>
                    </div>
                  )}
                  <IconButton
                    aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                    variant="ghost"
                    size="sm"
                    className="corpus-sidebar__collapse"
                    onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  >
                    <ChevronLeftIcon />
                  </IconButton>
                </div>
              </div>

              <nav className="corpus-sidebar__nav">
                <Sidebar
                  collapsed={sidebarCollapsed}
                  activeId={activeSidebarItem}
                  onNavigate={setActiveSidebarItem}
                >
                  <SidebarNav>
                    {sidebarItems.map((item) => (
                      <SidebarItem
                        key={item.id}
                        id={item.id}
                        icon={item.icon}
                        label={item.label}
                        badge={
                          item.badge ? (
                            <span
                              className={`sidebar-badge ${
                                activeSidebarItem === item.id ? 'sidebar-badge--active' : ''
                              }`}
                            >
                              {item.badge}
                            </span>
                          ) : undefined
                        }
                      />
                    ))}
                  </SidebarNav>
                </Sidebar>
              </nav>

              {!sidebarCollapsed && (
                <div className="corpus-sidebar__footer">
                  <Button variant="secondary" size="sm" fullWidth leftIcon={<PlusIcon />}>
                    Add Document
                  </Button>
                </div>
              )}
            </aside>

            {/* Main Content */}
            <main className="corpus-main">
              {/* Page Header with Breadcrumbs */}
              <div className="corpus-main__header">
                <div className="corpus-header-row">
                  <button
                    className="corpus-mobile-toggle"
                    onClick={() => setMobileSidebarOpen(true)}
                    aria-label="Open sidebar"
                  >
                    <MenuIcon />
                  </button>
                  <PageHeader
                    title="Discussions"
                    subtitle="Community conversations about this corpus"
                    breadcrumbs={[
                      { label: 'Corpuses', href: '#' },
                      { label: 'My First Corpus' },
                    ]}
                    actions={
                      <Button variant="primary" size="sm" leftIcon={<PlusIcon />}>
                        New Discussion
                      </Button>
                    }
                  />
                </div>
              </div>

              {/* Search */}
              <div className="corpus-main__search">
                <SearchInput
                  placeholder="Search discussions..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  fullWidth
                />
              </div>

              {/* Content Area */}
              <div className="corpus-main__content">
                <div className="corpus-main__inner">
                  <Card>
                    <CardBody>
                      <EmptyState
                        icon={<MessageIcon />}
                        title="No discussions yet"
                        description="Start a conversation about documents, annotations, or legal interpretations in this corpus."
                        size="lg"
                        action={
                          <Button variant="primary" leftIcon={<PlusIcon />}>
                            Start a Discussion
                          </Button>
                        }
                      />
                    </CardBody>
                  </Card>
                </div>
              </div>
            </main>
          </div>
        </div>
      </>
    );
  },
};

export const WithContent: StoryObj = {
  render: () => {
    const [activeNav, setActiveNav] = useState('corpuses');
    const [activeSidebarItem, setActiveSidebarItem] = useState('documents');
    const [searchValue, setSearchValue] = useState('');
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    const sidebarItems = [
      { id: 'home', icon: <HomeIcon />, label: 'Home' },
      { id: 'documents', icon: <DocumentIcon />, label: 'Documents', badge: 3 },
      { id: 'annotations', icon: <AnnotationIcon />, label: 'Annotations', badge: 2 },
      { id: 'analyses', icon: <AnalysisIcon />, label: 'Analyses' },
      { id: 'extracts', icon: <ExtractIcon />, label: 'Extracts' },
      { id: 'discussions', icon: <DiscussionIcon />, label: 'Discussions', badge: 1 },
      { id: 'analytics', icon: <AnalyticsIcon />, label: 'Analytics' },
      { id: 'settings', icon: <SettingsIcon />, label: 'Settings' },
      { id: 'badges', icon: <BadgeIcon />, label: 'Badges' },
    ];

    const documents = [
      { id: 1, name: 'Master Services Agreement.pdf', type: 'PDF', pages: 24, uploaded: '2 days ago' },
      { id: 2, name: 'NDA Template.docx', type: 'DOCX', pages: 8, uploaded: '1 week ago' },
      { id: 3, name: 'Employment Contract.pdf', type: 'PDF', pages: 12, uploaded: '2 weeks ago' },
    ];

    return (
      <>
        <style>{pageStyles}</style>
        <style>{`
          .doc-list {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }

          .doc-card {
            display: flex;
            align-items: center;
            gap: 16px;
            padding: 16px;
            background: var(--oc-bg-surface, white);
            border: 1px solid var(--oc-border-default, #E2E8F0);
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.15s ease;
          }

          .doc-card:hover {
            border-color: var(--oc-border-strong, #CBD5E1);
            box-shadow: var(--oc-shadow-sm);
          }

          .doc-card__icon {
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #FEF2F2;
            border-radius: 8px;
            color: #DC2626;
          }

          .doc-card__icon--docx {
            background: #EFF6FF;
            color: #2563EB;
          }

          .doc-card__content {
            flex: 1;
            min-width: 0;
          }

          .doc-card__name {
            font-size: 14px;
            font-weight: 500;
            color: var(--oc-fg-primary, #1E293B);
            margin: 0 0 4px;
          }

          .doc-card__meta {
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 13px;
            color: var(--oc-fg-tertiary, #94A3B8);
          }
        `}</style>
        <div className="corpus-page">
          <NavBar
            brandName="Open Contracts"
            version="v3.0.0b3"
            items={navItems}
            activeId={activeNav}
            onNavigate={setActiveNav}
            userName="John Scrudato"
            userMenuItems={userMenuItems}
          />

          <div className="corpus-layout">
            {/* Mobile Sidebar Backdrop */}
            <div
              className={`corpus-sidebar-backdrop ${mobileSidebarOpen ? 'corpus-sidebar-backdrop--visible' : ''}`}
              onClick={() => setMobileSidebarOpen(false)}
            />

            <aside className={`corpus-sidebar ${mobileSidebarOpen ? 'corpus-sidebar--open' : ''}`}>
              <div className="corpus-sidebar__header">
                <div className="corpus-sidebar__header-row">
                  <div className="corpus-sidebar__meta">
                    <div className="corpus-sidebar__label">Corpus</div>
                    <div className="corpus-sidebar__title">My First Corpus</div>
                  </div>
                  <IconButton
                    aria-label="Collapse sidebar"
                    variant="ghost"
                    size="sm"
                    className="corpus-sidebar__collapse"
                  >
                    <ChevronLeftIcon />
                  </IconButton>
                </div>
              </div>

              <nav className="corpus-sidebar__nav">
                <Sidebar activeId={activeSidebarItem} onNavigate={setActiveSidebarItem}>
                  <SidebarNav>
                    {sidebarItems.map((item) => (
                      <SidebarItem
                        key={item.id}
                        id={item.id}
                        icon={item.icon}
                        label={item.label}
                        badge={
                          item.badge ? (
                            <span
                              className={`sidebar-badge ${
                                activeSidebarItem === item.id ? 'sidebar-badge--active' : ''
                              }`}
                            >
                              {item.badge}
                            </span>
                          ) : undefined
                        }
                      />
                    ))}
                  </SidebarNav>
                </Sidebar>
              </nav>

              <div className="corpus-sidebar__footer">
                <Button variant="secondary" size="sm" fullWidth leftIcon={<PlusIcon />}>
                  Add Document
                </Button>
              </div>
            </aside>

            <main className="corpus-main">
              <div className="corpus-main__header">
                <div className="corpus-header-row">
                  <button
                    className="corpus-mobile-toggle"
                    onClick={() => setMobileSidebarOpen(true)}
                    aria-label="Open sidebar"
                  >
                    <MenuIcon />
                  </button>
                  <PageHeader
                    title="Documents"
                    subtitle="3 documents in this corpus"
                    breadcrumbs={[
                      { label: 'Corpuses', href: '#' },
                      { label: 'My First Corpus' },
                    ]}
                    actions={
                      <HStack gap="sm">
                        <Button variant="ghost" size="sm">
                          Export
                        </Button>
                        <Button variant="primary" size="sm" leftIcon={<PlusIcon />}>
                          Upload
                        </Button>
                      </HStack>
                    }
                  />
                </div>
              </div>

              <div className="corpus-main__search">
                <SearchInput
                  placeholder="Search documents..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  fullWidth
                />
              </div>

              <div className="corpus-main__content">
                <div className="corpus-main__inner">
                  <div className="doc-list">
                    {documents.map((doc) => (
                      <div key={doc.id} className="doc-card">
                        <div className={`doc-card__icon ${doc.type === 'DOCX' ? 'doc-card__icon--docx' : ''}`}>
                          <DocumentIcon />
                        </div>
                        <div className="doc-card__content">
                          <div className="doc-card__name">{doc.name}</div>
                          <div className="doc-card__meta">
                            <span>{doc.type}</span>
                            <span>{doc.pages} pages</span>
                            <span>Uploaded {doc.uploaded}</span>
                          </div>
                        </div>
                        <Chip size="sm" variant="soft" color="success">
                          Processed
                        </Chip>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </>
    );
  },
};

// Sample discussions for the forum
const sampleDiscussions = [
  {
    id: '1',
    title: 'Question about Section 4.2 - Indemnification Clause scope',
    author: {
      name: 'Sarah Chen',
      avatar: <Avatar fallback="SC" size="sm" />,
      badge: 'Attorney',
    },
    category: 'question' as const,
    status: 'open' as const,
    preview: 'I\'m reviewing the indemnification clause and have concerns about the scope of coverage. Can someone clarify if we intended to cover third-party IP claims?',
    tags: ['contract-review', 'urgent'],
    replyCount: 12,
    viewCount: 234,
    voteCount: 8,
    participants: (
      <AvatarGroup max={3} size="xs">
        <Avatar fallback="SC" />
        <Avatar fallback="MJ" />
        <Avatar fallback="AR" />
        <Avatar fallback="ED" />
      </AvatarGroup>
    ),
    createdAt: '2 hours ago',
    lastActivity: '15 min ago',
  },
  {
    id: '2',
    title: 'Best practices for annotating liability caps',
    author: {
      name: 'Mike Johnson',
      avatar: <Avatar fallback="MJ" size="sm" />,
    },
    category: 'idea' as const,
    status: 'answered' as const,
    preview: 'I\'ve compiled a list of best practices based on our recent contract reviews. Sharing for team knowledge.',
    tags: ['best-practices', 'annotations'],
    replyCount: 8,
    viewCount: 156,
    voteCount: 15,
    hasVoted: true,
    createdAt: 'Dec 26',
    lastActivity: '1 day ago',
  },
  {
    id: '3',
    title: 'Help: Extracting metadata from legacy PDF contracts',
    author: {
      name: 'Alex Rivera',
      avatar: <Avatar fallback="AR" size="sm" />,
    },
    category: 'help' as const,
    preview: 'We have some legacy contracts in this corpus that need metadata extraction. Any suggestions?',
    replyCount: 3,
    viewCount: 45,
    voteCount: 2,
    createdAt: 'Dec 22',
    lastActivity: '3 days ago',
  },
];

const discussionCategories = [
  { id: 'all', label: 'All', count: 3 },
  { id: 'question', label: 'Questions', count: 1 },
  { id: 'idea', label: 'Ideas', count: 1 },
  { id: 'help', label: 'Help', count: 1 },
];

const discussionSortOptions = [
  { id: 'recentActivity' as const, label: 'Recent Activity' },
  { id: 'newest' as const, label: 'Newest' },
  { id: 'mostReplies' as const, label: 'Most Replies' },
];

export const WithDiscussions: StoryObj = {
  name: 'With Discussion Forum',
  render: () => {
    const [activeNav, setActiveNav] = useState('corpuses');
    const [activeSidebarItem, setActiveSidebarItem] = useState('discussions');
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState('all');
    const [activeSort, setActiveSort] = useState<DiscussionSortOption>('recentActivity');
    const [searchValue, setSearchValue] = useState('');

    const sidebarItems = [
      { id: 'home', icon: <HomeIcon />, label: 'Home' },
      { id: 'documents', icon: <DocumentIcon />, label: 'Documents', badge: 3 },
      { id: 'annotations', icon: <AnnotationIcon />, label: 'Annotations', badge: 2 },
      { id: 'analyses', icon: <AnalysisIcon />, label: 'Analyses' },
      { id: 'extracts', icon: <ExtractIcon />, label: 'Extracts' },
      { id: 'discussions', icon: <DiscussionIcon />, label: 'Discussions', badge: 3 },
      { id: 'analytics', icon: <AnalyticsIcon />, label: 'Analytics' },
      { id: 'settings', icon: <SettingsIcon />, label: 'Settings' },
      { id: 'badges', icon: <BadgeIcon />, label: 'Badges' },
    ];

    const filteredDiscussions = activeCategory === 'all'
      ? sampleDiscussions
      : sampleDiscussions.filter(d => d.category === activeCategory);

    return (
      <>
        <style>{pageStyles}</style>
        <div className="corpus-page">
          <NavBar
            brandName="Open Contracts"
            version="v3.0.0b3"
            items={navItems}
            activeId={activeNav}
            onNavigate={setActiveNav}
            userName="John Scrudato"
            userMenuItems={userMenuItems}
          />

          <div className="corpus-layout">
            {/* Mobile Sidebar Backdrop */}
            <div
              className={`corpus-sidebar-backdrop ${mobileSidebarOpen ? 'corpus-sidebar-backdrop--visible' : ''}`}
              onClick={() => setMobileSidebarOpen(false)}
            />

            <aside className={`corpus-sidebar ${mobileSidebarOpen ? 'corpus-sidebar--open' : ''}`}>
              <div className="corpus-sidebar__header">
                <div className="corpus-sidebar__header-row">
                  <div className="corpus-sidebar__meta">
                    <div className="corpus-sidebar__label">Corpus</div>
                    <div className="corpus-sidebar__title">My First Corpus</div>
                  </div>
                  <IconButton
                    aria-label="Collapse sidebar"
                    variant="ghost"
                    size="sm"
                    className="corpus-sidebar__collapse"
                  >
                    <ChevronLeftIcon />
                  </IconButton>
                </div>
              </div>

              <nav className="corpus-sidebar__nav">
                <Sidebar activeId={activeSidebarItem} onNavigate={setActiveSidebarItem}>
                  <SidebarNav>
                    {sidebarItems.map((item) => (
                      <SidebarItem
                        key={item.id}
                        id={item.id}
                        icon={item.icon}
                        label={item.label}
                        badge={
                          item.badge ? (
                            <span
                              className={`sidebar-badge ${
                                activeSidebarItem === item.id ? 'sidebar-badge--active' : ''
                              }`}
                            >
                              {item.badge}
                            </span>
                          ) : undefined
                        }
                      />
                    ))}
                  </SidebarNav>
                </Sidebar>
              </nav>

              <div className="corpus-sidebar__footer">
                <Button variant="secondary" size="sm" fullWidth leftIcon={<PlusIcon />}>
                  Add Document
                </Button>
              </div>
            </aside>

            <main className="corpus-main">
              <div className="corpus-main__header">
                <div className="corpus-header-row">
                  <button
                    className="corpus-mobile-toggle"
                    onClick={() => setMobileSidebarOpen(true)}
                    aria-label="Open sidebar"
                  >
                    <MenuIcon />
                  </button>
                  <PageHeader
                    title="Discussions"
                    subtitle="Community conversations about this corpus"
                    breadcrumbs={[
                      { label: 'Corpuses', href: '#' },
                      { label: 'My First Corpus' },
                    ]}
                    actions={
                      <NewDiscussionButton>
                        New Discussion
                      </NewDiscussionButton>
                    }
                  />
                </div>
              </div>

              <div className="corpus-main__content">
                <div className="corpus-main__inner">
                  <DiscussionStats
                    totalCount={3}
                    openCount={2}
                    answeredCount={1}
                    participantCount={4}
                  />

                  <DiscussionFilters
                    categories={discussionCategories}
                    activeCategory={activeCategory}
                    onCategoryChange={setActiveCategory}
                    sortOptions={discussionSortOptions}
                    activeSort={activeSort}
                    onSortChange={setActiveSort}
                    searchValue={searchValue}
                    onSearchChange={setSearchValue}
                    searchPlaceholder="Search discussions..."
                  />

                  <DiscussionList onItemClick={(id) => console.log('Navigate to:', id)}>
                    {filteredDiscussions.map((discussion) => (
                      <DiscussionItem
                        key={discussion.id}
                        {...discussion}
                        onVote={() => console.log('Vote:', discussion.id)}
                      />
                    ))}
                  </DiscussionList>
                </div>
              </div>
            </main>
          </div>
        </div>
      </>
    );
  },
};

// Icons for thread actions
const ReplyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
    <path d="M4 3a2 2 0 00-2 2v4a2 2 0 002 2h1v2l3-2h2a2 2 0 002-2V5a2 2 0 00-2-2H4z" />
  </svg>
);

const QuoteIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
    <path d="M3.5 4A1.5 1.5 0 002 5.5v2A1.5 1.5 0 003.5 9H4v1.5a.5.5 0 001 0V9h.5A1.5 1.5 0 007 7.5v-2A1.5 1.5 0 005.5 4h-2zm5 0A1.5 1.5 0 007 5.5v2A1.5 1.5 0 008.5 9H9v1.5a.5.5 0 001 0V9h.5a1.5 1.5 0 001.5-1.5v-2A1.5 1.5 0 0010.5 4h-2z" />
  </svg>
);

const BookmarkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
    <path d="M3 2.5A1.5 1.5 0 014.5 1h5A1.5 1.5 0 0111 2.5v10a.5.5 0 01-.765.424L7 10.882l-3.235 2.042A.5.5 0 013 12.5v-10z" />
  </svg>
);

const ShareIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
    <path d="M11 3a2 2 0 11-1.668 3.104L6.2 7.771a2 2 0 110-1.542l3.132-1.667A2 2 0 0111 3z" />
  </svg>
);

const BackIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 010 .708L5.707 8l5.647 5.646a.5.5 0 01-.708.708l-6-6a.5.5 0 010-.708l6-6a.5.5 0 01.708 0z" clipRule="evenodd" />
  </svg>
);

export const DiscussionDetail: StoryObj = {
  name: 'Discussion Detail (Selected Thread)',
  render: () => {
    const [activeNav, setActiveNav] = useState('corpuses');
    const [activeSidebarItem, setActiveSidebarItem] = useState('discussions');
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    const sidebarItems = [
      { id: 'home', icon: <HomeIcon />, label: 'Home' },
      { id: 'documents', icon: <DocumentIcon />, label: 'Documents', badge: 3 },
      { id: 'annotations', icon: <AnnotationIcon />, label: 'Annotations', badge: 2 },
      { id: 'analyses', icon: <AnalysisIcon />, label: 'Analyses' },
      { id: 'extracts', icon: <ExtractIcon />, label: 'Extracts' },
      { id: 'discussions', icon: <DiscussionIcon />, label: 'Discussions', badge: 3 },
      { id: 'analytics', icon: <AnalyticsIcon />, label: 'Analytics' },
      { id: 'settings', icon: <SettingsIcon />, label: 'Settings' },
      { id: 'badges', icon: <BadgeIcon />, label: 'Badges' },
    ];

    return (
      <>
        <style>{pageStyles}</style>
        <style>{`
          .back-button {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 6px 12px;
            font-size: 13px;
            font-weight: 500;
            color: var(--oc-fg-secondary, #475569);
            background: transparent;
            border: 1px solid var(--oc-border-default, #E2E8F0);
            border-radius: var(--oc-radius-md, 8px);
            cursor: pointer;
            transition: all 0.15s ease;
          }
          .back-button:hover {
            background: var(--oc-bg-surface-hover, #F1F5F9);
            border-color: var(--oc-border-strong, #CBD5E1);
          }
          .thread-container {
            background: var(--oc-bg-surface, white);
            border: 1px solid var(--oc-border-default, #E2E8F0);
            border-radius: var(--oc-radius-lg, 12px);
            overflow: hidden;
          }
          .thread-actions-bar {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 12px 20px;
            border-bottom: 1px solid var(--oc-border-default, #E2E8F0);
            background: var(--oc-bg-canvas, #FAFAFA);
          }
          .thread-actions-bar__spacer {
            flex: 1;
          }
          .thread-action-btn {
            display: inline-flex;
            align-items: center;
            gap: 5px;
            padding: 6px 10px;
            font-size: 13px;
            font-weight: 500;
            color: var(--oc-fg-secondary, #475569);
            background: transparent;
            border: none;
            border-radius: var(--oc-radius-md, 8px);
            cursor: pointer;
            transition: all 0.15s ease;
          }
          .thread-action-btn:hover {
            background: var(--oc-bg-surface-hover, #F1F5F9);
            color: var(--oc-fg-primary, #1E293B);
          }
          .thread-action-btn--primary {
            background: var(--oc-accent, #0F766E);
            color: white;
          }
          .thread-action-btn--primary:hover {
            background: var(--oc-accent-hover, #0D9488);
            color: white;
          }
          .category-pill {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            padding: 4px 10px;
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.02em;
            color: var(--oc-info, #0891B2);
            background: rgba(8, 145, 178, 0.1);
            border-radius: var(--oc-radius-full, 9999px);
          }
        `}</style>
        <div className="corpus-page">
          <NavBar
            brandName="Open Contracts"
            version="v3.0.0b3"
            items={navItems}
            activeId={activeNav}
            onNavigate={setActiveNav}
            userName="John Scrudato"
            userMenuItems={userMenuItems}
          />

          <div className="corpus-layout">
            {/* Mobile Sidebar Backdrop */}
            <div
              className={`corpus-sidebar-backdrop ${mobileSidebarOpen ? 'corpus-sidebar-backdrop--visible' : ''}`}
              onClick={() => setMobileSidebarOpen(false)}
            />

            <aside className={`corpus-sidebar ${mobileSidebarOpen ? 'corpus-sidebar--open' : ''}`}>
              <div className="corpus-sidebar__header">
                <div className="corpus-sidebar__header-row">
                  <div className="corpus-sidebar__meta">
                    <div className="corpus-sidebar__label">Corpus</div>
                    <div className="corpus-sidebar__title">My First Corpus</div>
                  </div>
                  <IconButton
                    aria-label="Collapse sidebar"
                    variant="ghost"
                    size="sm"
                    className="corpus-sidebar__collapse"
                  >
                    <ChevronLeftIcon />
                  </IconButton>
                </div>
              </div>

              <nav className="corpus-sidebar__nav">
                <Sidebar activeId={activeSidebarItem} onNavigate={setActiveSidebarItem}>
                  <SidebarNav>
                    {sidebarItems.map((item) => (
                      <SidebarItem
                        key={item.id}
                        id={item.id}
                        icon={item.icon}
                        label={item.label}
                        badge={
                          item.badge ? (
                            <span
                              className={`sidebar-badge ${
                                activeSidebarItem === item.id ? 'sidebar-badge--active' : ''
                              }`}
                            >
                              {item.badge}
                            </span>
                          ) : undefined
                        }
                      />
                    ))}
                  </SidebarNav>
                </Sidebar>
              </nav>

              <div className="corpus-sidebar__footer">
                <Button variant="secondary" size="sm" fullWidth leftIcon={<PlusIcon />}>
                  Add Document
                </Button>
              </div>
            </aside>

            <main className="corpus-main">
              <div className="corpus-main__header">
                <div className="corpus-header-row">
                  <button
                    className="corpus-mobile-toggle"
                    onClick={() => setMobileSidebarOpen(true)}
                    aria-label="Open sidebar"
                  >
                    <MenuIcon />
                  </button>
                  <PageHeader
                    title="Question about Section 4.2 - Indemnification Clause scope"
                    breadcrumbs={[
                      { label: 'Corpuses', href: '#' },
                      { label: 'My First Corpus', href: '#' },
                      { label: 'Discussions', href: '#' },
                      { label: 'Thread' },
                    ]}
                    actions={
                      <button className="back-button">
                        <BackIcon />
                        Back to Discussions
                      </button>
                    }
                  />
                </div>
              </div>

              <div className="corpus-main__content">
                <div className="corpus-main__inner">
                  <div className="thread-container">
                    {/* Thread action bar */}
                    <div className="thread-actions-bar">
                      <span className="category-pill">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                          <path d="M6 1a5 5 0 100 10A5 5 0 006 1zM0 6a6 6 0 1112 0A6 6 0 010 6zm6-2.5a1 1 0 00-.867.5.5.5 0 11-.866-.5A2 2 0 118 5c0 .734-.432 1.132-.774 1.39a2.16 2.16 0 01-.226.155V7a.5.5 0 01-1 0v-.75a.5.5 0 01.5-.5c.286 0 .516-.099.696-.232.175-.13.304-.293.304-.518a1 1 0 00-1.5-.866zM6 9a.5.5 0 100-1 .5.5 0 000 1z" />
                        </svg>
                        Question
                      </span>
                      <Chip size="sm" variant="soft" color="warning">urgent</Chip>
                      <Chip size="sm" variant="soft" color="default">contract-review</Chip>
                      <div className="thread-actions-bar__spacer" />
                      <button className="thread-action-btn">
                        <BookmarkIcon />
                        Bookmark
                      </button>
                      <button className="thread-action-btn">
                        <ShareIcon />
                        Share
                      </button>
                    </div>

                    <ThreadView>
                      <ThreadMeta
                        views={234}
                        replies={12}
                        participants={
                          <AvatarGroup max={4} size="xs">
                            <Avatar fallback="SC" />
                            <Avatar fallback="MJ" />
                            <Avatar fallback="AR" />
                            <Avatar fallback="ED" />
                          </AvatarGroup>
                        }
                        lastActivity="15 minutes ago"
                      />

                      {/* Original post */}
                      <ThreadPost
                        isRoot
                        avatar={<Avatar fallback="SC" size="md" />}
                        author="Sarah Chen"
                        authorBadge="Attorney"
                        timestamp="Dec 30, 2024 at 2:15 PM"
                        replyCount={12}
                        resources={
                          <ResourceList label="Linked Resources">
                            <LinkedResource
                              type="document"
                              title="Master Services Agreement"
                              reference="Section 4.2"
                              onClick={() => {}}
                            />
                            <LinkedResource
                              type="annotation"
                              title="Indemnification review note"
                              onClick={() => {}}
                            />
                          </ResourceList>
                        }
                        reactions={
                          <ReactionBar onAddReaction={() => {}}>
                            <ReactionButton reaction="thumbsUp" count={8} active />
                            <ReactionButton reaction="thinking" count={3} />
                          </ReactionBar>
                        }
                        actions={
                          <>
                            <ThreadAction icon={<ReplyIcon />} label="Reply" />
                            <ThreadAction icon={<QuoteIcon />} label="Quote" />
                            <ThreadAction icon={<BookmarkIcon />} label="Bookmark" />
                          </>
                        }
                      >
                        <p>
                          I'm reviewing the indemnification clause in <Mention name="Mike Johnson" />'s latest draft
                          and I have some concerns about the scope of coverage. The current language seems overly broad.
                        </p>
                        <p>
                          Can someone clarify if we intended to cover third-party IP claims here? I think we need to
                          narrow this down before sending to the client.
                        </p>
                        <p>
                          Specifically, I'm concerned about:
                        </p>
                        <ul style={{ margin: '8px 0', paddingLeft: '20px', color: '#1E293B' }}>
                          <li>The unlimited scope of "any and all claims"</li>
                          <li>No carve-out for pre-existing IP</li>
                          <li>Missing cap on indemnification liability</li>
                        </ul>
                      </ThreadPost>

                      {/* Reply 1 */}
                      <ThreadReply
                        id="reply-1"
                        avatar={<Avatar fallback="MJ" size="md" />}
                        author="Mike Johnson"
                        authorBadge="Paralegal"
                        timestamp="Dec 30, 2:45 PM"
                        reactions={
                          <ReactionBar>
                            <ReactionButton reaction="thumbsUp" count={5} />
                          </ReactionBar>
                        }
                        actions={
                          <>
                            <ThreadAction icon={<ReplyIcon />} label="Reply" />
                            <ThreadAction icon={<QuoteIcon />} label="Quote" />
                          </>
                        }
                        replies={
                          <>
                            {/* Nested reply 1-1 */}
                            <ThreadReply
                              id="reply-1-1"
                              avatar={<Avatar fallback="AR" size="sm" />}
                              author="Alex Rivera"
                              timestamp="Dec 30, 3:00 PM"
                              actions={
                                <>
                                  <ThreadAction icon={<ReplyIcon />} label="Reply" />
                                </>
                              }
                            >
                              <p>
                                Agreed with Mike. The carve-out language from the prior deal worked well.
                                <Mention name="Emma Davis" /> might have that template handy.
                              </p>
                            </ThreadReply>

                            {/* Nested reply 1-2 - highlighted as accepted answer */}
                            <ThreadReply
                              id="reply-1-2"
                              avatar={<Avatar fallback="ED" size="sm" />}
                              author="Emma Davis"
                              authorBadge="Senior Partner"
                              timestamp="Dec 30, 3:15 PM"
                              highlighted
                              reactions={
                                <ReactionBar>
                                  <ReactionButton reaction="heart" count={4} active />
                                  <ReactionButton reaction="thumbsUp" count={6} />
                                </ReactionBar>
                              }
                              resources={
                                <ResourceList>
                                  <LinkedResource
                                    type="clause"
                                    title="Standard IP Carve-out Template"
                                    reference="v2.1"
                                    onClick={() => {}}
                                  />
                                </ResourceList>
                              }
                            >
                              <p>
                                Here's the template we used for the prior deal. It explicitly excludes pre-existing IP
                                and limits coverage to direct infringement only. Should address your concerns.
                              </p>
                              <p>
                                Key changes to make:
                              </p>
                              <ol style={{ margin: '8px 0', paddingLeft: '20px', color: '#1E293B' }}>
                                <li>Add "excluding any pre-existing intellectual property" after the scope definition</li>
                                <li>Replace "any and all claims" with "direct claims arising from"</li>
                                <li>Add liability cap of 2x contract value (standard for this client tier)</li>
                              </ol>
                            </ThreadReply>
                          </>
                        }
                      >
                        <p>
                          Good catch, Sarah. The current draft does include third-party IP claims. This was
                          intentional based on the client's initial request, but I agree we should add a carve-out
                          for pre-existing IP.
                        </p>
                        <p>
                          I can reference the language we used in the prior deal last quarter - that had
                          a similar situation and the client accepted our narrower language.
                        </p>
                      </ThreadReply>

                      {/* Reply 2 */}
                      <ThreadReply
                        id="reply-2"
                        avatar={<Avatar fallback="SC" size="md" />}
                        author="Sarah Chen"
                        authorBadge="Attorney"
                        timestamp="Dec 30, 3:30 PM"
                        reactions={
                          <ReactionBar>
                            <ReactionButton reaction="celebrate" count={2} />
                          </ReactionBar>
                        }
                      >
                        <p>
                          Perfect, <Mention name="Emma Davis" /> - this is exactly what I was looking for! I'll incorporate
                          these changes into the next revision.
                        </p>
                        <p>
                          <Mention name="Mike Johnson" /> can you update the draft with Emma's suggested language
                          and send me the redline by EOD? I'd like to get this to the client tomorrow morning.
                        </p>
                      </ThreadReply>

                      {/* Reply 3 */}
                      <ThreadReply
                        id="reply-3"
                        avatar={<Avatar fallback="MJ" size="sm" />}
                        author="Mike Johnson"
                        authorBadge="Paralegal"
                        timestamp="Dec 30, 3:45 PM"
                      >
                        <p>
                          On it! Will have the redline ready by 5pm. I'll also add a brief memo explaining the
                          changes for the client's reference.
                        </p>
                      </ThreadReply>

                      {/* Thread input */}
                      <ThreadInput>
                        <ChatInput
                          placeholder="Add your reply..."
                          leftActions={
                            <button type="button" style={{ background: 'none', border: 'none', cursor: 'pointer', opacity: 0.5, padding: '4px' }}>
                              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z" clipRule="evenodd" />
                              </svg>
                            </button>
                          }
                        />
                      </ThreadInput>
                    </ThreadView>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </>
    );
  },
};

// ═══════════════════════════════════════════════════════════════
// DOCUMENTS WITH FILE SYSTEM VIEW
// ═══════════════════════════════════════════════════════════════

// Sample file system data
const sampleFileSystem: FileSystemItem[] = [
  {
    id: 'contracts',
    name: 'Contracts',
    type: 'folder',
    path: 'Contracts',
    children: [
      {
        id: 'active',
        name: 'Active',
        type: 'folder',
        path: 'Contracts/Active',
        parentId: 'contracts',
        children: [
          { id: 'msa-2024', name: 'Master Services Agreement 2024.pdf', type: 'pdf', path: 'Contracts/Active/Master Services Agreement 2024.pdf', parentId: 'active', size: 245000, modifiedAt: 'Dec 28, 2024' },
          { id: 'nda-template', name: 'NDA Template.docx', type: 'document', path: 'Contracts/Active/NDA Template.docx', parentId: 'active', size: 45000, modifiedAt: 'Dec 26, 2024' },
          { id: 'employment-1', name: 'Employment Contract - J. Smith.pdf', type: 'pdf', path: 'Contracts/Active/Employment Contract - J. Smith.pdf', parentId: 'active', size: 128000, modifiedAt: 'Dec 22, 2024' },
        ],
      },
      {
        id: 'templates',
        name: 'Templates',
        type: 'folder',
        path: 'Contracts/Templates',
        parentId: 'contracts',
        children: [
          { id: 'standard-nda', name: 'Standard NDA.docx', type: 'document', path: 'Contracts/Templates/Standard NDA.docx', parentId: 'templates', size: 38000, modifiedAt: 'Nov 15, 2024' },
          { id: 'sow-template', name: 'SOW Template.docx', type: 'document', path: 'Contracts/Templates/SOW Template.docx', parentId: 'templates', size: 52000, modifiedAt: 'Oct 10, 2024' },
        ],
      },
      {
        id: 'archived',
        name: 'Archived',
        type: 'folder',
        path: 'Contracts/Archived',
        parentId: 'contracts',
        children: [],
      },
    ],
  },
  {
    id: 'research',
    name: 'Research',
    type: 'folder',
    path: 'Research',
    children: [
      { id: 'case-studies', name: 'Case Studies', type: 'folder', path: 'Research/Case Studies', parentId: 'research', children: [] },
      { id: 'legal-memos', name: 'Legal Memos', type: 'folder', path: 'Research/Legal Memos', parentId: 'research', children: [] },
    ],
  },
  {
    id: 'admin',
    name: 'Administrative',
    type: 'folder',
    path: 'Administrative',
    children: [],
  },
];

// Get items at current path
const getItemsAtPath = (path: string[], items: FileSystemItem[]): FileSystemItem[] => {
  if (path.length === 0) {
    // Root level - show top-level folders
    return items;
  }

  // Navigate to the correct folder
  let currentItems = items;
  for (const segment of path) {
    const folder = currentItems.find(item => item.name === segment && item.type === 'folder');
    if (folder?.children) {
      currentItems = folder.children;
    } else {
      return [];
    }
  }
  return currentItems;
};

// Upload icon for toolbar
const UploadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M.5 9.9a.5.5 0 01.5.5v2.5a1 1 0 001 1h12a1 1 0 001-1v-2.5a.5.5 0 011 0v2.5a2 2 0 01-2 2H2a2 2 0 01-2-2v-2.5a.5.5 0 01.5-.5z" />
    <path d="M7.646 1.146a.5.5 0 01.708 0l3 3a.5.5 0 01-.708.708L8.5 2.707V11.5a.5.5 0 01-1 0V2.707L5.354 4.854a.5.5 0 11-.708-.708l3-3z" />
  </svg>
);

// New folder icon for toolbar
const NewFolderIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M.54 3.87L.5 3a2 2 0 012-2h3.672a2 2 0 011.414.586l.828.828A2 2 0 009.828 3H14a2 2 0 012 2v3H0V4.98a2 2 0 01.54-1.11zM16 7v5a2 2 0 01-2 2H2a2 2 0 01-2-2V7h16z" />
    <path d="M12 9a.5.5 0 01.5.5v1h1a.5.5 0 010 1h-1v1a.5.5 0 01-1 0v-1h-1a.5.5 0 010-1h1v-1A.5.5 0 0112 9z" />
  </svg>
);

export const DocumentsWithFileSystem: StoryObj = {
  name: 'Documents (File System View)',
  render: () => {
    const [activeNav, setActiveNav] = useState('corpuses');
    const [activeSidebarItem, setActiveSidebarItem] = useState('documents');
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const [currentPath, setCurrentPath] = useState<string[]>(['Contracts', 'Active']);

    const sidebarItems = [
      { id: 'home', icon: <HomeIcon />, label: 'Home' },
      { id: 'documents', icon: <DocumentIcon />, label: 'Documents', badge: 3 },
      { id: 'annotations', icon: <AnnotationIcon />, label: 'Annotations', badge: 2 },
      { id: 'analyses', icon: <AnalysisIcon />, label: 'Analyses' },
      { id: 'extracts', icon: <ExtractIcon />, label: 'Extracts' },
      { id: 'discussions', icon: <DiscussionIcon />, label: 'Discussions', badge: 1 },
      { id: 'analytics', icon: <AnalyticsIcon />, label: 'Analytics' },
      { id: 'settings', icon: <SettingsIcon />, label: 'Settings' },
      { id: 'badges', icon: <BadgeIcon />, label: 'Badges' },
    ];

    const currentItems = getItemsAtPath(currentPath, sampleFileSystem);

    return (
      <>
        <style>{pageStyles}</style>
        <style>{`
          .fs-container {
            flex: 1;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            background: var(--oc-bg-surface, white);
            border-radius: var(--oc-radius-lg, 12px);
            border: 1px solid var(--oc-border-default, #E2E8F0);
          }
          .fs-header {
            padding: 16px 20px;
            border-bottom: 1px solid var(--oc-border-default, #E2E8F0);
            display: flex;
            align-items: center;
            gap: 16px;
          }
          .fs-breadcrumb-wrapper {
            flex: 1;
          }
          .fs-content-wrapper {
            flex: 1;
            display: flex;
            overflow: hidden;
          }
          .fs-folder-panel {
            width: 220px;
            border-right: 1px solid var(--oc-border-default, #E2E8F0);
            overflow-y: auto;
            background: var(--oc-bg-canvas, #FAFAFA);
          }
          .fs-files-panel {
            flex: 1;
            overflow: hidden;
            display: flex;
            flex-direction: column;
          }
          .fs-folder-header {
            padding: 12px 16px;
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: var(--oc-fg-tertiary, #94A3B8);
            border-bottom: 1px solid var(--oc-border-default, #E2E8F0);
          }
          @media (max-width: 900px) {
            .fs-folder-panel {
              display: none;
            }
          }
        `}</style>
        <div className="corpus-page">
          <NavBar
            brandName="Open Contracts"
            version="v3.0.0b3"
            items={navItems}
            activeId={activeNav}
            onNavigate={setActiveNav}
            userName="John Scrudato"
            userMenuItems={userMenuItems}
          />

          <div className="corpus-layout">
            {/* Mobile Sidebar Backdrop */}
            <div
              className={`corpus-sidebar-backdrop ${mobileSidebarOpen ? 'corpus-sidebar-backdrop--visible' : ''}`}
              onClick={() => setMobileSidebarOpen(false)}
            />

            <aside className={`corpus-sidebar ${mobileSidebarOpen ? 'corpus-sidebar--open' : ''}`}>
              <div className="corpus-sidebar__header">
                <div className="corpus-sidebar__header-row">
                  <div className="corpus-sidebar__meta">
                    <div className="corpus-sidebar__label">Corpus</div>
                    <div className="corpus-sidebar__title">My First Corpus</div>
                  </div>
                  <IconButton
                    aria-label="Collapse sidebar"
                    variant="ghost"
                    size="sm"
                    className="corpus-sidebar__collapse"
                  >
                    <ChevronLeftIcon />
                  </IconButton>
                </div>
              </div>

              <nav className="corpus-sidebar__nav">
                <Sidebar activeId={activeSidebarItem} onNavigate={setActiveSidebarItem}>
                  <SidebarNav>
                    {sidebarItems.map((item) => (
                      <SidebarItem
                        key={item.id}
                        id={item.id}
                        icon={item.icon}
                        label={item.label}
                        badge={
                          item.badge ? (
                            <span
                              className={`sidebar-badge ${
                                activeSidebarItem === item.id ? 'sidebar-badge--active' : ''
                              }`}
                            >
                              {item.badge}
                            </span>
                          ) : undefined
                        }
                      />
                    ))}
                  </SidebarNav>
                </Sidebar>
              </nav>

              <div className="corpus-sidebar__footer">
                <Button variant="secondary" size="sm" fullWidth leftIcon={<PlusIcon />}>
                  Add Document
                </Button>
              </div>
            </aside>

            <main className="corpus-main">
              <div className="corpus-main__header">
                <div className="corpus-header-row">
                  <button
                    className="corpus-mobile-toggle"
                    onClick={() => setMobileSidebarOpen(true)}
                    aria-label="Open sidebar"
                  >
                    <MenuIcon />
                  </button>
                  <PageHeader
                    title="Documents"
                    subtitle="Browse and manage corpus documents"
                    breadcrumbs={[
                      { label: 'Corpuses', href: '#' },
                      { label: 'My First Corpus' },
                    ]}
                    actions={
                      <HStack gap="sm">
                        <Button variant="ghost" size="sm">
                          Export
                        </Button>
                        <Button variant="primary" size="sm" leftIcon={<PlusIcon />}>
                          Upload
                        </Button>
                      </HStack>
                    }
                  />
                </div>
              </div>

              <div className="corpus-main__content">
                <div className="corpus-main__inner">
                  <FileSystem
                    initialPath={currentPath}
                    onPathChange={setCurrentPath}
                  >
                    <div className="fs-container">
                      {/* File system header with breadcrumb and toolbar */}
                      <div className="fs-header">
                        <div className="fs-breadcrumb-wrapper">
                          <FilePathBreadcrumb rootLabel="Documents" />
                        </div>
                        <FileSystemToolbar showNavigation={true} showViewToggle={true}>
                          <HStack gap="sm">
                            <ToolbarButton icon={<NewFolderIcon />}>
                              New Folder
                            </ToolbarButton>
                            <ToolbarSeparator />
                            <ToolbarButton variant="primary" icon={<UploadIcon />}>
                              Upload
                            </ToolbarButton>
                          </HStack>
                        </FileSystemToolbar>
                      </div>

                      {/* Main content with folder tree and file list */}
                      <div className="fs-content-wrapper">
                        {/* Folder tree sidebar */}
                        <div className="fs-folder-panel">
                          <div className="fs-folder-header">Folders</div>
                          <FolderTree
                            rootLabel="Documents"
                            folders={sampleFileSystem}
                          />
                        </div>

                        {/* File list */}
                        <div className="fs-files-panel">
                          <FileList items={currentItems} />
                        </div>
                      </div>
                    </div>
                  </FileSystem>
                </div>
              </div>
            </main>
          </div>
        </div>
      </>
    );
  },
};
