'use strict'; 
const express = require('express'); 
const bodyParser = require('body-parser'); 
const app = express(); 

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.set('port', (process.env.PORT || 5000));

app.post('/', (req, res) => { 
  let text = req.body.text; 
  console.log(text);
  res.json({'cool': 'dope'});
      // implement your bot here ... 
});

app.all('/', (req, res) => { 
  res.status(404).send('Not found');
});

const server = app.listen(app.get('port'), () => { 
  console.log('Express server   listening on port %d in %s mode', server.address().port,   
  app.settings.env);
});
