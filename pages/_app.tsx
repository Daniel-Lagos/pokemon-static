import type { AppProps } from "next/app";
import { NextUIProvider } from "@nextui-org/react";
import { darkTheme } from "../themes";

import "../styles/globals.css";
import Head from "next/head";
import AdvertiserProvider from "./test/contexts/AdvertiserContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="google-signin-client_id"
          content="751564689013-5mmokt7kti1qneh99thbrpk9lqo9hmd8.apps.googleusercontent.com"
        />
      </Head>
      <NextUIProvider theme={darkTheme}>
        {/* <AdvertiserProvider> */}
          <Component {...pageProps} />
        {/* </AdvertiserProvider> */}
      </NextUIProvider>
    </>
  );
}

export default MyApp;
