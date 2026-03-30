import React, { useState, useEffect, useMemo } from 'react';
import {GAME_STATE} from './GameState.js';


function App() {
  const [allSolutions, setAllSolutions] = useState([]);  // solutions from solver
  const [foundSolutions, setFoundSolutions] = useState([]);  // found by user
  const [gameState, setGameState] = useState(GAME_STATE.BEFORE); // Just an enuerator or the three states see below
  const [grid, setGrid] = useState([]);   // the grid
  const [totalTime, setTotalTime] = useState(0);  // total time elapsed
  const [size, setSize] = useState(3);  // selected grid size
  const [game, setGame] = useState({}); // used to hold Game Object retrieved from the REST ENDPOINT /game/{size}

  // useEffect will trigger when the array items in the second argument are
  // updated so whenever grid is updated, we will recompute the solutions
// useEffect will trigger when the array items in the second argument are
// updated so whenever grid is updated, we will recompute the solutions

useEffect(() => {
     if (typeof game.solution_words !== "undefined") {
        let tmpAllSolutions = game.solution_words;
        setAllSolutions(tmpAllSolutions);
        }
}, [game]);

  // This will run when size or gameState changes.
  // When a new game is started, generate a new random grid and reset solutions
useEffect(() => {
  if (gameState === GAME_STATE.IN_PROGRESS) {
    fetch(`/api/game/${size}/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("API data:", data);

        setGame(data);

        if (data.grid) {
          setGrid(data.grid);
        } else {
          throw new Error("grid is missing from API response");
        }

        setFoundSolutions([]);
      })
      .catch((err) => {
        console.log("Fetch error:", err.message);
      });
  }
}, [gameState, size]);

  function correctAnswerFound(answer) {
    console.log("New correct answer:" + answer);
    setFoundSolutions([...foundSolutions, answer]);
  }


  
  return (
     :
     :
    );