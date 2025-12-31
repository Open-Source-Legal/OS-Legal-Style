import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SearchBox } from './SearchBox';

const meta: Meta<typeof SearchBox> = {
  title: 'Forms/SearchBox',
  component: SearchBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SearchBox>;

export const Default: Story = {
  args: {
    placeholder: 'Search...',
    buttonText: 'Search',
  },
};

export const WithSubmit: Story = {
  render: () => {
    const [query, setQuery] = useState('');
    const [submitted, setSubmitted] = useState('');

    return (
      <div style={{ width: 500 }}>
        <SearchBox
          placeholder="Search documents, collections..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onSubmit={(value) => setSubmitted(value)}
        />
        {submitted && (
          <p style={{ marginTop: 16, color: '#64748B', fontSize: 14 }}>
            Searched for: <strong>{submitted}</strong>
          </p>
        )}
      </div>
    );
  },
};

export const Small: Story = {
  args: {
    placeholder: 'Quick search...',
    size: 'sm',
    buttonText: 'Go',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 400 }}>
        <Story />
      </div>
    ),
  ],
};

export const Large: Story = {
  args: {
    placeholder: 'Search across all legal knowledge...',
    size: 'lg',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 600 }}>
        <Story />
      </div>
    ),
  ],
};

export const Loading: Story = {
  args: {
    placeholder: 'Searching...',
    value: 'contract indemnification',
    loading: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 500 }}>
        <Story />
      </div>
    ),
  ],
};

export const WithoutButton: Story = {
  args: {
    placeholder: 'Type to search...',
    hideButton: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 400 }}>
        <Story />
      </div>
    ),
  ],
};

export const CustomButtonContent: Story = {
  args: {
    placeholder: 'Search...',
    buttonContent: (
      <>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M11.742 10.344a6.5 6.5 0 10-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 001.415-1.414l-3.85-3.85a1.007 1.007 0 00-.115-.1zM12 6.5a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0z" />
        </svg>
        Find
      </>
    ),
  },
  decorators: [
    (Story) => (
      <div style={{ width: 500 }}>
        <Story />
      </div>
    ),
  ],
};
