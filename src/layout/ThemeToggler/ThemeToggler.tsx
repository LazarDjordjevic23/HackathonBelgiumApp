import React from 'react';
import { useThemeStore } from '@/stores/theme';

export default function ThemeToggler() {
  const { theme, setTheme } = useThemeStore();

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  const themeIcon = theme === "dark" ? '🌝' : '🌚'
  
  return <div className='text-skin-primary text-[25px]' onClick={toggleTheme}>{themeIcon}</div>;
}
