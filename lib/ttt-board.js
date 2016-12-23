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

    gameIsOver: () => {
      return false;
    },

    toString: () => {
      let res = "";
      for(let i = 0; i < ROWS; i++) {
        res += "| " + board[i].join(" | ") + " |" + "\n|---+---+---|\n";
      }
      return res;
    }
  }

  // private functions
  function parse () {
    return undefined;
  }
}

module.exports = createBoard; 
