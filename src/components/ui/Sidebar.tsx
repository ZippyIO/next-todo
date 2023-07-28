'use client';

import { UserButton } from '@clerk/nextjs';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="relative flex w-[350px] flex-col border-r border-zinc-800 bg-black">
      <div className="p-4">
        <Link href="/" className="flex w-full items-center">
          <h1 className="text-xl font-semibold tracking-wide text-zinc-400">Next Todo</h1>
        </Link>
      </div>
      <nav className="space-y-6 px-2 py-5">
        <div>
          <div className="mb-2 px-3 font-medium uppercase tracking-wider text-zinc-500">Todos</div>
          <div className="flex flex-col gap-1">
            <Link
              href="/"
              className={clsx([
                'rounded-md px-3 py-2 text-sm font-medium',
                pathname === '/' && 'bg-[#00101a] text-blue-500',
                pathname !== '/' && 'text-zinc-400 hover:bg-zinc-900/60 hover:text-zinc-300',
              ])}
            >
              List
            </Link>
            <Link
              href="/todo/create"
              className={clsx([
                'rounded-md px-3 py-2 text-sm font-medium',
                pathname === '/todo/create' && 'bg-[#00101a] text-blue-500',
                pathname !== '/todo/create' &&
                  'text-zinc-400 hover:bg-zinc-900/60 hover:text-zinc-300',
              ])}
            >
              Create
            </Link>
          </div>
        </div>
      </nav>
      <div className="flex justify-center">
        <div className="absolute bottom-4">
          <UserButton
            appearance={{
              elements: {
                userButtonPopoverCard: 'bg-zinc-900',
                userPreviewMainIdentifier: 'text-zinc-300',
                userPreviewSecondaryIdentifier: 'text-zinc-500',
                userButtonPopoverActionButtonText: 'text-zinc-300',
                userButtonPopoverActionButtonIcon: 'text-blue-500',
                userButtonPopoverFooter: '[&>*]:text-indigo-600',
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
