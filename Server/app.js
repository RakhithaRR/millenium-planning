//packages
const express = require('express');
const path = require('path');
const firebase = require('./database/database');

//express setup
const port = process.env.PORT || 3000;
const app = express();


//routes
const users = require('./routes/user');

app.use('/users',users);


app.get('/',(req,res) => {
    res.send("Invalid Endpoint");
});


// app.get('*',(req,res)=>{
//     res.sendFile(path.join(__dirname,'static/index.html'));
// });
//


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


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});