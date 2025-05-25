import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { authApi } from '@/lib/api'

const handler = NextAuth({
    providers: [
        // FacebookProvider({
        //     clientId: process.env.FACEBOOK_CLIENT_ID!,
        //     clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
        // }),
        // DiscordProvider({
        //     clientId: process.env.DISCORD_CLIENT_ID!,
        //     clientSecret: process.env.DISCORD_CLIENT_SECRET!,
        // }),
        // GoogleProvider({
        //     clientId: process.env.GOOGLE_CLIENT_ID!,
        //     clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        // }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                identifier: { label: "البريد الإلكتروني", type: "email" },
                password: { label: "كلمة المرور", type: "password" }
            },
            async authorize(credentials) {
                try {
                    const response = await authApi.login({
                        email: credentials?.identifier!,
                        password: credentials?.password!
                    })

                    if (response) {
                        return response
                    }
                    return null
                } catch (error) {
                    return null
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, account, user }) {
            if (account && user) {
                token.accessToken = account.access_token
                token.user = user
                // token.phoneVerified = user.phoneVerified
            }
            return token
        },
        async session({ session, token }) {
            session = token.user as any
            // session.user.phoneVerified = token.phoneVerified
            return session
        }
    },
    pages: {
        signIn: '/auth/signin',
        error: '/auth/error',
        // verifyPhone: '/auth/verify-phone',
        // onboarding: '/onboarding',
    },
    session: {
        strategy: 'jwt',
    },
})

export { handler as GET, handler as POST } 