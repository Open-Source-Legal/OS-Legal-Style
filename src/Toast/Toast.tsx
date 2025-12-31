import React, { forwardRef, createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';
export type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';

export interface ToastProps {
  id: string;
  variant?: ToastVariant;
  title?: string;
  description?: string;
  duration?: number;
  action?: ReactNode;
  onClose?: () => void;
}

export interface ToastProviderProps {
  position?: ToastPosition;
  children?: ReactNode;
}

interface ToastContextValue {
  addToast: (toast: Omit<ToastProps, 'id'>) => string;
  removeToast: (id: string) => void;
  toasts: ToastProps[];
}

const ToastContext = createContext<ToastContextValue | null>(null);

let toastCount = 0;

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  const toast = useCallback((options: Omit<ToastProps, 'id'>) => {
    return context.addToast(options);
  }, [context]);

  const success = useCallback((title: string, options?: Omit<ToastProps, 'id' | 'title' | 'variant'>) => {
    return context.addToast({ ...options, title, variant: 'success' });
  }, [context]);

  const error = useCallback((title: string, options?: Omit<ToastProps, 'id' | 'title' | 'variant'>) => {
    return context.addToast({ ...options, title, variant: 'error' });
  }, [context]);

  const warning = useCallback((title: string, options?: Omit<ToastProps, 'id' | 'title' | 'variant'>) => {
    return context.addToast({ ...options, title, variant: 'warning' });
  }, [context]);

  const info = useCallback((title: string, options?: Omit<ToastProps, 'id' | 'title' | 'variant'>) => {
    return context.addToast({ ...options, title, variant: 'info' });
  }, [context]);

  const dismiss = useCallback((id: string) => {
    context.removeToast(id);
  }, [context]);

  return { toast, success, error, warning, info, dismiss };
};

const ToastIcon = ({ variant }: { variant: ToastVariant }) => {
  switch (variant) {
    case 'success':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case 'error':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M15 9l-6 6M9 9l6 6" />
        </svg>
      );
    case 'warning':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          <path d="M12 9v4M12 17h.01" />
        </svg>
      );
    case 'info':
    default:
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4M12 8h.01" />
        </svg>
      );
  }
};

export const Toast = forwardRef<HTMLDivElement, ToastProps>(
  ({ id, variant = 'info', title, description, action, onClose }, ref) => {
    const classes = [
      'oc-toast',
      `oc-toast--${variant}`,
    ].join(' ');

    return (
      <div ref={ref} className={classes} role="alert">
        <div className="oc-toast__icon">
          <ToastIcon variant={variant} />
        </div>
        <div className="oc-toast__content">
          {title && <div className="oc-toast__title">{title}</div>}
          {description && <div className="oc-toast__description">{description}</div>}
        </div>
        {action && <div className="oc-toast__action">{action}</div>}
        <button className="oc-toast__close" onClick={onClose} aria-label="Dismiss">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    );
  }
);

Toast.displayName = 'Toast';

export const ToastProvider = ({ position = 'bottom-right', children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const addToast = useCallback((toast: Omit<ToastProps, 'id'>) => {
    const id = `toast-${++toastCount}`;
    setToasts(prev => [...prev, { ...toast, id }]);
    return id;
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast, toasts }}>
      {children}
      {typeof document !== 'undefined' && createPortal(
        <ToastContainer position={position} toasts={toasts} onRemove={removeToast} />,
        document.body
      )}
    </ToastContext.Provider>
  );
};

interface ToastContainerProps {
  position: ToastPosition;
  toasts: ToastProps[];
  onRemove: (id: string) => void;
}

const ToastContainer = ({ position, toasts, onRemove }: ToastContainerProps) => {
  const classes = [
    'oc-toast-container',
    `oc-toast-container--${position}`,
  ].join(' ');

  return (
    <div className={classes}>
      {toasts.map(toast => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
};

const ToastItem = ({ toast, onRemove }: { toast: ToastProps; onRemove: (id: string) => void }) => {
  const { id, duration = 5000 } = toast;

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => onRemove(id), duration);
      return () => clearTimeout(timer);
    }
  }, [id, duration, onRemove]);

  return <Toast {...toast} onClose={() => onRemove(id)} />;
};
