import type { Metadata } from 'next';
import 'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'Digital Business Card',
  description: 'Digital Business Card',
  // metadataBase: metaBaseUrl ? new URL(!metaBaseUrl.startsWith('http') ? `https://${metaBaseUrl}` : metaBaseUrl) : null,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
