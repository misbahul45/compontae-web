import NextAuth, { DefaultSession, User as DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials"
import prisma from "./lib/db";
import bcrypt from "bcryptjs"

// Extend the User interface
interface User extends DefaultUser {
  username: string;
  role: string;
}

// Extend the Session interface
interface Session extends DefaultSession {
  user: {
    id?: string;
    email?: string;
    username?: string;
    image?: string;
    role?: string;
  } & DefaultSession["user"]
}

// Extend the JWT interface
interface JWT extends DefaultJWT {
  role?: string;
  username?: string;
}

// Declare module augmentations
declare module "next-auth" {
  interface User {
    username: string;
    role: string;
  }
  interface Session {
    user: {
      id?: string;
      email?: string;
      username?: string;
      image?: string;
      role?: string;
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    username?: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials): Promise<User | null> {
        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email as string },
          });
          
          if (!user) {
            return null;
          }
      
          const isValid = await bcrypt.compare(
            credentials.password as string, 
            user.password as string
          );
      
          if (!isValid) {
            console.log("Password mismatch");
            return null;
          }

          return {
            email: user.email,
            username: user.username,
            image: user.image,
            role: user.role
          } as User;
        } catch (error) {
          console.error("Error in authorize:", error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }): Promise<JWT> {
      if (user) {
        token.role = (user as User).role;
        token.username = (user as User).username;
      }
      return token;
    },
    async session({ session, token }): Promise<Session> {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.username = token.username as string;
      }
      return session as Session;
    }
  },
  session: {
    strategy: "jwt"  
  },
  pages: {
    signIn: '/login',
  }
});