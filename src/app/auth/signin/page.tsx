"use client";  // クライアントコンポーネントとして宣言

import { signIn, useSession } from "next-auth/react";
import { Theme } from '@radix-ui/themes';
import React, { useState, useEffect } from 'react';

export default function SignInClient() {
 
    return   <button onClick={() => signIn()}>Sign In</button>
}
