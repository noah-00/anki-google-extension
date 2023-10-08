import React, { useState } from "react";
import { useAddCardStore } from "@/context/addCardStore";

import SubmitButton from "@/components/common/parts/submitButton";
import BackButton from "@/components/common/parts/backButton";
import Label from "@/components/common/parts/Label";
import SelectedWord from "../parts/SelectedWord";

import { UnknowWord } from "@/types";
import { ADD_BACK_STEP, ADD_FRONT_STEP } from "@/utils/Const";
import ErrorAlert from "@/components/common/parts/ErrorAlert";

export default function ChooseWord() {
  const { handleSetCurrentStep, unknowWords, handleSetUnknowWords, card } = useAddCardStore();

  const [isDuplicate, setIsDuplicate] = useState(false);
  const [isNotUnknowWords, setIsNotUnknowWords] = useState(false);

  const handleOnMouseUp = () => {
    setIsDuplicate(false);
    setIsNotUnknowWords(false);

    const selectinon = window.getSelection();

    if (selectinon !== null && String(selectinon)) {
      const rangeSelectedWord = [selectinon.anchorOffset, selectinon.focusOffset].sort(
        (a, b) => a - b
      );

      const unknowWord = {
        word: String(selectinon),
        startPostion: rangeSelectedWord[0],
        endPostion: rangeSelectedWord[1],
      };

      AddUknownWord(unknowWord);
    }
  };

  const AddUknownWord = (unknowWord: UnknowWord) => {
    // validate

    // if user select nothing
    if (unknowWord.startPostion === 0 && unknowWord.endPostion === 0) return setIsDuplicate(true);
    if (!unknowWord.word.trim()) return;

    if (!isRangeOverlapWithArray(unknowWord)) {
      handleSetUnknowWords([...unknowWords, unknowWord]);
    } else {
      setIsDuplicate(true);
    }
  };

  const isOverlapping = (range1: UnknowWord, range2: UnknowWord) => {
    return !(range1.endPostion <= range2.startPostion || range2.endPostion <= range1.startPostion);
  };

  const isRangeOverlapWithArray = (newRange: UnknowWord) => {
    for (let range of unknowWords) {
      if (isOverlapping(newRange, range)) {
        return true;
      }
    }
    return false;
  };

  const handleDelete = (indexToRemove: number) => {
    setIsDuplicate(false);
    handleSetUnknowWords(unknowWords.filter((_, i) => i !== indexToRemove));
  };

  const handleSubmit = () => {
    if (unknowWords.length) {
      handleSetUnknowWords(unknowWords.sort((a, b) => a.startPostion - b.startPostion));
      handleSetCurrentStep(ADD_BACK_STEP);
    } else {
      setIsNotUnknowWords(true);
    }
  };

  const handleBack = () => {
    handleSetCurrentStep(ADD_FRONT_STEP);
    handleSetUnknowWords([]);
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
        {unknowWords.map((unknowWord, index) => {
          return (
            <SelectedWord
              key={index}
              word={unknowWord.word}
              index={index}
              handleDelete={(targetIndex) => handleDelete(targetIndex)}
            />
          );
        })}
        {isNotUnknowWords ? <ErrorAlert errorMessage="Please select at least one word." /> : null}
      </div>
      <div className="flex justify-between mt-6">
        <BackButton handleClick={handleBack} />
        <SubmitButton handleSubmit={handleSubmit} />
      </div>
    </>
  );
}
