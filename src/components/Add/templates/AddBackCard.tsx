import React, { useEffect } from "react";
import { useAddCardStore } from "@/context/addCardStore";
import { useAnkiAction } from "@/hooks/useAnkiAction";
import { useGoogleStorage } from "@/hooks/useGoogleStorage";

import BackButton from "@/components/common/parts/backButton";
import SubmitButton from "@/components/common/parts/submitButton";

import { ADD_FRONT_STEP, CHOOSE_WORD_STEP } from "@/utils/Const";
import Label from "@/components/common/parts/Label";
import SelectedWordInput from "../parts/SelectedWordInput";

export default function AddBackCard() {
  const {
    handleSetCurrentStep,
    unknowWords,
    meanigsOfunknownWords,
    handleSetMeanigsOfunknownWords,
    card,
    handleResetCard,
    handleSetUnknowWords,
  } = useAddCardStore();

  const { resetLocalStorage } = useGoogleStorage();
  const { addCard } = useAnkiAction();

  useEffect(() => {
    if (meanigsOfunknownWords.length) return;
    else handleSetMeanigsOfunknownWords(unknowWords.map(() => ""));
  }, [unknowWords]);

  const addUnderline = (text: string, positions: any[]) => {
    let elements = [];
    let lastEnd = 0;

    positions.forEach((position, index) => {
      elements.push(text.slice(lastEnd, position.startPostion));
      elements.push(
        <u key={position.word} className="font-bold text-blue-500">
          {index + 1}.{text.slice(position.startPostion, position.endPostion)}
        </u>
      );
      lastEnd = position.endPostion;
    });
    elements.push(text.slice(lastEnd));

    return elements;
  };

  const frontCardElements = addUnderline(card.content, unknowWords);

  const handleChange = (targetIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    handleSetMeanigsOfunknownWords(
      meanigsOfunknownWords.map((word, i) => {
        if (i === targetIndex) {
          return event.target.value;
        }
        return word;
      })
    );
  };

  const reset = () => {
    handleResetCard();
    handleSetUnknowWords([]);
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

  const handleAddCard = async () => {
    const params = {
      notes: [
        {
          deckName: card.deck,
          modelName: "Basic",
          fields: {
            Front: addUnderlineText(card.content, unknowWords),
            Back: meanigsOfunknownWords.map((item, index) => `${index + 1}.${item}`).join("<br>"),
          },
        },
      ],
    };

    await addCard(params);
    await resetLocalStorage();
    reset();
    handleSetCurrentStep(ADD_FRONT_STEP);
  };

  const handleBack = () => {
    handleSetCurrentStep(CHOOSE_WORD_STEP);
    handleSetMeanigsOfunknownWords([]);
  };

  return (
    <>
      <Label>Front card</Label>
      <div className="border-2 p-2 my-3 rounded-md">{frontCardElements}</div>

      <Label>Enter the meaning of the selected word</Label>
      {unknowWords.map((unknowWord, index) => {
        return (
          <SelectedWordInput
            key={index}
            index={index}
            unKnowWord={unknowWord.word}
            meanigsOfunknownWord={meanigsOfunknownWords[index]}
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
