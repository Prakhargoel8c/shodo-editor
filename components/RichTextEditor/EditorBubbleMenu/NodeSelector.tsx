import { Editor } from '@tiptap/core';
import React, { Dispatch, SetStateAction } from 'react';
import { BubbleMenuItem } from './EditorBubbleMenu';
import { TextIcon, Heading1, Heading2, Heading3, CheckSquare, ListOrdered, TextQuote, Code } from 'lucide-react';

interface NodeSelectorProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  editor: Editor;
}

export const NodeSelector: React.FC<NodeSelectorProps> = ({ isOpen, setIsOpen, editor }) => {
  const items: BubbleMenuItem[] = [
    {
      name: 'Text',
      icon: TextIcon,
      command: () => editor.chain().focus().toggleNode('paragraph', 'paragraph').run(),
      isActive: () => editor.isActive('paragraph') && !editor.isActive('bulletList') && !editor.isActive('orderedList'),
    },
    {
      name: 'Heading 1',
      icon: Heading1,
      command: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => editor.isActive('heading', { level: 1 }),
    },
    {
      name: 'Heading 2',
      icon: Heading2,
      command: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor.isActive('heading', { level: 2 }),
    },
    {
      name: 'Heading 3',
      icon: Heading3,
      command: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: () => editor.isActive('heading', { level: 3 }),
    },
    {
      name: 'To-do List',
      icon: CheckSquare,
      command: () => editor.chain().focus().toggleTaskList().run(),
      isActive: () => editor.isActive('taskItem'),
    },
    {
      name: 'Bullet List',
      icon: ListOrdered,
      command: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive('bulletList'),
    },
    {
      name: 'Numbered List',
      icon: ListOrdered,
      command: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive('orderedList'),
    },
    {
      name: 'Quote',
      icon: TextQuote,
      command: () => editor.chain().focus().toggleNode('paragraph', 'paragraph').toggleBlockquote().run(),
      isActive: () => editor.isActive('blockquote'),
    },
    {
      name: 'Code',
      icon: Code,
      command: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: () => editor.isActive('codeBlock'),
    },
  ];
  return <div></div>;
};
