export const authConfig = {
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/signup",
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }: any) {
      const isLoggedIn = !!auth?.user;
      const isOnLoginPage = nextUrl.pathname.startsWith("/auth/login");
      const isOnSignupPage = nextUrl.pathname.startsWith("/auth/signup");

      if (isLoggedIn) {
        if (isOnLoginPage || isOnSignupPage) {
          return Response.redirect(new URL("/", nextUrl));
        }
      }

      return true;
    },
    async jwt({ token, user }: any) {
      if (user) {
        token = { ...token, id: user.id };
      }

      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        const { id } = token as { id: string };
        const { user } = session;

        session = { ...session, user: { ...user, id } };
      }

      return session;
    },
  },
  providers: [],
};
