'use client';

import { useSection } from '../context/SectionContext';
import { useEffect, useState, useRef } from 'react';
import styles from './ScrollIndicator.module.css';

interface Section {
  id: string;
  name: string;
}

interface ScrollIndicatorProps {
  sections: Section[];
  currentIndex: number;
  onSectionChange: (index: number) => void;
}

export default function ScrollIndicator({ 
  sections, 
  currentIndex, 
  onSectionChange 
}: ScrollIndicatorProps) {
  const { currentSection } = useSection();
  const [activeSection, setActiveSection] = useState(currentSection);
  const indicatorRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // currentSection이 변경될 때 activeSection 업데이트
  useEffect(() => {
    if (currentSection) {
      setActiveSection(currentSection);
      console.log('ScrollIndicator - activeSection 업데이트:', currentSection);
    }
  }, [currentSection]);
  
  // 섹션 변경 이벤트 리스너
  useEffect(() => {
    const handleSectionChange = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail && customEvent.detail.sectionId) {
        const sectionId = customEvent.detail.sectionId;
        console.log('ScrollIndicator - sectionChanged 이벤트 받음:', sectionId);
        setActiveSection(sectionId);
        
        // 인디케이터 포커스 처리 - 직접 DOM 조작
        indicatorRefs.current.forEach((ref, index) => {
          if (ref) {
            if (sections[index].id === sectionId) {
              ref.classList.add('active');
            } else {
              ref.classList.remove('active');
            }
          }
        });
      }
    };
    
    window.addEventListener('sectionChanged', handleSectionChange);
    
    // 컴포넌트 마운트 시 현재 섹션에 맞게 포커스 초기화
    const updateInitialFocus = () => {
      if (currentSection) {
        setActiveSection(currentSection);
        const index = sections.findIndex(section => section.id === currentSection);
        if (index >= 0 && indicatorRefs.current[index]) {
          indicatorRefs.current.forEach((ref, i) => {
            if (ref) {
              if (i === index) {
                ref.classList.add('active');
              } else {
                ref.classList.remove('active');
              }
            }
          });
        }
      }
    };
    
    // 약간의 지연 후 초기 포커스 적용 (DOM이 완전히 마운트된 후)
    setTimeout(updateInitialFocus, 100);
    
    return () => {
      window.removeEventListener('sectionChanged', handleSectionChange);
    };
  }, [sections, currentSection]);
  
  // currentIndex prop이 변경될 때도 활성 상태 업데이트
  useEffect(() => {
    if (currentIndex >= 0 && currentIndex < sections.length) {
      const sectionId = sections[currentIndex].id;
      setActiveSection(sectionId);
      
      // 인디케이터 포커스 처리 - 직접 DOM 조작
      indicatorRefs.current.forEach((ref, index) => {
        if (ref) {
          if (index === currentIndex) {
            ref.classList.add('active');
          } else {
            ref.classList.remove('active');
          }
        }
      });
    }
  }, [currentIndex, sections]);
  
  const scrollToSection = (id: string, index: number) => {
    console.log('ScrollIndicator - 클릭됨:', id);
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      onSectionChange(index);
      
      // 즉시 활성 상태 업데이트 (DOM 직접 조작)
      setActiveSection(id);
      indicatorRefs.current.forEach((ref, i) => {
        if (ref) {
          if (i === index) {
            ref.classList.add('active');
          } else {
            ref.classList.remove('active');
          }
        }
      });
      
      // 커스텀 이벤트 발생 - 다른 컴포넌트와 동기화
      const event = new CustomEvent('sectionChanged', { 
        detail: { sectionId: id } 
      });
      window.dispatchEvent(event);
    }
  };
  
  // 인디케이터 참조 초기화
  indicatorRefs.current = Array(sections.length).fill(null);
  
  return (
    <div className="scroll-indicator">
      {sections.map((section, index) => {
        // 현재 활성 섹션 여부 확인
        const isActive = activeSection === section.id;
        
        return (
          <div
            key={section.id}
            ref={el => { indicatorRefs.current[index] = el; }}
            className={`indicator-dot ${isActive ? 'active' : ''} ${styles.indicatorDot} ${isActive ? styles.active : ''}`}
            onClick={() => scrollToSection(section.id, index)}
            data-section-id={section.id}
            data-active={isActive ? 'true' : 'false'}
          >
            <span className={styles.tooltip}>
              {section.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}