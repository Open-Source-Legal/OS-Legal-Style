import React, { forwardRef, ReactNode, HTMLAttributes, ElementType } from 'react';

export type StackSpacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type StackAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  /** Render as different element */
  as?: ElementType;
  /** Stack direction */
  direction?: 'row' | 'column';
  /** Gap between children */
  gap?: StackSpacing;
  /** Align items */
  align?: StackAlign;
  /** Justify content */
  justify?: StackJustify;
  /** Wrap children */
  wrap?: boolean;
  /** Fill available space */
  flex?: boolean | number | string;
  /** Inline display */
  inline?: boolean;
  children?: ReactNode;
}

export interface HStackProps extends Omit<StackProps, 'direction'> {}
export interface VStackProps extends Omit<StackProps, 'direction'> {}

const spacingMap: Record<StackSpacing, string> = {
  none: '0',
  xs: 'var(--oc-spacing-xs, 4px)',
  sm: 'var(--oc-spacing-sm, 8px)',
  md: 'var(--oc-spacing-md, 16px)',
  lg: 'var(--oc-spacing-lg, 24px)',
  xl: 'var(--oc-spacing-xl, 32px)',
  '2xl': 'var(--oc-spacing-2xl, 48px)',
};

const alignMap: Record<StackAlign, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
  baseline: 'baseline',
};

const justifyMap: Record<StackJustify, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
};

export const Stack = forwardRef<HTMLDivElement, StackProps>(
  (
    {
      as: Component = 'div',
      direction = 'column',
      gap = 'md',
      align,
      justify,
      wrap = false,
      flex,
      inline = false,
      className = '',
      style,
      children,
      ...props
    },
    ref
  ) => {
    const classes = ['oc-stack', className].filter(Boolean).join(' ');

    const flexValue = flex === true ? 1 : flex === false ? undefined : flex;

    const stackStyle: React.CSSProperties = {
      display: inline ? 'inline-flex' : 'flex',
      flexDirection: direction,
      gap: spacingMap[gap],
      alignItems: align ? alignMap[align] : undefined,
      justifyContent: justify ? justifyMap[justify] : undefined,
      flexWrap: wrap ? 'wrap' : undefined,
      flex: flexValue,
      ...style,
    };

    return (
      <Component ref={ref} className={classes} style={stackStyle} {...props}>
        {children}
      </Component>
    );
  }
);

Stack.displayName = 'Stack';

/** Horizontal stack (row direction) */
export const HStack = forwardRef<HTMLDivElement, HStackProps>(
  (props, ref) => <Stack ref={ref} direction="row" align="center" {...props} />
);

HStack.displayName = 'HStack';

/** Vertical stack (column direction) */
export const VStack = forwardRef<HTMLDivElement, VStackProps>(
  (props, ref) => <Stack ref={ref} direction="column" {...props} />
);

VStack.displayName = 'VStack';

/** Spacer - flexible space that fills available room */
export const Spacer = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = '', style, ...props }, ref) => (
    <div
      ref={ref}
      className={`oc-spacer ${className}`}
      style={{ flex: 1, ...style }}
      {...props}
    />
  )
);

Spacer.displayName = 'Spacer';

/** Divider - visual separator */
export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
}

export const Divider = forwardRef<HTMLDivElement, DividerProps>(
  ({ orientation = 'horizontal', className = '', style, ...props }, ref) => {
    const classes = [
      'oc-divider',
      `oc-divider--${orientation}`,
      className,
    ].filter(Boolean).join(' ');

    return <div ref={ref} className={classes} style={style} role="separator" {...props} />;
  }
);

Divider.displayName = 'Divider';
