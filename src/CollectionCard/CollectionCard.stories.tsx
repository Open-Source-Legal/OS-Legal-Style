import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CollectionCard, CollectionList } from './CollectionCard';

const meta: Meta<typeof CollectionCard> = {
  title: 'Data Display/CollectionCard',
  component: CollectionCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CollectionCard>;

export const Default: Story = {
  args: {
    type: 'legislation',
    badge: 'Legislation',
    status: 'Active discussion',
    title: 'US Federal Code - Annotated',
    description: 'Complete USC with community annotations linking to case law, regulatory guidance, and practical interpretations.',
    stats: ['54 titles', '34.2K annotations', '156 contributors'],
  },
  decorators: [
    (Story) => (
      <div style={{ width: 600 }}>
        <Story />
      </div>
    ),
  ],
};

export const Contracts: Story = {
  args: {
    type: 'contracts',
    badge: 'Contracts',
    status: '12 new annotations today',
    title: 'CUAD Contract Dataset',
    description: 'Contract Understanding Atticus Dataset — expert-annotated commercial agreements for ML training and legal research.',
    stats: ['510 contracts', '13.1K annotations', '42 contributors'],
  },
  decorators: [
    (Story) => (
      <div style={{ width: 600 }}>
        <Story />
      </div>
    ),
  ],
};

export const CaseLaw: Story = {
  args: {
    type: 'case-law',
    badge: 'Case Law',
    status: 'Recently updated',
    title: 'Landmark Privacy Decisions',
    description: 'Curated collection of pivotal privacy and data protection rulings across jurisdictions with comparative analysis.',
    stats: ['234 cases', '8.7K annotations', '89 contributors'],
  },
  decorators: [
    (Story) => (
      <div style={{ width: 600 }}>
        <Story />
      </div>
    ),
  ],
};

export const Knowledge: Story = {
  args: {
    type: 'knowledge',
    badge: 'Knowledge Base',
    status: '3 new entries this week',
    title: 'Contract Clause Encyclopedia',
    description: 'Living reference of standard and non-standard contract clauses with usage guidance, risks, and negotiation notes.',
    stats: ['1,240 entries', '5.2K annotations', '203 contributors'],
  },
  decorators: [
    (Story) => (
      <div style={{ width: 600 }}>
        <Story />
      </div>
    ),
  ],
};

export const Minimal: Story = {
  args: {
    title: 'Simple Collection',
    description: 'A minimal collection card without type or stats.',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 600 }}>
        <Story />
      </div>
    ),
  ],
};

export const Clickable: Story = {
  args: {
    type: 'legislation',
    badge: 'Legislation',
    title: 'Clickable Collection',
    description: 'Click or press Enter to interact with this card.',
    onClick: () => alert('Card clicked!'),
  },
  decorators: [
    (Story) => (
      <div style={{ width: 600 }}>
        <Story />
      </div>
    ),
  ],
};

export const CustomBadgeColor: Story = {
  args: {
    badge: 'Premium',
    badgeColor: { bg: '#FEF3C7', color: '#92400E' },
    title: 'Custom Badge Color',
    description: 'This card has a custom yellow/amber badge color.',
    stats: ['Custom styling'],
  },
  decorators: [
    (Story) => (
      <div style={{ width: 600 }}>
        <Story />
      </div>
    ),
  ],
};

export const List: Story = {
  render: () => (
    <CollectionList gap="md">
      <CollectionCard
        type="legislation"
        badge="Legislation"
        status="Active discussion"
        title="US Federal Code - Annotated"
        description="Complete USC with community annotations linking to case law, regulatory guidance, and practical interpretations."
        stats={['54 titles', '34.2K annotations', '156 contributors']}
      />
      <CollectionCard
        type="contracts"
        badge="Contracts"
        status="12 new annotations today"
        title="CUAD Contract Dataset"
        description="Contract Understanding Atticus Dataset — expert-annotated commercial agreements for ML training and legal research."
        stats={['510 contracts', '13.1K annotations', '42 contributors']}
      />
      <CollectionCard
        type="case-law"
        badge="Case Law"
        status="Recently updated"
        title="Landmark Privacy Decisions"
        description="Curated collection of pivotal privacy and data protection rulings across jurisdictions with comparative analysis."
        stats={['234 cases', '8.7K annotations', '89 contributors']}
      />
      <CollectionCard
        type="knowledge"
        badge="Knowledge Base"
        status="3 new entries this week"
        title="Contract Clause Encyclopedia"
        description="Living reference of standard and non-standard contract clauses with usage guidance, risks, and negotiation notes."
        stats={['1,240 entries', '5.2K annotations', '203 contributors']}
      />
    </CollectionList>
  ),
  decorators: [
    (Story) => (
      <div style={{ width: 700 }}>
        <Story />
      </div>
    ),
  ],
};
