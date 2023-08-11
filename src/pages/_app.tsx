import type { AppProps } from "next/app";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import "../../src/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}
