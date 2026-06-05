/** Formats an RPG ability modifier with an explicit sign, e.g. 2 → "+2", -1 → "-1". */
export function formatModifier(mod: number): string {
  return mod >= 0 ? `+${mod}` : `${mod}`;
}
