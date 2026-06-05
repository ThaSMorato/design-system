import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { type VariantProps } from 'class-variance-authority';
import { AlertTriangle, AlertCircle, Info, CheckCircle, X } from 'lucide-react';
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

const iconComponentMap = {
  danger: AlertTriangle,
  warning: AlertCircle,
  info: Info,
  success: CheckCircle,
} as const;

export interface ConfirmDialogProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof confirmDialogVariants> {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title: string;
  message: string | ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  isLoading?: boolean;
  icon?: ReactNode;
}

const ConfirmDialog = forwardRef<HTMLDivElement, ConfirmDialogProps>(
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
      ...props
    },
    ref,
  ) => {
    if (!isOpen) return null;

    const resolvedVariant = (variant ?? 'danger') as ConfirmDialogVariant;
    const config = confirmIconConfig[resolvedVariant];
    const IconComponent = iconComponentMap[resolvedVariant];

    const handleConfirm = async () => {
      await onConfirm();
    };

    const handleOverlayClick = (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
    };

    return (
      <div
        ref={ref}
        className={CONFIRM_OVERLAY_CLASS}
        onClick={handleOverlayClick}
        {...props}
      >
        <div
          className={cn(CONFIRM_PANEL_CLASS, className)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-dialog-title"
        >
          <div className={CONFIRM_HEADER_ROW_CLASS}>
            <div className={cn(CONFIRM_ICON_WRAPPER_BASE_CLASS, config.bgColor)}>
              {icon || <IconComponent className={cn('h-6 w-6', config.textColor)} />}
            </div>
            <div className={CONFIRM_BODY_CLASS}>
              <h2 id="confirm-dialog-title" className={CONFIRM_TITLE_CLASS}>
                {title}
              </h2>
              <div className={CONFIRM_MESSAGE_CLASS}>{message}</div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className={CONFIRM_CLOSE_BUTTON_CLASS}
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className={CONFIRM_FOOTER_CLASS}>
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className={CONFIRM_CANCEL_BUTTON_CLASS}
            >
              {cancelLabel}
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={isLoading}
              className={cn(CONFIRM_PRIMARY_BUTTON_BASE_CLASS, confirmButtonConfig[resolvedVariant])}
            >
              {isLoading ? 'Processing...' : confirmLabel}
            </button>
          </div>
        </div>
      </div>
    );
  },
);

ConfirmDialog.displayName = 'ConfirmDialog';

export { ConfirmDialog, confirmDialogVariants };
export type { ConfirmDialogVariant } from './ConfirmDialog.classes';
