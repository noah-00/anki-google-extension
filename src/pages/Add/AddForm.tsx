import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, Form } from "react-hook-form";

import ErrorAlert from "@/components/common/parts/ErrorAlert";
import Label from "@/components/common/parts/Label";
import SubmitButton from "@/components/common/parts/SubmitButton";

import { useAddCardStore } from "@/context/addCardStore";
import { useAnkiAction } from "@/hooks/useAnkiAction";
import { DecksType, TypeCard } from "@/types";
import { CHOOSE_WORD_STEP, FORM_KEY_CONTENT, FORM_KEY_DECK } from "@/utils/Const";

export default function AddForm() {
  const { handleAddFrontCard, handleSetCurrentStep, card } = useAddCardStore();
  const { getDecks } = useAnkiAction();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch
  } = useForm<TypeCard>();

  // get deck data from local Anki app
  const [decks, setDecks] = useState<DecksType>([]);

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
      deck: card.deck
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
      <Label htmlFor="deck">Current Deck</Label>
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
      {errors.deck && <ErrorAlert errorMessage="This field is required" />}

      <Label htmlFor="front">Front</Label>
      <textarea
        id="front"
        className="h-52 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Front Text"
        {...register(FORM_KEY_CONTENT, { required: true })}
      ></textarea>
      {errors.content && <ErrorAlert errorMessage="This field is required" />}

      <div className="flex justify-end mt-4">
        <SubmitButton />
      </div>
    </form>
  );
}
