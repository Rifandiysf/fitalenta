export function blankToNull<T>(value: T | "" | null | undefined): T | null {
  return value === undefined || value === "" ? null : value;
}