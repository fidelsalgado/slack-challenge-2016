'use strict'; 
const SLACK_TOKEN = 'rFfHJmoHxZSaPi302yac7yOM';
const express = require('express'); 
const bodyParser = require('body-parser'); 
const app = express(); 

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.set('port', (process.env.PORT || 5000));

app.post('/', (req, res) => { 
  let move = req.body.text; 

  // TODO: do some user input validation 
 
  console.log(move);

  res.json({
    response_type: 'in_channel',
    text: move
  });
});

app.all('/', (req, res) => { 
  res.status(404).send('Not found');
});

const server = app.listen(app.get('port'), () => { 
  console.log('Express server   listening on port %d in %s mode', server.address().port,   
  app.settings.env);
});
