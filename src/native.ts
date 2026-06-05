/**
 * React Native barrel for `@rpg-app/design-system/native`.
 *
 * Web consumers continue importing from `@rpg-app/design-system`. Mobile
 * (React Native / Expo) consumers import the platform-correct variants from
 * here. Each native component shares its Tailwind class strings with its web
 * counterpart via `*.classes.ts` files so the design tokens stay in sync.
 *
 * Build / typecheck note: every `.native.tsx` file is excluded from the
 * web-side TypeScript and tsup builds (see `tsconfig.json` and
 * `tsup.config.ts`). This file is bundled and typechecked from the
 * downstream RN app's own toolchain, which will have `react-native` and
 * `nativewind` installed.
 */
export { Button, buttonVariants, type ButtonNativeProps } from './components/Button/Button.native';
export type { ButtonVariant, ButtonSize } from './components/Button/Button.classes';

export { Spinner, type SpinnerProps } from './components/Spinner/Spinner.native';
export { spinnerVariants } from './components/Spinner/Spinner.classes';
export type { SpinnerSize, SpinnerColor } from './components/Spinner/Spinner.classes';

export { Badge, type BadgeProps } from './components/Badge/Badge.native';
export { badgeVariants } from './components/Badge/Badge.classes';
export type { BadgeVariant, BadgeSize } from './components/Badge/Badge.classes';

export { Skeleton, type SkeletonProps } from './components/Skeleton/Skeleton.native';
export { skeletonVariants } from './components/Skeleton/Skeleton.classes';
export type { SkeletonVariant } from './components/Skeleton/Skeleton.classes';

export { Alert, type AlertProps } from './components/Alert/Alert.native';
export { alertVariants } from './components/Alert/Alert.classes';
export type { AlertVariant } from './components/Alert/Alert.classes';

export {
  StatusIndicator,
  type StatusIndicatorProps,
} from './components/StatusIndicator/StatusIndicator.native';
export { statusIndicatorVariants } from './components/StatusIndicator/StatusIndicator.classes';
export type {
  StatusIndicatorVariant,
  StatusIndicatorSize,
} from './components/StatusIndicator/StatusIndicator.classes';

export {
  ConditionBadge,
  type ConditionBadgeProps,
} from './components/ConditionBadge/ConditionBadge.native';
export { conditionBadgeVariants } from './components/ConditionBadge/ConditionBadge.classes';
export type {
  ConditionBadgeVariant,
  ConditionBadgeSize,
} from './components/ConditionBadge/ConditionBadge.classes';

export {
  Avatar,
  AvatarGroup,
  type AvatarProps,
  type AvatarGroupProps,
} from './components/Avatar/Avatar.native';
export { avatarVariants } from './components/Avatar/Avatar.classes';
export type { AvatarSize, AvatarShape, AvatarStatus } from './components/Avatar/Avatar.classes';

export {
  SectionHeader,
  type SectionHeaderProps,
} from './components/SectionHeader/SectionHeader.native';
export { sectionHeaderVariants } from './components/SectionHeader/SectionHeader.classes';
export type { SectionHeaderSize } from './components/SectionHeader/SectionHeader.classes';

export {
  PageHeader,
  type PageHeaderProps,
} from './components/PageHeader/PageHeader.native';
export { pageHeaderVariants } from './components/PageHeader/PageHeader.classes';
export type {
  PageHeaderVariant,
  PageHeaderSpacing,
} from './components/PageHeader/PageHeader.classes';

export {
  EmptyState,
  type EmptyStateProps,
} from './components/EmptyState/EmptyState.native';
export { emptyStateVariants } from './components/EmptyState/EmptyState.classes';
export type {
  EmptyStateVariant,
  EmptyStateSize,
} from './components/EmptyState/EmptyState.classes';

export {
  DangerZone,
  type DangerZoneProps,
} from './components/DangerZone/DangerZone.native';

export {
  Card,
  useCardContext,
  type CardProps,
  type CardHeaderProps,
  type CardFooterProps,
} from './components/Card/Card.native';
export { cardVariants } from './components/Card/Card.classes';
export type { CardVariant } from './components/Card/Card.classes';

export {
  ButtonGroup,
  type ButtonGroupProps,
} from './components/ButtonGroup/ButtonGroup.native';
export { buttonGroupVariants } from './components/ButtonGroup/ButtonGroup.classes';
export type {
  ButtonGroupAlign,
  ButtonGroupDirection,
  ButtonGroupPaddingTop,
} from './components/ButtonGroup/ButtonGroup.classes';

export {
  AttributeCard,
  type AttributeCardProps,
} from './components/AttributeCard/AttributeCard.native';
export { attributeCardVariants } from './components/AttributeCard/AttributeCard.classes';
export type {
  AttributeCardVariant,
  AttributeCardSize,
} from './components/AttributeCard/AttributeCard.classes';

