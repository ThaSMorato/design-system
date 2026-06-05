import {
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
  useEffect,
  useCallback,
} from 'react';
import { cn } from '../../utils/cn';
import { type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import {
  MODAL_BACKDROP_CLASS,
  MODAL_BACKDROP_WRAPPER_CLASS,
  MODAL_BODY_CLASS,
  MODAL_FOOTER_CLASS,
  MODAL_HEADER_CLASS,
  MODAL_HEADER_CLOSE_BUTTON_CLASS,
  MODAL_HEADER_TITLE_CLASS,
  MODAL_POSITIONING_CLASS,
  modalVariants,
} from './Modal.classes';

export interface ModalProps extends VariantProps<typeof modalVariants> {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
}

const ModalRoot = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      isOpen,
      onClose,
      size,
      children,
      className,
      closeOnBackdrop = true,
      closeOnEscape = true,
    },
    ref,
  ) => {
    const handleEscape = useCallback(
      (e: KeyboardEvent) => {
        if (closeOnEscape && e.key === 'Escape') onClose();
      },
      [closeOnEscape, onClose],
    );

    const handleBackdropClick = useCallback(
      (e: React.MouseEvent) => {
        if (closeOnBackdrop && e.target === e.currentTarget) onClose();
      },
      [closeOnBackdrop, onClose],
    );

    useEffect(() => {
      if (isOpen) {
        document.addEventListener('keydown', handleEscape);
        document.body.style.overflow = 'hidden';
      }
      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = '';
      };
    }, [isOpen, handleEscape]);

    if (!isOpen) return null;

    return (
      <div className={MODAL_BACKDROP_WRAPPER_CLASS} role="dialog" aria-modal="true">
        <div className={MODAL_BACKDROP_CLASS} onClick={handleBackdropClick} />
        <div className={MODAL_POSITIONING_CLASS} onClick={handleBackdropClick}>
          <div
            ref={ref}
            className={cn(modalVariants({ size }), className)}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>
      </div>
    );
  },
);

export interface ModalHeaderProps extends HTMLAttributes<HTMLDivElement> {
  onClose?: () => void;
  showCloseButton?: boolean;
}

const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ className, children, onClose, showCloseButton = true, ...props }, ref) => (
    <div ref={ref} className={cn(MODAL_HEADER_CLASS, className)} {...props}>
      <div className={MODAL_HEADER_TITLE_CLASS}>{children}</div>
      {showCloseButton && onClose && (
        <button
          onClick={onClose}
          className={MODAL_HEADER_CLOSE_BUTTON_CLASS}
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  ),
);

const ModalBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn(MODAL_BODY_CLASS, className)} {...props} />
  ),
);

const ModalFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn(MODAL_FOOTER_CLASS, className)} {...props} />
  ),
);

ModalRoot.displayName = 'Modal';
ModalHeader.displayName = 'Modal.Header';
ModalBody.displayName = 'Modal.Body';
ModalFooter.displayName = 'Modal.Footer';

export const Modal = Object.assign(ModalRoot, {
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
});

export { modalVariants };
export type { ModalSize } from './Modal.classes';
