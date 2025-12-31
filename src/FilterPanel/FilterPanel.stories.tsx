import React, { useState, useCallback } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FilterPanel, FilterSection, FilterValues, FilterOption } from './FilterPanel';
import { filterPanelStyles } from './FilterPanel.styles';

const meta: Meta<typeof FilterPanel> = {
  title: 'Components/FilterPanel',
  component: FilterPanel,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <>
        <style>{filterPanelStyles}</style>
        <Story />
      </>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FilterPanel>;

const documentSections: FilterSection[] = [
  {
    key: 'type',
    label: 'Document Type',
    type: 'checkbox',
    options: [
      { value: 'pdf', label: 'PDF', count: 156 },
      { value: 'docx', label: 'Word Document', count: 43 },
      { value: 'txt', label: 'Plain Text', count: 12 },
      { value: 'xlsx', label: 'Excel Spreadsheet', count: 8 },
    ],
  },
  {
    key: 'status',
    label: 'Status',
    type: 'checkbox',
    options: [
      { value: 'processed', label: 'Processed', count: 189 },
      { value: 'processing', label: 'Processing', count: 5 },
      { value: 'pending', label: 'Pending', count: 12 },
      { value: 'error', label: 'Error', count: 3 },
    ],
  },
  {
    key: 'corpus',
    label: 'Corpus',
    type: 'checkbox',
    options: [
      { value: 'sec-filings', label: 'SEC Filings', count: 89 },
      { value: 'contracts', label: 'Client Contracts', count: 56 },
      { value: 'hr', label: 'HR Documents', count: 34 },
      { value: 'templates', label: 'Templates', count: 12 },
    ],
  },
  {
    key: 'uploadDate',
    label: 'Upload Date',
    type: 'date-range',
  },
];

export const Default: Story = {
  render: () => {
    const [values, setValues] = useState<FilterValues>({
      type: [],
      status: [],
      corpus: [],
      uploadDate: { from: '', to: '' },
    });

    return (
      <FilterPanel
        sections={documentSections}
        values={values}
        onChange={setValues}
        onApply={() => console.log('Apply:', values)}
        onCancel={() => console.log('Cancel')}
      />
    );
  },
};

export const WithActiveFilters: Story = {
  render: () => {
    const [values, setValues] = useState<FilterValues>({
      type: ['pdf', 'docx'],
      status: ['processed'],
      corpus: ['sec-filings'],
      uploadDate: { from: '2024-01-01', to: '' },
    });

    return (
      <FilterPanel
        sections={documentSections}
        values={values}
        onChange={setValues}
        onApply={() => console.log('Apply:', values)}
        onCancel={() => console.log('Cancel')}
      />
    );
  },
};

export const WithQuickFilters: Story = {
  render: () => {
    const [values, setValues] = useState<FilterValues>({
      type: ['pdf', 'docx'],
      status: ['processed'],
      corpus: [],
      uploadDate: { from: '', to: '' },
    });

    return (
      <FilterPanel
        sections={documentSections}
        values={values}
        onChange={setValues}
        onApply={() => console.log('Apply:', values)}
        showQuickFilters
        quickFilterKeys={['type', 'status']}
      />
    );
  },
};

export const NoFooter: Story = {
  render: () => {
    const [values, setValues] = useState<FilterValues>({
      type: [],
      status: [],
      corpus: [],
      uploadDate: { from: '', to: '' },
    });

    return (
      <FilterPanel
        sections={documentSections}
        values={values}
        onChange={setValues}
        showFooter={false}
      />
    );
  },
};

// Searchable sections with client-side filtering
const searchableSections: FilterSection[] = [
  {
    key: 'corpus',
    label: 'Corpus',
    type: 'checkbox',
    searchable: true,
    searchPlaceholder: 'Search corpuses...',
    maxVisible: 5,
    options: [
      { value: 'sec-filings-2024', label: 'SEC Filings 2024', description: 'Q1-Q4 2024 quarterly reports', count: 89 },
      { value: 'sec-filings-2023', label: 'SEC Filings 2023', description: 'Q1-Q4 2023 quarterly reports', count: 156 },
      { value: 'sec-filings-2022', label: 'SEC Filings 2022', description: 'Q1-Q4 2022 quarterly reports', count: 142 },
      { value: 'contracts-clients', label: 'Client Contracts', description: 'Active client agreements', count: 56 },
      { value: 'contracts-vendors', label: 'Vendor Contracts', description: 'Supplier and vendor agreements', count: 34 },
      { value: 'hr-employment', label: 'Employment Contracts', description: 'Employee agreements', count: 23 },
      { value: 'hr-policies', label: 'HR Policies', description: 'Company policies and handbooks', count: 12 },
      { value: 'templates-nda', label: 'NDA Templates', description: 'Non-disclosure agreements', count: 8 },
      { value: 'templates-msa', label: 'MSA Templates', description: 'Master service agreements', count: 6 },
      { value: 'real-estate', label: 'Real Estate Documents', description: 'Property and lease documents', count: 18 },
      { value: 'intellectual-property', label: 'IP Documents', description: 'Patents, trademarks, copyrights', count: 45 },
      { value: 'litigation', label: 'Litigation Files', description: 'Court filings and legal proceedings', count: 67 },
    ],
  },
  {
    key: 'status',
    label: 'Status',
    type: 'checkbox',
    options: [
      { value: 'processed', label: 'Processed', count: 189 },
      { value: 'processing', label: 'Processing', count: 5 },
      { value: 'pending', label: 'Pending', count: 12 },
      { value: 'error', label: 'Error', count: 3 },
    ],
  },
];

export const WithSearchAndShowMore: Story = {
  name: 'Searchable with Show More',
  render: () => {
    const [values, setValues] = useState<FilterValues>({
      corpus: [],
      status: [],
    });

    return (
      <FilterPanel
        title="Filter Documents"
        sections={searchableSections}
        values={values}
        onChange={setValues}
        onApply={() => console.log('Apply:', values)}
        onCancel={() => console.log('Cancel')}
      />
    );
  },
};

// Simulated async search
const allCorpuses: FilterOption[] = [
  { value: 'sec-filings-2024', label: 'SEC Filings 2024', description: 'Q1-Q4 2024 quarterly reports', count: 89 },
  { value: 'sec-filings-2023', label: 'SEC Filings 2023', description: 'Q1-Q4 2023 quarterly reports', count: 156 },
  { value: 'sec-filings-2022', label: 'SEC Filings 2022', description: 'Q1-Q4 2022 quarterly reports', count: 142 },
  { value: 'contracts-clients', label: 'Client Contracts', description: 'Active client agreements', count: 56 },
  { value: 'contracts-vendors', label: 'Vendor Contracts', description: 'Supplier and vendor agreements', count: 34 },
  { value: 'hr-employment', label: 'Employment Contracts', description: 'Employee agreements', count: 23 },
  { value: 'hr-policies', label: 'HR Policies', description: 'Company policies and handbooks', count: 12 },
  { value: 'templates-nda', label: 'NDA Templates', description: 'Non-disclosure agreements', count: 8 },
  { value: 'templates-msa', label: 'MSA Templates', description: 'Master service agreements', count: 6 },
  { value: 'real-estate', label: 'Real Estate Documents', description: 'Property and lease documents', count: 18 },
  { value: 'intellectual-property', label: 'IP Documents', description: 'Patents, trademarks, copyrights', count: 45 },
  { value: 'litigation', label: 'Litigation Files', description: 'Court filings and legal proceedings', count: 67 },
  { value: 'mergers-acquisitions', label: 'M&A Documents', description: 'Merger and acquisition files', count: 34 },
  { value: 'board-minutes', label: 'Board Meeting Minutes', description: 'Corporate governance records', count: 89 },
  { value: 'shareholder-agreements', label: 'Shareholder Agreements', description: 'Equity holder contracts', count: 23 },
  { value: 'loan-documents', label: 'Loan Documents', description: 'Credit and financing agreements', count: 45 },
  { value: 'insurance-policies', label: 'Insurance Policies', description: 'Coverage and claims documents', count: 28 },
  { value: 'regulatory-filings', label: 'Regulatory Filings', description: 'Compliance submissions', count: 67 },
  { value: 'tax-documents', label: 'Tax Documents', description: 'Tax returns and filings', count: 112 },
  { value: 'audit-reports', label: 'Audit Reports', description: 'Internal and external audits', count: 34 },
];

export const AsyncSearch: Story = {
  name: 'Async Server Search',
  render: () => {
    const [values, setValues] = useState<FilterValues>({
      corpus: [],
      status: [],
    });
    const [corpusOptions, setCorpusOptions] = useState<FilterOption[]>(allCorpuses.slice(0, 5));
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    // Simulate async search
    const handleSearch = useCallback((sectionKey: string, query: string) => {
      if (sectionKey !== 'corpus') return;

      setLoading(true);

      // Simulate API delay
      setTimeout(() => {
        if (query) {
          const filtered = allCorpuses.filter(
            (opt) =>
              opt.label.toLowerCase().includes(query.toLowerCase()) ||
              opt.description?.toLowerCase().includes(query.toLowerCase())
          );
          setCorpusOptions(filtered.slice(0, 10));
          setHasMore(filtered.length > 10);
        } else {
          setCorpusOptions(allCorpuses.slice(0, 5));
          setHasMore(true);
        }
        setLoading(false);
      }, 500);
    }, []);

    // Simulate load more
    const handleLoadMore = useCallback((sectionKey: string) => {
      if (sectionKey !== 'corpus') return;

      setLoading(true);
      setTimeout(() => {
        setCorpusOptions(allCorpuses);
        setHasMore(false);
        setLoading(false);
      }, 500);
    }, []);

    const asyncSections: FilterSection[] = [
      {
        key: 'corpus',
        label: 'Corpus',
        type: 'checkbox',
        searchable: true,
        searchPlaceholder: 'Type to search corpuses...',
        loading,
        hasMore,
        options: corpusOptions,
      },
      {
        key: 'status',
        label: 'Status',
        type: 'checkbox',
        options: [
          { value: 'processed', label: 'Processed', count: 189 },
          { value: 'processing', label: 'Processing', count: 5 },
          { value: 'pending', label: 'Pending', count: 12 },
          { value: 'error', label: 'Error', count: 3 },
        ],
      },
    ];

    return (
      <div>
        <p style={{ marginBottom: 16, fontSize: 13, color: '#64748B' }}>
          Try typing "SEC", "contract", or "template" to search
        </p>
        <FilterPanel
          title="Filter Documents"
          sections={asyncSections}
          values={values}
          onChange={setValues}
          onSearch={handleSearch}
          onLoadMore={handleLoadMore}
          onApply={() => console.log('Apply:', values)}
          onCancel={() => console.log('Cancel')}
          searchDebounce={300}
        />
      </div>
    );
  },
};

const radioSections: FilterSection[] = [
  {
    key: 'sortBy',
    label: 'Sort By',
    type: 'radio',
    options: [
      { value: 'name', label: 'Name' },
      { value: 'date', label: 'Date Modified' },
      { value: 'size', label: 'File Size' },
      { value: 'type', label: 'Document Type' },
    ],
  },
  {
    key: 'order',
    label: 'Order',
    type: 'radio',
    options: [
      { value: 'asc', label: 'Ascending' },
      { value: 'desc', label: 'Descending' },
    ],
  },
];

export const RadioFilters: Story = {
  render: () => {
    const [values, setValues] = useState<FilterValues>({
      sortBy: ['date'],
      order: ['desc'],
    });

    return (
      <FilterPanel
        title="Sort Options"
        sections={radioSections}
        values={values}
        onChange={setValues}
        onApply={() => console.log('Apply:', values)}
      />
    );
  },
};

export const WithDescriptions: Story = {
  name: 'Options with Descriptions',
  render: () => {
    const sectionsWithDesc: FilterSection[] = [
      {
        key: 'visibility',
        label: 'Visibility',
        type: 'checkbox',
        options: [
          { value: 'public', label: 'Public', description: 'Anyone can view and search', count: 45 },
          { value: 'private', label: 'Private', description: 'Only you can access', count: 23 },
          { value: 'shared', label: 'Shared', description: 'Specific users you invite', count: 12 },
          { value: 'organization', label: 'Organization', description: 'All org members can access', count: 89 },
        ],
      },
    ];

    const [values, setValues] = useState<FilterValues>({
      visibility: [],
    });

    return (
      <FilterPanel
        title="Access Settings"
        sections={sectionsWithDesc}
        values={values}
        onChange={setValues}
        onApply={() => console.log('Apply:', values)}
      />
    );
  },
};
