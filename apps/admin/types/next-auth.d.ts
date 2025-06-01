import NextAuth from "next-auth";
import { AdminRole, Permission, User } from "@shared/prisma";
declare module "next-auth" {
    interface Session {
        user: User & {
            accessToken: string;
            permissions: Permission[];
            roles: AdminRole[];
        },
        access_token: string;
        refreshToken: string;
    }
}