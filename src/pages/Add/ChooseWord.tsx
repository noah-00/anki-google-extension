import React, { useState } from "react";

import SelectedWord from "@/components/Add/parts/SelectedWord";
import BackButton from "@/components/common/parts/backButton";
import ErrorAlert from "@/components/common/parts/ErrorAlert";
import Label from "@/components/common/parts/Label";
import SubmitButton from "@/components/common/parts/submitButton";

import { useAddCardStore } from "@/context/addCardStore";
import { UnknownWord } from "@/types";
import { ADD_BACK_STEP, ADD_FRONT_STEP } from "@/utils/Const";

export default function ChooseWord() {
  const { handleSetCurrentStep, unknownWords, handleSetUnknownWords, card } = useAddCardStore();

  const [isDuplicate, setIsDuplicate] = useState(false);
  const [isNotUnknownWords, setIsNotUnknownWords] = useState(false);

  const handleOnMouseUp = () => {
    setIsDuplicate(false);
    setIsNotUnknownWords(false);

    const selection = window.getSelection();

    if (selection !== null && String(selection)) {
      const rangeSelectedWord = [selection.anchorOffset, selection.focusOffset].sort(
        (a, b) => a - b
      );

      const unknownWord = {
        word: String(selection),
        startPosition: rangeSelectedWord[0],
        endPosition: rangeSelectedWord[1]
      };

      AddUnknownWord(unknownWord);
    }
  };

  const AddUnknownWord = (unknownWord: UnknownWord) => {
    // validate

    // if user select nothing
    if (unknownWord.startPosition === 0 && unknownWord.endPosition === 0)
      return setIsDuplicate(true);
    if (!unknownWord.word.trim()) return;

    if (!isRangeOverlapWithArray(unknownWord)) {
      handleSetUnknownWords([...unknownWords, unknownWord]);
    } else {
      setIsDuplicate(true);
    }
  };

  const isOverlapping = (range1: UnknownWord, range2: UnknownWord) => {
    return !(
      range1.endPosition <= range2.startPosition || range2.endPosition <= range1.startPosition
    );
  };

  const isRangeOverlapWithArray = (newRange: UnknownWord) => {
    for (let range of unknownWords) {
      if (isOverlapping(newRange, range)) {
        return true;
      }
    }
    return false;
  };

  const handleDelete = (indexToRemove: number) => {
    setIsDuplicate(false);
    handleSetUnknownWords(unknownWords.filter((_, i) => i !== indexToRemove));
  };

  const handleSubmit = () => {
    if (unknownWords.length) {
      handleSetUnknownWords(unknownWords.sort((a, b) => a.startPosition - b.startPosition));
      handleSetCurrentStep(ADD_BACK_STEP);
    } else {
      setIsNotUnknownWords(true);
    }
  };

  const handleBack = () => {
    handleSetCurrentStep(ADD_FRONT_STEP);
    handleSetUnknownWords([]);
  };

  return (
    <>
      <Label>Choose your unknown a word</Label>
      <div onMouseUp={handleOnMouseUp} className="border-2 p-2 my-3 rounded-md text-sm">
        {card.content}
      </div>
      {isDuplicate ? (
        <ErrorAlert errorMessage="Selected words are duplicated. Please delete it and try again." />
      ) : null}
      <div>
        <Label>Selected words</Label>
        {unknownWords.map((unknownWord, index) => {
          return (
            <SelectedWord
              key={index}
              word={unknownWord.word}
              index={index}
              handleDelete={(targetIndex) => handleDelete(targetIndex)}
            />
          );
        })}
        {isNotUnknownWords ? <ErrorAlert errorMessage="Please select at least one word." /> : null}
      </div>
      <div className="flex justify-between mt-6">
        <BackButton handleClick={handleBack} />
        <SubmitButton handleSubmit={handleSubmit} />
      </div>
    </>
  );
}
