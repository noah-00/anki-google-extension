import { useEffect, useState } from "react";

import PermissionNotice from "@/components/common/parts/PermissionNotice";
import Add from "@/pages/Add/index";
import Setting from "@/pages/Setting";

import { useTabs } from "@/context/tabs";
import { useAnkiAction } from "@/hooks/useAnkiAction";
import {
  ANKI_PERMISSION_GRANTED,
  PAGE_TYPE_ADD,
  PAGE_TYPE_SETTING,
  STATUS_NOT_PERMITTED,
  STATUS_PERMITTED
} from "@/utils/Const";

export default function Index() {
  const { activePage, handleSetActivePage } = useTabs();
  const [statusPermitted, setStatusPermitted] = useState(STATUS_PERMITTED);
  const { getAnkiPermission } = useAnkiAction();

  const handleGetAnkiPermission = async () => {
    const resultPermission = await getAnkiPermission();
    resultPermission === ANKI_PERMISSION_GRANTED
      ? setStatusPermitted(STATUS_PERMITTED)
      : setStatusPermitted(STATUS_NOT_PERMITTED);
  };

  const handleLinkToSetting = () => {
    handleSetActivePage(PAGE_TYPE_SETTING);
  };

  useEffect(() => {
    handleGetAnkiPermission();
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
