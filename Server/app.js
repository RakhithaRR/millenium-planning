//packages
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const firebase = require('./database/database');
const http = require('http');
const socketIO = require('socket.io');

//express setup
const port = process.env.PORT || 3000;
const app = express();
const server = http.Server(app);
server.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});

app.use(cors());
app.use(bodyParser.json());
const io = socketIO(server);

//socket.io connection
io.sockets.on('connection', (socket) => {

    socket.on('chat', (info) => {
        socket.join(info.key);
        // console.log(msg);
        var projRef = firebase.database.ref('/messages/' + info.key);
        projRef.push(info.msg);
        projRef.once('child_added', (snapshot, prevKey) => {
            console.log('Getting data from: ' + info.key);
            console.log(snapshot.val());
            io.sockets.in(info.key).emit('message', snapshot.val());
        });
        // io.emit('chat', msg)
    });


    // socket.on('my other event', function (data) {
    //     console.log(data);
    // });
});

//routes
const users = require('./routes/user');
const project = require('./routes/project');
const chat = require('./routes/chat');

app.use('/users', users);
app.use('/project', project);
app.use('/chats',chat);


app.get('/', (req, res) => {
    res.send("Invalid Endpoint");
});


//firebase connection check
var fireConnection = firebase.database.ref('.info/connected');
fireConnection.on("value", (con) => {
    if (con.val() === true) {
        console.log("Connected to Firebase...");
    }
    else {
        console.log("Not connected to Firebase!");
    }
});

//socket.io integration

//starting the server
// app.listen(port, () => {
//     console.log(`Server running on port ${port}.`);
// });
//
