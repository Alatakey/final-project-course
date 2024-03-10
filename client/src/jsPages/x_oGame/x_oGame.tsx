import { useState } from "react";

type XoChoice = "X" | "O" | "";

export default function XOGame() {
  const [isGameOver, setIsGameOver] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState<XoChoice>("X");
  const [winner, setWinner] = useState<XoChoice | null>(null);
  const [winningLine, setWinningLine] = useState<number[]>([]);
  const [board, setBoard] = useState<XoChoice[]>(Array(9).fill(""));

  const handleClick = (index: number) => {
    if (!isGameOver && !board[index]) {
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);
      checkWinner(newBoard);
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  const checkWinner = (board: XoChoice[]) => {
    const winLines: number[][] = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];

    for (let line of winLines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setIsGameOver(true);
        setWinner(board[a]);
        setWinningLine(line);
        return;
      }
    }

    if (board.every((cell) => cell !== "")) {
      setIsGameOver(true);
      setWinner(null); // Draw
    }
  };

  const resetGame = () => {
    setIsGameOver(false);
    setWinner(null);
    setCurrentPlayer("X");
    setWinningLine([]);
    setBoard(Array(9).fill(""));
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">XOGame</h1>
      <div className="mb-4">
        <h2 className="text-lg">Current player: {currentPlayer}</h2>
        {isGameOver && (
          <h2 className="text-lg">
            {winner ? `Winner: ${winner}` : "It's a draw!"}
          </h2>
        )}
      </div>
      <div className="grid grid-cols-3 gap-4">
        {board.map((item, index) => (
          <Cell
            key={index}
            value={item}
            onClick={() => handleClick(index)}
            isWinning={winningLine.includes(index)}
          />
        ))}
      </div>
      {isGameOver && (
        <button
          onClick={resetGame}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Play again
        </button>
      )}
    </div>
  );
}

interface CellProps {
  value: XoChoice;
  onClick: () => void;
  isWinning: boolean;
}

function Cell({ value, onClick, isWinning }: CellProps) {
  return (
    <div
      className={`bg-gray-200 border border-gray-400 rounded-md flex items-center justify-center text-5xl cursor-pointer  w-[200px] h-[200px] ${
        isWinning ? "bg-green-200" : "hover:bg-gray-300"
      }`}
      onClick={onClick}
    >
      {value}
    </div>
  );
}
