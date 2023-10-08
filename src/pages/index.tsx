import { useEffect, useState } from "react";

import PermissionNotice from "@/components/common/parts/permissionNotice";
import Add from "@/pages/Add/index";
import Setting from "@/pages/Setting";

import { useTabs } from "@/context/tabs";
import { useAnkiAction } from "@/hooks/useAnkiAction";
import {
  ANKI_PERMISSON_GRANTED,
  PAGE_TYPE_ADD,
  PAGE_TYPE_SETTING,
  STATUS_NOT_PERMITTED,
  STATUS_PERMITTED
} from "@/utils/Const";

export default function Index() {
  const { activePage, handleSetActivePage } = useTabs();
  const [statusPermitted, setStatusPermitted] = useState(STATUS_PERMITTED);
  const { getAnkiPermisson } = useAnkiAction();

  const handleGetAnkiPermisson = async () => {
    const resultPermition = await getAnkiPermisson();
    resultPermition === ANKI_PERMISSON_GRANTED
      ? setStatusPermitted(STATUS_PERMITTED)
      : setStatusPermitted(STATUS_NOT_PERMITTED);
  };

  const handleLinkToSetting = () => {
    handleSetActivePage(PAGE_TYPE_SETTING);
  };

  useEffect(() => {
    handleGetAnkiPermisson();
  });

  return (
    <div className="px-4 my-2">
      {statusPermitted === STATUS_NOT_PERMITTED && (
        <PermissionNotice handleLinkToSetting={handleLinkToSetting} />
      )}
      {activePage === PAGE_TYPE_ADD && <Add />}
      {activePage === PAGE_TYPE_SETTING && <Setting />}
    </div>
  );
}
