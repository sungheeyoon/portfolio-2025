'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useTheme } from '../context/ThemeContext';
import { useSection } from '../context/SectionContext';
import styles from './Header.module.css';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();
  const { currentSection, setCurrentSection } = useSection();
  const navRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // 섹션 목록
  const navLinks = [
    { id: 'home', text: '홈' },
    { id: 'project-1', text: '프로젝트' },
    { id: 'skills', text: '기술 스택' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      // 스크롤 위치 확인하여 헤더 배경색 변경
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // 섹션 변경 이벤트 리스너
    const handleSectionChange = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail && customEvent.detail.sectionId) {
        const sectionId = customEvent.detail.sectionId;
        console.log('Header - sectionChanged 이벤트 받음:', sectionId);
        setCurrentSection(sectionId);
        
        // 네비게이션 링크 활성화 상태 업데이트 (직접 DOM 조작)
        updateActiveNavLink(sectionId);
      }
    };

    // 초기 로드 시와 스크롤 시 핸들러 실행
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('sectionChanged', handleSectionChange as EventListener);

    // 초기 활성 링크 설정
    setTimeout(() => {
      updateActiveNavLink(currentSection);
    }, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('sectionChanged', handleSectionChange as EventListener);
    };
  }, [setCurrentSection, currentSection]);

  // 현재 활성 네비게이션 링크 업데이트
  const updateActiveNavLink = (sectionId: string) => {
    // 프로젝트 섹션인 경우 처리
    const isProjectSection = sectionId === 'project-1' || sectionId === 'project-2' || sectionId === 'project-3';
    const targetId = isProjectSection ? 'project-1' : sectionId;

    // 내비게이션 링크 업데이트
    navRefs.current.forEach((ref, index) => {
      if (ref) {
        const linkId = navLinks[index].id;
        if (
          (linkId === targetId) || 
          (linkId === 'project-1' && isProjectSection)
        ) {
          ref.classList.add(styles.active);
        } else {
          ref.classList.remove(styles.active);
        }
      }
    });
  };

  const scrollToSection = (id: string) => {
    console.log('Header - 섹션으로 스크롤:', id);
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
      
      // 현재 섹션 상태 업데이트
      setCurrentSection(id);
      
      // 커스텀 이벤트 발생 - 현재 섹션 변경 알림
      const event = new CustomEvent('sectionChanged', { 
        detail: { sectionId: id } 
      });
      window.dispatchEvent(event);
      
      // 네비게이션 링크 활성화 상태 즉시 업데이트
      updateActiveNavLink(id);
      
      // URL 변경 방지
      window.history.replaceState(null, '', window.location.pathname);
    }
  };

  // 현재 섹션이 프로젝트 섹션인지 확인하는 함수
  const isProjectSection = () => {
    return currentSection === 'project-1' || 
           currentSection === 'project-2' || 
           currentSection === 'project-3';
  };

  // 내비게이션 참조 초기화
  navRefs.current = Array(navLinks.length).fill(null);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <Link 
        href="/" 
        className={styles.logo}
        onClick={(e) => {
          e.preventDefault();
          scrollToSection('home');
        }}
      >
        Portfolio
      </Link>
      
      <nav className={styles.nav}>
        {navLinks.map((link, index) => (
          <button 
            key={link.id}
            ref={el => navRefs.current[index] = el}
            className={`${styles.navLink} ${
              (link.id === 'project-1' && isProjectSection()) || 
              (link.id === currentSection) 
                ? styles.active 
                : ''
            }`}
            onClick={() => scrollToSection(link.id)}
            data-section-id={link.id}
            data-active={
              (link.id === 'project-1' && isProjectSection()) || 
              (link.id === currentSection) 
                ? 'true' 
                : 'false'
            }
          >
            {link.text}
          </button>
        ))}
      </nav>
      
      <div className={styles.rightSection}>
        <button 
          className="theme-toggle"
          onClick={toggleDarkMode} 
          aria-label={darkMode ? '라이트 모드로 전환' : '다크 모드로 전환'}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
        <div 
          className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
        </div>
      </div>
      
      {/* 모바일 메뉴 팝업 */}
      <nav className={`${styles.mobileMenu} ${menuOpen ? styles.open : ''}`}>
        {navLinks.map((link) => (
          <button 
            key={`mobile-${link.id}`}
            className={`${styles.navLink} ${styles.mobileNavLink} ${
              (link.id === 'project-1' && isProjectSection()) || 
              (link.id === currentSection) 
                ? styles.active 
                : ''
            }`}
            onClick={() => scrollToSection(link.id)}
            data-section-id={link.id}
          >
            {link.text}
          </button>
        ))}
      </nav>
    </header>
  );
}