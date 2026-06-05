/**
 * React Native variant of Skeleton.
 *
 * Web uses CSS `animate-pulse` (Tailwind). On native, NativeWind translates
 * `animate-pulse` to an opacity loop via the Animated API on RN ≥ recent
 * versions; on older versions consumers may want to swap in a dedicated
 * shimmer library. Width/height numeric props feed RN's style object
 * (numbers are interpreted as density-independent pixels).
 */
// @ts-expect-error — `react-native` is not installed in this workspace yet.
import { View, type ViewStyle } from 'react-native';
// @ts-expect-error — `nativewind` is not installed in this workspace yet.
import { styled } from 'nativewind';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { skeletonVariants } from './Skeleton.classes';

const StyledView = styled(View);

export interface SkeletonProps extends VariantProps<typeof skeletonVariants> {
  width?: number;
  height?: number;
  className?: string;
}

export function Skeleton({
  variant,
  width,
  height,
  className,
}: SkeletonProps) {
  const style: ViewStyle = {};
  if (width !== undefined) style.width = width;
  if (height !== undefined) style.height = height;

  if (variant === 'circle') {
    if (width !== undefined && height === undefined) style.height = width;
    if (height !== undefined && width === undefined) style.width = height;
  }

  return (
    <StyledView
      className={cn(skeletonVariants({ variant }), className)}
      style={style}
    />
  );
}
