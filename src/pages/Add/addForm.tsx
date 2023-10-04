import { DecksType, TypeAddForm } from "@/types";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import ErrorRequired from "@/components/useForm/errorRequired";
import SubmitButton from "@/components/buttons/submitButton";

import { useAddCardStore } from "@/context/addCardStore";
import { CHOOSE_WORD_STEP } from "@/utils/Const";
import { useAnkiAction } from "@/hooks/useAnkiAction";

export default function AddForm() {
  const { handleAddFrontCard, handleSetCurrentStep, card } = useAddCardStore();
  const { getDecks } = useAnkiAction();

  const [decks, setDecks] = useState<DecksType>([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TypeAddForm>();

  useEffect(() => {
    handleSetDeck();
  }, []);

  const handleSetDeck = async (): Promise<void> => {
    const decksData: DecksType = await getDecks();
    decksData?.length && setDecks(decksData);
  };

  useEffect(() => {
    if (card.deck === "" && decks?.length) {
      setValue("deck", decks[0]);
    } else {
      setValue("deck", card.deck);
    }
  }, [decks.length]);

  const onSubmit: SubmitHandler<TypeAddForm> = (data) => {
    handleAddFrontCard(data);
    handleSetCurrentStep(CHOOSE_WORD_STEP);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label
        htmlFor="countries"
        className="block my-5 font-medium border-l-4 border-blue-500 pl-2"
      >
        Current Deck
      </label>
      <select
        {...register("deck", { required: true })}
        id="countries"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      >
        {decks?.map((deck, i) => (
          <option value={deck} key={i}>
            {deck}
          </option>
        ))}
      </select>
      {errors.deck && <ErrorRequired />}

      <label
        htmlFor="front"
        className="block my-5 font-medium mt-4 border-l-4 border-blue-500 pl-2"
      >
        Front
      </label>
      <textarea
        id="front"
        className="h-52 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Front Text"
        defaultValue={card.content}
        {...register("content", { required: true })}
      ></textarea>
      {errors.content && <ErrorRequired />}
      <div className="flex justify-end mt-4">
        <SubmitButton />
      </div>
    </form>
  );
}
