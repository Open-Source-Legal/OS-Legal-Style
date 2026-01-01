import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ExtractCard, ExtractList } from './ExtractCard';

const meta: Meta<typeof ExtractCard> = {
  title: 'Data Display/ExtractCard',
  component: ExtractCard,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    status: {
      control: 'select',
      options: ['pending', 'queued', 'running', 'completed', 'failed'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ExtractCard>;

export const Default: Story = {
  args: {
    name: 'Contract Terms Extraction',
    corpusName: 'SEC Filings 2024',
    status: 'completed',
    documentCount: 156,
    columnCount: 8,
    rowCount: 1243,
    createdAt: '2 days ago',
    completedAt: '1 day ago',
    description: 'Extract key terms, dates, and party information from contracts',
    onClick: () => console.log('Clicked'),
    onMenuClick: () => console.log('Menu clicked'),
  },
};

export const Pending: Story = {
  args: {
    name: 'Party Identification',
    corpusName: 'M&A Documents',
    status: 'pending',
    documentCount: 45,
    columnCount: 3,
    createdAt: 'Just now',
    onClick: () => console.log('Clicked'),
  },
};

export const Queued: Story = {
  args: {
    name: 'Financial Metrics',
    corpusName: 'Annual Reports',
    status: 'queued',
    documentCount: 234,
    columnCount: 12,
    createdAt: '5 minutes ago',
    onClick: () => console.log('Clicked'),
  },
};

export const Running: Story = {
  args: {
    name: 'Clause Classification',
    corpusName: 'Employment Contracts',
    status: 'running',
    progress: 67,
    documentCount: 89,
    columnCount: 5,
    createdAt: '10 minutes ago',
    description: 'Identifying and categorizing contract clauses',
    onClick: () => console.log('Clicked'),
  },
};

export const Failed: Story = {
  args: {
    name: 'Date Extraction',
    corpusName: 'Legacy Documents',
    status: 'failed',
    documentCount: 12,
    columnCount: 4,
    createdAt: '1 hour ago',
    description: 'Failed due to unsupported document format',
    onClick: () => console.log('Clicked'),
  },
};

export const Minimal: Story = {
  args: {
    name: 'Quick Extract',
    status: 'completed',
    documentCount: 5,
    columnCount: 2,
    rowCount: 23,
    onClick: () => console.log('Clicked'),
  },
};

export const ListLayout: StoryObj = {
  render: () => (
    <ExtractList gap="md" layout="list">
      <ExtractCard
        name="Contract Terms Extraction"
        corpusName="SEC Filings 2024"
        status="completed"
        documentCount={156}
        columnCount={8}
        rowCount={1243}
        completedAt="1 day ago"
        onClick={() => console.log('Clicked 1')}
        onMenuClick={() => console.log('Menu 1')}
      />
      <ExtractCard
        name="Party Identification"
        corpusName="M&A Documents"
        status="running"
        progress={45}
        documentCount={89}
        columnCount={5}
        createdAt="10 minutes ago"
        onClick={() => console.log('Clicked 2')}
        onMenuClick={() => console.log('Menu 2')}
      />
      <ExtractCard
        name="Financial Metrics"
        corpusName="Annual Reports"
        status="queued"
        documentCount={234}
        columnCount={12}
        createdAt="5 minutes ago"
        onClick={() => console.log('Clicked 3')}
        onMenuClick={() => console.log('Menu 3')}
      />
      <ExtractCard
        name="Clause Classification"
        status="pending"
        documentCount={45}
        columnCount={3}
        createdAt="Just now"
        onClick={() => console.log('Clicked 4')}
      />
      <ExtractCard
        name="Date Extraction"
        corpusName="Legacy Documents"
        status="failed"
        documentCount={12}
        columnCount={4}
        createdAt="1 hour ago"
        onClick={() => console.log('Clicked 5')}
      />
    </ExtractList>
  ),
};

export const GridLayout: StoryObj = {
  render: () => (
    <ExtractList gap="md" layout="grid">
      <ExtractCard
        name="Contract Terms"
        corpusName="SEC Filings"
        status="completed"
        documentCount={156}
        columnCount={8}
        rowCount={1243}
        completedAt="1 day ago"
        onClick={() => console.log('Clicked')}
        onMenuClick={() => console.log('Menu')}
      />
      <ExtractCard
        name="Party Identification"
        corpusName="M&A Documents"
        status="running"
        progress={67}
        documentCount={89}
        columnCount={5}
        createdAt="10 minutes ago"
        onClick={() => console.log('Clicked')}
      />
      <ExtractCard
        name="Financial Metrics"
        corpusName="Annual Reports"
        status="queued"
        documentCount={234}
        columnCount={12}
        createdAt="5 minutes ago"
        onClick={() => console.log('Clicked')}
      />
      <ExtractCard
        name="Clause Classification"
        status="completed"
        documentCount={45}
        columnCount={3}
        rowCount={189}
        completedAt="2 hours ago"
        onClick={() => console.log('Clicked')}
      />
    </ExtractList>
  ),
};
