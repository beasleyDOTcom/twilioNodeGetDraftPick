const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const PORT = process.env.PORT || 3003;

const app = express();
app.use(bodyParser.urlencoded({extended:false}));

app.post('/sms', (req, res) => {
    const twiml = new MessagingResponse();

    twiml.message('this is req.body.Body: '+ req.body.Body);

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(
        twiml.toString()
    );
});
console.log('this is line 18 and PORT before starting server', PORT);

http.createServer(app).listen(PORT, () => {
    console.log('Expressive server Glistening on port:', PORT)
});