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
router.post('/addProject',(req,res,next) => {
    var projectKey = firebase.database.ref().child('projects').push().key;
    var projRef = firebase.database.ref('projects');

    projRef.child(projectKey).set({

    }).then((result) => {
        console.log(result);
    }).catch((err) => {
        console.log(err);
    })
});


module.exports = router;