import React, { useState } from "react";
import Index from "../../components/Index";
import New from "../../components/New";

type PageType = "index" | "new"; // ページのタイプを定義

export default function Home() {
  const [activePage, setActivePage] = useState<PageType>("index"); // activePageの初期値に型を指定

  const navigateToPage = (page: PageType) => {
    // 引数に型を指定
    setActivePage(page);
  };

  return (
    <>
      {activePage === "index" && <Index navigateToPage={navigateToPage} />}
      {activePage === "new" && <New navigateToPage={navigateToPage} />}
    </>
  );
}
