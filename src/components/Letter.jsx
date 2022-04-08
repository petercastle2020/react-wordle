import React, { useContext, useEffect } from "react";
import { AppContext } from "../App";

function Letter({ letterPos, attemptVal }) {
  const {
    board,
    correctWord,
    currAttempt,
    rightLetters,
    almostLetters,
    setDisabledLetters,
    setRightLetters,
    setAlmostLetters,
  } = useContext(AppContext);

  const letter = board[attemptVal][letterPos];

  const correct = correctWord[letterPos] === letter;

  const almost = !correct && letter !== "" && correctWord.includes(letter);

  const error = !correct && !almost && letter !== "";

  // .grey-overlay .yellow-overlay .green-overlay

  let letterState =
    currAttempt.attempt > attemptVal &&
    (correct ? "correct" : almost ? "almost" : error ? "error" : "");

  useEffect(() => {
    if (letter !== "" && !correct && !almost) {
      setDisabledLetters((prev) => [...prev, letter]);
    } else if (letter !== "" && correct) {
      setRightLetters((prev) => {
        if (prev.includes(letter)) {
          return [...prev];
        } else {
          return [...prev, letter];
        }
      });
    } else if (letter !== "" && almost) {
      setAlmostLetters((prev) => {
        if (prev.includes(letter)) {
          return [...prev];
        } else {
          return [...prev, letter];
        }
      });
    } else {
      console.log("something went wrong...");
    }
  }, [currAttempt.attempt]);

  return (
    <div className={"letter" + " " + letterState} id={letterState}>
      {letter}
    </div>
  );
}

export default Letter;
