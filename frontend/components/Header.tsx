'use client';

import { useAuth } from '@/app/context/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="w-full flex justify-between items-center p-4 bg-[#e8f2dd]">
      <h1 className="text-xl font-bold text-[#6a8d5d]">Digital Business Card</h1>
      {user ? (
        <div className="flex items-center gap-4">
          <span className="text-[#6a8d5d]">Hello, {user.username}!</span>
          <button
            onClick={() => {
              logout();
              window.location.href = '/';
            }}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      ) : (
        <span className="text-gray-500">Not logged in</span>
      )}
    </header>
  );
}
