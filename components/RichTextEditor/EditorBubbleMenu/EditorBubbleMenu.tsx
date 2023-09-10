import React, { FC } from 'react';
import { BubbleMenu, BubbleMenuProps, isNodeSelection } from '@tiptap/react';
import { BoldIcon, ItalicIcon, UnderlineIcon, StrikethroughIcon, CodeIcon, LucideIcon } from 'lucide-react';

export interface BubbleMenuItem {
  name: string;
  isActive: () => boolean | undefined;
  command: () => void;
  icon: LucideIcon;
}

type EditorBubbleMenuProps = Omit<BubbleMenuProps, 'children'>;

export const EditorBubbleMenu: FC<EditorBubbleMenuProps> = (props) => {
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
      moveTransition: 'transform 0.15s ease-out',
    },
  };
  return (
    <BubbleMenu className="flex w-fit divide-x divide-stone-200 rounded border border-stone-200 bg-white shadow-xl" {...bubbleMenuProps}>
      <></>
    </BubbleMenu>
  );
};
