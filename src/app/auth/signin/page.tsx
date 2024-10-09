// ./src/app/auth/signin/SignInClient.tsx
"use client";  // クライアントコンポーネントとして宣言

import { signIn, signOut, useSession } from "next-auth/react";
import { Theme } from '@radix-ui/themes';

export default function SignInClient() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <Theme appearance="dark" accentColor="mint">
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
            <button onClick={() => signOut()}>Sign out</button>
          </>
        )}
      </div>
    </Theme>
  );
}
