import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DocumentGraph } from './DocumentGraph';
import type { GraphData, GraphNodeData, RelationshipLabel } from '../types/relationship';

// Mock relationship labels
const relationshipLabels: RelationshipLabel[] = [
  { id: 'cites', text: 'cites', color: '#0F766E', description: 'Document explicitly cites another' },
  { id: 'references', text: 'references', color: '#0284C7', description: 'General reference' },
  { id: 'amends', text: 'amends', color: '#D97706', description: 'Modifies previous version' },
  { id: 'supersedes', text: 'supersedes', color: '#7C3AED', description: 'Replaces entirely' },
  { id: 'interprets', text: 'interprets', color: '#059669', description: 'Case law interpreting statute' },
];

// Mock graph data
const mockGraphData: GraphData = {
  focusNodeId: 'doc-1',
  maxDepthLoaded: 2,
  hasMore: true,
  nodes: [
    { id: 'doc-1', title: 'Master Services Agreement 2024.pdf', documentType: 'pdf', depth: 0, relationshipCount: 5 },
    { id: 'doc-2', title: 'NDA Template.docx', documentType: 'docx', depth: 1, relationshipCount: 2 },
    { id: 'doc-3', title: 'Employment Contract - J. Smith.pdf', documentType: 'pdf', depth: 1, relationshipCount: 3 },
    { id: 'doc-4', title: 'Vendor Agreement 2023.pdf', documentType: 'pdf', depth: 1, relationshipCount: 1, canExpand: true },
    { id: 'doc-5', title: 'Legal Framework.pdf', documentType: 'pdf', depth: 1, relationshipCount: 4 },
    { id: 'doc-6', title: 'Case Law - Smith v. Jones', documentType: 'case', depth: 2, relationshipCount: 0 },
    { id: 'doc-7', title: 'Regulatory Guidance 2023', documentType: 'legislation', depth: 2, relationshipCount: 2 },
  ],
  edges: [
    {
      id: 'e1',
      source: 'doc-1',
      target: 'doc-2',
      relationship: {
        id: 'r1',
        sourceDocumentId: 'doc-1',
        targetDocumentId: 'doc-2',
        label: relationshipLabels[0], // cites
        source: 'manual',
      },
    },
    {
      id: 'e2',
      source: 'doc-1',
      target: 'doc-3',
      relationship: {
        id: 'r2',
        sourceDocumentId: 'doc-1',
        targetDocumentId: 'doc-3',
        label: relationshipLabels[1], // references
        source: 'manual',
      },
    },
    {
      id: 'e3',
      source: 'doc-1',
      target: 'doc-4',
      relationship: {
        id: 'r3',
        sourceDocumentId: 'doc-1',
        targetDocumentId: 'doc-4',
        label: relationshipLabels[3], // supersedes
        source: 'analyzer',
        analyzerId: 'ai-1',
      },
    },
    {
      id: 'e4',
      source: 'doc-1',
      target: 'doc-5',
      relationship: {
        id: 'r4',
        sourceDocumentId: 'doc-1',
        targetDocumentId: 'doc-5',
        label: relationshipLabels[1], // references
        source: 'manual',
      },
    },
    {
      id: 'e5',
      source: 'doc-5',
      target: 'doc-6',
      relationship: {
        id: 'r5',
        sourceDocumentId: 'doc-5',
        targetDocumentId: 'doc-6',
        label: relationshipLabels[4], // interprets
        source: 'analyzer',
      },
    },
    {
      id: 'e6',
      source: 'doc-5',
      target: 'doc-7',
      relationship: {
        id: 'r6',
        sourceDocumentId: 'doc-5',
        targetDocumentId: 'doc-7',
        label: relationshipLabels[0], // cites
        source: 'manual',
      },
    },
  ],
};

