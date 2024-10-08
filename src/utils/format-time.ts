import { format, getTime, formatDistanceToNow } from "date-fns";

// ----------------------------------------------------------------------

export function fDate(
  date: Date | string | number,
  newFormat?: string
): string {
  const fm = newFormat || "dd MMM yyyy";
  return date ? format(new Date(date), fm) : "";
}

export function fDateTime(
  date: Date | string | number,
  newFormat?: string
): string {
  const fm = newFormat || "dd MMM yyyy p";
  return date ? format(new Date(date), fm) : "";
}

export function fTimestamp(date: Date | string | number): number | "" {
  return date ? getTime(new Date(date)) : "";
}

export function fToNow(date: Date | string | number): string {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : "";
}

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};
