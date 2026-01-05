import type { Meta, StoryObj } from '@storybook/react';
import { RelationshipPopoverContent, RelationshipItem } from './RelationshipPopover';
import { Popover } from '../Popover';
import { RelationshipBadge } from '../RelationshipBadge';
import type { GraphDocument } from '../types/relationship';

const FileIcon = ({ type }: { type?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke={type === 'pdf' ? '#DC2626' : type === 'docx' ? '#2563EB' : '#64748B'}
    strokeWidth="2"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);

const mockRelationships: RelationshipItem[] = [
  {
    relationship: {
      id: '1',
      sourceDocumentId: 'doc-1',
      targetDocumentId: 'doc-2',
      label: { id: 'cites', text: 'cites', color: '#0F766E' },
      source: 'manual',
    },
    document: {
      id: 'doc-2',
      title: 'NDA Template.docx',
      documentType: 'docx',
    },
    direction: 'outgoing',
  },
  {
    relationship: {
      id: '2',
      sourceDocumentId: 'doc-3',
      targetDocumentId: 'doc-1',
      label: { id: 'cited-by', text: 'cited by', color: '#0F766E' },
      source: 'manual',
    },
    document: {
      id: 'doc-3',
      title: 'Employment Contract - J. Smith.pdf',
      documentType: 'pdf',
    },
    direction: 'incoming',
  },
  {
    relationship: {
      id: '3',
      sourceDocumentId: 'doc-1',
      targetDocumentId: 'doc-4',
      label: { id: 'supersedes', text: 'supersedes', color: '#7C3AED' },
      source: 'analyzer',
      analyzerId: 'ai-1',
    },
    document: {
      id: 'doc-4',
      title: 'Vendor Agreement 2023.pdf',
      documentType: 'pdf',
    },
    direction: 'outgoing',
  },
];

const meta: Meta<typeof RelationshipPopoverContent> = {
  title: 'Graph/RelationshipPopoverContent',
  component: RelationshipPopoverContent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RelationshipPopoverContent>;

export const Default: Story = {
  args: {
    relationships: mockRelationships,
    onRelationshipClick: (item) => console.log('Clicked:', item),
    onViewInGraph: () => console.log('View in graph'),
  },
};

export const WithIcons: Story = {
  args: {
    relationships: mockRelationships,
    renderIcon: (doc: GraphDocument) => <FileIcon type={doc.documentType} />,
    onRelationshipClick: (item) => console.log('Clicked:', item),
    onViewInGraph: () => console.log('View in graph'),
  },
};

export const Empty: Story = {
  args: {
    relationships: [],
  },
};

export const SingleRelationship: Story = {
  args: {
    relationships: [mockRelationships[0]],
    renderIcon: (doc: GraphDocument) => <FileIcon type={doc.documentType} />,
    onRelationshipClick: (item) => console.log('Clicked:', item),
    onViewInGraph: () => console.log('View in graph'),
  },
};

export const ManyRelationships: Story = {
  args: {
    relationships: [
      ...mockRelationships,
      {
        relationship: {
          id: '4',
          sourceDocumentId: 'doc-1',
          targetDocumentId: 'doc-5',
          label: { id: 'references', text: 'references', color: '#0284C7' },
          source: 'manual',
        },
        document: { id: 'doc-5', title: 'Legal Framework Document.pdf', documentType: 'pdf' },
        direction: 'outgoing',
      },
      {
        relationship: {
          id: '5',
          sourceDocumentId: 'doc-1',
          targetDocumentId: 'doc-6',
          label: { id: 'amends', text: 'amends', color: '#D97706' },
          source: 'analyzer',
        },
        document: { id: 'doc-6', title: 'Contract Amendment Q3.docx', documentType: 'docx' },
        direction: 'outgoing',
      },
      {
        relationship: {
          id: '6',
          sourceDocumentId: 'doc-7',
          targetDocumentId: 'doc-1',
          label: { id: 'interprets', text: 'interprets', color: '#059669' },
          source: 'analyzer',
        },
        document: { id: 'doc-7', title: 'Case Law - Smith v. Jones.pdf', documentType: 'case' },
        direction: 'incoming',
      },
    ],
    renderIcon: (doc: GraphDocument) => <FileIcon type={doc.documentType} />,
    maxHeight: 200,
    onRelationshipClick: (item) => console.log('Clicked:', item),
    onViewInGraph: () => console.log('View in graph'),
  },
};

export const NoGraphLink: Story = {
  args: {
    relationships: mockRelationships,
    renderIcon: (doc: GraphDocument) => <FileIcon type={doc.documentType} />,
    showGraphLink: false,
    onRelationshipClick: (item) => console.log('Clicked:', item),
  },
};

export const WithPopoverTrigger: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '10px 16px',
        background: '#FFFFFF',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        fontFamily: 'Inter, system-ui, sans-serif',
        minWidth: '400px',
      }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#DC2626"
        strokeWidth="2"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
      <span style={{ flex: 1, fontSize: '14px', color: '#1E293B' }}>
        Master Services Agreement 2024.pdf
      </span>
      <Popover
        trigger="click"
        placement="bottom"
        content={
          <RelationshipPopoverContent
            relationships={mockRelationships}
            renderIcon={(doc) => <FileIcon type={doc.documentType} />}
            onRelationshipClick={(item) => console.log('Navigate to:', item.document.title)}
            onViewInGraph={() => console.log('Open graph view')}
          />
        }
      >
        <RelationshipBadge count={3} size="sm" />
      </Popover>
      <span style={{ fontSize: '12px', color: '#94A3B8' }}>Dec 28, 2024</span>
    </div>
  ),
};

export const InFileList: Story = {
  render: () => {
    const files = [
      {
        name: 'Master Services Agreement 2024.pdf',
        type: 'pdf',
        relationships: mockRelationships,
        date: 'Dec 28, 2024',
        size: '239.3 KB',
      },
      {
        name: 'NDA Template.docx',
        type: 'docx',
        relationships: [],
        date: 'Dec 25, 2024',
        size: '43.9 KB',
      },
      {
        name: 'Employment Contract - J. Smith.pdf',
        type: 'pdf',
        relationships: [mockRelationships[1]],
        date: 'Dec 22, 2024',
        size: '125.0 KB',
      },
    ];

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1px',
          background: '#E2E8F0',
          borderRadius: '8px',
          overflow: 'hidden',
          fontFamily: 'Inter, system-ui, sans-serif',
          minWidth: '500px',
        }}
      >
        {files.map((file, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 16px',
              background: '#FFFFFF',
            }}
          >
            <FileIcon type={file.type} />
            <span style={{ flex: 1, fontSize: '14px', color: '#1E293B' }}>
              {file.name}
            </span>
            {file.relationships.length > 0 ? (
              <Popover
                trigger="click"
                placement="bottom"
                content={
                  <RelationshipPopoverContent
                    relationships={file.relationships}
                    renderIcon={(doc) => <FileIcon type={doc.documentType} />}
                    onRelationshipClick={(item) => console.log('Navigate to:', item.document.title)}
                    onViewInGraph={() => console.log('Open graph view')}
                  />
                }
              >
                <RelationshipBadge count={file.relationships.length} size="sm" />
              </Popover>
            ) : null}
            <span style={{ fontSize: '12px', color: '#94A3B8', minWidth: '80px' }}>
              {file.date}
            </span>
            <span style={{ fontSize: '12px', color: '#94A3B8', width: '60px', textAlign: 'right' }}>
              {file.size}
            </span>
          </div>
        ))}
      </div>
    );
  },
};
