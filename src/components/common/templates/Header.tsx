import { PAGE_TYPE_ADD, PAGE_TYPE_SETTING } from "@/utils/Const";
import { useTabs } from "@/context/tabs";
import Image from "next/image";
import imgSrc from "@/../public/icons/icon-header.png";

import HeaderNav from "../parts/HeaderNav";

const Header = () => {
  const { activePage, handleSetActivePage } = useTabs();

  return (
    <>
      <header>
        <div className="flex bg-default-blue p-5 font-bold items-center">
          <Image
            height={28}
            width={28}
            src={imgSrc}
            alt="headerImage"
            className="mr-2 rounded-md"
          />
          <div>Anki Quicker</div>
        </div>
        <div className="flex border-b border-gray-200">
          <HeaderNav
            isActive={activePage === PAGE_TYPE_ADD}
            handleClick={() => handleSetActivePage(PAGE_TYPE_ADD)}
          >
            Add
          </HeaderNav>
          <HeaderNav
            isActive={activePage === PAGE_TYPE_SETTING}
            handleClick={() => handleSetActivePage(PAGE_TYPE_SETTING)}
          >
            Setting
          </HeaderNav>
        </div>
      </header>
    </>
  );
};

export default Header;
