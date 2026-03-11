// @vitest-environment jsdom
import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { Table } from './Table';

// ─── Helpers ──────────────────────────────────────────────────────────────

afterEach(() => {
  cleanup();
});

function renderBasicTable(props: Partial<React.ComponentProps<typeof Table>> = {}) {
  return render(
    <Table {...props}>
      <Table.Head>
        <Table.Row>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Document A</Table.Cell>
          <Table.Cell>Active</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Document B</Table.Cell>
          <Table.Cell>Draft</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}

// ─── Rendering ────────────────────────────────────────────────────────────

describe('Table — Rendering', () => {
  it('renders a table element', () => {
    renderBasicTable();
    expect(screen.getByRole('table')).toBeDefined();
  });

  it('renders thead, tbody, rows, and cells', () => {
    renderBasicTable();
    expect(screen.getAllByRole('columnheader')).toHaveLength(2);
    expect(screen.getAllByRole('row')).toHaveLength(3); // 1 header + 2 body
    expect(screen.getAllByRole('cell')).toHaveLength(4);
  });

  it('renders header text content', () => {
    renderBasicTable();
    expect(screen.getByText('Name')).toBeDefined();
    expect(screen.getByText('Status')).toBeDefined();
  });

  it('renders body cell content', () => {
    renderBasicTable();
    expect(screen.getByText('Document A')).toBeDefined();
    expect(screen.getByText('Active')).toBeDefined();
  });

  it('renders with empty body gracefully', () => {
    render(
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>Name</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body />
      </Table>
    );
    expect(screen.getByRole('table')).toBeDefined();
    expect(screen.getAllByRole('columnheader')).toHaveLength(1);
  });
});

// ─── Variants ─────────────────────────────────────────────────────────────

describe('Table — Variants', () => {
  it('applies default variant class', () => {
    const { container } = renderBasicTable();
    expect(container.querySelector('.oc-table--default')).not.toBeNull();
  });

  it('applies bordered variant class', () => {
    const { container } = renderBasicTable({ variant: 'bordered' });
    expect(container.querySelector('.oc-table--bordered')).not.toBeNull();
  });

  it('applies minimal variant class', () => {
    const { container } = renderBasicTable({ variant: 'minimal' });
    expect(container.querySelector('.oc-table--minimal')).not.toBeNull();
  });
});

// ─── Sizes ────────────────────────────────────────────────────────────────

describe('Table — Sizes', () => {
  it('applies sm size class', () => {
    const { container } = renderBasicTable({ size: 'sm' });
    expect(container.querySelector('.oc-table--sm')).not.toBeNull();
  });

  it('applies md size class by default', () => {
    const { container } = renderBasicTable();
    expect(container.querySelector('.oc-table--md')).not.toBeNull();
  });

  it('applies lg size class', () => {
    const { container } = renderBasicTable({ size: 'lg' });
    expect(container.querySelector('.oc-table--lg')).not.toBeNull();
  });
});

// ─── Striped ──────────────────────────────────────────────────────────────

describe('Table — Striped', () => {
  it('does not apply striped class by default', () => {
    const { container } = renderBasicTable();
    expect(container.querySelector('.oc-table--striped')).toBeNull();
  });

  it('applies striped class when prop is true', () => {
    const { container } = renderBasicTable({ striped: true });
    expect(container.querySelector('.oc-table--striped')).not.toBeNull();
  });
});

// ─── Sticky header ───────────────────────────────────────────────────────

describe('Table — Sticky header', () => {
  it('does not apply sticky-header class by default', () => {
    const { container } = renderBasicTable();
    expect(container.querySelector('.oc-table--sticky-header')).toBeNull();
  });

  it('applies sticky-header class when prop is true', () => {
    const { container } = renderBasicTable({ stickyHeader: true });
    expect(container.querySelector('.oc-table--sticky-header')).not.toBeNull();
  });
});

// ─── Layout ───────────────────────────────────────────────────────────────

describe('Table — Layout', () => {
  it('does not apply layout-fixed class by default', () => {
    const { container } = renderBasicTable();
    expect(container.querySelector('.oc-table--layout-fixed')).toBeNull();
  });

  it('applies layout-fixed class when layout="fixed"', () => {
    const { container } = renderBasicTable({ layout: 'fixed' });
    expect(container.querySelector('.oc-table--layout-fixed')).not.toBeNull();
  });
});

// ─── HeadCell ─────────────────────────────────────────────────────────────

describe('Table — HeadCell', () => {
  it('sets scope="col" on all head cells', () => {
    renderBasicTable();
    const headers = screen.getAllByRole('columnheader');
    headers.forEach((header) => {
      expect(header.getAttribute('scope')).toBe('col');
    });
  });

  it('applies alignment classes', () => {
    const { container } = render(
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell align="left">Left</Table.HeadCell>
            <Table.HeadCell align="center">Center</Table.HeadCell>
            <Table.HeadCell align="right">Right</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body />
      </Table>
    );

    expect(container.querySelector('.oc-table__head-cell--align-left')).not.toBeNull();
    expect(container.querySelector('.oc-table__head-cell--align-center')).not.toBeNull();
    expect(container.querySelector('.oc-table__head-cell--align-right')).not.toBeNull();
  });

  it('applies width as CSS style', () => {
    render(
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell width="200px">Name</Table.HeadCell>
            <Table.HeadCell width={100}>Status</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body />
      </Table>
    );

    const headers = screen.getAllByRole('columnheader');
    expect(headers[0].style.width).toBe('200px');
    expect(headers[1].style.width).toBe('100px');
  });

  it('applies sticky-left class', () => {
    const { container } = render(
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell sticky="left">Frozen</Table.HeadCell>
            <Table.HeadCell>Normal</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body />
      </Table>
    );

    expect(container.querySelector('.oc-table__head-cell--sticky-left')).not.toBeNull();
  });

  it('applies sticky-right class', () => {
    const { container } = render(
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>Normal</Table.HeadCell>
            <Table.HeadCell sticky="right">Actions</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body />
      </Table>
    );

    expect(container.querySelector('.oc-table__head-cell--sticky-right')).not.toBeNull();
  });
});

// ─── Sorting ──────────────────────────────────────────────────────────────

describe('Table — Sorting', () => {
  it('renders sortable head cell with cursor pointer class', () => {
    const { container } = render(
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell sortable onSort={() => {}}>Name</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body />
      </Table>
    );

    expect(container.querySelector('.oc-table__head-cell--sortable')).not.toBeNull();
  });

  it('sets aria-sort="ascending" when sorted="asc"', () => {
    render(
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell sortable sorted="asc" onSort={() => {}}>Name</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body />
      </Table>
    );

    const header = screen.getByRole('columnheader', { name: /Name/ });
    expect(header.getAttribute('aria-sort')).toBe('ascending');
  });

  it('sets aria-sort="descending" when sorted="desc"', () => {
    render(
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell sortable sorted="desc" onSort={() => {}}>Name</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body />
      </Table>
    );

    const header = screen.getByRole('columnheader', { name: /Name/ });
    expect(header.getAttribute('aria-sort')).toBe('descending');
  });

  it('sets aria-sort="none" when sortable but not sorted', () => {
    render(
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell sortable onSort={() => {}}>Name</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body />
      </Table>
    );

    const header = screen.getByRole('columnheader', { name: /Name/ });
    expect(header.getAttribute('aria-sort')).toBe('none');
  });

  it('does not set aria-sort on non-sortable headers', () => {
    renderBasicTable();
    const header = screen.getByRole('columnheader', { name: 'Name' });
    expect(header.getAttribute('aria-sort')).toBeNull();
  });

  it('calls onSort when sortable header is clicked', () => {
    const handleSort = vi.fn();
    render(
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell sortable onSort={handleSort}>Name</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body />
      </Table>
    );

    fireEvent.click(screen.getByRole('columnheader', { name: /Name/ }));
    expect(handleSort).toHaveBeenCalledOnce();
  });

  it('calls onSort on Enter key press', () => {
    const handleSort = vi.fn();
    render(
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell sortable onSort={handleSort}>Name</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body />
      </Table>
    );

    const header = screen.getByRole('columnheader', { name: /Name/ });
    fireEvent.keyDown(header, { key: 'Enter' });
    expect(handleSort).toHaveBeenCalledOnce();
  });

  it('calls onSort on Space key press', () => {
    const handleSort = vi.fn();
    render(
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell sortable onSort={handleSort}>Name</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body />
      </Table>
    );

    const header = screen.getByRole('columnheader', { name: /Name/ });
    fireEvent.keyDown(header, { key: ' ' });
    expect(handleSort).toHaveBeenCalledOnce();
  });

  it('makes sortable headers keyboard-focusable', () => {
    render(
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell sortable onSort={() => {}}>Name</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body />
      </Table>
    );

    const header = screen.getByRole('columnheader', { name: /Name/ });
    expect(header.getAttribute('tabindex')).toBe('0');
  });

  it('renders sort icon container for sortable headers', () => {
    const { container } = render(
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell sortable sorted="asc" onSort={() => {}}>Name</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body />
      </Table>
    );

    expect(container.querySelector('.oc-table__sort-icon')).not.toBeNull();
    expect(container.querySelector('.oc-table__sort-icon--active')).not.toBeNull();
  });

  it('renders neutral sort icon for unsorted sortable headers', () => {
    const { container } = render(
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell sortable onSort={() => {}}>Name</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body />
      </Table>
    );

    expect(container.querySelector('.oc-table__sort-icon--neutral')).not.toBeNull();
  });
});

// ─── Row ──────────────────────────────────────────────────────────────────

describe('Table — Row', () => {
  it('applies hoverable class by default', () => {
    const { container } = renderBasicTable();
    const bodyRows = container.querySelectorAll('.oc-table__body .oc-table__row');
    bodyRows.forEach((row) => {
      expect(row.className).toContain('oc-table__row--hoverable');
    });
  });

  it('does not apply hoverable class when hoverable=false', () => {
    const { container } = render(
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>Name</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row hoverable={false}>
            <Table.Cell>Doc A</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );

    const bodyRow = container.querySelector('.oc-table__body .oc-table__row');
    expect(bodyRow?.className).not.toContain('oc-table__row--hoverable');
  });

  it('applies selected class and aria-selected', () => {
    render(
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>Name</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row selected>
            <Table.Cell>Doc A</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Doc B</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );

    const rows = screen.getAllByRole('row');
    // row[0] is header, row[1] is selected body row
    expect(rows[1].getAttribute('aria-selected')).toBe('true');
    expect(rows[1].className).toContain('oc-table__row--selected');
    expect(rows[2].getAttribute('aria-selected')).toBeNull();
  });

  it('applies clickable class when onClick is provided', () => {
    const handleClick = vi.fn();
    render(
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>Name</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row onClick={handleClick}>
            <Table.Cell>Doc A</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );

    const rows = screen.getAllByRole('row');
    expect(rows[1].className).toContain('oc-table__row--clickable');
  });

  it('calls onClick when row is clicked', () => {
    const handleClick = vi.fn();
    render(
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>Name</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row onClick={handleClick}>
            <Table.Cell>Doc A</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );

    const rows = screen.getAllByRole('row');
    fireEvent.click(rows[1]);
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('calls onClick on Enter key press for clickable rows', () => {
    const handleClick = vi.fn();
    render(
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>Name</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row onClick={handleClick}>
            <Table.Cell>Doc A</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );

    const rows = screen.getAllByRole('row');
    fireEvent.keyDown(rows[1], { key: 'Enter' });
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('makes clickable rows keyboard-focusable', () => {
    const handleClick = vi.fn();
    render(
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>Name</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row onClick={handleClick}>
            <Table.Cell>Doc A</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );

    const rows = screen.getAllByRole('row');
    expect(rows[1].getAttribute('tabindex')).toBe('0');
  });
});

// ─── Cell ─────────────────────────────────────────────────────────────────

describe('Table — Cell', () => {
  it('applies alignment classes', () => {
    const { container } = render(
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>Col</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell align="center">Centered</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );

    expect(container.querySelector('.oc-table__cell--align-center')).not.toBeNull();
  });

  it('applies truncate class', () => {
    const { container } = render(
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>Col</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell truncate maxWidth="200px">Very long text content</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );

    const cell = container.querySelector('.oc-table__cell--truncate');
    expect(cell).not.toBeNull();
    expect((cell as HTMLElement).style.maxWidth).toBe('200px');
  });

  it('adds title attribute for truncated string content', () => {
    render(
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>Col</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell truncate>Long text here</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );

    const cell = screen.getByText('Long text here');
    expect(cell.getAttribute('title')).toBe('Long text here');
  });

  it('does not add title for non-truncated cells', () => {
    render(
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>Col</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Normal text</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );

    const cell = screen.getByText('Normal text');
    expect(cell.getAttribute('title')).toBeNull();
  });

  it('applies sticky-left class', () => {
    const { container } = render(
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>Col</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell sticky="left">Frozen</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );

    expect(container.querySelector('.oc-table__cell--sticky-left')).not.toBeNull();
  });

  it('supports colSpan', () => {
    render(
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>A</Table.HeadCell>
            <Table.HeadCell>B</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell colSpan={2}>Spanning cell</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );

    const cell = screen.getByText('Spanning cell');
    expect(cell.getAttribute('colspan')).toBe('2');
  });
});

// ─── Footer ──────────────────────────────────────────────────────────────

describe('Table — Footer', () => {
  it('renders a tfoot element', () => {
    const { container } = render(
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>Name</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Doc A</Table.Cell>
          </Table.Row>
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.Cell>Footer content</Table.Cell>
          </Table.Row>
        </Table.Footer>
      </Table>
    );

    expect(container.querySelector('.oc-table__footer')).not.toBeNull();
    expect(screen.getByText('Footer content')).toBeDefined();
  });
});

// ─── ScrollContainer ─────────────────────────────────────────────────────

describe('Table — ScrollContainer', () => {
  it('renders a wrapper div with scroll-container class', () => {
    const { container } = render(
      <Table.ScrollContainer>
        <Table>
          <Table.Head>
            <Table.Row>
              <Table.HeadCell>Name</Table.HeadCell>
            </Table.Row>
          </Table.Head>
          <Table.Body />
        </Table>
      </Table.ScrollContainer>
    );

    expect(container.querySelector('.oc-table-scroll-container')).not.toBeNull();
    expect(container.querySelector('.oc-table')).not.toBeNull();
  });

  it('accepts custom className', () => {
    const { container } = render(
      <Table.ScrollContainer className="my-custom-class">
        <Table>
          <Table.Head>
            <Table.Row>
              <Table.HeadCell>Name</Table.HeadCell>
            </Table.Row>
          </Table.Head>
          <Table.Body />
        </Table>
      </Table.ScrollContainer>
    );

    const scrollContainer = container.querySelector('.oc-table-scroll-container');
    expect(scrollContainer?.className).toContain('my-custom-class');
  });
});

// ─── Custom className ────────────────────────────────────────────────────

describe('Table — className forwarding', () => {
  it('forwards className to table root', () => {
    const { container } = renderBasicTable({ className: 'custom-table' });
    expect(container.querySelector('.oc-table')?.className).toContain('custom-table');
  });

  it('forwards className to Row', () => {
    const { container } = render(
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>Col</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row className="custom-row">
            <Table.Cell>Data</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );

    const bodyRow = container.querySelector('.oc-table__body .oc-table__row');
    expect(bodyRow?.className).toContain('custom-row');
  });

  it('forwards className to Cell', () => {
    const { container } = render(
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>Col</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell className="custom-cell">Data</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );

    expect(container.querySelector('.custom-cell')).not.toBeNull();
  });
});

// ─── Ref forwarding ──────────────────────────────────────────────────────

describe('Table — Ref forwarding', () => {
  it('forwards ref to the table element', () => {
    const ref = React.createRef<HTMLTableElement>();
    render(
      <Table ref={ref}>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>Name</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body />
      </Table>
    );

    expect(ref.current).toBeDefined();
    expect(ref.current?.tagName).toBe('TABLE');
  });

  it('forwards ref to Row element', () => {
    const ref = React.createRef<HTMLTableRowElement>();
    render(
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>Col</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row ref={ref}>
            <Table.Cell>Data</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );

    expect(ref.current).toBeDefined();
    expect(ref.current?.tagName).toBe('TR');
  });

  it('forwards ref to Cell element', () => {
    const ref = React.createRef<HTMLTableCellElement>();
    render(
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>Col</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell ref={ref}>Data</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );

    expect(ref.current).toBeDefined();
    expect(ref.current?.tagName).toBe('TD');
  });

  it('forwards ref to ScrollContainer element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Table.ScrollContainer ref={ref}>
        <Table>
          <Table.Head>
            <Table.Row>
              <Table.HeadCell>Name</Table.HeadCell>
            </Table.Row>
          </Table.Head>
          <Table.Body />
        </Table>
      </Table.ScrollContainer>
    );

    expect(ref.current).toBeDefined();
    expect(ref.current?.tagName).toBe('DIV');
  });
});

// ─── displayName ─────────────────────────────────────────────────────────

describe('Table — displayName', () => {
  it('has correct displayName on root', () => {
    expect((Table as any).displayName).toBe('Table');
  });

  it('has correct displayName on sub-components', () => {
    expect(Table.Head.displayName).toBe('Table.Head');
    expect(Table.HeadCell.displayName).toBe('Table.HeadCell');
    expect(Table.Body.displayName).toBe('Table.Body');
    expect(Table.Row.displayName).toBe('Table.Row');
    expect(Table.Cell.displayName).toBe('Table.Cell');
    expect(Table.Footer.displayName).toBe('Table.Footer');
    expect(Table.ScrollContainer.displayName).toBe('Table.ScrollContainer');
    expect(Table.VirtualizedBody.displayName).toBe('Table.VirtualizedBody');
    expect(Table.Virtualized.displayName).toBe('Table.Virtualized');
  });
});

// ─── Context errors ──────────────────────────────────────────────────────

describe('Table — Context validation', () => {
  it('throws when sub-components used outside Table', () => {
    // Suppress React error boundary output
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(
        <table>
          <Table.Head>
            <Table.Row>
              <Table.HeadCell>Outside</Table.HeadCell>
            </Table.Row>
          </Table.Head>
        </table>
      );
    }).toThrow('Table sub-components must be used within a Table component');

    spy.mockRestore();
  });
});

// ─── Virtualized ─────────────────────────────────────────────────────────

describe('Table — Virtualized', () => {
  it('renders the virtualized table wrapper', () => {
    const renderRow = (index: number, style: React.CSSProperties) => (
      <Table.Row key={index} style={style}>
        <Table.Cell>Row {index}</Table.Cell>
      </Table.Row>
    );

    const { container } = render(
      <Table.Virtualized
        height={400}
        rowCount={1000}
        rowHeight={40}
        header={
          <Table.Head>
            <Table.Row>
              <Table.HeadCell>Name</Table.HeadCell>
            </Table.Row>
          </Table.Head>
        }
        renderRow={renderRow}
      />
    );

    expect(container.querySelector('.oc-table-scroll-container')).not.toBeNull();
    expect(container.querySelector('.oc-table--virtualized')).not.toBeNull();
  });

  it('renders only visible rows (not all 1000)', () => {
    const renderRow = (index: number, style: React.CSSProperties) => (
      <Table.Row key={index} style={style}>
        <Table.Cell>Row {index}</Table.Cell>
      </Table.Row>
    );

    const { container } = render(
      <Table.Virtualized
        height={400}
        rowCount={1000}
        rowHeight={40}
        overscan={5}
        header={
          <Table.Head>
            <Table.Row>
              <Table.HeadCell>Name</Table.HeadCell>
            </Table.Row>
          </Table.Head>
        }
        renderRow={renderRow}
      />
    );

    const bodyRows = container.querySelectorAll('.oc-table__body .oc-table__row');
    // height=400, rowHeight=40 = 10 visible + 5 overscan = 15 max
    expect(bodyRows.length).toBeLessThan(50);
    expect(bodyRows.length).toBeGreaterThan(0);
  });

  it('applies variant and size classes to virtualized table', () => {
    const renderRow = (index: number, style: React.CSSProperties) => (
      <Table.Row key={index} style={style}>
        <Table.Cell>Row {index}</Table.Cell>
      </Table.Row>
    );

    const { container } = render(
      <Table.Virtualized
        height={200}
        rowCount={100}
        rowHeight={40}
        variant="bordered"
        size="sm"
        header={
          <Table.Head>
            <Table.Row>
              <Table.HeadCell>Name</Table.HeadCell>
            </Table.Row>
          </Table.Head>
        }
        renderRow={renderRow}
      />
    );

    const table = container.querySelector('.oc-table');
    expect(table?.className).toContain('oc-table--bordered');
    expect(table?.className).toContain('oc-table--sm');
  });

  it('sets total height on tbody for scroll sizing', () => {
    const renderRow = (index: number, style: React.CSSProperties) => (
      <Table.Row key={index} style={style}>
        <Table.Cell>Row {index}</Table.Cell>
      </Table.Row>
    );

    const { container } = render(
      <Table.Virtualized
        height={400}
        rowCount={100}
        rowHeight={40}
        header={
          <Table.Head>
            <Table.Row>
              <Table.HeadCell>Name</Table.HeadCell>
            </Table.Row>
          </Table.Head>
        }
        renderRow={renderRow}
      />
    );

    const tbody = container.querySelector('.oc-table__body') as HTMLElement;
    expect(tbody.style.height).toBe('4000px'); // 100 * 40
  });

  it('renders footer when provided', () => {
    const renderRow = (index: number, style: React.CSSProperties) => (
      <Table.Row key={index} style={style}>
        <Table.Cell>Row {index}</Table.Cell>
      </Table.Row>
    );

    render(
      <Table.Virtualized
        height={400}
        rowCount={10}
        rowHeight={40}
        header={
          <Table.Head>
            <Table.Row>
              <Table.HeadCell>Name</Table.HeadCell>
            </Table.Row>
          </Table.Head>
        }
        footer={
          <Table.Footer>
            <Table.Row>
              <Table.Cell>Total: 10</Table.Cell>
            </Table.Row>
          </Table.Footer>
        }
        renderRow={renderRow}
      />
    );

    expect(screen.getByText('Total: 10')).toBeDefined();
  });
});
