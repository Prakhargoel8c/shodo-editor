'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import { Analytics } from '@vercel/analytics/react';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" value={{ light: 'light-theme', dark: 'dark-theme' }}>
      {children}
      <Analytics />
    </ThemeProvider>
  );
}
