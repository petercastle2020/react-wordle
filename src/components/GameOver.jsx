import React, { useContext } from "react";
import { AppContext } from "../App";

function GameOver() {
  const { gameOver, setGameOver, randomWord, currAttempt } =
    useContext(AppContext);
  return (
    <div className="gameOver">
      <h2 id={gameOver.guessedWord ? "win" : "lost"}>
        {gameOver.guessedWord ? "You won !" : "You Lost..."}
      </h2>
      {gameOver.guessedWord === false ? (
        <h1>
          Correct word: <span id="win">{randomWord}</span>
        </h1>
      ) : null}

      {gameOver.guessedWord && (
        <h2>
          {" "}
          You guessed in {currAttempt.attempt}{" "}
          {currAttempt.attempt === 1 ? "attempt" : "attempts"}
        </h2>
      )}
    </div>
  );
}

export default GameOver;
