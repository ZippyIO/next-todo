import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/nextjs';

import TodoForm from '~/components/todo/TodoForm';

const Page = () => {
  return (
    <>
      <SignedIn>
        <main className="flex min-h-screen w-full flex-col items-center justify-between px-8 py-24">
          <TodoForm />
        </main>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

export default Page;
