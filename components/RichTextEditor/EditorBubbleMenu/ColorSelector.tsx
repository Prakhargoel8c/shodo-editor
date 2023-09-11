import { Editor } from '@tiptap/core';
import React, { FC } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { Check, ChevronDown } from 'lucide-react';

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
  const setColor = (color: string, name: string) => {
    editor.commands.unsetColor();
    name !== 'Default' &&
      editor
        .chain()
        .focus()
        .setColor(color || '')
        .run();
    setIsOpen(false);
  };
  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <div className="relative h-full">
        <Popover.Trigger className="flex h-full items-center gap-1 p-2 text-sm font-medium text-stone-600 hover:bg-stone-100 active:bg-stone-200">
          <span className="rounded-sm px-1" style={{ color: activeColorItem?.color }}>
            A
          </span>
          <ChevronDown className="h-4 w-4" />
        </Popover.Trigger>
        <Popover.Content
          align="start"
          className="z-50 my-1 flex max-h-80 w-48 flex-col overflow-hidden overflow-y-auto rounded border border-stone-200 bg-white p-1 shadow-xl animate-in fade-in slide-in-from-top-1"
        >
          <div className="my-1 px-2 text-sm text-stone-500">Color</div>
          {TEXT_COLORS.map(({ name, color }, index) => (
            <button
              key={index}
              onClick={() => setColor(color, name)}
              className="flex items-center justify-between rounded-sm px-2 py-1 text-sm text-stone-600 hover:bg-stone-100"
              type="button"
            >
              <div className="flex items-center space-x-2">
                <div className="rounded-sm border border-stone-200 px-1 py-px font-medium" style={{ color }}>
                  A
                </div>
                <span>{name}</span>
              </div>
              {editor.isActive('textStyle', { color }) && <Check className="h-4 w-4" />}
            </button>
          ))}
        </Popover.Content>
      </div>
    </Popover.Root>
  );
};
