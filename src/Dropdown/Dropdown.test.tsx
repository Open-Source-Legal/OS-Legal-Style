import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup, act } from '@testing-library/react';
import { Dropdown, DropdownOption } from './Dropdown';

// ─── Helpers ──────────────────────────────────────────────────────────────

afterEach(() => {
  cleanup();
});

const basicOptions: DropdownOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
];

const optionsWithIcons: DropdownOption[] = [
  { value: 'doc', label: 'Document', icon: <span data-testid="icon-doc">D</span> },
  { value: 'img', label: 'Image', icon: <span data-testid="icon-img">I</span> },
];

const optionsWithDescriptions: DropdownOption[] = [
  { value: 'a', label: 'Option A', description: 'First option' },
  { value: 'b', label: 'Option B', description: 'Second option' },
];

const optionsWithDisabled: DropdownOption[] = [
  { value: 'enabled1', label: 'Enabled 1' },
  { value: 'disabled1', label: 'Disabled 1', disabled: true },
  { value: 'enabled2', label: 'Enabled 2' },
];

function renderDropdown(props: Partial<React.ComponentProps<typeof Dropdown>> = {}) {
  const defaultProps = {
    mode: 'select' as const,
    options: basicOptions,
    'aria-label': 'Test dropdown',
  };
  return render(<Dropdown {...defaultProps} {...props} />);
}

// ─── Menu Mode ────────────────────────────────────────────────────────────

