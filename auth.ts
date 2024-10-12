import NextAuth from "next-auth"
// import log from "logging-service"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"

export const { auth, handlers, signIn, signOut } = NextAuth({
    providers: [GitHub, Google],
    debug: true,
    // logger: {
    //     error(code, ...message) {
    //         log.error(code, message)
    //     },
    //     warn(code, ...message) {
    //         log.warn(code, message)
    //     },
    //     debug(code, ...message) {
    //         log.debug(code, message)
    //     },
    // }
});

