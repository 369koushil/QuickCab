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
        //    console.log(userId)
            if (userType === 'user') {
                const user=await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
                // console.log(user)
                console.log("updated user socketid")
            } else if (userType === 'captain') {
                const c=await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
                // console.log(c)
            }
        });


         socket.on('update-location-captain',async(data)=>{
            const {userId,location}=data;
        //   console.log(userId)
        //   console.log(location.ltd)
        //   console.log(location.lng)
            if(!location||!location.ltd||!location.lng){
                console.log("error")
                return socket.emit('error',{msg:'invalid location'})
            }
               else{
               const newcaptain= await captainModel.findByIdAndUpdate(userId,{location:{
                    ltd:location.ltd,
                    lng:location.lng
                }})
                // console.log(newcaptain)
                // console.log('updated location')
               }
            
         })
        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
        
      
    });
}

const sendMessageToSocketId = (socketId, messageObject) => {
        
        //  console.log(socketId,messageObject)
    
        if (io) {
            io.to(socketId).emit(messageObject.event, messageObject.data);
        } else {
            console.log('Socket.io not initialized.');
        }
    }


    module.exports = { initializeSocket, sendMessageToSocketId };