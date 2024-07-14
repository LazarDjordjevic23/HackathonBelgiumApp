import { create } from 'zustand';
import { ThemeAction, ThemeState } from './types';
import {
  retriveFromLocalStorage,
  setLocalStorage,
} from '@/services/localStorage';
import { devtools } from 'zustand/middleware';

export const APP_THEME: string = 'APP_THEME';
const storedTheme: ThemeState['theme'] =
  retriveFromLocalStorage(APP_THEME) || 'dark';

export const useThemeStore = create<ThemeState & ThemeAction>()(
  devtools((set) => ({
    // TODO: only add this on DEVELOP ENV (use ENV variable)
    theme: storedTheme, // TODO: do same process for other stores
    setTheme: (theme) => {
      set({ theme });
      setLocalStorage(APP_THEME, theme);
    },
  })),
);
