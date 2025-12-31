import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

/**
 * Common size scale used across components
 */
export type Size = 'sm' | 'md' | 'lg';

/**
 * Status variants for feedback states
 */
export type Status = 'default' | 'success' | 'warning' | 'error';

/**
 * Polymorphic component support
 * Allows components to render as different elements while maintaining type safety
 */
export type PolymorphicComponentProp<
  C extends ElementType,
  Props = object
> = Props & {
  as?: C;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<C>, keyof Props | 'as' | 'children'>;

export type PolymorphicRef<C extends ElementType> =
  ComponentPropsWithoutRef<C>['ref'];
