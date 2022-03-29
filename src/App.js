import "./App.css";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import { createContext, useState } from "react";
import { boardDefault } from "./Words";

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0 });

  const onSelectLetter = (keyVal, attempt, letterPos) => {
    if (letterPos > 4) {
      attempt++;
      letterPos = 0;
    }
    const newBoard = [...board];
    newBoard[attempt][letterPos] = keyVal;
    setBoard(newBoard);
    letterPos++;

    setCurrAttempt({ attempt: attempt, letterPos: letterPos });
  };

  const onDelete = (attempt, letterPos) => {
    if (letterPos === 0) return;

    const newBoard = [...board];

    letterPos--;

    newBoard[attempt][letterPos] = "";

    setBoard(newBoard);

    setCurrAttempt({ attempt: attempt, letterPos: letterPos });
  };

  const onEnter = (attempt, letterPos) => {
    if (letterPos !== 5) return;
    setCurrAttempt({ attempt: attempt, letterPos: letterPos });
    console.log("enter key clicked.");
  };

  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      <AppContext.Provider
        value={{
          board,
          setBoard,
          currAttempt,
          setCurrAttempt,
          onSelectLetter,
          onDelete,
          onEnter,
        }}
      >
        <div className="game">
          <Board />
          <Keyboard />
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
