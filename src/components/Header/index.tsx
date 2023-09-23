import { PAGE_TYPE_ADD, PAGE_TYPE_SETTING } from "@/utils/Const";
import { useTabs } from "@/context/tabs";
import Image from "next/image";
import imgSrc from "../../../public/icons/icon.png";

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
          <div
            className={`py-2 px-10 mr-2 cursor-pointer  ${
              activePage === PAGE_TYPE_ADD
                ? "text-blue-500 bg-slate-200 border-b-2 border-blue-500"
                : null
            }`}
            onClick={() => handleSetActivePage(PAGE_TYPE_ADD)}
          >
            Add
          </div>
          <div
            className={`py-2 px-10 mr-2 cursor-pointer  ${
              activePage === PAGE_TYPE_SETTING
                ? "text-blue-500 bg-slate-200 border-b-2 border-blue-500"
                : null
            }`}
            onClick={() => handleSetActivePage(PAGE_TYPE_SETTING)}
          >
            Setting
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
