import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NavBar } from '../NavBar';
import { Sidebar, SidebarHeader, SidebarNav, SidebarItem, SidebarSection, SidebarFooter } from '../Sidebar';
import { PageHeader } from '../PageHeader';
import { SearchInput } from '../SearchInput';
import { SearchBox } from '../SearchBox';
import { Chip } from '../Chip';
import { Button, IconButton } from '../Button';
import { Card, CardHeader, CardBody } from '../Card';
import { EmptyState } from '../EmptyState';
import { HStack, VStack, Spacer } from '../Stack';
import { Avatar, AvatarGroup } from '../Avatar';
import { FilterTabs } from '../FilterTabs';
import { StatBlock, StatGrid } from '../StatBlock';
import { Popover } from '../Popover';
import { Checkbox } from '../Checkbox';
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
import { DocumentGraph } from '../DocumentGraph';
import { RelationshipBadge } from '../RelationshipBadge';
import { RelationshipPopoverContent, RelationshipItem } from '../RelationshipPopover';
import type { GraphData, GraphNodeData, RelationshipLabel, DocumentRelationship, GraphDocument } from '../types/relationship';

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

const ChatIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9h.01M9 9h.01M12 9h.01M15.75 9a6.75 6.75 0 11-3.638-5.995" />
    <path d="M15.75 3v3h-3" />
  </svg>
);

const HistoryIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.25 9a6.75 6.75 0 1113.5 0 6.75 6.75 0 01-13.5 0z" />
    <path d="M9 5.25V9l2.25 2.25" />
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

const GridIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <rect x="2" y="2" width="5" height="5" rx="1" />
    <rect x="9" y="2" width="5" height="5" rx="1" />
    <rect x="2" y="9" width="5" height="5" rx="1" />
    <rect x="9" y="9" width="5" height="5" rx="1" />
  </svg>
);

const GraphIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <circle cx="8" cy="8" r="2" />
    <circle cx="3" cy="4" r="1.5" />
    <circle cx="13" cy="4" r="1.5" />
    <circle cx="3" cy="12" r="1.5" />
    <circle cx="13" cy="12" r="1.5" />
    <path d="M6.5 6.5L4.5 5M9.5 6.5L11.5 5M6.5 9.5L4.5 11M9.5 9.5L11.5 11" />
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

// ═══════════════════════════════════════════════════════════════
// REIMAGINED CORPUS DETAIL PAGE
// ═══════════════════════════════════════════════════════════════

