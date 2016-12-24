'use strict';

function createBoard(opt) {
  opt = opt || {}

  // private data
  const ROWS = 3;
  const COLS = 3;
  let board = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];

  // API/data for end-user
  return {

    /**
     * Restarts the board for a new game.
     */
    restart: () => {
      board = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];
    },

    /**
     * Returns true if coordinates (@row, @col) are valid. That is,
     * they are within range and are not occupied.
     */
    isValidMove: (row, col) => {
      return row >= 0 && row < ROWS && 
        col >= 0 && col < COLS && 
        board[row][col] === "-";
    },

    /**
     * Updates the board with a user move. Note that isValidMove
     * must be called before calling this function.
     */
    makeMove: (row, col, token) => {
      board[row][col] = token;
    },

    /**
     * Returns true if there's a winning line and false otherwise.
     */
    hasLine: (token) => {
      // Looking for horizontal win
      for(let i = 0; i < ROWS; i++) {
        let res = true 
        for(let j = 0; j < COLS; j++) {
          res = res && board[i][j] == token;
        }
        if(res) return true;
      }

      // Looking for vertical win
      for(let j = 0; j < COLS; j++) {
        let res = true;
        for(let i = 0; i < ROWS; i++) {
          res = res && board[i][j] == token;
        }
        if(res) return true;
      }

      // Looking for diagonals win
      return (board[0][0] == token && board[1][1] == token && board[2][2] == token)
          || (board[0][2] == token && board[1][1] == token && board[2][0] == token)
    },

    /**
     * Returns true if the board is full, that is when there's a
     * tie and false otherwise.
     */
    isFull: () => {
      for(let i = 0; i < ROWS; i++) {
        for(let j = 0; j < COLS; j++) {
          if(board[i][j] === '-') return false;
        }
      }

      return true;
    },

    /**
     * Returns a string representation of the board.
     */
    toString: () => {
      let res = "";
      for(let i = 0; i < ROWS; i++) {
        res += "| " + board[i].join(" | ") + " |" + "\n|---+---+---|\n";
      }
      return res;
    },

    // function for testing
    getRawBoard: () => {
      return board;
    }
  }

}

module.exports = createBoard; 
