'use client';

import { useEffect, useRef } from 'react';
import styles from './EnhancedSkillsSection.module.css';
import { 
  FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaGitAlt, FaGithub, FaFigma, FaPython
} from 'react-icons/fa';
import { 
  SiJavascript, SiTypescript, SiNextdotjs, SiTailwindcss, SiMongodb, SiExpress,
  SiFirebase, SiFlutter, SiVuedotjs, SiMysql, SiPostgresql,
  SiSupabase, SiDjango, SiFastapi
} from 'react-icons/si';

import { BiLogoVisualStudio } from "react-icons/bi";

// 기술 아이콘 매핑 (React Icons로 교체)
const SkillIcon = ({ name }: { name: string }) => {
  const iconSize = 24;
  
  switch(name) {
    // 프론트엔드
    case 'HTML5': return <FaHtml5 size={iconSize} color="#E34F26" />;
    case 'CSS3': return <FaCss3Alt size={iconSize} color="#1572B6" />;
    case 'JavaScript': return <SiJavascript size={iconSize} color="#F7DF1E" />;
    case 'TypeScript': return <SiTypescript size={iconSize} color="#3178C6" />;
    case 'React': return <FaReact size={iconSize} color="#61DAFB" />;
    case 'Vue.js': return <SiVuedotjs size={iconSize} color="#4FC08D" />;
    case 'Next.js': return <SiNextdotjs size={iconSize} color="#000000" />;
    case 'Tailwind CSS': return <SiTailwindcss size={iconSize} color="#06B6D4" />;
    
    // 백엔드
    case 'Node.js': return <FaNodeJs size={iconSize} color="#339933" />;
    case 'Express': return <SiExpress size={iconSize} color="#000000" />;
    case 'MongoDB': return <SiMongodb size={iconSize} color="#47A248" />;
    case 'MySQL': return <SiMysql size={iconSize} color="#4479A1" />;
    case 'PostgreSQL': return <SiPostgresql size={iconSize} color="#4169E1" />;
    case 'Firebase': return <SiFirebase size={iconSize} color="#FFCA28" />;
    case 'Supabase': return <SiSupabase size={iconSize} color="#3ECF8E" />;
    case 'Python': return <FaPython size={iconSize} color="#3776AB" />;
    case 'Django': return <SiDjango size={iconSize} color="#092E20" />;
    case 'FastAPI': return <SiFastapi size={iconSize} color="#009688" />;
    
    // 개발 도구 & 모바일
    case 'Flutter': return <SiFlutter size={iconSize} color="#02569B" />;
    case 'Git': return <FaGitAlt size={iconSize} color="#F05032" />;
    case 'GitHub': return <FaGithub size={iconSize} color="#181717" />;
    case 'VS Code': return <BiLogoVisualStudio size={iconSize} color="#007ACC" />;
    case 'Figma': return <FaFigma size={iconSize} color="#F24E1E" />;

    
    // 기본 아이콘
    default: return <div style={{ fontSize: iconSize }}>⚡</div>;
  }
};

// 스킬 카테고리 및 데이터 정의
interface Skill {
  id: number;
  name: string;
  description: string;
}

interface SkillCategory {
  id: number;
  name: string;
  skills: Skill[];
  color: string;
}

