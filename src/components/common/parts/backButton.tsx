import React from "react";

type BackButtonProps = {
  handleClick?: () => void;
};

export default function BackButton(props: BackButtonProps) {
  return (
    <button
      onClick={() => props.handleClick && props.handleClick()}
      type="submit"
      className="bg-default-blue-button font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      <svg
        className="w-5 h-5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 10"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 5H1m0 0l4 4m-4-4L5 1"
        />
      </svg>
    </button>
  );
}
