import NextAuth from "next-auth";
import { User } from "@shared/prisma";
declare module "next-auth" {
    interface Session {
        user: User,
        access_token: string;
        refreshToken: string;
    }
}