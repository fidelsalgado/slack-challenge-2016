function startGame() {
  //private data
  let board = require('./ttt-board.js')();
  let errorMessages = require('./error-messages.js');
  let users = { };
  let gameIsOver = true;
  let nextTurnUsername;

  // Simple interface that handles the input from a Slack user
  return {
    handleUserInput: (text, username) => {
      // TODO: Handle multiple channels
      // TODO: Restart command?

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


  // Private helper functions
  let responseText = validateInput(text, username);
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

  function newGame(username1, username2) {
    board.restart();
    users[username1] = { "token": "X" };
    users[username2] = { "token": "O" };
    nextTurnUsername = username1;
    gameIsOver = false;
  }

  function newGameText(username1, username2) {
    return "Starting a new game! @" + username1 + " is playing against" +
      " @" + username2 + ". Stay tuned! @" + username1 + " is your turn.";
  }

  function validUserMove(username, row, col) {
    return username === nextTurnUsername && board.isValidMove(row, col);
  }

  function userMove(username, row, col) {
    board.makeMove(row, col, users[username].token);
    usernames = Object.keys(users);
    nextTurnUsername = usernames[0] === username ? usernames[1] : usernames[0];
    gameIsOver = board.hasLine(users[username].token);
  }

  function userMoveText(username) {
    return gameIsOver ? "We have a winner! @" + username + "." : 
                        "Nice move. Now it's @" + nextTurnUsername + " turn!";
  }
}

module.exports = startGame;
