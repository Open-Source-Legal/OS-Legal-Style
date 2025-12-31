import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  EmptyState,
  EmptyDocumentIcon,
  EmptySearchIcon,
  EmptyFolderIcon,
  EmptyInboxIcon,
  EmptyNotificationIcon,
} from './EmptyState';
import { emptyStateStyles } from './EmptyState.styles';

const styleSheet = document.createElement('style');
styleSheet.textContent = emptyStateStyles;
document.head.appendChild(styleSheet);

const meta: Meta<typeof EmptyState> = {
  title: 'Feedback/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

const Button = ({ children, primary = false }: { children: React.ReactNode; primary?: boolean }) => (
  <button
    style={{
      padding: '8px 16px',
      background: primary ? '#E85A4F' : 'transparent',
      color: primary ? 'white' : '#E85A4F',
      border: primary ? 'none' : '1px solid #E5E5E5',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: 500,
      cursor: 'pointer',
    }}
  >
    {children}
  </button>
);

export const Default: Story = {
  args: {
    icon: <EmptyDocumentIcon />,
    title: 'No documents yet',
    description: 'Upload your first document to get started with OpenContracts.',
    action: <Button primary>Upload Document</Button>,
  },
};

export const WithSecondaryAction: Story = {
  args: {
    icon: <EmptyFolderIcon />,
    title: 'This folder is empty',
    description: 'Create a new document or upload existing files.',
    action: <Button primary>Create Document</Button>,
    secondaryAction: <Button>Upload Files</Button>,
  },
};

export const SearchNoResults: Story = {
  args: {
    icon: <EmptySearchIcon />,
    title: 'No results found',
    description: 'Try adjusting your search or filters to find what you\'re looking for.',
    action: <Button>Clear filters</Button>,
  },
};

export const InboxEmpty: Story = {
  args: {
    icon: <EmptyInboxIcon />,
    title: 'Your inbox is empty',
    description: 'You\'re all caught up! New messages will appear here.',
  },
};

export const NoNotifications: Story = {
  args: {
    icon: <EmptyNotificationIcon />,
    title: 'No notifications',
    description: 'You\'ll be notified when there are updates to your documents.',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div style={{ border: '1px dashed #E5E5E5', borderRadius: '12px' }}>
        <EmptyState
          size="sm"
          icon={<EmptyDocumentIcon />}
          title="Small empty state"
          description="Compact version for inline use."
        />
      </div>
      <div style={{ border: '1px dashed #E5E5E5', borderRadius: '12px' }}>
        <EmptyState
          size="md"
          icon={<EmptyDocumentIcon />}
          title="Medium empty state"
          description="Default size for most use cases."
        />
      </div>
      <div style={{ border: '1px dashed #E5E5E5', borderRadius: '12px' }}>
        <EmptyState
          size="lg"
          icon={<EmptyDocumentIcon />}
          title="Large empty state"
          description="For full-page empty states."
        />
      </div>
    </div>
  ),
};

export const CustomIcon: Story = {
  args: {
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#E85A4F" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    title: 'Connect your data',
    description: 'Integrate with your existing systems to import documents automatically.',
    action: <Button primary>Set up integration</Button>,
  },
};

export const InCard: Story = {
  render: () => (
    <div
      style={{
        width: '400px',
        background: 'white',
        border: '1px solid #E5E5E5',
        borderRadius: '12px',
        overflow: 'hidden',
      }}
    >
      <div style={{ padding: '12px 16px', borderBottom: '1px solid #E5E5E5', fontWeight: 600 }}>
        Recent Documents
      </div>
      <EmptyState
        size="sm"
        icon={<EmptyDocumentIcon />}
        title="No recent documents"
        description="Documents you view will appear here."
      />
    </div>
  ),
};
