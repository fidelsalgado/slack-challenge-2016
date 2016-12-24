var assert = require('chai').assert;
var game = require('../lib/ttt-game.js')();

describe('TicTacToe Game', () => {
  describe('#handleUserInput()', () => {
    let rows = 3;
    let cols = 3;

    it('correctly initializes an empty board', () => {
      game.handleUserInput('@otherUser', 'myUser');
      let board = game.getBoard();
      for(let i = 0; i < rows; i++) {
        for(let j = 0; j < cols; j++) {
          assert.equal(board[i][j], '-');
        }
      }
    });

    it('correctly performs a user move', () => {
      game.handleUserInput('(0,2)', 'myUser');
      game.handleUserInput('(1,2)', 'otherUser');
      let board = game.getBoard();
      assert.equal(board[0][2], 'X');
      assert.equal(board[1][2], 'O');
    });

    it('correctly detects a game is over', () => {
      game.handleUserInput('(1,1)', 'myUser');
      game.handleUserInput('(2,2)', 'otherUser');
      let response = game.handleUserInput('(2, 0)', 'myUser');
      assert(response.text.startsWith('We have a winner! @myUser.'));
    });
  });
});
