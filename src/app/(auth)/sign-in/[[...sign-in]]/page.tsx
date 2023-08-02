import { SignIn } from '@clerk/nextjs';

const Page = () => {
  return (
    <main className="mt-16 flex w-full justify-center">
      <SignIn />
    </main>
  );
};

export default Page;
