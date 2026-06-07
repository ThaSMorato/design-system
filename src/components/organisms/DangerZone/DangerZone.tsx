import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../../utils/cn';
import { AlertTriangle } from 'lucide-react';
import { useConfirmAction } from '../../../hooks/use-confirm-action';
import { Button } from '../../atoms/Button';
import { Heading } from '../../atoms/Heading';
import { Text } from '../../atoms/Text';
import {
  DANGER_ZONE_CONFIRM_ROW_CLASS,
  DANGER_ZONE_HEADER_CLASS,
  DANGER_ZONE_ICON_CLASS,
  DANGER_ZONE_PRIMARY_OVERRIDE_CLASS,
  DANGER_ZONE_ROOT_CLASS,
} from './DangerZone.classes';

export interface DangerZoneProps extends HTMLAttributes<HTMLDivElement> {
  /** Title of the danger zone */
  title?: string;
  /** Description of the action */
  description: string;
  /** Primary action button label */
  actionLabel: string;
  /** Confirmation label (shown after first click) */
  confirmLabel?: string;
  /** Cancel label (shown during confirmation) */
  cancelLabel?: string;
  /** Callback when action is confirmed */
  onAction: () => void | Promise<void>;
  /** Whether the action is loading */
  isLoading?: boolean;
  /** Custom icon */
  icon?: ReactNode;
}

const DangerZone = forwardRef<HTMLDivElement, DangerZoneProps>(
  (
    {
      className,
      title = 'Danger Zone',
      description,
      actionLabel,
      confirmLabel = 'Yes, confirm',
      cancelLabel = 'Cancel',
      onAction,
      isLoading = false,
      icon,
      ...props
    },
    ref
  ) => {
    const { isConfirming, request, confirm, cancel } = useConfirmAction(onAction);

    return (
      <div ref={ref} className={cn(DANGER_ZONE_ROOT_CLASS, className)} {...props}>
        <div className={DANGER_ZONE_HEADER_CLASS}>
          {icon || <AlertTriangle className={DANGER_ZONE_ICON_CLASS} />}
          <Heading as="h3" size="inherit" tone="danger">
            {title}
          </Heading>
        </div>
        <Text size="sm" tone="default" className="mb-4">
          {description}
        </Text>
        {isConfirming ? (
          <div className={DANGER_ZONE_CONFIRM_ROW_CLASS}>
            <Button
              variant="danger"
              size="sm"
              onClick={confirm}
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : confirmLabel}
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={cancel}
              disabled={isLoading}
            >
              {cancelLabel}
            </Button>
          </div>
        ) : (
          <Button
            variant="ghost"
            size="md"
            className={DANGER_ZONE_PRIMARY_OVERRIDE_CLASS}
            onClick={request}
          >
            {actionLabel}
          </Button>
        )}
      </div>
    );
  }
);

DangerZone.displayName = 'DangerZone';

export { DangerZone };
