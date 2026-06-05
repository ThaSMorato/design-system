import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';
import { Avatar, type AvatarSize } from '../../atoms/Avatar';
import { AVATAR_GROUP_CLASS } from './AvatarGroup.classes';

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Maximum avatars to show before +N indicator */
  max?: number;
  /** Size of avatars */
  size?: AvatarSize;
}

export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, max, size = 'md', children, ...props }, ref) => {
    const childArray = Array.isArray(children) ? children : [children];
    const visibleChildren = max ? childArray.slice(0, max) : childArray;
    const remaining = max ? childArray.length - max : 0;

    return (
      <div ref={ref} className={cn(AVATAR_GROUP_CLASS, className)} {...props}>
        {visibleChildren}
        {remaining > 0 && (
          <Avatar size={size} variant="default" className="z-10">
            +{remaining}
          </Avatar>
        )}
      </div>
    );
  }
);

AvatarGroup.displayName = 'AvatarGroup';
