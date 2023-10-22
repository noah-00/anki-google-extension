import React, { useRef } from "react";

type Props = {
  word: string;
  index: number;
  handleDelete: (index: number) => void;
};

export default function SelectedWord(props: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const handleClick = async () => {
    if (ref.current) {
      ref.current.classList.remove("animate-slit-in-horizontal");
      ref.current.classList.add("animate-slit-out-horizontal");

      await new Promise((resolve) => setTimeout(resolve, 290));
      props.handleDelete(props.index);
    }
  };

  return (
    <div
      className="bg-default-blue-button flex mb-2 items-center justify-between py-0.5 rounded-md animate-slit-in-horizontal"
      ref={ref}
    >
      <div className="px-2">{props.index + 1}.</div>
      <div>{props.word}</div>
      <div className="px-2">
        <button className="pt-1" onClick={handleClick}>
          <svg
            className="w-4 h-4 bg-white text-blue-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 16"
          >
            <path d="M19 0H1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1ZM2 6v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6H2Zm11 3a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V8a1 1 0 0 1 2 0h2a1 1 0 0 1 2 0v1Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
