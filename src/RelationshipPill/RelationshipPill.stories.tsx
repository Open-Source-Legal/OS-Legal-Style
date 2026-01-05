import type { Meta, StoryObj } from '@storybook/react';
import { RelationshipPill } from './RelationshipPill';

const FileIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);

const meta: Meta<typeof RelationshipPill> = {
  title: 'Graph/RelationshipPill',
  component: RelationshipPill,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '320px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof RelationshipPill>;

export const Default: Story = {
  args: {
    title: 'NDA Template.docx',
    relationshipType: 'cites',
  },
};

export const WithIcon: Story = {
  args: {
    title: 'NDA Template.docx',
    relationshipType: 'cites',
    icon: <FileIcon />,
  },
};

export const Directions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <RelationshipPill
        title="NDA Template.docx"
        relationshipType="cites"
        direction="outgoing"
        icon={<FileIcon />}
      />
      <RelationshipPill
        title="Master Agreement.pdf"
        relationshipType="cited by"
        direction="incoming"
        icon={<FileIcon />}
      />
    </div>
  ),
};

export const RelationshipTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <RelationshipPill title="Document A" relationshipType="cites" icon={<FileIcon />} />
      <RelationshipPill title="Document B" relationshipType="references" icon={<FileIcon />} />
      <RelationshipPill title="Document C" relationshipType="amends" icon={<FileIcon />} />
      <RelationshipPill title="Document D" relationshipType="supersedes" icon={<FileIcon />} />
      <RelationshipPill title="Document E" relationshipType="defines" icon={<FileIcon />} />
      <RelationshipPill title="Document F" relationshipType="interprets" icon={<FileIcon />} />
    </div>
  ),
};

export const WithCustomColor: Story = {
  args: {
    title: 'Contract Amendment.pdf',
    relationshipType: 'amends',
    relationshipColor: '#7C3AED',
    icon: <FileIcon />,
  },
};

export const AIDetected: Story = {
  args: {
    title: 'Related Case Law.pdf',
    relationshipType: 'interprets',
    source: 'analyzer',
    icon: <FileIcon />,
  },
};

export const Sources: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <RelationshipPill
        title="Manual Link.pdf"
        relationshipType="cites"
        source="manual"
        icon={<FileIcon />}
      />
      <RelationshipPill
        title="AI Detected.pdf"
        relationshipType="references"
        source="analyzer"
        icon={<FileIcon />}
      />
      <RelationshipPill
        title="Imported Link.pdf"
        relationshipType="related"
        source="imported"
        icon={<FileIcon />}
      />
    </div>
  ),
};

export const Active: Story = {
  args: {
    title: 'Selected Document.pdf',
    relationshipType: 'cites',
    active: true,
    icon: <FileIcon />,
  },
};

export const Disabled: Story = {
  args: {
    title: 'Disabled Document.pdf',
    relationshipType: 'cites',
    disabled: true,
    icon: <FileIcon />,
  },
};

export const LongTitle: Story = {
  args: {
    title: 'Very Long Document Title That Should Be Truncated With Ellipsis.pdf',
    relationshipType: 'references',
    icon: <FileIcon />,
  },
};

export const InPopoverContext: Story = {
  render: () => (
    <div
      style={{
        background: '#FFFFFF',
        borderRadius: '12px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
        overflow: 'hidden',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '12px 16px',
          borderBottom: '1px solid #E2E8F0',
        }}
      >
        <span style={{ fontSize: '13px', fontWeight: 500, color: '#1E293B' }}>
          3 Related Documents
        </span>
      </div>

      {/* List */}
      <div style={{ padding: '4px' }}>
        <RelationshipPill
          title="NDA Template.docx"
          relationshipType="references"
          direction="outgoing"
          icon={<FileIcon />}
        />
        <RelationshipPill
          title="Employment Contract - J. Smith.pdf"
          relationshipType="cited by"
          direction="incoming"
          icon={<FileIcon />}
        />
        <RelationshipPill
          title="Vendor Agreement 2023.pdf"
          relationshipType="supersedes"
          direction="outgoing"
          source="analyzer"
          icon={<FileIcon />}
        />
      </div>

      {/* Footer */}
      <div
        style={{
          padding: '8px 16px',
          borderTop: '1px solid #E2E8F0',
          background: '#F8FAFC',
        }}
      >
        <button
          style={{
            width: '100%',
            padding: '6px 12px',
            background: 'transparent',
            border: 'none',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: 500,
            color: '#0F766E',
            cursor: 'pointer',
          }}
        >
          View in Graph →
        </button>
      </div>
    </div>
  ),
};
