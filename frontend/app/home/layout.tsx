'use client';

import Header from '@/components/Header';
import { usePathname } from 'next/navigation';
import { Wallet, UserSquare2, Settings } from 'lucide-react';
import Link from 'next/link';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); // Get the current URL path
  const page = pathname.split('/home/')[1] || '';

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#e8f2dd]">
      <Header />
      {children}
      {/* Bottom Navigation */}
      {page === 'cardsList' || page === 'createCard' ? (
        <div className="fixed bottom-0 w-[447px] h-[130px] bg-[#e8f2dd] p-2 flex justify-around z-20">
          <div className="fixed bottom-8 w-[400px] max-w-md bg-white rounded-full shadow-xl p-2 flex justify-around z-30">
            <Link href="/home/cardsList" className={`p-3 ${page === 'cardsList' ? 'bg-[#d8e8c9] rounded-full' : ''}`}>
              <Wallet className="w-6 h-6" />
            </Link>
            <Link href="/home" className={`p-3`}>
              <UserSquare2 className="w-6 h-6" />
            </Link>
            <Link href="/home/settings" className={`p-3`}>
              <Settings className="w-6 h-6" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="fixed bottom-8 w-[400px] max-w-md bg-white rounded-full shadow-xl p-2 flex justify-around z-30">
          <Link href="/home/cardsList" className={`p-3`}>
            <Wallet className="w-6 h-6" />
          </Link>
          <Link href="/home/" className={`p-3 ${page === '' ? 'bg-[#d8e8c9] rounded-full' : ''}`}>
            <UserSquare2 className="w-6 h-6" />
          </Link>
          <Link href="/home/settings" className={`p-3 ${page === 'settings' ? 'bg-[#d8e8c9] rounded-full' : ''}`}>
            <Settings className="w-6 h-6" />
          </Link>
        </div>
      )}
    </div>
  );
}
