import "./App.css";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import GameOver from "./components/GameOver";
import Alert from "./components/Alert";
import { createContext, useEffect, useState } from "react";
import { boardDefault, generateWordSet } from "./components/Words";

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0 });
  const [wordSet, setWordSet] = useState(new Set());
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [rightLetters, setRightLetters] = useState([]);
  const [almostLetters, setAlmostLetters] = useState([]);
  const [wordNotFound, setWordNotFound] = useState(false);
  const [randomWord, setRandomWord] = useState("");
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setRandomWord(words.randomWord);
    });
  }, []);

  const onSelectLetter = (keyVal, attempt, letterPos) => {
    if (letterPos < 5) {
      const newBoard = [...board];
      newBoard[attempt][letterPos] = keyVal;
      setBoard(newBoard);
      letterPos++;

      setCurrAttempt({ attempt: attempt, letterPos: letterPos });
    }
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
    if (letterPos !== 5) {
      return;
    } else if (letterPos === 5) {
      //check to see if the word exist, and if the player won.
      let currWord = "";

      for (let i = 0; i < 5; i++) {
        currWord += board[currAttempt.attempt][i];
      }

      if (wordSet.has(currWord.toLowerCase())) {
        attempt++;
        letterPos = 0;
        setCurrAttempt({ attempt: attempt, letterPos: letterPos });
      } else {
        setWordNotFound(true);

        setTimeout(() => {
          setWordNotFound(false);
        }, 3000);
      }

      if (currWord.toLowerCase() === randomWord) {
        setGameOver({
          gameOver: true,
          guessedWord: true,
        });
        return;
      }

      if (currAttempt.attempt === 5 && currWord.toLowerCase() !== randomWord) {
        setGameOver({ gameOver: true, guessedWord: false });
        return;
      }
    }
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
          randomWord,
          disabledLetters,
          setDisabledLetters,
          rightLetters,
          setRightLetters,
          almostLetters,
          setAlmostLetters,
          gameOver,
          setGameOver,
        }}
      >
        <div className="game">
          {wordNotFound && <Alert />}
          <Board />
          {gameOver.gameOver ? <GameOver /> : <Keyboard />}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
