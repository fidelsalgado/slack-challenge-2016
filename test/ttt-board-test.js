'use strict';

var assert = require('chai').assert;
var board = require('../lib/ttt-board.js')();

describe('Board', () => {
  describe('#isValidMove()', () => {
    it('correctly handles out of bounds input', () => {
      let validMoves = [[0, 0], [2, 2], [1, 2]];
      let invalidMoves = [[-1, -1], [4, 0], [0, 4]];
      for(let m of validMoves) assert.isTrue(board.isValidMove(m[0], m[1]));
      for(let m of invalidMoves) assert.isFalse(board.isValidMove(m[0], m[1]));
    });

  });

  describe('#makeMove()', () => {
    it('correctly updates the board', () => {
      board.makeMove(0, 0, "X");
      board.makeMove(1, 2, "O");
      let rawBoard = board.getRawBoard();
      assert.equal(rawBoard[0][0], "X");
      assert.equal(rawBoard[1][2], "O");
    });
  });

  describe('#hasLine()', () => {
    it('correctly detects a win', () => {
      board.makeMove(0, 1, "X");
      board.makeMove(0, 2, "X");
      assert.isTrue(board.hasLine("X"));
    });
  });

  describe('#isFull()', () => {
    it('correctly detectes board is full', () => {
      board.makeMove(1, 0, "O");
      board.makeMove(1, 1, "O");
      board.makeMove(2, 0, "X");
      board.makeMove(2, 1, "X");
      board.makeMove(2, 2, "X");
      assert.isTrue(board.isFull());
    });
  });
});
