import Layout from '@/components/shared/Layout';
import { AuthProvider } from '@descope/nextjs-sdk';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'App',
  description: 'App description',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider projectId="Peuc12lVlr4guKIgewuy2PO9TdqI6n9f">
          <Layout>{children}</Layout>
        </AuthProvider>
      </body>
    </html>
  );
}
