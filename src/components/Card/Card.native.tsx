/**
 * React Native variant of Card (compound).
 *
 * Card.Root renders a View. Header/Footer also render Views. Title and
 * Description render Text. Content is a View so it can host arbitrary
 * children (text must be wrapped in Card.Description or Text by consumers).
 *
 * The interactive/fantasy variants on web use `cursor-pointer` and
 * `hover:*` — those are CSS-only utilities. For pressable cards on native,
 * wrap Card with your own Pressable (or compose Card with Button), since
 * tap behavior on the Card root would otherwise swallow nested button
 * presses.
 */
// @ts-expect-error — `react-native` is not installed in this workspace yet.
import { View, Text, type ViewProps, type TextProps } from 'react-native';
// @ts-expect-error — `nativewind` is not installed in this workspace yet.
import { styled } from 'nativewind';
import {
  forwardRef,
  createContext,
  useContext,
  type ReactNode,
} from 'react';
import { cn } from '../../utils/cn';
import { type VariantProps } from 'class-variance-authority';
import {
  CARD_CONTENT_CLASS,
  CARD_DESCRIPTION_CLASS,
  CARD_FOOTER_BASE_CLASS,
  CARD_FOOTER_BORDER_CLASS,
  CARD_HEADER_BASE_CLASS,
  CARD_HEADER_BORDER_CLASS,
  CARD_TITLE_CLASS,
  cardVariants,
  type CardVariant,
} from './Card.classes';

const StyledView = styled(View);
const StyledText = styled(Text);

const CardContext = createContext<{ variant?: CardVariant | null }>({});
export const useCardContext = () => useContext(CardContext);

export interface CardProps extends VariantProps<typeof cardVariants> {
  className?: string;
  children?: ReactNode;
}

const CardRoot = forwardRef<View, CardProps>(({ className, variant, children }, ref) => (
  <CardContext.Provider value={{ variant: variant ?? 'default' }}>
    <StyledView ref={ref} className={cn(cardVariants({ variant }), className)}>
      {children}
    </StyledView>
  </CardContext.Provider>
));

export interface CardHeaderProps {
  className?: string;
  children?: ReactNode;
  noBorder?: boolean;
}

const CardHeader = forwardRef<View, CardHeaderProps>(
  ({ className, noBorder, children }, ref) => (
    <StyledView
      ref={ref}
      className={cn(CARD_HEADER_BASE_CLASS, !noBorder && CARD_HEADER_BORDER_CLASS, className)}
    >
      {children}
    </StyledView>
  ),
);

const CardTitle = forwardRef<Text, TextProps & { className?: string }>(
  ({ className, children, ...props }, ref) => (
    <StyledText
      ref={ref}
      accessibilityRole="header"
      className={cn(CARD_TITLE_CLASS, className)}
      {...props}
    >
      {children}
    </StyledText>
  ),
);

const CardDescription = forwardRef<Text, TextProps & { className?: string }>(
  ({ className, children, ...props }, ref) => (
    <StyledText ref={ref} className={cn(CARD_DESCRIPTION_CLASS, className)} {...props}>
      {children}
    </StyledText>
  ),
);

const CardContent = forwardRef<View, ViewProps & { className?: string }>(
  ({ className, children, ...props }, ref) => (
    <StyledView ref={ref} className={cn(CARD_CONTENT_CLASS, className)} {...props}>
      {children}
    </StyledView>
  ),
);

export interface CardFooterProps {
  className?: string;
  children?: ReactNode;
  noBorder?: boolean;
}

const CardFooter = forwardRef<View, CardFooterProps>(
  ({ className, noBorder, children }, ref) => (
    <StyledView
      ref={ref}
      className={cn(CARD_FOOTER_BASE_CLASS, !noBorder && CARD_FOOTER_BORDER_CLASS, className)}
    >
      {children}
    </StyledView>
  ),
);

CardRoot.displayName = 'Card.native';
CardHeader.displayName = 'Card.Header.native';
CardTitle.displayName = 'Card.Title.native';
CardDescription.displayName = 'Card.Description.native';
CardContent.displayName = 'Card.Content.native';
CardFooter.displayName = 'Card.Footer.native';

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
  Footer: CardFooter,
});
