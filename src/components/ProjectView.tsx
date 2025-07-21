'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './ProjectView.module.css';

// 프로젝트 데이터 타입 정의
export interface Project {
  id: number;
  title: string;
  description: string;
  details: string;
  technologies: string[];
  screenshots: string[];
  mockupImage?: string; // 목업 이미지 추가
  demoLink: string;
  githubLink: string;
  notionLink?: string;
  isMobileProject?: boolean; // 모바일 프로젝트인지 여부
}

interface ProjectViewProps {
  project: Project;
}

export default function ProjectView({ project }: ProjectViewProps) {
  const [imageError, setImageError] = useState<Record<number, boolean>>({});

  const scrollToNextProject = () => {
    let nextElement;

    if (project.id < 3) {
      nextElement = document.getElementById(`project-${project.id + 1}`);
    } else {
      nextElement = document.getElementById('skills');
    }

    if (nextElement) {
      nextElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 텍스트에 개행문자가 있으면 여러 문단으로 분할
  const renderDetails = () => {
    // 개행 문자를 기준으로, 여러 문단으로 나눔
    const paragraphs = project.details.split('\n').filter(p => p.trim() !== '');

    if (paragraphs.length <= 1) {
      return <p>{project.details}</p>;
    }

    return paragraphs.map((paragraph, index) => (
      <p key={index}>{paragraph}</p>
    ));
  };

  const handleImageError = (index: number) => {
    setImageError(prev => ({
      ...prev,
      [index]: true
    }));
  };

  // 프로젝트 ID가 1 또는 2이면 모바일 프로젝트로 간주
  const isMobileProject = project.isMobileProject !== undefined
    ? project.isMobileProject
    : (project.id === 1 || project.id === 2);

  return (
    <section className={styles.projectView} id={`project-${project.id}`}>
      <div className={styles.projectContainer}>
        <div className={styles.projectContent}>
          <h2 className={styles.projectTitle}>{project.title}</h2>

          <div className={styles.projectDescription}>
            <p className={styles.descriptionLead}>{project.description}</p>
            {renderDetails()}
          </div>

          <div className={styles.technologiesWrapper}>
            <h3>사용 기술</h3>
            <div className={styles.technologies}>
              {project.technologies.map((tech, index) => (
                <span key={index} className={styles.techBadge}>{tech}</span>
              ))}
            </div>
          </div>

          <div className={styles.screenshotWrapper}>
            <h3>스크린샷</h3>
            <div className={isMobileProject ? styles.mobileProjectScreenshots : styles.webProjectScreenshots}>
              {project.screenshots.length > 0 ? (
                project.screenshots.map((screenshot, index) => (
                  <div key={index} className={styles.screenshotItem}>
                    {!imageError[index] ? (
                      <img
                        src={screenshot}
                        alt={`${project.title} 스크린샷 ${index + 1}`}
                        className={styles.screenshotImage}
                        onError={() => handleImageError(index)}
                        loading="lazy"
                      />
                    ) : (
                      <div className={styles.placeholderImg}>이미지를 불러올 수 없습니다</div>
                    )}
                  </div>
                ))
              ) : (
                <div className={styles.placeholderImg}>이미지 준비 중</div>
              )}
            </div>
          </div>

          <div className={styles.projectLinks}>
            <Link href={project.demoLink} className={styles.projectLink} target="_blank" rel="noopener noreferrer">
              {project.id === 2 ? '앱 다운로드' : '시연하기'}
            </Link>
            <Link href={project.githubLink} className={styles.projectLink} target="_blank" rel="noopener noreferrer">
              GitHub
            </Link>
            {project.notionLink && (
              <Link href={project.notionLink} className={styles.projectLink} target="_blank" rel="noopener noreferrer">
                상세 문서 보기
              </Link>
            )}
          </div>
        </div>

        {/* 큰 화면에서만 오른쪽에 목업 이미지 표시 */}
        {project.mockupImage && (
          <div className={styles.mockupContainer}>
            <img 
              src={project.mockupImage} 
              alt={`${project.title} 목업 이미지`} 
              className={styles.mockupImage}
            />
          </div>
        )}
      </div>

      {/* <div className="scroll-down" onClick={scrollToNextProject}>
        <span className="scroll-down-text">
          {project.id < 3 ? '다음 프로젝트' : '기술 스택 보기'}
        </span>
        <div className="scroll-down-arrow"></div>
      </div> */}
    </section>
  );
}