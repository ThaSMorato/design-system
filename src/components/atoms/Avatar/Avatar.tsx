import { forwardRef, type HTMLAttributes, type ReactNode, useMemo } from 'react';
import { cn } from '../../../utils/cn';
import { type VariantProps } from 'class-variance-authority';
import { Dot } from '../Dot';
import {
  AVATAR_IMAGE_BASE,
  AVATAR_STATUS_POSITION,
  avatarAutoColor,
  avatarStatusColor,
  avatarVariants,
  type AvatarSize,
  type AvatarStatus,
} from './Avatar.classes';

export interface AvatarProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'>,
    VariantProps<typeof avatarVariants> {
  /** Name to display (first letter will be shown) */
  name?: string;
  /** Custom content (overrides name) */
  children?: ReactNode;
  /** Image URL (if provided, shows image instead of initials) */
  src?: string;
  /** Alt text for image */
  alt?: string;
  /** Auto-assign color based on name */
  autoColor?: boolean;
  /** Online status indicator */
  status?: AvatarStatus;
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      className,
      size,
      shape,
      variant,
      name,
      children,
      src,
      alt,
      autoColor = false,
      status,
      ...props
    },
    ref
  ) => {
    const autoColorClass = useMemo(() => {
      if (autoColor && name) return avatarAutoColor(name);
      return null;
    }, [autoColor, name]);

    const displayContent = children ?? (name ? name.charAt(0).toUpperCase() : '?');

    return (
      <div className="relative inline-block">
        <div
          ref={ref}
          className={cn(
            avatarVariants({ size, shape, variant: autoColor ? undefined : variant }),
            autoColorClass,
            className
          )}
          {...props}
        >
          {src ? (
            <img
              src={src}
              alt={alt ?? name ?? 'Avatar'}
              className={cn(
                AVATAR_IMAGE_BASE,
                shape === 'circle' && 'rounded-full',
                shape === 'rounded' && 'rounded-lg'
              )}
            />
          ) : (
            displayContent
          )}
        </div>

        {status && (
          <Dot
            size={(size ?? 'md') as AvatarSize}
            className={cn(AVATAR_STATUS_POSITION, avatarStatusColor(status))}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

export { avatarVariants };
export type { AvatarSize, AvatarShape, AvatarStatus } from './Avatar.classes';
