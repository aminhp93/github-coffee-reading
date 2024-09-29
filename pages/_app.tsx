import "@/styles/globals.css";

// Import packages
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import {
  SupabaseAuthProvider,
  useAuth,
  AuthUserContext,
} from "@/@core/context/SupabaseContext";

const AppWithAuth = (props: {
  Component: NextPage;
  pageProps: AppProps["pageProps"];
}) => {
  const { authUser, signInWithOAuth }: AuthUserContext = useAuth();

  return (
    <App {...props} authUser={authUser} signInWithOAuth={signInWithOAuth} />
  );
};

const App = (props: {
  Component: NextPage;
  pageProps: AppProps["pageProps"];
  authUser: AuthUserContext["authUser"];
  signInWithOAuth: AuthUserContext["signInWithOAuth"];
}) => {
  const { Component, pageProps, authUser, signInWithOAuth } = props;

  return (
    <>
      {!authUser?.email ? (
        <div>
          <div onClick={signInWithOAuth}>Login</div>
        </div>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
};

const AppWrapper = (props: {
  Component: NextPage;
  pageProps: AppProps["pageProps"];
}) => {
  return (
    <SupabaseAuthProvider>
      <AppWithAuth {...props} />
    </SupabaseAuthProvider>
  );
};

export default AppWrapper;
