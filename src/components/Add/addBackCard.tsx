import { TypeCard, UnknowWord } from "@/types";
import { CHOOSE_WORD_STEP } from "@/utils/Const";
import React, { useEffect } from "react";
import BackButton from "../buttons/backButton";
import SubmitButton from "../buttons/submitButton";

type ChooseWordProps = {
  card: TypeCard;
  handleAddCard: () => void;
  unknowWords: UnknowWord[];
  meanigsOfunknownWords: string[];
  setMeanigsOfunknownWords: React.Dispatch<React.SetStateAction<string[]>>;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};

export default function AddBackCard(props: ChooseWordProps) {
  useEffect(() => {
    props.setMeanigsOfunknownWords(props.unknowWords.map(() => ""));
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

  const frontCardElements = addUnderline(props.card.content, props.unknowWords);

  const handleChange =
    (targetIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      props.setMeanigsOfunknownWords(
        props.meanigsOfunknownWords.map((word, i) => {
          if (i === targetIndex) {
            return event.target.value;
          }
          return word;
        })
      );
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
        {props.unknowWords.map((unknowWord, i) => {
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
          handleClick={() => props.setCurrentStep(CHOOSE_WORD_STEP)}
        />
        <SubmitButton
          handleSubmit={() => props.handleAddCard()}
          isFinalStep={true}
        />
      </div>
    </>
  );
}
