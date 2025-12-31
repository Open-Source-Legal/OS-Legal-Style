import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ActivityFeed, ActivityItem } from './ActivityFeed';

const meta: Meta<typeof ActivityFeed> = {
  title: 'Data Display/ActivityFeed',
  component: ActivityFeed,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ActivityFeed>;

const sampleActivities = [
  {
    id: 1,
    name: 'Sarah Chen',
    initials: 'SC',
    avatarColor: '#3B82F6',
    action: 'annotated',
    target: 'Liability Clause Analysis',
    time: '12m ago',
  },
  {
    id: 2,
    name: 'Marcus Webb',
    initials: 'MW',
    avatarColor: '#10B981',
    action: 'created',
    target: 'Indemnification Guide',
    time: '1h ago',
  },
  {
    id: 3,
    name: 'Research Team',
    initials: 'RT',
    avatarColor: '#8B5CF6',
    action: 'published',
    target: 'Contract Dataset v2.0',
    time: '3h ago',
  },
  {
    id: 4,
    name: 'Dr. Rivera',
    initials: 'DR',
    avatarColor: '#EF4444',
    action: 'commented on',
    target: 'Regulatory Compliance Review',
    time: '5h ago',
  },
];

export const Default: Story = {
  args: {
    items: sampleActivities,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 500 }}>
        <Story />
      </div>
    ),
  ],
};

export const WithViewAll: Story = {
  args: {
    items: sampleActivities,
    viewAllUrl: '#',
    viewAllText: 'View all activity',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 500 }}>
        <Story />
      </div>
    ),
  ],
};

export const WithOnViewAll: Story = {
  args: {
    items: sampleActivities,
    onViewAll: () => alert('View all clicked!'),
    viewAllText: 'See more activity',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 500 }}>
        <Story />
      </div>
    ),
  ],
};

export const NoDividers: Story = {
  args: {
    items: sampleActivities,
    dividers: false,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 500 }}>
        <Story />
      </div>
    ),
  ],
};

export const WithLinks: Story = {
  args: {
    items: sampleActivities.map((item) => ({
      ...item,
      targetUrl: '#',
    })),
    viewAllUrl: '#',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 500 }}>
        <Story />
      </div>
    ),
  ],
};

export const WithChildren: Story = {
  render: () => (
    <ActivityFeed viewAllUrl="#">
      <ActivityItem
        name="John Doe"
        avatarColor="#F59E0B"
        action="updated"
        target="Privacy Policy Template"
        time="Just now"
      />
      <ActivityItem
        name="Jane Smith"
        avatarColor="#EC4899"
        action="reviewed"
        target="Merger Agreement Draft"
        time="2h ago"
      />
      <ActivityItem
        name="Alex Johnson"
        avatarColor="#14B8A6"
        action="approved"
        target="Vendor Contract"
        time="Yesterday"
      />
    </ActivityFeed>
  ),
  decorators: [
    (Story) => (
      <div style={{ width: 500 }}>
        <Story />
      </div>
    ),
  ],
};

export const SingleItem: Story = {
  render: () => (
    <ActivityItem
      name="Sarah Chen"
      initials="SC"
      avatarColor="#3B82F6"
      action="annotated"
      target="Liability Clause Analysis"
      targetUrl="#"
      time="12m ago"
    />
  ),
  decorators: [
    (Story) => (
      <div style={{ width: 500 }}>
        <Story />
      </div>
    ),
  ],
};
