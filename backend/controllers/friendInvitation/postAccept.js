const FriendInvitation = require('../../models/friendInvitation');
const User = require('../../models/user');
const friendsUpdate = require('../../socketHandlers/updates/friends');

const postAccept = async (req, res) => {
    try{
        const {id} = req.body;
        const invitation = await FriendInvitation.findById(id);
        if(!invitation){
            return res.status(401).send('Error occured');
        }

        const {senderId,receiverId} = invitation;

        // add friend to both user

        const senderUser = await User.findById(senderId);
        // append to concurrent array data
        senderUser.friends = [...senderUser.friends,receiverId];

        const receiverUser = await User.findById(receiverId);
        receiverUser.friends = [...receiverUser.friends,senderId];

        await senderUser.save();
        await receiverUser.save();

        // delete invitation after adding friends

        await FriendInvitation.findByIdAndDelete(id);

        // update list of the friends if users are online
        friendsUpdate.updateFriends(senderId.toString());
        friendsUpdate.updateFriends(receiverId.toHexString());

        // update list of friends pending invitation

        friendsUpdate.updateFriendsPendingInvitations(receiverId.toString());

        return res.status(200).send('Friend successfully added');

    }catch(err){
        console.log(err);
        return res.status(500).send('Something went wrong');
    }
};


module.exports = postAccept;