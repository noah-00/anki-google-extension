import Index from "../../components/Index";
import New from "../../components/New";
import { PageType } from "@/types";
import { PAGE_TYPE_INDEX, PAGE_TYPE_NEW } from "@/utils/const";

interface HomeProps {
  activePage: PageType;
}

export default function Home({ activePage }: HomeProps) {
  return (
    <div>
      {activePage === PAGE_TYPE_INDEX && <Index />}
      {activePage === PAGE_TYPE_NEW && <New />}
    </div>
  );
}
