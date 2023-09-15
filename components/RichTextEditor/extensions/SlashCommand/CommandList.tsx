import { ReactNode, useState, useRef, useCallback, useEffect, useLayoutEffect } from 'react';
import { Editor, Range } from '@tiptap/core';
import { useExecuteCommand } from './useExecuteCommand';
import { LoadingCircle } from '@/ui/icons';

export interface CommandItemProps {
  title: string;
  description: string;
  icon: ReactNode;
}

const updateScrollView = (container: HTMLElement, item: HTMLElement) => {
  const containerHeight = container.offsetHeight;
  const itemHeight = item ? item.offsetHeight : 0;

  const top = item.offsetTop;
  const bottom = top + itemHeight;

  if (top < container.scrollTop) {
    container.scrollTop -= container.scrollTop - top + 5;
  } else if (bottom > containerHeight + container.scrollTop) {
    container.scrollTop += bottom - containerHeight - container.scrollTop + 5;
  }
};

export const CommandList = ({ items, command, editor, range }: { items: CommandItemProps[]; command: Function; editor: Editor; range: Range }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const commandListContainer = useRef<HTMLDivElement>(null);
  const { executeCommand, isLoading } = useExecuteCommand(command, editor, range);
  const selectItem = useCallback(
    (index: number) => {
      const item = items[index];
      if (!item) return;
      executeCommand(item);
    },
    [executeCommand, items]
  );

  useEffect(() => {
    const navigationKeys = ['ArrowUp', 'ArrowDown', 'Enter'];
    const onKeyDown = (e: KeyboardEvent) => {
      if (!navigationKeys.includes(e.key)) return;
      if (e.key === 'ArrowUp') setSelectedIndex((selectedIndex + items.length - 1) % items.length);
      else if (e.key === 'ArrowDown') setSelectedIndex((selectedIndex + 1) % items.length);
      else selectItem(selectedIndex);
      e.preventDefault();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [items, selectedIndex, setSelectedIndex, selectItem]);

  useEffect(() => setSelectedIndex(0), [items]);

  useLayoutEffect(() => {
    const container = commandListContainer?.current;
    const item = container?.children[selectedIndex] as HTMLElement;
    if (item && container) updateScrollView(container, item);
  }, [selectedIndex]);

  if (items.length === 0) return null;
  return (
    <div
      id="slash-command"
      ref={commandListContainer}
      className="z-50 h-auto max-h-[330px] w-72 overflow-y-auto rounded-md border border-stone-200 bg-white px-1 py-2 shadow-md transition-all"
    >
      {items.map((item: CommandItemProps, index: number) => {
        return (
          <button
            className={`flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm text-stone-900 hover:bg-stone-100 ${
              index === selectedIndex ? 'bg-stone-100 text-stone-900' : ''
            }`}
            key={index}
            onClick={() => selectItem(index)}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-md border border-stone-200 bg-white">
              {item.title === 'Continue writing' && isLoading ? <LoadingCircle /> : item.icon}
            </div>
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="text-xs text-stone-500">{item.description}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
};
