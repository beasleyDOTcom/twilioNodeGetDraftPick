const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const PORT = process.env.PORT || 3003;

const app = express();

app.post('/sms', (req, res) => {
    const twiml = new MessagingResponse();

    twiml.message('this is req.body: '+ req.body);

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(
        twiml.toString()
    );
});

http.createServer(app).listen(1337, () => {
    console.log('Expressive server Glistening on port:', PORT)
});