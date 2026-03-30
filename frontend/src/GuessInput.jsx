import React, { useState } from 'react';
import { TextField } from "@mui/material";
import './GuessInput.css';

function GuessInput({ allSolutions, foundSolutions, correctAnswerCallback }) {
  const [labelText, setLabelText] = useState("Make your first guess!");
  const [input, setInput] = useState("");

  function evaluateInput() {
    const cleanInput = input.toUpperCase().trim();
    if (foundSolutions.includes(cleanInput)) {
      setLabelText(`${cleanInput} has already been found!`);
    } else if (allSolutions.includes(cleanInput)) {
      correctAnswerCallback(cleanInput);
      setLabelText(`${cleanInput} is correct!`);
    } else {
      setLabelText(`${cleanInput} is incorrect!`);
    }
    setInput(""); // Clear the input after checking
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      evaluateInput();
    }
  };

  return (
    <div className="Guess-input">
      <div className="label-area">{labelText}</div>
      <TextField 
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyPress} 
        variant="outlined"
        size="small"
      />
    </div>
  );
}

export default GuessInput;