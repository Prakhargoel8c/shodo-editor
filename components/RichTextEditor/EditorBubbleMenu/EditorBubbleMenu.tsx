'use client';
import React, { FC, useState } from 'react';
import { BubbleMenu, BubbleMenuProps, isNodeSelection } from '@tiptap/react';
import { BoldIcon, ItalicIcon, UnderlineIcon, StrikethroughIcon, CodeIcon, LucideIcon } from 'lucide-react';
import { NodeSelector } from './NodeSelector';
import { ColorSelector } from './ColorSelector';
import { cn } from '@/lib/utils';

export interface BubbleMenuItem {
  name: string;
  isActive: () => boolean | undefined;
  command: () => void;
  icon: LucideIcon;
}

type EditorBubbleMenuProps = Omit<BubbleMenuProps, 'children'>;

export const EditorBubbleMenu: FC<EditorBubbleMenuProps> = (props) => {
  const [openMenu, setOpenMenu] = useState<'link' | 'node' | 'color' | null>();
  const { editor } = props;
  const items: BubbleMenuItem[] = [
    {
      name: 'bold',
      isActive: () => editor?.isActive('bold'),
      command: () => editor?.chain().focus().toggleBold().run(),
      icon: BoldIcon,
    },
    {
      name: 'italic',
      isActive: () => editor?.isActive('italic'),
      command: () => editor?.chain().focus().toggleItalic().run(),
      icon: ItalicIcon,
    },
    {
      name: 'underline',
      isActive: () => editor?.isActive('underline'),
      command: () => editor?.chain().focus().toggleUnderline().run(),
      icon: UnderlineIcon,
    },
    {
      name: 'strike',
      isActive: () => editor?.isActive('strike'),
      command: () => editor?.chain().focus().toggleStrike().run(),
      icon: StrikethroughIcon,
    },
    {
      name: 'code',
      isActive: () => editor?.isActive('code'),
      command: () => editor?.chain().focus().toggleCode().run(),
      icon: CodeIcon,
    },
  ];
  const bubbleMenuProps: EditorBubbleMenuProps = {
    ...props,
    shouldShow: ({ state, editor }) => {
      const { selection } = state;
      const { empty } = selection;
      return empty || isNodeSelection(selection) ? false : true;
    },
    tippyOptions: {
      interactive: true,
      moveTransition: 'transform 0.15s ease-out',
      onHidden: () => setOpenMenu(undefined),
    },
  };
  if (!editor) return null;
  return (
    <BubbleMenu className="flex w-fit divide-x divide-stone-200 rounded border border-stone-200 bg-white shadow-xl" {...bubbleMenuProps}>
      <NodeSelector isOpen={openMenu === 'node'} setIsOpen={(open: boolean) => setOpenMenu('node')} editor={editor} />
      <ColorSelector isOpen={openMenu === 'color'} setIsOpen={(open: boolean) => setOpenMenu('color')} editor={editor} />
      <div className="flex">
        {items.map((item, index) => (
          <button key={index} onClick={item.command} className="p-2 text-stone-600 hover:bg-stone-100 active:bg-stone-200" type="button">
            <item.icon className={cn('h-4 w-4', { 'text-blue-500': item.isActive() })} />
          </button>
        ))}
      </div>
    </BubbleMenu>
  );
};
