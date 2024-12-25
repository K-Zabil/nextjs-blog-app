import { AuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID || '',
            clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text', placeholder: 'example@mail.com' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                console.log(credentials);
                if (!credentials?.email || !credentials?.password) throw new Error('Email and password are required');
                const user = await prisma.user.findUnique({ where: { email: credentials.email } });
                if (!user || !(await bcrypt.compare(credentials.password, user.hashedPassword))) return null;
                return user;
            },
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/auth/signin',
        error: '/auth/error',
    },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };