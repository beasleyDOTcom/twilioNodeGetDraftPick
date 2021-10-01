function tryParticipant(room, house) {
    if (house[room] !== undefined) {
        return true
    } else {
        return false;
    }
}

module.exports = tryParticipant;