import { NextAuthOptions } from "next-auth";
import DuendeIDS6Provider from "next-auth/providers/duende-identity-server6";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    DuendeIDS6Provider({
      id: "duende-identity-server6",
      clientId: "nextApp",
      clientSecret: "NotASecret",
      issuer: "http://localhost:5000",
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
      // console.log("jwt callback");
      // console.log({ token, user, account, profile, session, trigger });

      if (profile) {
        token.userName = profile.userName;
      }
      if (account) {
        token.id_token = account.id_token;
      }

      return token;
    },

    async session({ token, session }) {
      if (token) {
        session.user.userName = token.userName;
        session.user.id_token = token.id_token;
      }
      return session;
    },
  },
};
