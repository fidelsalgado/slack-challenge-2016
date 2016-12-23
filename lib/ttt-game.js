
function startGame() {
  //private data
  let board = require('./ttt-board.js')();
  let users = { };
  let gameIsOver = true;
  let nextTurn;

  return {
    newGame: (username1, username2) => {
      users[username1] = { "token": "X" };
      users[username2] = { "token": "O" };
      nextTurn = username1;
      gameIsOver = false;
      console.log("gameIsOver = " + gameIsOver);
    },

    validUserMove: (username, row, col) => {
      return username === nextTurn && board.isValidMove(row, col);
    },

    userMove: (username, row, col) => {
      // TODO: Handle username not in the game
      // TODO: Handle invalid moves
      
      board.makeMove(row, col, users[username].token);
      usernames = Object.keys(users);
      nextTurn = usernames[0] === username ? usernames[1] : usernames[0];

      // TODO: Check if the game is over
    },

    nextTurn: () => {
      return nextTurn;
    },

    isOver: () => {
      console.log("gameIsOver = " + gameIsOver);
      return gameIsOver;
    },

    getBoard: () => {
      return board.toString();
    }
  }

  // private functions
}

module.exports = startGame;
