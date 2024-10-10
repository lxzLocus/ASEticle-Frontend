// ./src/app/auth/signin/SignInClient.tsx
"use client";  // クライアントコンポーネントとして宣言

import { signIn, signOut, useSession } from "next-auth/react";
import { Theme } from '@radix-ui/themes';
import React, { useState, useEffect } from 'react';

export default function SignInClient() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

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
      <Theme
          appearance={darkMode ? 'dark' : 'light'}
          accentColor="mint"
          grayColor="gray"
          panelBackground="solid"
          scaling="100%"
          radius="full"
      >
          <div>
              {!session && (
                  <>
                      {loading ? (
                          <>Loading ...</>
                      ) : (
                          <>
                              Not signed in <br />
                              <button onClick={() => signIn()}>Sign in</button>
                          </>
                      )}
                  </>
              )}
              {session && (
                  <>
                      name:{session} <br />
                      image:
                      <img
                          alt="icon"
                          style={{ width: "100px", height: "100px" }}
                      />
                      <br />
                      <button onClick={() => signOut()}>Sign out</button>
                  </>
              )}
          </div>
    </Theme>
  );
}
