const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex h-screen w-full bg-[#0a0a0b] bg-[url('/grid.svg')]">{children}</div>;
};

export default Layout;
