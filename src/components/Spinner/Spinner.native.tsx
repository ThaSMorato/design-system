/**
 * React Native variant of Spinner.
 *
 * Web renders a CSS-animated bordered div; native uses React Native's
 * built-in `ActivityIndicator`, which is the platform-correct OS spinner
 * (UIActivityIndicatorView on iOS, ProgressBar on Android). The Tailwind
 * size + color tokens are translated into ActivityIndicator props rather
 * than passed as className, because ActivityIndicator is a leaf primitive
 * that doesn't accept arbitrary layout classes.
 */
// @ts-expect-error — `react-native` is not installed in this workspace yet.
import { ActivityIndicator, type ActivityIndicatorProps } from 'react-native';
import type { SpinnerSize, SpinnerColor } from './Spinner.classes';

const SIZE_MAP: Record<SpinnerSize, number> = {
  xs: 12,
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
};

const COLOR_MAP: Record<SpinnerColor, string> = {
  primary: '#8b5cf6', // primary-500
  white: '#ffffff',
  current: '#ffffff',
};

export interface SpinnerProps
  extends Omit<ActivityIndicatorProps, 'size' | 'color'> {
  size?: SpinnerSize;
  color?: SpinnerColor;
}

export function Spinner({ size = 'md', color = 'current', ...props }: SpinnerProps) {
  return (
    <ActivityIndicator
      accessibilityLabel="Loading"
      size={SIZE_MAP[size]}
      color={COLOR_MAP[color]}
      {...props}
    />
  );
}
