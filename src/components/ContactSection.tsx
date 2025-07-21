'use client';

import { useEffect, useRef } from 'react';
import styles from './ContactSection.module.css';

interface ContactInfo {
  icon: string;
  label: string;
  value: string;
  link?: string;
}

const contactInfoData: ContactInfo[] = [
  {
    icon: '📧',
    label: '이메일',
    value: 'sungheeyoon.dev@gmail.com',
    link: 'mailto:sungheeyoon.dev@gmail.com'
  },
  {
    icon: '🔗',
    label: 'GitHub',
    value: 'github.com/sungheeyoon',
    link: 'https://github.com/sungheeyoon'
  },
  {
    icon: '💼',
    label: '블로그',
    value: 'blog.sungheeyoon.dev',
    link: 'https://blog.sungheeyoon.dev'
  }
];

export default function ContactSection() {
  const infoRef = useRef<HTMLDivElement>(null);

  // 애니메이션을 위한 Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.animate);
          
          // 각 연락처 항목에 딜레이 애니메이션 적용
          const contactItems = entry.target.querySelectorAll(`.${styles.contactItem}`);
          contactItems.forEach((item, index) => {
            if (item instanceof HTMLElement) {
              item.classList.add(styles.animate);
              item.style.animationDelay = `${0.1 * index}s`;
            }
          });
        }
      });
    }, { threshold: 0.2 });

    if (infoRef.current) observer.observe(infoRef.current);

    return () => {
      if (infoRef.current) observer.unobserve(infoRef.current);
    };
  }, []);

  return (
    <section id="contact" className={styles.contactSection}>
      <div className={styles.container}>
        <h2 className="section-title">연락처</h2>
        
        <div className={styles.contentWrapper}>
          <div 
            className={styles.infoSection}
            ref={infoRef}
          >
            <div className={styles.contactInfo}>
              {contactInfoData.map((info, index) => (
                <div 
                  key={index} 
                  className={styles.contactItem}
                  style={{ animationDelay: `${0.1 * index}s` }}
                >
                  <div className={styles.iconWrapper}>
                    {info.icon}
                  </div>
                  <div>
                    <p className={styles.contactLabel}>
                      {info.label}
                    </p>
                    {info.link ? (
                      <a 
                        href={info.link} 
                        className={styles.contactLink}
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className={styles.contactValue}>{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}