import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SearchInput } from './SearchInput';
import { searchInputStyles } from './SearchInput.styles';

const styleSheet = document.createElement('style');
styleSheet.textContent = searchInputStyles;
document.head.appendChild(styleSheet);

const meta: Meta<typeof SearchInput> = {
  title: 'Search/SearchInput',
  component: SearchInput,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    loading: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '360px', minHeight: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SearchInput>;

export const Default: Story = {
  args: {
    placeholder: 'Search documents...',
  },
};

export const WithShortcut: Story = {
  args: {
    placeholder: 'Search documents...',
    shortcut: '⌘K',
  },
};

export const WithRecentSearches: Story = {
  args: {
    placeholder: 'Search documents...',
    shortcut: '⌘K',
    recentSearches: [
      'contract amendment',
      'NDA agreement',
      'stock purchase',
      'employment contract',
    ],
  },
};

export const WithSuggestions: Story = {
  render: () => {
    const [query, setQuery] = useState('con');
    const suggestions = [
      { id: '1', label: 'Contract Agreement - v2.1' },
      { id: '2', label: 'Consulting Services Contract' },
      { id: '3', label: 'Confidentiality Agreement' },
      { id: '4', label: 'Construction Contract' },
    ].filter(s => s.label.toLowerCase().includes(query.toLowerCase()));

    return (
      <SearchInput
        placeholder="Search documents..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        suggestions={suggestions}
        onSearch={(q) => alert(`Searching for: ${q}`)}
      />
    );
  },
};

export const Loading: Story = {
  args: {
    placeholder: 'Searching...',
    loading: true,
    defaultValue: 'contract',
  },
};

export const FullWidth: Story = {
  args: {
    placeholder: 'Search documents...',
    shortcut: '⌘K',
    fullWidth: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '100%', maxWidth: '600px', minHeight: '200px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Interactive: Story = {
  render: () => {
    const [query, setQuery] = useState('');
    const [searches, setSearches] = useState<string[]>([
      'previous search 1',
      'previous search 2',
    ]);
    const [loading, setLoading] = useState(false);

    const handleSearch = (q: string) => {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        if (q && !searches.includes(q)) {
          setSearches(prev => [q, ...prev.slice(0, 4)]);
        }
        alert(`Search results for: ${q}`);
      }, 1000);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <SearchInput
          placeholder="Search documents..."
          shortcut="⌘K"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          recentSearches={searches}
          onSearch={handleSearch}
          onClear={() => setQuery('')}
          loading={loading}
          fullWidth
        />
        <p style={{ fontSize: '12px', color: '#6B6B6B' }}>
          Try searching! Recent searches are saved.
        </p>
      </div>
    );
  },
};

export const GlobalSearchExample: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '12px 16px',
        background: '#FAFAFA',
        borderRadius: '12px',
      }}
    >
      <div style={{ fontWeight: 600, fontSize: '14px' }}>OpenContracts</div>
      <SearchInput
        placeholder="Search documents, clauses, or ask a question..."
        shortcut="⌘K"
        recentSearches={[
          'force majeure clause',
          'NDA templates',
          'contract renewal terms',
        ]}
        style={{ flex: 1 }}
      />
      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          style={{
            padding: '8px 12px',
            background: '#E85A4F',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          Upload
        </button>
      </div>
    </div>
  ),
  decorators: [
    (Story) => (
      <div style={{ width: '700px', minHeight: '300px' }}>
        <Story />
      </div>
    ),
  ],
};