const reimaginedPageStyles = `
  .corpus-detail-page {
    min-height: 100vh;
    background: var(--oc-bg-canvas, #FAFAFA);
    font-family: var(--oc-font-family, 'Inter', -apple-system, BlinkMacSystemFont, sans-serif);
  }

  .corpus-detail-layout {
    display: flex;
    min-height: calc(100vh - 56px);
  }

  /* Refined sidebar */
  .corpus-detail-sidebar {
    width: 280px;
    min-width: 280px;
    background: var(--oc-bg-surface, white);
    border-right: 1px solid var(--oc-border-default, #E2E8F0);
    display: flex;
    flex-direction: column;
  }

  .corpus-detail-sidebar__header {
    padding: 24px 20px;
    border-bottom: 1px solid var(--oc-border-default, #E2E8F0);
  }

  .corpus-detail-sidebar__avatar {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background: linear-gradient(135deg, #0F766E 0%, #14B8A6 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 12px;
  }

  .corpus-detail-sidebar__name {
    font-family: 'Georgia', 'Times New Roman', serif;
    font-size: 18px;
    font-weight: 400;
    color: #1E293B;
    margin: 0 0 4px;
  }

  .corpus-detail-sidebar__meta {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: var(--oc-fg-tertiary, #94A3B8);
  }

  .corpus-detail-sidebar__visibility {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 2px 8px;
    background: rgba(15, 118, 110, 0.1);
    color: #0F766E;
    font-size: 11px;
    font-weight: 600;
    border-radius: 4px;
    text-transform: uppercase;
    letter-spacing: 0.02em;
  }

  .corpus-detail-sidebar__description {
    margin-top: 12px;
    font-size: 13px;
    line-height: 1.5;
    color: var(--oc-fg-secondary, #475569);
  }

  .corpus-detail-sidebar__section {
    padding: 16px 20px;
    border-bottom: 1px solid var(--oc-border-default, #E2E8F0);
  }

  .corpus-detail-sidebar__section-title {
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--oc-fg-tertiary, #94A3B8);
    margin: 0 0 12px;
  }

  .corpus-detail-sidebar__contributors {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .corpus-detail-sidebar__contributor-count {
    font-size: 13px;
    color: var(--oc-fg-secondary, #475569);
  }

  .corpus-detail-sidebar__quick-actions {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .corpus-detail-sidebar__action {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    font-size: 14px;
    color: var(--oc-fg-secondary, #475569);
    background: transparent;
    border: none;
    border-radius: var(--oc-radius-md, 8px);
    cursor: pointer;
    transition: all 0.15s ease;
    text-align: left;
    width: 100%;
  }

  .corpus-detail-sidebar__action:hover {
    background: var(--oc-bg-surface-hover, #F1F5F9);
    color: var(--oc-fg-primary, #1E293B);
  }

  .corpus-detail-sidebar__action-icon {
    width: 18px;
    height: 18px;
    opacity: 0.6;
  }

  .corpus-detail-sidebar__footer {
    margin-top: auto;
    padding: 16px 20px;
    border-top: 1px solid var(--oc-border-default, #E2E8F0);
  }

  /* Section navigation */
  .corpus-section-nav {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }

  .corpus-section-nav__group {
    padding: 12px 12px 16px;
    border-bottom: 1px solid var(--oc-border-default, #E2E8F0);
  }

  .corpus-section-nav__group:last-child {
    border-bottom: none;
  }

  .corpus-section-nav__label {
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--oc-fg-tertiary, #94A3B8);
    padding: 0 8px;
    margin-bottom: 8px;
  }

  .corpus-section-nav__item {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding: 10px 12px;
    font-size: 14px;
    color: var(--oc-fg-secondary, #475569);
    background: transparent;
    border: none;
    border-radius: var(--oc-radius-md, 8px);
    cursor: pointer;
    transition: all 0.15s ease;
    text-align: left;
  }

  .corpus-section-nav__item:hover {
    background: var(--oc-bg-surface-hover, #F1F5F9);
    color: var(--oc-fg-primary, #1E293B);
  }

  .corpus-section-nav__item--active {
    background: rgba(15, 118, 110, 0.08);
    color: var(--oc-accent, #0F766E);
    font-weight: 500;
  }

  .corpus-section-nav__icon {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    opacity: 0.7;
  }

  .corpus-section-nav__item--active .corpus-section-nav__icon {
    opacity: 1;
  }

  .corpus-section-nav__badge {
    margin-left: auto;
    padding: 2px 8px;
    font-size: 11px;
    font-weight: 600;
    background: var(--oc-bg-canvas, #F1F5F9);
    color: var(--oc-fg-tertiary, #64748B);
    border-radius: 10px;
  }

  .corpus-section-nav__item--active .corpus-section-nav__badge {
    background: rgba(15, 118, 110, 0.15);
    color: var(--oc-accent, #0F766E);
  }

  /* Home content (markdown-like) */
  .corpus-home-content {
    background: var(--oc-bg-surface, white);
    border: 1px solid var(--oc-border-default, #E2E8F0);
    border-radius: var(--oc-radius-lg, 12px);
    padding: 32px;
    margin-top: 32px;
  }

  .corpus-home-content h2 {
    font-family: 'Georgia', 'Times New Roman', serif;
    font-size: 24px;
    font-weight: 400;
    color: #1E293B;
    margin: 0 0 16px;
  }

  .corpus-home-content h3 {
    font-family: 'Georgia', 'Times New Roman', serif;
    font-size: 18px;
    font-weight: 400;
    color: #0F766E;
    margin: 28px 0 12px;
  }

  .corpus-home-content h3:first-of-type {
    margin-top: 24px;
  }

  .corpus-home-content p {
    font-size: 15px;
    line-height: 1.7;
    color: var(--oc-fg-secondary, #475569);
    margin: 0 0 16px;
  }

  .corpus-home-content ul {
    margin: 0 0 16px;
    padding-left: 24px;
  }

  .corpus-home-content li {
    font-size: 15px;
    line-height: 1.7;
    color: var(--oc-fg-secondary, #475569);
    margin-bottom: 8px;
  }

  .corpus-home-content code {
    font-family: 'SF Mono', Monaco, monospace;
    font-size: 13px;
    background: var(--oc-bg-canvas, #F1F5F9);
    padding: 2px 6px;
    border-radius: 4px;
    color: #0F766E;
  }

  .corpus-home-content--expanded {
    padding: 40px;
  }

  .corpus-home-content--expanded h2 {
    font-size: 28px;
    margin-bottom: 20px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--oc-border-default, #E2E8F0);
  }

  .corpus-home-content strong {
    color: var(--oc-fg-primary, #1E293B);
    font-weight: 600;
  }

  /* Section placeholder cards */
  .corpus-section-placeholder {
    background: var(--oc-bg-surface, white);
    border: 1px solid var(--oc-border-default, #E2E8F0);
    border-radius: var(--oc-radius-lg, 12px);
    padding: 48px 32px;
    text-align: center;
  }

  .corpus-section-placeholder__icon {
    width: 64px;
    height: 64px;
    margin: 0 auto 20px;
    background: linear-gradient(135deg, rgba(15, 118, 110, 0.1) 0%, rgba(20, 184, 166, 0.1) 100%);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #0F766E;
  }

  .corpus-section-placeholder__title {
    font-family: 'Georgia', 'Times New Roman', serif;
    font-size: 24px;
    font-weight: 400;
    color: #1E293B;
    margin: 0 0 12px;
  }

  .corpus-section-placeholder__description {
    font-size: 15px;
    line-height: 1.6;
    color: var(--oc-fg-secondary, #64748B);
    max-width: 400px;
    margin: 0 auto 24px;
  }

  /* Floating chat bar */
  .corpus-chat-bar {
    position: relative;
    margin-top: 32px;
  }

  .corpus-detail-hero .corpus-chat-bar {
    margin-top: 28px;
  }

  .corpus-chat-bar__container {
    display: flex;
    align-items: center;
    gap: 8px;
    background: var(--oc-bg-surface, white);
    border: 1px solid var(--oc-border-default, #E2E8F0);
    border-radius: 24px;
    padding: 8px 8px 8px 20px;
    box-shadow: var(--oc-shadow-md, 0 4px 12px rgba(15, 23, 42, 0.08));
    transition: all 0.2s ease;
  }

  .corpus-chat-bar__container:focus-within {
    border-color: var(--oc-accent, #0F766E);
    box-shadow: 0 0 0 3px rgba(15, 118, 110, 0.1), var(--oc-shadow-md, 0 4px 12px rgba(15, 23, 42, 0.08));
  }

  .corpus-chat-bar__input {
    flex: 1;
    border: none;
    background: transparent;
    font-size: 15px;
    color: var(--oc-fg-primary, #1E293B);
    outline: none;
    min-height: 24px;
    resize: none;
  }

  .corpus-chat-bar__input::placeholder {
    color: var(--oc-fg-tertiary, #94A3B8);
  }

  .corpus-chat-bar__actions {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .corpus-chat-bar__btn {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.15s ease;
  }

  .corpus-chat-bar__btn--history {
    background: var(--oc-bg-canvas, #F1F5F9);
    color: var(--oc-fg-secondary, #64748B);
  }

  .corpus-chat-bar__btn--history:hover {
    background: var(--oc-bg-surface-hover, #E2E8F0);
    color: var(--oc-fg-primary, #1E293B);
  }

  .corpus-chat-bar__btn--send {
    background: var(--oc-accent, #0F766E);
    color: white;
  }

  .corpus-chat-bar__btn--send:hover {
    background: #0D6660;
  }

  .corpus-chat-bar__btn--send:disabled {
    background: var(--oc-bg-canvas, #F1F5F9);
    color: var(--oc-fg-tertiary, #94A3B8);
    cursor: not-allowed;
  }

  .corpus-chat-bar__hint {
    text-align: center;
    font-size: 12px;
    color: var(--oc-fg-tertiary, #94A3B8);
    margin-top: 12px;
  }

  /* Main content area */
  .corpus-detail-main {
    flex: 1;
    overflow-y: auto;
  }

  .corpus-detail-content {
    max-width: 900px;
    margin: 0 auto;
    padding: 48px 24px 80px;
  }

  /* Hero section */
  .corpus-detail-hero {
    margin-bottom: 48px;
  }

  .corpus-detail-hero__breadcrumb {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: var(--oc-fg-tertiary, #94A3B8);
    margin-bottom: 16px;
  }

  .corpus-detail-hero__breadcrumb a {
    color: var(--oc-fg-secondary, #475569);
    text-decoration: none;
  }

  .corpus-detail-hero__breadcrumb a:hover {
    color: var(--oc-accent, #0F766E);
  }

  .corpus-detail-hero__breadcrumb-sep {
    color: var(--oc-border-strong, #CBD5E1);
  }

  .corpus-detail-hero__title {
    font-family: 'Georgia', 'Times New Roman', serif;
    font-size: 42px;
    font-weight: 400;
    line-height: 1.2;
    color: #1E293B;
    margin: 0 0 16px;
  }

  .corpus-detail-hero__title span {
    color: #0F766E;
  }

  .corpus-detail-hero__subtitle {
    font-size: 17px;
    line-height: 1.6;
    color: #64748B;
    margin: 0 0 32px;
    max-width: 600px;
  }

  .corpus-detail-hero__search {
    margin-bottom: 16px;
  }

  /* Section headers */
  .corpus-detail-section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .corpus-detail-section-title {
    font-family: 'Georgia', 'Times New Roman', serif;
    font-size: 24px;
    font-weight: 400;
    color: #0F766E;
    margin: 0;
  }

  /* Document cards grid */
  .corpus-docs-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
  }

  .corpus-doc-card {
    background: var(--oc-bg-surface, white);
    border: 1px solid var(--oc-border-default, #E2E8F0);
    border-radius: var(--oc-radius-lg, 12px);
    overflow: hidden;
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
  }

  .corpus-doc-card:hover {
    border-color: var(--oc-border-strong, #CBD5E1);
    box-shadow: var(--oc-shadow-md, 0 4px 12px rgba(15, 23, 42, 0.08));
    transform: translateY(-2px);
  }

  .corpus-doc-card__checkbox {
    position: absolute;
    top: 12px;
    left: 12px;
    z-index: 2;
    opacity: 0;
    transition: opacity 0.15s;
  }

  .corpus-doc-card:hover .corpus-doc-card__checkbox,
  .corpus-doc-card--selected .corpus-doc-card__checkbox {
    opacity: 1;
  }

  .corpus-doc-card--selected {
    border-color: var(--oc-accent, #0F766E);
    box-shadow: 0 0 0 1px var(--oc-accent, #0F766E);
  }

  .corpus-doc-card__preview {
    height: 140px;
    background: linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
  }

  .corpus-doc-card__preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
  }

  .corpus-doc-card__preview-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    color: var(--oc-fg-tertiary, #94A3B8);
  }

  .corpus-doc-card__type-badge {
    position: absolute;
    top: 12px;
    right: 12px;
  }

  .corpus-doc-card__body {
    padding: 16px;
  }

  .corpus-doc-card__name {
    font-size: 14px;
    font-weight: 500;
    color: var(--oc-fg-primary, #1E293B);
    margin: 0 0 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .corpus-doc-card__meta {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    color: var(--oc-fg-tertiary, #94A3B8);
    margin-bottom: 12px;
  }

  .corpus-doc-card__meta-sep {
    width: 3px;
    height: 3px;
    background: var(--oc-fg-tertiary, #94A3B8);
    border-radius: 50%;
  }

  .corpus-doc-card__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .corpus-doc-card__user {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    color: var(--oc-fg-secondary, #475569);
  }

  /* Action dropdown */
  .corpus-action-dropdown {
    min-width: 200px;
    padding: 6px;
    background: white;
    border: 1px solid var(--oc-border-default, #E2E8F0);
    border-radius: var(--oc-radius-lg, 12px);
    box-shadow: var(--oc-shadow-lg, 0 8px 16px rgba(15, 23, 42, 0.08));
  }

  .corpus-action-dropdown__header {
    padding: 8px 12px;
    font-size: 12px;
    font-weight: 600;
    color: var(--oc-fg-tertiary, #94A3B8);
    border-bottom: 1px solid var(--oc-border-default, #E2E8F0);
    margin: 0 -6px 6px;
    padding-left: 18px;
    padding-right: 18px;
    background: var(--oc-bg-canvas, #FAFAFA);
  }

  .corpus-action-dropdown__item {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding: 10px 12px;
    font-size: 14px;
    color: var(--oc-fg-primary, #1E293B);
    background: transparent;
    border: none;
    border-radius: var(--oc-radius-md, 8px);
    cursor: pointer;
    transition: background 0.1s;
    text-align: left;
  }

  .corpus-action-dropdown__item:hover {
    background: var(--oc-bg-surface-hover, #F1F5F9);
  }

  .corpus-action-dropdown__item--danger {
    color: var(--oc-error, #DC2626);
  }

  .corpus-action-dropdown__item--danger:hover {
    background: #FEF2F2;
  }

  .corpus-action-dropdown__separator {
    height: 1px;
    background: var(--oc-border-default, #E2E8F0);
    margin: 6px 0;
  }

  /* File system layout */
  .corpus-fs-layout {
    display: flex;
    gap: 0;
    background: var(--oc-bg-surface, white);
    border: 1px solid var(--oc-border-default, #E2E8F0);
    border-radius: var(--oc-radius-lg, 12px);
    overflow: hidden;
    min-height: 400px;
  }

  .corpus-fs-sidebar {
    width: 240px;
    min-width: 240px;
    background: var(--oc-bg-canvas, #FAFAFA);
    border-right: 1px solid var(--oc-border-default, #E2E8F0);
    display: flex;
    flex-direction: column;
  }

  .corpus-fs-sidebar__header {
    padding: 12px 16px;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--oc-fg-tertiary, #94A3B8);
    border-bottom: 1px solid var(--oc-border-default, #E2E8F0);
    background: white;
  }

  .corpus-fs-sidebar__tree {
    flex: 1;
    overflow-y: auto;
    padding: 8px 0;
  }

  /* Folder tree items */
  .folder-tree-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    font-size: 14px;
    color: var(--oc-fg-secondary, #475569);
    cursor: pointer;
    transition: all 0.1s;
    border: none;
    background: transparent;
    width: 100%;
    text-align: left;
  }

  .folder-tree-item:hover {
    background: var(--oc-bg-surface-hover, #F1F5F9);
    color: var(--oc-fg-primary, #1E293B);
  }

  .folder-tree-item--active {
    background: rgba(15, 118, 110, 0.08);
    color: var(--oc-accent, #0F766E);
    font-weight: 500;
  }

  .folder-tree-item--nested {
    padding-left: 32px;
  }

  .folder-tree-item--nested-2 {
    padding-left: 48px;
  }

  .folder-tree-item__icon {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
  }

  .folder-tree-item__expand {
    width: 16px;
    height: 16px;
    margin-left: auto;
    opacity: 0.5;
    transition: transform 0.15s;
  }

  .folder-tree-item__expand--open {
    transform: rotate(90deg);
  }

  /* File system main content */
  .corpus-fs-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .corpus-fs-toolbar {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 20px;
    border-bottom: 1px solid var(--oc-border-default, #E2E8F0);
    background: white;
  }

  .corpus-fs-breadcrumb {
    display: flex;
    align-items: center;
    gap: 6px;
    flex: 1;
  }

  .corpus-fs-breadcrumb__item {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 14px;
    color: var(--oc-fg-secondary, #475569);
    background: none;
    border: none;
    padding: 4px 8px;
    border-radius: var(--oc-radius-sm, 6px);
    cursor: pointer;
    transition: all 0.1s;
  }

  .corpus-fs-breadcrumb__item:hover {
    background: var(--oc-bg-surface-hover, #F1F5F9);
    color: var(--oc-fg-primary, #1E293B);
  }

  .corpus-fs-breadcrumb__item--current {
    font-weight: 500;
    color: var(--oc-fg-primary, #1E293B);
    cursor: default;
  }

  .corpus-fs-breadcrumb__item--current:hover {
    background: transparent;
  }

  .corpus-fs-breadcrumb__sep {
    color: var(--oc-border-strong, #CBD5E1);
    font-size: 12px;
  }

  .corpus-fs-content {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
  }

  /* Folder cards in grid */
  .corpus-folder-card {
    background: var(--oc-bg-surface, white);
    border: 1px solid var(--oc-border-default, #E2E8F0);
    border-radius: var(--oc-radius-lg, 12px);
    padding: 16px;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .corpus-folder-card:hover {
    border-color: var(--oc-border-strong, #CBD5E1);
    box-shadow: var(--oc-shadow-sm, 0 2px 8px rgba(15, 23, 42, 0.06));
    transform: translateY(-1px);
  }

  .corpus-folder-card__icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #D97706;
    flex-shrink: 0;
  }

  .corpus-folder-card__content {
    flex: 1;
    min-width: 0;
  }

  .corpus-folder-card__name {
    font-size: 14px;
    font-weight: 500;
    color: var(--oc-fg-primary, #1E293B);
    margin: 0 0 2px;
  }

  .corpus-folder-card__meta {
    font-size: 12px;
    color: var(--oc-fg-tertiary, #94A3B8);
  }

  .corpus-folder-card__arrow {
    color: var(--oc-fg-tertiary, #94A3B8);
    opacity: 0;
    transition: opacity 0.15s;
  }

  .corpus-folder-card:hover .corpus-folder-card__arrow {
    opacity: 1;
  }

  /* Mixed grid for folders + docs */
  .corpus-fs-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 16px;
  }

  .corpus-fs-grid--folders {
    margin-bottom: 24px;
  }

  .corpus-fs-section-label {
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--oc-fg-tertiary, #94A3B8);
    margin: 0 0 12px;
    padding: 0 4px;
  }

  /* Responsive */
  @media (max-width: 1024px) {
    .corpus-detail-sidebar {
      display: none;
    }
  }

  @media (max-width: 900px) {
    .corpus-fs-sidebar {
      display: none;
    }
  }

  @media (max-width: 768px) {
    .corpus-detail-content {
      padding: 32px 16px 60px;
    }

    .corpus-detail-hero__title {
      font-size: 32px;
    }

    .corpus-docs-grid,
    .corpus-fs-grid {
      grid-template-columns: 1fr;
    }
  }

  /* View toggle (grid/graph) */
  .corpus-view-toggle {
    display: flex;
    background: var(--oc-bg-surface, #F8F8F8);
    border: 1px solid var(--oc-border-default, #E2E8F0);
    border-radius: var(--oc-radius-md, 8px);
    padding: 2px;
    gap: 2px;
  }

  .corpus-view-toggle__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 28px;
    padding: 0;
    background: transparent;
    border: none;
    border-radius: var(--oc-radius-sm, 6px);
    color: var(--oc-fg-tertiary, #94A3B8);
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .corpus-view-toggle__btn:hover {
    color: var(--oc-fg-secondary, #475569);
    background: var(--oc-bg-surface-hover, #E2E8F0);
  }

  .corpus-view-toggle__btn--active {
    background: white;
    color: var(--oc-accent, #0F766E);
    box-shadow: var(--oc-shadow-sm, 0 1px 2px rgba(0, 0, 0, 0.04));
  }

  .corpus-view-toggle__btn--active:hover {
    background: white;
    color: var(--oc-accent, #0F766E);
  }

  /* Graph container */
  .corpus-graph-container {
    background: var(--oc-bg-surface, white);
    border: 1px solid var(--oc-border-default, #E2E8F0);
    border-radius: var(--oc-radius-lg, 12px);
    overflow: hidden;
    height: 500px;
    position: relative;
  }

  .corpus-graph-container .oc-document-graph {
    height: 100%;
  }

  /* Relationship badge positioning on doc cards */
  .corpus-doc-card {
    position: relative;
  }

  .corpus-doc-card__relationship-badge {
    position: absolute;
    top: 8px;
    left: 8px;
    z-index: 3;
  }

  .corpus-doc-card__relationship-badge .oc-relationship-badge {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(4px);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12);
    border-radius: 20px;
    padding: 4px 10px 4px 6px;
  }

  .corpus-doc-card__relationship-badge .oc-relationship-badge__count {
    color: var(--oc-accent, #0F766E);
    font-weight: 600;
    font-size: 12px;
  }

  .corpus-doc-card__relationship-badge .oc-relationship-badge__connector {
    background-color: var(--oc-accent, #0F766E);
    width: 8px;
  }

  .corpus-doc-card__relationship-badge .oc-node {
    background-color: var(--oc-accent, #0F766E);
  }
`;

