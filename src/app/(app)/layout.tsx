import Sidebar from '~/components/ui/Sidebar';
import { Toaster } from '~/components/ui/Toaster';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full bg-[#0a0a0b] bg-[url('/grid.svg')]">
      <Sidebar />
      {children}
      <Toaster />
    </div>
  );
};

export default Layout;
