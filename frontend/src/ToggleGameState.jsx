import React, { useState } from 'react';
import { Button, MenuItem, FormHelperText, Select, FormControl, TextField } from '@mui/material';
import { GAME_STATE } from './GameState.js';
import './ToggleGameState.css';

function ToggleGameState({ gameState, setGameState, setSize, setTotalTime, leaderBoard, onGameSelected }) {
  const [buttonText, setButtonText] = useState("Start a new game!");
  const [startTime, setStartTime] = useState(0);
  const [playerName, setPlayerName] = useState("");

  // Logic for the Main Start/End button
  function updateGameState(endTime) {
    if (gameState === GAME_STATE.BEFORE || gameState === GAME_STATE.ENDED || gameState === GAME_STATE.SHOW_LEADERBOARD) {
      setStartTime(Date.now());
      setGameState(GAME_STATE.IN_PROGRESS);
      setButtonText("End game");
    } else if (gameState === GAME_STATE.IN_PROGRESS) {
      const deltaTime = (endTime - startTime) / 1000.0;
      setTotalTime(deltaTime); 
      setGameState(GAME_STATE.ADD_LEADERBOARD); // Transition to name entry
    }
  }

  // Capturing the player name for the leaderboard
  function handleNameSubmit(e) {
    if (e.key === 'Enter') {
      console.log("Saving result for:", playerName);
      // Here you would trigger your POST to Django
      setGameState(GAME_STATE.ENDED);
      setButtonText("Start a new game!");
    }
  }

  return (
    <div className="Toggle-container">
      {/* 1. Play Existing Game Button */}
      {(gameState === GAME_STATE.BEFORE || gameState === GAME_STATE.ENDED) && (
        <div className="Leaderboard-toggle">
          <Button variant="outlined" onClick={() => setGameState(GAME_STATE.SHOW_LEADERBOARD)}>
            Play Existing Game
          </Button>
        </div>
      )}

      <div className="Main-controls">
        {/* 2. Player Name Input (Only in ADD_LEADERBOARD state) */}
        {gameState === GAME_STATE.ADD_LEADERBOARD ? (
          <TextField 
            label="Enter Your Name" 
            variant="outlined" 
            onKeyDown={handleNameSubmit} 
            onChange={(e) => setPlayerName(e.target.value)} 
          />
        ) : (
          /* 3. Main Start/End Button */
          <Button variant="contained" onClick={() => updateGameState(Date.now())}>
            {buttonText}
          </Button>
        )}

        {/* 4. Grid Size Dropdown (Standard mode) */}
        {(gameState === GAME_STATE.BEFORE || gameState === GAME_STATE.ENDED) && (
          <FormControl size="small" sx={{ ml: 2, minWidth: 120 }}>
            <Select defaultValue={3} onChange={(e) => setSize(e.target.value)}>
              {[3, 4, 5, 6].map(s => <MenuItem key={s} value={s}>{s}x{s}</MenuItem>)}
            </Select>
            <FormHelperText>Set Grid Size</FormHelperText>
          </FormControl>
        )}

        {/* 5. Leaderboard Game Picker (Only in SHOW_LEADERBOARD state) */}
        {gameState === GAME_STATE.SHOW_LEADERBOARD && (
          <FormControl size="small" sx={{ ml: 2, minWidth: 200 }}>
            <Select onChange={(e) => onGameSelected(e.target.value)}>
              {leaderBoard.map((item, idx) => (
                <MenuItem key={idx} value={item.theBoard}>
                  {item.playerName} ({item.numFound} words)
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Select a Past Game</FormHelperText>
          </FormControl>
        )}
      </div>
    </div>
  );
}

export default ToggleGameState;