import { ADD_BACK_STEP, ADD_CARD_STEP_DESCRIPTION } from "@/utils/const";
import React from "react";

type StepBarProps = {
  isCrrentStep: (crrentIndex: number) => boolean;
};

export default function StepBar(props: StepBarProps) {
  return (
    <ol className="flex items-center w-full space-x-2 text-sm font-medium text-center text-gray-500 sm:space-x-4 justify-center my-6">
      {ADD_CARD_STEP_DESCRIPTION.map((stepInfo, i) => {
        const currentStepNum = i + 1;
        return (
          <li
            className={`flex items-center ${
              props.isCrrentStep(currentStepNum)
                ? "text-blue-500"
                : "border-gray-500"
            }`}
            key={i}
          >
            <span
              className={`flex items-center justify-center w-5 h-5 mr-2 text-xs border rounded-full shrink-0 ${
                props.isCrrentStep(currentStepNum)
                  ? "border-blue-500"
                  : "border-gray-500"
              }`}
            >
              {currentStepNum}
            </span>
            {props.isCrrentStep(currentStepNum) && stepInfo}

            {currentStepNum !== ADD_BACK_STEP && (
              <svg
                className="w-3 h-3 ml-2 sm:ml-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 12 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m7 9 4-4-4-4M1 9l4-4-4-4"
                />
              </svg>
            )}
          </li>
        );
      })}
    </ol>
  );
}
