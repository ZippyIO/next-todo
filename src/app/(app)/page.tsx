import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/nextjs';

import TodoCardLayout from '~/components/todo/TodoCardLayout';

const Page = () => {
  return (
    <>
      <SignedIn>
        <main className="flex min-h-screen w-full flex-col items-center justify-between px-8 py-24">
          <TodoCardLayout />
        </main>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

export default Page;
