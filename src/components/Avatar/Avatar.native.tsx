/**
 * React Native variant of Avatar (+ AvatarGroup).
 *
 * Web uses <div> + <img>; native uses <View> + RN's <Image>. The initial
 * letter renders through <Text>. Render-prop free — images are a first-
 * class RN primitive so the consumer just passes `src` like on web.
 */
// @ts-expect-error — `react-native` is not installed in this workspace yet.
import { View, Text, Image } from 'react-native';
// @ts-expect-error — `nativewind` is not installed in this workspace yet.
import { styled } from 'nativewind';
import { forwardRef, type ReactNode, useMemo } from 'react';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import {
  AVATAR_GROUP_CLASS,
  AVATAR_IMAGE_BASE,
  AVATAR_STATUS_BASE,
  avatarAutoColor,
  avatarStatusColor,
  avatarStatusSize,
  avatarVariants,
  type AvatarSize,
  type AvatarStatus,
} from './Avatar.classes';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

export interface AvatarProps extends VariantProps<typeof avatarVariants> {
  name?: string;
  children?: ReactNode;
  src?: string;
  autoColor?: boolean;
  status?: AvatarStatus;
  className?: string;
}

export const Avatar = forwardRef<View, AvatarProps>(
  (
    { className, size, shape, variant, name, children, src, autoColor = false, status },
    ref,
  ) => {
    const autoColorClass = useMemo(() => {
      if (autoColor && name) return avatarAutoColor(name);
      return null;
    }, [autoColor, name]);

    const displayContent = children ?? (name ? name.charAt(0).toUpperCase() : '?');

    return (
      <StyledView className="relative">
        <StyledView
          ref={ref}
          className={cn(
            avatarVariants({ size, shape, variant: autoColor ? undefined : variant }),
            autoColorClass,
            className,
          )}
        >
          {src ? (
            <StyledImage
              source={{ uri: src }}
              accessibilityLabel={name ?? 'Avatar'}
              className={cn(
                AVATAR_IMAGE_BASE,
                shape === 'circle' && 'rounded-full',
                shape === 'rounded' && 'rounded-lg',
              )}
            />
          ) : typeof displayContent === 'string' || typeof displayContent === 'number' ? (
            <StyledText className="text-inherit font-medium">{displayContent}</StyledText>
          ) : (
            displayContent
          )}
        </StyledView>
        {status ? (
          <StyledView
            className={cn(
              AVATAR_STATUS_BASE,
              avatarStatusColor(status),
              avatarStatusSize(size as AvatarSize | null | undefined),
            )}
          />
        ) : null}
      </StyledView>
    );
  },
);

Avatar.displayName = 'Avatar.native';

export interface AvatarGroupProps {
  max?: number;
  size?: AvatarSize;
  children?: ReactNode;
  className?: string;
}

export const AvatarGroup = forwardRef<View, AvatarGroupProps>(
  ({ className, max, size = 'md', children }, ref) => {
    const childArray = Array.isArray(children) ? children : [children];
    const visibleChildren = max ? childArray.slice(0, max) : childArray;
    const remaining = max ? childArray.length - max : 0;

    return (
      <StyledView ref={ref} className={cn(AVATAR_GROUP_CLASS, className)}>
        {visibleChildren}
        {remaining > 0 ? (
          <Avatar size={size} variant="default" className="z-10">
            +{remaining}
          </Avatar>
        ) : null}
      </StyledView>
    );
  },
);

AvatarGroup.displayName = 'AvatarGroup.native';
