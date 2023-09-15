import React, { useCallback } from 'react';
import { CommandItemProps } from './CommandList';
import { useCompletion } from 'ai/react';
import { toast } from 'sonner';
import { Editor, Range } from '@tiptap/core';
import va from '@vercel/analytics';
import { getPrevText } from '@/lib/editor';

export const useExecuteCommand = (command: Function, editor: Editor, range: Range) => {
  const { complete, isLoading } = useCompletion({
    id: 'shodo',
    api: '/api/autocomplete',
    onResponse: (r) => {
      // ignore the response as it's handled by the the other useCompletion hook which has the same id
      editor.chain().focus().deleteRange(range).run();
    },
    onFinish: (_prompt, completion) => {
      // highlight the generated text
      editor.commands.setTextSelection({
        from: range.from,
        to: range.from + completion.length,
      });
    },
    onError: (e) => toast.error(e.message),
  });
  const executeCommand = useCallback(
    (item: CommandItemProps) => {
      if (item.title === 'Continue writing') {
        if (isLoading) return;
        complete(getPrevText(editor, { chars: 5000, offset: 1 }));
      } else {
        command(item);
        va.track('slash_command', { command: item.title });
      }
    },
    [command, complete, editor, isLoading]
  );
  return { executeCommand, isLoading };
};
