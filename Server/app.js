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
io.on('connection', (socket) => {
    var projRef = firebase.database.ref('/messages');
    projRef.once("value", (snapshot) => {
        socket.emit('hello', {
            messages: snapshot.val()
        })
    });

    socket.on('my other event', function (data) {
        console.log(data);
    });
});

//routes
const users = require('./routes/user');
const project = require('./routes/project');

app.use('/users', users);
app.use('/project', project);


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
