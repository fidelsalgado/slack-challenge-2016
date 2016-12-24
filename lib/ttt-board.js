'use strict';
/**
 * [Description of method]
 * 
 * @param [parameter] -- [description]
 *
 */

function createBoard(opt) {
  opt = opt || {}

  // private data
  const ROWS = 3;
  const COLS = 3;
  let board = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];

  // API/data for end-user
  return {

    restart: () => {
      board = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];
    },

    isValidMove: (row, col) => {
      return row >= 0 && row < ROWS && 
        col >= 0 && col < COLS && 
        board[row][col] === "-";
    },

    makeMove: (row, col, token) => {
      board[row][col] = token;
    },

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

    toString: () => {
      let res = "";
      for(let i = 0; i < ROWS; i++) {
        res += "| " + board[i].join(" | ") + " |" + "\n|---+---+---|\n";
      }
      return res;
    },

    getRawBoard: () => {
      return board;
    }
  }

}

module.exports = createBoard; 
