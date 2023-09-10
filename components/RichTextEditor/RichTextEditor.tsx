'use client';

import { EditorContent, JSONContent, useEditor, EditorOptions } from '@tiptap/react';
import { defaultExtensions } from './extensions';
import { useState } from 'react';
import './styles.css';

interface RichTextEditorProps extends Partial<Pick<EditorOptions, 'onUpdate' | 'extensions' | 'editorProps'>> {
  defaultValue?: JSONContent | string;
  className?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ extensions = [], editorProps = {}, defaultValue, onUpdate, className, ...props }) => {
  const [content, setContent] = useState(defaultValue);
  const editor = useEditor({
    extensions: [...defaultExtensions, ...extensions],
    editorProps: {
      ...editorProps,
    },
    autofocus: 'end',
    content,
    onUpdate: ({ editor, transaction }) => {
      setContent(editor.getJSON());
      onUpdate?.({ editor, transaction });
    },
  });
  return (
    <div
      onClick={() => editor?.chain().focus().run()}
      className={
        className ?? 'relative min-h-[500px] w-full max-w-screen-lg border-stone-200 bg-white sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:shadow-lg'
      }
    >
      <EditorContent editor={editor} />
    </div>
  );
};
