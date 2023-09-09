'use client';

import React from 'react';
import { Check, Menu as MenuIcon, Monitor, Moon, SunDim } from 'lucide-react';
import { useTheme } from 'next-themes';

const appearances = [
  {
    theme: 'System',
    icon: <Monitor className="h-4 w-4" />,
  },
  {
    theme: 'Light',
    icon: <SunDim className="h-4 w-4" />,
  },
  {
    theme: 'Dark',
    icon: <Moon className="h-4 w-4" />,
  },
];

export const ThemeMenu = () => {
  const { theme: currentTheme, setTheme } = useTheme();

  return <div></div>;
};
