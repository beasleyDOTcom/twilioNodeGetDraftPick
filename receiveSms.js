const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const PORT = process.env.PORT || 3003;

const tryParticipant = require('./libs/tryParticipant');
const tryHost = require('./libs/tryHost');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));


let house = {};
let rooms = {};

app.post('/sms', async (req, res) => {

    const twiml = new MessagingResponse();

    let room = '';
    let index = 0;
    let message = req.body.Body.trim();
    while (index < message.length && message[index] !== ':') {
        room += message[index];
        index++;
    }
    console.log('this is line36. ' + 'this is message: ' + message + ' and index: ' + index);
    if (message[index] === ':') {
        let response = await tryHost(room, index + 1, message, req.body.From, house, rooms);
        switch (response) {
            case 0:
                twiml.message('Bad request. You must include a valid command. Example1 -> roomba:open  Example2 -> roomba:close');
                break;
            case 1:
                twiml.message('Room has been opened. Whenever everyone has received a confirmation text that they are in the room you may close the room to send everyone their number in the form of room:close');
                break;
            case 2:
                twiml.message('Please include your command with request example: room1:open');
                break;
            case 3:
                twiml.message('Bad request. You must include a password to open a room. example: "room11:open"');
                break;
            case 4:
                twiml.message('Wront password for this room. Please enter the password you used to open the room to close it in the form of: room:close');
                break;
            case 5:
                twiml.message('Only the host can open or close a room. Please use the phone the room was opened with to close it.');
                break;
            case 6:
                // shuffle array of phone numbers, then text each of them their index+1, then delete room from house.

                for (let i = 0; i < house[room].length; i++) {
                    handleSendText(i + 1, house[room][i]);
                };
                twiml.message('Working on sending everyone their random numbers.');
                break;
            case 7:
                twiml.message('Oops.. this room is taken! Please use a different name.')

            default: console.log('ended up in the default case', response)


        }
    }
    else {
        let response = tryParticipant(room);
        if (response) {
            house[room].push(req.body.From);
            twiml.message('You have been added. Please wait for host to "close the room" (at which time you will receive your random number');
        }
        else {
            twiml.message('There is not a room with this name: ' + req.body.Body + '. Please ensure you entered the room name correctly.');
        }
    }

    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(
        twiml.toString()
    );
})

http.createServer(app).listen(PORT, () => {
    console.log('Expressive server Glistening on port:', PORT)
});