import React, { forwardRef, ReactNode, HTMLAttributes, useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

export type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right';
export type PopoverTrigger = 'click' | 'hover';

export interface PopoverProps extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  content: ReactNode;
  placement?: PopoverPlacement;
  trigger?: PopoverTrigger;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}

export const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  (
    {
      content,
      placement = 'bottom',
      trigger = 'click',
      open: controlledOpen,
      onOpenChange,
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    const [internalOpen, setInternalOpen] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const triggerRef = useRef<HTMLDivElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);

    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : internalOpen;

    const setOpen = useCallback(
      (value: boolean) => {
        if (!isControlled) {
          setInternalOpen(value);
        }
        onOpenChange?.(value);
      },
      [isControlled, onOpenChange]
    );

    const updatePosition = useCallback(() => {
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
    }, [placement]);

    const handleClick = () => {
      if (trigger === 'click') {
        updatePosition();
        setOpen(!open);
      }
    };

    const handleMouseEnter = () => {
      if (trigger === 'hover') {
        updatePosition();
        setOpen(true);
      }
    };

    const handleMouseLeave = () => {
      if (trigger === 'hover') {
        setOpen(false);
      }
    };

    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          trigger === 'click' &&
          open &&
          triggerRef.current &&
          popoverRef.current &&
          !triggerRef.current.contains(e.target as Node) &&
          !popoverRef.current.contains(e.target as Node)
        ) {
          setOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [open, trigger, setOpen]);

    const popoverClasses = [
      'oc-popover',
      `oc-popover--${placement}`,
      className,
    ].filter(Boolean).join(' ');

    return (
      <>
        <div
          ref={triggerRef}
          className="oc-popover-trigger"
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {children}
        </div>
        {open &&
          createPortal(
            <div
              ref={(node) => {
                (popoverRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
                if (typeof ref === 'function') {
                  ref(node);
                } else if (ref) {
                  (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
                }
              }}
              className={popoverClasses}
              style={{ top: position.top, left: position.left }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
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

Popover.displayName = 'Popover';
