import { forwardRef, useState, type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import { type VariantProps } from 'class-variance-authority';
import { Copy, Check, Share2 } from 'lucide-react';
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

export interface CopyableLinkProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'>,
    VariantProps<typeof copyableLinkVariants> {
  /** The value to copy */
  value: string;
  /** Optional display label (defaults to value) */
  label?: string;
  /** Callback when copied */
  onCopied?: () => void;
  /** Show share button if available */
  showShare?: boolean;
  /** Share title for native share */
  shareTitle?: string;
  /** Share text for native share */
  shareText?: string;
  /** Duration to show "copied" state in ms */
  copiedDuration?: number;
}

const CopyableLink = forwardRef<HTMLDivElement, CopyableLinkProps>(
  (
    {
      className,
      variant,
      size = 'md',
      value,
      label,
      onCopied,
      showShare = true,
      shareTitle,
      shareText,
      copiedDuration = 2000,
      ...props
    },
    ref
  ) => {
    const [copied, setCopied] = useState(false);
    const sizeKey = (size || 'md') as CopyableLinkSize;

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        onCopied?.();
        setTimeout(() => setCopied(false), copiedDuration);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    };

    const handleShare = async () => {
      if (navigator.share) {
        try {
          await navigator.share({ title: shareTitle, text: shareText, url: value });
        } catch (err) {
          if ((err as Error).name !== 'AbortError') {
            console.error('Share failed:', err);
          }
        }
      }
    };

    const canShare = typeof navigator !== 'undefined' && navigator.share;

    return (
      <div
        ref={ref}
        className={cn(copyableLinkVariants({ variant, size }), className)}
        {...props}
      >
        <div
          className={cn(COPY_INPUT_BASE_CLASS, COPY_INPUT_SIZE_CLASSES[sizeKey])}
          title={value}
        >
          {label || value}
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className={cn(COPY_BUTTON_BASE_CLASS, COPY_BUTTON_SIZE_CLASSES[sizeKey])}
          title={copied ? 'Copied!' : 'Copy to clipboard'}
        >
          {copied ? (
            <Check className={cn(COPY_ICON_SIZE_CLASSES[sizeKey], COPY_CHECK_ICON_COLOR_CLASS)} />
          ) : (
            <Copy className={COPY_ICON_SIZE_CLASSES[sizeKey]} />
          )}
        </button>
        {showShare && canShare && (
          <button
            type="button"
            onClick={handleShare}
            className={cn(COPY_BUTTON_BASE_CLASS, COPY_BUTTON_SIZE_CLASSES[sizeKey])}
            title="Share"
          >
            <Share2 className={COPY_ICON_SIZE_CLASSES[sizeKey]} />
          </button>
        )}
      </div>
    );
  }
);

CopyableLink.displayName = 'CopyableLink';

export { CopyableLink, copyableLinkVariants };
export type { CopyableLinkVariant, CopyableLinkSize } from './CopyableLink.classes';
