var express = require('express');
var router = express.Router();

const firebase = require('../database/database');

router.get('/check', function(req, res, next) {
    res.send('User endpoint');
});

router.post('/register', (req,res,next) => {
    var userID = req.body.userName;

    function existsCallback(exists) {
        if(!exists){
            var userRef = firebase.database.ref('users/' +userID);
            userRef.set({
                Type: req.body.type,
                Name: req.body.name,
                Email: req.body.email,
                Designation: req.body.designation,
                Department: req.body.department,
                Password: req.body.password
            }, (error,results) => {
                if(error){
                    console.log(error);
                    res.json({success: false, message: "Server error. Please try again"});
                }
                else{
                    res.json({success: true, message: "User registered successfully"});
                }
            });
        }
        else{
            console.log('Username taken');
            res.json({success: false, message:'Username taken'});
        }
    }


    var userRef = firebase.database.ref('users');
    userRef.child(userID).once('value', (snapshot) => {
        exists = (snapshot.val() !== null);
        existsCallback(exists);
    });




});

router.post('/search', (req,res) => {
    var users = firebase.database.ref('users');
    users.orderByChild('NIC').equalTo('432432432V').on("child_added", (res) => {
        console.log(res.key.length);
    })


});

module.exports = router;