import {
  ACTION_DECK_NAMES,
  ACTION_REQUEST_PERMISSON,
  VERSION_6,
} from "@/utils/Const";
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

const getDecks = async () => {
  try {
    const response = await apiAnkiClient.post(
      "/",
      setJsonToAnki(ACTION_DECK_NAMES, VERSION_6)
    );
    const { data } = response;
    if (data.result) {
      return data.result;
    }
  } catch (error) {
    console.error(error);
  }
};

export const useAnkiAction = () => {
  return { getAnkiPermisson, getDecks };
};
