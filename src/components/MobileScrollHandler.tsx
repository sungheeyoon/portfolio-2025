'use client';

import { useEffect, useState } from 'react';

interface MobileScrollHandlerProps {
  sections: { id: string; name: string }[];
  currentSectionIndex: number;
  setCurrentSectionIndex: (index: number) => void;
  isScrolling: boolean;
  setIsScrolling: (value: boolean) => void;
}

const MobileScrollHandler = ({
  sections,
  currentSectionIndex,
  setCurrentSectionIndex,
  isScrolling,
  setIsScrolling
}: MobileScrollHandlerProps) => {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // 모바일 디바이스 감지
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    
    const handleTouchStart = (e: TouchEvent) => {
      setTouchStart(e.targetTouches[0].clientY);
      setTouchEnd(null);
    };

    const handleTouchMove = (e: TouchEvent) => {
      setTouchEnd(e.targetTouches[0].clientY);
    };

    const handleTouchEnd = () => {
      if (!touchStart || !touchEnd) return;
      
      // 최소 스와이프 거리를 정의 (모바일 환경을 고려)
      const minSwipeDistance = 50; 
      const swipeDistance = touchStart - touchEnd;
      
      // 스와이프 거리가 최소 거리를 넘었는지 확인
      if (Math.abs(swipeDistance) < minSwipeDistance) return;
      
      if (isScrolling) return;
      
      setIsScrolling(true);
      
      const direction = swipeDistance > 0 ? 1 : -1; // 위로 스와이프(양수), 아래로 스와이프(음수)
      const nextIndex = Math.min(Math.max(currentSectionIndex + direction, 0), sections.length - 1);
      
      if (nextIndex !== currentSectionIndex) {
        setCurrentSectionIndex(nextIndex);
        const nextSection = document.getElementById(sections[nextIndex].id);
        
        if (nextSection) {
          nextSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
      
      // 스크롤 애니메이션이 끝날 때까지 대기
      setTimeout(() => {
        setIsScrolling(false);
      }, 800);
      
      setTouchStart(null);
      setTouchEnd(null);
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isMobile, touchStart, touchEnd, isScrolling, currentSectionIndex, sections, setCurrentSectionIndex, setIsScrolling]);

  return null; // UI 요소 없이 이벤트 핸들링만 담당
};

export default MobileScrollHandler;