import { AddCardStepType, TypeAddForm, TypeCard, UnknowWord } from "@/types";
import { ADD_FRONT_STEP } from "@/utils/Const";
import React, { ReactNode, useContext, useState } from "react";

const initialCard = {
  deck: "",
  content: "",
  backContent: "",
};

interface ProviderProps {
  children: ReactNode;
}

interface ContextType {
  currentStep: AddCardStepType;
  handleSetCurrentStep: (nextStep: AddCardStepType) => void;
  isCrrentStep: (crrentIndex: number) => boolean;
  card: TypeCard;
  handleAddFrontCard: (data: TypeAddForm) => void;
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
  handleSetMeanigsOfunknownWords: () => {},
});

export const useAddCardStore = () => {
  return useContext(AddCardStoreContext);
};

export const AddCardStoreProvider = ({ children }: ProviderProps) => {
  // steps management
  const [currentStep, setCurrentStep] =
    useState<AddCardStepType>(ADD_FRONT_STEP);

  const handleSetCurrentStep = async (nextStep: AddCardStepType) => {
    setCurrentStep(nextStep);
  };

  const isCrrentStep = (crrentIndex: number) => {
    return crrentIndex === currentStep;
  };

  // card management
  const [card, setCard] = useState(initialCard);

  const handleAddFrontCard = (data: TypeAddForm) => {
    setCard((prevCard) => ({
      ...prevCard,
      content: data.content,
      deck: data.deck,
    }));
  };

  const handleResetCard = () => {
    setCard(initialCard);
  };

  // unknow words management
  const [unknowWords, setUnknowWords] = useState<UnknowWord[]>([]);

  const handleSetUnknowWords = (newUnknowWords: UnknowWord[]) => {
    setUnknowWords(newUnknowWords);
  };

  // meanigsOfunknownWords management
  const [meanigsOfunknownWords, setMeanigsOfunknownWords] = useState(
    unknowWords.map(() => "")
  );

  const handleSetMeanigsOfunknownWords = (
    newMeanigsOfunknownWords: string[]
  ) => {
    setMeanigsOfunknownWords(newMeanigsOfunknownWords);
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
    isCrrentStep,
  };

  return (
    <AddCardStoreContext.Provider value={value}>
      {children}
    </AddCardStoreContext.Provider>
  );
};
