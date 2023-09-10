import { Editor } from '@tiptap/core';
import React, { FC } from 'react';

interface LinkSelectorProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  editor: Editor;
}

export const LinkSelector: FC<LinkSelectorProps> = ({ isOpen, setIsOpen, editor }) => {
  return <div></div>;
};
