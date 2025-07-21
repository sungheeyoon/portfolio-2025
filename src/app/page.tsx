'use client';

import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import HeroSection from '../components/HeroSection';
import ProjectsSection from '../components/ProjectsSection';
import EnhancedSkillsSection from '../components/EnhancedSkillsSection';
import ScrollIndicator from '../components/ScrollIndicator';
import MobileScrollHandler from '../components/MobileScrollHandler';
import Footer from '../components/Footer';
import { useSection } from '../context/SectionContext';

// 섹션 정의
const sectionData = [
  { id: 'home', name: '홈' },
  { id: 'project-1', name: '프로젝트 1' },
  { id: 'project-2', name: '프로젝트 2' },
  { id: 'project-3', name: '프로젝트 3' },
  { id: 'skills', name: '기술 스택' }
];

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const { setCurrentSection } = useSection();
  
  // 섹션 데이터를 메모이제이션하여 불필요한 재생성 방지
  const sections = useMemo(() => sectionData, []);

  // 강제로 섹션 변경 이벤트를 발생시키는 함수
  const forceUpdateActiveSection = useCallback((id: string) => {
    // SectionContext 업데이트
    setCurrentSection(id);
    
    // 커스텀 이벤트 발생 - 현재 섹션 변경 알림
    const event = new CustomEvent('sectionChanged', { 
      detail: { sectionId: id } 
    });
    window.dispatchEvent(event);
    console.log('섹션 변경 이벤트 발생:', id);
  }, [setCurrentSection]);

  // 현재 섹션 감지 함수 (여러 useEffect에서 재사용)
  const detectCurrentSection = useCallback(() => {
    // 현재 스크롤 위치 (화면 중앙)
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const scrollCenter = scrollY + (viewportHeight / 2);

    // 섹션 위치를 저장할 배열
    const sectionPositions = [];

    // 모든 섹션의 위치 정보 수집
    for (let i = 0; i < sections.length; i++) {
      const sectionEl = document.getElementById(sections[i].id);
      if (!sectionEl) continue;
      
      // getBoundingClientRect를 사용하여 정확한 위치 계산
      const rect = sectionEl.getBoundingClientRect();
      const sectionTop = scrollY + rect.top;
      const sectionHeight = rect.height;
      
      sectionPositions.push({
        index: i,
        id: sections[i].id,
        top: sectionTop,
        height: sectionHeight,
        middle: sectionTop + (sectionHeight / 2),
        bottom: sectionTop + sectionHeight
      });
    }

    // 현재 스크롤 위치에서 가장 가까운 섹션 찾기
    let closestSection = null;
    let minDistance = Infinity;

    for (const section of sectionPositions) {
      // 현재 스크롤 중앙이 섹션 내부에 있는 경우
      if (scrollCenter >= section.top && scrollCenter <= section.bottom) {
        closestSection = section;
        break;
      }
      
      // 그렇지 않은 경우, 가장 가까운 섹션 찾기
      const distanceToMiddle = Math.abs(scrollCenter - section.middle);
      if (distanceToMiddle < minDistance) {
        minDistance = distanceToMiddle;
        closestSection = section;
      }
    }

    // 가장 가까운 섹션으로 인덱스 업데이트
    if (closestSection && currentSectionIndex !== closestSection.index) {
      setCurrentSectionIndex(closestSection.index);
      
      // SectionContext 업데이트 및 이벤트 발생
      forceUpdateActiveSection(closestSection.id);
    }
  }, [currentSectionIndex, sections, forceUpdateActiveSection]);

  // 모바일 디바이스 감지 및 초기 섹션 감지
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // 초기 체크
    checkIsMobile();
    
    // 리사이즈 이벤트 리스너 등록
    window.addEventListener('resize', checkIsMobile);
    
    // 초기 현재 섹션 감지 함수
    const initialDetection = () => {
      detectCurrentSection();
    };
    
    // DOM이 완전히 로드된 후 초기 섹션 감지
    if (document.readyState === 'complete') {
      initialDetection();
    } else {
      window.addEventListener('load', initialDetection);
    }
    
    // 백업으로 약간의 지연을 두고 한번 더 초기 섹션 감지
    const initialDetectionTimeout = setTimeout(initialDetection, 300);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
      window.removeEventListener('load', initialDetection);
      clearTimeout(initialDetectionTimeout);
    };
  }, [detectCurrentSection]);

  // 휠 이벤트 및 스크롤 종료 감지
  useEffect(() => {
    // 휠 이벤트 핸들러
    const handleWheel = () => {
      // 휠 이벤트 발생 시 스크롤 진행 중으로 표시
      setIsScrolling(true);
      
      // 약간의 지연 후 스크롤링 상태 해제 - 휠 이벤트 종료 추정
      clearTimeout(wheelTimer);
      wheelTimer = setTimeout(() => {
        setIsScrolling(false);
        // 휠 이벤트 후 섹션 위치 재감지
        detectCurrentSection();
      }, 150);
    };
    
    // 스크롤 종료 감지 타이머
    let scrollEndTimer: ReturnType<typeof setTimeout>;
    let wheelTimer: ReturnType<typeof setTimeout>;
    
    // 스크롤 이벤트 핸들러 - 스크롤 종료 감지
    const handleScroll = () => {
      clearTimeout(scrollEndTimer);
      scrollEndTimer = setTimeout(() => {
        // 스크롤이 종료된 후 강제로 한번 더 섹션 감지
        detectCurrentSection();
        setIsScrolling(false);
      }, 150);
    };
    
    // 휠 이벤트와 스크롤 이벤트 리스너 등록
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollEndTimer);
      clearTimeout(wheelTimer);
    };
  }, [detectCurrentSection]);

  // 키보드 이벤트 처리 (화살표 키로 섹션 이동)
  useEffect(() => {
    // 모바일이 아닐 때만 키보드 이벤트 적용
    if (isMobile) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling) return;

      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();

        setIsScrolling(true);

        const direction = e.key === 'ArrowDown' ? 1 : -1;
        const nextIndex = Math.min(Math.max(currentSectionIndex + direction, 0), sections.length - 1);

        if (nextIndex !== currentSectionIndex) {
          setCurrentSectionIndex(nextIndex);
          const nextSection = document.getElementById(sections[nextIndex].id);
          if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
            
            // 섹션 변경 이벤트 발생
            forceUpdateActiveSection(sections[nextIndex].id);
          }
        }

        setTimeout(() => {
          setIsScrolling(false);
        }, 800);
      }
    };

    // 키보드 이벤트 핸들러 등록
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isScrolling, currentSectionIndex, sections, isMobile, forceUpdateActiveSection]);

  // 스크롤 이벤트 처리 - 현재 섹션 감지
  useEffect(() => {
    // 디바운스 함수 직접 구현
    let debounceTimer: ReturnType<typeof setTimeout>;
    const createDebounceHandler = (fn: () => void, delay: number) => {
      return function() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          fn();
        }, delay);
      };
    };

    // 디바운스를 적용한 스크롤 핸들러
    const debouncedScrollHandler = createDebounceHandler(() => {
      detectCurrentSection();
    }, 50); // 50ms 디바운스

    // 애니메이션 프레임을 사용한 쓰로틀링
    let ticking = false;
    const scrollHandler = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          detectCurrentSection();
          ticking = false;
        });
        ticking = true;
      }
      
      // 디바운스된 핸들러도 호출 (스크롤 멈추면 한번 더 확인)
      debouncedScrollHandler();
    };

    // 스크롤 이벤트 등록
    window.addEventListener('scroll', scrollHandler, { passive: true });

    // 페이지 로드 시 한 번 실행
    setTimeout(detectCurrentSection, 200);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
      clearTimeout(debounceTimer); // 디바운스 타이머 취소
    };
  }, [detectCurrentSection]);

  // 스크롤 화살표 클릭 핸들러
  const handleScrollToNext = useCallback((currentId: string) => {
    if (isScrolling) return;

    const currentIndex = sections.findIndex(section => section.id === currentId);
    const nextIndex = currentIndex + 1;

    if (nextIndex < sections.length) {
      setIsScrolling(true);
      setCurrentSectionIndex(nextIndex);

      const nextSection = document.getElementById(sections[nextIndex].id);
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
        
        // 섹션 변경 이벤트 발생
        forceUpdateActiveSection(sections[nextIndex].id);
      }

      setTimeout(() => {
        setIsScrolling(false);
      }, 800);
    }
  }, [isScrolling, sections, forceUpdateActiveSection]);

  // 스크롤 다운 화살표 이벤트 등록
  useEffect(() => {
    const scrollDownElements = document.querySelectorAll('.scroll-down');
    
    const handleClick = (e: Event) => {
      e.preventDefault();
      const sectionElement = (e.currentTarget as Element).closest('section');
      if (sectionElement) {
        handleScrollToNext(sectionElement.id);
      }
    };

    scrollDownElements.forEach(element => {
      element.addEventListener('click', handleClick);
    });

    return () => {
      scrollDownElements.forEach(element => {
        element.removeEventListener('click', handleClick);
      });
    };
  }, [handleScrollToNext]);

  return (
    <main ref={mainRef} className="main-container">
      {/* 모바일 스크롤 핸들러 */}
      <MobileScrollHandler 
        sections={sections}
        currentSectionIndex={currentSectionIndex}
        setCurrentSectionIndex={setCurrentSectionIndex}
        isScrolling={isScrolling}
        setIsScrolling={setIsScrolling}
      />
      
      {/* 데스크톱에서만 스크롤 인디케이터 표시 */}
      <div className={isMobile ? 'hidden' : 'block'}>
        <ScrollIndicator
          sections={sections}
          currentIndex={currentSectionIndex}
          onSectionChange={(index) => {
            if (!isScrolling) {
              setIsScrolling(true);
              setCurrentSectionIndex(index);
              // 섹션 변경 이벤트 발생
              forceUpdateActiveSection(sections[index].id);
              
              setTimeout(() => setIsScrolling(false), 800);
            }
          }}
        />
      </div>

      <section id="home">
        <HeroSection />
      </section>

      <ProjectsSection />

      <section id="skills">
        <EnhancedSkillsSection />
      </section>

      <Footer />
    </main>
  );
}