import { PAGE_TYPE_ADD, PAGE_TYPE_SETTING } from "@/utils/Const";
import { useTabs } from "@/context/tabs";

const Header = () => {
  const { activePage, handleSetActivePage } = useTabs();

  return (
    <>
      <header>
        <div className="bg-default-blue p-5 font-bold">Anki Quicker</div>
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
