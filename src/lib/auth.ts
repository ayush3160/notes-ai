import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const AuthProvidersEnum = {
  GOOGLE: "google",
  CREDENTIALS: "credentials",
} as const;

export type AuthProvider =
  (typeof AuthProvidersEnum)[keyof typeof AuthProvidersEnum];

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    {
      id: "credentials",
      name: "Credentials",
      type: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // You can add your own logic here to find the user
        const user = { id: "1", name: "J Smith", email: "" };
        if (user) {
          return user;
        }
        return null;
      },
    },
  ],
  secret: process.env.NEXTAUTH_SECRET,
};
