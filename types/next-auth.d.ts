import { JWT } from "next-auth/jwt";

import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      userName?: string;
      access_token?: string;
    } & DefaultSession["user"];
  }

  interface Profile {
    userName?: string;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    userName?: string;
    access_token?: string;
  }
}
