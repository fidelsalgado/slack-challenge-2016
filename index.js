'use strict'; 
const SLACK_TOKEN = 'rFfHJmoHxZSaPi302yac7yOM';
const tttGame = require('./lib/ttt-game.js')();
const slackInputParser = require('./lib/slack-input-parser');

const express = require('express'); 
const bodyParser = require('body-parser'); 
const app = express(); 

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.set('port', (process.env.PORT || 5000));

app.post('/', (req, res) => { 
  let userInput = req.body.text; 
  let username = req.body.user_name;
  let responseText;

  // TODO: do some user input validation 

  if(tttGame.isOver()) {
    console.log("Entering a new game");
    let otherUsername = userInput.split("@")[1];
    tttGame.newGame(username, otherUsername);
    responseText = "Starting a new game! @" + username + " is playing against" +
                   " @" + otherUsername + ". Stay tuned!";
  }
  else {
    console.log("Making a move");
    if(userInput) {
      let move = userInput.substring(1, userInput.length - 1).split(",");
      tttGame.userMove(username, parseInt(move[0]), parseInt(move[1]));
      responseText = "Nice move. Now it's @" + tttGame.nextTurn() + " turn!";
    }
  }

  responseText += "\n\n```" + tttGame.getBoard() + "```";

  res.json({
    response_type: 'in_channel',
    text: responseText 
  });

  /*
   * Requirements:
   * Users can create a new game in any Slack channel by challenging another user (using their @username).
   * A channel can have at most one game being played at a time.
   * Anyone in the channel can run a command to display the current board and list whose turn it is.
   * Users can specify their next move, which also publicly displays the board in the channel after the move with a reminder of whose turn it is.
   * Only the user whose turn it is can make the next move.
   * When a turn is taken that ends the game, the response indicates this along with who won.
   */

  
});

app.all('/', (req, res) => { 
  // TODO: Do a more graceful handling
  res.status(404).send('Not found');
});

const server = app.listen(app.get('port'), () => { 
  console.log('Server listening on port %d in %s mode', server.address().port,   
  app.settings.env);
});
