import {
  ACTION_REQUEST_ADD_CARD,
  ADD_FRONT_STEP,
  CHOOSE_WORD_STEP,
  VERSION_6,
} from "@/utils/Const";
import React, { useEffect } from "react";
import BackButton from "@/components/buttons/backButton";
import SubmitButton from "@/components/buttons/submitButton";

import { useAddCardStore } from "@/context/addCardStore";
import { apiAnkiClient, setJsonToAnki } from "@/utils/functions";
import { toast } from "react-toastify";
import { errorParams, successParams } from "@/utils/toast";

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

  useEffect(() => {
    handleSetMeanigsOfunknownWords(unknowWords.map(() => ""));
  }, []);

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

  const handleChange =
    (targetIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
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
    handleSetCurrentStep(ADD_FRONT_STEP);
  };

  return (
    <>
      <h2 className="border-l-4 border-blue-500 pl-2 font-medium my-5">
        Front card
      </h2>
      <div className="border-2 p-2 my-3 rounded-md">{frontCardElements}</div>
      <div>
        <h2 className="border-l-4 border-blue-500 pl-2 my-5 font-medium">
          Enter the meaning of the selected word
        </h2>
        {unknowWords.map((unknowWord, i) => {
          return (
            <div
              key={i}
              className="bg-default-blue flex mb-2 items-center justify-between rounded-md"
            >
              <div className="px-2">{i + 1}.</div>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-r-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder={unknowWord.word}
                onChange={handleChange(i)}
              ></input>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between mt-5">
        <BackButton
          handleClick={() => handleSetCurrentStep(CHOOSE_WORD_STEP)}
        />
        <SubmitButton handleSubmit={() => handleAddCard()} isFinalStep={true} />
      </div>
    </>
  );
}
