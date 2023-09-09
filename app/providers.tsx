'use client';

import { Dispatch, ReactNode, SetStateAction, createContext } from 'react';
import { ThemeProvider, useTheme } from 'next-themes';
import { Analytics } from '@vercel/analytics/react';

export const AppContext = createContext<{
  font: string;
  setFont: Dispatch<SetStateAction<string>>;
}>({
  font: 'Default',
  setFont: () => {},
});

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" value={{ light: 'light-theme', dark: 'dark-theme' }}>
      {children}
      <Analytics />
    </ThemeProvider>
  );
}
