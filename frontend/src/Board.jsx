import React from 'react';
import { Grid, Paper } from "@mui/material";
import './Board.css';

function Board({ board }) {
  function tile(id, letter) {
    return (
      <Grid key={id} item>
        <div className="Tile">
          <Paper elevation={4}>{letter}</Paper>
        </div>
      </Grid>
    );
  }

  function rowOfTiles(id, rowObj) {
    return (
      <Grid key={id} container spacing={2} justifyContent="center" wrap="nowrap">
        {Object.keys(rowObj).map((letterKey) =>
          tile(letterKey + id, rowObj[letterKey])
        )}
      </Grid>
    );
  }

  return (
    <div className="Board-div">
      <div className="Board-container">
        <Grid container direction="column" spacing={2}>
          {Object.keys(board).map((rowKey) => rowOfTiles(rowKey, board[rowKey]))}
        </Grid>
      </div>
    </div>
  );
}

export default Board;