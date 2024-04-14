'use client';

import { RichTextEditor } from '@/components/RichTextEditor';
import { useRoom, useSelf } from '@/liveblocks.config';
import { useEffect, useState } from 'react';
import LiveblocksProvider from '@liveblocks/yjs';
import * as Y from 'yjs';
import Collaboration from '@tiptap/extension-collaboration';
import CollaborationCursor from '@tiptap/extension-collaboration-cursor';

export default function Editor() {
  const room = useRoom();
  const [doc, setDoc] = useState<Y.Doc>();
  const [provider, setProvider] = useState<any>();
  const userInfo = useSelf((me) => me.info) as { name: string; picture: string };
  useEffect(() => {
    const yDoc = new Y.Doc();
    const yProvider = new LiveblocksProvider(room, yDoc);
    setDoc(yDoc);
    setProvider(yProvider);

    return () => {
      yDoc?.destroy();
      yProvider?.destroy();
    };
  }, [room]);

  if (!doc || !provider) {
    return null;
  }

  return (
    <div className="relative w-full max-w-screen-lg">
      <RichTextEditor
        extensions={[Collaboration.configure({ document: doc }), CollaborationCursor.configure({ provider, user: userInfo })]}
        completionApi="/api/autocomplete"
      />
    </div>
  );
}
