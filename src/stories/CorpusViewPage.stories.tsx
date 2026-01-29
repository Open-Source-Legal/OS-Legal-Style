import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from '../Chip';
import { Button } from '../Button';
import { Card, CardBody } from '../Card';
import { Avatar } from '../Avatar';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '../Tabs';

const meta: Meta = {
  title: 'Pages/CorpusViewPage',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

// ═══════════════════════════════════════════════════════════════
// ICONS
// ═══════════════════════════════════════════════════════════════

const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 12l4-4-4-4" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 12l-4-4 4-4" />
  </svg>
);

const SendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15.75 2.25L8.25 9.75" />
    <path d="M15.75 2.25l-4.5 13.5-3-6.75-6.75-3 13.5-4.5z" />
  </svg>
);

const LockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="6" width="8" height="6" rx="1" />
    <path d="M5 6V4a2 2 0 114 0v2" />
  </svg>
);

const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="7" cy="7" r="5.5" />
    <path d="M7 4v3l2 1" />
  </svg>
);

const DocumentStackIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8.5 1.5H4a1 1 0 00-1 1v9a1 1 0 001 1h6a1 1 0 001-1V4l-2.5-2.5z" />
    <path d="M8.5 1.5V4H11" />
  </svg>
);

const SparkleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 1v2M8 13v2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M1 8h2M13 8h2M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41" />
  </svg>
);

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="7" cy="7" r="4.5" />
    <path d="M10.5 10.5L14 14" />
  </svg>
);

const ChartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12V8M8 12V4M12 12V6" />
  </svg>
);

const DocumentIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.5 1.5H4.5a1.5 1.5 0 00-1.5 1.5v12a1.5 1.5 0 001.5 1.5h9a1.5 1.5 0 001.5-1.5V6L10.5 1.5z" />
    <path d="M10.5 1.5V6H15" />
  </svg>
);

const ChapterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 4.5h12M3 9h8M3 13.5h10" />
  </svg>
);

const SubchapterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 4.5h9M6 9h6M6 13.5h7" />
  </svg>
);

const HistoryIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 8a6 6 0 1112 0 6 6 0 01-12 0z" />
    <path d="M8 4.5V8l2.5 1.5" />
    <path d="M2.5 4.5V2M2.5 4.5H5" />
  </svg>
);

const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11.5 2.5l2 2-8 8H3.5v-2l8-8z" />
  </svg>
);

const ListIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 4.5h9M6 9h9M6 13.5h9M3 4.5h.01M3 9h.01M3 13.5h.01" />
  </svg>
);

const InfoIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="9" r="7" />
    <path d="M9 12V9M9 6h.01" />
  </svg>
);

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

// ═══════════════════════════════════════════════════════════════
// MOCK DATA
// ═══════════════════════════════════════════════════════════════

const corpusData = {
  title: 'Delaware General Corporation Law',
  isPrivate: true,
  author: 'scrudato',
  updatedAt: '4 days ago',
  documentCount: 43,
  about: `The Delaware General Corporation Law (DGCL) is the statutory framework governing the formation and operation of corporations in Delaware. As the most influential corporate law in the United States, the DGCL provides the legal foundation for over 60% of Fortune 500 companies.

This corpus contains the complete, annotated text of Title 8 of the Delaware Code, including all amendments through 2024. Key topics covered include:

• **Formation & Organization**: Requirements for incorporation, articles of incorporation, bylaws, and registered agents
• **Stock & Shareholders**: Authorized shares, stock certificates, voting rights, and shareholder meetings
• **Directors & Officers**: Board composition, fiduciary duties, indemnification, and liability
• **Mergers & Acquisitions**: Procedures for mergers, consolidations, asset sales, and conversions
• **Dissolution**: Voluntary and involuntary dissolution procedures

The annotations include cross-references to relevant case law, SEC guidance, and practical implementation notes.`,
};

interface TocItem {
  id: string;
  title: string;
  type: 'document' | 'chapter' | 'subchapter';
  children?: TocItem[];
}

