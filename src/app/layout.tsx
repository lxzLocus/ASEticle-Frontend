// ./src/app/layout.tsx
"use client";  // これにより、クライアントサイドで動作するようになります

import { SessionProvider } from "next-auth/react"; // SessionProvider をインポート
import './globals.css'; // 他のグローバルスタイル
import { Theme } from '@radix-ui/themes';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Theme appearance="dark" accentColor="mint">
            {children}
          </Theme>
        </SessionProvider>
      </body>
    </html>
  );
}
