export interface ThemeContextValue {
  isDark: boolean;
  toggle: () => void;
  setDark: (dark: boolean) => void;
}
