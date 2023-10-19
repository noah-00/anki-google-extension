import React, { useEffect } from "react";

import SelectedWordInput from "@/components/Add/templates/SelectedWordInput";
import BackButton from "@/components/common/parts/backButton";
import Label from "@/components/common/parts/Label";
import SubmitButton from "@/components/common/parts/SubmitButton";

import { useAddCardStore } from "@/context/addCardStore";
import { useAnkiAction } from "@/hooks/useAnkiAction";
import { useGoogleStorage } from "@/hooks/useGoogleStorage";
import { ADD_FRONT_STEP, CHOOSE_WORD_STEP } from "@/utils/Const";

export default function AddBackCard() {
  const {
    handleSetCurrentStep,
    unknownWords,
    meaningsOfUnknownWords,
    handleSetMeaningsOfUnknownWords,
    card,
    handleResetCard,
    handleSetUnknownWords
  } = useAddCardStore();

  const { resetLocalStorage } = useGoogleStorage();
  const { addCard } = useAnkiAction();

  useEffect(() => {
    if (meaningsOfUnknownWords.length) return;
    else handleSetMeaningsOfUnknownWords(unknownWords.map(() => ""));
  }, [unknownWords]);

  const addUnderline = (text: string, positions: any[]) => {
    let elements = [];
    let lastEnd = 0;

    positions.forEach((position, index) => {
      elements.push(text.slice(lastEnd, position.startPosition));
      elements.push(
        <u key={position.word} className="font-bold text-blue-500">
          {index + 1}.{text.slice(position.startPosition, position.endPosition)}
        </u>
      );
      lastEnd = position.endPosition;
    });
    elements.push(text.slice(lastEnd));

    return elements;
  };

  const frontCardElements = addUnderline(card.content, unknownWords);

  const handleChange = (targetIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    handleSetMeaningsOfUnknownWords(
      meaningsOfUnknownWords.map((word, i) => {
        if (i === targetIndex) {
          return event.target.value;
        }
        return word;
      })
    );
  };

  const reset = () => {
    handleResetCard();
    handleSetUnknownWords([]);
    handleSetMeaningsOfUnknownWords([]);
  };

  const addUnderlineText = (text: string, positions: any[]): string => {
    let resultText = "";
    let lastEnd = 0;

    positions.forEach((position, i) => {
      // Add text before the start position
      resultText += text.slice(lastEnd, position.startPosition);
      // Add the underlined text
      resultText += `<u style="color: rgb(38, 97, 255);">${i + 1}.${text.slice(
        position.startPosition,
        position.endPosition
      )}</u>`;
      lastEnd = position.endPosition;
    });
    // Add remaining text
    resultText += text.slice(lastEnd);

    return resultText;
  };

  const handleAddCard = async () => {
    const params = {
      notes: [
        {
          deckName: card.deck,
          modelName: "Basic",
          fields: {
            Front: addUnderlineText(card.content, unknownWords),
            Back: meaningsOfUnknownWords.map((item, index) => `${index + 1}.${item}`).join("<br>")
          }
        }
      ]
    };

    await addCard(params);
    await resetLocalStorage();
    reset();
    handleSetCurrentStep(ADD_FRONT_STEP);
  };

  const handleBack = () => {
    handleSetCurrentStep(CHOOSE_WORD_STEP);
    handleSetMeaningsOfUnknownWords([]);
  };

  return (
    <>
      <Label>Front card</Label>
      <div className="border-2 p-2 my-3 rounded-md">{frontCardElements}</div>

      <Label>Enter the meaning of the selected word</Label>
      {unknownWords.map((unknownWord, index) => {
        return (
          <SelectedWordInput
            key={index}
            index={index}
            unKnowWord={unknownWord.word}
            meaningsOfUnknownWord={meaningsOfUnknownWords[index]}
            handleChange={(targetIndex) => handleChange(targetIndex)}
          />
        );
      })}

      <div className="flex justify-between mt-5">
        <BackButton handleClick={handleBack} />
        <SubmitButton handleSubmit={handleAddCard} isFinalStep={true} />
      </div>
    </>
  );
}
