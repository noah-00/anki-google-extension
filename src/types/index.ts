import {
  ADD_BACK_STEP,
  ADD_FRONT_STEP,
  PAGE_TYPE_ADD,
  PAGE_TYPE_SETTING,
  CHOOSE_WORD_STEP
} from "@/utils/Const";

export type PageType = typeof PAGE_TYPE_ADD | typeof PAGE_TYPE_SETTING;
export type DecksType = string[];
export type AddCardStepType =
  | typeof ADD_FRONT_STEP
  | typeof CHOOSE_WORD_STEP
  | typeof ADD_BACK_STEP;

export type TypeCard = {
  content: string;
  deck: string;
};

export type UnknownWord = {
  word: string;
  startPosition: number;
  endPosition: number;
};

export type TypeAddCardParams = {
  notes: {
    deckName: string;
    modelName: string;
    fields: {
      Front: string;
      Back: string;
    };
  }[];
};
