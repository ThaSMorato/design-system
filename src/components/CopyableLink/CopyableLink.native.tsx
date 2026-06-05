/**
 * React Native variant of CopyableLink.
 *
 * Browser `navigator.clipboard` and `navigator.share` don't exist on
 * native. Consumers wire in @react-native-clipboard/clipboard and
 * react-native's Share via the `onCopy`/`onShare` props. The component
 * just orchestrates the press → "copied" feedback state and renders the
 * copy/share icons through render-props (so this DS does not depend on
 * lucide-react-native or the clipboard package directly).
 */
// @ts-expect-error — `react-native` is not installed in this workspace yet.
import { View, Text, Pressable } from 'react-native';
// @ts-expect-error — `nativewind` is not installed in this workspace yet.
import { styled } from 'nativewind';
import { forwardRef, useState, type ReactNode } from 'react';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import {
  COPY_BUTTON_BASE_CLASS,
  COPY_BUTTON_SIZE_CLASSES,
  COPY_CHECK_ICON_COLOR_CLASS,
  COPY_ICON_SIZE_CLASSES,
  COPY_INPUT_BASE_CLASS,
  COPY_INPUT_SIZE_CLASSES,
  copyableLinkVariants,
  type CopyableLinkSize,
} from './CopyableLink.classes';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledPressable = styled(Pressable);

export interface CopyableLinkProps extends VariantProps<typeof copyableLinkVariants> {
  value: string;
  label?: string;
  /** Called when the copy button is pressed. Consumer wires the clipboard write. */
  onCopy: (value: string) => void | Promise<void>;
  /** Called when the share button is pressed. Consumer wires `Share.share()`. */
  onShare?: (value: string) => void | Promise<void>;
  /** Show the share button. */
  showShare?: boolean;
  /** Duration to show "copied" state in ms */
  copiedDuration?: number;
  className?: string;
  renderCopyIcon?: (className: string) => ReactNode;
  renderCheckIcon?: (className: string) => ReactNode;
  renderShareIcon?: (className: string) => ReactNode;
}

export const CopyableLink = forwardRef<View, CopyableLinkProps>(
  (
    {
      className,
      variant,
      size = 'md',
      value,
      label,
      onCopy,
      onShare,
      showShare = true,
      copiedDuration = 2000,
      renderCopyIcon,
      renderCheckIcon,
      renderShareIcon,
    },
    ref,
  ) => {
    const [copied, setCopied] = useState(false);
    const sizeKey = (size || 'md') as CopyableLinkSize;

    const handleCopy = async () => {
      try {
        await onCopy(value);
        setCopied(true);
        setTimeout(() => setCopied(false), copiedDuration);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    };

    return (
      <StyledView
        ref={ref}
        className={cn(copyableLinkVariants({ variant, size }), className)}
      >
        <StyledText
          numberOfLines={1}
          className={cn(COPY_INPUT_BASE_CLASS, COPY_INPUT_SIZE_CLASSES[sizeKey])}
        >
          {label || value}
        </StyledText>
        <StyledPressable
          accessibilityRole="button"
          accessibilityLabel={copied ? 'Copied' : 'Copy to clipboard'}
          onPress={handleCopy}
          className={cn(COPY_BUTTON_BASE_CLASS, COPY_BUTTON_SIZE_CLASSES[sizeKey])}
        >
          {copied
            ? renderCheckIcon?.(cn(COPY_ICON_SIZE_CLASSES[sizeKey], COPY_CHECK_ICON_COLOR_CLASS))
            : renderCopyIcon?.(COPY_ICON_SIZE_CLASSES[sizeKey])}
        </StyledPressable>
        {showShare && onShare ? (
          <StyledPressable
            accessibilityRole="button"
            accessibilityLabel="Share"
            onPress={() => onShare(value)}
            className={cn(COPY_BUTTON_BASE_CLASS, COPY_BUTTON_SIZE_CLASSES[sizeKey])}
          >
            {renderShareIcon?.(COPY_ICON_SIZE_CLASSES[sizeKey])}
          </StyledPressable>
        ) : null}
      </StyledView>
    );
  },
);

CopyableLink.displayName = 'CopyableLink.native';
