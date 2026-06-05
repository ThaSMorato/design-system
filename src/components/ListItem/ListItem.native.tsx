/**
 * React Native variant of ListItem (compound).
 *
 * The web `as` prop ('div' | 'button' | 'a') has no direct native analog —
 * on native, pressable list items should wrap with Pressable explicitly.
 * The native `interactive` variant is purely visual; consumers wire press
 * handlers on the root or any inner part.
 */
// @ts-expect-error — `react-native` is not installed in this workspace yet.
import { View, Text, type ViewProps } from 'react-native';
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

const StyledView = styled(View);
const StyledText = styled(Text);

interface ListItemContextValue {
  variant?: ListItemVariant | null;
}
const ListItemContext = createContext<ListItemContextValue>({});
export const useListItemContext = () => useContext(ListItemContext);

export interface ListItemProps extends VariantProps<typeof listItemVariants> {
  className?: string;
  children?: ReactNode;
}

const ListItemRoot = forwardRef<View, ListItemProps>(
  ({ className, variant, children }, ref) => (
    <ListItemContext.Provider value={{ variant: variant ?? 'default' }}>
      <StyledView ref={ref} className={cn(listItemVariants({ variant }), className)}>
        {children}
      </StyledView>
    </ListItemContext.Provider>
  ),
);

const makeSection = (baseClass: string, displayName: string) => {
  const Comp = forwardRef<View, ViewProps & { className?: string; children?: ReactNode }>(
    ({ className, children, ...props }, ref) => (
      <StyledView ref={ref} className={cn(baseClass, className)} {...props}>
        {children}
      </StyledView>
    ),
  );
  Comp.displayName = displayName;
  return Comp;
};

const makeText = (baseClass: string, displayName: string) => {
  const Comp = forwardRef<Text, { className?: string; children?: ReactNode }>(
    ({ className, children }, ref) => (
      <StyledText ref={ref} className={cn(baseClass, className)}>
        {children}
      </StyledText>
    ),
  );
  Comp.displayName = displayName;
  return Comp;
};

export const ListItemLeading = makeSection(LIST_ITEM_LEADING_CLASS, 'ListItem.Leading.native');
export const ListItemContent = makeSection(LIST_ITEM_CONTENT_CLASS, 'ListItem.Content.native');
export const ListItemTitle = makeText(LIST_ITEM_TITLE_CLASS, 'ListItem.Title.native');
export const ListItemSubtitle = makeText(LIST_ITEM_SUBTITLE_CLASS, 'ListItem.Subtitle.native');
export const ListItemMeta = makeSection(LIST_ITEM_META_CLASS, 'ListItem.Meta.native');
export const ListItemActions = makeSection(LIST_ITEM_ACTIONS_CLASS, 'ListItem.Actions.native');

const ListItemSeparator = forwardRef<View, { className?: string }>(({ className }, ref) => (
  <StyledView ref={ref} className={cn(LIST_ITEM_SEPARATOR_CLASS, className)} />
));
ListItemSeparator.displayName = 'ListItem.Separator.native';

ListItemRoot.displayName = 'ListItem.native';

export const ListItem = Object.assign(ListItemRoot, {
  Leading: ListItemLeading,
  Content: ListItemContent,
  Title: ListItemTitle,
  Subtitle: ListItemSubtitle,
  Meta: ListItemMeta,
  Actions: ListItemActions,
  Separator: ListItemSeparator,
});

export type ListItemLeadingProps = ViewProps & { className?: string; children?: ReactNode };
export type ListItemContentProps = ListItemLeadingProps;
export type ListItemTitleProps = { className?: string; children?: ReactNode };
export type ListItemSubtitleProps = ListItemTitleProps;
export type ListItemMetaProps = ListItemLeadingProps;
export type ListItemActionsProps = ListItemLeadingProps;
