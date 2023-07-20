import '~/styles/globals.css';

import { type Metadata } from 'next';

import ThemeProvider from '~/components/ThemeProvider';

export const metadata: Metadata = {
  title: 'Next Todo',
  description: 'Generated by create next app',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
