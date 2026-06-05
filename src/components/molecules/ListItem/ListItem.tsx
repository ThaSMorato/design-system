import {
  forwardRef,
  createContext,
  useContext,
  type HTMLAttributes,
} from 'react';
import { cn } from '../../../utils/cn';
import { type VariantProps } from 'class-variance-authority';
import {
  LIST_ITEM_ACTIONS_CLASS,
  LIST_ITEM_CONTENT_CLASS,
  LIST_ITEM_LEADING_CLASS,
  LIST_ITEM_META_CLASS,
  LIST_ITEM_SEPARATOR_CLASS,
  LIST_ITEM_SUBTITLE_CLASS,
  LIST_ITEM_TITLE_CLASS,
  listItemVariants,
  type ListItemVariant,
} from './ListItem.classes';

interface ListItemContextValue {
  variant?: ListItemVariant | null;
}

const ListItemContext = createContext<ListItemContextValue>({});
export const useListItemContext = () => useContext(ListItemContext);

export interface ListItemProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof listItemVariants> {
  as?: 'div' | 'button' | 'a';
  href?: string;
}

const ListItemRoot = forwardRef<HTMLDivElement, ListItemProps>(
  ({ className, variant, as = 'div', href, children, ...props }, ref) => {
    const Component = as as React.ElementType;
    return (
      <ListItemContext.Provider value={{ variant: variant ?? 'default' }}>
        <Component
          ref={ref}
          className={cn(listItemVariants({ variant }), className)}
          {...(as === 'a' ? { href } : {})}
          {...props}
        >
          {children}
        </Component>
      </ListItemContext.Provider>
    );
  }
);

export interface ListItemLeadingProps extends HTMLAttributes<HTMLDivElement> {}
const ListItemLeading = forwardRef<HTMLDivElement, ListItemLeadingProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn(LIST_ITEM_LEADING_CLASS, className)} {...props}>
      {children}
    </div>
  ),
);

export interface ListItemContentProps extends HTMLAttributes<HTMLDivElement> {}
const ListItemContent = forwardRef<HTMLDivElement, ListItemContentProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn(LIST_ITEM_CONTENT_CLASS, className)} {...props}>
      {children}
    </div>
  ),
);

export interface ListItemTitleProps extends HTMLAttributes<HTMLDivElement> {}
const ListItemTitle = forwardRef<HTMLDivElement, ListItemTitleProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn(LIST_ITEM_TITLE_CLASS, className)} {...props}>
      {children}
    </div>
  ),
);

export interface ListItemSubtitleProps extends HTMLAttributes<HTMLDivElement> {}
const ListItemSubtitle = forwardRef<HTMLDivElement, ListItemSubtitleProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn(LIST_ITEM_SUBTITLE_CLASS, className)} {...props}>
      {children}
    </div>
  ),
);

export interface ListItemMetaProps extends HTMLAttributes<HTMLDivElement> {}
const ListItemMeta = forwardRef<HTMLDivElement, ListItemMetaProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn(LIST_ITEM_META_CLASS, className)} {...props}>
      {children}
    </div>
  ),
);

export interface ListItemActionsProps extends HTMLAttributes<HTMLDivElement> {}
const ListItemActions = forwardRef<HTMLDivElement, ListItemActionsProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn(LIST_ITEM_ACTIONS_CLASS, className)} {...props}>
      {children}
    </div>
  ),
);

export interface ListItemSeparatorProps extends HTMLAttributes<HTMLDivElement> {}
const ListItemSeparator = forwardRef<HTMLDivElement, ListItemSeparatorProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn(LIST_ITEM_SEPARATOR_CLASS, className)} {...props} />
  ),
);

ListItemRoot.displayName = 'ListItem';
ListItemLeading.displayName = 'ListItem.Leading';
ListItemContent.displayName = 'ListItem.Content';
ListItemTitle.displayName = 'ListItem.Title';
ListItemSubtitle.displayName = 'ListItem.Subtitle';
ListItemMeta.displayName = 'ListItem.Meta';
ListItemActions.displayName = 'ListItem.Actions';
ListItemSeparator.displayName = 'ListItem.Separator';

export const ListItem = Object.assign(ListItemRoot, {
  Leading: ListItemLeading,
  Content: ListItemContent,
  Title: ListItemTitle,
  Subtitle: ListItemSubtitle,
  Meta: ListItemMeta,
  Actions: ListItemActions,
  Separator: ListItemSeparator,
});

export { listItemVariants };
export type { ListItemVariant } from './ListItem.classes';
