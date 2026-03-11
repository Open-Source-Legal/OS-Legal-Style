import React, { useState, useCallback } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Table } from './Table';
import { tableStyles } from './Table.styles';

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = tableStyles;
document.head.appendChild(styleSheet);

const meta: Meta<typeof Table> = {
  title: 'Data Display/Table',
  component: Table,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'minimal'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    striped: { control: 'boolean' },
    stickyHeader: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

// ─── Sample Data ────────────────────────────────────────────────────────────

const documents = [
  { id: 1, name: 'Employment Agreement - Smith', status: 'Approved', date: '2024-01-15', type: 'Contract' },
  { id: 2, name: 'NDA - Acme Corp', status: 'Pending', date: '2024-02-01', type: 'NDA' },
  { id: 3, name: 'Lease Agreement - 123 Main St', status: 'Draft', date: '2024-02-10', type: 'Lease' },
  { id: 4, name: 'Patent Filing - Widget X', status: 'Approved', date: '2024-03-05', type: 'Patent' },
  { id: 5, name: 'Service Agreement - Cloud Provider', status: 'Under Review', date: '2024-03-12', type: 'Contract' },
];

// ─── Stories ────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'md',
  },
  render: (args) => (
    <Table {...args}>
      <Table.Head>
        <Table.Row>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Date</Table.HeadCell>
          <Table.HeadCell>Type</Table.HeadCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {documents.map((doc) => (
          <Table.Row key={doc.id}>
            <Table.Cell>{doc.name}</Table.Cell>
            <Table.Cell>{doc.status}</Table.Cell>
            <Table.Cell>{doc.date}</Table.Cell>
            <Table.Cell>{doc.type}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
};

export const Bordered: Story = {
  render: () => (
    <Table variant="bordered" size="sm">
      <Table.Head>
        <Table.Row>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Date</Table.HeadCell>
          <Table.HeadCell>Type</Table.HeadCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {documents.map((doc) => (
          <Table.Row key={doc.id}>
            <Table.Cell>{doc.name}</Table.Cell>
            <Table.Cell>{doc.status}</Table.Cell>
            <Table.Cell>{doc.date}</Table.Cell>
            <Table.Cell>{doc.type}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
};

export const Minimal: Story = {
  render: () => (
    <Table variant="minimal">
      <Table.Head>
        <Table.Row>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell align="right">Actions</Table.HeadCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {documents.map((doc) => (
          <Table.Row key={doc.id}>
            <Table.Cell>{doc.name}</Table.Cell>
            <Table.Cell>{doc.status}</Table.Cell>
            <Table.Cell align="right">
              <button style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--oc-accent)' }}>Edit</button>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
};

export const Striped: Story = {
  render: () => (
    <Table striped>
      <Table.Head>
        <Table.Row>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Date</Table.HeadCell>
          <Table.HeadCell>Type</Table.HeadCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {documents.map((doc) => (
          <Table.Row key={doc.id}>
            <Table.Cell>{doc.name}</Table.Cell>
            <Table.Cell>{doc.status}</Table.Cell>
            <Table.Cell>{doc.date}</Table.Cell>
            <Table.Cell>{doc.type}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div key={size}>
          <h3 style={{ margin: '0 0 8px', fontSize: '14px', color: '#64748b' }}>Size: {size}</h3>
          <Table size={size} variant="bordered">
            <Table.Head>
              <Table.Row>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Status</Table.HeadCell>
                <Table.HeadCell>Date</Table.HeadCell>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {documents.slice(0, 2).map((doc) => (
                <Table.Row key={doc.id}>
                  <Table.Cell>{doc.name}</Table.Cell>
                  <Table.Cell>{doc.status}</Table.Cell>
                  <Table.Cell>{doc.date}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      ))}
    </div>
  ),
};

export const Sortable: Story = {
  render: () => {
    const [sortCol, setSortCol] = useState<string>('name');
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

    const handleSort = (col: string) => {
      if (sortCol === col) {
        setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
      } else {
        setSortCol(col);
        setSortDir('asc');
      }
    };

    const sorted = [...documents].sort((a, b) => {
      const key = sortCol as keyof typeof a;
      const cmp = String(a[key]).localeCompare(String(b[key]));
      return sortDir === 'asc' ? cmp : -cmp;
    });

    return (
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell
              sortable
              sorted={sortCol === 'name' ? sortDir : null}
              onSort={() => handleSort('name')}
            >
              Name
            </Table.HeadCell>
            <Table.HeadCell
              sortable
              sorted={sortCol === 'status' ? sortDir : null}
              onSort={() => handleSort('status')}
            >
              Status
            </Table.HeadCell>
            <Table.HeadCell
              sortable
              sorted={sortCol === 'date' ? sortDir : null}
              onSort={() => handleSort('date')}
            >
              Date
            </Table.HeadCell>
            <Table.HeadCell>Type</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {sorted.map((doc) => (
            <Table.Row key={doc.id}>
              <Table.Cell>{doc.name}</Table.Cell>
              <Table.Cell>{doc.status}</Table.Cell>
              <Table.Cell>{doc.date}</Table.Cell>
              <Table.Cell>{doc.type}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  },
};

export const SelectableRows: Story = {
  render: () => {
    const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

    const toggleSelect = (id: number) => {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        return next;
      });
    };

    return (
      <Table>
        <Table.Head>
          <Table.Row hoverable={false}>
            <Table.HeadCell width="40px" />
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Date</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {documents.map((doc) => (
            <Table.Row
              key={doc.id}
              selected={selectedIds.has(doc.id)}
              onClick={() => toggleSelect(doc.id)}
            >
              <Table.Cell>
                <input
                  type="checkbox"
                  checked={selectedIds.has(doc.id)}
                  onChange={() => toggleSelect(doc.id)}
                  onClick={(e) => e.stopPropagation()}
                />
              </Table.Cell>
              <Table.Cell>{doc.name}</Table.Cell>
              <Table.Cell>{doc.status}</Table.Cell>
              <Table.Cell>{doc.date}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  },
};

export const StickyHeader: Story = {
  render: () => {
    const manyDocs = Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: `Document ${i + 1}`,
      status: i % 3 === 0 ? 'Approved' : i % 3 === 1 ? 'Pending' : 'Draft',
      date: `2024-${String(Math.floor(i / 4) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
    }));

    return (
      <div style={{ height: 400, overflow: 'auto', border: '1px solid var(--oc-border-default)', borderRadius: 'var(--oc-radius-lg)' }}>
        <Table stickyHeader>
          <Table.Head>
            <Table.Row>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
              <Table.HeadCell>Date</Table.HeadCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {manyDocs.map((doc) => (
              <Table.Row key={doc.id}>
                <Table.Cell>{doc.name}</Table.Cell>
                <Table.Cell>{doc.status}</Table.Cell>
                <Table.Cell>{doc.date}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  },
};

export const FrozenColumn: Story = {
  render: () => (
    <Table.ScrollContainer style={{ maxWidth: 500, maxHeight: 300 }}>
      <Table stickyHeader>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell sticky="left" width="120px">Name</Table.HeadCell>
            <Table.HeadCell width="150px">Status</Table.HeadCell>
            <Table.HeadCell width="150px">Date</Table.HeadCell>
            <Table.HeadCell width="150px">Type</Table.HeadCell>
            <Table.HeadCell width="150px">Author</Table.HeadCell>
            <Table.HeadCell width="150px">Category</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {documents.map((doc) => (
            <Table.Row key={doc.id}>
              <Table.Cell sticky="left">{doc.name}</Table.Cell>
              <Table.Cell>{doc.status}</Table.Cell>
              <Table.Cell>{doc.date}</Table.Cell>
              <Table.Cell>{doc.type}</Table.Cell>
              <Table.Cell>John Doe</Table.Cell>
              <Table.Cell>Legal</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Table.ScrollContainer>
  ),
};

export const TruncatedCells: Story = {
  render: () => (
    <Table variant="bordered" style={{ tableLayout: 'fixed' }}>
      <Table.Head>
        <Table.Row>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Description</Table.HeadCell>
          <Table.HeadCell width="100px">Status</Table.HeadCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell truncate maxWidth="200px">
            Very Long Document Name That Should Be Truncated With Ellipsis
          </Table.Cell>
          <Table.Cell truncate maxWidth="250px">
            This is a very long description of a document that contains a lot of text and should be truncated to prevent the table from becoming too wide
          </Table.Cell>
          <Table.Cell>Approved</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell truncate maxWidth="200px">
            Another Extremely Long Document Title For Testing Purposes
          </Table.Cell>
          <Table.Cell truncate maxWidth="250px">
            Another long description with lots of words that will be cut off with an ellipsis when displayed in the table cell
          </Table.Cell>
          <Table.Cell>Pending</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Table variant="bordered">
      <Table.Head>
        <Table.Row>
          <Table.HeadCell>Document</Table.HeadCell>
          <Table.HeadCell align="right">Pages</Table.HeadCell>
          <Table.HeadCell align="right">Size (KB)</Table.HeadCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Contract A</Table.Cell>
          <Table.Cell align="right">12</Table.Cell>
          <Table.Cell align="right">245</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Contract B</Table.Cell>
          <Table.Cell align="right">8</Table.Cell>
          <Table.Cell align="right">180</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Amendment C</Table.Cell>
          <Table.Cell align="right">3</Table.Cell>
          <Table.Cell align="right">95</Table.Cell>
        </Table.Row>
      </Table.Body>
      <Table.Footer>
        <Table.Row hoverable={false}>
          <Table.Cell><strong>Total</strong></Table.Cell>
          <Table.Cell align="right"><strong>23</strong></Table.Cell>
          <Table.Cell align="right"><strong>520</strong></Table.Cell>
        </Table.Row>
      </Table.Footer>
    </Table>
  ),
};

export const EmptyTable: Story = {
  render: () => (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Date</Table.HeadCell>
        </Table.Row>
      </Table.Head>
      <Table.Body />
    </Table>
  ),
};

export const Virtualized: Story = {
  render: () => {
    const totalRows = 10000;

    const renderRow = useCallback((index: number, style: React.CSSProperties) => (
      <Table.Row key={index} style={style}>
        <Table.Cell>Row {index + 1}</Table.Cell>
        <Table.Cell>{index % 3 === 0 ? 'Active' : index % 3 === 1 ? 'Pending' : 'Archived'}</Table.Cell>
        <Table.Cell>2024-{String(Math.floor(index / 30) % 12 + 1).padStart(2, '0')}-{String((index % 28) + 1).padStart(2, '0')}</Table.Cell>
        <Table.Cell align="right">{(index * 17 % 1000).toLocaleString()}</Table.Cell>
      </Table.Row>
    ), []);

    return (
      <div>
        <p style={{ margin: '0 0 12px', fontSize: '13px', color: '#64748b' }}>
          Rendering {totalRows.toLocaleString()} rows with virtualization. Only visible rows are in the DOM.
        </p>
        <Table.Virtualized
          height={400}
          rowCount={totalRows}
          rowHeight={40}
          overscan={10}
          variant="default"
          size="sm"
          stickyHeader
          header={
            <Table.Head>
              <Table.Row>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Status</Table.HeadCell>
                <Table.HeadCell>Date</Table.HeadCell>
                <Table.HeadCell align="right">Value</Table.HeadCell>
              </Table.Row>
            </Table.Head>
          }
          renderRow={renderRow}
        />
      </div>
    );
  },
};

export const VirtualizedWithLoadMore: Story = {
  render: () => {
    const [rowCount, setRowCount] = useState(200);
    const [loading, setLoading] = useState(false);

    const handleLoadMore = useCallback(() => {
      if (loading) return;
      setLoading(true);
      setTimeout(() => {
        setRowCount((prev) => prev + 100);
        setLoading(false);
      }, 500);
    }, [loading]);

    const renderRow = useCallback((index: number, style: React.CSSProperties) => (
      <Table.Row key={index} style={style}>
        <Table.Cell>Document #{index + 1}</Table.Cell>
        <Table.Cell>{index % 2 === 0 ? 'Approved' : 'Draft'}</Table.Cell>
        <Table.Cell>Page {Math.floor(index / 50) + 1}</Table.Cell>
      </Table.Row>
    ), []);

    return (
      <div>
        <p style={{ margin: '0 0 12px', fontSize: '13px', color: '#64748b' }}>
          Loaded {rowCount} rows. Scroll to bottom to load more.
          {loading && ' Loading...'}
        </p>
        <Table.Virtualized
          height={400}
          rowCount={rowCount}
          rowHeight={40}
          overscan={10}
          variant="bordered"
          size="sm"
          stickyHeader
          onLoadMore={handleLoadMore}
          loadMoreThreshold={100}
          header={
            <Table.Head>
              <Table.Row>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Status</Table.HeadCell>
                <Table.HeadCell>Page</Table.HeadCell>
              </Table.Row>
            </Table.Head>
          }
          renderRow={renderRow}
        />
      </div>
    );
  },
};

export const ScrollContainer: Story = {
  render: () => (
    <Table.ScrollContainer style={{ maxWidth: 600 }}>
      <Table variant="bordered" size="sm">
        <Table.Head>
          <Table.Row>
            <Table.HeadCell width="150px">Column 1</Table.HeadCell>
            <Table.HeadCell width="150px">Column 2</Table.HeadCell>
            <Table.HeadCell width="150px">Column 3</Table.HeadCell>
            <Table.HeadCell width="150px">Column 4</Table.HeadCell>
            <Table.HeadCell width="150px">Column 5</Table.HeadCell>
            <Table.HeadCell width="150px">Column 6</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {Array.from({ length: 5 }, (_, i) => (
            <Table.Row key={i}>
              {Array.from({ length: 6 }, (_, j) => (
                <Table.Cell key={j}>Cell {i + 1}-{j + 1}</Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Table.ScrollContainer>
  ),
};
