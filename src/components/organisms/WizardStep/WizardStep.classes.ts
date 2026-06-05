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
// The icon container is an IconBox atom (shape="rounded", size sm) — only the
// color treatment stays here.
export const WIZARD_HEADER_ICON_COLOR_CLASS = 'bg-primary-900/30 text-primary-400';
export const WIZARD_HEADER_STEPNUM_CLASS = 'text-sm font-medium text-dark-400';
// Title/description typography comes from the Heading and Text atoms.

export const WIZARD_CONTENT_CLASS = 'flex-1';
export const WIZARD_SECTION_ROOT_CLASS = 'space-y-3';
// Section labels are rendered with the Label atom (tone="muted").

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
// InfoPanel titles use the Heading atom (size="inherit", weight="medium").
export const WIZARD_INFO_BODY_CLASS = 'p-4 space-y-2 text-sm text-dark-300';
