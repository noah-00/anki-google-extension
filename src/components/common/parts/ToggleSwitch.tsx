import React from "react";

type ToggleSwitchProps = {
  checked: boolean;
  handleChange: () => void;
  checkedLabel: string;
  notCheckedLabel: string;
};

export default function ToggleSwitch(props: ToggleSwitchProps) {
  return (
    <label className="themeSwitcherTwo shadow-card relative flex cursor-pointer select-none items-center justify-center rounded-md bg-white">
      <input
        type="checkbox"
        className="sr-only"
        checked={props.checked}
        onChange={props.handleChange}
      />
      <span
        className={`flex items-center space-x-[6px] py-1 px-[18px] text-sm font-medium rounded-l-md hover:opacity-80 ${
          !props.checked ? "text-white bg-default-blue" : "bg-gray-200"
        }`}
      >
        {props.notCheckedLabel}
      </span>
      <span
        className={`flex items-center space-x-[6px] py-1 px-[18px] text-sm font-medium rounded-r-md hover:opacity-80 ${
          props.checked ? "text-white bg-default-blue" : "bg-gray-200"
        }`}
      >
        {props.checkedLabel}
      </span>
    </label>
  );
}
