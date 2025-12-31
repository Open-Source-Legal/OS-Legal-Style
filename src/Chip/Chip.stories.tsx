import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Chip, ChipGroup, SuggestionChip, FilterChip } from './Chip';
import { chipStyles } from './Chip.styles';

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = chipStyles;
document.head.appendChild(styleSheet);

const meta: Meta<typeof Chip> = {
  title: 'Chat/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'soft'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    color: {
      control: 'select',
      options: ['default', 'accent', 'success', 'warning', 'error', 'info'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  args: {
    children: 'Chip Label',
    variant: 'soft',
    color: 'default',
    size: 'md',
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Chip variant="filled">Filled</Chip>
      <Chip variant="soft">Soft</Chip>
      <Chip variant="outlined">Outlined</Chip>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Chip color="default">Default</Chip>
      <Chip color="accent">Accent</Chip>
      <Chip color="success">Success</Chip>
      <Chip color="warning">Warning</Chip>
      <Chip color="error">Error</Chip>
      <Chip color="info">Info</Chip>
    </div>
  ),
};

export const FilledColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Chip variant="filled" color="default">Default</Chip>
      <Chip variant="filled" color="accent">Accent</Chip>
      <Chip variant="filled" color="success">Success</Chip>
      <Chip variant="filled" color="warning">Warning</Chip>
      <Chip variant="filled" color="error">Error</Chip>
      <Chip variant="filled" color="info">Info</Chip>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Chip size="sm">Small</Chip>
      <Chip size="md">Medium</Chip>
      <Chip size="lg">Large</Chip>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Chip
        icon={
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
            <path d="M7 0a7 7 0 100 14A7 7 0 007 0zm.5 10.5a.5.5 0 01-1 0v-4a.5.5 0 011 0v4zm0-6a.5.5 0 01-1 0v-.5a.5.5 0 011 0v.5z" />
          </svg>
        }
      >
        With Icon
      </Chip>
      <Chip
        color="success"
        icon={
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
            <path fillRule="evenodd" d="M7 14A7 7 0 107 0a7 7 0 000 14zm3.78-8.78a.75.75 0 00-1.06-1.06L6 7.94 4.28 6.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.06 0l4.25-4.25z" clipRule="evenodd" />
          </svg>
        }
      >
        Verified
      </Chip>
    </div>
  ),
};

export const Removable: Story = {
  render: () => {
    const [chips, setChips] = useState(['Document.pdf', 'Contract.docx', 'Notes.txt']);

    return (
      <ChipGroup>
        {chips.map((chip) => (
          <Chip
            key={chip}
            removable
            onRemove={() => setChips(chips.filter((c) => c !== chip))}
          >
            {chip}
          </Chip>
        ))}
      </ChipGroup>
    );
  },
};

export const SuggestionChips: Story = {
  render: () => (
    <ChipGroup>
      <SuggestionChip>Analyze contradictions</SuggestionChip>
      <SuggestionChip>Create timeline</SuggestionChip>
      <SuggestionChip>Export summary</SuggestionChip>
    </ChipGroup>
  ),
};

export const FilterChips: Story = {
  render: () => {
    const [filters, setFilters] = useState({
      pdf: true,
      docx: false,
      email: true,
    });

    return (
      <ChipGroup>
        <FilterChip
          checked={filters.pdf}
          onCheckedChange={(checked) => setFilters({ ...filters, pdf: checked })}
        >
          PDF Documents
        </FilterChip>
        <FilterChip
          checked={filters.docx}
          onCheckedChange={(checked) => setFilters({ ...filters, docx: checked })}
        >
          Word Documents
        </FilterChip>
        <FilterChip
          checked={filters.email}
          onCheckedChange={(checked) => setFilters({ ...filters, email: checked })}
        >
          Emails
        </FilterChip>
      </ChipGroup>
    );
  },
};

export const InputModes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Chip
        variant="outlined"
        size="sm"
        icon={
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
            <path d="M10 1H2a1 1 0 00-1 1v8a1 1 0 001 1h8a1 1 0 001-1V2a1 1 0 00-1-1zM2 0a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2V2a2 2 0 00-2-2H2z" />
            <path d="M4.5 6.5L6 8l3-3" stroke="currentColor" strokeWidth="1.5" fill="none" />
          </svg>
        }
      >
        Legal research
      </Chip>
      <Chip variant="outlined" size="sm">Database</Chip>
      <Chip variant="outlined" size="sm">Web</Chip>
    </div>
  ),
};

export const Static: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px' }}>
      <Chip static color="success">Approved</Chip>
      <Chip static color="warning">Pending Review</Chip>
      <Chip static color="error">Rejected</Chip>
    </div>
  ),
};
