import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  const [solution, setSolution] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/solutions")
      .then((res) => res.json())
      .then((json) => {
        //generate a random integer between 0 and 44
        const rand_solution = json[Math.floor(Math.random() * json.length)];
        setSolution(rand_solution.word);
      });
  }, [setSolution]);

  return (
    <div className="App">
      <h1>Wordle App</h1>
      {solution && <div>Solution is: {solution} </div>}
    </div>
  );
};

export default App;
