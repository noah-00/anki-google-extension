import React from "react";
import { ADD_BACK_STEP, ADD_FRONT_STEP, CHOOSE_WORD_STEP } from "@/utils/Const";

import AddForm from "./addForm";
import ChooseWord from "./chooseWord";
import AddBackCard from "./addBackCard";
import StepBar from "./stepBar";

import { useAddCardStore } from "@/context/addCardStore";

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
