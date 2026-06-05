export const DANGER_ZONE_ROOT_CLASS =
  'rounded-lg border border-accent-crimson/30 bg-accent-crimson/10 p-4';
export const DANGER_ZONE_HEADER_CLASS = 'flex items-center gap-2 mb-3';
export const DANGER_ZONE_ICON_CLASS = 'h-5 w-5 text-accent-crimson';
// Title/description use the Heading (tone="danger") and Text atoms.
export const DANGER_ZONE_CONFIRM_ROW_CLASS = 'flex items-center gap-2';

// Confirm/cancel are standard Button atoms (variant="danger" / "secondary",
// size "sm"). The primary trigger is a ghost Button with this crimson-outline
// override applied via tailwind-merge.
export const DANGER_ZONE_PRIMARY_OVERRIDE_CLASS =
  'border border-accent-crimson/50 bg-dark-800 text-accent-crimson';