const meta: Meta<typeof DocumentGraph> = {
  title: 'Graph/DocumentGraph',
  component: DocumentGraph,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '100%', height: '600px', padding: '16px', boxSizing: 'border-box' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DocumentGraph>;

export const Default: Story = {
  args: {
    data: mockGraphData,
    relationshipLabels,
    canLoadMore: true,
  },
};

export const ForceLayout: Story = {
  args: {
    data: mockGraphData,
    relationshipLabels,
    initialLayout: 'force',
  },
};

export const HierarchicalLayout: Story = {
  args: {
    data: mockGraphData,
    relationshipLabels,
    initialLayout: 'hierarchical',
  },
};

export const WithSelection: Story = {
  render: () => {
    const [selectedId, setSelectedId] = useState<string | undefined>('doc-3');

    return (
      <DocumentGraph
        data={mockGraphData}
        relationshipLabels={relationshipLabels}
        selectedNodeId={selectedId}
        onNodeSelect={(node) => setSelectedId(node?.id)}
      />
    );
  },
};

export const WithFiltering: Story = {
  render: () => {
    const [filters, setFilters] = useState<string[]>([]);

    return (
      <DocumentGraph
        data={mockGraphData}
        relationshipLabels={relationshipLabels}
        activeFilters={filters}
        onFiltersChange={setFilters}
      />
    );
  },
};

export const WithLoadMore: Story = {
  render: () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(mockGraphData);

    const handleLoadMore = () => {
      setLoading(true);
      // Simulate loading
      setTimeout(() => {
        setData((prev) => ({
          ...prev,
          hasMore: false,
          nodes: [
            ...prev.nodes,
            { id: 'doc-8', title: 'Additional Document.pdf', documentType: 'pdf', depth: 2, relationshipCount: 1 },
          ],
          edges: [
            ...prev.edges,
            {
              id: 'e7',
              source: 'doc-4',
              target: 'doc-8',
              relationship: {
                id: 'r7',
                sourceDocumentId: 'doc-4',
                targetDocumentId: 'doc-8',
                label: relationshipLabels[2], // amends
                source: 'manual',
              },
            },
          ],
        }));
        setLoading(false);
      }, 1500);
    };

    return (
      <DocumentGraph
        data={data}
        relationshipLabels={relationshipLabels}
        canLoadMore={data.hasMore}
        loading={loading}
        onLoadMore={handleLoadMore}
      />
    );
  },
};

export const Empty: Story = {
  args: {
    data: {
      nodes: [],
      edges: [],
      maxDepthLoaded: 0,
      hasMore: false,
    },
  },
};

export const SingleNode: Story = {
  args: {
    data: {
      focusNodeId: 'doc-1',
      nodes: [{ id: 'doc-1', title: 'Standalone Document.pdf', documentType: 'pdf', depth: 0, relationshipCount: 0 }],
      edges: [],
      maxDepthLoaded: 1,
      hasMore: false,
    },
  },
};

export const NoControls: Story = {
  args: {
    data: mockGraphData,
    showControls: false,
  },
};

export const InteractiveDemo: Story = {
  render: () => {
    const [selectedId, setSelectedId] = useState<string | undefined>();
    const [filters, setFilters] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const handleNodeExpand = (node: GraphNodeData) => {
      console.log('Expand node:', node.title);
      setLoading(true);
      setTimeout(() => setLoading(false), 1000);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }}>
        <div
          style={{
            padding: '12px 16px',
            background: '#FFFFFF',
            borderRadius: '8px',
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: '13px',
            color: '#475569',
          }}
        >
          <strong>Selected:</strong>{' '}
          {selectedId
            ? mockGraphData.nodes.find((n) => n.id === selectedId)?.title || 'Unknown'
            : 'None (click a node)'}
          <br />
          <strong>Filters:</strong> {filters.length === 0 ? 'All' : filters.join(', ')}
        </div>
        <div style={{ flex: 1, minHeight: 0 }}>
          <DocumentGraph
            data={mockGraphData}
            relationshipLabels={relationshipLabels}
            selectedNodeId={selectedId}
            onNodeSelect={(node) => setSelectedId(node?.id)}
            onNodeExpand={handleNodeExpand}
            activeFilters={filters}
            onFiltersChange={setFilters}
            canLoadMore={mockGraphData.hasMore}
            loading={loading}
            onLoadMore={() => {
              setLoading(true);
              setTimeout(() => setLoading(false), 1500);
            }}
          />
        </div>
      </div>
    );
  },
};

export const LargeGraph: Story = {
  args: {
    data: {
      focusNodeId: 'center',
      maxDepthLoaded: 2,
      hasMore: false,
      nodes: [
        { id: 'center', title: 'Central Document.pdf', documentType: 'pdf', depth: 0, relationshipCount: 12 },
        ...Array.from({ length: 12 }, (_, i) => ({
          id: `node-${i}`,
          title: `Related Document ${i + 1}.pdf`,
          documentType: 'pdf' as const,
          depth: 1,
          relationshipCount: Math.floor(Math.random() * 5),
        })),
      ],
      edges: Array.from({ length: 12 }, (_, i) => ({
        id: `edge-${i}`,
        source: 'center',
        target: `node-${i}`,
        relationship: {
          id: `rel-${i}`,
          sourceDocumentId: 'center',
          targetDocumentId: `node-${i}`,
          label: relationshipLabels[i % relationshipLabels.length],
          source: i % 3 === 0 ? 'analyzer' as const : 'manual' as const,
        },
      })),
    },
    relationshipLabels,
  },
};
