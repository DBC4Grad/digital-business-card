'use client';
import { useState } from 'react';

import React from 'react';
import { UserRoundPen } from 'lucide-react';
import EditCard from '@/components/editCard';

export default function Settings() {
  const [editCard, setEditCard] = useState(false);

  return (
    <>
      {editCard && (
        <div className="edit-card-component">
          <EditCard setEditCard={setEditCard} />
        </div>
      )}
      {!editCard && (
        <button
          onClick={() => setEditCard(true)}
          className="w-[90%] max-w-md bg-white rounded-[30px] justify-start pl-10 h-[60px] shadow-primary-strong shadow-2xl font-semibold flex items-center mt-4 gap-4"
        >
          <UserRoundPen />
          <span>내 명함 수정</span>
        </button>
      )}
    </>
  );
}
