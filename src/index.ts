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
export type {
  Tokens,
  ColorScale,
  SpacingScale,
  RadiusScale,
  ShadowScale,
  FontSizeScale,
  AnimationScale,
  ZIndexScale,
  OpacityScale,
  LineHeightScale,
  BreakpointScale,
} from './tokens';

// Utilities (shared styles, keyframes, focus ring, etc.)
export { utilitiesStyles } from './utilities.styles';

// Types
export type { Size, Status, PolymorphicComponentProp, PolymorphicRef } from './types';

// Layout - AppShell
export {
  AppShell,
  AppShellSidebar,
  AppShellMain,
  AppShellHeader,
  useAppShell,
  appShellStyles,
} from './AppShell';
export type {
  AppShellProps,
  AppShellSidebarProps,
  AppShellMainProps,
  AppShellHeaderProps,
} from './AppShell';

// Layout - PageHeader
export { PageHeader, pageHeaderStyles } from './PageHeader';
export type { PageHeaderProps, BreadcrumbItem } from './PageHeader';

// Layout - SplitPane
export { SplitPane, Pane, splitPaneStyles } from './SplitPane';
export type { SplitPaneProps, PaneProps, SplitDirection } from './SplitPane';

// Layout - Stack
export { Stack, HStack, VStack, Spacer, Divider, stackStyles } from './Stack';
export type {
  StackProps,
  HStackProps,
  VStackProps,
  DividerProps,
  StackSpacing,
  StackAlign,
  StackJustify,
} from './Stack';

// Layout - ScrollArea
export { ScrollArea, scrollAreaStyles } from './ScrollArea';
export type { ScrollAreaProps, ScrollAreaType } from './ScrollArea';

// Card
export { Card, CardHeader, CardBody, CardFooter, cardStyles } from './Card';
export type { CardProps, CardHeaderProps, CardVariant, CardPadding } from './Card';

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
export type {
  SidebarProps,
  SidebarHeaderProps,
  SidebarItemProps,
  SidebarSectionProps,
} from './Sidebar';

// NavBar
export { NavBar, navBarStyles } from './NavBar';
export type { NavBarProps, NavItem, UserMenuItem } from './NavBar';

// Modal
export { Modal, ModalHeader, ModalBody, ModalFooter, modalStyles } from './Modal';
export type { ModalProps, ModalHeaderProps, ModalFooterProps, ModalSize } from './Modal';

// Tooltip
export { Tooltip, tooltipStyles } from './Tooltip';
export type { TooltipProps, TooltipPlacement } from './Tooltip';

// Popover
export { Popover, popoverStyles } from './Popover';
export type { PopoverProps, PopoverPlacement, PopoverTrigger } from './Popover';

// Avatar
export { Avatar, AvatarGroup, AIAvatar, avatarStyles } from './Avatar';
export type { AvatarProps, AvatarGroupProps, AvatarSize, AvatarStatus } from './Avatar';

// Chip
export { Chip, ChipGroup, SuggestionChip, FilterChip, chipStyles } from './Chip';
export type {
  ChipProps,
  ChipGroupProps,
  SuggestionChipProps,
  FilterChipProps,
  ChipVariant,
  ChipSize,
  ChipColor,
} from './Chip';

// SourceCard
export { SourceCard, SourcePill, SourceList, Citation, sourceCardStyles } from './SourceCard';
export type {
  SourceCardProps,
  SourcePillProps,
  SourceListProps,
  CitationProps,
  DocumentType,
} from './SourceCard';

// Chat
export {
  ChatMessage,
  ChatContainer,
  ChatMessages,
  ChatInput,
  ThinkingBlock,
  TypingIndicator,
  TaskCard,
  MessageActions,
  ActionButton,
  chatStyles,
} from './Chat';
export type {
  ChatMessageProps,
  ChatInputProps,
  ChatContainerProps,
  ThinkingBlockProps,
  TypingIndicatorProps,
  TaskCardProps,
  MessageActionsProps,
  ActionButtonProps,
  MessageRole,
  MessageStatus,
  TaskStatus,
} from './Chat';

