import React from "react";

function Key({ keyVal, bigKey }) {
  return (
    <div id={bigKey ? "big" : ""} className="key">
      {keyVal}
    </div>
  );
}

export default Key;
