'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface PersonalCardContextType {
  hasPersonalCard: boolean;
  setHasPersonalCard: (value: boolean) => void;
}

const PersonalCardContext = createContext<PersonalCardContextType | undefined>(undefined);

export function PersonalCardProvider({ children }: { children: ReactNode }) {
  const [hasPersonalCard, setHasPersonalCard] = useState<boolean>(false);

  return (
    <PersonalCardContext.Provider value={{ hasPersonalCard, setHasPersonalCard }}>
      {children}
    </PersonalCardContext.Provider>
  );
}

export function usePersonalCard() {
  const context = useContext(PersonalCardContext);
  if (!context) {
    throw new Error('usePersonalCard must be used within a PersonalCardProvider');
  }
  return context;
}
