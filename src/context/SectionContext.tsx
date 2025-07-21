'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface SectionContextType {
  currentSection: string;
  setCurrentSection: (sectionId: string) => void;
}

const SectionContext = createContext<SectionContextType | undefined>(undefined);

export function SectionProvider({ children }: { children: ReactNode }) {
  const [currentSection, setCurrentSection] = useState('home');

  // 상태 업데이트 함수 래핑하여 로깅 추가
  const updateCurrentSection = (sectionId: string) => {
    console.log('SectionContext - 현재 섹션 변경:', sectionId);
    setCurrentSection(sectionId);
  };

  return (
    <SectionContext.Provider value={{ currentSection, setCurrentSection: updateCurrentSection }}>
      {children}
    </SectionContext.Provider>
  );
}

export function useSection() {
  const context = useContext(SectionContext);
  if (context === undefined) {
    throw new Error('useSection must be used within a SectionProvider');
  }
  return context;
}
