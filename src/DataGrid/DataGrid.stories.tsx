import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DataGrid, DataGridColumn, CellAction, SortDirection } from './DataGrid';

const meta: Meta<typeof DataGrid> = {
  title: 'Data Display/DataGrid',
  component: DataGrid,
  parameters: {
    layout: 'padded',
  },
};

export default meta;

// Sample data
interface Contract {
  id: string;
  documentName: string;
  partyA: string;
  partyB: string;
  effectiveDate: string;
  expirationDate: string;
  value: number;
  status: string;
  hasTermination: boolean;
}

const sampleData: Contract[] = [
  {
    id: '1',
    documentName: 'Master Services Agreement',
    partyA: 'Acme Corporation',
    partyB: 'TechStart Inc',
    effectiveDate: '2024-01-15',
    expirationDate: '2025-01-15',
    value: 250000,
    status: 'Active',
    hasTermination: true,
  },
  {
    id: '2',
    documentName: 'Software License Agreement',
    partyA: 'BigCorp LLC',
    partyB: 'CloudSoft Solutions',
    effectiveDate: '2024-03-01',
    expirationDate: '2026-03-01',
    value: 75000,
    status: 'Active',
    hasTermination: true,
  },
  {
    id: '3',
    documentName: 'Non-Disclosure Agreement',
    partyA: 'Innovation Labs',
    partyB: 'Research Partners Co',
    effectiveDate: '2024-02-10',
    expirationDate: '2025-02-10',
    value: 0,
    status: 'Pending Review',
    hasTermination: false,
  },
  {
    id: '4',
    documentName: 'Employment Contract',
    partyA: 'Startup XYZ',
    partyB: 'John Smith',
    effectiveDate: '2024-04-01',
    expirationDate: '2027-04-01',
    value: 150000,
    status: 'Active',
    hasTermination: true,
  },
  {
    id: '5',
    documentName: 'Lease Agreement',
    partyA: 'Property Holdings Inc',
    partyB: 'Retail Store Co',
    effectiveDate: '2023-06-01',
    expirationDate: '2028-06-01',
    value: 500000,
    status: 'Active',
    hasTermination: true,
  },
];

const columns: DataGridColumn<Contract>[] = [
  {
    key: 'documentName',
    label: 'Document',
    width: '25%',
    sortable: true,
    showCellActions: true,
  },
  {
    key: 'partyA',
    label: 'Party A',
    sortable: true,
  },
  {
    key: 'partyB',
    label: 'Party B',
    sortable: true,
  },
  {
    key: 'effectiveDate',
    label: 'Effective',
    type: 'date',
    sortable: true,
    width: '120px',
  },
  {
    key: 'value',
    label: 'Value',
    type: 'number',
    align: 'right',
    sortable: true,
    width: '120px',
    render: (value) => (value as number > 0 ? `$${(value as number).toLocaleString()}` : '—'),
  },
  {
    key: 'hasTermination',
    label: 'Term.',
    type: 'boolean',
    align: 'center',
    width: '80px',
  },
];

// Icons for actions
const ViewIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 3.5C4.136 3.5 1.04 6.534 0 8c1.04 1.466 4.136 4.5 8 4.5s6.96-3.034 8-4.5c-1.04-1.466-4.136-4.5-8-4.5zm0 7.5a3 3 0 110-6 3 3 0 010 6zm0-5a2 2 0 100 4 2 2 0 000-4z" />
  </svg>
);

const CopyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M4 2a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H4zm0 1h8a1 1 0 011 1v8a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1z" />
  </svg>
);

const FlagIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M2 2a1 1 0 011-1h10a1 1 0 01.707 1.707L10.414 6l3.293 3.293A1 1 0 0113 11H3a1 1 0 01-1-1V2z" />
  </svg>
);

const cellActions: CellAction<Contract>[] = [
  {
    id: 'view',
    label: 'View source',
    icon: <ViewIcon />,
    onClick: (value, row, column) => {
      console.log('View source:', { value, row, column });
      alert(`Viewing source for: ${value}`);
    },
  },
  {
    id: 'copy',
    label: 'Copy value',
    icon: <CopyIcon />,
    onClick: (value) => {
      navigator.clipboard?.writeText(String(value));
      console.log('Copied:', value);
    },
  },
  {
    id: 'flag',
    label: 'Flag for review',
    icon: <FlagIcon />,
    onClick: (value, row) => {
      console.log('Flagged:', row.documentName, value);
    },
  },
];

