import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { StatBlock, StatGrid } from './StatBlock';

const meta: Meta<typeof StatBlock> = {
  title: 'Data Display/StatBlock',
  component: StatBlock,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof StatBlock>;

export const Default: Story = {
  args: {
    value: '23K+',
    label: 'Documents',
    sublabel: 'across all domains',
  },
};

export const WithoutSublabel: Story = {
  args: {
    value: '142',
    label: 'Active Users',
  },
};

export const DefaultVariant: Story = {
  args: {
    value: '89',
    label: 'Organizations',
    sublabel: 'participating',
    variant: 'default',
  },
};

export const MutedVariant: Story = {
  args: {
    value: '340',
    label: 'Knowledge Entries',
    sublabel: 'in database',
    variant: 'muted',
  },
};

export const Small: Story = {
  args: {
    value: '1.2K',
    label: 'Contributors',
    sublabel: 'from 64 countries',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    value: '142K',
    label: 'Annotations',
    sublabel: 'community contributed',
    size: 'lg',
  },
};

export const Centered: Story = {
  args: {
    value: '23K+',
    label: 'Documents',
    sublabel: 'across all domains',
    align: 'center',
  },
};

export const WithIcon: Story = {
  args: {
    value: '156',
    label: 'Contributors',
    sublabel: 'this month',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 12a5 5 0 100-10 5 5 0 000 10zM4 20c0-4 4-6 8-6s8 2 8 6H4z" />
      </svg>
    ),
  },
};

export const Grid2x2: Story = {
  render: () => (
    <StatGrid columns={2} gap="md">
      <StatBlock value="23K+" label="Documents" sublabel="across all domains" />
      <StatBlock value="142K" label="Annotations" sublabel="community contributed" />
      <StatBlock value="1.2K" label="Contributors" sublabel="from 64 countries" />
      <StatBlock value="89" label="Organizations" sublabel="participating" />
    </StatGrid>
  ),
  decorators: [
    (Story) => (
      <div style={{ width: 600 }}>
        <Story />
      </div>
    ),
  ],
};

export const Grid3Column: Story = {
  render: () => (
    <StatGrid columns={3} gap="md">
      <StatBlock value="23K+" label="Documents" />
      <StatBlock value="142K" label="Annotations" />
      <StatBlock value="1.2K" label="Contributors" />
    </StatGrid>
  ),
  decorators: [
    (Story) => (
      <div style={{ width: 700 }}>
        <Story />
      </div>
    ),
  ],
};

export const Grid4Column: Story = {
  render: () => (
    <StatGrid columns={4} gap="sm">
      <StatBlock value="23K+" label="Documents" size="sm" />
      <StatBlock value="142K" label="Annotations" size="sm" />
      <StatBlock value="1.2K" label="Contributors" size="sm" />
      <StatBlock value="89" label="Organizations" size="sm" />
    </StatGrid>
  ),
  decorators: [
    (Story) => (
      <div style={{ width: 800 }}>
        <Story />
      </div>
    ),
  ],
};
