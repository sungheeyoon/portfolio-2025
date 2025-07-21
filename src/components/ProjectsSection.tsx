'use client';

import { useState } from 'react';
import ProjectView, { Project } from './ProjectView';
import styles from './ProjectsSection.module.css';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

// 프로젝트 데이터
const projectsData: Project[] = [
  {
    id: 1,
    title: '식플 - 식물 관리 및 기록 서비스',
    description: 'Flutter와 Firebase를 활용한 식물 관리 모바일 애플리케이션',
    details: '사용자 인증부터 식물 등록, 스케줄 관리, 커뮤니티 기능까지 식물 관리에 특화된 모바일 앱입니다. Firebase로 실시간 데이터 연동 및 인증을 처리했으며, Flutter와 Riverpod 상태 관리로 구조적이고 반응성 높은 UI를 구현했습니다. 로컬 알림, 한글 자동완성 검색, 커뮤니티 기능, 페이지네이션 등 다양한 기능이 포함되어 있습니다.',
    technologies: ['Flutter', 'Firebase', 'Riverpod', 'Cloud Firestore', 'Firebase Auth', 'Local Notifications'],
    screenshots: [
      '/img/sikple/list.png',
      '/img/sikple/check.png',
      '/img/sikple/search.png',
      '/img/sikple/diary.png'
    ],
    mockupImage: '/img/mockups/sikple_mockup.png',
    isMobileProject: true,
    demoLink: '#',
    githubLink: 'https://github.com/sungheeyoon/flutter_plant_plan',
    notionLink: 'https://torushy.notion.site/Flutter-Firebase-100fd8f969ca8023892b0000'
  },
  {
    id: 2,
    title: '오늘의 미션 - 일상 루틴 관리 앱',
    description: 'Flutter와 Hive, Riverpod를 활용한 일상 목표 달성 모바일 애플리케이션',
    details: '사용자가 아침 루틴과 일일 목표를 효과적으로 설정하고 실천할 수 있는 모바일 앱입니다. 할 일 관리, 캘린더 기반 투두리스트, 성취 통계 시각화, 로컬 알림 등의 기능을 제공합니다. Hive를 통한 로컬 데이터 저장과 Riverpod 기반의 상태 관리로 효율적인 앱 구조를 구현했습니다. 디자인 시스템 구축과 트러블슈팅 경험을 통해 확장성과 유지보수성을 고려했습니다.',
    technologies: ['Flutter', 'Hive', 'Riverpod', 'Local Notifications', 'Table Calendar', 'FL Chart'],
    screenshots: [
      '/img/todo/add.png',
      '/img/todo/write.png',
      '/img/todo/statistics.png',
      '/img/todo/setting.png'
    ],
    mockupImage: '/img/mockups/todays_mission_mockup.png',
    isMobileProject: true,
    demoLink: 'https://play.google.com/store/apps/details?id=com.torushy.plantPlan',
    githubLink: 'https://github.com/sungheeyoon/flutter_todo_plan',
    notionLink: 'https://torushy.notion.site/Flutter-Hive-100fd8f969ca802b8f1c00000'
  },
  {
    id: 3,
    title: '동네속닥 – 우리 동네 제보 커뮤니티',
    description: 'Next.js 15와 FastAPI, Supabase를 활용한 동네 중심 커뮤니티 웹 애플리케이션',
    details: `사용자가 자신의 동네에서 발생하는 다양한 이슈들을 효과적으로 제보하고 공유할 수 있는 지역 커뮤니티 플랫폼입니다. 
    카카오맵 연동을 통한 정확한 위치 기반 제보, 카테고리별 분류 시스템, 댓글과 투표를 통한 상호작용, 3단계 권한 기반관리자 시스템 등의 기능을 제공합니다. Supabase의 PostGIS를 활용한 지리정보 처리와 JWT 기반 인증, React Query를 통한 효율적인 서버 상태 관리로 안정적인 플랫폼을 구현했습니다. 카카오 OAuth 소셜 로그인과 실시간 데이터 동기화를 통해 사용자 경험과 보안성을 동시에 고려한 확장 가능한 아키텍처를 설계했습니다.`,
 technologies: [
    'Next.js',
    'FastAPI',
    'Supabase',
    'PostgreSQL',
    'PostGIS',
    'TypeScript',
    'Tailwind CSS',
    'React Query',
    'JWT',
    '카카오맵 API',
    '카카오 OAuth 2.0',
    'Sentry',
    'Vercel',
    'Render',
  ],
    screenshots: [
      '/img/dongne_sokdak/detail.png',
      '/img/dongne_sokdak/report.png'
    ],
    mockupImage: '/img/dongne_sokdak/main.png',
    isMobileProject: false,
    demoLink: 'https://dongne-sokdak.vercel.app',
    githubLink: 'https://github.com/sungheeyoon/dongne-sokdak',
    notionLink: 'https://torushy.notion.site/Next-js-15-FastAPI-Supabase-100fd8f969ca8031821500000'
  },
];

// 간단한 프로젝트 목록 데이터
const simpleProjectsData = [
  {
    id: 8,
    title: 'Airbnb Clone',
    description: 'Next.js 에어비앤비 클론',
    image: '/img/simple/airbnb.png',
    demoLink: 'https://airbnb-clone-chi-lime.vercel.app/',
    githubLink: 'https://github.com/sungheeyoon/airbnb-clone'
  },
  {
    id: 6,
    title: 'Cuptalk',
    description: '카카오톡 UI 클론',
    image: '/img/simple/cuptalk.png',
    demoLink: 'https://sungheeyoon.github.io/Cuptalk-2021/',
    githubLink: 'https://github.com/sungheeyoon/Cuptalk-2021'
  },
  {
    id: 5,
    title: 'Ywitter',
    description: 'React 트위터 클론',
    image: '/img/simple/ywitter.png',
    demoLink: 'https://sungheeyoon.github.io/ywitter/#/',
    githubLink: 'https://github.com/sungheeyoon/ywitter'
  },
  {
    id: 4,
    title: 'Yoonflix',
    description: 'React 영화 정보 사이트',
    image: '/img/simple/yoonflix.png',
    demoLink: 'https://sungheeyoon.github.io/yoonflix/#/',
    githubLink: 'https://github.com/sungheeyoon/yoonflix'
  }
];

export default function ProjectsSection() {
  const [showMore, setShowMore] = useState(false);

  return (
    <>
      {projectsData.map((project) => (
        <ProjectView key={project.id} project={project} />
      ))}
      
      <div className={styles.moreProjectsSection}>
        <div className={styles.moreProjectsContainer}>
          <button 
            className={styles.moreButton}
            onClick={() => setShowMore(!showMore)}
          >
{showMore ? '간단히' : '프로젝트 더보기'}
            {showMore ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          
          {showMore && (
            <div className={styles.simpleProjectsGrid}>
              {simpleProjectsData.map((project) => (
                <div key={project.id} className={styles.simpleProjectCard}>
                  <div className={styles.projectImageWrapper}>
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className={styles.projectImage}
                    />
                  </div>
                  <div className={styles.projectInfo}>
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                    <p className={styles.projectDescription}>{project.description}</p>
                    <div className={styles.projectLinks}>
                      <a 
                        href={project.demoLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={styles.linkButton}
                      >
                        보기
                      </a>
                      <a 
                        href={project.githubLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={styles.linkButton}
                      >
                        GitHub
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
