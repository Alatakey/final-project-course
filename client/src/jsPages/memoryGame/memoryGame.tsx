import clsx from "clsx";
import React, { useState } from "react";

interface Card {
  value: number;
  id: number;
}
const CARDS: Card[] = [
  { value: 1, id: 1 },
  { value: 2, id: 2 },
  { value: 3, id: 3 },
  { value: 4, id: 4 },
  { value: 5, id: 5 },
  { value: 6, id: 6 },
  { value: 7, id: 7 },
  { value: 8, id: 8 },
  { value: 1, id: 9 },
  { value: 2, id: 10 },
  { value: 3, id: 11 },
  { value: 4, id: 12 },
  { value: 5, id: 13 },
  { value: 6, id: 14 },
  { value: 7, id: 15 },
  { value: 8, id: 16 },
];

const shuffleCards = shuffleArray(CARDS);

function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default function MemoryGame() {
  const [flippedCards, setFlippedCards] = useState<Card[]>([]);
  const [matchedCards, setMatchedCards] = useState<Card[]>([]);

  const gameOver = matchedCards.length === shuffleCards.length;

  function handleCardClick(card: Card) {
    // check if two cards are already flipped
    if (flippedCards.length === 2) {
      return;
    }
    // check if card is already flipped
    if (isCardFlipped(card)) {
      return;
    }
    // add new card to flipped cards
    let newFlippedCards = [...flippedCards];
    newFlippedCards.push(card);
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      if (newFlippedCards[0].value === newFlippedCards[1].value) {
        setMatchedCards([
          ...matchedCards,
          newFlippedCards[0],
          newFlippedCards[1],
        ]);
      }
      setTimeout(() => {
        newFlippedCards = [];
        setFlippedCards(newFlippedCards);
      }, 500);
    }
  }

  function isCardFlipped(card: Card) {
    return flippedCards.some((c) => c.id === card.id);
  }

  function isCardMatched(card: Card) {
    return matchedCards.some((c) => c.id === card.id);
  }

  const renderCards = () => {
    return shuffleCards.map((c: Card) => {
      let isThisCardFlipped = isCardFlipped(c);
      let isThisCardMatched = isCardMatched(c);
      return (
        <div
          key={c.id}
          className={clsx(
            "relative w-20 h-24 bg-gray-300 rounded-md flex items-center justify-center text-4xl cursor-pointer transition-transform transform-gpu",
            isThisCardMatched ? "opacity-0" : "opacity-100"
          )}
          onClick={() => handleCardClick(c)}
        >
          <p className={isThisCardFlipped ? "opacity-100" : "opacity-0"}>
            {c.value}
          </p>
        </div>
      );
    });
  };

  const resetGame = () => {
    setFlippedCards([]);
    setMatchedCards([]);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Memory Game</h1>

      <div className="grid grid-cols-4 gap-4">{renderCards()}</div>
      {gameOver && (
        <div className="text-2xl font-bold text-green-600 mt-4">
          Congratulations! You've won!
        </div>
      )}
      <div
        onClick={() => resetGame()}
        className="text-2xl font-semibold bg-slate-300 p-2 rounded-md text-blue-500 mt-4 hover:bg-slate-400 cursor-pointer"
      >
        Play again
      </div>
    </div>
  );
}
