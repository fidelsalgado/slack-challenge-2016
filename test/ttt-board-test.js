var assert = require('chai').assert;
var board = require('../lib/ttt-board.js')();

describe('Board', () => {
  describe('#isValidMove()', () => {
    it('correctly handles out of bounds input', () => {
      let validMoves = [[0, 0], [2, 2], [1, 2]];
      let invalidMoves = [[-1, -1], [4, 0], [0, 4]];
      for(m of validMoves) assert.isTrue(board.isValidMove(m[0], m[1]));
      for(m of invalidMoves) assert.isFalse(board.isValidMove(m[0], m[1]));
    });

    //TODO: correctly handles populated cell
  });

  describe('#makeMove()', () => {
    //TODO
  });

  describe('#gameIsOver()', () => {
    //TODO
  });

  describe('#restart()', () => {
    //TODO
  });
});
