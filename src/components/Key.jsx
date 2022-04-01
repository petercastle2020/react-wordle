import { React, useContext } from "react";
import { AppContext } from "../App";

function Key({ keyVal, bigKey, disabled }) {
  const { currAttempt, onSelectLetter, onDelete, onEnter } =
    useContext(AppContext);

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

  return (
    <div
      id={bigKey ? "big" : disabled && "disabled"}
      className="key"
      onClick={selectLetter}
    >
      {keyVal}
    </div>
  );
}

export default Key;
