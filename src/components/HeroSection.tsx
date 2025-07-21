'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  const [name, setName] = useState('성희윤');

  useEffect(() => {
    // 로컬 스토리지에서 이름 가져오기 시도
    const savedName = localStorage.getItem('portfolio-name');
    if (savedName) {
      setName(savedName);
    }
  }, []);

  return (
    <section id="home" className={styles.heroSection}>
      <h1 className={styles.heroTitle}>
        안녕하세요,<br />
        저는 <span className={styles.highlighted}>{name}</span>입니다
      </h1>
      <p className={styles.heroDescription}>
        열정적인 웹 개발자로서 사용자 경험을 중심으로 한 디지털 솔루션을 제공합니다.
        창의적인 아이디어와 기술적 전문성을 통해 웹의 가능성을 확장하고 있습니다.
      </p>
      <Link href="#project-1" className="cta-btn">
        프로젝트 보기
      </Link>
    </section>
  );
}