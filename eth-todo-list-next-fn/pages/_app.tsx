import "../styles/globals.css";
import type { AppProps } from "next/app";
import Toolbar from "../components/Utils";

/*
The Component prop is the active page, so whenever you navigate between routes, Component will change to the new page. Therefore, any props you send to Component will be received by the page.
*/

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Toolbar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
