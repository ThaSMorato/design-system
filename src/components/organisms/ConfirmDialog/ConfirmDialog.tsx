import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../../utils/cn';
import { type VariantProps } from 'class-variance-authority';
import { AlertTriangle, AlertCircle, Info, CheckCircle, X } from 'lucide-react';
import { Button } from '../../atoms/Button';
import { Heading } from '../../atoms/Heading';
import { IconBox } from '../../atoms/IconBox';
import { IconButton } from '../../atoms/IconButton';
import { Text } from '../../atoms/Text';
import { Modal } from '../Modal';
import {
  CONFIRM_BODY_CLASS,
  CONFIRM_FOOTER_CLASS,
  CONFIRM_HEADER_ROW_CLASS,
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

/**
 * Turnkey confirm flow built on the Modal organism and Button/IconBox/
 * Heading/Text atoms. Intentionally prop-driven: its whole purpose is a
 * canned confirmation; use Modal directly for bespoke dialogs.
 */
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
    const resolvedVariant = (variant ?? 'danger') as ConfirmDialogVariant;
    const config = confirmIconConfig[resolvedVariant];
    const IconComponent = iconComponentMap[resolvedVariant];

    const handleConfirm = async () => {
      await onConfirm();
    };

    return (
      <Modal isOpen={isOpen} onClose={onClose} size="md" className={className}>
        <div ref={ref} {...props}>
          <div className={CONFIRM_HEADER_ROW_CLASS}>
            <IconBox size="md" className={cn('flex-shrink-0', config.bgColor)}>
              {icon || <IconComponent className={cn('h-6 w-6', config.textColor)} />}
            </IconBox>
            <div className={CONFIRM_BODY_CLASS}>
              <Heading as="h2" size="sm" id="confirm-dialog-title">
                {title}
              </Heading>
              <Text as="div" size="sm" tone="muted" className="mt-2">
                {message}
              </Text>
            </div>
            <IconButton
              aria-label="Close"
              variant="ghost"
              size="sm"
              className="flex-shrink-0"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </IconButton>
          </div>
          <div className={CONFIRM_FOOTER_CLASS}>
            <Button variant="secondary" size="md" onClick={onClose} disabled={isLoading}>
              {cancelLabel}
            </Button>
            <Button
              size="md"
              onClick={handleConfirm}
              disabled={isLoading}
              className={confirmButtonConfig[resolvedVariant]}
            >
              {isLoading ? 'Processing...' : confirmLabel}
            </Button>
          </div>
        </div>
      </Modal>
    );
  },
);

ConfirmDialog.displayName = 'ConfirmDialog';

export { ConfirmDialog, confirmDialogVariants };
export type { ConfirmDialogVariant } from './ConfirmDialog.classes';