const tocItems: TocItem[] = [
  { id: '1', title: 'Cover Page', type: 'document' },
  { id: '2', title: 'Chapter 1 - General Provisions', type: 'chapter', children: [
    { id: '2a', title: 'Subchapter I - Formation', type: 'subchapter' },
    { id: '2b', title: 'Subchapter II - Powers', type: 'subchapter' },
    { id: '2c', title: 'Subchapter III - Registered Office and Agent', type: 'subchapter' },
  ]},
  { id: '3', title: 'Chapter 2 - Directors and Officers', type: 'chapter', children: [
    { id: '3a', title: 'Subchapter I - Board of Directors', type: 'subchapter' },
    { id: '3b', title: 'Subchapter II - Officers', type: 'subchapter' },
    { id: '3c', title: 'Subchapter III - Indemnification', type: 'subchapter' },
  ]},
  { id: '4', title: 'Chapter 3 - Stock and Stockholders', type: 'chapter', children: [
    { id: '4a', title: 'Subchapter I - Stock', type: 'subchapter' },
    { id: '4b', title: 'Subchapter II - Stockholder Meetings', type: 'subchapter' },
    { id: '4c', title: 'Subchapter III - Voting', type: 'subchapter' },
  ]},
  { id: '5', title: 'Chapter 4 - Merger and Consolidation', type: 'chapter', children: [
    { id: '5a', title: 'Subchapter I - Domestic Mergers', type: 'subchapter' },
    { id: '5b', title: 'Subchapter II - Foreign Mergers', type: 'subchapter' },
  ]},
  { id: '6', title: 'Chapter 5 - Dissolution', type: 'chapter' },
  { id: '7', title: 'Appendix A - Forms', type: 'document' },
  { id: '8', title: 'Appendix B - Cross-References', type: 'document' },
];

// ═══════════════════════════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════════════════════════

