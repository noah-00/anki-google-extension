import { ACTION_REQUEST_PERMISSON, VERSION_6 } from "@/utils/Const";
import { apiAnkiClient, setJsonToAnki } from "@/utils/functions";

const getAnkiPermisson = async () => {
  try {
    const res = await apiAnkiClient.post(
      "/",
      setJsonToAnki(ACTION_REQUEST_PERMISSON, VERSION_6)
    );
    return res.data.result.permission;
  } catch (error) {
    console.error(error);
  }
};

export const useAnkiAction = () => {
  return { getAnkiPermisson };
};
