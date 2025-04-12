import type { Metadata, Viewport } from 'next';
import 'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css';
import './globals.css';
// import type { Viewport } from 'next';
// export const viewport: Viewport = {
//   themeColor: 'black',
// };

export const metadata: Metadata = {
  title: 'Digital Business Card',
  description: 'Digital Business Card',
  // metadataBase: metaBaseUrl ? new URL(!metaBaseUrl.startsWith('http') ? `https://${metaBaseUrl}` : metaBaseUrl) : null,
  // icons: {
  //   icon: '/favicon.ico', // 일반 파비콘
  //   apple: '/apple-touch-icon.png', // iOS 홈 화면 아이콘
  //   shortcut: '/shortcut-icon.png', // 바탕화면 추가 시 아이콘
  // },
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
        <main className="max-w-md mx-auto w-full min-h-screen border">{children}</main>
      </body>
    </html>
  );
}
