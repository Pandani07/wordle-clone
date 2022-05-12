import { useState } from "react";

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([...Array(6)]);
  const [history, setHistory] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);

  const formatGuess = () => {
    setHistory(currentGuess);

    let solutionArray = [...solution];
    let formattedGuess = [...currentGuess].map((letter) => {
      return { key: letter, color: "grey" };
    });

    //find green letters
    formattedGuess.forEach((letter, i) => {
      if (solutionArray[i] === letter.key) {
        formattedGuess[i].color = "green";
        solutionArray[i] = null;
      }
    });

    //search for yellow
    formattedGuess.forEach((letter, i) => {
      if (solutionArray.includes(letter.key) && letter.color !== "green") {
        formattedGuess[i].color = "yellow";
        solutionArray[solutionArray.indexOf(letter.key)] = null;
      }
    });

    return formattedGuess;
  };

  const addNewGuess = (formattedGuess) => {
    if (currentGuess === solution) {
      setIsCorrect(true);
    }

    setGuesses((prevGuesses) => {
      let newGuesses = [...prevGuesses];
      newGuesses[turn] = formattedGuess;
      return newGuesses;
    });
    setHistory((prevHistory) => {
      return [...prevHistory, currentGuess];
    });
    setTurn((prevTurn) => {
      return prevTurn + 1;
    });

    setCurrentGuess("");
  };

  const handleKeyup = ({ key }) => {
    if (key === "Backspace") {
      setCurrentGuess((prev) => {
        return prev.slice(0, -1); //returns a new string, removing the last character
      });
      return;
    }

    if (key === "Enter") {
      //only add guess if the turn is less than 5
      if (turn > 5) {
        console.log("All guesses used up\n");
        return;
      }
      //dont allow duplicate words
      if (history.includes(currentGuess)) {
        console.log("You  tried this word\n");
        return;
      }
      //check if the word is 5 characters long
      if (currentGuess.length !== 5) {
        console.log("Length of your current guess is not 5 characters long\n");
        return;
      }

      const formattedGuess = formatGuess();
      addNewGuess(formattedGuess);
    }

    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => {
          return prev + key;
        });
      }
    }
  };

  return { turn, currentGuess, guesses, isCorrect, handleKeyup };
};

export default useWordle;
