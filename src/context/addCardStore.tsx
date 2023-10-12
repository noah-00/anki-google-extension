import React, { ReactNode, useContext, useEffect, useState } from "react";

import { useGoogleStorage } from "@/hooks/useGoogleStorage";
import { AddCardStepType, TypeCard, UnknownWord } from "@/types";
import {
  ADD_FRONT_STEP,
  STORAGE_KEY_CURRENT_STEP,
  STORAGE_KEY_CARD,
  STORAGE_KEY_MEANINGS_WORDS,
  STORAGE_KEY_UNKNOWN_WORDS
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
  isCurrentStep: (currentIndex: number) => boolean;
  card: TypeCard;
  handleAddFrontCard: (data: TypeCard) => void;
  handleResetCard: () => void;
  unknownWords: UnknownWord[];
  handleSetUnknownWords: (newUnknownWords: UnknownWord[]) => void;
  meaningsOfUnknownWords: string[];
  handleSetMeaningsOfUnknownWords: (newMeaningsOfUnknownWords: string[]) => void;
}

const AddCardStoreContext = React.createContext<ContextType>({
  currentStep: ADD_FRONT_STEP,
  handleSetCurrentStep: () => {},
  isCurrentStep: () => false,
  card: initialCard,
  handleAddFrontCard: () => {},
  handleResetCard: () => {},
  unknownWords: [],
  handleSetUnknownWords: () => {},
  meaningsOfUnknownWords: [],
  handleSetMeaningsOfUnknownWords: () => {}
});

export const useAddCardStore = () => {
  return useContext(AddCardStoreContext);
};

export const AddCardStoreProvider = ({ children }: ProviderProps) => {
  const { getLocalStorage, setLocalStorage } = useGoogleStorage();

  // steps management
  const [currentStep, setCurrentStep] = useState<AddCardStepType>(ADD_FRONT_STEP);

  const handleSetCurrentStep = async (nextStep: AddCardStepType) => {
    setCurrentStep(nextStep);
    setLocalStorage(STORAGE_KEY_CURRENT_STEP, nextStep);
  };

  const isCurrentStep = (currentIndex: number) => {
    return currentIndex === currentStep;
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
  const [unknownWords, setUnknownWords] = useState<UnknownWord[]>([]);

  const handleSetUnknownWords = (newUnknownWords: UnknownWord[]) => {
    setUnknownWords(newUnknownWords);
    setLocalStorage(STORAGE_KEY_UNKNOWN_WORDS, newUnknownWords);
  };

  // meaningsOfUnknownWords management
  const [meaningsOfUnknownWords, setMeaningsOfUnknownWords] = useState(unknownWords?.map(() => ""));

  const handleSetMeaningsOfUnknownWords = (newMeaningsOfUnknownWords: string[]) => {
    setMeaningsOfUnknownWords(newMeaningsOfUnknownWords);
    setLocalStorage(STORAGE_KEY_MEANINGS_WORDS, newMeaningsOfUnknownWords);
  };

  /*
  @ if user refresh page, we need to check if there is data in google local storage
  */

  useEffect(() => {
    checkLocalStorageCurrentStep();
    checkLocalStorageCard();
    checkLocalStorageUnknownWords();
    checkLocalStorageMeaningsOfUnknownWords();
  }, []);

  const checkLocalStorageCurrentStep = async () => {
    const localCurrentStep = (await getLocalStorage(STORAGE_KEY_CURRENT_STEP)) as AddCardStepType;
    if (!localCurrentStep) return;
    setCurrentStep(localCurrentStep);
  };

  const checkLocalStorageCard = async () => {
    const localCard = (await getLocalStorage(STORAGE_KEY_CARD)) as TypeCard;
    if (!localCard) return;
    setCard(localCard);
  };

  const checkLocalStorageUnknownWords = async () => {
    const localUnknownWords = (await getLocalStorage(STORAGE_KEY_UNKNOWN_WORDS)) as UnknownWord[];
    if (localUnknownWords?.length === 0 || !localUnknownWords) return;
    setUnknownWords(localUnknownWords);
  };

  const checkLocalStorageMeaningsOfUnknownWords = async () => {
    const localMeaningsOfUnknownWords = (await getLocalStorage(
      STORAGE_KEY_MEANINGS_WORDS
    )) as string[];
    if (localMeaningsOfUnknownWords?.length === 0 || !localMeaningsOfUnknownWords) return;
    setMeaningsOfUnknownWords(localMeaningsOfUnknownWords);
  };

  const value = {
    currentStep,
    handleSetCurrentStep,
    card,
    handleAddFrontCard,
    handleResetCard,
    unknownWords,
    handleSetUnknownWords,
    meaningsOfUnknownWords,
    handleSetMeaningsOfUnknownWords,
    isCurrentStep
  };

  return <AddCardStoreContext.Provider value={value}>{children}</AddCardStoreContext.Provider>;
};
