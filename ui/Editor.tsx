'use client';

import { RichTextEditor } from '@/components/RichTextEditor';
import { EditorEvents, JSONContent } from '@tiptap/core';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export default function Editor() {
  const [defaultValue, setDefaultValue] = useState<JSONContent>();
  const [saveStatus, setSaveStatus] = useState('Saved');
  const debouncedSave = useDebouncedCallback(({ editor }: EditorEvents['update']) => {
    setSaveStatus('Saving...');
    // Simulate a delay in saving
    setTimeout(() => setSaveStatus('Saved'), 1000);
    localStorage.setItem('content', JSON.stringify(editor.getJSON()));
  }, 1000);

  useEffect(() => {
    const data = localStorage.getItem('content');
    if (data) setDefaultValue(JSON.parse(data));
    else setDefaultValue({ type: 'doc', content: [] });
  }, []);

  return (
    <div className="relative w-full max-w-screen-lg">
      {defaultValue && (
        <>
          <div className="absolute right-5 top-5 z-10 mb-5 rounded-lg bg-stone-100 px-2 py-1 text-sm text-stone-400">{saveStatus}</div>
          <RichTextEditor completionApi="/api/autocomplete" onUpdate={debouncedSave} defaultValue={defaultValue} />
        </>
      )}
    </div>
  );
}
