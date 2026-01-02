import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NavBar } from '../NavBar';
import { PageHeader } from '../PageHeader';
import { Button, IconButton } from '../Button';
import { Card, CardHeader, CardBody } from '../Card';
import { HStack, VStack, Spacer } from '../Stack';
import { Avatar, AvatarGroup } from '../Avatar';
import { Input } from '../Input';
import { Textarea } from '../Textarea';
import { Select } from '../Select';
import { Popover } from '../Popover';
import { Toggle } from '../Toggle';
import { StatBlock, StatGrid } from '../StatBlock';
import { Chip } from '../Chip';
import { EmptyState as EmptyStateComponent } from '../EmptyState';

const meta: Meta = {
  title: 'Pages/LabelSetDetailPage',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

// ═══════════════════════════════════════════════════════════════
// ICONS
// ═══════════════════════════════════════════════════════════════

const ChevronLeftIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11.25 13.5L6.75 9l4.5-4.5" />
  </svg>
);

const OverviewIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="5" height="5" rx="1" />
    <rect x="10" y="3" width="5" height="5" rx="1" />
    <rect x="3" y="10" width="5" height="5" rx="1" />
    <rect x="10" y="10" width="5" height="5" rx="1" />
  </svg>
);

const DocLabelIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.5 1.5H4.5a1.5 1.5 0 00-1.5 1.5v12a1.5 1.5 0 001.5 1.5h9a1.5 1.5 0 001.5-1.5V6L10.5 1.5z" />
    <path d="M10.5 1.5V6H15" />
    <path d="M6 9h6M6 12h4" />
  </svg>
);

const SpanLabelIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 5.25h12M3 9h8M3 12.75h10" />
    <rect x="11" y="7.5" width="4" height="3" rx="0.5" fill="currentColor" opacity="0.2" stroke="currentColor" />
  </svg>
);

const ShareIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="13.5" cy="3.75" r="2.25" />
    <circle cx="4.5" cy="9" r="2.25" />
    <circle cx="13.5" cy="14.25" r="2.25" />
    <path d="M6.54 10.11l4.92 3.03M11.46 4.86L6.54 7.89" />
  </svg>
);

const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11.5 2.5a1.77 1.77 0 012.5 2.5L5.25 13.75 1.5 14.5l.75-3.75L11.5 2.5z" />
  </svg>
);

const PlusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M9 3.75v10.5M3.75 9h10.5" />
  </svg>
);

const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 4h12M5.33 4V2.67a.67.67 0 01.67-.67h4a.67.67 0 01.67.67V4M12.67 4v9.33a.67.67 0 01-.67.67H4a.67.67 0 01-.67-.67V4" />
  </svg>
);

const CopyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="5" width="9" height="9" rx="1" />
    <path d="M3 11V3a1 1 0 011-1h8" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 2v9M4.5 7.5L8 11l3.5-3.5M2 14h12" />
  </svg>
);

const GripIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" opacity="0.4">
    <circle cx="5" cy="4" r="1.5" />
    <circle cx="11" cy="4" r="1.5" />
    <circle cx="5" cy="8" r="1.5" />
    <circle cx="11" cy="8" r="1.5" />
    <circle cx="5" cy="12" r="1.5" />
    <circle cx="11" cy="12" r="1.5" />
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 8.5l3.5 3.5 6.5-7" />
  </svg>
);

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M4 4l8 8M12 4l-8 8" />
  </svg>
);

const LabelSetIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 8H10a4 4 0 00-4 4v24a4 4 0 004 4h28a4 4 0 004-4V20" />
    <path d="M32 6l8 8-16 16H16v-8L32 6z" />
  </svg>
);

const GlobeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="9" r="7.5" />
    <path d="M1.5 9h15M9 1.5c2.07 2.32 3.24 5.3 3.24 8.5s-1.17 6.18-3.24 8.5c-2.07-2.32-3.24-5.3-3.24-8.5S6.93 3.82 9 1.5z" />
  </svg>
);

const LockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4.5" y="8.25" width="9" height="7.5" rx="1.5" />
    <path d="M6.75 8.25V5.25a2.25 2.25 0 014.5 0v3" />
  </svg>
);

const LinkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6.67 8.67a3 3 0 004.24 0l2-2a3 3 0 00-4.24-4.24l-1.15 1.14" />
    <path d="M9.33 7.33a3 3 0 00-4.24 0l-2 2a3 3 0 004.24 4.24l1.14-1.14" />
  </svg>
);

const UserPlusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 15v-1.5a3 3 0 00-3-3H5.25a3 3 0 00-3 3V15" />
    <circle cx="7.125" cy="5.25" r="3" />
    <path d="M15 6v4.5M17.25 8.25h-4.5" />
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

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="7" cy="7" r="5" />
    <path d="M14 14l-3.5-3.5" />
  </svg>
);

const TagIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M33.3 19.5L19.5 33.3a2.5 2.5 0 01-3.5 0L6.7 24a2.5 2.5 0 010-3.5L20.5 6.7A2.5 2.5 0 0122.3 6H32.5A2.5 2.5 0 0135 8.5v10.2a2.5 2.5 0 01-.7 1.8z" />
    <circle cx="27.5" cy="13.5" r="2" />
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

interface Label {
  id: string;
  name: string;
  description: string;
  color: string;
  usageCount: number;
}

const sampleDocLabels: Label[] = [
  { id: '1', name: 'Employment Agreement', description: 'Standard employment contract between employer and employee', color: '#0F766E', usageCount: 156 },
  { id: '2', name: 'NDA', description: 'Non-disclosure and confidentiality agreement', color: '#7C3AED', usageCount: 89 },
  { id: '3', name: 'Service Agreement', description: 'Contract for professional services', color: '#2563EB', usageCount: 67 },
  { id: '4', name: 'License Agreement', description: 'Software or intellectual property license', color: '#DC2626', usageCount: 45 },
  { id: '5', name: 'Purchase Agreement', description: 'Asset or goods purchase contract', color: '#D97706', usageCount: 34 },
];

