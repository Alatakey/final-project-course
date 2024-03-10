import React, { useState } from "react";
import clsx from "clsx";

// Define enum Cell
enum Cell {
  Red = "Red",
  Yellow = "Yellow",
  Empty = "Empty",
}

const Col = 6; // Number of columns
const Row = 7; // Number of rows

const GameBoard = () => {
  // Define the initial state
  const [board, setBoard] = useState<Cell[][]>(
    Array(Row).fill(Array(Col).fill(Cell.Empty))
  );
  const [turn, setTurn] = useState<Cell>(Cell.Red);
  const [winner, setWinner] = useState<Cell | null>(null);

  // Function to render a single cell
  const renderCell = (cell: Cell, rowIndex: number, colIndex: number) => {
    let bgColor;
    switch (cell) {
      case Cell.Red:
        bgColor = "bg-red-500 hover:bg-red-600";
        break;
      case Cell.Yellow:
        bgColor = "bg-yellow-500 hover:bg-yellow-600";
        break;
      case Cell.Empty:
        bgColor = "bg-gray-500 hover:bg-gray-600";
        break;
      default:
        bgColor = "bg-white";
    }
    return (
      <td
        key={`${rowIndex}-${colIndex}`}
        onClick={() => cellClickHandler(colIndex)}
        className={clsx(
          "w-16 h-16 border border-gray-400 cursor-pointer",
          bgColor
        )}
      ></td>
    );
  };

  // Function to render the entire board
  const renderBoard = () => {
    return (
      <table className="border-collapse">
        <tbody>
          {board.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <React.Fragment key={`${rowIndex}-${colIndex}`}>
                  {renderCell(cell, rowIndex, colIndex)}
                </React.Fragment>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  // Function to update the board with the new cell position
  const updateBoard = (newBoard: Cell[][], colIndex: number) => {
    let rowIndex = -1;
    // Find the first empty cell in the column
    for (let i = Row - 1; i >= 0; i--) {
      if (newBoard[i][colIndex] === Cell.Empty) {
        rowIndex = i;
        break;
      }
    }
    if (rowIndex === -1) return newBoard; // Column is full, no change

    // Update the cell with the player's color
    const newBoardCopy = [...newBoard];
    newBoardCopy[rowIndex] = [...newBoardCopy[rowIndex]];
    newBoardCopy[rowIndex][colIndex] = turn;

    return newBoardCopy;
  };

  // Function to handle player click on a cell
  const cellClickHandler = (colIndex: number) => {
    if (winner || turn === Cell.Empty) return; // Game over or invalid turn
    const newBoard = updateBoard(board, colIndex);
    if (newBoard === board) return; // Column is full, no change

    setBoard(newBoard);
    // Check for win after each move
    if (checkForWin(newBoard)) {
      setWinner(turn);
    } else {
      // Switch turns
      setTurn(turn === Cell.Red ? Cell.Yellow : Cell.Red);
    }
  };

  // Function to check for a win condition
  const checkForWin = (boardToCheck: Cell[][]) => {
    // Check rows
    for (let r = 0; r < Row; r++) {
      for (let c = 0; c < Col - 3; c++) {
        if (
          boardToCheck[r][c] !== Cell.Empty &&
          boardToCheck[r][c] === boardToCheck[r][c + 1] &&
          boardToCheck[r][c] === boardToCheck[r][c + 2] &&
          boardToCheck[r][c] === boardToCheck[r][c + 3]
        ) {
          return true;
        }
      }
    }

    // Check columns
    for (let r = 0; r < Row - 3; r++) {
      for (let c = 0; c < Col; c++) {
        if (
          boardToCheck[r][c] !== Cell.Empty &&
          boardToCheck[r][c] === boardToCheck[r + 1][c] &&
          boardToCheck[r][c] === boardToCheck[r + 2][c] &&
          boardToCheck[r][c] === boardToCheck[r + 3][c]
        ) {
          return true;
        }
      }
    }

    // Check diagonals (top-left to bottom-right)
    for (let r = 0; r < Row - 3; r++) {
      for (let c = 0; c < Col - 3; c++) {
        if (
          boardToCheck[r][c] !== Cell.Empty &&
          boardToCheck[r][c] === boardToCheck[r + 1][c + 1] &&
          boardToCheck[r][c] === boardToCheck[r + 2][c + 2] &&
          boardToCheck[r][c] === boardToCheck[r + 3][c + 3]
        ) {
          return true;
        }
      }
    }

    // Check diagonals (bottom-left to top-right)
    for (let r = 3; r < Row; r++) {
      for (let c = 0; c < Col - 3; c++) {
        if (
          boardToCheck[r][c] !== Cell.Empty &&
          boardToCheck[r][c] === boardToCheck[r - 1][c + 1] &&
          boardToCheck[r][c] === boardToCheck[r - 2][c + 2] &&
          boardToCheck[r][c] === boardToCheck[r - 3][c + 3]
        ) {
          return true;
        }
      }
    }

    return false;
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-lg font-semibold mb-4">Game Board</h2>
      <h3>Turn: {turn.toString()}</h3>
      <h3>Winner: {winner?.toString()}</h3>
      <div className="overflow-hidden">{renderBoard()}</div>
    </div>
  );
};

export default GameBoard;
