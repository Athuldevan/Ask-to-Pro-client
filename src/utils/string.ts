import { capitalize as MUICapitalize } from "@mui/material";

export function capitalize(
  value?: string | null,
  fallback = "Not Added"
): string {
  if (!value) return fallback;
  return MUICapitalize(value);
}
