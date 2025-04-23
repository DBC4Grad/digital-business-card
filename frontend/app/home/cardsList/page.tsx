'use client';

import { useState } from 'react';
import Image from 'next/image';
import tmpProfile from '@/public/icons/tmp-profile.png';
import { useEffect } from 'react';
import { CardData, UserData } from '@/types/type';
import { useAuth } from '@/app/context/AuthContext';
import { Plus } from 'lucide-react';

export default function CardsList() {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const { user } = useAuth();
  const [savedCards, setSavedCards] = useState<CardData[]>([] as CardData[]);
  const [searchUsername, setSearchUsername] = useState<string>(''); // State for input value
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for error messages
  const [triggerFetch, setTriggerFetch] = useState<boolean>(false); // State to re-trigger useEffect

  useEffect(() => {
    async function fetchUserData(username: string) {
      try {
        const response = await fetch(`http://localhost:8080/api/users/username/${username}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data: UserData = await response.json();
        setSavedCards(data.savedCards ?? ([] as CardData[]));
      } catch (error) {
        console.error(error);
      }
    }

    if (user?.username) {
      fetchUserData(user.username);
    }
  }, [user, triggerFetch]); // Add triggerFetch to dependency array

  const handleSearch = async () => {
    if (!searchUsername.trim()) {
      setErrorMessage('Please enter a username.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/saved/by-username?username=${searchUsername}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include session cookies
      });

      if (response.ok) {
        setSearchUsername(''); // Clear the input field
        setTriggerFetch((prev) => !prev); // Toggle triggerFetch to re-trigger useEffect
        setErrorMessage(null); // Clear any previous error messages
      } else if (response.status === 409) {
        setErrorMessage('This card is already saved.');
      } else {
        setErrorMessage('Failed to add card. User not found or other error.');
      }
    } catch (error) {
      console.error('Error adding card:', error);
      setErrorMessage('An error occurred while adding the card.');
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Search and View Toggle */}
      <div className="sticky top-0 bg-[#e8f2dd] z-10 w-full px-4 py-2">
        <div className="w-full flex justify-between items-center">
          <div className="relative w-[60%]">
            <input
              type="text"
              placeholder="Add card by username"
              value={searchUsername}
              onChange={(e) => setSearchUsername(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white rounded-full border-none focus:outline-none focus:ring-2 focus:ring-[#a0b58b]"
            />
            <Plus
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 cursor-pointer"
              onClick={handleSearch}
            />
          </div>
          <div className="flex gap-2">
            <button
              className={`px-4 py-1 rounded-full text-sm ${
                viewMode === 'list' ? 'bg-[#d8e8c9] text-[#6a8d5d]' : 'bg-white text-slate-300'
              }`}
              onClick={() => setViewMode('list')}
            >
              리스트
            </button>
            <button
              className={`px-4 py-1 rounded-full text-sm ${
                viewMode === 'grid' ? 'bg-[#d8e8c9] text-[#6a8d5d]' : 'bg-white text-slate-300'
              }`}
              onClick={() => setViewMode('grid')}
            >
              그리드
            </button>
          </div>
        </div>
      </div>

      {/* Error Message Display */}
      {errorMessage && <p className="text-center text-red-500 mt-2">{errorMessage}</p>}

      {/* Scrollable Cards List/Grid */}
      <div className="flex-1 overflow-y-auto px-4 pb-14">
        {viewMode === 'list' ? (
          // List View
          <div className="w-full space-y-4">
            {savedCards.map((card, index) => (
              <div
                key={index}
                className="w-full bg-white rounded-[20px] shadow-[4px_8px_8px_0px_rgba(0,0,0,0.25)] p-4 flex items-center"
              >
                <div className="w-14 h-14 rounded-full overflow-hidden bg-[#f5e6e6] mr-4 flex-shrink-0">
                  <Image src={tmpProfile} alt="Profile" width={56} height={56} className="object-cover" />
                </div>
                <div className="flex-1">
                  <ul className="space-y-1">
                    <li className="flex items-center">
                      <span className="text-[#333] mr-2">•</span>
                      <span>
                        {card.firstName} {card.lastName}
                      </span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-[#333] mr-2">•</span>
                      <span>{card.company}</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-[#333] mr-2">•</span>
                      <span>{card.email}</span>
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Grid View
          <div className="w-full grid grid-cols-2 gap-4">
            {savedCards.map((card, index) => (
              <div
                key={index}
                className="bg-white rounded-[20px] shadow-[-4px_8px_8px_0px_rgba(0,0,0,0.25)] p-4 flex flex-col items-center"
              >
                <div className="w-14 h-14 rounded-full overflow-hidden bg-[#f5e6e6] mb-2 flex-shrink-0">
                  <Image src={tmpProfile} alt="Profile" width={56} height={56} className="object-cover" />
                </div>
                <div className="w-full">
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-start">
                      <span className="text-[#333] mr-1">•</span>
                      <span className="flex-1">
                        {card.firstName} {card.lastName}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#333] mr-1">•</span>
                      <span className="flex-1">{card.company}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#333] mr-1">•</span>
                      <span className="flex-1">{card.email}</span>
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
