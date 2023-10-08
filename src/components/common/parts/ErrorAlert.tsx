import React from "react";

type Props = {
  errorMessage: string;
};

export default function ErrorAlert(props: Props) {
  return <span className="text-red-600 font-bold">{props.errorMessage}</span>;
}
