import { NextAuthOptions } from "next-auth";
import DuendeIDS6Provider from "next-auth/providers/duende-identity-server6";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 3600 * 24 * 30,
  },
  providers: [
    DuendeIDS6Provider({
      id: "duende-identity-server6",
      clientId: process.env.NEXT_Duende_ClientId,
      clientSecret: process.env.NEXT_Duende_clientSecret,
      issuer: process.env.NEXT_Duende_issuer,
      authorization: {
        params: {
          scope: "openid profile auctionApp",
        },
      },
      idToken: true,
    }),
  ],

  callbacks: {
    async jwt({ token, user, account, profile, session, trigger }) {
      // if (trigger === "signIn") {
      //   console.log("jwt callback");
      //   console.log({ token, user, account, profile, session, trigger });
      // }

      if (profile) {
        token.userName = profile.userName;
      }
      if (account) {
        token.access_token = account.access_token;
      }

      return token;
    },

    async session({ token, session }) {
      if (token) {
        session.user.userName = token.userName;
        session.user.access_token = token.access_token;
      }
      return session;
    },
  },
};
