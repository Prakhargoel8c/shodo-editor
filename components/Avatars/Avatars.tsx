'use client';
import { useOthers, useSelf } from '@/liveblocks.config';
import styles from './Avatars.module.css';
import { Avatar } from './Avatar';

export function Avatars() {
  const users = useOthers();
  const currentUser = useSelf();

  return (
    <div className={styles.avatars}>
      {users.map(({ connectionId, info }) => {
        return <Avatar key={connectionId} picture={info.picture} name={info.name} />;
      })}

      {currentUser && (
        <div className="relative ml-8 first:ml-0">
          <Avatar picture={currentUser.info.picture} name={currentUser.info.name} />
        </div>
      )}
    </div>
  );
}
