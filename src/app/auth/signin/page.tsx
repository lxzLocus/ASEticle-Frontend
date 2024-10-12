"use client";  // クライアントコンポーネントとして宣言

import { signIn} from "next-auth/react";

export default function SignInClient() {
    return signIn()
}
