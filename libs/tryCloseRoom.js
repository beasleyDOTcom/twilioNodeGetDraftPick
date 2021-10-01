async function tryCloseRoom(room, host, rooms) {
    async function shuffle() {
        const getIndex = () => Math.floor(Math.random() * house[room].length);
        const swap = async (arr, a, b) => {
            let temp = arr[a];
            arr[a] = arr[b];
            arr[b] = temp;
            return arr;
        }
        for (let i = 0; i < house[room].length; i++) {
            await swap(house[room], i, getIndex());
            await swap(house[room], i, getIndex());
        }

    }
    // validate request
    if (rooms[room].host === host) {
        await shuffle();
        return 6;
    } else {
        return 5;
    }
}

module.exports = tryCloseRoom