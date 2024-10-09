import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

export const authOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID || "",
            clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
        }),
        // ...add more providers here
    ],
    // Configure one or more authentication providers
    pages: {
        signIn: 'auth/signin', 
        signOut: '/auth/signout',
        error: '/auth/error',
        newUser: '/auth/signup'
    },
}

export default NextAuth(authOptions)