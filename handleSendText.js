const accountSid = process.env.SID;
const authToken = process.env.authToken;

const client = require('twilio')(accountSid, authToken);

function handleSendText(number, phoneNumber) {
    client.messages.create({
        to: phoneNumber,
        from: process.env.twilioNumber,
        body: number.toString(),
    })
        .then(
            (message) => {
                console.log('promise resolved');
                console.log(message.sid)
            }
        ).catch( error => {
            console.error("Congratulations! You've met an error: ", error)
        })
}

module.exports = handleSendText