'use client';

import { useState, useEffect } from 'react';
import MyCard from '@/components/my-card';
import { useAuth } from '@/app/context/AuthContext';
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
    },
  }); // State to hold user data
  const { user } = useAuth();
  // 임시로 true로 해놓음
  const [hasPersonalCard, setHasPersonalCard] = useState<boolean | null>(null); // State to check if the user has a personal card

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const response = await fetch(`http://localhost:8080/users/username/${user.username}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (response.ok) {
            const data = await response.json();
            const hasValidPersonalCard = data.personal && Object.values(data.personal).some((value) => value);
            setHasPersonalCard(hasValidPersonalCard);
            setUserData(data); // Save the data to state
            // console.log('User data:', data);
            // Check if the returned data has a valid `personal` property
            setHasPersonalCard(hasValidPersonalCard);
          } else {
            console.error('Failed to fetch user data');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [user]);

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

  {
    /* 애초에 로그인이 안되면 이 페이지들로 갈 일이 없기는 하지만, 임시로 밑에 화면 만들어놓음 */
  }
  {
    /* {!user && activeTab === 'myCard' && (
          <div className="flex items-center justify-center h-full">
            <p className="text-lg text-[#6a8d5d]">Please log in to view your card.</p>
          </div>
        )}
        {!user && activeTab === 'cardsList' && (
          <div className="flex items-center justify-center h-full">
            <p className="text-lg text-[#6a8d5d]">Please log in to view your cards.</p>
          </div>
        )}
        {!user && activeTab === 'settings' && (
          <div className="flex items-center justify-center h-full">
            <p className="text-lg text-[#6a8d5d]">Please log in to access settings.</p>
          </div>
        )} */
  }
}
