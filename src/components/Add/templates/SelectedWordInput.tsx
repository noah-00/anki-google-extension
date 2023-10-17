import React from "react";

import ButtonSearch from "@/components/Add/parts/ButtonSearch";

type Props = {
  unKnowWord: string;
  index: number;
  meaningsOfUnknownWord: string;
  handleChange: (targetIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const searchUnknownWordInGoogle = (unknownWord: string) => {
  window.open(`https://www.google.com/search?q=${unknownWord} meaning`);
};

export default function SelectedWordInput(props: Props) {
  return (
    <div className="bg-default-blue flex mb-2 items-center justify-between rounded-md">
      <div className="px-2">{props.index + 1}.</div>
      <input
        id={props.index.toString()}
        type="text"
        className="bg-gray-50 border border-gray-300 text-gray-500 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={props.unKnowWord}
        onChange={props.handleChange(props.index)}
        value={props.meaningsOfUnknownWord}
      ></input>
      <ButtonSearch
        unknownWord={props.unKnowWord}
        index={props.index}
        handleClick={() => searchUnknownWordInGoogle(props.unKnowWord)}
      />
    </div>
  );
}
