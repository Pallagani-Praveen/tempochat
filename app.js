const express = require('express');
const app = express();
const socket = require('socket.io');


app.set('view engine','ejs');
app.use('/styles',express.static('styles'));
app.use('/js_files',express.static('js_files'));

const server = app.listen(3000,()=>{
    console.log('server running on port : 3000');
});

app.get('/',(req,res)=>{
    res.render('index');
});



// sockets related code goes here

const io = socket(server);
    
io.on('connection',(socket)=>{

    socket.on('set_room',(data)=>{
        socket.join(data.roomID);
        socket.roomID = data.roomID;
        socket.userName = data.userName;
        let room = io.to(socket.roomID).sockets;
        io.to(socket.roomID).emit('user_count', Object.keys(room).length);

        socket.on('disconnect',()=>{
            let room = io.to(socket.roomID).sockets;
            io.to(socket.roomID).emit('user_count', Object.keys(room).length);
        });
    
        socket.on('message',(msg)=>{
            io.to(socket.roomID).emit('message',{msg,'userName':socket.userName});
        });

        socket.on('typing',(data)=>{
            socket.broadcast.to(socket.roomID).emit('typing',socket.userName+data);
        });
    });
});