// 수정된 기술 스택 데이터 (카테고리 개편)
const skillsData: SkillCategory[] = [
  {
    id: 1,
    name: '프론트엔드',
    color: '#4a6bff',
    skills: [
      { id: 1, name: 'Next.js', description: 'React 기반 풀스택 프레임워크, 강력한 SSR 및 정적 생성 지원' },
      { id: 2, name: 'React', description: '컴포넌트 기반 UI 라이브러리, 가상 DOM으로 최적화된 렌더링 제공' },
      { id: 3, name: 'TypeScript', description: '정적 타입 검사를 통한 안정적인 코드 작성 지원' },
      { id: 4, name: 'Tailwind CSS', description: '유틸리티 기반 CSS 프레임워크, 빠른 스타일링 워크플로우' },
      { id: 5, name: 'JavaScript', description: '웹 개발의 핵심 언어, 동적 인터랙션 구현' },
      { id: 6, name: 'HTML5', description: '웹 구조를 만드는 마크업 언어, 시맨틱 태그 활용' },
      { id: 7, name: 'CSS3', description: '웹 스타일링 언어, 애니메이션과 반응형 디자인 구현' },
    ]
  },
  {
    id: 2,
    name: '백엔드 & 데이터베이스',
    color: '#22c55e',
    skills: [
      { id: 8, name: 'Node.js', description: '확장성 높은 서버 사이드 JavaScript 런타임' },
      { id: 9, name: 'Express', description: 'Node.js를 위한 경량 웹 프레임워크, RESTful API 구현' },
      { id: 10, name: 'MongoDB', description: 'NoSQL 문서 기반 데이터베이스, JSON과 유사한 형식으로 데이터 저장' },
      { id: 11, name: 'MySQL', description: '관계형 데이터베이스 관리 시스템, 구조화된 데이터 처리' },
      { id: 12, name: 'Firebase', description: 'Google의 풀스택 개발 플랫폼, 실시간 데이터베이스 및 인증 제공' },
      { id: 13, name: 'Supabase', description: '오픈소스 Firebase 대체 솔루션, PostgreSQL 기반 백엔드 서비스' },
      { id: 14, name: 'FastAPI', description: 'Python 기반 고성능 웹 프레임워크, 자동 API 문서 생성 기능 제공' },
    ]
  },
  {
    id: 3,
    name: '개발 도구 & 모바일',
    color: '#8b5cf6',
    skills: [
      { id: 15, name: 'Flutter', description: 'Dart 기반 크로스 플랫폼 모바일 프레임워크, 고성능 네이티브 앱 개발' },
      { id: 16, name: 'Git', description: '분산 버전 관리 시스템, 효율적인 협업 및 코드 이력 관리' },
      { id: 17, name: 'GitHub', description: 'Git 기반 협업 플랫폼, 오픈 소스 프로젝트 관리' },
      { id: 18, name: 'VS Code', description: '확장성 높은 코드 에디터, 다양한 언어 지원 및 디버깅 기능' },
      { id: 19, name: 'Figma', description: '클라우드 기반 UI/UX 디자인 및 프로토타이핑 툴' },
    ]
  }
];

export default function EnhancedSkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const categoriesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.animateIn);
        }
      });
    }, { threshold: 0.1 });

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    categoriesRef.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, []);


  return (
    <section id="skills" className={styles.skillsSection} ref={sectionRef}>
      <div className={styles.skillsContainer}>
        <h2 
          ref={titleRef}
          className="section-title"
        >
          기술 스택
        </h2>
        
        <div className={styles.skillsGrid}>
          {skillsData.map((category, categoryIndex) => (
            <div 
              key={category.id} 
              className={styles.categoryCard}
              ref={(el) => { categoriesRef.current[categoryIndex] = el; }}
            >
              <div 
                className={styles.categoryHeader}
                style={{ background: category.color }}
              >
                <h3 className={styles.categoryTitle}>{category.name}</h3>
                <div className={styles.categoryPattern}></div>
              </div>
              
              <div className={styles.skillsList}>
                {category.skills.map((skill) => (
                  <div 
                    key={skill.id} 
                    className={styles.skillItem}
                  >
                    <div className={styles.skillContent}>
                      <div className={styles.skillHeader}>
                        <div className={styles.skillInfo}>
                          <span 
                            className={styles.skillIcon}
                            style={{ background: category.color + '10', border: `2px solid ${category.color}40` }}
                          >
                            <SkillIcon name={skill.name} />
                          </span>
                          <div className={styles.skillTextContainer}>
                            <h4 className={styles.skillName}>{skill.name}</h4>
                            <p className={styles.skillDescription}>{skill.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

       
      </div>
      
    </section>
  );
}