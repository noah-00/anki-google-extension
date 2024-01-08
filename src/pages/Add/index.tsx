import React from "react";

import StepBar from "@/components/Add/templates/StepBar";

import AddBackCard from "./AddBackCard";
import AddForm from "./AddForm";
import ChooseWord from "./ChooseWord";

import { useAddCardStore } from "@/context/addCardStore";
import { ADD_BACK_STEP, ADD_FRONT_STEP, CHOOSE_WORD_STEP } from "@/utils/Const";

const Index = () => {
  const { currentStep } = useAddCardStore();

  return (
    <>
      <StepBar />
      {currentStep === ADD_FRONT_STEP && <AddForm />}
      {currentStep === CHOOSE_WORD_STEP && <ChooseWord />}
      {currentStep === ADD_BACK_STEP && <AddBackCard />}
    </>
  );
};

export default Index;
