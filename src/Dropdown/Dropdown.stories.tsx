import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from './Dropdown';
import { dropdownStyles } from './Dropdown.styles';
import { utilitiesStyles } from '../utilities.styles';

const styleSheet = document.createElement('style');
styleSheet.textContent = utilitiesStyles + dropdownStyles;
document.head.appendChild(styleSheet);

const meta: Meta<typeof Dropdown> = {
  title: 'Forms/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '320px', minHeight: '400px', padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

// ─── Icons for stories ───────────────────────────────────────────────────

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const FolderPlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    <line x1="12" y1="11" x2="12" y2="17" />
    <line x1="9" y1="14" x2="15" y2="14" />
  </svg>
);

const UploadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const FileTextIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

// ─── Options data ────────────────────────────────────────────────────────

const embeddingModels = [
  { value: 'openai-3-small', label: 'text-embedding-3-small' },
  { value: 'openai-3-large', label: 'text-embedding-3-large' },
  { value: 'cohere-v3', label: 'Cohere Embed v3' },
  { value: 'bge-large', label: 'BGE Large EN v1.5' },
  { value: 'e5-large', label: 'E5 Large v2' },
];

const documentTypes = [
  { value: 'pdf', label: 'PDF Document', icon: <FileTextIcon />, description: 'Portable Document Format' },
  { value: 'docx', label: 'Word Document', icon: <FileTextIcon />, description: 'Microsoft Word format' },
  { value: 'txt', label: 'Plain Text', icon: <FileTextIcon />, description: 'Unformatted text file' },
  { value: 'html', label: 'HTML Document', icon: <FileTextIcon />, description: 'Web page format' },
];

const labelOptions = [
  { value: 'party', label: 'Party Name' },
  { value: 'date', label: 'Effective Date' },
  { value: 'amount', label: 'Dollar Amount' },
  { value: 'term', label: 'Contract Term' },
  { value: 'governing-law', label: 'Governing Law' },
  { value: 'indemnification', label: 'Indemnification' },
  { value: 'termination', label: 'Termination Clause' },
  { value: 'confidentiality', label: 'Confidentiality' },
];

const exportFormats = [
  { value: 'json', label: 'JSON' },
  { value: 'csv', label: 'CSV' },
  { value: 'xlsx', label: 'Excel (XLSX)' },
  { value: 'pdf', label: 'PDF Report', disabled: true },
];

// ─── Action Menu Stories ─────────────────────────────────────────────────

export const ActionMenu: Story = {
  render: () => (
    <Dropdown mode="menu" aria-label="Create new item">
      <Dropdown.Item icon={<FolderPlusIcon />} onClick={() => console.log('New Corpus')}>
        New Corpus
      </Dropdown.Item>
      <Dropdown.Item icon={<UploadIcon />} onClick={() => console.log('Upload')}>
        Upload Document
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item icon={<FileTextIcon />} onClick={() => console.log('New Extract')}>
        New Extract
      </Dropdown.Item>
    </Dropdown>
  ),
};

export const ActionMenuWithCustomTrigger: Story = {
  render: () => (
    <Dropdown
      mode="menu"
      aria-label="Create new item"
      trigger={
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 36,
            height: 36,
            border: '1px solid var(--oc-border-default)',
            borderRadius: 'var(--oc-radius-md)',
            background: 'var(--oc-bg-surface)',
            cursor: 'pointer',
            color: 'var(--oc-fg-primary)',
          }}
        >
          <PlusIcon />
        </button>
      }
    >
      <Dropdown.Item icon={<FolderPlusIcon />} onClick={() => console.log('New Corpus')}>
        New Corpus
      </Dropdown.Item>
      <Dropdown.Item icon={<UploadIcon />} onClick={() => console.log('Upload')}>
        Upload Document
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Header>Danger Zone</Dropdown.Header>
      <Dropdown.Item icon={<TrashIcon />} onClick={() => console.log('Delete')}>
        Delete All
      </Dropdown.Item>
    </Dropdown>
  ),
};

