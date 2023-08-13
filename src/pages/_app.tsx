import type { AppProps } from "next/app";
import { useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { PAGE_TYPE_INDEX } from "@/utils/const";

import { PageType } from "@/types";

import "../../src/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const [activePage, setActivePage] = useState<PageType>(PAGE_TYPE_INDEX); // activePageの初期値に型を指定

  const navigateToPage = (page: PageType) => {
    // 引数に型を指定
    setActivePage(page);
  };

  return (
    <div>
      <Header navigateToPage={navigateToPage} activePage={activePage} />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}
