/**
 * React Native variant of Modal (compound).
 *
 * Uses RN's built-in `<Modal>` primitive (not Radix Dialog). Backdrop is
 * an absolute-positioned Pressable that fires `onClose` on tap when
 * `closeOnBackdrop` is true. RN's Modal supports its own onRequestClose
 * (Android hardware back), which we wire to `onClose`. The web "escape
 * to close" has no equivalent — onRequestClose covers the analogous
 * platform-affordance.
 *
 * The X icon in `Modal.Header` is supplied via a render-prop.
 */
// @ts-expect-error — `react-native` is not installed in this workspace yet.
import { View, Text, Pressable, Modal as RNModal } from 'react-native';
// @ts-expect-error — `nativewind` is not installed in this workspace yet.
import { styled } from 'nativewind';
import { forwardRef, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { type VariantProps } from 'class-variance-authority';
import {
  MODAL_BACKDROP_CLASS,
  MODAL_BODY_CLASS,
  MODAL_FOOTER_CLASS,
  MODAL_HEADER_CLASS,
  MODAL_HEADER_CLOSE_BUTTON_CLASS,
  MODAL_HEADER_TITLE_CLASS,
  MODAL_POSITIONING_CLASS,
  modalVariants,
} from './Modal.classes';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledPressable = styled(Pressable);

export interface ModalProps extends VariantProps<typeof modalVariants> {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  closeOnBackdrop?: boolean;
}

const ModalRoot = forwardRef<View, ModalProps>(
  ({ isOpen, onClose, size, children, className, closeOnBackdrop = true }, ref) => (
    <RNModal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <StyledPressable
        accessibilityRole="button"
        accessibilityLabel="Close modal"
        onPress={closeOnBackdrop ? onClose : undefined}
        className={MODAL_BACKDROP_CLASS}
      />
      <StyledView className={MODAL_POSITIONING_CLASS} pointerEvents="box-none">
        <StyledView ref={ref} className={cn(modalVariants({ size }), className)}>
          {children}
        </StyledView>
      </StyledView>
    </RNModal>
  ),
);

export interface ModalHeaderProps {
  onClose?: () => void;
  showCloseButton?: boolean;
  className?: string;
  children?: ReactNode;
  renderCloseIcon?: (className: string) => ReactNode;
}

const ModalHeader = forwardRef<View, ModalHeaderProps>(
  ({ className, children, onClose, showCloseButton = true, renderCloseIcon }, ref) => (
    <StyledView ref={ref} className={cn(MODAL_HEADER_CLASS, className)}>
      <StyledText
        accessibilityRole="header"
        className={MODAL_HEADER_TITLE_CLASS}
      >
        {children}
      </StyledText>
      {showCloseButton && onClose ? (
        <StyledPressable
          accessibilityRole="button"
          accessibilityLabel="Close modal"
          onPress={onClose}
          className={MODAL_HEADER_CLOSE_BUTTON_CLASS}
        >
          {renderCloseIcon ? renderCloseIcon('h-5 w-5') : null}
        </StyledPressable>
      ) : null}
    </StyledView>
  ),
);

const ModalBody = forwardRef<View, { className?: string; children?: ReactNode }>(
  ({ className, children }, ref) => (
    <StyledView ref={ref} className={cn(MODAL_BODY_CLASS, className)}>
      {children}
    </StyledView>
  ),
);

const ModalFooter = forwardRef<View, { className?: string; children?: ReactNode }>(
  ({ className, children }, ref) => (
    <StyledView ref={ref} className={cn(MODAL_FOOTER_CLASS, className)}>
      {children}
    </StyledView>
  ),
);

ModalRoot.displayName = 'Modal.native';
ModalHeader.displayName = 'Modal.Header.native';
ModalBody.displayName = 'Modal.Body.native';
ModalFooter.displayName = 'Modal.Footer.native';

export const Modal = Object.assign(ModalRoot, {
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
});
