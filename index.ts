/**
 * OpenContracts Component Library
 * 
 * A design system built around transparent infrastructure,
 * visible connections, and warm precision.
 * 
 * @package @opencontracts/ui
 */

// Tokens & Theme
export { tokens } from './tokens';
export type { Tokens, ColorScale, SpacingScale, RadiusScale, ShadowScale, FontSizeScale } from './tokens';

// Types
export type { Size, Status, PolymorphicComponentProp, PolymorphicRef } from './types';

// Button
export { Button, buttonStyles } from './Button';
export type { ButtonProps, ButtonVariant } from './Button';

// Input
export { Input, inputStyles } from './Input';
export type { InputProps } from './Input';

// Textarea
export { Textarea, textareaStyles } from './Textarea';
export type { TextareaProps } from './Textarea';

// Select
export { Select, selectStyles } from './Select';
export type { SelectProps, SelectOption } from './Select';

// Card
export { Card, CardHeader, CardBody, CardFooter, cardStyles } from './Card';
export type { CardProps, CardHeaderProps } from './Card';

// Badge
export { Badge, BadgeGroup, badgeStyles } from './Badge';
export type { BadgeProps, BadgeVariant, BadgeGroupProps } from './Badge';

// Node (Signature Element)
export { Node, NodeWithLabel, NodeGroup, nodeStyles } from './Node';
export type { NodeProps, NodeVariant, NodeWithLabelProps, NodeGroupProps } from './Node';

// Typography
export { Heading, Text, Code, Label, Link, typographyStyles } from './Typography';

// Sidebar
export {
  Sidebar,
  SidebarHeader,
  SidebarNav,
  SidebarItem,
  SidebarSection,
  SidebarFooter,
  sidebarStyles,
} from './Sidebar';
export type { SidebarProps, SidebarHeaderProps, SidebarItemProps, SidebarSectionProps } from './Sidebar';

// Aggregate all CSS styles for single import
export const allStyles = `
/* OpenContracts Design System - All Component Styles */

${buttonStyles}

${inputStyles}

${textareaStyles}

${selectStyles}

${cardStyles}

${badgeStyles}

${nodeStyles}

${typographyStyles}

${sidebarStyles}
`;
