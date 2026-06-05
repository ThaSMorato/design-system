import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';
import { type VariantProps } from 'class-variance-authority';
import { overlayVariants } from './Overlay.classes';

export interface OverlayProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof overlayVariants> {}

export const Overlay = forwardRef<HTMLDivElement, OverlayProps>(
  ({ className, tone, depth, center, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(overlayVariants({ tone, depth, center }), className)}
      {...props}
    />
  )
);

Overlay.displayName = 'Overlay';

export { overlayVariants };
export type { OverlayTone, OverlayDepth } from './Overlay.classes';
