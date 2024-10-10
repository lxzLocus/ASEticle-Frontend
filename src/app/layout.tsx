// ./src/app/layout.tsx
"use client";  // これにより、クライアントサイドで動作するようになります

import { SessionProvider } from "next-auth/react"; // SessionProvider をインポート
import './globals.css'; // 他のグローバルスタイル
import { Theme } from '@radix-ui/themes';
import React, { useState, useEffect } from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);
  const [isClient, setIsClient] = useState(false);


  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }
  }, [darkMode, isClient]);

  if (!isClient) {
    return null;
  }
  
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Theme 
            appearance={darkMode ? 'dark' : 'light'}
            accentColor="mint"
            grayColor="gray"
            panelBackground="solid"
            scaling="100%"
            radius="full"
          >
            {children}
          </Theme>
        </SessionProvider>
      </body>
    </html>
  );
}
