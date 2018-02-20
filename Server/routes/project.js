var express = require('express');
var router = express.Router();
var firebaseSDK = require('firebase');

const firebase = require('../database/database');


router.get('/getUsers', (req,res,next) => {
    var userRef = firebase.database.ref('users');
    userRef.orderByChild("Type").equalTo('Admin').on("value", (snapshot) => {
        console.log(snapshot.val());
        res.send(snapshot.val())
    })
});


module.exports = router;