import { useTabs } from "@/context/tabs";

import Index from "../../components/Index";
import New from "../../components/New";

import { PAGE_TYPE_INDEX, PAGE_TYPE_NEW } from "@/utils/const";

export default function Home() {
  const { activePage } = useTabs();

  return (
    <div>
      {activePage === PAGE_TYPE_INDEX && <Index />}
      {activePage === PAGE_TYPE_NEW && <New />}
    </div>
  );
}
