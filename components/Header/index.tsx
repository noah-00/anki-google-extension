import { PAGE_TYPE_INDEX, PAGE_TYPE_NEW } from "@/utils/const";
import { PageType } from "@/types";

interface HeaderProps {
  navigateToPage: (page: PageType) => void;
  activePage: PageType;
}

const Header = ({ navigateToPage, activePage }: HeaderProps) => {
  return (
    <>
      <header className="w-96">
        <div className="bg-blue-500 p-5 text-white font-bold">ANKI-HELPER</div>
        <div className="flex border-b border-gray-200">
          <div
            // className="py-2 px-10 mr-2 text-blue-500 bg-slate-200 border-b-2 border-blue-500 cursor-pointer"
            className={`py-2 px-10 mr-2 cursor-pointer  ${
              activePage === "index"
                ? "text-blue-500 bg-slate-200 border-b-2 border-blue-500"
                : null
            }`}
            onClick={() => navigateToPage(PAGE_TYPE_INDEX)}
          >
            index
          </div>
          <div
            className={`py-2 px-10 mr-2 cursor-pointer  ${
              activePage === "new"
                ? "text-blue-500 bg-slate-200 border-b-2 border-blue-500"
                : null
            }`}
            onClick={() => navigateToPage(PAGE_TYPE_NEW)}
          >
            new
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
