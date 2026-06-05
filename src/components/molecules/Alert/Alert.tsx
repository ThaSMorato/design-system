import {
  createContext,
  forwardRef,
  useContext,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { cn } from '../../../utils/cn';
import { type VariantProps } from 'class-variance-authority';
import { Info, CheckCircle, AlertTriangle, XCircle, X } from 'lucide-react';
import { IconButton } from '../../atoms/IconButton';
import {
  ALERT_BODY_CLASS,
  ALERT_CONTENT_CLASS,
  ALERT_DISMISS_ICON_CLASS,
  ALERT_ICON_CLASS,
  ALERT_TITLE_CLASS,
  alertVariants,
  type AlertVariant,
} from './Alert.classes';

const iconMap = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
};

interface AlertContextValue {
  variant: AlertVariant;
}

const AlertContext = createContext<AlertContextValue>({ variant: 'info' });
export const useAlertContext = () => useContext(AlertContext);

export interface AlertProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {}

const AlertRoot = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'info', children, ...props }, ref) => (
    <AlertContext.Provider value={{ variant: (variant ?? 'info') as AlertVariant }}>
      <div
        ref={ref}
        className={cn(alertVariants({ variant }), className)}
        role="alert"
        {...props}
      >
        {children}
      </div>
    </AlertContext.Provider>
  )
);

export interface AlertIconProps extends HTMLAttributes<HTMLDivElement> {
  /** Custom icon — when omitted, the variant's semantic icon is rendered. */
  children?: ReactNode;
}

const AlertIcon = ({ className, children, ...props }: AlertIconProps) => {
  const { variant } = useAlertContext();
  if (children) {
    return (
      <div className={cn(ALERT_ICON_CLASS, className)} {...props}>
        {children}
      </div>
    );
  }
  const Icon = iconMap[variant];
  return <Icon className={cn(ALERT_ICON_CLASS, className)} />;
};

export interface AlertBodyProps extends HTMLAttributes<HTMLDivElement> {}

const AlertBody = forwardRef<HTMLDivElement, AlertBodyProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn(ALERT_BODY_CLASS, className)} {...props} />
  )
);

export interface AlertTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

const AlertTitle = forwardRef<HTMLHeadingElement, AlertTitleProps>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn(ALERT_TITLE_CLASS, className)} {...props} />
  )
);

export interface AlertDescriptionProps extends HTMLAttributes<HTMLDivElement> {}

const AlertDescription = forwardRef<HTMLDivElement, AlertDescriptionProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn(ALERT_CONTENT_CLASS, className)} {...props} />
  )
);

export interface AlertDismissProps {
  onDismiss: () => void;
  className?: string;
}

const AlertDismiss = ({ onDismiss, className }: AlertDismissProps) => (
  <IconButton
    aria-label="Dismiss alert"
    variant="fade"
    shape="square"
    size="sm"
    className={cn('shrink-0', className)}
    onClick={onDismiss}
  >
    <X className={ALERT_DISMISS_ICON_CLASS} />
  </IconButton>
);

AlertRoot.displayName = 'Alert';
AlertIcon.displayName = 'Alert.Icon';
AlertBody.displayName = 'Alert.Body';
AlertTitle.displayName = 'Alert.Title';
AlertDescription.displayName = 'Alert.Description';
AlertDismiss.displayName = 'Alert.Dismiss';

export const Alert = Object.assign(AlertRoot, {
  Icon: AlertIcon,
  Body: AlertBody,
  Title: AlertTitle,
  Description: AlertDescription,
  Dismiss: AlertDismiss,
});

export { alertVariants };
export type { AlertVariant } from './Alert.classes';
