import { useTabs } from "@/context/tabs";
import { useAnkiAction } from "@/hooks/useAnkiAction";
import { PAGE_TYPE_ADD } from "@/utils/Const";

const Index = () => {
  const { handleSetActivePage } = useTabs();
  const { getAnkiPermisson } = useAnkiAction();

  const handleRePermit = async () => {
    await getAnkiPermisson();
    handleSetActivePage(PAGE_TYPE_ADD);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="border-l-4 border-blue-500 pl-2 font-medium">
          Re-permit
        </h2>
        <button
          type="button"
          onClick={handleRePermit}
          className="bg-default-blue-button font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 shadow-lg"
        >
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 21 21"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m6.072 10.072 2 2 6-4m3.586 4.314.9-.9a2 2 0 0 0 0-2.828l-.9-.9a2 2 0 0 1-.586-1.414V5.072a2 2 0 0 0-2-2H13.8a2 2 0 0 1-1.414-.586l-.9-.9a2 2 0 0 0-2.828 0l-.9.9a2 2 0 0 1-1.414.586H5.072a2 2 0 0 0-2 2v1.272a2 2 0 0 1-.586 1.414l-.9.9a2 2 0 0 0 0 2.828l.9.9a2 2 0 0 1 .586 1.414v1.272a2 2 0 0 0 2 2h1.272a2 2 0 0 1 1.414.586l.9.9a2 2 0 0 0 2.828 0l.9-.9a2 2 0 0 1 1.414-.586h1.272a2 2 0 0 0 2-2V13.8a2 2 0 0 1 .586-1.414Z"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default Index;