export const ActionMenuWithHeaders: Story = {
  render: () => (
    <Dropdown mode="menu" aria-label="Actions">
      <Dropdown.Header>Documents</Dropdown.Header>
      <Dropdown.Item icon={<FolderPlusIcon />} onClick={() => {}}>New Corpus</Dropdown.Item>
      <Dropdown.Item icon={<UploadIcon />} onClick={() => {}}>Upload Document</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Header>Analysis</Dropdown.Header>
      <Dropdown.Item icon={<FileTextIcon />} onClick={() => {}}>New Extract</Dropdown.Item>
      <Dropdown.Item disabled onClick={() => {}}>Run Pipeline</Dropdown.Item>
    </Dropdown>
  ),
};

// ─── Single Select Stories ───────────────────────────────────────────────

export const SingleSelect: Story = {
  args: {
    mode: 'select',
    options: embeddingModels,
    placeholder: 'Select embedding model',
    'aria-label': 'Embedding model',
    fluid: true,
  },
};

export const SingleSelectWithValue: Story = {
  render: () => {
    const [value, setValue] = useState<string>('openai-3-small');
    return (
      <Dropdown
        mode="select"
        options={embeddingModels}
        value={value}
        onChange={(val) => setValue(val as string)}
        placeholder="Select embedding model"
        aria-label="Embedding model"
        fluid
      />
    );
  },
};

export const SingleSelectClearable: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>('cohere-v3');
    return (
      <Dropdown
        mode="select"
        options={embeddingModels}
        value={value}
        onChange={(val) => setValue(val as string | null)}
        placeholder="Select embedding model"
        aria-label="Embedding model"
        clearable
        fluid
      />
    );
  },
};

export const SingleSelectSearchable: Story = {
  args: {
    mode: 'select',
    options: labelOptions,
    placeholder: 'Search labels...',
    'aria-label': 'Label',
    searchable: 'local',
    fluid: true,
  },
};

export const SingleSelectWithIcons: Story = {
  args: {
    mode: 'select',
    options: documentTypes,
    placeholder: 'Select document type',
    'aria-label': 'Document type',
    fluid: true,
  },
};

export const SingleSelectDisabled: Story = {
  args: {
    mode: 'select',
    options: embeddingModels,
    value: 'openai-3-small',
    placeholder: 'Select embedding model',
    'aria-label': 'Embedding model',
    disabled: true,
    fluid: true,
  },
};

export const SingleSelectWithDisabledOptions: Story = {
  args: {
    mode: 'select',
    options: exportFormats,
    placeholder: 'Select export format',
    'aria-label': 'Export format',
    fluid: true,
  },
};

export const SingleSelectUpward: Story = {
  args: {
    mode: 'select',
    options: embeddingModels,
    placeholder: 'Opens upward',
    'aria-label': 'Embedding model',
    upward: true,
    fluid: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '320px', minHeight: '400px', padding: '20px', display: 'flex', alignItems: 'flex-end' }}>
        <div style={{ width: '100%' }}>
          <Story />
        </div>
      </div>
    ),
  ],
};

// ─── Multi Select Stories ────────────────────────────────────────────────

export const MultiSelect: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <Dropdown
        mode="multiselect"
        options={labelOptions}
        value={value}
        onChange={(vals) => setValue(vals as string[])}
        placeholder="Filter by labels"
        aria-label="Label filter"
        fluid
      />
    );
  },
};

export const MultiSelectWithValues: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['party', 'date', 'amount']);
    return (
      <Dropdown
        mode="multiselect"
        options={labelOptions}
        value={value}
        onChange={(vals) => setValue(vals as string[])}
        placeholder="Filter by labels"
        aria-label="Label filter"
        clearable
        fluid
      />
    );
  },
};

export const MultiSelectSearchable: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['party']);
    return (
      <Dropdown
        mode="multiselect"
        options={labelOptions}
        value={value}
        onChange={(vals) => setValue(vals as string[])}
        placeholder="Filter by labels"
        aria-label="Label filter"
        searchable="local"
        clearable
        fluid
      />
    );
  },
};

