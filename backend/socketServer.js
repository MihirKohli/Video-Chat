const authSocket = require('./middleware/authSocket');
const newConnectionHandler = require('./socketHandlers/newConnectionHandler');
const disconnectHandler = require('./socketHandlers/disconnectHandler');
const serverStore = require('./serverStore');
const directMessageHandler = require('./socketHandlers/directMessageHandler');
const directChatHistoryHandler = require('./socketHandlers/directChatHistoryHandler');
const roomCreateHandler = require('./socketHandlers/roomCreateHandler');
const roomJoinHandler = require('./socketHandlers/roomJoinHandler');
const roomLeaveHandler = require('./socketHandlers/roomLeaveHandler');
const roomInitializerConnectionHandler = require('./socketHandlers/roomInitializerConnectionHandler');
const roomSignalingDataHandler = require('./socketHandlers/roomSignalingDataHandler');

const registerSocketServer = (server) => {
    const io = require('socket.io')(server,{
        cors:{
            origin:'*',
            method:['GET','POST']
        },
    });


    // setting instance of socket server which is passed to friends.js
    serverStore.setSocketServerInstance(io);

    io.use((socket,next)=>{
        authSocket(socket,next);
    });


    const emitOnlineUsers = () => {
        const onlineUsers = serverStore.getOnlineUsers();
        io.emit('online-users',{onlineUsers});
    };


    io.on('connection',(socket)=>{
        console.log('Connected user socket id');
        console.log(socket.id);

        newConnectionHandler(socket,io);
        emitOnlineUsers();


        socket.on('direct-message',(data)=>{
            directMessageHandler(socket,data);
        });



        socket.on('direct-chat-history',(data) => {
            directChatHistoryHandler(socket,data);
        });


        socket.on('room-create',() => {
            roomCreateHandler(socket);
        });

        socket.on('room-join',(data) => {
            roomJoinHandler(socket,data);
        });

        socket.on('disconnect',()=>{
            disconnectHandler(socket);
        });

        socket.on('room-leave',(data) => {
            roomLeaveHandler(socket,data);
        });

        socket.on('conn-init',(data) =>{
            roomInitializerConnectionHandler(socket,data);
        });

        socket.on('conn-signal',(data)=>{
            roomSignalingDataHandler(socket,data);
        });


    });



    // emit function at every 8 seconds
    setInterval(()=>{
        emitOnlineUsers();
    },[8000]);


};

module.exports = {
    registerSocketServer,
};