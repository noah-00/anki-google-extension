import React, { useEffect, useState } from "react";

import SelectedWordInput from "@/components/Add/templates/SelectedWordInput";
import BackButton from "@/components/common/parts/BackButton";
import Label from "@/components/common/parts/Label";
import Loading from "@/components/common/parts/Loading";
import SubmitButton from "@/components/common/parts/SubmitButton";
import ToggleButton from "@/components/common/parts/ToggleButton";

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
    handleSetUnknownWords,
    isBlankCard,
    handleSetBlankCard,
    restoreDataToLocalStorage
  } = useAddCardStore();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { resetLocalStorage } = useGoogleStorage();
  const { addCard } = useAnkiAction();

  useEffect(() => {
    if (meaningsOfUnknownWords.length) return;
    else handleSetMeaningsOfUnknownWords(unknownWords.map(() => ""));
  }, [unknownWords]);

  const getFrontCardElements = (text: string, positions: any[], isBlankCard: boolean) => {
    let elements = [];
    let lastEnd = 0;

    positions.forEach((position, index) => {
      elements.push(text.slice(lastEnd, position.startPosition));
      if (isBlankCard)
        elements.push(
          <u key={position.word} className="font-bold text-blue-500">
            &#123;&#123;c1::{text.slice(position.startPosition, position.endPosition)}::
            {meaningsOfUnknownWords[index]}&#125;&#125;
          </u>
        );
      else
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

  const convertFrontText = (text: string, positions: any[]): string => {
    let resultText = "";
    let lastEnd = 0;

    positions.forEach((position, i) => {
      // Add text before the start position
      resultText += text.slice(lastEnd, position.startPosition);
      // Add the underlined text
      if (isBlankCard)
        resultText += `{{c1::${text.slice(position.startPosition, position.endPosition)}::${
          meaningsOfUnknownWords[i] || "..."
        }}}`;
      else
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
    setIsLoading(true);

    const params = {
      notes: [
        {
          deckName: card.deck,
          modelName: isBlankCard ? "Cloze" : "Basic",
          fields: isBlankCard
            ? { Text: convertFrontText(card.content, unknownWords) }
            : {
                Front: convertFrontText(card.content, unknownWords),
                Back: meaningsOfUnknownWords
                  .map((item, index) => `${index + 1}.${item}`)
                  .join("<br>")
              }
        }
      ]
    };

    await addCard(params);
    await resetLocalStorage();
    reset();
    // this func for resetLocalStorage
    restoreDataToLocalStorage();
    handleSetCurrentStep(ADD_FRONT_STEP);
  };

  const handleBack = () => {
    handleSetCurrentStep(CHOOSE_WORD_STEP);
    handleSetMeaningsOfUnknownWords([]);
  };

  return (
    <>
      <div className="flex justify-between pt-1">
        <div className="border-l-4 border-blue-500 pl-2 font-medium">Blank card</div>
        <div>
          <ToggleButton checked={isBlankCard} handleChange={handleSetBlankCard} />
        </div>
      </div>

      <Label>Front card</Label>
      <div className="border-2 p-2 my-3 rounded-md">
        {getFrontCardElements(card.content, unknownWords, isBlankCard)}
      </div>

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

      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex justify-between mt-5">
          <BackButton handleClick={handleBack} />
          <SubmitButton handleSubmit={handleAddCard} isFinalStep={true} />
        </div>
      )}
    </>
  );
}
