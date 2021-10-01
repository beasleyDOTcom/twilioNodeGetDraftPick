const tryCloseRoom = require('./tryCloseRoom');

async function tryHost(room, index, message, host, house, rooms) {

    // we can continue
    let command = '';
    while (index < message.length) {

        // using toLowerCase in order to help prevent incedental errors from the phone's auto correct. 
        command += message[index].toLowerCase();
        index++;
    }
    console.log('this is command ', command)
    // inspect command
    if (command === 'open' || command === 'close') {
        // command is good
        if (command === 'open') {
            if (house[room] === undefined) {
                rooms[room] = { host };
                house[room] = [];
                return 1;
            } else {
                return 7;
            }
        }
        else if (command === 'close') {
            // shuffle array of phone numbers, then text each of them their index+1, then delete room from house.
            return await tryCloseRoom(room, host);
        }
    } else {
        return 0;
    }

}

module.exports = tryHost;