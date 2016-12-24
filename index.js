'use strict'; 
const SLACK_TOKEN = 'rFfHJmoHxZSaPi302yac7yOM';
const tttGame = require('./lib/ttt-game.js');
const slackInputParser = require('./lib/slack-input-parser');
let gamesOn = {};

const express = require('express'); 
const bodyParser = require('body-parser'); 
const app = express(); 

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.set('port', (process.env.PORT || 5000));

app.post('/', (req, res) => { 
  // TODO: Check that token and team is valid
  // TODO: Check if body is valid

  let text = req.body.text;
  let username = req.body.user_name;
  let channel = req.body.channel_id;

  if(!(channel in gamesOn)) {
    gamesOn[channel] = tttGame();
  }

  res.json(gamesOn[channel].handleUserInput(text, username));
});

app.all('/', (req, res) => { 
  // TODO: Better handling
  res.status(404).send('Not found');
});

const server = app.listen(app.get('port'), () => { 
  console.log('Server listening on port %d in %s mode', server.address().port,   
  app.settings.env);
});
