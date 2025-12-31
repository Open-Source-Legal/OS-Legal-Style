import React, { forwardRef, ReactNode, HTMLAttributes, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ModalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  open: boolean;
  onClose: () => void;
  size?: ModalSize;
  closeOnOverlay?: boolean;
  closeOnEscape?: boolean;
  children?: ReactNode;
}

export interface ModalHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: ReactNode;
  subtitle?: ReactNode;
  onClose?: () => void;
  showCloseButton?: boolean;
  children?: ReactNode;
}

export interface ModalFooterProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      open,
      onClose,
      size = 'md',
      closeOnOverlay = true,
      closeOnEscape = true,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const handleEscape = useCallback(
      (e: KeyboardEvent) => {
        if (e.key === 'Escape' && closeOnEscape) {
          onClose();
        }
      },
      [closeOnEscape, onClose]
    );

    useEffect(() => {
      if (open) {
        document.addEventListener('keydown', handleEscape);
        document.body.style.overflow = 'hidden';
      }
      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = '';
      };
    }, [open, handleEscape]);

    if (!open) return null;

    const handleOverlayClick = (e: React.MouseEvent) => {
      if (e.target === e.currentTarget && closeOnOverlay) {
        onClose();
      }
    };

    const modalClasses = [
      'oc-modal',
      `oc-modal--${size}`,
      className,
    ].filter(Boolean).join(' ');

    const content = (
      <div className="oc-modal-overlay" onClick={handleOverlayClick}>
        <div ref={ref} className={modalClasses} role="dialog" aria-modal="true" {...props}>
          {children}
        </div>
      </div>
    );

    return createPortal(content, document.body);
  }
);

Modal.displayName = 'Modal';

export const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ title, subtitle, onClose, showCloseButton = true, className = '', children, ...props }, ref) => {
    const classes = ['oc-modal-header', className].filter(Boolean).join(' ');

    if (children) {
      return (
        <div ref={ref} className={classes} {...props}>
          {children}
          {showCloseButton && onClose && (
            <button className="oc-modal-close" onClick={onClose} aria-label="Close">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
      );
    }

    return (
      <div ref={ref} className={classes} {...props}>
        <div className="oc-modal-header__content">
          {title && <div className="oc-modal-header__title">{title}</div>}
          {subtitle && <div className="oc-modal-header__subtitle">{subtitle}</div>}
        </div>
        {showCloseButton && onClose && (
          <button className="oc-modal-close" onClick={onClose} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
    );
  }
);

ModalHeader.displayName = 'ModalHeader';

export const ModalBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = '', children, ...props }, ref) => {
    const classes = ['oc-modal-body', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

ModalBody.displayName = 'ModalBody';

export const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ className = '', children, ...props }, ref) => {
    const classes = ['oc-modal-footer', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

ModalFooter.displayName = 'ModalFooter';
