import type { AppProps } from "next/app";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { TabsProvider } from "@/context/tabs";

import "../../src/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TabsProvider>
      <div className="w-96">
        <Header />
        <Component {...pageProps} />
        <Footer />
      </div>
    </TabsProvider>
  );
}
