import React from "react";
import { Tooltip } from "react-tooltip";

type ButtonSearchProps = {
  handleClick?: () => void;
  unknownWord: string;
  index: number;
};

export default function ButtonSearch(props: ButtonSearchProps) {
  return (
    <>
      <button
        className="p-2 bg-default-blue-button rounded-r-md"
        type="button"
        data-tooltip-id={`tooltip-${props.index}`}
        onClick={() => props.handleClick && props.handleClick()}
      >
        <svg
          className="h-6 w-6"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {" "}
          <path stroke="none" d="M0 0h24v24H0z" /> <circle cx="10" cy="10" r="7" />{" "}
          <line x1="21" y1="21" x2="15" y2="15" />
        </svg>
      </button>
      <Tooltip
        id={`tooltip-${props.index}`}
        place="bottom"
        content={`Google '${props.unknownWord}'`}
      />
    </>
  );
}
