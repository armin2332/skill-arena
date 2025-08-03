// فایل اصلی App.jsx
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [score, setScore] = useState({ X: 100, O: 100 });
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
      updateScore(newWinner);
    } else if (!newBoard.includes(null)) {
      setWinner("Draw");
    }

    setIsXNext(!isXNext);
  };

  const checkWinner = (board) => {
    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const updateScore = (winner) => {
    setScore((prev) => {
      const loser = winner === "X" ? "O" : "X";
      return {
        ...prev,
        [winner]: prev[winner] + 10,
        [loser]: prev[loser] - 10,
      };
    });
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">بازی دوز آنلاین (نسخه تمرینی)</h1>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className="w-24 h-24 text-3xl font-bold bg-white rounded-2xl shadow text-center hover:bg-gray-200"
          >
            {cell}
          </button>
        ))}
      </div>

      {winner && (
        <div className="mb-4 text-xl">
          {winner === "Draw" ? "مساوی شد!" : `برنده: ${winner}`}
        </div>
      )}

      <button
        onClick={resetGame}
        className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600"
      >
        شروع دوباره
      </button>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="text-center p-4">
            <h2 className="font-semibold">بازیکن X</h2>
            <p>سکه: {score.X}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center p-4">
            <h2 className="font-semibold">بازیکن O</h2>
            <p>سکه: {score.O}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default App;
