const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const PORT = process.env.PORT || 3003;

const app = express();
app.use(bodyParser.urlencoded({extended:false}));


let house = {};
let rooms = {};
/*
*************************
You should get rid of the password requirement and just use the hosts phone number --> the security of their phone is all that's needed (password would be visible in texts anyways)

*/
async function tryCloseRoom(room, password, host){
    async function shuffle(){
        // the shuffle in place by calling swap on every index of this.cards arr with a random index 
                const getIndex = () => Math.floor(Math.random()*house[room].length);
                const swap = async (arr, a, b) => {
                    let temp = arr[a];
                    arr[a] = arr[b];
                    arr[b] = temp;
                    return arr;
                }
                for(let i = 0; i < house[room].length; i++){
                    await swap(house[room], i, getIndex());
                    await swap(house[room], i, getIndex());
                }
    }
// validate request
    if(rooms[room].password === password){
        if(rooms[room].host === host){
            await shuffle();
            return 6;
        } else{
            return 5;
        }
    } else {
        return 4;
    }
    

}

async function tryHost(room, index, message) {
    if (house[room] === undefined) {
        // this is a new room. Are other requirements met? password and command
        let password = '';
        while (index < message.length && message[index] !== ':') {
            password += message[index];
            index++;
        }
        if (password.length > 0 && message[index] === ':') {
            // we can continue
            let command = '';
            while (index < message.length && message[index] !== ':') {
                command += message[index];
                index++;
            }
            // inspect command
            if (command === 'open' || command === 'close') {
                // command is good
                if (command === 'open'){

                    rooms[room]['password'] = password;
                    rooms[room]['host'] = req.body.From;
                    house[room] = [];
                    return 1;
                }
                if (command === 'close') {
                    // shuffle array of phone numbers, then text each of them their index+1, then delete room from house.
                    return await tryCloseRoom(room, password, req.body.From);
                }
            } else {
                return 0;
            }
        }
        else {
            // bad request
            if (message[index] !== ':') {
                return 2;
            }
            else if (password.length < 1) {
                return 3;
            }
        }
    }
}
function tryParticipant(room){
    if(house[room]!== undefined){
        return true
    } else {
        return false;
    }
}
app.post('/sms', async (req, res) => {

    const twiml = new MessagingResponse();

    let room = '';
    let index = 0;
    let message = req.body.Body;
    while (index < message.length && message[index] !== ':') {
        room += message[index];
        index++;
    }
    console.log('this is line109. ' + 'this is message: '+message +' and index: ' + index);
    if (req.body[index] === ':') {
        let response = await tryHost(room, index, message);
        switch(response){
            case 0:
                twiml.message('Bad request. You must include a valid command. Example1 -> roomba:vacuum:open  Example2 -> roomba:vacuum:close');
                break;
            case 1:
                twiml.message('Room has been opened. Whenever everyone has received a confirmation text that they are in the room you may close the room to send everyone their number in the form of room:password:close');
                break;
            case 2:
                twiml.message('Please include your command with request example: room1:password1:open');
                break;
            case 3:
                twiml.message('Bad request. You must include a password to open a room. example: "room11:bestPasswordEver:open"');
                break;
            case 4:
                twiml.message('Wront password for this room. Please enter the password you used to open the room to close it in the form of: room:passwordYouChose:close');
                break;
            case 5:
                twiml.message('Only the host can open or close a room. Please use the phone the room was opened with to close it.');
                break;
            case 6:
 // shuffle array of phone numbers, then text each of them their index+1, then delete room from house.

                console.log('this is the room: ', house[room])                
                twiml.message('Working on sending everyone their random numbers.');
                break;


        }
    }
    else {
        let response = tryParticipant(room);
        if(response){
            house[room].push(req.body.From);
            twiml.message('You have been added. Please wait for host to "close the room" (at which time you will receive your random number');
        } 
        else {
            twiml.message('There is not a room with this name: '+ req.body.Body + '. Please ensure you entered the room name correctly.');
        }
    }

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(
        twiml.toString()
    );
});

http.createServer(app).listen(PORT, () => {
    console.log('Expressive server Glistening on port:', PORT)
});