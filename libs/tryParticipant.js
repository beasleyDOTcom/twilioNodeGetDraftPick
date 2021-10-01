function tryParticipant(room) {
    if (house[room] !== undefined) {
        return true
    } else {
        return false;
    }
}

module.exports = tryParticipant;