import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAddCardStore } from "@/context/addCardStore";
import { useAnkiAction } from "@/hooks/useAnkiAction";

import ErrorRequired from "@/components/common/parts/errorRequired";
import SubmitButton from "@/components/common/parts/submitButton";

import { CHOOSE_WORD_STEP, FORM_KEY_CONTENT, FORM_KEY_DECK } from "@/utils/Const";
import { DecksType, TypeCard } from "@/types";

export default function AddForm() {
  const { handleAddFrontCard, handleSetCurrentStep, card } = useAddCardStore();
  const { getDecks } = useAnkiAction();

  const [decks, setDecks] = useState<DecksType>([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<TypeCard>();

  useEffect(() => {
    handleSetDeck();
  }, []);

  const handleSetDeck = async (): Promise<void> => {
    const decksData: DecksType = await getDecks();
    decksData?.length && setDecks(decksData);
  };

  // update card when user change content or deck(local state and google storage)
  useEffect(() => {
    if (!watch(FORM_KEY_CONTENT) && !watch(FORM_KEY_DECK)) return;

    const newCard: TypeCard = {
      content: card.content,
      deck: card.deck,
    };

    if (watch(FORM_KEY_CONTENT)) newCard.content = watch(FORM_KEY_CONTENT);
    else if (!watch(FORM_KEY_CONTENT) && card.content) newCard.content = "";

    if (watch(FORM_KEY_DECK)) newCard.deck = watch(FORM_KEY_DECK);

    handleAddFrontCard(newCard);
  }, [watch(FORM_KEY_CONTENT), watch(FORM_KEY_DECK)]);

  useEffect(() => {
    card.content && setValue(FORM_KEY_CONTENT, card.content);
  }, [card.content]);

  useEffect(() => {
    if (decks?.length && card.deck) {
      setValue(FORM_KEY_DECK, card.deck);
    }
  }, [decks, card.deck]);

  const onSubmit: SubmitHandler<TypeCard> = (data) => {
    handleSetCurrentStep(CHOOSE_WORD_STEP);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="deck" className="block my-5 font-medium border-l-4 border-blue-500 pl-2">
        Current Deck
      </label>
      <select
        {...register(FORM_KEY_DECK, { required: true })}
        id="deck"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      >
        <option value="">Select a deck</option>
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
        {...register(FORM_KEY_CONTENT, { required: true })}
      ></textarea>
      {errors.content && <ErrorRequired />}
      <div className="flex justify-end mt-4">
        <SubmitButton />
      </div>
    </form>
  );
}