// Icons for the redesigned page
const ShareIcon2 = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="13.5" cy="4.5" r="2.25" />
    <circle cx="4.5" cy="9" r="2.25" />
    <circle cx="13.5" cy="13.5" r="2.25" />
    <path d="M6.53 10.19l4.95 2.37M11.47 5.69l-4.94 2.12" />
  </svg>
);

const DownloadIcon2 = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15.75 11.25v3a1.5 1.5 0 01-1.5 1.5h-10.5a1.5 1.5 0 01-1.5-1.5v-3" />
    <path d="M5.25 8.25L9 12l3.75-3.75" />
    <path d="M9 12V2.25" />
  </svg>
);

const LockIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
    <path fillRule="evenodd" d="M4 4V3a2 2 0 114 0v1h.5A1.5 1.5 0 0110 5.5v4A1.5 1.5 0 018.5 11h-5A1.5 1.5 0 012 9.5v-4A1.5 1.5 0 013.5 4H4zm1-1v1h2V3a1 1 0 00-2 0z" clipRule="evenodd" />
  </svg>
);

const GlobeIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
    <path fillRule="evenodd" d="M6 12A6 6 0 106 0a6 6 0 000 12zm.5-10.98a5.01 5.01 0 012.77 8.46c.04-.16.08-.33.08-.48 0-1-.67-1.5-1.35-1.5-.35 0-.6-.1-.85-.3-.25-.2-.4-.5-.4-.7 0-.5.4-1 1-1 .67 0 1-.5 1-1 0-.5-.33-1-1-1.5-.33-.25-.67-.5-.67-1 0-.17.08-.33.2-.48.12-.15.3-.25.5-.35.08-.04.15-.1.22-.15zM4.52 9.73A5.01 5.01 0 015.5 1.02a4.48 4.48 0 00-.2.98c0 1 .67 1.5 1.35 1.5.35 0 .6.1.85.3.25.2.4.5.4.7 0 .5-.4 1-1 1-.67 0-1 .5-1 1 0 .5.33 1 1 1.5.33.25.67.5.67 1 0 .17-.08.33-.2.48-.12.15-.3.25-.5.35-.08.04-.15.1-.22.15a4.95 4.95 0 01-2.13-.25z" clipRule="evenodd" />
  </svg>
);

