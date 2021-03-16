const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const Game = require('./Game');

const app = express();

const game = new Game();



app.use('/', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/call', (req, res) => {
  const twiml = new VoiceResponse();
  twiml.say('Please wait while we dial you into the call.');
  twiml.dial().conference('my-conference-room');

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

app.post('/message', (req, res) => {
  // console.log(req, res);

  const twiml = new MessagingResponse();
  console.log(req.body.Body);


  if(!game.started){
    game.init();
    twiml.message(`Let's play a game.  I'll send you an emoji riddle and you guess what it is.  the answer will be two words.  Here's the first: ${game.glyph}`);
  } else {
    twiml.message(game.checkAnswer(req.body.Body));
  }

  
  res.writeHead(200, {'Content-Type' : 'text/xml'});
  res.end(twiml.toString());

})

http.createServer(app).listen(3000, () => {
  console.log('Express server listening on port 3000');
});