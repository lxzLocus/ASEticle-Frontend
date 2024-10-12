// ./src/app/signin/page.tsx
"use client";

import { signIn } from "next-auth/react";

export default function SignUpPage() {
    return (
        <div>
            <h1>ログイン</h1>
            <p>アカウントにログインしてください。</p>
            <button onClick={() => signIn()}>ログイン</button>
        </div>
    );
}
