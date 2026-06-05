import { forwardRef, useState, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { AlertTriangle } from 'lucide-react';
import {
  DANGER_ZONE_CANCEL_BUTTON_CLASS,
  DANGER_ZONE_CONFIRM_BUTTON_CLASS,
  DANGER_ZONE_CONFIRM_ROW_CLASS,
  DANGER_ZONE_DESCRIPTION_CLASS,
  DANGER_ZONE_HEADER_CLASS,
  DANGER_ZONE_ICON_CLASS,
  DANGER_ZONE_PRIMARY_BUTTON_CLASS,
  DANGER_ZONE_ROOT_CLASS,
  DANGER_ZONE_TITLE_CLASS,
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
    const [showConfirm, setShowConfirm] = useState(false);

    const handleAction = async () => {
      await onAction();
      setShowConfirm(false);
    };

    const handleCancel = () => {
      setShowConfirm(false);
    };

    return (
      <div ref={ref} className={cn(DANGER_ZONE_ROOT_CLASS, className)} {...props}>
        <div className={DANGER_ZONE_HEADER_CLASS}>
          {icon || <AlertTriangle className={DANGER_ZONE_ICON_CLASS} />}
          <h3 className={DANGER_ZONE_TITLE_CLASS}>{title}</h3>
        </div>
        <p className={DANGER_ZONE_DESCRIPTION_CLASS}>{description}</p>
        {showConfirm ? (
          <div className={DANGER_ZONE_CONFIRM_ROW_CLASS}>
            <button
              type="button"
              onClick={handleAction}
              disabled={isLoading}
              className={DANGER_ZONE_CONFIRM_BUTTON_CLASS}
            >
              {isLoading ? 'Processing...' : confirmLabel}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              disabled={isLoading}
              className={DANGER_ZONE_CANCEL_BUTTON_CLASS}
            >
              {cancelLabel}
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowConfirm(true)}
            className={DANGER_ZONE_PRIMARY_BUTTON_CLASS}
          >
            {actionLabel}
          </button>
        )}
      </div>
    );
  }
);

DangerZone.displayName = 'DangerZone';

export { DangerZone };