const sampleSpanLabels: Label[] = [
  { id: '1', name: 'Party Name', description: 'Name of a contracting party', color: '#0F766E', usageCount: 423 },
  { id: '2', name: 'Effective Date', description: 'Date when agreement becomes effective', color: '#2563EB', usageCount: 312 },
  { id: '3', name: 'Term Duration', description: 'Length of the agreement term', color: '#7C3AED', usageCount: 287 },
  { id: '4', name: 'Payment Amount', description: 'Monetary value or payment terms', color: '#059669', usageCount: 198 },
  { id: '5', name: 'Governing Law', description: 'Jurisdiction governing the agreement', color: '#DC2626', usageCount: 156 },
  { id: '6', name: 'Termination Clause', description: 'Conditions for ending the agreement', color: '#D97706', usageCount: 134 },
];

const sampleCollaborators = [
  { id: '1', name: 'John Scrudato', email: 'john@example.com', role: 'owner', avatar: '' },
  { id: '2', name: 'Sarah Chen', email: 'sarah@example.com', role: 'editor', avatar: '' },
  { id: '3', name: 'Mike Johnson', email: 'mike@example.com', role: 'viewer', avatar: '' },
];

// ═══════════════════════════════════════════════════════════════
// PAGE STYLES
// ═══════════════════════════════════════════════════════════════

