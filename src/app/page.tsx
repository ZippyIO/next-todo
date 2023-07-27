import { RedirectToSignIn, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import CardLayout from '~/components/todo/CardLayout';
import TodoForm from '~/components/todo/TodoForm';

const HomePage = () => {
  return (
    <>
      <SignedIn>
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <UserButton afterSignOutUrl="/sign-in" />
          <TodoForm />
          <CardLayout />
        </main>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

export default HomePage;