// ─── Async Search Stories ────────────────────────────────────────────────

export const AsyncSearch: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState(embeddingModels);

    const handleSearch = (query: string) => {
      setLoading(true);
      // Simulate async search
      setTimeout(() => {
        if (query) {
          setOptions(
            embeddingModels.filter(o =>
              o.label.toLowerCase().includes(query.toLowerCase())
            )
          );
        } else {
          setOptions(embeddingModels);
        }
        setLoading(false);
      }, 500);
    };

    return (
      <Dropdown
        mode="select"
        options={options}
        value={value}
        onChange={(val) => setValue(val as string | null)}
        placeholder="Search corpuses..."
        aria-label="Corpus"
        searchable="async"
        searchDebounceMs={300}
        onSearchChange={handleSearch}
        loading={loading}
        clearable
        fluid
      />
    );
  },
};

export const AsyncSearchMultiSelect: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState(labelOptions);

    const handleSearch = (query: string) => {
      setLoading(true);
      setTimeout(() => {
        if (query) {
          setOptions(
            labelOptions.filter(o =>
              o.label.toLowerCase().includes(query.toLowerCase())
            )
          );
        } else {
          setOptions(labelOptions);
        }
        setLoading(false);
      }, 400);
    };

    return (
      <Dropdown
        mode="multiselect"
        options={options}
        value={value}
        onChange={(vals) => setValue(vals as string[])}
        placeholder="Search and filter labels..."
        aria-label="Label filter"
        searchable="async"
        onSearchChange={handleSearch}
        loading={loading}
        clearable
        fluid
      />
    );
  },
};

// ─── Custom Rendering Stories ────────────────────────────────────────────

export const CustomOptionRenderer: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>(null);

    return (
      <Dropdown
        mode="select"
        options={documentTypes}
        value={value}
        onChange={(val) => setValue(val as string | null)}
        placeholder="Select a document type"
        aria-label="Document type"
        renderOption={(option, { isFocused, isSelected }) => (
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <span style={{ marginTop: 2 }}>{option.icon}</span>
            <div>
              <div style={{ fontWeight: isSelected ? 600 : 400 }}>{option.label}</div>
              {option.description && (
                <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>
                  {option.description}
                </div>
              )}
            </div>
          </div>
        )}
        fluid
      />
    );
  },
};

export const CustomTrigger: Story = {
  render: () => {
    const versionOptions = [
      { value: 'v3', label: 'v3 (current)' },
      { value: 'v2', label: 'v2' },
      { value: 'v1', label: 'v1 (original)' },
    ];

    const [value, setValue] = useState<string>('v3');

    return (
      <Dropdown
        mode="select"
        options={versionOptions}
        value={value}
        onChange={(val) => setValue(val as string)}
        trigger={({ isOpen, selectedOption }) => {
          const opt = selectedOption as { label: string } | null;
          return (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '4px 12px',
                borderRadius: 9999,
                background: 'rgba(15, 118, 110, 0.1)',
                color: '#0F766E',
                fontSize: 13,
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              {opt?.label ?? 'Version'}
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                style={{
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.15s',
                }}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>
          );
        }}
        aria-label="Document version"
      />
    );
  },
};

// ─── State variations ────────────────────────────────────────────────────

export const Loading: Story = {
  args: {
    mode: 'select',
    options: [],
    placeholder: 'Loading models...',
    'aria-label': 'Model',
    loading: true,
    fluid: true,
  },
};

export const EmptyState: Story = {
  args: {
    mode: 'select',
    options: [],
    placeholder: 'Select option',
    'aria-label': 'Option',
    fluid: true,
  },
};

export const CustomEmptyState: Story = {
  args: {
    mode: 'select',
    options: [],
    placeholder: 'Select option',
    'aria-label': 'Option',
    renderEmpty: () => (
      <div style={{ padding: 24, textAlign: 'center' }}>
        <div style={{ fontSize: 24, marginBottom: 8 }}>
          <FileTextIcon />
        </div>
        <div style={{ fontSize: 13, color: '#64748b' }}>
          No options available yet.
          <br />
          Create one to get started.
        </div>
      </div>
    ),
    fluid: true,
  },
};

