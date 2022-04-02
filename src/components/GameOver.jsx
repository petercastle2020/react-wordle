import React, { useContext } from "react";
import { AppContext } from "../App";

function GameOver() {
  const { gameOver, setGameOver, correctWord, currAttempt } =
    useContext(AppContext);
  return (
    <div className="gameOver">
      <h3>{gameOver.guessedWord ? "You won !" : "You Lost..."}</h3>
      <h1>Correct word was:{correctWord}</h1>
      {gameOver.guessedWord && (
        <h3> You guessed in {currAttempt.attempt} attempts</h3>
      )}
    </div>
  );
}

export default GameOver;
