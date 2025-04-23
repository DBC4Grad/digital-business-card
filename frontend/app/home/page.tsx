'use client';

import { useState, useEffect } from 'react';
import { Wallet, UserSquare2, Settings } from 'lucide-react';
import MyCard from '@/components/my-card';
import CardsList from '@/components/cards-list';
import Header from '@/components/Header';
import { useAuth } from '@/app/context/AuthContext';
import { UserData } from '@/types/type';
import CreateCard from '@/components/createCard';

export default function BusinessCardApp() {
  const [activeTab, setActiveTab] = useState<'myCard' | 'cardsList' | 'settings' | 'createCard'>('myCard');
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
  const [hasPersonalCard, setHasPersonalCard] = useState<boolean | null>(true); // State to check if the user has a personal card

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const response = await fetch(`http://localhost:8080/users/username/${user.username}`);
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
    <div className="flex flex-col items-center min-h-screen bg-[#e8f2dd]">
      {/* Header */}
      <Header />

      {/* Content */}
      <div
        className={`w-full flex-1 flex flex-col items-center rounded overflow-y-auto ${
          activeTab === 'cardsList' ? 'pb-24' : ''
        }`}
      >
        {activeTab === 'myCard' && (
          <>
            {hasPersonalCard === null ? (
              <p className="text-lg text-[#6a8d5d]">Loading...</p>
            ) : hasPersonalCard ? (
              <MyCard userData={userData} />
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <p className="text-lg text-[#6a8d5d] mb-4">You do not have a personal card yet.</p>
                <button
                  className="px-4 py-2 bg-[#6a8d5d] text-white rounded-md cursor-pointer transition"
                  onClick={() => setActiveTab('createCard')}
                >
                  Create Personal Card
                </button>
              </div>
            )}
          </>
        )}
        {activeTab === 'cardsList' && <CardsList />}
        {activeTab === 'settings' && (
          <div className="flex items-center justify-center h-full">
            <p className="text-lg text-[#6a8d5d]">Settings Page</p>
          </div>
        )}
        {activeTab === 'createCard' && <CreateCard />}
        {/* `{user && activeTab === 'myCard' && <MyCard />}
        {user && activeTab === 'cardsList' && <CardsList />}
        {user && activeTab === 'settings' && (
          <div className="flex items-center justify-center h-full">
            <p className="text-lg text-[#6a8d5d]">Settings Page</p>
          </div>
        )}` */}

        {/* 애초에 로그인이 안되면 이 페이지들로 갈 일이 없기는 하지만, 임시로 밑에 화면 만들어놓음 */}
        {/* {!user && activeTab === 'myCard' && (
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
        )} */}
      </div>

      {/* Bottom Navigation */}
      {activeTab === 'cardsList' || activeTab === 'createCard' ? (
        <div className="fixed bottom-0 w-[447px] h-[130px] bg-[#e8f2dd] p-2 flex justify-around z-20">
          <div className="fixed bottom-8 w-[400px] max-w-md bg-white rounded-full shadow-xl p-2 flex justify-around z-30">
            <button
              className={`p-3 ${activeTab === 'cardsList' ? 'bg-[#d8e8c9] rounded-full' : ''}`}
              onClick={() => setActiveTab('cardsList')}
            >
              <Wallet className="w-6 h-6" />
            </button>
            <button className={`p-3`} onClick={() => setActiveTab('myCard')}>
              <UserSquare2 className="w-6 h-6" />
            </button>
            <button className={`p-3`} onClick={() => setActiveTab('settings')}>
              <Settings className="w-6 h-6" />
            </button>
          </div>
        </div>
      ) : (
        <div className="fixed bottom-8 w-[400px] max-w-md bg-white rounded-full shadow-xl p-2 flex justify-around z-30">
          <button className={`p-3`} onClick={() => setActiveTab('cardsList')}>
            <Wallet className="w-6 h-6" />
          </button>
          <button
            className={`p-3 ${activeTab === 'myCard' ? 'bg-[#d8e8c9] rounded-full' : ''}`}
            onClick={() => setActiveTab('myCard')}
          >
            <UserSquare2 className="w-6 h-6" />
          </button>
          <button
            className={`p-3 ${activeTab === 'settings' ? 'bg-[#d8e8c9] rounded-full' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
}
