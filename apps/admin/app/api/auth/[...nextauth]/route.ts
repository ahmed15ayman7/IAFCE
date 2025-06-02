import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { adminAuthApi } from '@/lib/api';
import { Permission, AdminRole } from '@shared/prisma';

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                try {
                    const response = await adminAuthApi.login({
                        email: credentials?.email || '',
                        password: credentials?.password || '',
                    });

                    const { access_token, admin, refreshToken } = response;
                    console.log(response);

                    if (admin) {
                        return {
                            id: admin.id,
                            email: admin.email,
                            name: `${admin.firstName} ${admin.lastName}`,
                            accessToken: access_token,
                            refreshToken: refreshToken,
                            permissions: admin.permissions,
                            roles: admin.roles,
                        };
                    }
                    return null;
                } catch (error) {
                    console.log(error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = (user as any).accessToken;
                token.permissions = (user as any).permissions;
                token.roles = (user as any).roles;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.accessToken = token.accessToken as string;
                session.user.permissions = token.permissions as Permission[];
                session.user.roles = token.roles as AdminRole[];
            }
            return session;
        },
    },
    pages: {
        signIn: '/admin/login',
    },
    session: {
        strategy: 'jwt',
    },
});

export { handler as GET, handler as POST }; 