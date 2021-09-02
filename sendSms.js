require('dotenv').config();
const accountSid = process.env.SID;
const authToken = process.env.authToken;

const client = require('twilio')(accountSid, authToken);

client.messages.create({
    to: process.env.myPhoneNumber,
    from: process.env.twilioNumber,
    body:'woo hooo you did it!',
})
.then(
    (message) => {
        console.log('promise resolved');
        console.log(message.sid)
    }
);