'use strict';

var assert = require('chai').assert;
var game = require('../lib/ttt-game.js')();
var errorMessages = require('../lib/error-messages.js');

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
      let response = game.handleUserInput('(1,2)', 'otherUser');
      let board = game.getBoard();
      assert.equal(board[0][2], 'X');
      assert.equal(board[1][2], 'O');
    });

    it('correctly detects a game is over', () => {
      game.handleUserInput('(1,1)', 'myUser');
      game.handleUserInput('(2,2)', 'otherUser');
      let response = game.handleUserInput('(2,0)', 'myUser');
      assert(response.text.startsWith('We have a winner! Congratulations @myUser.'));
    });

    it('no username for new game', () => {
      let response = game.handleUserInput('', 'myUser');
      assert.equal(response.text, errorMessages.noUsername);
    });

    it('bad coordinates format', () => {
      let response;
      response = game.handleUserInput('@otherUser', 'myUser');

      let coords = ['0,2', '(0,2', '0,2)'];
      for(let c of coords) {
        response = game.handleUserInput(c, 'myUser');
        assert.equal(response.text, errorMessages.coordinatesFormat);
      }
    });

    it('coordinates not a number', () => {
      let coords = ['(x,2)', '(y,4)', '(z,y)'];
      for (let c of coords) 
        assert.equal(game.handleUserInput(c, 'myUser').text, 
                     errorMessages.coordinatesNaN);
    });

    it('coordinates not a valid move', () => {
      let coords = ['(-1,0)', '(3,0)', '(0,3)', '(3,3)'];
      for (let c of coords)
        assert.equal(game.handleUserInput(c, 'myUser').text,
                     errorMessages.notValidMove);
    });

    it('not your turn', () => {
      assert.equal(game.handleUserInput('(0,0)', 'otherUser').text,
                   errorMessages.notYourTurn);
    });

  });
});