const pageStyles = `
  .labelset-page {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background: var(--oc-bg-canvas, #FAFAFA);
    font-family: var(--oc-font-family, 'Inter', -apple-system, BlinkMacSystemFont, sans-serif);
  }

  .labelset-layout {
    display: flex;
    flex: 1;
    overflow: hidden;
  }

  /* Sidebar */
  .labelset-sidebar {
    width: 260px;
    min-width: 260px;
    background: var(--oc-bg-surface, white);
    border-right: 1px solid var(--oc-border-default, #E2E8F0);
    display: flex;
    flex-direction: column;
  }

  .labelset-sidebar__header {
    padding: 24px 20px;
    border-bottom: 1px solid var(--oc-border-default, #E2E8F0);
  }

  .labelset-sidebar__back {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    font-weight: 500;
    color: var(--oc-fg-secondary, #475569);
    text-decoration: none;
    padding: 6px 10px 6px 6px;
    margin: -6px -10px -6px -6px;
    border-radius: 6px;
    transition: all 0.15s ease;
    cursor: pointer;
    background: none;
    border: none;
  }

  .labelset-sidebar__back:hover {
    background: var(--oc-bg-surface-hover, #F1F5F9);
    color: var(--oc-fg-primary, #1E293B);
  }

  .labelset-sidebar__nav {
    flex: 1;
    padding: 12px 0;
    overflow-y: auto;
  }

  .labelset-sidebar__item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 20px;
    font-size: 14px;
    font-weight: 500;
    color: var(--oc-fg-secondary, #475569);
    cursor: pointer;
    transition: all 0.15s ease;
    border: none;
    background: none;
    width: 100%;
    text-align: left;
  }

  .labelset-sidebar__item:hover {
    background: var(--oc-bg-surface-hover, #F8FAFC);
    color: var(--oc-fg-primary, #1E293B);
  }

  .labelset-sidebar__item--active {
    background: linear-gradient(90deg, rgba(15, 118, 110, 0.08) 0%, transparent 100%);
    color: var(--oc-accent, #0F766E);
    border-left: 2px solid var(--oc-accent, #0F766E);
    padding-left: 18px;
  }

  .labelset-sidebar__item-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }

  .labelset-sidebar__item-badge {
    margin-left: auto;
    font-size: 12px;
    font-weight: 600;
    color: var(--oc-fg-tertiary, #94A3B8);
    background: var(--oc-bg-surface-hover, #F1F5F9);
    padding: 2px 8px;
    border-radius: 10px;
  }

  .labelset-sidebar__item--active .labelset-sidebar__item-badge {
    background: var(--oc-accent, #0F766E);
    color: white;
  }

  .labelset-sidebar__footer {
    padding: 16px 20px;
    border-top: 1px solid var(--oc-border-default, #E2E8F0);
  }

  /* Main Content */
  .labelset-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .labelset-main__header {
    padding: 24px 40px;
    background: var(--oc-bg-surface, white);
    border-bottom: 1px solid var(--oc-border-default, #E2E8F0);
  }

  .labelset-main__header-row {
    display: flex;
    align-items: flex-start;
    gap: 20px;
  }

  .labelset-main__header-content {
    flex: 1;
    min-width: 0;
  }

  .labelset-main__title-row {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 4px;
  }

  .labelset-main__title {
    font-size: 24px;
    font-weight: 600;
    color: var(--oc-fg-primary, #1E293B);
    margin: 0;
  }

  .labelset-main__title-input {
    font-size: 24px;
    font-weight: 600;
    color: var(--oc-fg-primary, #1E293B);
    background: transparent;
    border: none;
    border-bottom: 2px solid var(--oc-accent, #0F766E);
    outline: none;
    padding: 0 0 4px 0;
    margin: 0;
    width: 100%;
    max-width: 400px;
  }

  .labelset-main__meta {
    font-size: 14px;
    color: var(--oc-fg-secondary, #475569);
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .labelset-main__meta-sep {
    color: var(--oc-border-default, #E2E8F0);
  }

  .labelset-main__actions {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }

  .labelset-main__content {
    flex: 1;
    overflow-y: auto;
    padding: 32px 40px;
  }

  .labelset-main__inner {
    max-width: 900px;
  }

  /* Overview Section */
  .overview-section {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  .overview-hero {
    display: flex;
    gap: 32px;
    align-items: flex-start;
  }

  .overview-icon {
    width: 120px;
    height: 120px;
    background: linear-gradient(135deg, var(--oc-bg-surface-hover, #F8FAFC) 0%, var(--oc-bg-canvas, #F1F5F9) 100%);
    border: 1px solid var(--oc-border-default, #E2E8F0);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--oc-fg-tertiary, #94A3B8);
    flex-shrink: 0;
    position: relative;
    overflow: hidden;
    transition: all 0.2s ease;
  }

  .overview-icon:hover {
    border-color: var(--oc-accent, #0F766E);
  }

  .overview-icon--custom {
    background: none;
    border: none;
  }

  .overview-icon__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 16px;
  }

  .overview-icon__edit {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.2s ease;
    cursor: pointer;
    color: white;
    border-radius: 16px;
  }

  .overview-icon:hover .overview-icon__edit {
    opacity: 1;
  }

  .overview-details {
    flex: 1;
    min-width: 0;
  }

  .overview-description {
    font-size: 15px;
    line-height: 1.6;
    color: var(--oc-fg-secondary, #475569);
    margin: 0 0 24px 0;
    max-width: 600px;
  }

  .overview-description--editing {
    width: 100%;
    max-width: 600px;
    min-height: 80px;
    padding: 12px;
    font-size: 15px;
    line-height: 1.6;
    color: var(--oc-fg-primary, #1E293B);
    border: 1px solid var(--oc-border-default, #E2E8F0);
    border-radius: 8px;
    resize: vertical;
    outline: none;
    font-family: inherit;
  }

  .overview-description--editing:focus {
    border-color: var(--oc-accent, #0F766E);
    box-shadow: 0 0 0 3px rgba(15, 118, 110, 0.1);
  }

  .overview-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    max-width: 500px;
  }

  .overview-stat {
    background: var(--oc-bg-surface, white);
    border: 1px solid var(--oc-border-default, #E2E8F0);
    border-radius: 12px;
    padding: 16px 20px;
  }

  .overview-stat__value {
    font-size: 28px;
    font-weight: 600;
    color: var(--oc-accent, #0F766E);
    line-height: 1;
    margin-bottom: 4px;
  }

  .overview-stat__label {
    font-size: 13px;
    color: var(--oc-fg-secondary, #475569);
  }

  .overview-actions {
    display: flex;
    gap: 12px;
    padding-top: 8px;
  }

  /* Labels Section */
  .labels-section {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .labels-header {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .labels-search {
    position: relative;
    flex: 1;
    max-width: 320px;
  }

  .labels-search__icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--oc-fg-tertiary, #94A3B8);
    pointer-events: none;
  }

  .labels-search__input {
    width: 100%;
    padding: 10px 12px 10px 40px;
    font-size: 14px;
    border: 1px solid var(--oc-border-default, #E2E8F0);
    border-radius: 8px;
    background: var(--oc-bg-surface, white);
    color: var(--oc-fg-primary, #1E293B);
    outline: none;
    transition: all 0.15s ease;
  }

  .labels-search__input:focus {
    border-color: var(--oc-accent, #0F766E);
    box-shadow: 0 0 0 3px rgba(15, 118, 110, 0.1);
  }

  .labels-search__input::placeholder {
    color: var(--oc-fg-tertiary, #94A3B8);
  }

  .labels-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .label-item {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px 20px;
    background: var(--oc-bg-surface, white);
    border: 1px solid var(--oc-border-default, #E2E8F0);
    border-radius: 10px;
    transition: all 0.15s ease;
  }

  .label-item:hover {
    border-color: var(--oc-border-strong, #CBD5E1);
    box-shadow: var(--oc-shadow-sm, 0 1px 2px rgba(15, 23, 42, 0.04));
  }

  .label-item__grip {
    cursor: grab;
    color: var(--oc-fg-tertiary, #94A3B8);
    flex-shrink: 0;
  }

  .label-item__grip:active {
    cursor: grabbing;
  }

  .label-item__color {
    width: 14px;
    height: 14px;
    border-radius: 4px;
    flex-shrink: 0;
    cursor: pointer;
    transition: transform 0.15s ease;
  }

  .label-item__color:hover {
    transform: scale(1.2);
  }

  .label-item__content {
    flex: 1;
    min-width: 0;
  }

  .label-item__name {
    font-size: 15px;
    font-weight: 500;
    color: var(--oc-fg-primary, #1E293B);
    margin: 0 0 2px 0;
  }

  .label-item__name-input {
    font-size: 15px;
    font-weight: 500;
    color: var(--oc-fg-primary, #1E293B);
    background: transparent;
    border: none;
    border-bottom: 1px solid var(--oc-accent, #0F766E);
    outline: none;
    padding: 0 0 2px 0;
    margin: 0 0 2px 0;
    width: 100%;
  }

  .label-item__description {
    font-size: 13px;
    color: var(--oc-fg-secondary, #475569);
    margin: 0;
  }

  .label-item__description-input {
    font-size: 13px;
    color: var(--oc-fg-secondary, #475569);
    background: transparent;
    border: none;
    border-bottom: 1px dashed var(--oc-border-default, #E2E8F0);
    outline: none;
    padding: 0 0 2px 0;
    margin: 0;
    width: 100%;
  }

  .label-item__description-input:focus {
    border-bottom-color: var(--oc-accent, #0F766E);
  }

  .label-item__usage {
    font-size: 12px;
    color: var(--oc-fg-tertiary, #94A3B8);
    flex-shrink: 0;
  }

  .label-item__actions {
    display: flex;
    gap: 4px;
    opacity: 0;
    transition: opacity 0.15s ease;
  }

  .label-item:hover .label-item__actions {
    opacity: 1;
  }

  .label-item__action {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    border-radius: 6px;
    color: var(--oc-fg-tertiary, #94A3B8);
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .label-item__action:hover {
    background: var(--oc-bg-surface-hover, #F1F5F9);
    color: var(--oc-fg-primary, #1E293B);
  }

  .label-item__action--danger:hover {
    background: var(--oc-error-bg, #FEF2F2);
    color: var(--oc-error, #DC2626);
  }

  /* Add Label Form */
  .add-label-form {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    padding: 20px;
    background: var(--oc-bg-surface, white);
    border: 2px dashed var(--oc-border-default, #E2E8F0);
    border-radius: 10px;
    transition: all 0.15s ease;
  }

  .add-label-form--active {
    border-color: var(--oc-accent, #0F766E);
    border-style: solid;
  }

  .add-label-form__color {
    width: 32px;
    height: 32px;
    border-radius: 6px;
    cursor: pointer;
    flex-shrink: 0;
    border: 2px solid transparent;
    transition: all 0.15s ease;
  }

  .add-label-form__color:hover {
    transform: scale(1.1);
  }

  .add-label-form__fields {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .add-label-form__input {
    width: 100%;
    padding: 8px 12px;
    font-size: 14px;
    border: 1px solid var(--oc-border-default, #E2E8F0);
    border-radius: 6px;
    outline: none;
    transition: all 0.15s ease;
  }

  .add-label-form__input:focus {
    border-color: var(--oc-accent, #0F766E);
    box-shadow: 0 0 0 3px rgba(15, 118, 110, 0.1);
  }

  .add-label-form__input::placeholder {
    color: var(--oc-fg-tertiary, #94A3B8);
  }

  .add-label-form__actions {
    display: flex;
    gap: 8px;
    flex-shrink: 0;
  }

  /* Sharing Section */
  .sharing-section {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  .sharing-visibility {
    background: var(--oc-bg-surface, white);
    border: 1px solid var(--oc-border-default, #E2E8F0);
    border-radius: 12px;
    padding: 24px;
  }

  .sharing-visibility__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
  }

  .sharing-visibility__title {
    font-size: 16px;
    font-weight: 600;
    color: var(--oc-fg-primary, #1E293B);
    margin: 0;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .sharing-visibility__icon {
    color: var(--oc-fg-tertiary, #94A3B8);
  }

  .sharing-visibility__description {
    font-size: 14px;
    color: var(--oc-fg-secondary, #475569);
    margin: 0;
  }

  .sharing-link {
    background: var(--oc-bg-surface, white);
    border: 1px solid var(--oc-border-default, #E2E8F0);
    border-radius: 12px;
    padding: 24px;
  }

  .sharing-link__title {
    font-size: 16px;
    font-weight: 600;
    color: var(--oc-fg-primary, #1E293B);
    margin: 0 0 16px 0;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .sharing-link__row {
    display: flex;
    gap: 12px;
  }

  .sharing-link__input {
    flex: 1;
    padding: 10px 14px;
    font-size: 14px;
    font-family: 'SF Mono', Monaco, monospace;
    color: var(--oc-fg-secondary, #475569);
    background: var(--oc-bg-canvas, #FAFAFA);
    border: 1px solid var(--oc-border-default, #E2E8F0);
    border-radius: 8px;
    outline: none;
  }

  .sharing-collaborators {
    background: var(--oc-bg-surface, white);
    border: 1px solid var(--oc-border-default, #E2E8F0);
    border-radius: 12px;
    overflow: hidden;
  }

  .sharing-collaborators__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 24px;
    border-bottom: 1px solid var(--oc-border-default, #E2E8F0);
  }

  .sharing-collaborators__title {
    font-size: 16px;
    font-weight: 600;
    color: var(--oc-fg-primary, #1E293B);
    margin: 0;
  }

  .sharing-collaborators__list {
    display: flex;
    flex-direction: column;
  }

  .collaborator-item {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px 24px;
    border-bottom: 1px solid var(--oc-border-default, #E2E8F0);
  }

  .collaborator-item:last-child {
    border-bottom: none;
  }

  .collaborator-item__info {
    flex: 1;
    min-width: 0;
  }

  .collaborator-item__name {
    font-size: 14px;
    font-weight: 500;
    color: var(--oc-fg-primary, #1E293B);
    margin: 0;
  }

  .collaborator-item__email {
    font-size: 13px;
    color: var(--oc-fg-secondary, #475569);
    margin: 0;
  }

  .collaborator-item__role {
    flex-shrink: 0;
  }

  .role-select {
    padding: 6px 12px;
    font-size: 13px;
    font-weight: 500;
    color: var(--oc-fg-primary, #1E293B);
    background: var(--oc-bg-surface-hover, #F8FAFC);
    border: 1px solid var(--oc-border-default, #E2E8F0);
    border-radius: 6px;
    cursor: pointer;
    outline: none;
    transition: all 0.15s ease;
  }

  .role-select:hover {
    border-color: var(--oc-border-strong, #CBD5E1);
  }

  .role-select:focus {
    border-color: var(--oc-accent, #0F766E);
  }

  .add-collaborator {
    display: flex;
    gap: 12px;
    padding: 16px 24px;
    background: var(--oc-bg-canvas, #FAFAFA);
  }

  .add-collaborator__input {
    flex: 1;
    padding: 10px 14px;
    font-size: 14px;
    border: 1px solid var(--oc-border-default, #E2E8F0);
    border-radius: 8px;
    background: var(--oc-bg-surface, white);
    outline: none;
    transition: all 0.15s ease;
  }

  .add-collaborator__input:focus {
    border-color: var(--oc-accent, #0F766E);
    box-shadow: 0 0 0 3px rgba(15, 118, 110, 0.1);
  }

  .add-collaborator__input::placeholder {
    color: var(--oc-fg-tertiary, #94A3B8);
  }

  /* Color Picker */
  .color-picker {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 12px;
    background: var(--oc-bg-surface, white);
    border: 1px solid var(--oc-border-default, #E2E8F0);
    border-radius: 10px;
    box-shadow: var(--oc-shadow-lg, 0 4px 6px rgba(15, 23, 42, 0.05));
  }

  .color-picker__swatch {
    width: 28px;
    height: 28px;
    border-radius: 6px;
    cursor: pointer;
    border: 2px solid transparent;
    transition: all 0.15s ease;
  }

  .color-picker__swatch:hover {
    transform: scale(1.1);
  }

  .color-picker__swatch--selected {
    border-color: var(--oc-fg-primary, #1E293B);
    box-shadow: 0 0 0 2px white, 0 0 0 4px var(--oc-fg-primary, #1E293B);
  }

  /* Empty State */
  .labels-empty {
    text-align: center;
    padding: 48px 24px;
    background: var(--oc-bg-surface, white);
    border: 1px solid var(--oc-border-default, #E2E8F0);
    border-radius: 12px;
  }

  .labels-empty__icon {
    width: 64px;
    height: 64px;
    margin: 0 auto 16px;
    color: var(--oc-fg-tertiary, #94A3B8);
  }

  .labels-empty__title {
    font-size: 16px;
    font-weight: 600;
    color: var(--oc-fg-primary, #1E293B);
    margin: 0 0 8px;
  }

  .labels-empty__description {
    font-size: 14px;
    color: var(--oc-fg-secondary, #475569);
    margin: 0 0 20px;
  }

  /* Responsive */
  /* Mobile Navigation Tabs */
  .labelset-mobile-nav {
    display: none;
    background: var(--oc-bg-surface, white);
    border-bottom: 1px solid var(--oc-border-default, #E2E8F0);
    padding: 0 24px;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }

  .labelset-mobile-nav::-webkit-scrollbar {
    display: none;
  }

  .labelset-mobile-nav__tabs {
    display: flex;
    gap: 4px;
    min-width: max-content;
  }

  .labelset-mobile-nav__tab {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 12px 16px;
    font-size: 14px;
    font-weight: 500;
    color: var(--oc-fg-secondary, #475569);
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.15s ease;
  }

  .labelset-mobile-nav__tab:first-child {
    padding-left: 0;
  }

  .labelset-mobile-nav__tab:hover {
    color: var(--oc-fg-primary, #1E293B);
  }

  .labelset-mobile-nav__tab--active {
    color: var(--oc-accent, #0F766E);
    border-bottom-color: var(--oc-accent, #0F766E);
  }

  .labelset-mobile-nav__tab-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
  }

  .labelset-mobile-nav__tab-badge {
    font-size: 11px;
    font-weight: 600;
    padding: 2px 6px;
    border-radius: 10px;
    background: var(--oc-bg-surface-hover, #F1F5F9);
    color: var(--oc-fg-tertiary, #94A3B8);
  }

  .labelset-mobile-nav__tab--active .labelset-mobile-nav__tab-badge {
    background: var(--oc-accent, #0F766E);
    color: white;
  }

  @media (max-width: 900px) {
    .labelset-sidebar {
      display: none;
    }

    .labelset-mobile-nav {
      display: block;
    }

    .labelset-main__header,
    .labelset-main__content {
      padding-left: 24px;
      padding-right: 24px;
    }

    .labelset-main__header {
      padding-top: 16px;
      padding-bottom: 16px;
    }

    .labelset-main__title {
      font-size: 20px;
    }

    .overview-hero {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .overview-icon {
      width: 80px;
      height: 80px;
    }

    .overview-description {
      max-width: none;
    }

    .overview-stats {
      max-width: none;
      width: 100%;
      grid-template-columns: 1fr;
      gap: 12px;
    }

    .overview-stat {
      padding: 12px 16px;
    }

    .overview-stat__value {
      font-size: 24px;
    }

    .overview-actions {
      flex-wrap: wrap;
      justify-content: center;
    }

    .label-item {
      padding: 12px 16px;
    }

    .label-item__actions {
      opacity: 1;
    }

    .sharing-visibility,
    .sharing-link,
    .sharing-collaborators {
      border-radius: 8px;
    }

    .collaborator-item {
      padding: 12px 16px;
    }

    .add-collaborator {
      padding: 12px 16px;
      flex-direction: column;
    }
  }
`;

