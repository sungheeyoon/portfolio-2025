'use client';

import styles from './Footer.module.css';

export default function Footer() {
  
  const scrollToTop = () => {
    console.log('맨 위로 가기 버튼 클릭됨');
    const homeSection = document.getElementById('home');
    if (homeSection) {
      homeSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div 
          className={styles.logo}
          onClick={scrollToTop}
        >
          <span>Portfolio</span>
        </div>
        
        <div className={styles.navLinks}>
          <a 
            href="#home" 
            className={styles.navLink}
          >
            홈
          </a>
          <a 
            href="#project-1" 
            className={styles.navLink}
          >
            프로젝트
          </a>
          <a 
            href="#skills" 
            className={styles.navLink}
          >
            기술 스택
          </a>
        </div>
        
        <div className={styles.socialLinks}>
          <a 
            href="https://github.com/sungheeyoon" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            GitHub
          </a>
          <span className={styles.socialLink}>
            torushy@gmail.com
          </span>
        </div>
        
        
        <button 
          className={styles.scrollTopButton}
          onClick={scrollToTop}
          aria-label="맨 위로 스크롤"
        >
          ↑
        </button>
      </div>
    </footer>
  );
}