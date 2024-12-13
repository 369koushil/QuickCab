const socketIo = require('socket.io');
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');

let io;

function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: '*',
            methods: [ 'GET', 'POST' ]
        }
    });

    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);


        socket.on('join', async (data) => {
            const { userId, userType } = data;
           console.log(userId)
            if (userType === 'user') {
                const user=await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
                console.log(user)
                console.log("updated user socketid")
            } else if (userType === 'captain') {
                const c=await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
                console.log(c)
            }
        });



        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
        
      
    });
}

const sendMessageToSocketId = (socketId, messageObject) => {
        
    console.log(messageObject);
    
        if (io) {
            io.to(socketId).emit(messageObject.event, messageObject.data);
        } else {
            console.log('Socket.io not initialized.');
        }
    }


    module.exports = { initializeSocket, sendMessageToSocketId };