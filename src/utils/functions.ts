import axios from "axios";
import { ANKI_LOCAL_URL } from "./Const";

export const apiAnkiClient = axios.create({
  baseURL: ANKI_LOCAL_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setJsonToAnki = (
  action: string,
  version: number,
  params: { [key: string]: any } = {}
): string => {
  return JSON.stringify({ action, version, params });
};
