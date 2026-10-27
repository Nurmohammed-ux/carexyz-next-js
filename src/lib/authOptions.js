import { loginUser } from "@/action/server/auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { collections, dbConnect } from "./dbConnect";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "your.email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await loginUser({
            email: credentials?.email,
            password: credentials?.password,
          });

          if (res && res.success && res.user) {
            return res.user;
          }
          return null;
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account.provider === "google") {
        
          const userCollection = dbConnect(collections.USER); 

          const existingUser = await userCollection.findOne({
            email: user?.email,
          });

          if (!existingUser) {
            const newUser = {
              provider: "google",
              email: user.email,
              name: user.name,
              image: user.image,
              role: "user",
              createdAt: new Date(),
            };

            await userCollection.insertOne(newUser);
          }
        }

        return true;
      } catch (error) {
        console.error("Google Sign-In Error:", error);
        return false; 
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.name = token.name;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login", // কাস্টম লগইন পেজ পাথ
  },
  secret: process.env.NEXTAUTH_SECRET,
};
