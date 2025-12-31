import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';
import { selectStyles } from './Select.styles';

const styleSheet = document.createElement('style');
styleSheet.textContent = selectStyles;
document.head.appendChild(styleSheet);

const meta: Meta<typeof Select> = {
  title: 'Forms/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    searchable: { control: 'boolean' },
    clearable: { control: 'boolean' },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '280px', minHeight: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Select>;

const basicOptions = [
  { value: 'contract', label: 'Contract' },
  { value: 'brief', label: 'Legal Brief' },
  { value: 'memo', label: 'Memorandum' },
  { value: 'agreement', label: 'Agreement' },
  { value: 'notice', label: 'Notice' },
];

const groupedOptions = [
  {
    label: 'Legal Documents',
    options: [
      { value: 'contract', label: 'Contract' },
      { value: 'brief', label: 'Legal Brief' },
      { value: 'memo', label: 'Memorandum' },
    ],
  },
  {
    label: 'Business Documents',
    options: [
      { value: 'proposal', label: 'Proposal' },
      { value: 'report', label: 'Report' },
      { value: 'invoice', label: 'Invoice' },
    ],
  },
];

export const Default: Story = {
  args: {
    label: 'Document Type',
    placeholder: 'Select type...',
    options: basicOptions,
  },
};

export const WithDefaultValue: Story = {
  args: {
    label: 'Document Type',
    options: basicOptions,
    defaultValue: 'contract',
  },
};

export const Searchable: Story = {
  args: {
    label: 'Document Type',
    placeholder: 'Search...',
    options: basicOptions,
    searchable: true,
  },
};

export const Clearable: Story = {
  args: {
    label: 'Document Type',
    options: basicOptions,
    defaultValue: 'contract',
    clearable: true,
  },
};

export const SearchableAndClearable: Story = {
  args: {
    label: 'Document Type',
    placeholder: 'Search and select...',
    options: basicOptions,
    searchable: true,
    clearable: true,
    defaultValue: 'brief',
  },
};

export const WithGroups: Story = {
  args: {
    label: 'Document Type',
    placeholder: 'Select type...',
    options: groupedOptions,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Document Type',
    placeholder: 'Select type...',
    options: basicOptions,
    helperText: 'Choose the type of document you want to create',
  },
};

export const WithError: Story = {
  args: {
    label: 'Document Type',
    placeholder: 'Select type...',
    options: basicOptions,
    error: 'Please select a document type',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Document Type',
    options: basicOptions,
    defaultValue: 'contract',
    disabled: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Select
        label="Small"
        size="sm"
        options={basicOptions}
        placeholder="Select..."
      />
      <Select
        label="Medium"
        size="md"
        options={basicOptions}
        placeholder="Select..."
      />
      <Select
        label="Large"
        size="lg"
        options={basicOptions}
        placeholder="Select..."
      />
    </div>
  ),
  decorators: [
    (Story) => (
      <div style={{ width: '280px', minHeight: '450px' }}>
        <Story />
      </div>
    ),
  ],
};

export const DisabledOptions: Story = {
  args: {
    label: 'Document Type',
    placeholder: 'Select type...',
    options: [
      { value: 'contract', label: 'Contract' },
      { value: 'brief', label: 'Legal Brief', disabled: true },
      { value: 'memo', label: 'Memorandum' },
      { value: 'agreement', label: 'Agreement', disabled: true },
    ],
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Document Type',
    options: basicOptions,
    fullWidth: true,
    placeholder: 'Select...',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px', minHeight: '300px' }}>
        <Story />
      </div>
    ),
  ],
};
