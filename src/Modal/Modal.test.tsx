// @vitest-environment jsdom
import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { Modal, ModalBody } from './Modal';

afterEach(() => {
  cleanup();
});

function renderOpenModal(props: Partial<React.ComponentProps<typeof Modal>> = {}) {
  const onClose = vi.fn();

  render(
    <Modal open onClose={onClose} {...props}>
      <ModalBody>Modal content</ModalBody>
    </Modal>
  );

  return { onClose };
}

describe('Modal panel API', () => {
  it('applies className, panelClassName, and style to the dialog panel', () => {
    renderOpenModal({
      className: 'consumer-panel',
      panelClassName: 'batch-run-panel',
      style: { maxWidth: 520 },
    });

    const panel = screen.getByRole('dialog');

    expect(panel.classList.contains('oc-modal')).toBe(true);
    expect(panel.classList.contains('consumer-panel')).toBe(true);
    expect(panel.classList.contains('batch-run-panel')).toBe(true);
    expect((panel as HTMLElement).style.maxWidth).toBe('520px');
  });

  it('keeps overlayClassName scoped to the backdrop overlay', () => {
    renderOpenModal({
      panelClassName: 'consumer-panel',
      overlayClassName: 'consumer-overlay',
    });

    const panel = screen.getByRole('dialog');
    const overlay = panel.parentElement;

    expect(panel.classList.contains('consumer-overlay')).toBe(false);
    expect(overlay?.classList.contains('consumer-overlay')).toBe(true);
    expect(overlay?.classList.contains('consumer-panel')).toBe(false);
  });
});
