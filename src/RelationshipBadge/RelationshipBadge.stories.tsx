import type { Meta, StoryObj } from '@storybook/react';
import { RelationshipBadge } from './RelationshipBadge';

const meta: Meta<typeof RelationshipBadge> = {
  title: 'Graph/RelationshipBadge',
  component: RelationshipBadge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    count: {
      control: { type: 'number', min: 0, max: 150 },
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
    active: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof RelationshipBadge>;

export const Default: Story = {
  args: {
    count: 3,
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <RelationshipBadge count={5} size="sm" />
        <span style={{ fontSize: '12px', color: '#64748B' }}>sm</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <RelationshipBadge count={5} size="md" />
        <span style={{ fontSize: '12px', color: '#64748B' }}>md</span>
      </div>
    </div>
  ),
};

export const Counts: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
      <RelationshipBadge count={1} />
      <RelationshipBadge count={5} />
      <RelationshipBadge count={12} />
      <RelationshipBadge count={99} />
      <RelationshipBadge count={150} />
    </div>
  ),
};

export const Active: Story = {
  args: {
    count: 7,
    active: true,
  },
};

export const Disabled: Story = {
  args: {
    count: 3,
    disabled: true,
  },
};

export const ZeroCount: Story = {
  args: {
    count: 0,
  },
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <RelationshipBadge {...args} />
      <span style={{ fontSize: '12px', color: '#64748B' }}>
        (renders nothing when count is 0)
      </span>
    </div>
  ),
};

export const InFileRow: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '10px 16px',
        background: '#FFFFFF',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        fontFamily: 'Inter, system-ui, sans-serif',
        minWidth: '400px',
      }}
    >
      {/* File icon */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#DC2626"
        strokeWidth="2"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>

      {/* File name */}
      <span style={{ flex: 1, fontSize: '14px', color: '#1E293B' }}>
        Master Services Agreement 2024.pdf
      </span>

      {/* Relationship badge */}
      <RelationshipBadge count={3} size="sm" />

      {/* Modified date */}
      <span style={{ fontSize: '12px', color: '#94A3B8' }}>Dec 28, 2024</span>

      {/* Size */}
      <span style={{ fontSize: '12px', color: '#94A3B8', width: '60px', textAlign: 'right' }}>
        239.3 KB
      </span>
    </div>
  ),
};

export const MultipleFiles: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1px',
        background: '#E2E8F0',
        borderRadius: '8px',
        overflow: 'hidden',
        fontFamily: 'Inter, system-ui, sans-serif',
        minWidth: '450px',
      }}
    >
      {[
        { name: 'Master Services Agreement 2024.pdf', count: 3, date: 'Dec 28, 2024', size: '239.3 KB' },
        { name: 'NDA Template.docx', count: 0, date: 'Dec 25, 2024', size: '43.9 KB' },
        { name: 'Employment Contract - J. Smith.pdf', count: 5, date: 'Dec 22, 2024', size: '125.0 KB' },
        { name: 'Vendor Agreement 2023.pdf', count: 12, date: 'Nov 15, 2024', size: '312.1 KB' },
      ].map((file, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '10px 16px',
            background: '#FFFFFF',
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke={file.name.endsWith('.pdf') ? '#DC2626' : '#2563EB'}
            strokeWidth="2"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          <span style={{ flex: 1, fontSize: '14px', color: '#1E293B' }}>{file.name}</span>
          {file.count > 0 && <RelationshipBadge count={file.count} size="sm" />}
          <span style={{ fontSize: '12px', color: '#94A3B8', minWidth: '80px' }}>{file.date}</span>
          <span style={{ fontSize: '12px', color: '#94A3B8', width: '60px', textAlign: 'right' }}>
            {file.size}
          </span>
        </div>
      ))}
    </div>
  ),
};
