import type { Metadata, Viewport } from 'next';
import 'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css';
import './globals.css';
import { AuthProvider } from './context/AuthContext';

export const metadata: Metadata = {
  title: 'Digital Business Card',
  description: 'Digital Business Card',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#E5f4d5',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <AuthProvider>
          <main className="max-w-md mx-auto w-full min-h-screen">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
