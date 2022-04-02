import React, { useContext, useEffect } from "react";
import { AppContext } from "../App";

function Letter({ letterPos, attemptVal }) {
  const {
    board,
    correctWord,
    currAttempt,
    setDisabledLetters,
    setRightLetters,
    setAlmostLetters,
  } = useContext(AppContext);
  const letter = board[attemptVal][letterPos];

  const correct = correctWord[letterPos] === letter;

  const almost = !correct && letter !== "" && correctWord.includes(letter);

  const error = !correct && !almost && letter !== "";

  const letterState =
    currAttempt.attempt > attemptVal &&
    (correct ? "correct" : almost ? "almost" : error ? "error" : "");

  /////////////////IN progress, making sure that Key color keep up with the last attempt color/////

  const prevLetter = board[attemptVal - 1][letterPos];

  if (
    letter !== prevLetter && prevLetter === correct
      ? (letterState = letter)
      : ""
  )
    //////////////////////////////////////////////////////////////////////////////

    useEffect(() => {
      if (letter !== "" && !correct && !almost) {
        setDisabledLetters((prev) => [...prev, letter]);
      } else if (letter !== "" && correct) {
        setRightLetters((prev) => [...prev, letter]);
      } else if (letter !== "" && almost) {
        setAlmostLetters((prev) => [...prev, letter]);
      } else {
        console.log("something went wrong...");
      }
    }, [currAttempt.attempt]);

  return (
    <div className="letter" id={letterState}>
      {letter}
    </div>
  );
}

export default Letter;
