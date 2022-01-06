export type ThemeVariants =
  | "primary"
  | "secondary"
  | "tertiary"
  | "warning"
  | "danger"
  | "success"
  | "info"
  | "muted"
  | "light";

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
