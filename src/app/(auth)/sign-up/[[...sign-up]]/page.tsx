import { SignUp } from '@clerk/nextjs';

const Page = () => {
  return (
    <main className="mt-16 flex w-full justify-center">
      <SignUp
        appearance={{
          elements: {
            card: 'bg-black',
            headerTitle: 'text-zinc-100',
            headerSubtitle: 'text-zinc-400',
            socialButtonsBlockButton__discord:
              'bg-zinc-900 hover:opacity-90 hover:bg-zinc-900 active:opacity-75 active:bg-zinc-900',
            socialButtonsBlockButtonText__discord: 'text-indigo-400 font-medium',
            socialButtonsBlockButtonArrow__discord: 'text-white',
            footerActionText: 'text-zinc-400',
            footerActionLink: 'text-blue-600 hover:text-blue-700',
          },
        }}
      />
    </main>
  );
};

export default Page;
