import RePermit from "@/components/Setting/templates/RePermit";

import { useTabs } from "@/context/tabs";
import { useAnkiAction } from "@/hooks/useAnkiAction";
import { PAGE_TYPE_ADD } from "@/utils/Const";

const Index = () => {
  const { handleSetActivePage } = useTabs();
  const { getAnkiPermission } = useAnkiAction();

  const handleRePermit = async () => {
    await getAnkiPermission();
    handleSetActivePage(PAGE_TYPE_ADD);
  };

  return (
    <>
      <RePermit handleClick={handleRePermit} />
    </>
  );
};

export default Index;
