const io = require('socket.io');
const userData = require('../data/user');
let _realtimeServer = undefined;
let realtimeServer = function (httpServer) {
    if (!_realtimeServer && httpServer) {

        _realtimeServer = io(httpServer);
        // REAL TIME SERVER EMITS AND LISTENERS HERE -------------------------------------------------------------
        _realtimeServer.on('connect', function (socket) {
            // A client has connected to the realtime server.

            socket.on('want-users-list', async function () {
                console.log('User List Requested from Server');
                // This client is asking for users list data. Ok.
                const usersList = await userData.getUserList();
                socket.emit('users-list', usersList);
            });

            // // Listen for users array replacement from server.
            // socket.on('users-list', function (usersArray) {
            //     var listElement = document.getElementById('usersList');
            //     // For each user in Users array...
            //     usersArray.forEach((user) => {
            //         const newElement = document.createElement('li');
            //         newElement.textContent = user.username;
            //         listElement.appendChild(newElement);
            //     });
            // });
        });
    }
    return _realtimeServer;
};
module.exports = realtimeServer;