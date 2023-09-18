import React, { useEffect, useState } from "react";
import { apiAnkiClient, setJsonToAnki } from "@/utils/functions";
import {
  ACTION_DECK_NAMES,
  ACTION_REQUEST_ADD_CARD,
  ACTION_REQUEST_PERMISSON,
  ADD_BACK_STEP,
  ADD_FRONT_STEP,
  CHOOSE_WORD_STEP,
  VERSION_6,
} from "@/utils/Const";
import { DecksType, TypeAddForm, UnknowWord } from "@/types";
import { toast } from "react-toastify";

import AddForm from "./addForm";
import ChooseWord from "./chooseWord";
import AddBackCard from "./addBackCard";
import StepBar from "./stepBar";
import { errorParams, successParams } from "@/utils/toast";

const initialCard = {
  deck: "",
  content: "",
  backContent: "",
};

const Index = () => {
  const [decks, setDecks] = useState<DecksType>([]);
  const [currentStep, setCurrentStep] = useState(ADD_FRONT_STEP);
  const [card, setCard] = useState(initialCard);
  const [unknowWords, setUnknowWords] = useState<UnknowWord[]>([]);
  const [meanigsOfunknownWords, setMeanigsOfunknownWords] = useState(
    unknowWords.map(() => "")
  );

  useEffect(() => {
    handleSetDeck();
  }, []);

  useEffect(() => {
    setUnknowWords([]);
  }, [card.content]);

  const reset = () => {
    setCard(initialCard);
    setUnknowWords([]);
  };

  const handleSetDeck = async (): Promise<void> => {
    try {
      const response = await apiAnkiClient.post(
        "/",
        setJsonToAnki(ACTION_DECK_NAMES, VERSION_6)
      );
      const { data } = response;
      if (data.result) {
        setDecks(data.result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddFrontCard = (data: TypeAddForm) => {
    setCard((prevCard) => ({
      ...prevCard,
      content: data.content,
      deck: data.deck,
    }));
    setCurrentStep(CHOOSE_WORD_STEP);
  };

  const addUnderlineText = (text: string, positions: any[]): string => {
    let resultText = "";
    let lastEnd = 0;

    positions.forEach((position, i) => {
      // Add text before the start position
      resultText += text.slice(lastEnd, position.startPostion);
      // Add the underlined text
      resultText += `<u style="color: rgb(38, 97, 255);">${i + 1}.${text.slice(
        position.startPostion,
        position.endPostion
      )}</u>`;
      lastEnd = position.endPostion;
    });
    // Add remaining text
    resultText += text.slice(lastEnd);

    return resultText;
  };

  const handleChooseWord = () => {
    // Change selected words to ascending order
    setUnknowWords(unknowWords.sort((a, b) => a.startPostion - b.startPostion));
    setCurrentStep(ADD_BACK_STEP);
  };

  const addCard = async () => {
    const params = {
      notes: [
        {
          deckName: card.deck,
          modelName: "Basic",
          fields: {
            Front: addUnderlineText(card.content, unknowWords),
            Back: meanigsOfunknownWords
              .map((item, index) => `${index + 1}.${item}`)
              .join("<br>"),
          },
        },
      ],
    };

    try {
      await apiAnkiClient.post(
        "/",
        setJsonToAnki(ACTION_REQUEST_ADD_CARD, VERSION_6, params)
      );
      toast.success("Add card success!", successParams);
    } catch (error) {
      console.error("Error while adding card:", error);
      toast.error("Error!", errorParams);
    }
  };

  const handleAddCard = async () => {
    await addCard();
    reset();
    setCurrentStep(ADD_FRONT_STEP);
  };

  const isCrrentStep = (crrentIndex: number) => {
    return crrentIndex === currentStep;
  };

  return (
    <>
      <StepBar isCrrentStep={isCrrentStep} />
      {currentStep === ADD_FRONT_STEP && (
        <AddForm
          decks={decks}
          card={card}
          handleAddFrontCard={handleAddFrontCard}
        />
      )}
      {currentStep === CHOOSE_WORD_STEP && (
        <ChooseWord
          card={card}
          handleChooseWord={handleChooseWord}
          unknowWords={unknowWords}
          setUnknowWords={setUnknowWords}
          setCurrentStep={setCurrentStep}
        />
      )}
      {currentStep === ADD_BACK_STEP && (
        <AddBackCard
          card={card}
          handleAddCard={handleAddCard}
          unknowWords={unknowWords}
          setMeanigsOfunknownWords={setMeanigsOfunknownWords}
          meanigsOfunknownWords={meanigsOfunknownWords}
          setCurrentStep={setCurrentStep}
        />
      )}
    </>
  );
};

export default Index;
