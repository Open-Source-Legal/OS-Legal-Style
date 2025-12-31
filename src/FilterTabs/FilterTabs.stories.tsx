import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FilterTabs, FilterTab } from './FilterTabs';

const meta: Meta<typeof FilterTabs> = {
  title: 'Navigation/FilterTabs',
  component: FilterTabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FilterTabs>;

const basicItems = [
  { id: 'all', label: 'All' },
  { id: 'documents', label: 'Documents' },
  { id: 'collections', label: 'Collections' },
  { id: 'annotations', label: 'Annotations' },
];

const itemsWithCounts = [
  { id: 'all', label: 'All', count: null },
  { id: 'legislation', label: 'Legislation', count: '2.4K' },
  { id: 'contracts', label: 'Contracts', count: '12K' },
  { id: 'case-law', label: 'Case Law', count: '8.1K' },
  { id: 'knowledge', label: 'Knowledge', count: '340' },
];

export const Default: Story = {
  render: () => {
    const [active, setActive] = useState('all');
    return (
      <FilterTabs
        items={basicItems}
        value={active}
        onChange={setActive}
      />
    );
  },
};

export const WithCounts: Story = {
  render: () => {
    const [active, setActive] = useState('all');
    return (
      <FilterTabs
        items={itemsWithCounts}
        value={active}
        onChange={setActive}
      />
    );
  },
};

export const Small: Story = {
  render: () => {
    const [active, setActive] = useState('all');
    return (
      <FilterTabs
        items={basicItems}
        value={active}
        onChange={setActive}
        size="sm"
      />
    );
  },
};

export const Large: Story = {
  render: () => {
    const [active, setActive] = useState('all');
    return (
      <FilterTabs
        items={basicItems}
        value={active}
        onChange={setActive}
        size="lg"
      />
    );
  },
};

export const UnderlineVariant: Story = {
  render: () => {
    const [active, setActive] = useState('all');
    return (
      <div style={{ width: 600 }}>
        <FilterTabs
          items={basicItems}
          value={active}
          onChange={setActive}
          variant="underline"
        />
      </div>
    );
  },
};

export const WithIcons: Story = {
  render: () => {
    const [active, setActive] = useState('all');

    const itemsWithIcons = [
      {
        id: 'all',
        label: 'All',
        icon: (
          <svg viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 4a.5.5 0 01.5.5v3h3a.5.5 0 010 1h-3v3a.5.5 0 01-1 0v-3h-3a.5.5 0 010-1h3v-3A.5.5 0 018 4z" />
          </svg>
        ),
      },
      {
        id: 'documents',
        label: 'Documents',
        count: '142',
        icon: (
          <svg viewBox="0 0 16 16" fill="currentColor">
            <path d="M4 0a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4.5L9.5 0H4zm5 0v4h4L9 0z" />
          </svg>
        ),
      },
      {
        id: 'annotations',
        label: 'Annotations',
        count: '89',
        icon: (
          <svg viewBox="0 0 16 16" fill="currentColor">
            <path d="M14.5 3a.5.5 0 01.5.5v9a.5.5 0 01-.5.5h-13a.5.5 0 01-.5-.5v-9a.5.5 0 01.5-.5h13zM1.5 2A1.5 1.5 0 000 3.5v9A1.5 1.5 0 001.5 14h13a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0014.5 2h-13z" />
          </svg>
        ),
      },
    ];

    return (
      <FilterTabs
        items={itemsWithIcons}
        value={active}
        onChange={setActive}
      />
    );
  },
};

export const IndividualTab: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <FilterTab>Inactive</FilterTab>
      <FilterTab active>Active</FilterTab>
      <FilterTab count="12">With Count</FilterTab>
      <FilterTab disabled>Disabled</FilterTab>
    </div>
  ),
};
