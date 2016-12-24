'use strict'; 
const SLACK_TOKEN = 'rFfHJmoHxZSaPi302yac7yOM';
const TEAM_ID = 'T3F7VCUQ1';
const tttGame = require('./lib/ttt-game.js');
let gamesOn = {};

const express = require('express'); 
const bodyParser = require('body-parser'); 
const app = express(); 

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.set('port', (process.env.PORT || 5000));

/**
 * Endpoint that handles POST request from slack. It makes sure that the request
 * has a valid format, and it keeps track of a game per channel.
 */
app.post('/', (req, res) => { 
  let token = req.body.token;
  let team = req.body.team_id;
  if(token !== SLACK_TOKEN || team !== TEAM_ID) {
    return res.status(403).send();
  }

  let text = req.body.text;
  let username = req.body.user_name;
  let channel = req.body.channel_id;
  if(!username || !channel) {
    return res.status(400).send();
  }

  if(!(channel in gamesOn)) {
    gamesOn[channel] = tttGame();
  }

  res.json(gamesOn[channel].handleUserInput(text, username));
});

/**
 * Any other request will not be found.
 */
app.all('/', (req, res) => { 
  res.status(404).send('Not found');
});

const server = app.listen(app.get('port'), () => { 
  console.log('Server listening on port %d in %s mode', server.address().port,   
  app.settings.env);
});
