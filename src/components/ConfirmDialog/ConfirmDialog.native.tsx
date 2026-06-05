/**
 * React Native variant of ConfirmDialog.
 *
 * Uses RN's <Modal> for the overlay layer (same pattern as our Modal.native).
 * Variant icon (AlertTriangle / AlertCircle / Info / CheckCircle) comes
 * through a renderVariantIcon render-prop. The close X icon is also a
 * render-prop. This keeps the DS package free of a lucide-react-native
 * hard dependency.
 */
// @ts-expect-error — `react-native` is not installed in this workspace yet.
import { View, Text, Pressable, Modal as RNModal } from 'react-native';
// @ts-expect-error — `nativewind` is not installed in this workspace yet.
import { styled } from 'nativewind';
import { forwardRef, type ReactNode } from 'react';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import {
  CONFIRM_BODY_CLASS,
  CONFIRM_CANCEL_BUTTON_CLASS,
  CONFIRM_CLOSE_BUTTON_CLASS,
  CONFIRM_FOOTER_CLASS,
  CONFIRM_HEADER_ROW_CLASS,
  CONFIRM_ICON_WRAPPER_BASE_CLASS,
  CONFIRM_MESSAGE_CLASS,
  CONFIRM_OVERLAY_CLASS,
  CONFIRM_PANEL_CLASS,
  CONFIRM_PRIMARY_BUTTON_BASE_CLASS,
  CONFIRM_TITLE_CLASS,
  confirmButtonConfig,
  confirmDialogVariants,
  confirmIconConfig,
  type ConfirmDialogVariant,
} from './ConfirmDialog.classes';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledPressable = styled(Pressable);

export interface ConfirmDialogProps extends VariantProps<typeof confirmDialogVariants> {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title: string;
  message: string | ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  isLoading?: boolean;
  icon?: ReactNode;
  className?: string;
  /** Render-prop for the variant icon. Receives the variant and an iconClassName. */
  renderVariantIcon?: (variant: ConfirmDialogVariant, iconClassName: string) => ReactNode;
  /** Render-prop for the X close icon. */
  renderCloseIcon?: (iconClassName: string) => ReactNode;
}

export const ConfirmDialog = forwardRef<View, ConfirmDialogProps>(
  (
    {
      className,
      variant = 'danger',
      isOpen,
      onClose,
      onConfirm,
      title,
      message,
      confirmLabel = 'Confirm',
      cancelLabel = 'Cancel',
      isLoading = false,
      icon,
      renderVariantIcon,
      renderCloseIcon,
    },
    ref,
  ) => {
    const resolvedVariant = (variant ?? 'danger') as ConfirmDialogVariant;
    const config = confirmIconConfig[resolvedVariant];

    const handleConfirm = async () => {
      await onConfirm();
    };

    return (
      <RNModal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={onClose}
      >
        <StyledPressable
          accessibilityRole="button"
          accessibilityLabel="Close confirmation"
          onPress={onClose}
          className={CONFIRM_OVERLAY_CLASS}
        >
          <StyledView
            ref={ref}
            accessibilityRole="alert"
            className={cn(CONFIRM_PANEL_CLASS, className)}
          >
            <StyledView className={CONFIRM_HEADER_ROW_CLASS}>
              <StyledView className={cn(CONFIRM_ICON_WRAPPER_BASE_CLASS, config.bgColor)}>
                {icon ?? renderVariantIcon?.(resolvedVariant, cn('h-6 w-6', config.textColor))}
              </StyledView>
              <StyledView className={CONFIRM_BODY_CLASS}>
                <StyledText accessibilityRole="header" className={CONFIRM_TITLE_CLASS}>
                  {title}
                </StyledText>
                {typeof message === 'string' || typeof message === 'number' ? (
                  <StyledText className={CONFIRM_MESSAGE_CLASS}>{message}</StyledText>
                ) : (
                  <StyledView className={CONFIRM_MESSAGE_CLASS}>{message}</StyledView>
                )}
              </StyledView>
              <StyledPressable
                accessibilityRole="button"
                accessibilityLabel="Close"
                onPress={onClose}
                className={CONFIRM_CLOSE_BUTTON_CLASS}
              >
                {renderCloseIcon?.('h-5 w-5')}
              </StyledPressable>
            </StyledView>
            <StyledView className={CONFIRM_FOOTER_CLASS}>
              <StyledPressable
                accessibilityRole="button"
                disabled={isLoading}
                onPress={onClose}
                className={CONFIRM_CANCEL_BUTTON_CLASS}
              >
                <StyledText className="text-inherit">{cancelLabel}</StyledText>
              </StyledPressable>
              <StyledPressable
                accessibilityRole="button"
                disabled={isLoading}
                onPress={handleConfirm}
                className={cn(CONFIRM_PRIMARY_BUTTON_BASE_CLASS, confirmButtonConfig[resolvedVariant])}
              >
                <StyledText className="text-inherit">
                  {isLoading ? 'Processing...' : confirmLabel}
                </StyledText>
              </StyledPressable>
            </StyledView>
          </StyledView>
        </StyledPressable>
      </RNModal>
    );
  },
);

ConfirmDialog.displayName = 'ConfirmDialog.native';
