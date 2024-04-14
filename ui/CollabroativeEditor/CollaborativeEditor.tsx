'use client';
import { RoomProvider } from '@/liveblocks.config';
import { ClientSideSuspense } from '@liveblocks/react';
import React, { useState } from 'react';
import Editor from './Editor';
import { Avatars } from '@/components/Avatars';
import { UserForm } from './UserForm';

export const CollaborativeEditor = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  return isUserLoggedIn ? (
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
  ) : (
    <UserForm setIsUserLoggedIn={setIsUserLoggedIn} />
  );
};
