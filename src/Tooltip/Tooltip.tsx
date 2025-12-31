import React, { forwardRef, ReactNode, HTMLAttributes, useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  content: ReactNode;
  placement?: TooltipPlacement;
  delay?: number;
  children: ReactNode;
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  ({ content, placement = 'top', delay = 200, children, className = '', ...props }, ref) => {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const triggerRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<number | null>(null);

    const updatePosition = () => {
      if (!triggerRef.current) return;

      const rect = triggerRef.current.getBoundingClientRect();
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;

      let top = 0;
      let left = 0;

      switch (placement) {
        case 'top':
          top = rect.top + scrollY - 8;
          left = rect.left + scrollX + rect.width / 2;
          break;
        case 'bottom':
          top = rect.bottom + scrollY + 8;
          left = rect.left + scrollX + rect.width / 2;
          break;
        case 'left':
          top = rect.top + scrollY + rect.height / 2;
          left = rect.left + scrollX - 8;
          break;
        case 'right':
          top = rect.top + scrollY + rect.height / 2;
          left = rect.right + scrollX + 8;
          break;
      }

      setPosition({ top, left });
    };

    const handleMouseEnter = () => {
      timeoutRef.current = window.setTimeout(() => {
        updatePosition();
        setVisible(true);
      }, delay);
    };

    const handleMouseLeave = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setVisible(false);
    };

    useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);

    const tooltipClasses = [
      'oc-tooltip',
      `oc-tooltip--${placement}`,
      className,
    ].filter(Boolean).join(' ');

    return (
      <>
        <div
          ref={triggerRef}
          className="oc-tooltip-trigger"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onFocus={handleMouseEnter}
          onBlur={handleMouseLeave}
        >
          {children}
        </div>
        {visible &&
          createPortal(
            <div
              ref={ref}
              className={tooltipClasses}
              style={{ top: position.top, left: position.left }}
              role="tooltip"
              {...props}
            >
              {content}
            </div>,
            document.body
          )}
      </>
    );
  }
);

Tooltip.displayName = 'Tooltip';
