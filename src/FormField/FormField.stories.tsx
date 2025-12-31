import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FormField } from './FormField';
import { formFieldStyles } from './FormField.styles';

const styleSheet = document.createElement('style');
styleSheet.textContent = formFieldStyles;
document.head.appendChild(styleSheet);

// Add basic input styles for demo
const inputStyle = `
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #E5E5E5;
  border-radius: 8px;
  outline: none;
`;

const meta: Meta<typeof FormField> = {
  title: 'Forms/FormField',
  component: FormField,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    required: { control: 'boolean' },
    optional: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '320px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const Default: Story = {
  args: {
    label: 'Email',
    children: <input type="email" placeholder="you@example.com" style={{ width: '100%', padding: '8px', fontSize: '14px', border: '1px solid #E5E5E5', borderRadius: '8px' }} />,
  },
};

export const Required: Story = {
  args: {
    label: 'Full Name',
    required: true,
    children: <input type="text" placeholder="John Doe" style={{ width: '100%', padding: '8px', fontSize: '14px', border: '1px solid #E5E5E5', borderRadius: '8px' }} />,
  },
};

export const Optional: Story = {
  args: {
    label: 'Phone Number',
    optional: true,
    children: <input type="tel" placeholder="+1 (555) 000-0000" style={{ width: '100%', padding: '8px', fontSize: '14px', border: '1px solid #E5E5E5', borderRadius: '8px' }} />,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Password',
    helperText: 'Must be at least 8 characters long',
    children: <input type="password" placeholder="Enter password" style={{ width: '100%', padding: '8px', fontSize: '14px', border: '1px solid #E5E5E5', borderRadius: '8px' }} />,
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    error: 'Please enter a valid email address',
    children: <input type="email" defaultValue="invalid" style={{ width: '100%', padding: '8px', fontSize: '14px', border: '1px solid #EF4444', borderRadius: '8px' }} />,
  },
};

export const FormExample: Story = {
  render: () => (
    <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <FormField label="Full Name" required>
        <input type="text" placeholder="John Doe" style={{ width: '100%', padding: '8px', fontSize: '14px', border: '1px solid #E5E5E5', borderRadius: '8px' }} />
      </FormField>
      <FormField label="Email Address" required helperText="We'll never share your email">
        <input type="email" placeholder="john@example.com" style={{ width: '100%', padding: '8px', fontSize: '14px', border: '1px solid #E5E5E5', borderRadius: '8px' }} />
      </FormField>
      <FormField label="Company" optional>
        <input type="text" placeholder="Company name" style={{ width: '100%', padding: '8px', fontSize: '14px', border: '1px solid #E5E5E5', borderRadius: '8px' }} />
      </FormField>
      <FormField label="Bio" optional helperText="Tell us about yourself">
        <textarea rows={3} placeholder="A few words about you..." style={{ width: '100%', padding: '8px', fontSize: '14px', border: '1px solid #E5E5E5', borderRadius: '8px', resize: 'vertical' }} />
      </FormField>
    </form>
  ),
};
