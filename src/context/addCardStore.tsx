import React, { ReactNode, useContext, useEffect, useState } from "react";

import { useGoogleStorage } from "@/hooks/useGoogleStorage";
import { AddCardStepType, TypeCard, UnknowWord } from "@/types";
import {
  ADD_FRONT_STEP,
  STORAGE_KEY_CURRENT_STEP,
  STORAGE_KEY_CARD,
  STORAGE_KEY_MEANINGS_WORDS,
  STORAGE_KEY_UNKNOW_WORDS
} from "@/utils/Const";

const initialCard = {
  deck: "",
  content: ""
};

interface ProviderProps {
  children: ReactNode;
}

interface ContextType {
  currentStep: AddCardStepType;
  handleSetCurrentStep: (nextStep: AddCardStepType) => void;
  isCrrentStep: (crrentIndex: number) => boolean;
  card: TypeCard;
  handleAddFrontCard: (data: TypeCard) => void;
  handleResetCard: () => void;
  unknowWords: UnknowWord[];
  handleSetUnknowWords: (newUnknowWords: UnknowWord[]) => void;
  meanigsOfunknownWords: string[];
  handleSetMeanigsOfunknownWords: (newMeanigsOfunknownWords: string[]) => void;
}

const AddCardStoreContext = React.createContext<ContextType>({
  currentStep: ADD_FRONT_STEP,
  handleSetCurrentStep: () => {},
  isCrrentStep: () => false,
  card: initialCard,
  handleAddFrontCard: () => {},
  handleResetCard: () => {},
  unknowWords: [],
  handleSetUnknowWords: () => {},
  meanigsOfunknownWords: [],
  handleSetMeanigsOfunknownWords: () => {}
});

export const useAddCardStore = () => {
  return useContext(AddCardStoreContext);
};

export const AddCardStoreProvider = ({ children }: ProviderProps) => {
  const { getLocalStorage, setLocalStorage } = useGoogleStorage();

  // steps management
  const [currentStep, setCurrentStep] =
    useState<AddCardStepType>(ADD_FRONT_STEP);

  const handleSetCurrentStep = async (nextStep: AddCardStepType) => {
    setCurrentStep(nextStep);
    setLocalStorage(STORAGE_KEY_CURRENT_STEP, nextStep);
  };

  const isCrrentStep = (crrentIndex: number) => {
    return crrentIndex === currentStep;
  };

  // card management
  const [card, setCard] = useState(initialCard);

  const handleAddFrontCard = (newsCard: TypeCard) => {
    setCard(newsCard);
    setLocalStorage(STORAGE_KEY_CARD, newsCard);
  };

  const handleResetCard = () => {
    setCard((prevCard) => ({
      ...prevCard,
      content: ""
    }));
  };

  // unknown words management
  const [unknowWords, setUnknowWords] = useState<UnknowWord[]>([]);

  const handleSetUnknowWords = (newUnknowWords: UnknowWord[]) => {
    setUnknowWords(newUnknowWords);
    setLocalStorage(STORAGE_KEY_UNKNOW_WORDS, newUnknowWords);
  };

  // meanigsOfunknownWords management
  const [meanigsOfunknownWords, setMeanigsOfunknownWords] = useState(
    unknowWords?.map(() => "")
  );

  const handleSetMeanigsOfunknownWords = (
    newMeanigsOfunknownWords: string[]
  ) => {
    setMeanigsOfunknownWords(newMeanigsOfunknownWords);
    setLocalStorage(STORAGE_KEY_MEANINGS_WORDS, newMeanigsOfunknownWords);
  };

  /*
  @ if user refresh page, we need to check if there is data in google local storage
  */

  useEffect(() => {
    checkLocalStorageCurrentStep();
    checkLocalStorageCard();
    checkLocalStorageUnknowWords();
    checkLocalStorageMeanigsOfunknownWords();
  }, []);

  const checkLocalStorageCurrentStep = async () => {
    const localCurrentStep = (await getLocalStorage(
      STORAGE_KEY_CURRENT_STEP
    )) as AddCardStepType;
    if (!localCurrentStep) return;
    setCurrentStep(localCurrentStep);
  };

  const checkLocalStorageCard = async () => {
    const localCard = (await getLocalStorage(STORAGE_KEY_CARD)) as TypeCard;
    if (!localCard) return;
    setCard(localCard);
  };

  const checkLocalStorageUnknowWords = async () => {
    const localUnknowWords = (await getLocalStorage(
      STORAGE_KEY_UNKNOW_WORDS
    )) as UnknowWord[];
    if (localUnknowWords?.length === 0 || !localUnknowWords) return;
    setUnknowWords(localUnknowWords);
  };

  const checkLocalStorageMeanigsOfunknownWords = async () => {
    const localMeanigsOfunknownWords = (await getLocalStorage(
      STORAGE_KEY_MEANINGS_WORDS
    )) as string[];
    if (localMeanigsOfunknownWords?.length === 0 || !localMeanigsOfunknownWords)
      return;
    setMeanigsOfunknownWords(localMeanigsOfunknownWords);
  };

  const value = {
    currentStep,
    handleSetCurrentStep,
    card,
    handleAddFrontCard,
    handleResetCard,
    unknowWords,
    handleSetUnknowWords,
    meanigsOfunknownWords,
    handleSetMeanigsOfunknownWords,
    isCrrentStep
  };

  return (
    <AddCardStoreContext.Provider value={value}>
      {children}
    </AddCardStoreContext.Provider>
  );
};
