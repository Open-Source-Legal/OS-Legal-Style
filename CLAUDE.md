# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is `@opencontracts/ui` — a React component library implementing the OpenContracts design system. The design philosophy centers on **transparent infrastructure**, **visible connections**, and **warm precision**.

## Commands

```bash
npm run build          # Build library (tsup, outputs CJS + ESM + types)
npm run dev            # Watch mode for development
npm run lint           # ESLint for src/**/*.ts,tsx
npm run test           # Run tests with Vitest
npm run test:coverage  # Tests with coverage report
npm run storybook      # Start Storybook dev server on port 6006
npm run build-storybook # Build static Storybook
```

## Architecture

**Entry point:** `index.ts` — exports all components, types, and aggregated CSS styles.

**Component structure:** Each component folder contains:
- `ComponentName.tsx` - Component implementation with TypeScript interfaces
- `ComponentName.styles.ts` - CSS styles as template literal export
- `ComponentName.stories.tsx` - Storybook stories demonstrating all variants
- `index.ts` - Barrel export for the component

**Styling approach:** CSS-in-JS via template literals. Each component exports its styles (e.g., `buttonStyles`), and `index.ts` aggregates them into `allStyles`. CSS custom properties (tokens) are defined in `tokens.ts`.

**Key design tokens:**
- `--oc-accent: #E85A4F` — coral accent for primary actions
- `--oc-fg-primary: #1A1A1A` — primary text color
- `--oc-bg-surface: #F8F8F8` — surface background
- Shadows use 0.04-0.05 opacity for "light touch"
- Inter is the primary typeface

## Component Categories

**Layout:** AppShell, PageHeader, SplitPane, Stack/HStack/VStack, ScrollArea, Card, Sidebar

**Overlay:** Modal, Tooltip, Popover

**Forms:** Button, IconButton, ButtonGroup, Input, Textarea, Select, Checkbox, Radio, Toggle/Switch, FormField

**Feedback:** Toast, Skeleton, Progress, Spinner, EmptyState, Alert, Banner

**Data Display:** Avatar, Chip, SourceCard, Citation

**Chat:** ChatMessage, ChatInput, ThinkingBlock, TypingIndicator, TaskCard

**Search:** SearchInput

**Navigation:** Tabs

## Component Patterns

All components follow these conventions:
- Use `forwardRef` for ref forwarding
- Accept `className` prop for custom styling
- Default `className = ''` to avoid undefined
- Class names use `.filter(Boolean).join(' ')` pattern
- Set `displayName` for debugging
- Types extend appropriate HTML element attributes
- CSS class names use `oc-` prefix with BEM-like naming

## Documentation Requirements

**IMPORTANT:** After editing or adding components, always update the documentation:

1. **Update `docs/COMPONENT_PLAN.md`** - Mark completed components, add new ones to appropriate sections
2. **Update component exports in `src/index.ts`** - Add exports for new components and their styles
3. **Ensure `allStyles` includes new style imports** - Add to the aggregated styles export

## Signature Components

The `Node` component family is unique to this design system — coral circles echoing the OpenContracts logo's highlighted vertices. Used to visualize connections and relationships in the legal document UI.

## Git Commit Guidelines

**Do NOT include Claude credit in commits.** No "Generated with Claude Code" or "Co-Authored-By: Claude" lines. Keep commit messages clean and focused on the changes.
