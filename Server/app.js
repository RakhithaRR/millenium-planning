//packages
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const firebase = require('./database/database');

//express setup
const port = process.env.PORT || 3000;
const app = express();
const io = require('socket.io')(app.Server);
app.use(cors());
app.use(bodyParser.json());


//routes
const users = require('./routes/user');
const project = require('./routes/project');

app.use('/users',users);
app.use('/project', project);


app.get('/',(req,res) => {
    res.send("Invalid Endpoint");
});


//firebase connection check
var fireConnection = firebase.database.ref('.info/connected');
fireConnection.on("value", (con) =>{
    if(con.val() === true){
        console.log("Connected to Firebase...");
    }
    else{
        console.log("Not connected to Firebase!");
    }
});

//socket.io integration
io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
});


//starting the server
app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});

