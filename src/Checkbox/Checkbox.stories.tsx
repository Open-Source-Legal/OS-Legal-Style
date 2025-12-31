import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox, CheckboxGroup } from './Checkbox';
import { checkboxStyles } from './Checkbox.styles';

const styleSheet = document.createElement('style');
styleSheet.textContent = checkboxStyles;
document.head.appendChild(styleSheet);

const meta: Meta<typeof Checkbox> = {
  title: 'Forms/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    disabled: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    error: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
  },
};

export const Checked: Story = {
  args: {
    label: 'Checked checkbox',
    defaultChecked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    label: 'Indeterminate state',
    indeterminate: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled checkbox',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled and checked',
    disabled: true,
    defaultChecked: true,
  },
};

export const WithError: Story = {
  args: {
    label: 'Required field',
    error: true,
  },
};

export const WithoutLabel: Story = {
  args: {},
};

export const ControlledExample: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Checkbox
          label={`Checkbox is ${checked ? 'checked' : 'unchecked'}`}
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        <button
          onClick={() => setChecked(!checked)}
          style={{
            padding: '8px 16px',
            background: '#F8F8F8',
            border: '1px solid #E5E5E5',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          Toggle
        </button>
      </div>
    );
  },
};

export const Group: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['contract']);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <CheckboxGroup value={value} onChange={setValue}>
          <Checkbox value="contract" label="Contract" />
          <Checkbox value="brief" label="Legal Brief" />
          <Checkbox value="memo" label="Memorandum" />
          <Checkbox value="agreement" label="Agreement" />
        </CheckboxGroup>
        <p style={{ fontSize: '14px', color: '#6B6B6B' }}>
          Selected: {value.join(', ') || 'None'}
        </p>
      </div>
    );
  },
};

export const HorizontalGroup: Story = {
  render: () => (
    <CheckboxGroup orientation="horizontal" defaultValue={['option1']}>
      <Checkbox value="option1" label="Option 1" />
      <Checkbox value="option2" label="Option 2" />
      <Checkbox value="option3" label="Option 3" />
    </CheckboxGroup>
  ),
};

export const IndeterminateParent: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(['read']);
    const allPermissions = ['read', 'write', 'delete'];
    const isAllSelected = selected.length === allPermissions.length;
    const isSomeSelected = selected.length > 0 && !isAllSelected;

    const handleParentChange = () => {
      if (isAllSelected) {
        setSelected([]);
      } else {
        setSelected(allPermissions);
      }
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Checkbox
          label="Select all permissions"
          checked={isAllSelected}
          indeterminate={isSomeSelected}
          onChange={handleParentChange}
        />
        <div style={{ marginLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <CheckboxGroup value={selected} onChange={setSelected}>
            <Checkbox value="read" label="Read" />
            <Checkbox value="write" label="Write" />
            <Checkbox value="delete" label="Delete" />
          </CheckboxGroup>
        </div>
      </div>
    );
  },
};