// Button
export { Button, IconButton, ButtonGroup, buttonStyles } from './Button';
export type { ButtonProps, IconButtonProps, ButtonGroupProps, ButtonVariant, ButtonSize } from './Button';

// Input
export { Input, inputStyles } from './Input';
export type { InputProps, InputSize } from './Input';

// Textarea
export { Textarea, textareaStyles } from './Textarea';
export type { TextareaProps } from './Textarea';

// Select
export { Select, selectStyles } from './Select';
export type { SelectProps, SelectOption, SelectOptionGroup, SelectSize } from './Select';

// Checkbox
export { Checkbox, CheckboxGroup, checkboxStyles } from './Checkbox';
export type { CheckboxProps, CheckboxGroupProps } from './Checkbox';

// Radio
export { Radio, RadioGroup, radioStyles } from './Radio';
export type { RadioProps, RadioGroupProps } from './Radio';

// Toggle
export { Toggle, Switch, toggleStyles } from './Toggle';
export type { ToggleProps, ToggleSize } from './Toggle';

// FormField
export { FormField, formFieldStyles } from './FormField';
export type { FormFieldProps } from './FormField';

// Toast
export { Toast, ToastProvider, useToast, toastStyles } from './Toast';
export type { ToastProps, ToastProviderProps, ToastVariant, ToastPosition } from './Toast';

// Skeleton
export {
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
  SkeletonButton,
  DocumentCardSkeleton,
  TableRowSkeleton,
  ChatMessageSkeleton,
  skeletonStyles,
} from './Skeleton';
export type { SkeletonProps, SkeletonTextProps, SkeletonVariant, SkeletonAnimation } from './Skeleton';

// SearchInput
export { SearchInput, searchInputStyles } from './SearchInput';
export type { SearchInputProps, SearchSuggestion } from './SearchInput';

// Progress
export { Progress, ProgressCircle, Spinner, progressStyles } from './Progress';
export type { ProgressProps, ProgressCircleProps, SpinnerProps, ProgressSize, ProgressVariant } from './Progress';

// EmptyState
export {
  EmptyState,
  EmptyDocumentIcon,
  EmptySearchIcon,
  EmptyFolderIcon,
  EmptyInboxIcon,
  EmptyNotificationIcon,
  emptyStateStyles,
} from './EmptyState';
export type { EmptyStateProps, EmptyStateSize } from './EmptyState';

// Alert
export { Alert, Banner, alertStyles } from './Alert';
export type { AlertProps, BannerProps, AlertVariant } from './Alert';

// Tabs
export { Tabs, TabList, Tab, TabPanels, TabPanel, tabsStyles } from './Tabs';
export type { TabsProps, TabListProps, TabProps, TabPanelsProps, TabPanelProps, TabsVariant, TabsOrientation } from './Tabs';

// ResearchCard
export {
  ResearchCard,
  UserQuestion,
  AIResponse,
  SourcesBadge,
  ResearchSection,
  StepsList,
  researchCardStyles,
} from './ResearchCard';
export type {
  ResearchCardProps,
  UserQuestionProps,
  AIResponseProps,
  SourcesBadgeProps,
  ResearchSectionProps,
  StepsListProps,
  StepItem,
  ResearchStatus,
} from './ResearchCard';

// ProjectPicker
export {
  ProjectPicker,
  ProjectItem,
  ProjectSearch,
  projectPickerStyles,
} from './ProjectPicker';
export type {
  ProjectPickerProps,
  ProjectItemProps,
  ProjectSearchProps,
  ProjectType,
} from './ProjectPicker';

// SourcesPanel
export {
  SourcesPanel,
  PanelTabs,
  PanelTab,
  PanelSearch,
  PanelActionList,
  PanelAction,
  PanelSection,
  UploadIcon,
  FilesIcon,
  PromptsIcon,
  PlusIcon,
  IntegrationIcon,
  sourcesPanelStyles,
} from './SourcesPanel';
export type {
  SourcesPanelProps,
  PanelTabsProps,
  PanelTabProps,
  PanelSearchProps,
  PanelActionListProps,
  PanelActionProps,
  PanelSectionProps,
} from './SourcesPanel';