export const Default: StoryObj = {
  render: () => (
    <DataGrid
      columns={columns}
      data={sampleData}
      rowKey="id"
      cellActions={cellActions}
      onRowClick={(row) => console.log('Row clicked:', row)}
    />
  ),
};

export const WithSorting: StoryObj = {
  render: () => {
    const [sortColumn, setSortColumn] = useState<string>('documentName');
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

    const sortedData = [...sampleData].sort((a, b) => {
      if (!sortColumn || !sortDirection) return 0;
      const aVal = a[sortColumn as keyof Contract];
      const bVal = b[sortColumn as keyof Contract];
      const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      return sortDirection === 'asc' ? cmp : -cmp;
    });

    return (
      <DataGrid
        columns={columns}
        data={sortedData}
        rowKey="id"
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSortChange={(col, dir) => {
          setSortColumn(col);
          setSortDirection(dir);
        }}
        cellActions={cellActions}
      />
    );
  },
};

export const WithSelection: StoryObj = {
  render: () => {
    const [selectedKeys, setSelectedKeys] = useState<string[]>(['1', '3']);

    return (
      <div>
        <div style={{ marginBottom: 16, color: '#64748B', fontSize: 14 }}>
          Selected: {selectedKeys.length > 0 ? selectedKeys.join(', ') : 'None'}
        </div>
        <DataGrid
          columns={columns}
          data={sampleData}
          rowKey="id"
          selectable
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
          cellActions={cellActions}
        />
      </div>
    );
  },
};

export const Compact: StoryObj = {
  render: () => (
    <DataGrid
      columns={columns}
      data={sampleData}
      rowKey="id"
      compact
      cellActions={cellActions}
    />
  ),
};

export const Striped: StoryObj = {
  render: () => (
    <DataGrid
      columns={columns}
      data={sampleData}
      rowKey="id"
      striped
      cellActions={cellActions}
    />
  ),
};

export const StickyHeader: StoryObj = {
  render: () => (
    <DataGrid
      columns={columns}
      data={[...sampleData, ...sampleData, ...sampleData]}
      rowKey="id"
      stickyHeader
      maxHeight="400px"
      cellActions={cellActions}
    />
  ),
};

export const Loading: StoryObj = {
  render: () => (
    <DataGrid
      columns={columns}
      data={[]}
      rowKey="id"
      loading
      loadingRows={5}
    />
  ),
};

export const Empty: StoryObj = {
  render: () => (
    <DataGrid
      columns={columns}
      data={[]}
      rowKey="id"
      emptyState={
        <div style={{ textAlign: 'center', padding: '32px 16px' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📊</div>
          <h3 style={{ margin: '0 0 8px', fontSize: 18, fontWeight: 600, color: '#1E293B' }}>
            No extracts yet
          </h3>
          <p style={{ margin: 0, color: '#64748B', fontSize: 14 }}>
            Run an extraction to see data here
          </p>
        </div>
      }
    />
  ),
};

export const CustomRenderers: StoryObj = {
  render: () => {
    const customColumns: DataGridColumn<Contract>[] = [
      {
        key: 'documentName',
        label: 'Document',
        render: (value, row) => (
          <div>
            <div style={{ fontWeight: 500 }}>{String(value)}</div>
            <div style={{ fontSize: 12, color: '#94A3B8' }}>{row.status}</div>
          </div>
        ),
      },
      {
        key: 'partyA',
        label: 'Parties',
        render: (_, row) => (
          <div style={{ fontSize: 13 }}>
            <span style={{ color: '#1E293B' }}>{row.partyA}</span>
            <span style={{ color: '#94A3B8', margin: '0 6px' }}>→</span>
            <span style={{ color: '#1E293B' }}>{row.partyB}</span>
          </div>
        ),
      },
      {
        key: 'value',
        label: 'Contract Value',
        align: 'right',
        render: (value) => {
          const num = value as number;
          if (num === 0) return <span style={{ color: '#94A3B8' }}>N/A</span>;
          const color = num >= 200000 ? '#065F46' : num >= 100000 ? '#92400E' : '#64748B';
          return (
            <span style={{
              color,
              fontWeight: 600,
              background: num >= 200000 ? '#D1FAE5' : num >= 100000 ? '#FEF3C7' : '#F1F5F9',
              padding: '4px 8px',
              borderRadius: 6,
              fontSize: 13,
            }}>
              ${num.toLocaleString()}
            </span>
          );
        },
      },
    ];

    return (
      <DataGrid
        columns={customColumns}
        data={sampleData}
        rowKey="id"
        onRowClick={(row) => console.log('Clicked:', row)}
      />
    );
  },
};
