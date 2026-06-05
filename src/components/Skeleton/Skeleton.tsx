import { cn } from '../../utils/cn';
import { type VariantProps } from 'class-variance-authority';
import { skeletonVariants } from './Skeleton.classes';

export interface SkeletonProps extends VariantProps<typeof skeletonVariants> {
  width?: string | number;
  height?: string | number;
  className?: string;
}

export function Skeleton({
  variant,
  width,
  height,
  className,
}: SkeletonProps) {
  const style: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  // For circles, make it square if only one dimension is provided
  if (variant === 'circle') {
    if (width && !height) style.height = style.width;
    if (height && !width) style.width = style.height;
  }

  return (
    <div
      className={cn(skeletonVariants({ variant }), className)}
      style={style}
    />
  );
}

export { skeletonVariants };
export type { SkeletonVariant } from './Skeleton.classes';
