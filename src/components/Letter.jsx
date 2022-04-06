import { getQueriesForElement } from "@testing-library/react";
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

  let letterState =
    currAttempt.attempt > attemptVal &&
    (correct ? "correct" : almost ? "almost" : error ? "error" : "");

  //////////////////////////////////////////////////////////////////

  // I could set a empty arrays with some value, so the first one who gets the letter added, will be the first with that index

  // const rightIndex = rightLetters.includes(letter)
  //   ? rightLetters.indexOf(letter)
  //   : "0";
  // const almostIndex = almostLetters.includes(letter)
  //   ? almostLetters.indexOf(letter)
  //   : "0";

  // console.log(rightIndex);
  // console.log(almostIndex);

  // if (rightIndex > almostIndex) {
  //   letterState = "correct";
  // } else if (rightIndex < almostIndex) {
  //   letterState = "almost";
  // } else {
  //   console.log("the almost index and right index are the same.");
  // }

  //////////////////////////////////////////////////////////////

  // var newletter = R > going to the yellow array.
  // const right = [R,]
  // const almost = [I,]

  // R = green
  // I = yellow

  // change the R to "yellow"

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

  console.log(rightLetters);
  console.log(almostLetters);

  return (
    <div className="letter" id={letterState}>
      {letter}
    </div>
  );
}

export default Letter;
