import { useTabs } from "@/context/tabs";

import Add from "../components/Add";
import Setting from "../components/Setting";

import { PAGE_TYPE_ADD, PAGE_TYPE_SETTING } from "@/utils/const";

export default function Home() {
  const { activePage } = useTabs();

  return (
    <div className="px-4 my-2">
      {activePage === PAGE_TYPE_ADD && <Add />}
      {activePage === PAGE_TYPE_SETTING && <Setting />}
    </div>
  );
}