const TrashIcon2 = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path fillRule="evenodd" d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" clipRule="evenodd" />
  </svg>
);

const AddToCorpusIcon2 = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M.54 3.87L.5 3a2 2 0 012-2h3.672a2 2 0 011.414.586l.828.828A2 2 0 009.828 3H12.5a2 2 0 012 2v1H.5v-.13a.5.5 0 01.04-.13zM1.059 5H14.94l-.863 8.13A2 2 0 0112.095 15H3.905a2 2 0 01-1.983-1.87L1.059 5z" />
  </svg>
);

const ChevronDownIcon2 = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M4.22 6.22a.75.75 0 011.06 0L8 8.94l2.72-2.72a.75.75 0 111.06 1.06l-3.25 3.25a.75.75 0 01-1.06 0L4.22 7.28a.75.75 0 010-1.06z" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M6.22 4.22a.75.75 0 011.06 0l3.25 3.25a.75.75 0 010 1.06l-3.25 3.25a.75.75 0 01-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 010-1.06z" />
  </svg>
);

const FolderIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
    <path d="M1.5 4.5A1.5 1.5 0 013 3h4.172a1.5 1.5 0 011.06.44l.829.828a1.5 1.5 0 001.06.44H15a1.5 1.5 0 011.5 1.5v7.5a1.5 1.5 0 01-1.5 1.5H3a1.5 1.5 0 01-1.5-1.5v-9z" />
  </svg>
);

const FolderOpenIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
    <path d="M1.5 4.5A1.5 1.5 0 013 3h4.172a1.5 1.5 0 011.06.44l.829.828a1.5 1.5 0 001.06.44H15a1.5 1.5 0 011.5 1.5v.5H3.75a1.5 1.5 0 00-1.326.794l-1.5 2.813A1.5 1.5 0 00.75 10.5v3a1.5 1.5 0 001.5 1.5h12a1.5 1.5 0 001.5-1.5v-6A1.5 1.5 0 0014.25 6H3.75L2.25 8.813V4.5z" />
  </svg>
);

const HomeIcon2 = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8.707 1.5a1 1 0 00-1.414 0L.646 8.146a.5.5 0 00.708.708L2 8.207V13.5A1.5 1.5 0 003.5 15h9a1.5 1.5 0 001.5-1.5V8.207l.646.647a.5.5 0 00.708-.708L8.707 1.5z" />
  </svg>
);

const NewFolderIcon2 = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M.54 3.87L.5 3a2 2 0 012-2h3.672a2 2 0 011.414.586l.828.828A2 2 0 009.828 3H14a2 2 0 012 2v3H0V4.98a2 2 0 01.54-1.11zM16 7v5a2 2 0 01-2 2H2a2 2 0 01-2-2V7h16z" />
    <path d="M12 9a.5.5 0 01.5.5v1h1a.5.5 0 010 1h-1v1a.5.5 0 01-1 0v-1h-1a.5.5 0 010-1h1v-1A.5.5 0 0112 9z" />
  </svg>
);

// File system structure for the corpus
interface FolderItem {
  id: string;
  name: string;
  type: 'folder';
  children?: (FolderItem | DocItem)[];
  itemCount?: number;
}

interface DocItem {
  id: string;
  name: string;
  type: 'document';
  docType: string;
  size: string;
  pages: number;
  uploadedBy: string;
  uploadedAt: string;
  thumbnail?: string;
}

type FSItem = FolderItem | DocItem;

