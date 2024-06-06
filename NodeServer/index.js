const io = require('socket.io')(8000)
const user = {};


io.on('connection',socket=>{
    socket.on('new-userJoined',name=>{
        user[socket.id] = name;
        console.log("hello", name)
        socket.broadcast.emit('userJoined', name)

        socket.on('send', message=>{
            socket.broadcast.emit('recieve',{message:message,name:user[socket.id]})
        })
        
    })
})