import {
  forwardRef,
  createContext,
  useContext,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';
import { cn } from '../../../utils/cn';
import { type VariantProps } from 'class-variance-authority';
import { Minus, Plus } from 'lucide-react';
import {
  NUMBER_ACTION_CLASS,
  NUMBER_DISPLAY_EXTRA_CLASS,
  NUMBER_DISPLAY_MAX_CLASS,
  NUMBER_DISPLAY_ROOT_CLASS,
  NUMBER_DISPLAY_SEP_CLASS,
  NUMBER_DISPLAY_VALUE_CLASS,
  NUMBER_INPUT_BASE_CLASS,
  NUMBER_INPUT_SIZE_CLASSES,
  buttonVariants,
  numberControlButtonVariants,
  numberControlVariants,
  type NumberControlSize,
  type NumberControlVariant,
} from './NumberControl.classes';

interface NumberControlContextValue {
  variant?: NumberControlVariant | null;
}
const NumberControlContext = createContext<NumberControlContextValue>({});
export const useNumberControlContext = () => useContext(NumberControlContext);

export interface NumberControlProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof numberControlVariants> {}

const NumberControlRoot = forwardRef<HTMLDivElement, NumberControlProps>(
  ({ className, variant, children, ...props }, ref) => (
    <NumberControlContext.Provider value={{ variant: variant ?? 'default' }}>
      <div
        ref={ref}
        className={cn(numberControlVariants({ variant }), className)}
        {...props}
      >
        {children}
      </div>
    </NumberControlContext.Provider>
  ),
);

export interface NumberControlButtonProps
  extends HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof numberControlButtonVariants> {
  value?: number;
  onClick?: () => void;
  disabled?: boolean;
  icon?: ReactNode;
}

const NumberControlButton = forwardRef<HTMLButtonElement, NumberControlButtonProps>(
  ({ className, intent, size, value, onClick, disabled, icon, children, ...props }, ref) => {
    const defaultIcon = intent === 'decrease' ? <Minus size={16} /> : <Plus size={16} />;
    return (
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={cn(numberControlButtonVariants({ intent, size }), className)}
        title={value ? `${value > 0 ? '+' : ''}${value}` : undefined}
        {...props}
      >
        {children ?? icon ?? defaultIcon}
      </button>
    );
  },
);

export interface NumberControlInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  inputSize?: NumberControlSize;
}

const NumberControlInput = forwardRef<HTMLInputElement, NumberControlInputProps>(
  ({ className, inputSize = 'md', ...props }, ref) => (
    <input
      ref={ref}
      type="number"
      className={cn(NUMBER_INPUT_BASE_CLASS, NUMBER_INPUT_SIZE_CLASSES[inputSize], className)}
      {...props}
    />
  ),
);

export interface NumberControlActionProps extends HTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
}

const NumberControlAction = forwardRef<HTMLButtonElement, NumberControlActionProps>(
  ({ className, disabled, children, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      disabled={disabled}
      className={cn(NUMBER_ACTION_CLASS, className)}
      {...props}
    >
      {children ?? 'Apply'}
    </button>
  ),
);

export interface NumberControlDisplayProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  extra?: number;
  extraLabel?: string;
}

const NumberControlDisplay = forwardRef<HTMLDivElement, NumberControlDisplayProps>(
  ({ className, value, max, extra, extraLabel = 'temp', ...props }, ref) => (
    <div ref={ref} className={cn(NUMBER_DISPLAY_ROOT_CLASS, className)} {...props}>
      <span className={NUMBER_DISPLAY_VALUE_CLASS}>{value}</span>
      {max !== undefined && (
        <>
          <span className={NUMBER_DISPLAY_SEP_CLASS}>/</span>
          <span className={NUMBER_DISPLAY_MAX_CLASS}>{max}</span>
        </>
      )}
      {extra !== undefined && extra > 0 && (
        <span className={NUMBER_DISPLAY_EXTRA_CLASS}>
          (+{extra} {extraLabel})
        </span>
      )}
    </div>
  ),
);

NumberControlRoot.displayName = 'NumberControl';
NumberControlButton.displayName = 'NumberControl.Button';
NumberControlInput.displayName = 'NumberControl.Input';
NumberControlAction.displayName = 'NumberControl.Action';
NumberControlDisplay.displayName = 'NumberControl.Display';

export const NumberControl = Object.assign(NumberControlRoot, {
  Button: NumberControlButton,
  Input: NumberControlInput,
  Action: NumberControlAction,
  Display: NumberControlDisplay,
});

export { numberControlVariants, buttonVariants };
export type {
  NumberControlVariant,
  NumberControlButtonIntent,
  NumberControlSize,
} from './NumberControl.classes';
