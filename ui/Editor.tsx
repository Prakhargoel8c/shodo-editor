'use client';

import { RichTextEditor } from '@/components/RichTextEditor';
import { useState } from 'react';

export default function Editor() {
  const [saveStatus, setSaveStatus] = useState('Saved');

  return (
    <div className="relative w-full max-w-screen-lg">
      <RichTextEditor />
    </div>
  );
}
