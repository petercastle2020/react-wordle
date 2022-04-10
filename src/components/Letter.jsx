import React, { useContext, useEffect } from "react";
import { AppContext } from "../App";

function Letter({ letterPos, attemptVal }) {
  const {
    board,
    randomWord,
    currAttempt,
    rightLetters,
    almostLetters,
    setDisabledLetters,
    setRightLetters,
    setAlmostLetters,
  } = useContext(AppContext);

  const letter = board[attemptVal][letterPos];

  const correct = randomWord.toUpperCase()[letterPos] === letter;

  const almost =
    !correct && letter !== "" && randomWord.toUpperCase().includes(letter);

  const error = !correct && !almost && letter !== "";

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
