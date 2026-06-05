import { cva } from 'class-variance-authority';

export const wizardStepVariants = cva('flex flex-col', {
  variants: {
    variant: {
      default: 'space-y-6',
      compact: 'space-y-4',
    },
  },
  defaultVariants: { variant: 'default' },
});

export type WizardStepVariant = 'default' | 'compact';
export type WizardStepFooterAlign = 'start' | 'end' | 'between' | 'center';

export const WIZARD_HEADER_ROOT_CLASS = 'space-y-2';
export const WIZARD_HEADER_ROW_CLASS = 'flex items-center gap-3';
export const WIZARD_HEADER_ICON_CLASS =
  'flex h-10 w-10 items-center justify-center rounded-lg bg-primary-900/30 text-primary-400';
export const WIZARD_HEADER_STEPNUM_CLASS = 'text-sm font-medium text-dark-400';
export const WIZARD_HEADER_TITLE_CLASS = 'text-xl font-semibold text-dark-100';
export const WIZARD_HEADER_DESC_CLASS = 'mt-1 text-dark-400';

export const WIZARD_CONTENT_CLASS = 'flex-1';
export const WIZARD_SECTION_ROOT_CLASS = 'space-y-3';
export const WIZARD_SECTION_LABEL_CLASS = 'block text-sm font-medium text-dark-300';
export const WIZARD_SECTION_REQUIRED_CLASS = 'text-accent-crimson ml-1';

export const WIZARD_GRID_BASE_CLASS = 'grid gap-3';

export const WIZARD_FOOTER_BASE_CLASS = 'flex items-center gap-3 pt-4 border-t border-dark-700';
export const WIZARD_FOOTER_ALIGN_CLASSES: Record<WizardStepFooterAlign, string> = {
  start: 'justify-start',
  end: 'justify-end',
  between: 'justify-between',
  center: 'justify-center',
};

export const WIZARD_INFO_ROOT_CLASS =
  'rounded-lg border border-dark-700 bg-dark-800 overflow-hidden';
export const WIZARD_INFO_TITLE_WRAPPER_CLASS = 'border-b border-dark-700 px-4 py-3';
export const WIZARD_INFO_TITLE_CLASS = 'font-medium text-dark-100';
export const WIZARD_INFO_BODY_CLASS = 'p-4 space-y-2 text-sm text-dark-300';
