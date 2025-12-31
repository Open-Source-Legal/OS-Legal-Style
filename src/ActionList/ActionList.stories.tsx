import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ActionList, ActionItem } from './ActionList';

const meta: Meta<typeof ActionList> = {
  title: 'Navigation/ActionList',
  component: ActionList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ActionList>;

// Icons
const UploadIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 12.75v1.5a1.5 1.5 0 001.5 1.5h9a1.5 1.5 0 001.5-1.5v-1.5M12 6L9 3M9 3L6 6M9 3v9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const JoinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 6.75a3 3 0 11-6 0 3 3 0 016 0zM3.75 15.75v-.75a4.5 4.5 0 014.5-4.5h1.5M15 11.25v4.5M12.75 13.5h4.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CreateIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3.75 3.75h10.5v10.5H3.75zM9 6.75v4.5M6.75 9h4.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const GuideIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4.5 2.25h9a1.5 1.5 0 011.5 1.5v10.5a1.5 1.5 0 01-1.5 1.5h-9a1.5 1.5 0 01-1.5-1.5V3.75a1.5 1.5 0 011.5-1.5zM6.75 6h4.5M6.75 9h4.5M6.75 12h2.25" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const sampleItems = [
  { id: 1, label: 'Upload your first document', icon: <UploadIcon /> },
  { id: 2, label: 'Join an existing project', icon: <JoinIcon /> },
  { id: 3, label: 'Create a new collection', icon: <CreateIcon /> },
  { id: 4, label: 'Read the contributor guide', icon: <GuideIcon /> },
];

export const Default: Story = {
  args: {
    items: sampleItems,
    onItemClick: (item) => console.log('Clicked:', item.label),
  },
  decorators: [
    (Story) => (
      <div style={{ width: 400 }}>
        <Story />
      </div>
    ),
  ],
};

export const CardVariant: Story = {
  args: {
    items: sampleItems,
    variant: 'card',
    onItemClick: (item) => console.log('Clicked:', item.label),
  },
  decorators: [
    (Story) => (
      <div style={{ width: 400 }}>
        <Story />
      </div>
    ),
  ],
};

export const Small: Story = {
  args: {
    items: sampleItems,
    size: 'sm',
    variant: 'card',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 350 }}>
        <Story />
      </div>
    ),
  ],
};

export const Large: Story = {
  args: {
    items: sampleItems,
    size: 'lg',
    variant: 'card',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 450 }}>
        <Story />
      </div>
    ),
  ],
};

export const WithDescriptions: Story = {
  args: {
    items: [
      {
        id: 1,
        label: 'Upload document',
        description: 'Add PDF, DOCX, or plain text files',
        icon: <UploadIcon />,
      },
      {
        id: 2,
        label: 'Join project',
        description: 'Collaborate with other contributors',
        icon: <JoinIcon />,
      },
      {
        id: 3,
        label: 'Create collection',
        description: 'Organize related documents together',
        icon: <CreateIcon />,
      },
    ],
    variant: 'card',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 400 }}>
        <Story />
      </div>
    ),
  ],
};

export const WithLinks: Story = {
  args: {
    items: [
      { id: 1, label: 'Documentation', icon: <GuideIcon />, href: '#docs' },
      { id: 2, label: 'API Reference', icon: <GuideIcon />, href: '#api' },
      { id: 3, label: 'Examples', icon: <CreateIcon />, href: '#examples' },
    ],
    variant: 'card',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 350 }}>
        <Story />
      </div>
    ),
  ],
};

export const WithDisabled: Story = {
  args: {
    items: [
      { id: 1, label: 'Available action', icon: <UploadIcon /> },
      { id: 2, label: 'Disabled action', icon: <JoinIcon />, disabled: true },
      { id: 3, label: 'Another available', icon: <CreateIcon /> },
    ],
    variant: 'card',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 350 }}>
        <Story />
      </div>
    ),
  ],
};

export const UsingChildren: Story = {
  render: () => (
    <ActionList variant="card">
      <ActionItem icon={<UploadIcon />}>Upload document</ActionItem>
      <ActionItem icon={<JoinIcon />}>Join project</ActionItem>
      <ActionItem icon={<CreateIcon />}>Create collection</ActionItem>
      <ActionItem icon={<GuideIcon />} href="#">
        Read guide
      </ActionItem>
    </ActionList>
  ),
  decorators: [
    (Story) => (
      <div style={{ width: 350 }}>
        <Story />
      </div>
    ),
  ],
};
