// import "@/styles/globals.css";
import MainTheme from "@/components/templates/appTheme";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MainTheme {...pageProps}>
      <Component />
    </MainTheme>
  );
}