// ─── Description Features ───────────────────────────────────────────

const embeddingModelsWithDescriptions = [
  { value: 'openai-3-small', label: 'text-embedding-3-small', description: 'Standard text embedding model (384 dimensions)' },
  { value: 'openai-3-large', label: 'text-embedding-3-large', description: 'Higher-quality embeddings with configurable dimensions (up to 3072)' },
  { value: 'cohere-v3', label: 'Cohere Embed v3', description: 'Multilingual model with strong retrieval performance' },
  { value: 'bge-large', label: 'BGE Large EN v1.5', description: 'Open-source English embedding model from BAAI (1024 dimensions)' },
];

export const WrappedDescriptions: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>(null);
    return (
      <Dropdown
        mode="select"
        options={embeddingModelsWithDescriptions}
        value={value}
        onChange={(val) => setValue(val as string | null)}
        placeholder="Select embedding model"
        aria-label="Embedding model"
        wrapDescriptions
        fluid
      />
    );
  },
};

export const DescriptionInTrigger: Story = {
  render: () => {
    const [value, setValue] = useState<string>('openai-3-small');
    return (
      <Dropdown
        mode="select"
        options={embeddingModelsWithDescriptions}
        value={value}
        onChange={(val) => setValue(val as string)}
        placeholder="Select embedding model"
        aria-label="Embedding model"
        wrapDescriptions
        showDescriptionInTrigger
        fluid
      />
    );
  },
};

// ─── All Modes Side-by-Side ──────────────────────────────────────────────

export const AllModes: Story = {
  render: () => {
    const [selectVal, setSelectVal] = useState<string | null>(null);
    const [multiVal, setMultiVal] = useState<string[]>([]);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8', marginBottom: 8 }}>
            Action Menu
          </div>
          <Dropdown mode="menu" aria-label="Actions" fluid>
            <Dropdown.Item icon={<FolderPlusIcon />} onClick={() => {}}>New Corpus</Dropdown.Item>
            <Dropdown.Item icon={<UploadIcon />} onClick={() => {}}>Upload</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item icon={<FileTextIcon />} onClick={() => {}}>New Extract</Dropdown.Item>
          </Dropdown>
        </div>

        <div>
          <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8', marginBottom: 8 }}>
            Single Select
          </div>
          <Dropdown
            mode="select"
            options={embeddingModels}
            value={selectVal}
            onChange={(v) => setSelectVal(v as string | null)}
            placeholder="Select model"
            aria-label="Model"
            searchable="local"
            clearable
            fluid
          />
        </div>

        <div>
          <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8', marginBottom: 8 }}>
            Multi Select
          </div>
          <Dropdown
            mode="multiselect"
            options={labelOptions}
            value={multiVal}
            onChange={(v) => setMultiVal(v as string[])}
            placeholder="Filter labels"
            aria-label="Labels"
            searchable="local"
            clearable
            fluid
          />
        </div>
      </div>
    );
  },
  decorators: [
    (Story) => (
      <div style={{ width: '320px', minHeight: '600px', padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
};

// ─── onBlur callback ──────────────────────────────────────────────────────

export const OnBlurCallback: Story = {
  render: () => {
    const [blurCount, setBlurCount] = useState(0);
    const [lastEvent, setLastEvent] = useState('');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8' }}>
          onBlur — focus the dropdown, then tab or click away
        </div>
        <Dropdown
          mode="select"
          options={embeddingModels}
          placeholder="Select model"
          aria-label="onBlur demo"
          onBlur={() => {
            setBlurCount(c => c + 1);
            setLastEvent(new Date().toLocaleTimeString());
          }}
          searchable="local"
        />
        <input placeholder="Tab target (focus me)" style={{ padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: 6 }} />
        <div style={{ fontSize: 13, color: '#64748b' }}>
          Blur count: <strong>{blurCount}</strong>
          {lastEvent && <> — last at {lastEvent}</>}
        </div>
      </div>
    );
  },
};
