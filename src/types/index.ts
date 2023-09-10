import { PAGE_TYPE_ADD, PAGE_TYPE_SETTING } from "@/utils/const";

export type PageType = typeof PAGE_TYPE_ADD | typeof PAGE_TYPE_SETTING;
export type DecksType = string[];

export type TypeAddForm = {
  content: string;
  deck: string;
};

export type TypeCard = {
  content: string;
  deck: string;
  backContent: string;
};

export type UnknowWord = {
  word: string;
  startPostion: number;
  endPostion: number;
};
