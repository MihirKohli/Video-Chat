const Message = require('../models/message');
const Conversation = require('../models/conversation');
const chatUpdates = require('./updates/chat');


const directMessageHandler = async (socket, data) => {
    try {

        const { userId } = socket.user;
        const { receiverUserId, content } = data;

        const message = await Message.create({
            content: content,
            author: userId,
            date: new Date(),
            type: 'DIRECT',
        });

        // find if conversation exist with this two user

        const conversation = await Conversation.findOne({
            // all will allow to find array of data $ all
            participants: { $all: [userId, receiverUserId] },
        });


        if (conversation) {
            conversation.messages.push(message._id);
            await conversation.save();
             

            // perform and update to sender and receiver if online
            chatUpdates.updateChatHistory(conversation._id.toString());

        } else {
            // create new conversation if not exist

            const newConversation = await Conversation.create({
                messages: [message._id],
                participants: [userId, receiverUserId],
            });

            chatUpdates.updateChatHistory(newConversation._id.toString());
        }


    } catch (err) {
        console.log(err);
    }
};

module.exports = directMessageHandler;