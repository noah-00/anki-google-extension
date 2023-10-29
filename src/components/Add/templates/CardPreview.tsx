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
    <div className={`pb-1 ${props.isPreview && "bg-slate-200 "}`}>
      <div className="flex justify-between pt-1">
        <div className="border-l-4 border-blue-500 pl-2 font-medium">Open preview</div>
        <div>
          <ToggleButton checked={props.isPreview} handleChange={handleChange} />
        </div>
      </div>
      {props.isPreview && (
        <div
          ref={ref}
          className="border-2 mt-4 mx-1 px-2 pt-4 pb-2 bg-white rounded-md text-sm relative  animate-slit-in-horizontal"
        >
          {props.frontCardElements}
          <div className="absolute -top-[20%] bg-white px-2 bg-default-blue border-2  rounded-sm">
            preview
          </div>
        </div>
      )}
    </div>
  );
}
