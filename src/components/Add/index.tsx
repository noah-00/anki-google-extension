import React, { useEffect, useState } from "react";
import { apiAnkiClient, setJsonToAnki } from "@/utils/functions";
import { ACTION_DECK_NAMES, ACTION_REQUEST_PERMISSON } from "@/utils/const";

type Decks = string[];

const Index = () => {
  const [decks, setDecks] = useState<Decks>([]);

  const handleSetDeck = async (): Promise<void> => {
    try {
      await apiAnkiClient.post("/", setJsonToAnki(ACTION_REQUEST_PERMISSON, 6));

      const response = await apiAnkiClient.post(
        "/",
        setJsonToAnki(ACTION_DECK_NAMES, 6)
      );
      const { data } = response;
      if (data.result) {
        setDecks(data.result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleSetDeck();
  }, []);

  return (
    <div>
      <label htmlFor="countries" className="block mb-2 text-sm font-medium">
        current deck :
      </label>
      <select
        id="countries"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      >
        {decks?.map((deck, i) => (
          <option value="US" key={i}>
            {deck}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Index;