const pageStyles = `
/* ═══════════════════════════════════════════════════════════════
   CORPUS VIEW PAGE STYLES
   ═══════════════════════════════════════════════════════════════ */

.corpus-view {
  min-height: 100vh;
  background: #FFFFFF;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

/* ───────────────────────────────────────────────────────────────
   NAVBAR - Dark navy style matching reference design
   ─────────────────────────────────────────────────────────────── */

.corpus-view-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  height: 48px;
  background: #1E293B;
  border-bottom: none;
}

.corpus-view-nav__left {
  display: flex;
  align-items: center;
  gap: 32px;
}

.corpus-view-nav__logo {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #FFFFFF;
}

.corpus-view-nav__logo svg {
  color: #FFFFFF;
}

.corpus-view-nav__brand {
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: #FFFFFF;
}

.corpus-view-nav__logo .oc-chip {
  background: rgba(255, 255, 255, 0.15);
  color: #94A3B8;
  border: none;
  font-size: 11px;
}

.corpus-view-nav__links {
  display: flex;
  align-items: center;
  gap: 2px;
}

.corpus-view-nav__link {
  padding: 6px 14px;
  font-size: 14px;
  font-weight: 500;
  color: #94A3B8;
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.15s ease;
}

.corpus-view-nav__link:hover {
  color: #FFFFFF;
  background: rgba(255, 255, 255, 0.08);
}

.corpus-view-nav__link--active {
  color: #FFFFFF;
  background: rgba(255, 255, 255, 0.15);
}

.corpus-view-nav__right {
  display: flex;
  align-items: center;
  gap: 16px;
}

/* User dropdown - dark theme */
.oc-user-dropdown {
  position: relative;
}

.oc-user-dropdown__trigger {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px 4px 4px;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.oc-user-dropdown__trigger:hover {
  background: rgba(255, 255, 255, 0.08);
}

.oc-user-dropdown__name {
  font-size: 14px;
  font-weight: 500;
  color: #FFFFFF;
}

.oc-user-dropdown__chevron {
  color: #94A3B8;
  transition: transform 0.15s ease;
}

.oc-user-dropdown__chevron--open {
  transform: rotate(180deg);
}

.oc-user-dropdown__backdrop {
  position: fixed;
  inset: 0;
  z-index: 40;
}

.oc-user-dropdown__menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 180px;
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(15, 23, 42, 0.12);
  padding: 6px;
  z-index: 50;
}

.oc-user-dropdown__item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px 12px;
  font-size: 14px;
  font-weight: 500;
  color: #1E293B;
  background: transparent;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-align: left;
  transition: all 0.15s ease;
}

.oc-user-dropdown__item:hover {
  background: #F1F5F9;
}

.oc-user-dropdown__item--danger {
  color: #DC2626;
}

.oc-user-dropdown__item--danger:hover {
  background: #FEF2F2;
}

.oc-user-dropdown__divider {
  height: 1px;
  background: #E2E8F0;
  margin: 6px 0;
}

/* Mobile nav */
@media (max-width: 768px) {
  .corpus-view-nav__links {
    display: none;
  }
}

/* ───────────────────────────────────────────────────────────────
   HEADER (shared between views)
   ─────────────────────────────────────────────────────────────── */

.corpus-view__header {
  padding: 40px 24px 0;
  max-width: 1200px;
  margin: 0 auto;
}

.corpus-view--landing .corpus-view__header {
  text-align: center;
  max-width: 800px;
}

.corpus-view__breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #64748B;
  margin-bottom: 20px;
}

.corpus-view--landing .corpus-view__breadcrumb {
  justify-content: center;
}

.corpus-view__breadcrumb a {
  color: #64748B;
  text-decoration: none;
  transition: color 0.15s ease;
}

.corpus-view__breadcrumb a:hover {
  color: #0F766E;
  text-decoration: underline;
}

.corpus-view__breadcrumb-separator {
  color: #CBD5E1;
}

.corpus-view__breadcrumb-current {
  color: #475569;
}

.corpus-view__back-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-weight: 500;
  color: #0F766E;
  text-decoration: none;
  margin-bottom: 16px;
  transition: color 0.15s ease;
}

.corpus-view__back-link:hover {
  color: #0D6560;
}

.corpus-view__label {
  display: inline-flex;
  align-items: center;
  padding: 5px 14px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #FFFFFF;
  background: #0F766E;
  border-radius: 9999px;
  margin-bottom: 16px;
}

.corpus-view__title {
  font-size: 32px;
  font-weight: 700;
  color: #1E293B;
  margin: 0 0 16px;
  letter-spacing: -0.025em;
  line-height: 1.2;
}

.corpus-view__meta {
  display: flex;
  align-items: center;
  gap: 20px;
  color: #64748B;
  font-size: 14px;
  margin-bottom: 32px;
}

.corpus-view--landing .corpus-view__meta {
  justify-content: center;
}

.corpus-view__meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  position: relative;
}

.corpus-view__meta-item:not(:last-child)::after {
  content: '';
  position: absolute;
  right: -11px;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 3px;
  background: #CBD5E1;
  border-radius: 50%;
}

.corpus-view__meta-item svg {
  flex-shrink: 0;
  opacity: 0.7;
}

/* ───────────────────────────────────────────────────────────────
   AI INPUT BAR - Polished search style
   ─────────────────────────────────────────────────────────────── */

.corpus-view__ai-section {
  max-width: 720px;
  margin: 0 auto 28px;
  padding: 0 24px;
}

.corpus-view--landing .corpus-view__ai-section {
  max-width: 640px;
}

.corpus-view--detailed .corpus-view__ai-section {
  max-width: 1200px;
}

.corpus-view__ai-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 8px 8px 20px;
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 9999px;
  transition: all 0.2s ease;
}

.corpus-view__ai-bar:focus-within {
  background: #FFFFFF;
  border-color: #CBD5E1;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08);
}

.corpus-view__ai-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 15px;
  color: #1E293B;
  outline: none;
  padding: 8px 0;
}

.corpus-view__ai-input::placeholder {
  color: #94A3B8;
}

.corpus-view__ai-send {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: #0F766E;
  border: none;
  border-radius: 9999px;
  color: #FFFFFF;
  cursor: pointer;
  transition: all 0.15s ease;
  flex-shrink: 0;
}

.corpus-view__ai-send:hover {
  background: #0D6560;
  transform: scale(1.02);
}

.corpus-view__ai-send:disabled {
  background: #E2E8F0;
  color: #94A3B8;
  cursor: not-allowed;
  transform: none;
}

/* AI Actions - Outlined pill buttons */
.corpus-view__ai-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

.corpus-view--detailed .corpus-view__ai-actions {
  justify-content: flex-start;
  padding-left: 24px;
}

.corpus-view__ai-actions .oc-button {
  background: transparent;
  border: 1px solid #E2E8F0;
  color: #475569;
  border-radius: 9999px;
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 500;
  gap: 6px;
}

.corpus-view__ai-actions .oc-button:hover {
  background: #F8FAFC;
  border-color: #CBD5E1;
  color: #1E293B;
}

.corpus-view__ai-actions .oc-button svg {
  width: 14px;
  height: 14px;
}

/* ───────────────────────────────────────────────────────────────
   LANDING VIEW
   ─────────────────────────────────────────────────────────────── */

.corpus-view__landing-content {
  max-width: 720px;
  margin: 0 auto;
  padding: 0 24px 60px;
}

.corpus-view__about-card {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.04);
  overflow: hidden;
}

.corpus-view__about-card-header {
  padding: 20px 28px 18px;
  border-bottom: none;
  background: #FAFBFC;
}

.corpus-view__about-card-title {
  font-size: 15px;
  font-weight: 600;
  color: #1E293B;
  margin: 0;
}

.corpus-view__about-card-body {
  padding: 24px 28px;
}

.corpus-view__about-text {
  font-size: 15px;
  line-height: 1.75;
  color: #475569;
}

.corpus-view__about-text p {
  margin: 0 0 18px;
}

.corpus-view__about-text p:last-child {
  margin-bottom: 0;
}

.corpus-view__about-text ul {
  margin: 16px 0;
  padding-left: 8px;
  list-style: none;
}

.corpus-view__about-text li {
  margin: 10px 0;
  padding-left: 16px;
  position: relative;
}

.corpus-view__about-text li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #0F766E;
  font-weight: bold;
}

.corpus-view__about-text strong {
  color: #1E293B;
  font-weight: 600;
}

.corpus-view__about-card-footer {
  padding: 18px 28px 22px;
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid #F1F5F9;
}

.corpus-view__toggle-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 18px;
  font-size: 14px;
  font-weight: 500;
  color: #0F766E;
  background: transparent;
  border: 1px solid #E2E8F0;
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.corpus-view__toggle-btn:hover {
  background: rgba(15, 118, 110, 0.05);
  border-color: #0F766E;
}

/* ───────────────────────────────────────────────────────────────
   DETAILED VIEW
   ─────────────────────────────────────────────────────────────── */

.corpus-view__columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px 48px;
}

.corpus-view__column {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.04);
  overflow: hidden;
}

.corpus-view__column-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid #F1F5F9;
}

.corpus-view__column-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 600;
  color: #1E293B;
  margin: 0;
}

.corpus-view__column-title svg {
  color: #64748B;
}

.corpus-view__column-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.corpus-view__column-action {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  font-size: 13px;
  font-weight: 500;
  color: #64748B;
  background: transparent;
  border: 1px solid #E2E8F0;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.corpus-view__column-action:hover {
  color: #1E293B;
  background: #F8FAFC;
  border-color: #CBD5E1;
}

.corpus-view__column-body {
  padding: 16px 20px;
  max-height: 500px;
  overflow-y: auto;
}

/* ToC Items */
.corpus-view__toc {
  list-style: none;
  margin: 0;
  padding: 0;
}

.corpus-view__toc-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.15s ease;
}

.corpus-view__toc-item:hover {
  background: #F8FAFC;
}

.corpus-view__toc-item-icon {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748B;
}

.corpus-view__toc-item--chapter .corpus-view__toc-item-icon {
  color: #0F766E;
}

.corpus-view__toc-item-content {
  flex: 1;
  min-width: 0;
}

.corpus-view__toc-item-title {
  font-size: 14px;
  font-weight: 500;
  color: #1E293B;
  margin: 0 0 2px;
}

.corpus-view__toc-item--chapter .corpus-view__toc-item-title {
  font-weight: 600;
}

.corpus-view__toc-children {
  list-style: none;
  margin: 4px 0 0;
  padding-left: 36px;
}

.corpus-view__toc-child {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.15s ease;
}

.corpus-view__toc-child:hover {
  background: #F8FAFC;
}

.corpus-view__toc-child-icon {
  flex-shrink: 0;
  color: #94A3B8;
}

.corpus-view__toc-child-title {
  font-size: 13px;
  color: #64748B;
}

/* About section in detailed view */
.corpus-view__about-detailed {
  font-size: 14px;
  line-height: 1.7;
  color: #475569;
}

.corpus-view__about-detailed p {
  margin: 0 0 14px;
}

.corpus-view__about-detailed p:last-child {
  margin-bottom: 0;
}

.corpus-view__about-detailed ul {
  margin: 12px 0;
  padding-left: 18px;
}

.corpus-view__about-detailed li {
  margin: 6px 0;
}

.corpus-view__about-detailed strong {
  color: #1E293B;
}

/* ───────────────────────────────────────────────────────────────
   MOBILE TABS (for detailed view)
   ─────────────────────────────────────────────────────────────── */

.corpus-view__mobile-tabs {
  display: none;
  max-width: 720px;
  margin: 0 auto;
  padding: 0 24px 60px;
}

.corpus-view__mobile-tabs .oc-tabs {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.04);
  overflow: hidden;
}

.corpus-view__mobile-tabs .oc-tab-list {
  display: flex;
  background: #FAFBFC;
  border-bottom: 1px solid #E2E8F0;
  padding: 0;
}

.corpus-view__mobile-tabs .oc-tab {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px 20px;
  font-size: 14px;
  font-weight: 500;
  color: #64748B;
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.corpus-view__mobile-tabs .oc-tab:hover {
  color: #1E293B;
}

.corpus-view__mobile-tabs .oc-tab--selected {
  color: #0F766E;
  background: #FFFFFF;
  border-bottom-color: #0F766E;
}

.corpus-view__mobile-tabs .oc-tab svg {
  width: 16px;
  height: 16px;
  opacity: 0.7;
}

.corpus-view__mobile-tabs .oc-tab--selected svg {
  opacity: 1;
}

.corpus-view__mobile-tabs .oc-tab-panel {
  padding: 24px;
}

/* ───────────────────────────────────────────────────────────────
   RESPONSIVE
   ─────────────────────────────────────────────────────────────── */

@media (max-width: 900px) {
  .corpus-view__columns {
    display: none;
  }

  .corpus-view--detailed .corpus-view__mobile-tabs {
    display: block;
  }
}

@media (max-width: 600px) {
  .corpus-view__header {
    padding: 24px 16px 0;
  }

  .corpus-view__title {
    font-size: 22px;
  }

  .corpus-view__meta {
    flex-wrap: wrap;
    gap: 12px;
  }

  .corpus-view__ai-section {
    padding: 0 16px;
  }

  .corpus-view__ai-actions {
    flex-wrap: wrap;
  }

  .corpus-view__landing-content {
    padding: 0 16px 32px;
  }

  .corpus-view__columns {
    padding: 0 16px 32px;
  }
}

/* ───────────────────────────────────────────────────────────────
   EMPTY STATE
   ─────────────────────────────────────────────────────────────── */

.corpus-view__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 24px;
  text-align: center;
}

.corpus-view__empty-icon {
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #F1F5F9;
  border-radius: 16px;
  color: #94A3B8;
  margin-bottom: 20px;
}

.corpus-view__empty-icon svg {
  width: 32px;
  height: 32px;
}

.corpus-view__empty-title {
  font-size: 18px;
  font-weight: 600;
  color: #1E293B;
  margin: 0 0 8px;
}

.corpus-view__empty-text {
  font-size: 15px;
  color: #64748B;
  margin: 0 0 20px;
  max-width: 320px;
}
`;