// Hero
export {
  Hero,
  HeroBadge,
  HeroTitle,
  HeroSubtitle,
  HeroSearch,
  HeroActions,
  HeroAction,
  HeroContent,
  HeroMedia,
  SparkleIcon,
  RocketIcon,
  heroStyles,
} from './Hero';
export type {
  HeroProps,
  HeroBadgeProps,
  HeroTitleProps,
  HeroSubtitleProps,
  HeroSearchProps,
  HeroActionsProps,
  HeroActionProps,
  HeroContentProps,
  HeroMediaProps,
  HeroVariant,
  HeroSize,
} from './Hero';

// SearchBox
export { SearchBox, searchBoxStyles } from './SearchBox';
export type { SearchBoxProps } from './SearchBox';

// FilterTabs
export { FilterTabs, FilterTab, filterTabsStyles } from './FilterTabs';
export type { FilterTabsProps, FilterTabProps, FilterTabItem } from './FilterTabs';

// FilterPanel
export { FilterPanel, filterPanelStyles } from './FilterPanel';
export type { FilterPanelProps, FilterSection, FilterOption, FilterValues } from './FilterPanel';

// StatBlock
export { StatBlock, StatGrid, statBlockStyles } from './StatBlock';
export type { StatBlockProps, StatGridProps } from './StatBlock';

// CollectionCard
export { CollectionCard, CollectionList, collectionCardStyles } from './CollectionCard';
export type { CollectionCardProps, CollectionListProps, CollectionType } from './CollectionCard';

// ActivityFeed
export { ActivityFeed, ActivityItem, activityFeedStyles } from './ActivityFeed';
export type { ActivityFeedProps, ActivityItemProps, ActivityItemData } from './ActivityFeed';

// ActionList
export { ActionList, ActionItem, actionListStyles } from './ActionList';
export type { ActionListProps, ActionItemProps, ActionItemData } from './ActionList';

// Thread
export {
  ThreadView,
  ThreadPost,
  ThreadReply,
  Mention,
  LinkedResource,
  ResourceList,
  ReactionButton,
  ReactionBar,
  ThreadAction,
  ThreadInput,
  ThreadMeta,
  threadStyles,
} from './Thread';
export type {
  ThreadViewProps,
  ThreadPostProps,
  ThreadReplyProps,
  MentionProps,
  LinkedResourceProps,
  ResourceListProps,
  ReactionButtonProps,
  ReactionBarProps,
  ThreadActionProps,
  ThreadInputProps,
  ThreadMetaProps,
  ThreadStatus,
  ResourceType,
  ReactionType,
} from './Thread';

// Discussion
export {
  CategoryBadge,
  DiscussionItem,
  DiscussionList,
  DiscussionFilters,
  DiscussionStats,
  NewDiscussionButton,
  discussionStyles,
} from './Discussion';
export type {
  CategoryBadgeProps,
  DiscussionItemProps,
  DiscussionListProps,
  DiscussionFiltersProps,
  DiscussionStatsProps,
  NewDiscussionButtonProps,
  DiscussionCategory,
  DiscussionStatus,
  DiscussionSortOption,
  DiscussionAuthor,
  DiscussionFilterOption,
} from './Discussion';

// FileSystem
export {
  FileSystem,
  FileSystemLayout,
  FileSystemSidebar,
  FileSystemMain,
  useFileSystem,
  FolderTree,
  FolderTreeItem,
  FileList,
  FileListItem,
  FilePathBreadcrumb,
  FileSystemToolbar,
  ToolbarButton,
  ToolbarSeparator,
  fileSystemStyles,
} from './FileSystem';
export type {
  FileSystemProps,
  FileSystemLayoutProps,
  FileSystemSidebarProps,
  FileSystemMainProps,
  FileSystemContextValue,
  FileSystemItem,
  FileSystemViewMode,
  FileType,
  FolderTreeProps,
  FolderTreeItemProps,
  FileListProps,
  FileListItemProps,
  FilePathBreadcrumbProps,
  FileSystemToolbarProps,
  ToolbarButtonProps,
} from './FileSystem';

