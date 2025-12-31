import React, { forwardRef, ReactNode, HTMLAttributes, useState, useRef, useCallback, useEffect } from 'react';

export type SplitDirection = 'horizontal' | 'vertical';

export interface SplitPaneProps extends HTMLAttributes<HTMLDivElement> {
  /** Split direction */
  direction?: SplitDirection;
  /** Initial size of the first pane (px or %) */
  defaultSize?: number | string;
  /** Minimum size of the first pane in px */
  minSize?: number;
  /** Maximum size of the first pane in px */
  maxSize?: number;
  /** Whether the split is resizable */
  resizable?: boolean;
  /** Callback when size changes */
  onResize?: (size: number) => void;
  /** First pane content */
  children: [ReactNode, ReactNode];
}

export interface PaneProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export const SplitPane = forwardRef<HTMLDivElement, SplitPaneProps>(
  (
    {
      direction = 'horizontal',
      defaultSize = '50%',
      minSize = 100,
      maxSize,
      resizable = true,
      onResize,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState<number | string>(defaultSize);
    const [isDragging, setIsDragging] = useState(false);

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
      if (!resizable) return;
      e.preventDefault();
      setIsDragging(true);
    }, [resizable]);

    const handleMouseMove = useCallback(
      (e: MouseEvent) => {
        if (!isDragging || !containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        let newSize: number;

        if (direction === 'horizontal') {
          newSize = e.clientX - rect.left;
        } else {
          newSize = e.clientY - rect.top;
        }

        // Apply constraints
        if (minSize) newSize = Math.max(minSize, newSize);
        if (maxSize) newSize = Math.min(maxSize, newSize);

        const containerSize = direction === 'horizontal' ? rect.width : rect.height;
        newSize = Math.min(newSize, containerSize - minSize);

        setSize(newSize);
        onResize?.(newSize);
      },
      [isDragging, direction, minSize, maxSize, onResize]
    );

    const handleMouseUp = useCallback(() => {
      setIsDragging(false);
    }, []);

    useEffect(() => {
      if (isDragging) {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = direction === 'horizontal' ? 'col-resize' : 'row-resize';
        document.body.style.userSelect = 'none';
      }

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      };
    }, [isDragging, handleMouseMove, handleMouseUp, direction]);

    const classes = [
      'oc-split-pane',
      `oc-split-pane--${direction}`,
      isDragging && 'oc-split-pane--dragging',
      className,
    ].filter(Boolean).join(' ');

    const sizeValue = typeof size === 'number' ? `${size}px` : size;

    return (
      <div
        ref={(node) => {
          (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={classes}
        {...props}
      >
        <div
          className="oc-split-pane__pane oc-split-pane__pane--first"
          style={{
            [direction === 'horizontal' ? 'width' : 'height']: sizeValue,
          }}
        >
          {children[0]}
        </div>
        {resizable && (
          <div
            className="oc-split-pane__handle"
            onMouseDown={handleMouseDown}
            role="separator"
            aria-orientation={direction === 'horizontal' ? 'vertical' : 'horizontal'}
          >
            <div className="oc-split-pane__handle-bar" />
          </div>
        )}
        <div className="oc-split-pane__pane oc-split-pane__pane--second">
          {children[1]}
        </div>
      </div>
    );
  }
);

SplitPane.displayName = 'SplitPane';

export const Pane = forwardRef<HTMLDivElement, PaneProps>(
  ({ className = '', children, ...props }, ref) => {
    const classes = ['oc-pane', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

Pane.displayName = 'Pane';
