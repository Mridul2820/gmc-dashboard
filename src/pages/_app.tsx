import NextNProgress from "nextjs-progressbar";
import type { AppProps } from "next/app";
import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNProgress color="#CD2E54" options={{ showSpinner: false }} />
      <Toaster />
      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
}
