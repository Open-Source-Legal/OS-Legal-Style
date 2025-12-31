import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PageHeader } from './PageHeader';
import { pageHeaderStyles } from './PageHeader.styles';

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = pageHeaderStyles;
document.head.appendChild(styleSheet);

const meta: Meta<typeof PageHeader> = {
  title: 'Layout/PageHeader',
  component: PageHeader,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof PageHeader>;

export const Default: Story = {
  args: {
    title: 'Page Title',
    subtitle: 'Optional description text for the page',
  },
};

export const WithBreadcrumbs: Story = {
  render: () => (
    <PageHeader
      title="Contract Analysis"
      subtitle="Review contradictions and inconsistencies"
      breadcrumbs={[
        { label: 'Projects', href: '#' },
        { label: 'Matter 2024-001', href: '#' },
        { label: 'Contract Analysis' },
      ]}
    />
  ),
};

export const WithActions: Story = {
  render: () => (
    <PageHeader
      title="Documents"
      subtitle="12 documents in this project"
      actions={
        <>
          <button style={{
            padding: '8px 16px',
            border: '1px solid #E5E5E5',
            borderRadius: '6px',
            background: 'white',
            cursor: 'pointer',
          }}>
            Export
          </button>
          <button style={{
            padding: '8px 16px',
            border: 'none',
            borderRadius: '6px',
            background: '#E85A4F',
            color: 'white',
            cursor: 'pointer',
          }}>
            Upload
          </button>
        </>
      }
    />
  ),
};

export const WithBackButton: Story = {
  render: () => (
    <PageHeader
      title="Witness Statement - Exhibit C5"
      subtitle="Last modified 2 hours ago"
      onBack={() => alert('Go back')}
      actions={
        <button style={{
          padding: '8px 16px',
          border: '1px solid #E5E5E5',
          borderRadius: '6px',
          background: 'white',
          cursor: 'pointer',
        }}>
          Edit
        </button>
      }
    />
  ),
};

export const Complete: Story = {
  render: () => (
    <PageHeader
      title="Matter 2024-001"
      subtitle="Stock Purchase Agreement analysis"
      breadcrumbs={[
        { label: 'Dashboard', href: '#' },
        { label: 'Projects', href: '#' },
        { label: 'Matter 2024-001' },
      ]}
      onBack={() => alert('Go back')}
      actions={
        <>
          <button style={{
            padding: '8px 16px',
            border: '1px solid #E5E5E5',
            borderRadius: '6px',
            background: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M13.5 1a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM11 2.5a2.5 2.5 0 11.603 1.628l-6.718 3.12a2.499 2.499 0 010 1.504l6.718 3.12a2.5 2.5 0 11-.488.876l-6.718-3.12a2.5 2.5 0 110-3.256l6.718-3.12A2.5 2.5 0 0111 2.5z" />
            </svg>
            Share
          </button>
          <button style={{
            padding: '8px 16px',
            border: 'none',
            borderRadius: '6px',
            background: '#E85A4F',
            color: 'white',
            cursor: 'pointer',
          }}>
            New Analysis
          </button>
        </>
      }
      tabs={
        <div style={{ display: 'flex', gap: '4px' }}>
          {['Overview', 'Documents', 'Analysis', 'Timeline'].map((tab, i) => (
            <button
              key={tab}
              style={{
                padding: '12px 16px',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: i === 0 ? 600 : 400,
                color: i === 0 ? '#E85A4F' : '#6B6B6B',
                borderBottom: i === 0 ? '2px solid #E85A4F' : '2px solid transparent',
                marginBottom: '-1px',
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      }
    />
  ),
};