// ExtractCard
export { ExtractCard, ExtractList, extractCardStyles } from './ExtractCard';
export type { ExtractCardProps, ExtractListProps, ExtractStatus } from './ExtractCard';

// DataGrid
export { DataGrid, dataGridStyles } from './DataGrid';
export type {
  DataGridProps,
  DataGridColumn,
  DataGridColumnType,
  CellAction,
  SortDirection,
} from './DataGrid';

// Aggregate all CSS styles for single import
import { utilitiesStyles } from './utilities.styles';
import { appShellStyles } from './AppShell';
import { pageHeaderStyles } from './PageHeader';
import { splitPaneStyles } from './SplitPane';
import { stackStyles } from './Stack';
import { scrollAreaStyles } from './ScrollArea';
import { cardStyles } from './Card';
import { sidebarStyles } from './Sidebar';
import { navBarStyles } from './NavBar';
import { modalStyles } from './Modal';
import { tooltipStyles } from './Tooltip';
import { popoverStyles } from './Popover';
import { avatarStyles } from './Avatar';
import { chipStyles } from './Chip';
import { sourceCardStyles } from './SourceCard';
import { chatStyles } from './Chat';
import { buttonStyles } from './Button';
import { inputStyles } from './Input';
import { textareaStyles } from './Textarea';
import { selectStyles } from './Select';
import { checkboxStyles } from './Checkbox';
import { radioStyles } from './Radio';
import { toggleStyles } from './Toggle';
import { formFieldStyles } from './FormField';
import { toastStyles } from './Toast';
import { skeletonStyles } from './Skeleton';
import { searchInputStyles } from './SearchInput';
import { progressStyles } from './Progress';
import { emptyStateStyles } from './EmptyState';
import { alertStyles } from './Alert';
import { tabsStyles } from './Tabs';
import { researchCardStyles } from './ResearchCard';
import { projectPickerStyles } from './ProjectPicker';
import { sourcesPanelStyles } from './SourcesPanel';
import { heroStyles } from './Hero';
import { searchBoxStyles } from './SearchBox';
import { filterTabsStyles } from './FilterTabs';
import { filterPanelStyles } from './FilterPanel';
import { statBlockStyles } from './StatBlock';
import { collectionCardStyles } from './CollectionCard';
import { activityFeedStyles } from './ActivityFeed';
import { actionListStyles } from './ActionList';
import { threadStyles } from './Thread';
import { discussionStyles } from './Discussion';
import { fileSystemStyles } from './FileSystem';
import { extractCardStyles } from './ExtractCard';
import { dataGridStyles } from './DataGrid';

export const allStyles = `
/* OpenContracts Design System - All Component Styles */

/* Base utilities, tokens, and shared keyframes (must be first) */
${utilitiesStyles}

${appShellStyles}

${pageHeaderStyles}

${splitPaneStyles}

${stackStyles}

${scrollAreaStyles}

${cardStyles}

${sidebarStyles}

${navBarStyles}

${modalStyles}

${tooltipStyles}

${popoverStyles}

${avatarStyles}

${chipStyles}

${sourceCardStyles}

${chatStyles}

${buttonStyles}

${inputStyles}

${textareaStyles}

${selectStyles}

${checkboxStyles}

${radioStyles}

${toggleStyles}

${formFieldStyles}

${toastStyles}

${skeletonStyles}

${searchInputStyles}

${progressStyles}

${emptyStateStyles}

${alertStyles}

${tabsStyles}

${researchCardStyles}

${projectPickerStyles}

${sourcesPanelStyles}

${heroStyles}

${searchBoxStyles}

${filterTabsStyles}

${filterPanelStyles}

${statBlockStyles}

${collectionCardStyles}

${activityFeedStyles}

${actionListStyles}

${threadStyles}

${discussionStyles}

${fileSystemStyles}

${extractCardStyles}

${dataGridStyles}
`;
