type theme = 'dark' | 'light';

export type ThemeState = {
  theme: theme;
};

export type ThemeAction = {
  setTheme: (theme: ThemeState['theme']) => void;
};