export { StatCard, type StatCardProps } from './components/StatCard/StatCard.native';
export { statCardVariants, valueVariants } from './components/StatCard/StatCard.classes';
export type { StatCardVariant, StatCardSize } from './components/StatCard/StatCard.classes';

export {
  SelectionCard,
  type SelectionCardProps,
} from './components/SelectionCard/SelectionCard.native';
export { selectionCardVariants } from './components/SelectionCard/SelectionCard.classes';
export type {
  SelectionCardVariant,
  SelectionCardSize,
  SelectionCardIconPosition,
} from './components/SelectionCard/SelectionCard.classes';

export {
  ResourceBar,
  type ResourceBarProps,
} from './components/ResourceBar/ResourceBar.native';
export { resourceBarVariants } from './components/ResourceBar/ResourceBar.classes';
export type {
  ResourceBarSize,
  ResourceBarColorScheme,
} from './components/ResourceBar/ResourceBar.classes';

export {
  FormGroup,
  FormError,
  FormHelperText,
  type FormGroupProps,
  type FormErrorProps,
  type FormHelperTextProps,
} from './components/Form/FormGroup.native';

export {
  CopyableLink,
  type CopyableLinkProps,
} from './components/CopyableLink/CopyableLink.native';
export { copyableLinkVariants } from './components/CopyableLink/CopyableLink.classes';
export type {
  CopyableLinkVariant,
  CopyableLinkSize,
} from './components/CopyableLink/CopyableLink.classes';

export {
  FilterBar,
  type FilterOption,
  type FilterBarProps,
} from './components/FilterBar/FilterBar.native';
export {
  filterBarVariants,
  filterButtonVariants,
} from './components/FilterBar/FilterBar.classes';
export type { FilterBarVariant } from './components/FilterBar/FilterBar.classes';

export {
  Banner,
  useBannerContext,
  type BannerProps,
  type SimpleBannerProps,
  type BannerIconProps,
  type BannerContentProps,
  type BannerTextContentProps,
  type BannerTitleProps,
  type BannerDescriptionProps,
  type BannerActionsProps,
} from './components/Banner/Banner.native';
export {
  bannerVariants,
  iconContainerVariants,
  titleVariants,
  descriptionVariants,
} from './components/Banner/Banner.classes';
export type { BannerVariant } from './components/Banner/Banner.classes';

export {
  ListItem,
  useListItemContext,
  type ListItemProps,
  type ListItemLeadingProps,
  type ListItemContentProps,
  type ListItemTitleProps,
  type ListItemSubtitleProps,
  type ListItemMetaProps,
  type ListItemActionsProps,
} from './components/ListItem/ListItem.native';
export { listItemVariants } from './components/ListItem/ListItem.classes';
export type { ListItemVariant } from './components/ListItem/ListItem.classes';

export {
  NumberControl,
  useNumberControlContext,
  type NumberControlProps,
  type NumberControlButtonProps,
  type NumberControlInputProps,
  type NumberControlActionProps,
  type NumberControlDisplayProps,
} from './components/NumberControl/NumberControl.native';
export {
  numberControlVariants,
  numberControlButtonVariants,
  buttonVariants as numberControlButtonClassVariants,
} from './components/NumberControl/NumberControl.classes';
export type {
  NumberControlVariant,
  NumberControlButtonIntent,
  NumberControlSize,
} from './components/NumberControl/NumberControl.classes';

export {
  WizardStep,
  useWizardStepContext,
  type WizardStepProps,
  type WizardStepHeaderProps,
  type WizardStepContentProps,
  type WizardStepSectionProps,
  type WizardStepGridProps,
  type WizardStepFooterProps,
  type WizardStepInfoPanelProps,
} from './components/WizardStep/WizardStep.native';
export { wizardStepVariants } from './components/WizardStep/WizardStep.classes';
export type {
  WizardStepVariant,
  WizardStepFooterAlign,
} from './components/WizardStep/WizardStep.classes';

export {
  Input,
  Textarea,
  Select,
  type InputProps,
  type TextareaProps,
  type SelectProps,
} from './components/Input/Input.native';
export {
  inputVariants,
  textareaVariants,
  selectVariants,
} from './components/Input/Input.classes';
export type { InputVariant, InputSize } from './components/Input/Input.classes';

export {
  Modal,
  type ModalProps,
  type ModalHeaderProps,
} from './components/Modal/Modal.native';
export { modalVariants } from './components/Modal/Modal.classes';
export type { ModalSize } from './components/Modal/Modal.classes';

export {
  ConfirmDialog,
  type ConfirmDialogProps,
} from './components/ConfirmDialog/ConfirmDialog.native';
export { confirmDialogVariants } from './components/ConfirmDialog/ConfirmDialog.classes';
export type { ConfirmDialogVariant } from './components/ConfirmDialog/ConfirmDialog.classes';

export {
  Tooltip,
  type TooltipProps,
} from './components/Tooltip/Tooltip.native';
export { tooltipVariants } from './components/Tooltip/Tooltip.classes';
export type { TooltipPosition } from './components/Tooltip/Tooltip.classes';
