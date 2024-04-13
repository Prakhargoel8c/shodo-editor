'use client';
import { RoomProvider } from '@/liveblocks.config';
import { ClientSideSuspense } from '@liveblocks/react';
import React from 'react';
import Editor from './Editor';
import { Avatars } from '@/components/Avatars';

export const CollaborativeEditor = () => {
  return (
    <RoomProvider id="my-test-liveblocks-room" initialPresence={{ cursor: null }}>
      <ClientSideSuspense fallback="Loading…">
        {() => (
          <>
            <Editor />
            <Avatars />
          </>
        )}
      </ClientSideSuspense>
    </RoomProvider>
  );
};
