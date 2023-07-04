const serverStore = require('../serverStore');
const friendsUpdates = require('../socketHandlers/updates/friends');
const roomsUpdate = require('./updates/rooms');

const newConnectionHandler = async(socket,io) =>{
    const userDetails = socket.user;

    serverStore.addNewConnectedUser({
        socketId: socket.id,
        userId:userDetails.userId,
    });

    // update pending invitation list

    friendsUpdates.updateFriendsPendingInvitations(userDetails.userId);

    // update friend list
    friendsUpdates.updateFriends(userDetails.userId);

    setTimeout(() => {
        roomsUpdate.updateRooms(socket.id);
    },[500]);

};

module.exports = newConnectionHandler;