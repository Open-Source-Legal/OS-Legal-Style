import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Radio, RadioGroup } from './Radio';
import { radioStyles } from './Radio.styles';

const styleSheet = document.createElement('style');
styleSheet.textContent = radioStyles;
document.head.appendChild(styleSheet);

const meta: Meta<typeof Radio> = {
  title: 'Forms/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  args: {
    label: 'Radio option',
    name: 'default-radio',
  },
};

export const Checked: Story = {
  args: {
    label: 'Checked radio',
    name: 'checked-radio',
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled radio',
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

export const Group: Story = {
  render: () => {
    const [value, setValue] = useState('draft');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <RadioGroup value={value} onChange={setValue}>
          <Radio value="draft" label="Draft" />
          <Radio value="review" label="In Review" />
          <Radio value="final" label="Final" />
          <Radio value="archived" label="Archived" disabled />
        </RadioGroup>
        <p style={{ fontSize: '14px', color: '#6B6B6B' }}>
          Selected: {value}
        </p>
      </div>
    );
  },
};

export const HorizontalGroup: Story = {
  render: () => (
    <RadioGroup orientation="horizontal" defaultValue="medium">
      <Radio value="small" label="Small" />
      <Radio value="medium" label="Medium" />
      <Radio value="large" label="Large" />
    </RadioGroup>
  ),
};

export const DocumentTypeExample: Story = {
  render: () => {
    const [docType, setDocType] = useState('contract');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize: '14px', fontWeight: 500 }}>Document Type</label>
        <RadioGroup value={docType} onChange={setDocType}>
          <Radio value="contract" label="Contract" />
          <Radio value="brief" label="Legal Brief" />
          <Radio value="memo" label="Memorandum" />
          <Radio value="agreement" label="Agreement" />
        </RadioGroup>
      </div>
    );
  },
};

export const WithDescriptions: Story = {
  render: () => {
    const [plan, setPlan] = useState('professional');
    return (
      <RadioGroup value={plan} onChange={setPlan}>
        <Radio
          value="starter"
          label={
            <span>
              <strong>Starter</strong>
              <br />
              <span style={{ fontSize: '12px', color: '#6B6B6B' }}>
                For individuals and small teams
              </span>
            </span>
          }
        />
        <Radio
          value="professional"
          label={
            <span>
              <strong>Professional</strong>
              <br />
              <span style={{ fontSize: '12px', color: '#6B6B6B' }}>
                For growing businesses
              </span>
            </span>
          }
        />
        <Radio
          value="enterprise"
          label={
            <span>
              <strong>Enterprise</strong>
              <br />
              <span style={{ fontSize: '12px', color: '#6B6B6B' }}>
                For large organizations
              </span>
            </span>
          }
        />
      </RadioGroup>
    );
  },
};
