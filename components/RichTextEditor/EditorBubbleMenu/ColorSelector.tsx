import { Editor } from '@tiptap/core';
import React, { FC } from 'react';

interface ColorSelectorProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  editor: Editor;
}

const TEXT_COLORS = [
  {
    name: 'Default',
    color: 'var(--novel-black)',
  },
  {
    name: 'Purple',
    color: '#9333EA',
  },
  {
    name: 'Red',
    color: '#E00000',
  },
  {
    name: 'Yellow',
    color: '#EAB308',
  },
  {
    name: 'Blue',
    color: '#2563EB',
  },
  {
    name: 'Green',
    color: '#008A00',
  },
  {
    name: 'Orange',
    color: '#FFA500',
  },
  {
    name: 'Pink',
    color: '#BA4081',
  },
  {
    name: 'Gray',
    color: '#A8A29E',
  },
] as const;

export const ColorSelector: FC<ColorSelectorProps> = ({ isOpen, setIsOpen, editor }) => {
  const activeColorItem = TEXT_COLORS.find(({ color }) => editor.isActive('textStyle', { color }));
  return <div></div>;
};
