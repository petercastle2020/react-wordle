import { React, useContext } from "react";
import { AppContext } from "../App";

function Key({ keyVal, bigKey, disabled, right, almost }) {
  const {
    currAttempt,
    onSelectLetter,
    onDelete,
    onEnter,
    rightLetters,
    almostLetters,
  } = useContext(AppContext);

  let attempt = currAttempt.attempt;
  let letterPos = currAttempt.letterPos;

  const selectLetter = () => {
    if (keyVal === "ENTER") {
      onEnter(attempt, letterPos);
    } else if (keyVal === "DELETE") {
      onDelete(attempt, letterPos);
    } else {
      onSelectLetter(keyVal, attempt, letterPos);
    }
  };

  //checking the index to see if the color have to change from green to yellow;

  // let keyState = "";

  // const rightIndex = rightLetters.includes(keyVal)
  //   ? rightLetters.indexOf(keyVal)
  //   : "0";
  // const almostIndex = almostLetters.includes(keyVal)
  //   ? almostLetters.indexOf(keyVal)
  //   : "0";

  // console.log(rightIndex);
  // console.log(almostIndex);

  // if (rightIndex > almostIndex) {
  //   keyState = "correct";
  // } else if (rightIndex < almostIndex) {
  //   keyState = "almost";
  // } else {
  //   console.log("the almost index and right index are the same.");
  // }

  return (
    <div
      id={
        bigKey
          ? "big"
          : disabled
          ? "disabled"
          : right
          ? "right"
          : almost
          ? "almost"
          : ""
      }
      className="key"
      onClick={selectLetter}
    >
      {keyVal}
    </div>
  );
}

export default Key;
