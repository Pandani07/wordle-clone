import React, { useEffect, useState } from "react";

export default function Keypads({ usedKeys }) {
  const [letters, setLetters] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/letters")
      .then((res) => res.json())
      .then((json) => {
        setLetters(json);
      });
  }, []);
  return (
    <div className="keypad">
      {letters &&
        letters.map((letter, index) => {
          const color = usedKeys[letter.key];

          return (
            <div key={letter.key} className={color}>
              {" "}
              {letter.key}{" "}
            </div>
          );
        })}
    </div>
  );
}