// ═══════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════

// NavBar Component
const CorpusViewNav = () => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <header className="corpus-view-nav">
      <div className="corpus-view-nav__left">
        <div className="corpus-view-nav__logo">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="12" stroke="currentColor" strokeWidth="2" />
            <circle cx="14" cy="14" r="6" fill="currentColor" />
          </svg>
          <span className="corpus-view-nav__brand">Open Contracts</span>
          <Chip size="sm" variant="outline">v3.0.0</Chip>
        </div>
        <nav className="corpus-view-nav__links">
          <a href="#" className="corpus-view-nav__link">Discover</a>
          <a href="#" className="corpus-view-nav__link corpus-view-nav__link--active">Corpuses</a>
          <a href="#" className="corpus-view-nav__link">Documents</a>
          <a href="#" className="corpus-view-nav__link">Label Sets</a>
          <a href="#" className="corpus-view-nav__link">Annotations</a>
          <a href="#" className="corpus-view-nav__link">Extracts</a>
        </nav>
      </div>
      <div className="corpus-view-nav__right">
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
      </div>
    </header>
  );
};

// Render ToC Items recursively
const TocItemComponent = ({ item }: { item: TocItem }) => {
  const getIcon = () => {
    switch (item.type) {
      case 'chapter':
        return <ChapterIcon />;
      case 'subchapter':
        return <SubchapterIcon />;
      default:
        return <DocumentIcon />;
    }
  };

  return (
    <li>
      <div className={`corpus-view__toc-item corpus-view__toc-item--${item.type}`}>
        <span className="corpus-view__toc-item-icon">{getIcon()}</span>
        <div className="corpus-view__toc-item-content">
          <p className="corpus-view__toc-item-title">{item.title}</p>
        </div>
      </div>
      {item.children && item.children.length > 0 && (
        <ul className="corpus-view__toc-children">
          {item.children.map(child => (
            <li key={child.id} className="corpus-view__toc-child">
              <span className="corpus-view__toc-child-icon"><SubchapterIcon /></span>
              <span className="corpus-view__toc-child-title">{child.title}</span>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

// Parse about text to render with formatting
const AboutText = ({ text, className }: { text: string; className?: string }) => {
  const paragraphs = text.split('\n\n');

  return (
    <div className={className}>
      {paragraphs.map((para, i) => {
        // Check if it's a bullet list
        if (para.startsWith('•')) {
          const items = para.split('\n').filter(line => line.startsWith('•'));
          return (
            <ul key={i}>
              {items.map((item, j) => {
                const content = item.replace('• ', '');
                // Handle bold text with **
                const parts = content.split(/\*\*(.*?)\*\*/);
                return (
                  <li key={j}>
                    {parts.map((part, k) =>
                      k % 2 === 1 ? <strong key={k}>{part}</strong> : part
                    )}
                  </li>
                );
              })}
            </ul>
          );
        }
        return <p key={i}>{para}</p>;
      })}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// MAIN STORY COMPONENT
// ═══════════════════════════════════════════════════════════════

interface CorpusViewPageProps {
  initialView?: 'landing' | 'detailed';
  isEmpty?: boolean;
}

const CorpusViewPage = ({ initialView = 'landing', isEmpty = false }: CorpusViewPageProps) => {
  const [viewMode, setViewMode] = useState<'landing' | 'detailed'>(initialView);
  const [aiQuery, setAiQuery] = useState('');
  const [mobileTab, setMobileTab] = useState('toc');

  if (isEmpty) {
    return (
      <>
        <style>{pageStyles}</style>
        <div className="corpus-view">
          <CorpusViewNav />
          <div className="corpus-view__header">
            <nav className="corpus-view__breadcrumb">
              <a href="#">Corpuses</a>
              <span className="corpus-view__breadcrumb-separator"><ChevronRightIcon /></span>
              <span className="corpus-view__breadcrumb-current">Empty Corpus</span>
            </nav>
            <span className="corpus-view__label">Corpus</span>
            <h1 className="corpus-view__title">Empty Corpus</h1>
          </div>
          <div className="corpus-view__empty">
            <div className="corpus-view__empty-icon">
              <DocumentStackIcon />
            </div>
            <h2 className="corpus-view__empty-title">No documents yet</h2>
            <p className="corpus-view__empty-text">
              This corpus doesn't have any documents. Add documents to start building your corpus.
            </p>
            <Button variant="primary">Add Documents</Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{pageStyles}</style>
      <div className={`corpus-view corpus-view--${viewMode}`}>
        <CorpusViewNav />

        {/* Header */}
        <div className="corpus-view__header">
          {viewMode === 'detailed' && (
            <button className="corpus-view__back-link" onClick={() => setViewMode('landing')}>
              <ChevronLeftIcon />
              Overview
            </button>
          )}
          <nav className="corpus-view__breadcrumb">
            <a href="#">Corpuses</a>
            <span className="corpus-view__breadcrumb-separator"><ChevronRightIcon /></span>
            <span className="corpus-view__breadcrumb-current">{corpusData.title}</span>
          </nav>
          <span className="corpus-view__label">Corpus</span>
          <h1 className="corpus-view__title">{corpusData.title}</h1>
          <div className="corpus-view__meta">
            <span className="corpus-view__meta-item">
              <LockIcon />
              Private
            </span>
            <span className="corpus-view__meta-item">
              {corpusData.author}
            </span>
            <span className="corpus-view__meta-item">
              <ClockIcon />
              {corpusData.updatedAt}
            </span>
            <span className="corpus-view__meta-item">
              <DocumentStackIcon />
              {corpusData.documentCount} Documents
            </span>
          </div>
        </div>

        {/* AI Section */}
        <div className="corpus-view__ai-section">
          <div className="corpus-view__ai-bar">
            <input
              type="text"
              className="corpus-view__ai-input"
              placeholder="Ask a question about this corpus..."
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
            />
            <button className="corpus-view__ai-send" disabled={!aiQuery.trim()}>
              <SendIcon />
            </button>
          </div>
          <div className="corpus-view__ai-actions">
            <Button variant="secondary" size="sm">
              <SparkleIcon />
              Summarize
            </Button>
            <Button variant="secondary" size="sm">
              <SearchIcon />
              Search
            </Button>
            <Button variant="secondary" size="sm">
              <ChartIcon />
              Analyze
            </Button>
          </div>
        </div>

        {/* Landing View Content */}
        {viewMode === 'landing' && (
          <div className="corpus-view__landing-content">
            <div className="corpus-view__about-card">
              <div className="corpus-view__about-card-header">
                <h2 className="corpus-view__about-card-title">About this Corpus</h2>
              </div>
              <div className="corpus-view__about-card-body">
                <AboutText text={corpusData.about} className="corpus-view__about-text" />
              </div>
              <div className="corpus-view__about-card-footer">
                <button className="corpus-view__toggle-btn" onClick={() => setViewMode('detailed')}>
                  View Details
                  <ChevronRightIcon />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Detailed View Content - Desktop */}
        {viewMode === 'detailed' && (
          <div className="corpus-view__columns">
            {/* Table of Contents */}
            <div className="corpus-view__column">
              <div className="corpus-view__column-header">
                <h2 className="corpus-view__column-title">
                  <ListIcon />
                  Table of Contents
                </h2>
              </div>
              <div className="corpus-view__column-body">
                <ul className="corpus-view__toc">
                  {tocItems.map(item => (
                    <TocItemComponent key={item.id} item={item} />
                  ))}
                </ul>
              </div>
            </div>

            {/* About */}
            <div className="corpus-view__column">
              <div className="corpus-view__column-header">
                <h2 className="corpus-view__column-title">
                  <InfoIcon />
                  About
                </h2>
                <div className="corpus-view__column-actions">
                  <button className="corpus-view__column-action">
                    <HistoryIcon />
                    Version History
                  </button>
                  <button className="corpus-view__column-action">
                    <EditIcon />
                    Edit
                  </button>
                </div>
              </div>
              <div className="corpus-view__column-body">
                <AboutText text={corpusData.about} className="corpus-view__about-detailed" />
              </div>
            </div>
          </div>
        )}

        {/* Detailed View Content - Mobile Tabs */}
        {viewMode === 'detailed' && (
          <div className="corpus-view__mobile-tabs">
            <Tabs value={mobileTab} onChange={setMobileTab}>
              <TabList>
                <Tab value="toc">
                  <ListIcon />
                  Table of Contents
                </Tab>
                <Tab value="about">
                  <InfoIcon />
                  About
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel value="toc">
                  <ul className="corpus-view__toc">
                    {tocItems.map(item => (
                      <TocItemComponent key={item.id} item={item} />
                    ))}
                  </ul>
                </TabPanel>
                <TabPanel value="about">
                  <AboutText text={corpusData.about} className="corpus-view__about-detailed" />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>
        )}
      </div>
    </>
  );
};

// ═══════════════════════════════════════════════════════════════
// STORIES
// ═══════════════════════════════════════════════════════════════

type Story = StoryObj<typeof CorpusViewPage>;

export const Default: Story = {
  render: () => <CorpusViewPage />,
};

export const LandingView: Story = {
  render: () => <CorpusViewPage initialView="landing" />,
};

export const DetailedView: Story = {
  render: () => <CorpusViewPage initialView="detailed" />,
};

export const DetailedViewMobile: Story = {
  render: () => <CorpusViewPage initialView="detailed" />,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const EmptyCorpus: Story = {
  render: () => <CorpusViewPage isEmpty />,
};
