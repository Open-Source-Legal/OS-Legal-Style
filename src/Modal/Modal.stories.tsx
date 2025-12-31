import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from './Modal';
import { modalStyles } from './Modal.styles';

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = modalStyles;
document.head.appendChild(styleSheet);

const meta: Meta<typeof Modal> = {
  title: 'Overlay/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
    },
    closeOnOverlay: {
      control: 'boolean',
    },
    closeOnEscape: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

const ModalDemo = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' | 'xl' | 'full' }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{
          padding: '10px 20px',
          background: '#E85A4F',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 500,
        }}
      >
        Open Modal
      </button>

      <Modal open={open} onClose={() => setOpen(false)} size={size}>
        <ModalHeader
          title="Modal Title"
          subtitle="Optional subtitle text"
          onClose={() => setOpen(false)}
        />
        <ModalBody>
          <p style={{ margin: 0 }}>
            This is the modal body content. You can add any content here including forms,
            text, images, or other components.
          </p>
        </ModalBody>
        <ModalFooter>
          <button
            onClick={() => setOpen(false)}
            style={{
              padding: '8px 16px',
              background: 'transparent',
              color: '#1A1A1A',
              border: '1px solid #E5E5E5',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => setOpen(false)}
            style={{
              padding: '8px 16px',
              background: '#E85A4F',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 500,
            }}
          >
            Confirm
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export const Default: Story = {
  render: () => <ModalDemo />,
};

export const Small: Story = {
  render: () => <ModalDemo size="sm" />,
};

export const Large: Story = {
  render: () => <ModalDemo size="lg" />,
};

export const Confirmation: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <button
          onClick={() => setOpen(true)}
          style={{
            padding: '10px 20px',
            background: '#EF4444',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 500,
          }}
        >
          Delete Item
        </button>

        <Modal open={open} onClose={() => setOpen(false)} size="sm">
          <ModalHeader
            title="Delete Item?"
            onClose={() => setOpen(false)}
          />
          <ModalBody>
            <p style={{ margin: 0 }}>
              This action cannot be undone. Are you sure you want to delete this item?
            </p>
          </ModalBody>
          <ModalFooter>
            <button
              onClick={() => setOpen(false)}
              style={{
                padding: '8px 16px',
                background: 'transparent',
                color: '#1A1A1A',
                border: '1px solid #E5E5E5',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              onClick={() => setOpen(false)}
              style={{
                padding: '8px 16px',
                background: '#EF4444',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 500,
              }}
            >
              Delete
            </button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};
