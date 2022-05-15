import React from "react";

export default function Modal({ isCorrect, turn, solution }) {
  return (
    <div className="modal">
      {isCorrect && (
        <div>
          <h1>You Win!</h1>
          <p className="solution">Solution: {solution}</p>

          <p>You found the solution in {turn} guesse(s)</p>
        </div>
      )}

      {!isCorrect && (
        <div>
          <h1>Loser!</h1>
          <p className="solution">SOlution: {solution}</p>
          <p>You're a noobie</p>
        </div>
      )}
    </div>
  );
}
