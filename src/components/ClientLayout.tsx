'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from '../context/ThemeContext';
import { SectionProvider } from '../context/SectionContext';
import Header from './Header';

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <SectionProvider>
        <Header />
        {children}
      </SectionProvider>
    </ThemeProvider>
  );
}