const corpusFileSystem: FSItem[] = [
  {
    id: 'contracts',
    name: 'Contracts',
    type: 'folder',
    itemCount: 5,
    children: [
      {
        id: 'active',
        name: 'Active',
        type: 'folder',
        itemCount: 3,
        children: [
          { id: 'msa-2024', name: 'Master Services Agreement 2024.pdf', type: 'document', docType: 'pdf', size: '2.4 MB', pages: 24, uploadedBy: 'Sarah Chen', uploadedAt: '2 hours ago', thumbnail: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=300&h=400&fit=crop' },
          { id: 'nda-template', name: 'NDA Template Standard.docx', type: 'document', docType: 'docx', size: '245 KB', pages: 4, uploadedBy: 'Mike Johnson', uploadedAt: '3 days ago', thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=400&fit=crop' },
          { id: 'employment-1', name: 'Employment Contract - J. Smith.pdf', type: 'document', docType: 'pdf', size: '890 KB', pages: 8, uploadedBy: 'Emma Davis', uploadedAt: '1 week ago', thumbnail: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=300&h=400&fit=crop' },
        ],
      },
      {
        id: 'templates',
        name: 'Templates',
        type: 'folder',
        itemCount: 2,
        children: [
          { id: 'standard-nda', name: 'Standard NDA v2.docx', type: 'document', docType: 'docx', size: '180 KB', pages: 3, uploadedBy: 'Sarah Chen', uploadedAt: '2 weeks ago', thumbnail: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=300&h=400&fit=crop' },
          { id: 'sow-template', name: 'SOW Template.docx', type: 'document', docType: 'docx', size: '210 KB', pages: 5, uploadedBy: 'Mike Johnson', uploadedAt: '3 weeks ago' },
        ],
      },
      {
        id: 'archived',
        name: 'Archived',
        type: 'folder',
        itemCount: 0,
      },
    ],
  },
  {
    id: 'research',
    name: 'Research',
    type: 'folder',
    itemCount: 1,
    children: [
      { id: 'case-analysis', name: 'Case Analysis Q4.pdf', type: 'document', docType: 'pdf', size: '1.5 MB', pages: 18, uploadedBy: 'John Scrudato', uploadedAt: '1 month ago', thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300&h=400&fit=crop' },
    ],
  },
  {
    id: 'admin',
    name: 'Administrative',
    type: 'folder',
    itemCount: 0,
  },
];

// Sample documents for the corpus (flat list for non-FS view)
const corpusDocuments = [
  {
    id: '1',
    name: 'Master Services Agreement 2024.pdf',
    type: 'pdf',
    size: '2.4 MB',
    pages: 24,
    uploadedBy: 'Sarah Chen',
    uploadedAt: '2 hours ago',
    thumbnail: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=300&h=400&fit=crop',
  },
  {
    id: '2',
    name: 'NDA Template Standard.docx',
    type: 'docx',
    size: '245 KB',
    pages: 4,
    uploadedBy: 'Mike Johnson',
    uploadedAt: '3 days ago',
    thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=400&fit=crop',
  },
  {
    id: '3',
    name: 'Employment Contract - J. Smith.pdf',
    type: 'pdf',
    size: '890 KB',
    pages: 8,
    uploadedBy: 'Emma Davis',
    uploadedAt: '1 week ago',
    thumbnail: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=300&h=400&fit=crop',
  },
  {
    id: '4',
    name: 'Vendor Agreement Q4 2024.pdf',
    type: 'pdf',
    size: '1.2 MB',
    pages: 15,
    uploadedBy: 'John Scrudato',
    uploadedAt: '2 weeks ago',
    thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300&h=400&fit=crop',
  },
];

// ═══════════════════════════════════════════════════════════════
// RELATIONSHIP DATA FOR GRAPH VISUALIZATION
// ═══════════════════════════════════════════════════════════════

const relationshipLabels: RelationshipLabel[] = [
  { id: 'cites', text: 'cites', color: '#0F766E', description: 'Document explicitly cites another' },
  { id: 'references', text: 'references', color: '#0284C7', description: 'General reference' },
  { id: 'amends', text: 'amends', color: '#D97706', description: 'Modifies previous document' },
  { id: 'supersedes', text: 'supersedes', color: '#7C3AED', description: 'Replaces entirely' },
  { id: 'defines', text: 'defines terms for', color: '#059669', description: 'Defines terms used elsewhere' },
];

// Relationship counts per document (maps to document IDs in corpusFileSystem)
const documentRelationshipCounts: Record<string, number> = {
  'msa-2024': 4,
  'nda-template': 2,
  'employment-1': 3,
  'standard-nda': 1,
  'sow-template': 2,
  'case-analysis': 1,
  'vendor-2023': 1,
  'consulting-1': 3,
  'license-1': 2,
};

// Full graph data for visualization
const corpusGraphData: GraphData = {
  focusNodeId: 'msa-2024',
  maxDepthLoaded: 2,
  hasMore: true,
  nodes: [
    { id: 'msa-2024', title: 'Master Services Agreement 2024.pdf', documentType: 'pdf', depth: 0, relationshipCount: 4 },
    { id: 'nda-template', title: 'NDA Template Standard.docx', documentType: 'docx', depth: 1, relationshipCount: 2 },
    { id: 'employment-1', title: 'Employment Contract - J. Smith.pdf', documentType: 'pdf', depth: 1, relationshipCount: 3 },
    { id: 'standard-nda', title: 'Standard NDA v2.docx', documentType: 'docx', depth: 1, relationshipCount: 1 },
    { id: 'sow-template', title: 'SOW Template.docx', documentType: 'docx', depth: 1, relationshipCount: 2 },
    { id: 'case-analysis', title: 'Case Analysis Q4.pdf', documentType: 'pdf', depth: 2, relationshipCount: 1, canExpand: true },
  ],
  edges: [
    {
      id: 'e1',
      source: 'msa-2024',
      target: 'nda-template',
      relationship: {
        id: 'r1',
        sourceDocumentId: 'msa-2024',
        targetDocumentId: 'nda-template',
        label: relationshipLabels[0], // cites
        source: 'manual',
      },
    },
    {
      id: 'e2',
      source: 'msa-2024',
      target: 'employment-1',
      relationship: {
        id: 'r2',
        sourceDocumentId: 'msa-2024',
        targetDocumentId: 'employment-1',
        label: relationshipLabels[1], // references
        source: 'analyzer',
        analyzerId: 'ai-relationship-detector',
      },
    },
    {
      id: 'e3',
      source: 'msa-2024',
      target: 'standard-nda',
      relationship: {
        id: 'r3',
        sourceDocumentId: 'msa-2024',
        targetDocumentId: 'standard-nda',
        label: relationshipLabels[3], // supersedes
        source: 'manual',
      },
    },
    {
      id: 'e4',
      source: 'msa-2024',
      target: 'sow-template',
      relationship: {
        id: 'r4',
        sourceDocumentId: 'msa-2024',
        targetDocumentId: 'sow-template',
        label: relationshipLabels[4], // defines terms for
        source: 'manual',
      },
    },
    {
      id: 'e5',
      source: 'sow-template',
      target: 'case-analysis',
      relationship: {
        id: 'r5',
        sourceDocumentId: 'sow-template',
        targetDocumentId: 'case-analysis',
        label: relationshipLabels[1], // references
        source: 'analyzer',
      },
    },
    {
      id: 'e6',
      source: 'nda-template',
      target: 'employment-1',
      relationship: {
        id: 'r6',
        sourceDocumentId: 'nda-template',
        targetDocumentId: 'employment-1',
        label: relationshipLabels[0], // cites
        source: 'manual',
      },
    },
  ],
};

// Helper to get relationships for a specific document
const getRelationshipsForDocument = (docId: string): RelationshipItem[] => {
  const items: RelationshipItem[] = [];
  corpusGraphData.edges.forEach(edge => {
    if (edge.source === docId) {
      const targetNode = corpusGraphData.nodes.find(n => n.id === edge.target);
      if (targetNode) {
        items.push({
          relationship: edge.relationship,
          document: targetNode,
          direction: 'outgoing',
        });
      }
    } else if (edge.target === docId) {
      const sourceNode = corpusGraphData.nodes.find(n => n.id === edge.source);
      if (sourceNode) {
        items.push({
          relationship: edge.relationship,
          document: sourceNode,
          direction: 'incoming',
        });
      }
    }
  });
  return items;
};

// Document card component for redesigned page
interface CorpusDocCardProps {
  doc: typeof corpusDocuments[0] & { relationshipCount?: number };
  selected?: boolean;
  onSelect?: (id: string) => void;
  onRelationshipClick?: (docId: string) => void;
}

const CorpusDocCard: React.FC<CorpusDocCardProps> = ({ doc, selected = false, onSelect, onRelationshipClick }) => {
  const [popoverOpen, setPopoverOpen] = React.useState(false);
  const relationshipCount = doc.relationshipCount || documentRelationshipCounts[doc.id] || 0;
  const relationships = getRelationshipsForDocument(doc.id);

  return (
    <div className={`corpus-doc-card ${selected ? 'corpus-doc-card--selected' : ''}`}>
      <div className="corpus-doc-card__checkbox" onClick={(e) => e.stopPropagation()}>
        <Checkbox checked={selected} onChange={() => onSelect?.(doc.id)} />
      </div>
      <div className="corpus-doc-card__preview">
        {doc.thumbnail ? (
          <img src={doc.thumbnail} alt={doc.name} />
        ) : (
          <div className="corpus-doc-card__preview-placeholder">
            <DocumentIcon />
          </div>
        )}
        <div className="corpus-doc-card__type-badge">
          <Chip size="sm" variant="solid" color="default">
            {doc.type.toUpperCase()}
          </Chip>
        </div>
        {/* Relationship badge on preview */}
        {relationshipCount > 0 && (
          <div className="corpus-doc-card__relationship-badge">
            <Popover
              open={popoverOpen}
              onOpenChange={setPopoverOpen}
              trigger="click"
              placement="bottom"
              content={
                <RelationshipPopoverContent
                  relationships={relationships}
                  onRelationshipClick={(item) => {
                    setPopoverOpen(false);
                    console.log('Navigate to:', item.document.title);
                  }}
                  onViewInGraph={() => {
                    setPopoverOpen(false);
                    onRelationshipClick?.(doc.id);
                  }}
                />
              }
            >
              <RelationshipBadge count={relationshipCount} size="md" />
            </Popover>
          </div>
        )}
      </div>
      <div className="corpus-doc-card__body">
        <h3 className="corpus-doc-card__name" title={doc.name}>{doc.name}</h3>
        <div className="corpus-doc-card__meta">
          <span>{doc.size}</span>
          <span className="corpus-doc-card__meta-sep" />
          <span>{doc.pages} pages</span>
        </div>
        <div className="corpus-doc-card__footer">
          <div className="corpus-doc-card__user">
            <Avatar fallback={doc.uploadedBy.split(' ').map(n => n[0]).join('')} size="xs" />
            <span>{doc.uploadedAt}</span>
          </div>
          <Chip size="sm" variant="soft" color="success">Processed</Chip>
        </div>
      </div>
    </div>
  );
};

// Action dropdown for bulk actions
interface CorpusActionDropdownProps {
  selectedCount: number;
  onClose: () => void;
}

const CorpusActionDropdown: React.FC<CorpusActionDropdownProps> = ({ selectedCount, onClose }) => {
  return (
    <div className="corpus-action-dropdown">
      <div className="corpus-action-dropdown__header">
        {selectedCount} document{selectedCount !== 1 ? 's' : ''} selected
      </div>
      <button className="corpus-action-dropdown__item" onClick={onClose}>
        <DownloadIcon2 />
        Download Selected
      </button>
      <button className="corpus-action-dropdown__item" onClick={onClose}>
        <AddToCorpusIcon2 />
        Move to Folder
      </button>
      <div className="corpus-action-dropdown__separator" />
      <button className="corpus-action-dropdown__item corpus-action-dropdown__item--danger" onClick={onClose}>
        <TrashIcon2 />
        Delete Selected
      </button>
    </div>
  );
};

// Folder card component
interface FolderCardProps {
  folder: FolderItem;
  onClick: () => void;
}

const FolderCard: React.FC<FolderCardProps> = ({ folder, onClick }) => {
  return (
    <div className="corpus-folder-card" onClick={onClick}>
      <div className="corpus-folder-card__icon">
        <FolderIcon />
      </div>
      <div className="corpus-folder-card__content">
        <h3 className="corpus-folder-card__name">{folder.name}</h3>
        <span className="corpus-folder-card__meta">
          {folder.itemCount || 0} item{folder.itemCount !== 1 ? 's' : ''}
        </span>
      </div>
      <span className="corpus-folder-card__arrow">
        <ChevronRightIcon />
      </span>
    </div>
  );
};

// Folder tree item component
interface FolderTreeItemProps {
  folder: FolderItem;
  level: number;
  isActive: boolean;
  isExpanded: boolean;
  onSelect: () => void;
  onToggle: () => void;
  children?: React.ReactNode;
}

const FolderTreeItem: React.FC<FolderTreeItemProps> = ({
  folder,
  level,
  isActive,
  isExpanded,
  onSelect,
  onToggle,
  children,
}) => {
  const hasChildren = folder.children && folder.children.some(c => c.type === 'folder');
  const levelClass = level === 1 ? 'folder-tree-item--nested' : level >= 2 ? 'folder-tree-item--nested-2' : '';

  return (
    <>
      <button
        className={`folder-tree-item ${isActive ? 'folder-tree-item--active' : ''} ${levelClass}`}
        onClick={onSelect}
      >
        <span className="folder-tree-item__icon">
          {isExpanded ? <FolderOpenIcon /> : <FolderIcon />}
        </span>
        {folder.name}
        {hasChildren && (
          <span
            className={`folder-tree-item__expand ${isExpanded ? 'folder-tree-item__expand--open' : ''}`}
            onClick={(e) => { e.stopPropagation(); onToggle(); }}
          >
            <ChevronRightIcon />
          </span>
        )}
      </button>
      {isExpanded && children}
    </>
  );
};

export const Reimagined: StoryObj = {
  name: 'Corpus Detail (Reimagined)',
  render: () => {
    const [activeNav, setActiveNav] = useState('corpuses');
    const [activeSection, setActiveSection] = useState('home');
    const [searchValue, setSearchValue] = useState('');
    const [activeFilter, setActiveFilter] = useState('documents');
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [actionMenuOpen, setActionMenuOpen] = useState(false);
    const [currentPath, setCurrentPath] = useState<string[]>(['Contracts', 'Active']);
    const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['Contracts']));
    const [chatValue, setChatValue] = useState('');
    // Graph view state
    const [documentsViewMode, setDocumentsViewMode] = useState<'grid' | 'graph'>('grid');
    const [graphFocusNodeId, setGraphFocusNodeId] = useState<string | undefined>('msa-2024');
    const [graphFilters, setGraphFilters] = useState<string[]>([]);

    // Section navigation items
    const sectionNavItems = [
      { id: 'home', icon: <HomeIcon />, label: 'Home' },
      { id: 'documents', icon: <DocumentIcon />, label: 'Documents', badge: 7 },
      { id: 'annotations', icon: <AnnotationIcon />, label: 'Annotations', badge: 2 },
      { id: 'extracts', icon: <ExtractIcon />, label: 'Extracts', badge: 12 },
      { id: 'analyses', icon: <AnalysisIcon />, label: 'Analyses', badge: 3 },
      { id: 'discussions', icon: <DiscussionIcon />, label: 'Discussions', badge: 3 },
      { id: 'chats', icon: <ChatIcon />, label: 'Chats', badge: 5 },
      { id: 'badges', icon: <BadgeIcon />, label: 'Badges' },
      { id: 'settings', icon: <SettingsIcon />, label: 'Settings' },
    ];

    const filterItems = [
      { id: 'documents', label: 'Documents', count: 7 },
      { id: 'annotations', label: 'Annotations', count: 2 },
      { id: 'discussions', label: 'Discussions', count: 1 },
    ];

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

    const navigateToFolder = (path: string[]) => {
      setCurrentPath(path);
      setSelectedIds(new Set());
    };

    const toggleFolder = (folderId: string) => {
      setExpandedFolders(prev => {
        const next = new Set(prev);
        if (next.has(folderId)) {
          next.delete(folderId);
        } else {
          next.add(folderId);
        }
        return next;
      });
    };

    // Helper for FSItem navigation
    const getFSItemsAtPath = (path: string[], items: FSItem[]): FSItem[] => {
      if (path.length === 0) return items;
      let current = items;
      for (const segment of path) {
        const folder = current.find(item => item.type === 'folder' && item.name === segment) as FolderItem | undefined;
        if (folder?.children) {
          current = folder.children;
        } else {
          return [];
        }
      }
      return current;
    };

    // Get current folder contents
    const currentItems = getFSItemsAtPath(currentPath, corpusFileSystem);
    const folders = currentItems.filter((item): item is FolderItem => item.type === 'folder');
    const documents = currentItems.filter((item): item is DocItem => item.type === 'document');

    // Render folder tree recursively
    const renderFolderTree = (items: FSItem[], level: number = 0, parentPath: string[] = []): React.ReactNode => {
      return items
        .filter((item): item is FolderItem => item.type === 'folder')
        .map(folder => {
          const folderPath = [...parentPath, folder.name];
          const isActive = JSON.stringify(currentPath) === JSON.stringify(folderPath);
          const isExpanded = expandedFolders.has(folder.id);

          return (
            <FolderTreeItem
              key={folder.id}
              folder={folder}
              level={level}
              isActive={isActive}
              isExpanded={isExpanded}
              onSelect={() => navigateToFolder(folderPath)}
              onToggle={() => toggleFolder(folder.id)}
            >
              {folder.children && renderFolderTree(folder.children, level + 1, folderPath)}
            </FolderTreeItem>
          );
        });
    };

    return (
      <>
        <style>{reimaginedPageStyles}</style>
        <div className="corpus-detail-page">
          <NavBar
            brandName="Open Contracts"
            version="v3.0.0b3"
            items={navItems}
            activeId={activeNav}
            onNavigate={setActiveNav}
            userName="John Scrudato"
            userMenuItems={userMenuItems}
          />

          <div className="corpus-detail-layout">
            {/* Refined sidebar with corpus metadata */}
            <aside className="corpus-detail-sidebar">
              <div className="corpus-detail-sidebar__header">
                <div className="corpus-detail-sidebar__avatar">MC</div>
                <h2 className="corpus-detail-sidebar__name">My First Corpus</h2>
                <div className="corpus-detail-sidebar__meta">
                  <span className="corpus-detail-sidebar__visibility">
                    <LockIcon />
                    Private
                  </span>
                  <span>Created Dec 2024</span>
                </div>
                <p className="corpus-detail-sidebar__description">
                  A collection of client contracts and legal templates for the Q4 2024 review process.
                </p>
              </div>

              {/* Section navigation */}
              <nav className="corpus-section-nav">
                <div className="corpus-section-nav__group">
                  <div className="corpus-section-nav__label">Overview</div>
                  {sectionNavItems.slice(0, 1).map(item => (
                    <button
                      key={item.id}
                      className={`corpus-section-nav__item ${activeSection === item.id ? 'corpus-section-nav__item--active' : ''}`}
                      onClick={() => setActiveSection(item.id)}
                    >
                      <span className="corpus-section-nav__icon">{item.icon}</span>
                      {item.label}
                      {item.badge && <span className="corpus-section-nav__badge">{item.badge}</span>}
                    </button>
                  ))}
                </div>

                <div className="corpus-section-nav__group">
                  <div className="corpus-section-nav__label">Content</div>
                  {sectionNavItems.slice(1, 7).map(item => (
                    <button
                      key={item.id}
                      className={`corpus-section-nav__item ${activeSection === item.id ? 'corpus-section-nav__item--active' : ''}`}
                      onClick={() => setActiveSection(item.id)}
                    >
                      <span className="corpus-section-nav__icon">{item.icon}</span>
                      {item.label}
                      {item.badge && <span className="corpus-section-nav__badge">{item.badge}</span>}
                    </button>
                  ))}
                </div>

                <div className="corpus-section-nav__group">
                  <div className="corpus-section-nav__label">Configure</div>
                  {sectionNavItems.slice(7).map(item => (
                    <button
                      key={item.id}
                      className={`corpus-section-nav__item ${activeSection === item.id ? 'corpus-section-nav__item--active' : ''}`}
                      onClick={() => setActiveSection(item.id)}
                    >
                      <span className="corpus-section-nav__icon">{item.icon}</span>
                      {item.label}
                      {item.badge && <span className="corpus-section-nav__badge">{item.badge}</span>}
                    </button>
                  ))}
                </div>
              </nav>

              <div className="corpus-detail-sidebar__footer">
                <Button variant="primary" size="sm" fullWidth leftIcon={<PlusIcon />}>
                  Upload Document
                </Button>
              </div>
            </aside>

            {/* Main content */}
            <main className="corpus-detail-main">
              <div className="corpus-detail-content">
                {/* HOME SECTION */}
                {activeSection === 'home' && (
                  <>
                    {/* Hero section with chat */}
                    <section className="corpus-detail-hero">
                      <div className="corpus-detail-hero__breadcrumb">
                        <a href="#">Corpuses</a>
                        <span className="corpus-detail-hero__breadcrumb-sep">/</span>
                        <span>My First Corpus</span>
                      </div>
                      <h1 className="corpus-detail-hero__title">
                        My First <span>Corpus</span>
                      </h1>
                      <p className="corpus-detail-hero__subtitle">
                        A collection of client contracts and legal templates for the Q4 2024 review process.
                        Collaborate with your team on contract analysis and review.
                      </p>

                      {/* Chat bar - featured prominently */}
                      <div className="corpus-chat-bar">
                        <div className="corpus-chat-bar__container">
                          <input
                            type="text"
                            className="corpus-chat-bar__input"
                            placeholder="Ask about this corpus..."
                            value={chatValue}
                            onChange={(e) => setChatValue(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && chatValue.trim()) {
                                console.log('Chat:', chatValue);
                                setChatValue('');
                              }
                            }}
                          />
                          <div className="corpus-chat-bar__actions">
                            <button
                              className="corpus-chat-bar__btn corpus-chat-bar__btn--history"
                              title="Chat history"
                              onClick={() => setActiveSection('chats')}
                            >
                              <HistoryIcon />
                            </button>
                            <button
                              className="corpus-chat-bar__btn corpus-chat-bar__btn--send"
                              title="Send message"
                              disabled={!chatValue.trim()}
                              onClick={() => {
                                if (chatValue.trim()) {
                                  console.log('Chat:', chatValue);
                                  setChatValue('');
                                }
                              }}
                            >
                              <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
                                <path d="M9.804 2.298a.9.9 0 00-1.608 0l-6.3 12.6a.9.9 0 001.052 1.268l4.5-1.286A.9.9 0 008.1 14.014V10.5a.9.9 0 011.8 0v3.514a.9.9 0 00.652.866l4.5 1.285a.9.9 0 001.053-1.267l-6.3-12.6z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <p className="corpus-chat-bar__hint">
                          Ask questions about documents, get summaries, or explore your corpus with AI
                        </p>
                      </div>
                    </section>

                    {/* Expanded markdown content block */}
                    <div className="corpus-home-content corpus-home-content--expanded">
                      <h2>About this Corpus</h2>
                      <p>
                        This corpus contains client contracts and legal templates used during our Q4 2024 review process.
                        All documents have been reviewed and annotated by the legal team.
                      </p>

                      <h3>Key Objectives</h3>
                      <ul>
                        <li>Review and standardize contract language across all client agreements</li>
                        <li>Identify clauses that need updating for 2025 compliance requirements</li>
                        <li>Extract key terms and obligations using our AI-powered analysis tools</li>
                        <li>Train junior associates on contract review best practices</li>
                      </ul>

                      <h3>Document Summary</h3>
                      <p>
                        The corpus consists of <strong>7 documents</strong> totaling <strong>67 pages</strong> of content.
                        Our team has applied <strong>2 annotation sets</strong> to identify key clauses, obligations,
                        and potential risks across the document collection.
                      </p>

                      <h3>Getting Started</h3>
                      <p>
                        Use the <code>Documents</code> section to browse and organize files by folder structure.
                        Explore <code>Annotations</code> to see labeled clauses and entities, or check
                        <code>Extracts</code> to view structured data pulled from your contracts.
                      </p>
                      <p>
                        Have questions? Use the chat bar above to ask about any document in this corpus.
                        The AI assistant can summarize content, compare clauses, and help you find specific information.
                      </p>
                    </div>
                  </>
                )}

                {/* DOCUMENTS SECTION */}
                {activeSection === 'documents' && (
                  <section>
                    <div className="corpus-detail-section-header">
                      <h2 className="corpus-detail-section-title">Documents</h2>
                      <HStack gap="sm">
                        {/* View toggle */}
                        <div className="corpus-view-toggle">
                          <button
                            className={`corpus-view-toggle__btn ${documentsViewMode === 'grid' ? 'corpus-view-toggle__btn--active' : ''}`}
                            onClick={() => setDocumentsViewMode('grid')}
                            title="Grid view"
                          >
                            <GridIcon />
                          </button>
                          <button
                            className={`corpus-view-toggle__btn ${documentsViewMode === 'graph' ? 'corpus-view-toggle__btn--active' : ''}`}
                            onClick={() => setDocumentsViewMode('graph')}
                            title="Graph view"
                          >
                            <GraphIcon />
                          </button>
                        </div>
                        {documentsViewMode === 'grid' && (
                          <>
                            <Button variant="ghost" size="sm" leftIcon={<NewFolderIcon2 />}>
                              New Folder
                            </Button>
                            {selectedIds.size > 0 ? (
                              <Popover
                                open={actionMenuOpen}
                                onOpenChange={setActionMenuOpen}
                                placement="bottom"
                                content={
                                  <CorpusActionDropdown
                                    selectedCount={selectedIds.size}
                                    onClose={() => setActionMenuOpen(false)}
                                  />
                                }
                              >
                                <Button variant="primary" size="sm" rightIcon={<ChevronDownIcon2 />}>
                                  {selectedIds.size} Selected
                                </Button>
                              </Popover>
                            ) : (
                              <Button variant="primary" size="sm" leftIcon={<PlusIcon />}>
                                Upload
                              </Button>
                            )}
                          </>
                        )}
                      </HStack>
                    </div>

                    {/* GRAPH VIEW */}
                    {documentsViewMode === 'graph' && (
                      <div className="corpus-graph-container">
                        <DocumentGraph
                          data={{
                            ...corpusGraphData,
                            focusNodeId: graphFocusNodeId,
                          }}
                          selectedNodeId={graphFocusNodeId}
                          onNodeSelect={(node) => {
                            if (node) {
                              setGraphFocusNodeId(node.id);
                            }
                          }}
                          onNodeExpand={(node) => {
                            console.log('Expand:', node.title);
                          }}
                          relationshipLabels={relationshipLabels}
                          activeFilters={graphFilters}
                          onFiltersChange={setGraphFilters}
                          canLoadMore={corpusGraphData.hasMore}
                          onLoadMore={() => console.log('Load more connections')}
                          initialLayout="force"
                        />
                      </div>
                    )}

                    {/* GRID VIEW */}
                    {documentsViewMode === 'grid' && (
                    <div className="corpus-fs-layout">
                      {/* Folder tree sidebar */}
                      <div className="corpus-fs-sidebar">
                        <div className="corpus-fs-sidebar__header">Folders</div>
                        <div className="corpus-fs-sidebar__tree">
                          {/* Root item */}
                          <button
                            className={`folder-tree-item ${currentPath.length === 0 ? 'folder-tree-item--active' : ''}`}
                            onClick={() => navigateToFolder([])}
                          >
                            <span className="folder-tree-item__icon"><HomeIcon2 /></span>
                            All Documents
                          </button>
                          {renderFolderTree(corpusFileSystem)}
                        </div>
                      </div>

                      {/* File list main area */}
                      <div className="corpus-fs-main">
                        {/* Toolbar with breadcrumb */}
                        <div className="corpus-fs-toolbar">
                          <div className="corpus-fs-breadcrumb">
                            <button
                              className="corpus-fs-breadcrumb__item"
                              onClick={() => navigateToFolder([])}
                            >
                              <HomeIcon2 />
                            </button>
                            {currentPath.map((segment, index) => (
                              <React.Fragment key={index}>
                                <span className="corpus-fs-breadcrumb__sep">/</span>
                                <button
                                  className={`corpus-fs-breadcrumb__item ${index === currentPath.length - 1 ? 'corpus-fs-breadcrumb__item--current' : ''}`}
                                  onClick={() => navigateToFolder(currentPath.slice(0, index + 1))}
                                >
                                  {segment}
                                </button>
                              </React.Fragment>
                            ))}
                          </div>
                        </div>

                        {/* Content area */}
                        <div className="corpus-fs-content">
                          {/* Folders */}
                          {folders.length > 0 && (
                            <>
                              <div className="corpus-fs-section-label">Folders</div>
                              <div className="corpus-fs-grid corpus-fs-grid--folders">
                                {folders.map(folder => (
                                  <FolderCard
                                    key={folder.id}
                                    folder={folder}
                                    onClick={() => navigateToFolder([...currentPath, folder.name])}
                                  />
                                ))}
                              </div>
                            </>
                          )}

                          {/* Documents */}
                          {documents.length > 0 && (
                            <>
                              <div className="corpus-fs-section-label">Documents</div>
                              <div className="corpus-fs-grid">
                                {documents.map(doc => (
                                  <CorpusDocCard
                                    key={doc.id}
                                    doc={{
                                      id: doc.id,
                                      name: doc.name,
                                      type: doc.docType,
                                      size: doc.size,
                                      pages: doc.pages,
                                      uploadedBy: doc.uploadedBy,
                                      uploadedAt: doc.uploadedAt,
                                      thumbnail: doc.thumbnail,
                                    }}
                                    selected={selectedIds.has(doc.id)}
                                    onSelect={handleSelect}
                                    onRelationshipClick={(docId) => {
                                      setGraphFocusNodeId(docId);
                                      setDocumentsViewMode('graph');
                                    }}
                                  />
                                ))}
                              </div>
                            </>
                          )}

                          {/* Empty state */}
                          {folders.length === 0 && documents.length === 0 && (
                            <EmptyState
                              icon={<FolderOpenIcon />}
                              title="This folder is empty"
                              description="Upload documents or create subfolders to organize your corpus."
                              action={
                                <Button variant="primary" leftIcon={<PlusIcon />}>
                                  Upload Document
                                </Button>
                              }
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    )}
                  </section>
                )}

                {/* ANNOTATIONS SECTION */}
                {activeSection === 'annotations' && (
                  <section>
                    <div className="corpus-detail-section-header">
                      <h2 className="corpus-detail-section-title">Annotations</h2>
                      <Button variant="primary" size="sm" leftIcon={<PlusIcon />}>
                        New Annotation
                      </Button>
                    </div>
                    <div className="corpus-section-placeholder">
                      <div className="corpus-section-placeholder__icon">
                        <AnnotationIcon />
                      </div>
                      <h3 className="corpus-section-placeholder__title">Annotations Browser</h3>
                      <p className="corpus-section-placeholder__description">
                        View and manage annotations applied to documents in this corpus.
                        Filter by label type, document, or annotator.
                      </p>
                      <Button variant="primary" leftIcon={<PlusIcon />}>
                        Create Annotation
                      </Button>
                    </div>
                  </section>
                )}

                {/* EXTRACTS SECTION */}
                {activeSection === 'extracts' && (
                  <section>
                    <div className="corpus-detail-section-header">
                      <h2 className="corpus-detail-section-title">Extracts</h2>
                      <Button variant="primary" size="sm" leftIcon={<PlusIcon />}>
                        New Extract
                      </Button>
                    </div>
                    <div className="corpus-section-placeholder">
                      <div className="corpus-section-placeholder__icon">
                        <ExtractIcon />
                      </div>
                      <h3 className="corpus-section-placeholder__title">Data Extracts</h3>
                      <p className="corpus-section-placeholder__description">
                        View extracted data from documents including key terms, dates, parties,
                        and custom fields defined by your extraction schemas.
                      </p>
                      <Button variant="primary" leftIcon={<PlusIcon />}>
                        Run Extraction
                      </Button>
                    </div>
                  </section>
                )}

                {/* ANALYSES SECTION */}
                {activeSection === 'analyses' && (
                  <section>
                    <div className="corpus-detail-section-header">
                      <h2 className="corpus-detail-section-title">Analyses</h2>
                      <Button variant="primary" size="sm" leftIcon={<PlusIcon />}>
                        New Analysis
                      </Button>
                    </div>
                    <div className="corpus-section-placeholder">
                      <div className="corpus-section-placeholder__icon">
                        <AnalysisIcon />
                      </div>
                      <h3 className="corpus-section-placeholder__title">AI-Powered Analyses</h3>
                      <p className="corpus-section-placeholder__description">
                        Run AI analyses across your corpus to identify patterns, risks,
                        and insights. Configure custom prompts and review results.
                      </p>
                      <Button variant="primary" leftIcon={<PlusIcon />}>
                        Start Analysis
                      </Button>
                    </div>
                  </section>
                )}

                {/* DISCUSSIONS SECTION */}
                {activeSection === 'discussions' && (
                  <section>
                    <div className="corpus-detail-section-header">
                      <h2 className="corpus-detail-section-title">Discussions</h2>
                      <Button variant="primary" size="sm" leftIcon={<PlusIcon />}>
                        New Discussion
                      </Button>
                    </div>
                    <div className="corpus-section-placeholder">
                      <div className="corpus-section-placeholder__icon">
                        <DiscussionIcon />
                      </div>
                      <h3 className="corpus-section-placeholder__title">Team Discussions</h3>
                      <p className="corpus-section-placeholder__description">
                        Start conversations about documents, share insights with your team,
                        and collaborate on contract review and analysis.
                      </p>
                      <Button variant="primary" leftIcon={<PlusIcon />}>
                        Start Discussion
                      </Button>
                    </div>
                  </section>
                )}

                {/* CHATS SECTION */}
                {activeSection === 'chats' && (
                  <section>
                    <div className="corpus-detail-section-header">
                      <h2 className="corpus-detail-section-title">AI Chats</h2>
                      <Button variant="primary" size="sm" leftIcon={<PlusIcon />}>
                        New Chat
                      </Button>
                    </div>
                    <div className="corpus-section-placeholder">
                      <div className="corpus-section-placeholder__icon">
                        <ChatIcon />
                      </div>
                      <h3 className="corpus-section-placeholder__title">AI-Powered Chat</h3>
                      <p className="corpus-section-placeholder__description">
                        Chat with AI about your corpus documents. Ask questions,
                        get summaries, and explore your contracts with natural language.
                      </p>
                      <Button variant="primary" leftIcon={<PlusIcon />}>
                        Start New Chat
                      </Button>
                    </div>
                  </section>
                )}

                {/* BADGES SECTION */}
                {activeSection === 'badges' && (
                  <section>
                    <div className="corpus-detail-section-header">
                      <h2 className="corpus-detail-section-title">Badges</h2>
                      <Button variant="primary" size="sm" leftIcon={<PlusIcon />}>
                        New Badge
                      </Button>
                    </div>
                    <div className="corpus-section-placeholder">
                      <div className="corpus-section-placeholder__icon">
                        <BadgeIcon />
                      </div>
                      <h3 className="corpus-section-placeholder__title">Document Badges</h3>
                      <p className="corpus-section-placeholder__description">
                        Manage badges and labels that can be applied to documents
                        for quick categorization and filtering.
                      </p>
                      <Button variant="primary" leftIcon={<PlusIcon />}>
                        Create Badge
                      </Button>
                    </div>
                  </section>
                )}

                {/* SETTINGS SECTION */}
                {activeSection === 'settings' && (
                  <section>
                    <div className="corpus-detail-section-header">
                      <h2 className="corpus-detail-section-title">Settings</h2>
                    </div>
                    <div className="corpus-section-placeholder">
                      <div className="corpus-section-placeholder__icon">
                        <SettingsIcon />
                      </div>
                      <h3 className="corpus-section-placeholder__title">Corpus Settings</h3>
                      <p className="corpus-section-placeholder__description">
                        Configure corpus permissions, sharing settings, metadata,
                        and integration options.
                      </p>
                      <Button variant="secondary">
                        Edit Settings
                      </Button>
                    </div>
                  </section>
                )}
              </div>
            </main>
          </div>
        </div>
      </>
    );
  },
};

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
