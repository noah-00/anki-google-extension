import type { AppProps } from "next/app";
import Footer from "@/components/common/templates/Footer";
import Header from "@/components/common/templates/Header";
import { TabsProvider } from "@/context/tabs";
import { AddCardStoreProvider } from "@/context/addCardStore";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import "../../src/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TabsProvider>
      <AddCardStoreProvider>
        <div className="w-96 text-sm">
          <ToastContainer
            position="top-center"
            autoClose={1200}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          <Header />
          <Component {...pageProps} />
          <Footer />
        </div>
      </AddCardStoreProvider>
    </TabsProvider>
  );
}
