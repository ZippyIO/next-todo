import Sidebar from '~/components/ui/Sidebar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen w-full bg-[#0a0a0b] bg-[url('/grid.svg')]">
      <Sidebar />
      {children}
    </div>
  );
};

export default Layout;
