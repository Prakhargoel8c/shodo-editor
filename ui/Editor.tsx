'use client';

import { RichTextEditor } from '@/components/RichTextEditor';
import { EditorEvents } from '@tiptap/core';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export default function Editor() {
  const [saveStatus, setSaveStatus] = useState('Saved');
  const debouncedSave = useDebouncedCallback(({ editor }: EditorEvents['update']) => {
    setSaveStatus('Saving...');
    // Simulate a delay in saving
    setTimeout(() => setSaveStatus('Saved'), 500);
  }, 1000);

  return (
    <div className="relative w-full max-w-screen-lg">
      <div className="absolute right-5 top-5 z-10 mb-5 rounded-lg bg-stone-100 px-2 py-1 text-sm text-stone-400">{saveStatus}</div>
      <RichTextEditor completionApi="/api/autocomplete" />
    </div>
  );
}
