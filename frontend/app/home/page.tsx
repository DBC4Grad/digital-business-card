'use client';

import { useState, useEffect } from 'react';
import MyCard from '@/components/my-card';
import { useAuth } from '@/app/context/AuthContext';
import { usePersonalCard } from '@/app/context/PersonalCardContext';
import { UserData } from '@/types/type';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function BusinessCardApp() {
  const pathname = usePathname(); // Get the current URL path
  const page = pathname.split('/home/')[1] || '';
  const [userData, setUserData] = useState<UserData>({
    username: '',
    personal: {
      firstName: '',
      lastName: '',
      company: '',
      position: '',
      phoneContact: '',
      officeContact: '',
      email: '',
      qrHash: '',
    },
  });
  const { user } = useAuth();
  const { hasPersonalCard, setHasPersonalCard } = usePersonalCard(); // Access shared state

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const response = await fetch(`http://localhost:8080/api/users/username/${user.username}`, {
            // const response = await fetch(`http://localhost:8080/personal/${user.username}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (response.ok) {
            const data = await response.json();
            // const hasValidPersonalCard = data.personal && Object.values(data.personal).some((value) => value);
            const hasValidPersonalCard = Boolean(data.personal);
            setHasPersonalCard(hasValidPersonalCard); // Update shared state
            setUserData(data);
          } else {
            console.error('Failed to fetch user data');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [user, setHasPersonalCard]);

  return (
    <div
      className={`w-full flex-1 flex flex-col items-center rounded overflow-y-auto ${
        page === 'cardsList' ? 'pb-24' : ''
      }`}
    >
      {page === '' && (
        <>
          {hasPersonalCard === null ? (
            <p className="text-lg text-[#6a8d5d]">Loading...</p>
          ) : hasPersonalCard ? (
            <MyCard userData={userData} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-lg text-[#6a8d5d] mb-4">You do not have a personal card yet.</p>
              <Link href="/home/createCard">
                <button className="px-4 py-2 bg-[#6a8d5d] text-white rounded-md cursor-pointer transition">
                  Create Personal Card
                </button>
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}
