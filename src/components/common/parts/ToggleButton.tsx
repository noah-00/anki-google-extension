import React from "react";

type ToggleButtonProps = {
  checked: boolean;
  handleChange: () => void;
};

export default function ToggleButton(props: ToggleButtonProps) {
  return (
    <label className="flex cursor-pointer select-none items-center">
      <div className="relative">
        <input
          type="checkbox"
          checked={props.checked}
          onChange={props.handleChange}
          className="sr-only"
        />
        <div
          className={`box block h-5 w-8 rounded-full ${
            props.checked ? "bg-default-blue" : "bg-gray-500"
          }`}
        ></div>
        <div
          className={`absolute left-1 top-1 flex h-3 w-3 items-center justify-center rounded-full bg-white transition ${
            props.checked ? "translate-x-full" : ""
          }`}
        ></div>
      </div>
    </label>
  );
}
