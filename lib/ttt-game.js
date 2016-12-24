'use strict'

function startGame() {
  let board = require('./ttt-board.js')();
  let errorMessages = require('./error-messages.js');
  let users = { };
  let gameIsOver = true;
  let nextTurnUsername;

  /** 
   * Simple interface that handles input from a Slack user that is playing
   * tictactoe. There are two possible states in the game: the game is over or
   * a game is currently being played. This function handles both states given
   * a text and a username. Note that this interface only works for a single
   * channel.
   */
  return {
    /**
     * Given a username and text, it plays a turn of the current tictactoe
     * game. 
     * 
     * @param text -- the text entered by the user
     * @param username -- the username of the user who called the command
     *
     * @returns an object to be sent directly to Slack's API. This object includes
     * the response type and the response text.
     */
    handleUserInput: (text, username) => {

      let responseText = validateInput(text, username);
      let responseType = 'ephemeral';

      if(!responseText) {
        if(gameIsOver) {
          let otherUsername = text.split("@")[1];
          newGame(username, otherUsername);
          responseText = newGameText(username, otherUsername);
          responseType = 'in_channel';
        }
        else if(text) {
          let move = text.substring(1, text.length - 1).split(",");
          userMove(username, parseInt(move[0]), parseInt(move[1]));
          responseText = userMoveText(username);
          responseType = 'in_channel';
        }
        else {
          responseText = "Waiting for " + nextTurnUsername + " to play. " + 
                         "Here's the current state of the board: "; 
        }

        responseText += "```" + board.toString() + "```";
      }

      return {
        response_type: responseType,
        text: responseText
      }
    },
    
    // Method for testing
    getBoard: () => { 
      return board.getRawBoard(); 
    }
  }


  /**
   * Validates that the text and username are valid in format and also valid
   * on the state of the game. That is, it makes sure that a move is valid and
   * that the user making the move is correct user.
   * 
   * @param text -- the text entered by the user
   * @param username -- the username of the user who called the command
   *
   * @returns undefined if no errors occured, otherwise it returns a message
   * corresponding to the error.
   */
  function validateInput(text, username) {
    if(gameIsOver) {
      if(!text || !text.startsWith("@")) return errorMessages.noUsername;
    }
    else {
      if(text.length > 0) {
        if(text[0] != "(" || text[text.length - 1] != ")")
          return errorMessages.coordinatesFormat;
        
        let move = text.substring(1, text.length - 1).split(",");
        if(move.length != 2 || isNaN(move[0]) || isNaN(move[1]))
          return errorMessages.coordinatesNaN;

        if(!board.isValidMove(parseInt(move[0]), parseInt(move[1]))) 
          return errorMessages.notValidMove;

        if(username != nextTurnUsername)
          return errorMessages.notYourTurn;
      }
    }
  }

  /**
   * It restarts the current state of game and assigns new users to the 
   * new game.
   * 
   * @param username1 -- user that will start in the game
   * @param username2 -- opponent of @username1
   *
   */
  function newGame(username1, username2) {
    board.restart();
    users[username1] = { "token": "X" };
    users[username2] = { "token": "O" };
    nextTurnUsername = username1;
    gameIsOver = false;
  }

  /**
   * Returns a message describing the start of a new game.
   */
  function newGameText(username1, username2) {
    return "Starting a new game! @" + username1 + " is playing against" +
      " @" + username2 + ". Stay tuned! @" + username1 + " is your turn.";
  }

  /**
   * Returns true if a user move is valid and false otherwise.
   */
  function validUserMove(username, row, col) {
    return username === nextTurnUsername && board.isValidMove(row, col);
  }

  /**
   * Performs a user move. The precondition is that the move must have been
   * validates before calling this function. It also potentially changes the 
   * state of the game is there's a winner or if there's a tie.
   * 
   * @param username -- user making the move
   * @param row -- row of the move
   * @param col -- column of the move
   */
  function userMove(username, row, col) {
    board.makeMove(row, col, users[username].token);
    let usernames = Object.keys(users);
    nextTurnUsername = usernames[0] === username ? usernames[1] : usernames[0];
    gameIsOver = board.hasLine(users[username].token) || board.isFull();
  }

  /**
   * Returns a message to be displayed when a user makes a move.
   */
  function userMoveText(username) {
    if(gameIsOver && board.hasLine(users[username].token)) {
      return "We have a winner! Congratulations @" + username + ".";
    }
    else if(gameIsOver && board.isFull()) {
      return "We have a tie! Great game, you should play again.";
    }

    return "Nice move. Now it's @" + nextTurnUsername + " turn!";
  }
}

module.exports = startGame;
