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
        Name: req.body.name,
        Client: req.body.client,
        Description: req.body.description,
        StartDate: req.body.startDate,
        EndDate: req.body.endDate,
        Technologies: req.body.technologies,
        Tasks: req.body.tasks

    }).then((result) => {
        res.send({success: true, message: 'Project added successfully'});
    }).catch((err) => {
        console.log(err);
        res.send({success: true, message: err.message});
    })
});


module.exports = router;