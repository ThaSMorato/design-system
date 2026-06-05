import { type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { type VariantProps } from 'class-variance-authority';
import { Info, CheckCircle, AlertTriangle, XCircle, X } from 'lucide-react';
import {
  ALERT_BODY_CLASS,
  ALERT_CONTENT_CLASS,
  ALERT_DISMISS_BUTTON_CLASS,
  ALERT_DISMISS_ICON_CLASS,
  ALERT_ICON_CLASS,
  ALERT_TITLE_CLASS,
  alertVariants,
} from './Alert.classes';

const iconMap = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
};

export interface AlertProps extends VariantProps<typeof alertVariants> {
  title?: string;
  children: ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

export function Alert({
  variant = 'info',
  title,
  children,
  dismissible,
  onDismiss,
  className,
}: AlertProps) {
  const Icon = iconMap[variant || 'info'];

  return (
    <div className={cn(alertVariants({ variant }), className)} role="alert">
      <Icon className={ALERT_ICON_CLASS} />
      <div className={ALERT_BODY_CLASS}>
        {title && <h3 className={ALERT_TITLE_CLASS}>{title}</h3>}
        <div className={ALERT_CONTENT_CLASS}>{children}</div>
      </div>
      {dismissible && onDismiss && (
        <button
          onClick={onDismiss}
          className={ALERT_DISMISS_BUTTON_CLASS}
          aria-label="Dismiss alert"
        >
          <X className={ALERT_DISMISS_ICON_CLASS} />
        </button>
      )}
    </div>
  );
}

export { alertVariants };
export type { AlertVariant } from './Alert.classes';
