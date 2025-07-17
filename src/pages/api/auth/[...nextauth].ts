import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWTExtended, SessionExtended, UserExtended } from "@/types/Auth";
import authServices from "@/service/auth.service";
import environment from "@/config/enviroment";

export default NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  secret: environment.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        nik: { label: "nik", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(
        credentials: Record<"nik" | "password", string> | undefined
      ): Promise<UserExtended | null> {
        try {
          const { nik, password } = credentials as {
            nik: string;
            password: string;
          };

          const result = await authServices.login({ nik, password });
          const accessToken = result.data.data.accessToken;

          const me = await authServices.me(accessToken);
          const user = me.data.data;

          if (
            accessToken &&
            result.status === 200 &&
            user.id &&
            me.status === 200
          ) {
            user.accessToken = accessToken;
            return user;
          }

          // jika data tidak valid
          return null;
        } catch (error) {
          // tangani error dengan aman agar tidak trigger error page
          console.error("Login error in authorize():", error);
          return null; // biar tetap redirect ke halaman login biasa
        }
      },
    }),
  ],
  callbacks: {
    async jwt({
      token,
      user,
    }: {
      token: JWTExtended;
      user: UserExtended | null;
    }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: SessionExtended;
      token: JWTExtended;
    }) {
      session.user = token.user;
      session.accessToken = token.user?.accessToken;
      return session;
    },
  },
});
