import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';
import { type VariantProps } from 'class-variance-authority';
import { Copy, Check, Share2 } from 'lucide-react';
import { useClipboard } from '../../../hooks/use-clipboard';
import { useWebShare } from '../../../hooks/use-web-share';
import { IconButton } from '../../atoms/IconButton';
import {
  COPY_BUTTON_SIZES,
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
    const sizeKey = (size || 'md') as CopyableLinkSize;
    const { copied, copy } = useClipboard({
      timeout: copiedDuration,
      onCopy: onCopied,
    });
    const { canShare, share } = useWebShare();

    const handleCopy = () => copy(value);
    const handleShare = () =>
      share({ title: shareTitle, text: shareText, url: value });

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
        <IconButton
          aria-label={copied ? 'Copied!' : 'Copy to clipboard'}
          variant="outline"
          size={COPY_BUTTON_SIZES[sizeKey]}
          onClick={handleCopy}
          title={copied ? 'Copied!' : 'Copy to clipboard'}
        >
          {copied ? (
            <Check className={cn(COPY_ICON_SIZE_CLASSES[sizeKey], COPY_CHECK_ICON_COLOR_CLASS)} />
          ) : (
            <Copy className={COPY_ICON_SIZE_CLASSES[sizeKey]} />
          )}
        </IconButton>
        {showShare && canShare && (
          <IconButton
            aria-label="Share"
            variant="outline"
            size={COPY_BUTTON_SIZES[sizeKey]}
            onClick={handleShare}
            title="Share"
          >
            <Share2 className={COPY_ICON_SIZE_CLASSES[sizeKey]} />
          </IconButton>
        )}
      </div>
    );
  }
);

CopyableLink.displayName = 'CopyableLink';

export { CopyableLink, copyableLinkVariants };
export type { CopyableLinkVariant, CopyableLinkSize } from './CopyableLink.classes';
