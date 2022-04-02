import React, { useCallback, useContext, useEffect } from "react";
import { AppContext } from "../App";
import Key from "./Key";

function Keyboard() {
  const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];

  const {
    onSelectLetter,
    onEnter,
    onDelete,
    currAttempt,
    disabledLetters,
    rightLetters,
    almostLetters,
  } = useContext(AppContext);

  let attempt = currAttempt.attempt;
  let letterPos = currAttempt.letterPos;

  const handleKeyboard = useCallback((event) => {
    if (event.key === "Enter") {
      onEnter(attempt, letterPos);
    } else if (event.key === "Backspace") {
      onDelete(attempt, letterPos);
    } else {
      keys1.forEach((key) => {
        if (event.key.toLowerCase() === key.toLowerCase()) {
          onSelectLetter(key, attempt, letterPos);
        }
      });
      keys2.forEach((key) => {
        if (event.key.toLowerCase() === key.toLowerCase()) {
          onSelectLetter(key, attempt, letterPos);
        }
      });
      keys3.forEach((key) => {
        if (event.key.toLowerCase() === key.toLowerCase()) {
          onSelectLetter(key, attempt, letterPos);
        }
      });
    }
  });

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);

    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyboard]);

  return (
    <div className="keyboard" onKeyDown={handleKeyboard}>
      <div className="line1">
        {keys1.map((key) => {
          return (
            <Key
              keyVal={key}
              disabled={disabledLetters.includes(key)}
              right={rightLetters.includes(key)}
              almost={almostLetters.includes(key)}
            />
          );
        })}
      </div>
      <div className="line2">
        {keys2.map((key) => {
          return (
            <Key
              keyVal={key}
              disabled={disabledLetters.includes(key)}
              right={rightLetters.includes(key)}
              almost={almostLetters.includes(key)}
            />
          );
        })}
      </div>
      <div className="line3">
        <Key keyVal={"ENTER"} bigKey={true} />
        {keys3.map((key) => {
          return (
            <Key
              keyVal={key}
              disabled={disabledLetters.includes(key)}
              right={rightLetters.includes(key)}
              almost={almostLetters.includes(key)}
            />
          );
        })}
        <Key keyVal={"DELETE"} bigKey={true} />
      </div>
    </div>
  );
}

export default Keyboard;
