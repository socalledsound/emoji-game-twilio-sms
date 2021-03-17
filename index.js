const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const PlayerManager = require('./game/PlayerManager');
const playerManager = new PlayerManager();
const app = express();
app.use('/', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));

// app.post('/call', (req, res) => {
//   const twiml = new VoiceResponse();
//   twiml.say('Please wait while we dial you into the call.');
//   twiml.dial().conference('my-conference-room');

//   res.writeHead(200, {'Content-Type': 'text/xml'});
//   res.end(twiml.toString());
// });

app.post('/message', (req, res) => {
  // console.log(req, res);
  const playerId = req.body.From;
  const incomingMessage = req.body.Body;
  const twiml = new MessagingResponse();
  twiml.message(playerManager.respond(req.body.From, req.body.Body));
  res.writeHead(200, {'Content-Type' : 'text/xml'});
  res.end(twiml.toString());

})

http.createServer(app).listen(3000, () => {
  console.log('Express server listening on port 3000');
});