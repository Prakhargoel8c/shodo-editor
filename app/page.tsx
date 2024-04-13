import { CollaborativeEditor } from '@/ui/CollaborativeEditor';
import { ThemeMenu } from '@/ui/ThemeMenu';
import { Github } from '@/ui/icons';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center sm:px-5 sm:pt-[calc(20vh)]">
      <Link
        href="/github"
        target="_blank"
        className="absolute bottom-5 left-5 z-10 max-h-fit rounded-lg p-2 transition-colors duration-200 hover:bg-stone-100 sm:bottom-auto sm:top-5"
      >
        <Github />
      </Link>
      <ThemeMenu />
      <CollaborativeEditor />
    </div>
  );
}