describe('Dropdown — Menu mode', () => {
  it('renders with the menu trigger', () => {
    render(
      <Dropdown mode="menu" aria-label="Actions menu">
        <Dropdown.Item onClick={() => {}}>Action 1</Dropdown.Item>
        <Dropdown.Item onClick={() => {}}>Action 2</Dropdown.Item>
      </Dropdown>
    );

    const trigger = screen.getByRole('button', { name: 'Actions menu' });
    expect(trigger).toBeDefined();
    expect(trigger.getAttribute('aria-haspopup')).toBe('menu');
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
  });

  it('opens menu on click and shows items with menu role', () => {
    render(
      <Dropdown mode="menu" aria-label="Create menu">
        <Dropdown.Item onClick={() => {}}>Create</Dropdown.Item>
        <Dropdown.Item onClick={() => {}}>Delete</Dropdown.Item>
      </Dropdown>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Create menu' }));
    expect(screen.getByRole('menu')).toBeDefined();
    expect(screen.getAllByRole('menuitem')).toHaveLength(2);
  });

  it('fires onClick and closes menu when an item is clicked', () => {
    const handleClick = vi.fn();
    render(
      <Dropdown mode="menu" aria-label="Item click test">
        <Dropdown.Item onClick={handleClick}>Create</Dropdown.Item>
      </Dropdown>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Item click test' }));
    fireEvent.click(screen.getByRole('menuitem', { name: 'Create' }));

    expect(handleClick).toHaveBeenCalledOnce();
    expect(screen.queryByRole('menu')).toBeNull();
  });

  it('renders Dropdown.Divider with separator role', () => {
    render(
      <Dropdown mode="menu" aria-label="Divider test">
        <Dropdown.Item onClick={() => {}}>A</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={() => {}}>B</Dropdown.Item>
      </Dropdown>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Divider test' }));
    expect(screen.getByRole('separator')).toBeDefined();
  });

  it('renders Dropdown.Header as non-interactive presentation', () => {
    render(
      <Dropdown mode="menu" aria-label="Header test">
        <Dropdown.Header>Group Label</Dropdown.Header>
        <Dropdown.Item onClick={() => {}}>A</Dropdown.Item>
      </Dropdown>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Header test' }));
    expect(screen.getByText('Group Label')).toBeDefined();
    expect(screen.getByText('Group Label').getAttribute('role')).toBe('presentation');
  });

  it('does not fire onClick on disabled items', () => {
    const handleClick = vi.fn();
    render(
      <Dropdown mode="menu" aria-label="Disabled item test">
        <Dropdown.Item disabled onClick={handleClick}>Disabled Action</Dropdown.Item>
      </Dropdown>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Disabled item test' }));
    fireEvent.click(screen.getByRole('menuitem', { name: 'Disabled Action' }));

    expect(handleClick).not.toHaveBeenCalled();
  });
});

// ─── Select Mode ──────────────────────────────────────────────────────────

describe('Dropdown — Select mode', () => {
  it('renders with combobox role and listbox popup', () => {
    renderDropdown();

    const trigger = screen.getByRole('combobox', { name: 'Test dropdown' });
    expect(trigger).toBeDefined();
    expect(trigger.getAttribute('aria-haspopup')).toBe('listbox');
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
  });

  it('shows placeholder when no value selected', () => {
    renderDropdown({ placeholder: 'Pick a fruit' });
    expect(screen.getByText('Pick a fruit')).toBeDefined();
  });

  it('opens on click and shows options with option role', () => {
    renderDropdown();

    fireEvent.click(screen.getByRole('combobox'));
    expect(screen.getByRole('listbox')).toBeDefined();
    expect(screen.getAllByRole('option')).toHaveLength(4);
  });

  it('selects an option and shows its label in the trigger', () => {
    const handleChange = vi.fn();
    renderDropdown({ onChange: handleChange });

    fireEvent.click(screen.getByRole('combobox'));
    fireEvent.click(screen.getByRole('option', { name: /Banana/ }));

    expect(handleChange).toHaveBeenCalledWith('banana', expect.objectContaining({ value: 'banana', label: 'Banana' }));
    // Menu should close
    expect(screen.queryByRole('listbox')).toBeNull();
  });

  it('works as controlled component', () => {
    const { rerender } = render(
      <Dropdown
        mode="select"
        options={basicOptions}
        value="cherry"
        onChange={() => {}}
        aria-label="Controlled test"
      />
    );

    expect(screen.getByText('Cherry')).toBeDefined();

    rerender(
      <Dropdown
        mode="select"
        options={basicOptions}
        value="apple"
        onChange={() => {}}
        aria-label="Controlled test"
      />
    );

    expect(screen.getByText('Apple')).toBeDefined();
  });

  it('works as uncontrolled component with defaultValue', () => {
    renderDropdown({ defaultValue: 'banana' });
    expect(screen.getByText('Banana')).toBeDefined();
  });

  it('shows clear button when clearable and value is set', () => {
    const handleChange = vi.fn();
    renderDropdown({ value: 'apple', clearable: true, onChange: handleChange });

    const clearButton = screen.getByLabelText('Clear selection');
    expect(clearButton).toBeDefined();

    fireEvent.click(clearButton);
    expect(handleChange).toHaveBeenCalledWith(null, null);
  });

  it('does not show clear button when no value is set', () => {
    renderDropdown({ clearable: true });
    expect(screen.queryByLabelText('Clear selection')).toBeNull();
  });

  it('shows selected option with aria-selected', () => {
    renderDropdown({ value: 'banana' });
    fireEvent.click(screen.getByRole('combobox'));

    const selected = screen.getByRole('option', { name: /Banana/ });
    expect(selected.getAttribute('aria-selected')).toBe('true');

    const notSelected = screen.getByRole('option', { name: /Apple/ });
    expect(notSelected.getAttribute('aria-selected')).toBe('false');
  });

  it('renders option icons', () => {
    renderDropdown({ options: optionsWithIcons });
    fireEvent.click(screen.getByRole('combobox'));

    expect(screen.getByTestId('icon-doc')).toBeDefined();
    expect(screen.getByTestId('icon-img')).toBeDefined();
  });

  it('renders option descriptions', () => {
    renderDropdown({ options: optionsWithDescriptions });
    fireEvent.click(screen.getByRole('combobox'));

    expect(screen.getByText('First option')).toBeDefined();
    expect(screen.getByText('Second option')).toBeDefined();
  });

  it('does not select disabled options', () => {
    const handleChange = vi.fn();
    renderDropdown({ options: optionsWithDisabled, onChange: handleChange });

    fireEvent.click(screen.getByRole('combobox'));
    fireEvent.click(screen.getByRole('option', { name: 'Disabled 1' }));

    expect(handleChange).not.toHaveBeenCalled();
  });

  it('marks disabled options with aria-disabled', () => {
    renderDropdown({ options: optionsWithDisabled });
    fireEvent.click(screen.getByRole('combobox'));

    const disabled = screen.getByRole('option', { name: 'Disabled 1' });
    expect(disabled.getAttribute('aria-disabled')).toBe('true');
  });

  it('renders the selected icon in the trigger', () => {
    renderDropdown({ options: optionsWithIcons, value: 'doc' });
    expect(screen.getByTestId('icon-doc')).toBeDefined();
  });
});

// ─── Multi Select Mode ───────────────────────────────────────────────────

describe('Dropdown — Multiselect mode', () => {
  it('renders with multiselectable listbox', () => {
    renderDropdown({ mode: 'multiselect' });

    fireEvent.click(screen.getByRole('combobox'));
    const listbox = screen.getByRole('listbox');
    expect(listbox.getAttribute('aria-multiselectable')).toBe('true');
  });

  it('allows selecting multiple values', () => {
    const handleChange = vi.fn();
    renderDropdown({ mode: 'multiselect', value: [], onChange: handleChange });

    fireEvent.click(screen.getByRole('combobox'));
    fireEvent.click(screen.getByRole('option', { name: /Apple/ }));

    expect(handleChange).toHaveBeenCalledWith(
      ['apple'],
      expect.arrayContaining([expect.objectContaining({ value: 'apple' })])
    );
  });

  it('stays open after selection in multiselect', () => {
    renderDropdown({ mode: 'multiselect', value: [] });

    fireEvent.click(screen.getByRole('combobox'));
    fireEvent.click(screen.getByRole('option', { name: /Apple/ }));

    // Menu should remain open
    expect(screen.getByRole('listbox')).toBeDefined();
  });

  it('renders selected values as tags', () => {
    renderDropdown({
      mode: 'multiselect',
      value: ['apple', 'cherry'],
    });

    expect(screen.getByText('Apple')).toBeDefined();
    expect(screen.getByText('Cherry')).toBeDefined();
  });

  it('removes a tag when its remove button is clicked', () => {
    const handleChange = vi.fn();
    renderDropdown({
      mode: 'multiselect',
      value: ['apple', 'cherry'],
      onChange: handleChange,
    });

    const removeButton = screen.getByLabelText('Remove Apple');
    fireEvent.click(removeButton);

    expect(handleChange).toHaveBeenCalledWith(
      ['cherry'],
      expect.arrayContaining([expect.objectContaining({ value: 'cherry' })])
    );
  });

  it('toggles option off when already selected', () => {
    const handleChange = vi.fn();
    renderDropdown({
      mode: 'multiselect',
      value: ['apple', 'cherry'],
      onChange: handleChange,
    });

    fireEvent.click(screen.getByRole('combobox'));
    fireEvent.click(screen.getByRole('option', { name: /Apple/ }));

    expect(handleChange).toHaveBeenCalledWith(
      ['cherry'],
      expect.arrayContaining([expect.objectContaining({ value: 'cherry' })])
    );
  });

  it('clears all selections when clear button clicked', () => {
    const handleChange = vi.fn();
    renderDropdown({
      mode: 'multiselect',
      value: ['apple', 'cherry'],
      clearable: true,
      onChange: handleChange,
    });

    fireEvent.click(screen.getByLabelText('Clear selection'));
    expect(handleChange).toHaveBeenCalledWith([], []);
  });
});

// ─── Open/Close Behavior ─────────────────────────────────────────────────

describe('Dropdown — Open/close', () => {
  it('toggles on click', () => {
    renderDropdown();
    const trigger = screen.getByRole('combobox');

    fireEvent.click(trigger);
    expect(screen.getByRole('listbox')).toBeDefined();

    fireEvent.click(trigger);
    expect(screen.queryByRole('listbox')).toBeNull();
  });

  it('closes on escape', () => {
    renderDropdown();
    const container = screen.getByRole('combobox').closest('.oc-dropdown')!;

    fireEvent.click(screen.getByRole('combobox'));
    expect(screen.getByRole('listbox')).toBeDefined();

    fireEvent.keyDown(container, { key: 'Escape' });
    expect(screen.queryByRole('listbox')).toBeNull();
  });

  it('closes on click outside', () => {
    renderDropdown();

    fireEvent.click(screen.getByRole('combobox'));
    expect(screen.getByRole('listbox')).toBeDefined();

    fireEvent.mouseDown(document.body);
    expect(screen.queryByRole('listbox')).toBeNull();
  });

  it('calls onOpen and onClose callbacks', () => {
    const onOpen = vi.fn();
    const onClose = vi.fn();
    renderDropdown({ onOpen, onClose });
    const container = screen.getByRole('combobox').closest('.oc-dropdown')!;

    fireEvent.click(screen.getByRole('combobox'));
    expect(onOpen).toHaveBeenCalledOnce();

    fireEvent.keyDown(container, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('does not open when disabled', () => {
    renderDropdown({ disabled: true });

    fireEvent.click(screen.getByRole('combobox'));
    expect(screen.queryByRole('listbox')).toBeNull();
  });

  it('opens on Enter key', () => {
    renderDropdown();
    const container = screen.getByRole('combobox').closest('.oc-dropdown')!;

    fireEvent.keyDown(container, { key: 'Enter' });
    expect(screen.getByRole('listbox')).toBeDefined();
  });

  it('opens on Space key', () => {
    renderDropdown();
    const container = screen.getByRole('combobox').closest('.oc-dropdown')!;

    fireEvent.keyDown(container, { key: ' ' });
    expect(screen.getByRole('listbox')).toBeDefined();
  });

  it('opens on ArrowDown key', () => {
    renderDropdown();
    const container = screen.getByRole('combobox').closest('.oc-dropdown')!;

    fireEvent.keyDown(container, { key: 'ArrowDown' });
    expect(screen.getByRole('listbox')).toBeDefined();
  });
});

// ─── Keyboard Navigation ─────────────────────────────────────────────────

describe('Dropdown — Keyboard navigation', () => {
  it('navigates options with ArrowDown/ArrowUp', () => {
    renderDropdown();
    const container = screen.getByRole('combobox').closest('.oc-dropdown')!;

    fireEvent.click(screen.getByRole('combobox'));

    // ArrowDown from first to second
    fireEvent.keyDown(container, { key: 'ArrowDown' });

    const options = screen.getAllByRole('option');
    // Check the focused class is applied
    expect(options[1].className).toContain('focused');

    // ArrowUp back to first
    fireEvent.keyDown(container, { key: 'ArrowUp' });
    expect(options[0].className).toContain('focused');
  });

  it('does not wrap at boundaries', () => {
    renderDropdown();
    const container = screen.getByRole('combobox').closest('.oc-dropdown')!;

    fireEvent.click(screen.getByRole('combobox'));

    // Navigate to last
    fireEvent.keyDown(container, { key: 'End' });
    const options = screen.getAllByRole('option');
    expect(options[3].className).toContain('focused');

    // ArrowDown at the end should stay at last
    fireEvent.keyDown(container, { key: 'ArrowDown' });
    expect(options[3].className).toContain('focused');
  });

  it('selects with Enter key', () => {
    const handleChange = vi.fn();
    renderDropdown({ onChange: handleChange });
    const container = screen.getByRole('combobox').closest('.oc-dropdown')!;

    fireEvent.click(screen.getByRole('combobox'));
    fireEvent.keyDown(container, { key: 'ArrowDown' }); // Move to Banana
    fireEvent.keyDown(container, { key: 'Enter' });

    expect(handleChange).toHaveBeenCalledWith('banana', expect.objectContaining({ value: 'banana' }));
  });

  it('jumps to first option with Home and last with End', () => {
    renderDropdown();
    const container = screen.getByRole('combobox').closest('.oc-dropdown')!;

    fireEvent.click(screen.getByRole('combobox'));
    fireEvent.keyDown(container, { key: 'End' });

    const options = screen.getAllByRole('option');
    expect(options[3].className).toContain('focused');

    fireEvent.keyDown(container, { key: 'Home' });
    expect(options[0].className).toContain('focused');
  });

  it('supports type-ahead in select mode', () => {
    renderDropdown();
    const container = screen.getByRole('combobox').closest('.oc-dropdown')!;

    fireEvent.click(screen.getByRole('combobox'));
    fireEvent.keyDown(container, { key: 'c' });

    const options = screen.getAllByRole('option');
    // Should jump to Cherry (index 2)
    expect(options[2].className).toContain('focused');
  });
});

// ─── Search ───────────────────────────────────────────────────────────────

describe('Dropdown — Local search', () => {
  it('filters options when typing', () => {
    renderDropdown({ searchable: 'local' });

    fireEvent.click(screen.getByRole('combobox'));
    const searchInput = screen.getByRole('searchbox');
    fireEvent.change(searchInput, { target: { value: 'ban' } });

    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(1);
    expect(options[0].textContent).toContain('Banana');
  });

  it('shows empty state when no matches', () => {
    renderDropdown({ searchable: 'local' });

    fireEvent.click(screen.getByRole('combobox'));
    const searchInput = screen.getByRole('searchbox');
    fireEvent.change(searchInput, { target: { value: 'xyz' } });

    expect(screen.getByText('No results found')).toBeDefined();
  });

  it('clears search when menu closes', () => {
    renderDropdown({ searchable: 'local' });
    const container = screen.getByRole('combobox').closest('.oc-dropdown')!;

    fireEvent.click(screen.getByRole('combobox'));
    const searchInput = screen.getByRole('searchbox');
    fireEvent.change(searchInput, { target: { value: 'app' } });

    // Close
    fireEvent.keyDown(container, { key: 'Escape' });

    // Reopen
    fireEvent.click(screen.getByRole('combobox'));

    // All options should be visible again
    expect(screen.getAllByRole('option')).toHaveLength(4);
  });

  it('renders custom empty state via renderEmpty', () => {
    renderDropdown({
      searchable: 'local',
      renderEmpty: () => <div>Custom empty</div>,
    });

    fireEvent.click(screen.getByRole('combobox'));
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'zzz' } });

    expect(screen.getByText('Custom empty')).toBeDefined();
  });
});

describe('Dropdown — Async search', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('debounces onSearchChange calls', () => {
    const handleSearch = vi.fn();
    renderDropdown({
      searchable: 'async',
      onSearchChange: handleSearch,
      searchDebounceMs: 300,
    });

    fireEvent.click(screen.getByRole('combobox'));
    const searchInput = screen.getByRole('searchbox');

    fireEvent.change(searchInput, { target: { value: 'a' } });
    fireEvent.change(searchInput, { target: { value: 'ap' } });
    fireEvent.change(searchInput, { target: { value: 'app' } });

    // Should not have been called yet
    expect(handleSearch).not.toHaveBeenCalled();

    // Fast forward past debounce
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(handleSearch).toHaveBeenCalledOnce();
    expect(handleSearch).toHaveBeenCalledWith('app');
  });

  it('shows loading spinner when loading is true', () => {
    const { container } = renderDropdown({ loading: true });
    expect(container.querySelector('.oc-dropdown__spinner')).not.toBeNull();
  });

  it('shows loading state in menu when loading with no options', () => {
    renderDropdown({ searchable: 'async', loading: true, options: [] });

    fireEvent.click(screen.getByRole('combobox'));
    expect(screen.getByText('Loading...')).toBeDefined();
  });
});

// ─── Custom rendering ────────────────────────────────────────────────────

describe('Dropdown — Custom rendering', () => {
  it('renders custom options via renderOption', () => {
    renderDropdown({
      renderOption: (option) => (
        <div data-testid={`custom-${option.value}`}>Custom: {option.label}</div>
      ),
    });

    fireEvent.click(screen.getByRole('combobox'));
    expect(screen.getByTestId('custom-apple')).toBeDefined();
    expect(screen.getByText('Custom: Apple')).toBeDefined();
  });

  it('renders custom trigger via render function', () => {
    renderDropdown({
      value: 'apple',
      trigger: ({ isOpen, selectedOption }) => {
        const opt = selectedOption as { label: string } | null;
        return (
          <div data-testid="custom-trigger">
            {opt?.label ?? 'None'} {isOpen ? 'open' : 'closed'}
          </div>
        );
      },
    });

    expect(screen.getByTestId('custom-trigger')).toBeDefined();
    expect(screen.getByText('Apple closed')).toBeDefined();
  });

  it('renders custom tags via renderTag in multiselect', () => {
    renderDropdown({
      mode: 'multiselect',
      value: ['apple'],
      renderTag: (option, onRemove) => (
        <span data-testid={`custom-tag-${option.value}`}>
          [{option.label}]
          <button onClick={onRemove} data-testid={`remove-${option.value}`}>x</button>
        </span>
      ),
    });

    expect(screen.getByTestId('custom-tag-apple')).toBeDefined();
    expect(screen.getByText('[Apple]')).toBeDefined();
  });
});

// ─── Disabled state ──────────────────────────────────────────────────────

describe('Dropdown — Disabled', () => {
  it('applies disabled styling and aria-disabled', () => {
    renderDropdown({ disabled: true });

    const trigger = screen.getByRole('combobox');
    expect(trigger.getAttribute('aria-disabled')).toBe('true');
    expect(trigger.className).toContain('disabled');
  });

  it('does not respond to keyboard when disabled', () => {
    renderDropdown({ disabled: true });
    const container = screen.getByRole('combobox').closest('.oc-dropdown')!;

    fireEvent.keyDown(container, { key: 'Enter' });
    expect(screen.queryByRole('listbox')).toBeNull();
  });
});

// ─── Fluid and alignment ─────────────────────────────────────────────────

describe('Dropdown — Layout', () => {
  it('applies fluid class when fluid prop is set', () => {
    const { container } = renderDropdown({ fluid: true });
    expect(container.firstElementChild?.className).toContain('fluid');
  });

  it('applies upward class to menu when upward prop is set', () => {
    renderDropdown({ upward: true });

    fireEvent.click(screen.getByRole('combobox'));
    const menu = screen.getByRole('listbox');
    expect(menu.className).toContain('upward');
  });

  it('applies right alignment class when align="right"', () => {
    renderDropdown({ align: 'right' });

    fireEvent.click(screen.getByRole('combobox'));
    const menu = screen.getByRole('listbox');
    expect(menu.className).toContain('align-right');
  });
});

// ─── ARIA attributes ─────────────────────────────────────────────────────

describe('Dropdown — ARIA', () => {
  it('sets aria-expanded correctly', () => {
    renderDropdown();
    const trigger = screen.getByRole('combobox');
    const container = trigger.closest('.oc-dropdown')!;

    expect(trigger.getAttribute('aria-expanded')).toBe('false');

    fireEvent.click(trigger);
    expect(trigger.getAttribute('aria-expanded')).toBe('true');

    fireEvent.keyDown(container, { key: 'Escape' });
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
  });

  it('sets aria-activedescendant on focused option in select mode', () => {
    renderDropdown();
    const trigger = screen.getByRole('combobox');
    const container = trigger.closest('.oc-dropdown')!;

    fireEvent.click(trigger);
    fireEvent.keyDown(container, { key: 'ArrowDown' });

    const activedescendant = trigger.getAttribute('aria-activedescendant');
    expect(activedescendant).toBeTruthy();

    // Verify the referenced option exists
    const focusedOption = document.getElementById(activedescendant!);
    expect(focusedOption).toBeDefined();
    expect(focusedOption?.getAttribute('role')).toBe('option');
  });

  it('sets aria-label on trigger', () => {
    renderDropdown({ 'aria-label': 'My dropdown' });
    expect(screen.getByRole('combobox').getAttribute('aria-label')).toBe('My dropdown');
  });

  it('sets aria-labelledby on trigger', () => {
    renderDropdown({ 'aria-labelledby': 'my-label' });
    expect(screen.getByRole('combobox').getAttribute('aria-labelledby')).toBe('my-label');
  });
});

// ─── Ref forwarding ──────────────────────────────────────────────────────

describe('Dropdown — Ref forwarding', () => {
  it('forwards ref to the root element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Dropdown
        ref={ref}
        mode="select"
        options={basicOptions}
        aria-label="Ref test"
      />
    );

    expect(ref.current).toBeDefined();
    expect(ref.current?.className).toContain('oc-dropdown');
  });
});

// ─── onBlur ──────────────────────────────────────────────────────────────

describe('Dropdown — onBlur', () => {
  it('fires onBlur when focus leaves the dropdown', () => {
    const handleBlur = vi.fn();
    const { container } = render(
      <div>
        <Dropdown
          mode="select"
          options={basicOptions}
          aria-label="Blur test"
          onBlur={handleBlur}
        />
        <button data-testid="outside">Outside</button>
      </div>
    );

    const trigger = screen.getByRole('combobox');
    trigger.focus();

    // Move focus to outside button
    fireEvent.blur(trigger, {
      relatedTarget: screen.getByTestId('outside'),
    });

    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it('does not fire onBlur for internal focus transfers (trigger → menu)', () => {
    const handleBlur = vi.fn();
    const { container } = render(
      <Dropdown
        mode="select"
        options={basicOptions}
        aria-label="Internal blur test"
        onBlur={handleBlur}
        searchable="local"
      />
    );

    const trigger = screen.getByRole('combobox');
    trigger.focus();
    fireEvent.click(trigger);

    // Search input should now be focused — this is an internal transfer
    const searchInput = screen.getByRole('searchbox');
    fireEvent.blur(trigger, { relatedTarget: searchInput });

    expect(handleBlur).not.toHaveBeenCalled();
  });

  it('fires onBlur when tabbing away without opening menu', () => {
    const handleBlur = vi.fn();
    render(
      <div>
        <Dropdown
          mode="select"
          options={basicOptions}
          aria-label="Tab blur test"
          onBlur={handleBlur}
        />
        <button data-testid="next">Next</button>
      </div>
    );

    const trigger = screen.getByRole('combobox');
    trigger.focus();

    // Tab away — fires blur with relatedTarget outside the dropdown
    fireEvent.blur(trigger, {
      relatedTarget: screen.getByTestId('next'),
    });

    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it('fires onBlur in menu mode when focus leaves', () => {
    const handleBlur = vi.fn();
    render(
      <div>
        <Dropdown mode="menu" aria-label="Menu blur test" onBlur={handleBlur}>
          <Dropdown.Item onClick={() => {}}>Action</Dropdown.Item>
        </Dropdown>
        <button data-testid="other">Other</button>
      </div>
    );

    const trigger = screen.getByRole('button', { name: 'Menu blur test' });
    trigger.focus();

    fireEvent.blur(trigger, {
      relatedTarget: screen.getByTestId('other'),
    });

    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it('does not fire when onBlur prop is not provided', () => {
    // Just ensure no errors when onBlur is omitted
    render(
      <div>
        <Dropdown
          mode="select"
          options={basicOptions}
          aria-label="No blur handler"
        />
        <button data-testid="out">Out</button>
      </div>
    );

    const trigger = screen.getByRole('combobox');
    trigger.focus();
    fireEvent.blur(trigger, { relatedTarget: screen.getByTestId('out') });
    // No error thrown
  });
});

// ─── Description features ─────────────────────────────────────────────

describe('Dropdown — Description wrapping', () => {
  const descOptions: DropdownOption[] = [
    { value: 'a', label: 'Model A', description: 'Standard text embedding model (384 dimensions)' },
    { value: 'b', label: 'Model B', description: 'Large model' },
  ];

  it('applies wrap-descriptions class when wrapDescriptions is true', () => {
    const { container } = renderDropdown({ options: descOptions, wrapDescriptions: true });
    expect(container.firstElementChild?.className).toContain('wrap-descriptions');
  });

  it('does not apply wrap-descriptions class by default', () => {
    const { container } = renderDropdown({ options: descOptions });
    expect(container.firstElementChild?.className).not.toContain('wrap-descriptions');
  });

  it('renders descriptions in menu options', () => {
    renderDropdown({ options: descOptions, wrapDescriptions: true });
    fireEvent.click(screen.getByRole('combobox'));

    expect(screen.getByText('Standard text embedding model (384 dimensions)')).toBeDefined();
    expect(screen.getByText('Large model')).toBeDefined();
  });
});

describe('Dropdown — Show description in trigger', () => {
  const descOptions: DropdownOption[] = [
    { value: 'a', label: 'Model A', description: 'Standard embedding model' },
    { value: 'b', label: 'Model B' },
  ];

  it('shows description in trigger when showDescriptionInTrigger is true and option has description', () => {
    renderDropdown({
      options: descOptions,
      value: 'a',
      showDescriptionInTrigger: true,
    });

    expect(screen.getByText('Model A')).toBeDefined();
    expect(screen.getByText('Standard embedding model')).toBeDefined();
  });

  it('does not show description in trigger by default', () => {
    renderDropdown({
      options: descOptions,
      value: 'a',
    });

    expect(screen.getByText('Model A')).toBeDefined();
    expect(screen.queryByText('Standard embedding model')).toBeNull();
  });

  it('does not show description in trigger when selected option has no description', () => {
    renderDropdown({
      options: descOptions,
      value: 'b',
      showDescriptionInTrigger: true,
    });

    expect(screen.getByText('Model B')).toBeDefined();
    // No description element should be rendered
    const trigger = screen.getByRole('combobox');
    expect(trigger.querySelector('.oc-dropdown__trigger-description')).toBeNull();
  });

  it('renders trigger-value-group class when showing description', () => {
    renderDropdown({
      options: descOptions,
      value: 'a',
      showDescriptionInTrigger: true,
    });

    const trigger = screen.getByRole('combobox');
    expect(trigger.querySelector('.oc-dropdown__trigger-value-group')).not.toBeNull();
  });
});

// ─── displayName ─────────────────────────────────────────────────────────

describe('Dropdown — displayName', () => {
  it('has correct displayName', () => {
    expect((Dropdown as any).displayName).toBe('Dropdown');
  });

  it('compound components have correct displayName', () => {
    expect(Dropdown.Item.displayName).toBe('Dropdown.Item');
    expect(Dropdown.Divider.displayName).toBe('Dropdown.Divider');
    expect(Dropdown.Header.displayName).toBe('Dropdown.Header');
  });
});

// ─── iconSize ─────────────────────────────────────────────────────────────

describe('Dropdown — iconSize', () => {
  it('applies component-level iconSize to image icons', () => {
    const opts: DropdownOption[] = [
      { value: 'a', label: 'A', icon: 'https://example.com/logo.png' },
    ];
    const { container } = render(
      <Dropdown mode="select" options={opts} iconSize={24} />
    );
    fireEvent.click(screen.getByRole('combobox'));

    const img = container.querySelector('.oc-dropdown__option-icon-img') as HTMLImageElement;
    expect(img).toBeDefined();
    expect(img.style.getPropertyValue('--oc-dropdown-icon-size')).toBe('24px');
  });

  it('applies per-option iconSize overriding component-level', () => {
    const opts: DropdownOption[] = [
      { value: 'a', label: 'A', icon: 'https://example.com/a.png', iconSize: 32 },
      { value: 'b', label: 'B', icon: 'https://example.com/b.png' },
    ];
    const { container } = render(
      <Dropdown mode="select" options={opts} iconSize={20} />
    );
    fireEvent.click(screen.getByRole('combobox'));

    const imgs = container.querySelectorAll('.oc-dropdown__option-icon-img') as NodeListOf<HTMLImageElement>;
    expect(imgs[0].style.getPropertyValue('--oc-dropdown-icon-size')).toBe('32px');
    expect(imgs[1].style.getPropertyValue('--oc-dropdown-icon-size')).toBe('20px');
  });

  it('does not set custom property when no iconSize is specified', () => {
    const opts: DropdownOption[] = [
      { value: 'a', label: 'A', icon: 'https://example.com/logo.png' },
    ];
    const { container } = render(
      <Dropdown mode="select" options={opts} />
    );
    fireEvent.click(screen.getByRole('combobox'));

    const img = container.querySelector('.oc-dropdown__option-icon-img') as HTMLImageElement;
    expect(img.style.getPropertyValue('--oc-dropdown-icon-size')).toBe('');
  });

  it('applies iconSize to trigger icon for selected option', () => {
    const opts: DropdownOption[] = [
      { value: 'a', label: 'A', icon: 'https://example.com/logo.png', iconSize: 24 },
    ];
    const { container } = render(
      <Dropdown mode="select" options={opts} value="a" />
    );

    const triggerImg = container.querySelector('.oc-dropdown__trigger-icon .oc-dropdown__option-icon-img') as HTMLImageElement;
    expect(triggerImg).toBeDefined();
    expect(triggerImg.style.getPropertyValue('--oc-dropdown-icon-size')).toBe('24px');
  });
});
