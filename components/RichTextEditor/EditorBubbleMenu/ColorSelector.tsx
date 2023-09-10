import { Editor } from '@tiptap/core';
import React, { FC } from 'react';

interface ColorSelectorProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  editor: Editor;
}

export const ColorSelector: FC<ColorSelectorProps> = ({ isOpen, setIsOpen, editor }) => {
  return <div></div>;
};
