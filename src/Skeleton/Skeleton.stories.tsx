import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
  SkeletonButton,
  DocumentCardSkeleton,
  TableRowSkeleton,
  ChatMessageSkeleton,
} from './Skeleton';
import { skeletonStyles } from './Skeleton.styles';

const styleSheet = document.createElement('style');
styleSheet.textContent = skeletonStyles;
document.head.appendChild(styleSheet);

const meta: Meta<typeof Skeleton> = {
  title: 'Feedback/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'circular', 'rectangular', 'rounded'],
    },
    animation: {
      control: 'select',
      options: ['pulse', 'wave', 'none'],
    },
    width: { control: 'number' },
    height: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Text: Story = {
  args: {
    variant: 'text',
    width: 200,
  },
};

export const Circular: Story = {
  args: {
    variant: 'circular',
    width: 40,
    height: 40,
  },
};

export const Rectangular: Story = {
  args: {
    variant: 'rectangular',
    width: 200,
    height: 120,
  },
};

export const Rounded: Story = {
  args: {
    variant: 'rounded',
    width: 200,
    height: 40,
  },
};

export const Animations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '200px' }}>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '12px', color: '#6B6B6B' }}>Pulse (default)</p>
        <Skeleton variant="rectangular" height={60} animation="pulse" />
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '12px', color: '#6B6B6B' }}>Wave</p>
        <Skeleton variant="rectangular" height={60} animation="wave" />
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '12px', color: '#6B6B6B' }}>None</p>
        <Skeleton variant="rectangular" height={60} animation="none" />
      </div>
    </div>
  ),
};

export const TextBlock: Story = {
  render: () => (
    <div style={{ width: '300px' }}>
      <SkeletonText lines={4} lastLineWidth="60%" />
    </div>
  ),
};

export const Avatar: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <SkeletonAvatar width={32} height={32} />
      <SkeletonAvatar width={40} height={40} />
      <SkeletonAvatar width={48} height={48} />
      <SkeletonAvatar width={64} height={64} />
    </div>
  ),
};

export const Button: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <SkeletonButton width={80} height={32} />
      <SkeletonButton width={100} height={40} />
      <SkeletonButton width={120} height={48} />
    </div>
  ),
};

export const DocumentCard: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <DocumentCardSkeleton />
      <DocumentCardSkeleton />
      <DocumentCardSkeleton />
    </div>
  ),
};

export const TableRows: Story = {
  render: () => (
    <div style={{ width: '600px', border: '1px solid #E5E5E5', borderRadius: '8px', overflow: 'hidden' }}>
      <TableRowSkeleton columns={4} />
      <TableRowSkeleton columns={4} />
      <TableRowSkeleton columns={4} />
      <TableRowSkeleton columns={4} />
    </div>
  ),
};

export const ChatMessages: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <ChatMessageSkeleton />
      <ChatMessageSkeleton />
      <ChatMessageSkeleton />
    </div>
  ),
};

export const CardLoadingState: Story = {
  render: () => (
    <div
      style={{
        width: '320px',
        padding: '16px',
        border: '1px solid #E5E5E5',
        borderRadius: '12px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <SkeletonAvatar width={48} height={48} />
        <div style={{ flex: 1 }}>
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="40%" height={12} style={{ marginTop: '4px' }} />
        </div>
      </div>
      <SkeletonText lines={3} />
      <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
        <SkeletonButton width={80} height={32} />
        <SkeletonButton width={80} height={32} />
      </div>
    </div>
  ),
};
