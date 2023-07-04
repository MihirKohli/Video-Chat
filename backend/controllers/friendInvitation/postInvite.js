const User = require('../../models/user');
const FriendInvitation = require('../../models/friendInvitation');
const friendsUpdates = require('../../socketHandlers/updates/friends');

const postInvite = async (req, res) => {
    const { targetMailAddress } = req.body;

    const { userId, mail } = req.user;

    // check if friend that we would like to invite is not a user
    
    if (mail.toLowerCase() === targetMailAddress.toLowerCase()) {
        return res.status(409).send('You cant send to yourself');
    }

    const targetUser = await User.findOne({
        mail: targetMailAddress.toLowerCase()
    });

    if (!targetUser) {
        return res.status(404).send(`${targetMailAddress} has not been found`);
    };

    // check if invitation has been already sent
    
    const invitationAlreadyReceived = await FriendInvitation.findOne({
        senderId: userId,
        receiverId: targetUser._id,
    });


    if (invitationAlreadyReceived) {
        return res.status(409).send('Invitation has been already sent');
    }
     

    // Check if user which we would like to invite is already out friend

    const usersAlreadyFriends = targetUser.friends.find((friendId) =>
        friendId.toString() === userId.toString()
    );

    if (usersAlreadyFriends) {
        return res.status(409).send('Friend already added');
    }

    // store new invitation in db
    
    const newInvitation = await FriendInvitation.create({
        senderId:userId,
        receiverId: targetUser._id
    });

    // if invitation has been successfully sent

    // send pending invitation update to specific user

    friendsUpdates.updateFriendsPendingInvitations(targetUser._id.toString());

    return res.status(201).send('Invitation has been sent');
};

module.exports = postInvite;