// ═══════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════

const ColorPicker: React.FC<{
  value: string;
  onChange: (color: string) => void;
}> = ({ value, onChange }) => {
  const colors = [
    '#0F766E', '#0D9488', '#2563EB', '#7C3AED', '#A855F7',
    '#EC4899', '#DC2626', '#EA580C', '#D97706', '#059669',
    '#475569', '#1E293B',
  ];

  return (
    <div className="color-picker">
      {colors.map((color) => (
        <button
          key={color}
          className={`color-picker__swatch ${value === color ? 'color-picker__swatch--selected' : ''}`}
          style={{ backgroundColor: color }}
          onClick={() => onChange(color)}
        />
      ))}
    </div>
  );
};

const LabelItem: React.FC<{
  label: Label;
  onEdit?: () => void;
  onDelete?: () => void;
}> = ({ label, onEdit, onDelete }) => {
  return (
    <div className="label-item">
      <div className="label-item__grip">
        <GripIcon />
      </div>
      <div
        className="label-item__color"
        style={{ backgroundColor: label.color }}
        title="Click to change color"
      />
      <div className="label-item__content">
        <p className="label-item__name">{label.name}</p>
        <p className="label-item__description">{label.description}</p>
      </div>
      <span className="label-item__usage">{label.usageCount} uses</span>
      <div className="label-item__actions">
        <button className="label-item__action" title="Edit" onClick={onEdit}>
          <EditIcon />
        </button>
        <button className="label-item__action label-item__action--danger" title="Delete" onClick={onDelete}>
          <TrashIcon />
        </button>
      </div>
    </div>
  );
};

