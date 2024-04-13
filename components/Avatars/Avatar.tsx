import styles from './Avatars.module.css';

export function Avatar({ picture, name }: { picture: string; name: string }) {
  return (
    <div className={styles.avatar} data-tooltip={name}>
      <img src={picture} className={styles.avatar_picture} data-tooltip={name} alt={name} />
    </div>
  );
}
