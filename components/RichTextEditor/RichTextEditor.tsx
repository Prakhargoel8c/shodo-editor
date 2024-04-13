'use client';

import { EditorContent, JSONContent, useEditor, EditorOptions } from '@tiptap/react';
import { defaultExtensions } from './extensions';
import { defaultEditorProps } from './defaultEditorProps';
import { useEffect, useRef } from 'react';
import { EditorBubbleMenu } from './EditorBubbleMenu';
import { useCompletion } from 'ai/react';
import { toast } from 'sonner';
import { getPrevText } from '@/lib/editor';
import va from '@vercel/analytics';

import './styles.css';

interface RichTextEditorProps extends Partial<Pick<EditorOptions, 'onUpdate' | 'extensions' | 'editorProps'>> {
  completionApi: string;
  defaultValue?: JSONContent | string;
  className?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = (props) => {
  const { extensions = [], editorProps = {}, defaultValue, onUpdate, className, completionApi } = props;
  const editor = useEditor({
    extensions: [...defaultExtensions, ...extensions],
    editorProps: { ...defaultEditorProps, ...editorProps },
    autofocus: 'end',
    content: defaultValue,
    onUpdate: (e) => {
      const selection = e.editor.state.selection;
      const lastTwo = getPrevText(e.editor, { chars: 2 });
      if (lastTwo === '++' && !isLoading) {
        e.editor.commands.deleteRange({ from: selection.from - 2, to: selection.from });
        complete(getPrevText(e.editor, { chars: 5000 }));
        va.track('Autocomplete Shortcut Used');
      } else {
        onUpdate?.(e);
      }
    },
  });
  const { complete, completion, isLoading } = useCompletion({
    id: 'shodo',
    api: completionApi,
    onFinish: (_prompt, completion) => {
      editor?.commands.setTextSelection({
        from: editor.state.selection.from - completion.length,
        to: editor.state.selection.from,
      });
    },
    onError: (err) => toast.error(err.message),
  });
  const prev = useRef('');

  // Insert chunks of the generated text
  useEffect(() => {
    const diff = completion.slice(prev.current.length);
    prev.current = completion;
    editor?.commands.insertContent(diff);
  }, [isLoading, editor, completion]);
  return (
    <div
      onClick={() => editor?.chain().focus().run()}
      className={
        className ?? 'relative min-h-[500px] w-full max-w-screen-lg border-stone-200 bg-white sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:shadow-lg'
      }
    >
      {editor && <EditorBubbleMenu editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
};
