import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarGroup, AIAvatar } from './Avatar';
import { avatarStyles } from './Avatar.styles';

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = avatarStyles;
document.head.appendChild(styleSheet);

const meta: Meta<typeof Avatar> = {
  title: 'Chat/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    status: {
      control: 'select',
      options: [undefined, 'online', 'offline', 'busy', 'away'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    fallback: 'JD',
    size: 'md',
  },
};

export const WithImage: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    alt: 'User avatar',
    size: 'lg',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <Avatar fallback="XS" size="xs" />
      <Avatar fallback="SM" size="sm" />
      <Avatar fallback="MD" size="md" />
      <Avatar fallback="LG" size="lg" />
      <Avatar fallback="XL" size="xl" />
    </div>
  ),
};

export const WithStatus: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
      <Avatar fallback="ON" status="online" />
      <Avatar fallback="OF" status="offline" />
      <Avatar fallback="BU" status="busy" />
      <Avatar fallback="AW" status="away" />
    </div>
  ),
};

export const AccentVariant: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <Avatar fallback="AI" accent />
      <Avatar fallback="OC" accent size="lg" />
    </div>
  ),
};

export const AIAvatarStory: Story = {
  name: 'AI Avatar',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <AIAvatar size="sm" />
      <AIAvatar size="md" />
      <AIAvatar size="lg" />
    </div>
  ),
};

export const Group: Story = {
  render: () => (
    <AvatarGroup max={4}>
      <Avatar fallback="JD" />
      <Avatar fallback="AS" />
      <Avatar fallback="MK" />
      <Avatar fallback="RL" />
      <Avatar fallback="PT" />
      <Avatar fallback="CB" />
    </AvatarGroup>
  ),
};

export const Square: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <Avatar fallback="📄" square />
      <Avatar fallback="OC" square accent />
    </div>
  ),
};
