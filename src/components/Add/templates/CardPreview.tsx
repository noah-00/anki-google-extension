import { useRef } from "react";

import ToggleButton from "@/components/common/parts/ToggleButton";

type CardPreviewProps = {
  frontCardElements: string[];
  isPreview: boolean;
  handleChange: () => void;
};

export default function CardPreview(props: CardPreviewProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleChange = async () => {
    if (ref.current) {
      ref.current.classList.remove("animate-slit-in-horizontal");
      ref.current.classList.add("animate-slit-out-horizontal");

      await new Promise((resolve) => setTimeout(resolve, 290));
      props.handleChange();
    } else {
      props.handleChange();
    }
  };

  return (
    <>
      <div className="flex justify-between my-4">
        <div className="border-l-4 border-blue-500 pl-2 font-medium">Open preview</div>
        <div>
          <ToggleButton checked={props.isPreview} handleChange={handleChange} />
        </div>
      </div>
      {props.isPreview && (
        <div
          ref={ref}
          className="border-2 my-3 px-2 py-3 bg-white rounded-md text-sm relative  animate-slit-in-horizontal"
        >
          {props.frontCardElements}
          <div className="absolute -top-[20%] bg-white px-2 bg-default-blue border-2  rounded-sm">
            preview
          </div>
        </div>
      )}
    </>
  );
}