const AddLabelForm: React.FC<{
  onAdd?: (label: { name: string; description: string; color: string }) => void;
  onCancel?: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}> = ({ onAdd, onCancel, isOpen, setIsOpen }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#0F766E');
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleSubmit = () => {
    if (name.trim()) {
      onAdd?.({ name, description, color });
      setName('');
      setDescription('');
      setColor('#0F766E');
      setIsOpen(false);
    }
  };

  if (!isOpen) {
    return (
      <Button
        variant="secondary"
        onClick={() => setIsOpen(true)}
        style={{ alignSelf: 'flex-start' }}
      >
        <PlusIcon /> Add Label
      </Button>
    );
  }

  return (
    <div className="add-label-form add-label-form--active">
      <Popover
        trigger={
          <button
            className="add-label-form__color"
            style={{ backgroundColor: color }}
            title="Choose color"
          />
        }
        content={<ColorPicker value={color} onChange={(c) => { setColor(c); setShowColorPicker(false); }} />}
        position="bottom-start"
      />
      <div className="add-label-form__fields">
        <input
          className="add-label-form__input"
          type="text"
          placeholder="Label name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />
        <input
          className="add-label-form__input"
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="add-label-form__actions">
        <Button variant="ghost" size="sm" onClick={() => { setIsOpen(false); onCancel?.(); }}>
          Cancel
        </Button>
        <Button variant="primary" size="sm" onClick={handleSubmit} disabled={!name.trim()}>
          Add
        </Button>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// MAIN PAGE COMPONENT
// ═══════════════════════════════════════════════════════════════

type Section = 'overview' | 'doc-labels' | 'span-labels' | 'sharing';

const LabelSetDetailPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>('overview');
  const [isPublic, setIsPublic] = useState(false);
  const [docLabels, setDocLabels] = useState<Label[]>(sampleDocLabels);
  const [spanLabels, setSpanLabels] = useState<Label[]>(sampleSpanLabels);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddingDocLabel, setIsAddingDocLabel] = useState(false);
  const [isAddingSpanLabel, setIsAddingSpanLabel] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [title, setTitle] = useState('Contract Clause Types');
  const [description, setDescription] = useState(
    'A comprehensive label set for categorizing and annotating common contract clauses, provisions, and legal terms. Useful for contract analysis, due diligence, and legal research workflows.'
  );

  const filteredDocLabels = docLabels.filter(
    (l) =>
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSpanLabels = spanLabels.filter(
    (l) =>
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sidebarItems = [
    { id: 'overview' as Section, label: 'Overview', icon: <OverviewIcon /> },
    { id: 'doc-labels' as Section, label: 'Doc Labels', icon: <DocLabelIcon />, badge: docLabels.length },
    { id: 'span-labels' as Section, label: 'Span Labels', icon: <SpanLabelIcon />, badge: spanLabels.length },
    { id: 'sharing' as Section, label: 'Sharing', icon: <ShareIcon /> },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="overview-section">
            <div className="overview-hero">
              <div className="overview-icon">
                <LabelSetIcon />
                <div className="overview-icon__edit">
                  <EditIcon />
                </div>
              </div>
              <div className="overview-details">
                {isEditingDescription ? (
                  <VStack gap="sm">
                    <textarea
                      className="overview-description--editing"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      autoFocus
                      onBlur={() => setIsEditingDescription(false)}
                      onKeyDown={(e) => {
                        if (e.key === 'Escape') setIsEditingDescription(false);
                      }}
                    />
                    <HStack gap="sm">
                      <Button size="sm" variant="primary" onClick={() => setIsEditingDescription(false)}>
                        Save
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => setIsEditingDescription(false)}>
                        Cancel
                      </Button>
                    </HStack>
                  </VStack>
                ) : (
                  <p
                    className="overview-description"
                    onClick={() => setIsEditingDescription(true)}
                    style={{ cursor: 'pointer' }}
                    title="Click to edit"
                  >
                    {description}
                  </p>
                )}

                <div className="overview-stats">
                  <div className="overview-stat">
                    <div className="overview-stat__value">{docLabels.length + spanLabels.length}</div>
                    <div className="overview-stat__label">Total Labels</div>
                  </div>
                  <div className="overview-stat">
                    <div className="overview-stat__value">{docLabels.length}</div>
                    <div className="overview-stat__label">Doc Labels</div>
                  </div>
                  <div className="overview-stat">
                    <div className="overview-stat__value">{spanLabels.length}</div>
                    <div className="overview-stat__label">Span Labels</div>
                  </div>
                </div>

                <div className="overview-actions">
                  <Button variant="secondary" size="sm">
                    <CopyIcon /> Duplicate
                  </Button>
                  <Button variant="secondary" size="sm">
                    <DownloadIcon /> Export JSON
                  </Button>
                  <Button variant="ghost" size="sm" style={{ color: 'var(--oc-error, #DC2626)' }}>
                    <TrashIcon /> Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'doc-labels':
        return (
          <div className="labels-section">
            <div className="labels-header">
              <div className="labels-search">
                <span className="labels-search__icon">
                  <SearchIcon />
                </span>
                <input
                  className="labels-search__input"
                  type="text"
                  placeholder="Search labels..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Spacer />
            </div>

            {filteredDocLabels.length > 0 ? (
              <div className="labels-list">
                {filteredDocLabels.map((label) => (
                  <LabelItem key={label.id} label={label} />
                ))}
              </div>
            ) : docLabels.length === 0 ? (
              <div className="labels-empty">
                <div className="labels-empty__icon">
                  <TagIcon />
                </div>
                <h3 className="labels-empty__title">No doc labels yet</h3>
                <p className="labels-empty__description">
                  Doc labels are applied to entire documents to categorize them.
                </p>
                <Button variant="primary" onClick={() => setIsAddingDocLabel(true)}>
                  <PlusIcon /> Add First Label
                </Button>
              </div>
            ) : (
              <div className="labels-empty">
                <h3 className="labels-empty__title">No labels match "{searchQuery}"</h3>
                <p className="labels-empty__description">
                  Try a different search term or add a new label.
                </p>
              </div>
            )}

            <AddLabelForm
              isOpen={isAddingDocLabel}
              setIsOpen={setIsAddingDocLabel}
              onAdd={(newLabel) => {
                setDocLabels([
                  ...docLabels,
                  { ...newLabel, id: String(Date.now()), usageCount: 0 },
                ]);
              }}
            />
          </div>
        );

      case 'span-labels':
        return (
          <div className="labels-section">
            <div className="labels-header">
              <div className="labels-search">
                <span className="labels-search__icon">
                  <SearchIcon />
                </span>
                <input
                  className="labels-search__input"
                  type="text"
                  placeholder="Search labels..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Spacer />
            </div>

            {filteredSpanLabels.length > 0 ? (
              <div className="labels-list">
                {filteredSpanLabels.map((label) => (
                  <LabelItem key={label.id} label={label} />
                ))}
              </div>
            ) : spanLabels.length === 0 ? (
              <div className="labels-empty">
                <div className="labels-empty__icon">
                  <TagIcon />
                </div>
                <h3 className="labels-empty__title">No span labels yet</h3>
                <p className="labels-empty__description">
                  Span labels are applied to specific text ranges within documents.
                </p>
                <Button variant="primary" onClick={() => setIsAddingSpanLabel(true)}>
                  <PlusIcon /> Add First Label
                </Button>
              </div>
            ) : (
              <div className="labels-empty">
                <h3 className="labels-empty__title">No labels match "{searchQuery}"</h3>
                <p className="labels-empty__description">
                  Try a different search term or add a new label.
                </p>
              </div>
            )}

            <AddLabelForm
              isOpen={isAddingSpanLabel}
              setIsOpen={setIsAddingSpanLabel}
              onAdd={(newLabel) => {
                setSpanLabels([
                  ...spanLabels,
                  { ...newLabel, id: String(Date.now()), usageCount: 0 },
                ]);
              }}
            />
          </div>
        );

      case 'sharing':
        return (
          <div className="sharing-section">
            <div className="sharing-visibility">
              <div className="sharing-visibility__header">
                <h3 className="sharing-visibility__title">
                  <span className="sharing-visibility__icon">
                    {isPublic ? <GlobeIcon /> : <LockIcon />}
                  </span>
                  {isPublic ? 'Public' : 'Private'}
                </h3>
                <Toggle
                  checked={isPublic}
                  onChange={setIsPublic}
                />
              </div>
              <p className="sharing-visibility__description">
                {isPublic
                  ? 'Anyone with the link can view this label set. Only collaborators can edit.'
                  : 'Only you and collaborators can access this label set.'}
              </p>
            </div>

            {isPublic && (
              <div className="sharing-link">
                <h3 className="sharing-link__title">
                  <LinkIcon /> Share Link
                </h3>
                <div className="sharing-link__row">
                  <input
                    className="sharing-link__input"
                    type="text"
                    value="https://opencontracts.io/labelsets/abc123"
                    readOnly
                  />
                  <Button variant="secondary">
                    <CopyIcon /> Copy
                  </Button>
                </div>
              </div>
            )}

            <div className="sharing-collaborators">
              <div className="sharing-collaborators__header">
                <h3 className="sharing-collaborators__title">Collaborators</h3>
                <Chip variant="neutral" size="sm">{sampleCollaborators.length} people</Chip>
              </div>

              <div className="sharing-collaborators__list">
                {sampleCollaborators.map((collaborator) => (
                  <div key={collaborator.id} className="collaborator-item">
                    <Avatar name={collaborator.name} size="md" />
                    <div className="collaborator-item__info">
                      <p className="collaborator-item__name">{collaborator.name}</p>
                      <p className="collaborator-item__email">{collaborator.email}</p>
                    </div>
                    <div className="collaborator-item__role">
                      {collaborator.role === 'owner' ? (
                        <Chip variant="accent" size="sm">Owner</Chip>
                      ) : (
                        <select className="role-select" defaultValue={collaborator.role}>
                          <option value="editor">Editor</option>
                          <option value="viewer">Viewer</option>
                          <option value="remove" style={{ color: '#DC2626' }}>Remove</option>
                        </select>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="add-collaborator">
                <input
                  className="add-collaborator__input"
                  type="email"
                  placeholder="Add people by email..."
                />
                <Button variant="primary">
                  <UserPlusIcon /> Invite
                </Button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <style>{pageStyles}</style>
      <div className="labelset-page">
        <NavBar
          brandName="Open Contracts"
          brandVersion="v3.0.0"
          items={navItems}
          activeId="labelsets"
          onNavigate={() => {}}
          userName="John Scrudato"
          userMenuItems={userMenuItems}
          onUserMenuSelect={() => {}}
        />

        <div className="labelset-layout">
          <aside className="labelset-sidebar">
            <div className="labelset-sidebar__header">
              <button className="labelset-sidebar__back">
                <ChevronLeftIcon /> Label Sets
              </button>
            </div>

            <nav className="labelset-sidebar__nav">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  className={`labelset-sidebar__item ${activeSection === item.id ? 'labelset-sidebar__item--active' : ''}`}
                  onClick={() => setActiveSection(item.id)}
                >
                  <span className="labelset-sidebar__item-icon">{item.icon}</span>
                  {item.label}
                  {item.badge !== undefined && (
                    <span className="labelset-sidebar__item-badge">{item.badge}</span>
                  )}
                </button>
              ))}
            </nav>

            <div className="labelset-sidebar__footer">
              <Button variant="secondary" size="sm" style={{ width: '100%' }}>
                <EditIcon /> Edit Details
              </Button>
            </div>
          </aside>

          <main className="labelset-main">
            <header className="labelset-main__header">
              <div className="labelset-main__header-row">
                <div className="labelset-main__header-content">
                  <div className="labelset-main__title-row">
                    {isEditingTitle ? (
                      <input
                        className="labelset-main__title-input"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onBlur={() => setIsEditingTitle(false)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === 'Escape') setIsEditingTitle(false);
                        }}
                        autoFocus
                      />
                    ) : (
                      <h1
                        className="labelset-main__title"
                        onClick={() => setIsEditingTitle(true)}
                        style={{ cursor: 'pointer' }}
                        title="Click to edit"
                      >
                        {title}
                      </h1>
                    )}
                    <Chip variant={isPublic ? 'accent' : 'neutral'} size="sm">
                      {isPublic ? 'Public' : 'Private'}
                    </Chip>
                  </div>
                  <div className="labelset-main__meta">
                    <span>Created by John Scrudato</span>
                    <span className="labelset-main__meta-sep">·</span>
                    <span>{docLabels.length + spanLabels.length} labels</span>
                  </div>
                </div>

                <div className="labelset-main__actions">
                  <Button variant="primary">
                    <ShareIcon /> Share
                  </Button>
                </div>
              </div>
            </header>

            {/* Mobile Navigation */}
            <nav className="labelset-mobile-nav">
              <div className="labelset-mobile-nav__tabs">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    className={`labelset-mobile-nav__tab ${activeSection === item.id ? 'labelset-mobile-nav__tab--active' : ''}`}
                    onClick={() => setActiveSection(item.id)}
                  >
                    <span className="labelset-mobile-nav__tab-icon">{item.icon}</span>
                    {item.label}
                    {item.badge !== undefined && (
                      <span className="labelset-mobile-nav__tab-badge">{item.badge}</span>
                    )}
                  </button>
                ))}
              </div>
            </nav>

            <div className="labelset-main__content">
              <div className="labelset-main__inner">
                {renderContent()}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

// ═══════════════════════════════════════════════════════════════
// STORIES
// ═══════════════════════════════════════════════════════════════

export const Default: StoryObj = {
  render: () => <LabelSetDetailPage />,
};

export const Empty: StoryObj = {
  render: () => {
    const EmptyLabelSetPage: React.FC = () => {
      const [activeSection, setActiveSection] = useState<Section>('doc-labels');
      const [isPublic, setIsPublic] = useState(false);
      const [isAddingLabel, setIsAddingLabel] = useState(false);

      return (
        <>
          <style>{pageStyles}</style>
          <div className="labelset-page">
            <NavBar
              brandName="Open Contracts"
              brandVersion="v3.0.0"
              items={navItems}
              activeId="labelsets"
              onNavigate={() => {}}
              userName="John Scrudato"
              userMenuItems={userMenuItems}
              onUserMenuSelect={() => {}}
            />

            <div className="labelset-layout">
              <aside className="labelset-sidebar">
                <div className="labelset-sidebar__header">
                  <button className="labelset-sidebar__back">
                    <ChevronLeftIcon /> Label Sets
                  </button>
                </div>

                <nav className="labelset-sidebar__nav">
                  <button
                    className={`labelset-sidebar__item ${activeSection === 'overview' ? 'labelset-sidebar__item--active' : ''}`}
                    onClick={() => setActiveSection('overview')}
                  >
                    <span className="labelset-sidebar__item-icon"><OverviewIcon /></span>
                    Overview
                  </button>
                  <button
                    className={`labelset-sidebar__item ${activeSection === 'doc-labels' ? 'labelset-sidebar__item--active' : ''}`}
                    onClick={() => setActiveSection('doc-labels')}
                  >
                    <span className="labelset-sidebar__item-icon"><DocLabelIcon /></span>
                    Doc Labels
                    <span className="labelset-sidebar__item-badge">0</span>
                  </button>
                  <button
                    className={`labelset-sidebar__item ${activeSection === 'span-labels' ? 'labelset-sidebar__item--active' : ''}`}
                    onClick={() => setActiveSection('span-labels')}
                  >
                    <span className="labelset-sidebar__item-icon"><SpanLabelIcon /></span>
                    Span Labels
                    <span className="labelset-sidebar__item-badge">0</span>
                  </button>
                  <button
                    className={`labelset-sidebar__item ${activeSection === 'sharing' ? 'labelset-sidebar__item--active' : ''}`}
                    onClick={() => setActiveSection('sharing')}
                  >
                    <span className="labelset-sidebar__item-icon"><ShareIcon /></span>
                    Sharing
                  </button>
                </nav>
              </aside>

              <main className="labelset-main">
                <header className="labelset-main__header">
                  <div className="labelset-main__header-row">
                    <div className="labelset-main__header-content">
                      <div className="labelset-main__title-row">
                        <h1 className="labelset-main__title">New Label Set</h1>
                        <Chip variant="neutral" size="sm">Private</Chip>
                      </div>
                      <div className="labelset-main__meta">
                        <span>Created by John Scrudato</span>
                        <span className="labelset-main__meta-sep">·</span>
                        <span>0 labels</span>
                      </div>
                    </div>
                    <div className="labelset-main__actions">
                      <Button variant="primary">
                        <ShareIcon /> Share
                      </Button>
                    </div>
                  </div>
                </header>

                {/* Mobile Navigation */}
                <nav className="labelset-mobile-nav">
                  <div className="labelset-mobile-nav__tabs">
                    <button
                      className={`labelset-mobile-nav__tab ${activeSection === 'overview' ? 'labelset-mobile-nav__tab--active' : ''}`}
                      onClick={() => setActiveSection('overview')}
                    >
                      <span className="labelset-mobile-nav__tab-icon"><OverviewIcon /></span>
                      Overview
                    </button>
                    <button
                      className={`labelset-mobile-nav__tab ${activeSection === 'doc-labels' ? 'labelset-mobile-nav__tab--active' : ''}`}
                      onClick={() => setActiveSection('doc-labels')}
                    >
                      <span className="labelset-mobile-nav__tab-icon"><DocLabelIcon /></span>
                      Doc Labels
                      <span className="labelset-mobile-nav__tab-badge">0</span>
                    </button>
                    <button
                      className={`labelset-mobile-nav__tab ${activeSection === 'span-labels' ? 'labelset-mobile-nav__tab--active' : ''}`}
                      onClick={() => setActiveSection('span-labels')}
                    >
                      <span className="labelset-mobile-nav__tab-icon"><SpanLabelIcon /></span>
                      Span Labels
                      <span className="labelset-mobile-nav__tab-badge">0</span>
                    </button>
                    <button
                      className={`labelset-mobile-nav__tab ${activeSection === 'sharing' ? 'labelset-mobile-nav__tab--active' : ''}`}
                      onClick={() => setActiveSection('sharing')}
                    >
                      <span className="labelset-mobile-nav__tab-icon"><ShareIcon /></span>
                      Sharing
                    </button>
                  </div>
                </nav>

                <div className="labelset-main__content">
                  <div className="labelset-main__inner">
                    <div className="labels-section">
                      <div className="labels-empty">
                        <div className="labels-empty__icon">
                          <TagIcon />
                        </div>
                        <h3 className="labels-empty__title">No doc labels yet</h3>
                        <p className="labels-empty__description">
                          Doc labels are applied to entire documents to categorize them.
                        </p>
                        <Button variant="primary" onClick={() => setIsAddingLabel(true)}>
                          <PlusIcon /> Add First Label
                        </Button>
                      </div>

                      <AddLabelForm
                        isOpen={isAddingLabel}
                        setIsOpen={setIsAddingLabel}
                        onAdd={() => {}}
                      />
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </>
      );
    };

    return <EmptyLabelSetPage />;
  },
};
