'use client';

import { useEffect, useRef } from 'react';
import styles from './SkillsSection.module.css';

// 스킬 카테고리 및 데이터 정의
interface Skill {
  id: number;
  name: string;
  level: number; // 1-10 사이의 숫자로 레벨 표현
  icon?: string;
}

interface SkillCategory {
  id: number;
  name: string;
  skills: Skill[];
}

// 스킬 데이터
const skillsData: SkillCategory[] = [
  {
    id: 1,
    name: '프론트엔드',
    skills: [
      { id: 1, name: 'HTML5', level: 9 },
      { id: 2, name: 'CSS3', level: 8 },
      { id: 3, name: 'JavaScript', level: 9 },
      { id: 4, name: 'React', level: 8 },
      { id: 5, name: 'Vue.js', level: 7 },
      { id: 6, name: 'Next.js', level: 8 },
    ]
  },
  {
    id: 2,
    name: '백엔드',
    skills: [
      { id: 7, name: 'Node.js', level: 8 },
      { id: 8, name: 'Express', level: 8 },
      { id: 9, name: 'MongoDB', level: 7 },
      { id: 10, name: 'SQL', level: 7 },
      { id: 11, name: 'Python', level: 6 },
    ]
  },
  {
    id: 3,
    name: '모바일',
    skills: [
      { id: 12, name: 'Flutter', level: 9 },
      { id: 13, name: 'React Native', level: 7 },
      { id: 14, name: 'Firebase', level: 8 },
      { id: 15, name: 'App Store & Play Store', level: 7 },
    ]
  }
];

export default function SkillsSection() {
  const skillRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.animateSkill);
          
          // 스킬 바 애니메이션 설정
          const skillLevel = entry.target.querySelector(`.${styles.skillBar}`);
          if (skillLevel && skillLevel instanceof HTMLElement) {
            const width = skillLevel.getAttribute('data-width');
            if (width) {
              setTimeout(() => {
                skillLevel.style.width = width;
              }, 100);
            }
          }
        }
      });
    }, { threshold: 0.1 });

    skillRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => {
      skillRefs.current.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }
    };
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="skills" className={styles.skillsSection}>
      <div className={styles.skillsContainer}>
        <h2 
          ref={titleRef}
          className={`section-title ${styles.sectionTitle}`}
        >
          기술 스택
        </h2>
        
        <div className={styles.categoryContainer}>
          {skillsData.map((category) => (
            <div key={category.id} className={styles.categoryWrapper} style={{ marginBottom: '4rem' }}>
              <h3 className={styles.categoryTitle}>
                {category.name}
              </h3>
              
              <div className={styles.skillsGrid}>
                {category.skills.map((skill, index) => {
                  const delayIndex = (category.id - 1) * 6 + index; // 각 카테고리 별 딜레이 계산
                  return (
                    <div 
                      key={skill.id} 
                      className={styles.skillItem}
                      ref={el => {
                        skillRefs.current[delayIndex] = el;
                        return undefined;
                      }}
                      style={{ animationDelay: `${0.1 * delayIndex}s` }}
                    >
                      <div className={styles.skillHeader}>
                        <span className={styles.skillName}>
                          {skill.name}
                        </span>
                        <div className={styles.skillRating}>
                          {[...Array(5)].map((_, i) => (
                            <div 
                              key={i} 
                              className={`${styles.skillDot} ${
                                i < Math.floor(skill.level / 2) 
                                  ? styles.filled 
                                  : styles.empty
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className={styles.skillBarContainer}>
                        <div 
                          className={styles.skillBar}
                          data-width={`${skill.level * 10}%`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="scroll-down" onClick={scrollToContact}>
        <span className="scroll-down-text">연락처로 이동</span>
        <div className="scroll-down-arrow"></div>
      </div>
    </section>
  );
}