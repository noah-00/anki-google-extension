import { DecksType, TypeAddForm, TypeCard } from "@/types";
import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import ErrorRequired from "../useForm/errorRequired";
import SubmitButton from "../buttons/submitButton";

interface AddFormProps {
  decks: DecksType;
  handleAddFrontCard: (data: TypeAddForm) => void;
  card: TypeCard;
}

export default function AddForm(props: AddFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TypeAddForm>();

  useEffect(() => {
    if (props.decks.length > 0) {
      setValue("deck", props.decks[0]);
    }
  }, [props.decks, setValue]);

  const onSubmit: SubmitHandler<TypeAddForm> = (data) =>
    props.handleAddFrontCard(data);

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
        {props.decks?.map((deck, i) => (
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
        defaultValue={props.card.content}
        {...register("content", { required: true })}
      ></textarea>
      {errors.content && <ErrorRequired />}
      <div className="flex justify-end mt-4">
        <SubmitButton />
      </div>
    </form>
  );
}
