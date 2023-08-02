import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/nextjs';

import TodoContainer from '~/components/todo/TodoContainer';

const Page = () => {
  return (
    <>
      <SignedIn>
        <main className="flex min-h-screen w-full flex-col items-center justify-between">
          <TodoContainer />
        </main>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

export default Page;
