import { toast } from "react-toastify";

import { TypeAddCardParams } from "@/types";
import {
  ACTION_DECK_NAMES,
  ACTION_REQUEST_ADD_CARD,
  ACTION_REQUEST_PERMISSION,
  VERSION_6
} from "@/utils/Const";
import { apiAnkiClient, setJsonToAnki } from "@/utils/functions";
import { errorParams, successParams } from "@/utils/toast";

const getAnkiPermission = async () => {
  try {
    const res = await apiAnkiClient.post("/", setJsonToAnki(ACTION_REQUEST_PERMISSION, VERSION_6));
    return res.data.result.permission;
  } catch (error) {
    console.error(error);
  }
};

const getDecks = async () => {
  try {
    const response = await apiAnkiClient.post("/", setJsonToAnki(ACTION_DECK_NAMES, VERSION_6));
    const { data } = response;
    if (data.result) {
      return data.result;
    }
  } catch (error) {
    console.error(error);
  }
};

const addCard = async (params: TypeAddCardParams) => {
  try {
    await apiAnkiClient.post("/", setJsonToAnki(ACTION_REQUEST_ADD_CARD, VERSION_6, params));
    toast.success("Add card success!", successParams);
  } catch (error) {
    console.error("Error while adding card:", error);
    toast.error("Error!", errorParams);
  }
};

export const useAnkiAction = () => {
  return { getAnkiPermission, getDecks, addCard };
};
