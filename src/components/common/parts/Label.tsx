import React from "react";

type Props = {
  htmlFor?: string;
  children: React.ReactNode;
};

export default function FormLabel(props: Props) {
  return (
    <label
      htmlFor={props.htmlFor}
      className="block my-5 font-medium mt-4 border-l-4 border-blue-500 pl-2"
    >
      {props.children}
    </label>
  );
}
