'use client';
import { EditorContent, JSONContent, useEditor, EditorOptions } from '@tiptap/react';
import { defaultExtensions } from './extensions';
import { useState } from 'react';

interface RichTextEditorProps extends Pick<EditorOptions, 'onUpdate' | 'extensions' | 'editorProps'> {
  defaultValue?: JSONContent | string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ extensions = [], editorProps = {}, defaultValue, onUpdate, ...props }) => {
  const [content, setContent] = useState(defaultValue);
  const editor = useEditor({
    extensions: [...defaultExtensions, ...extensions],
    editorProps: { ...editorProps },
    autofocus: 'end',
    content,
    onUpdate: ({ editor, transaction }) => {
      setContent(editor.getJSON());
      onUpdate?.({ editor, transaction });
    },
  });
  return (
    <div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;
