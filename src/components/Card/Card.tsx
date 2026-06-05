import {
  forwardRef,
  type HTMLAttributes,
  createContext,
  useContext,
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

interface CardContextValue {
  variant?: CardVariant | null;
}

const CardContext = createContext<CardContextValue>({});

export const useCardContext = () => useContext(CardContext);

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const CardRoot = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, children, ...props }, ref) => {
    return (
      <CardContext.Provider value={{ variant: variant ?? 'default' }}>
        <div
          ref={ref}
          className={cn(cardVariants({ variant }), className)}
          {...props}
        >
          {children}
        </div>
      </CardContext.Provider>
    );
  }
);

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  noBorder?: boolean;
}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, noBorder, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(CARD_HEADER_BASE_CLASS, !noBorder && CARD_HEADER_BORDER_CLASS, className)}
      {...props}
    />
  )
);

const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn(CARD_TITLE_CLASS, className)} {...props} />
  )
);

const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn(CARD_DESCRIPTION_CLASS, className)} {...props} />
  )
);

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn(CARD_CONTENT_CLASS, className)} {...props} />
  )
);

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  noBorder?: boolean;
}

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, noBorder, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(CARD_FOOTER_BASE_CLASS, !noBorder && CARD_FOOTER_BORDER_CLASS, className)}
      {...props}
    />
  )
);

CardRoot.displayName = 'Card';
CardHeader.displayName = 'Card.Header';
CardTitle.displayName = 'Card.Title';
CardDescription.displayName = 'Card.Description';
CardContent.displayName = 'Card.Content';
CardFooter.displayName = 'Card.Footer';

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
  Footer: CardFooter,
});

export { cardVariants };
export type { CardVariant } from './Card.classes';
