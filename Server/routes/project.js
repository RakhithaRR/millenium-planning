//importing packages
var express = require('express');
var router = express.Router();
var firebaseSDK = require('firebase');

//importing the database
const firebase = require('../database/database');


//getting the details of all the users in the system
router.get('/getUsers', (req, res, next) => {
    var userRef = firebase.database.ref('users');
    userRef.orderByChild("Type").equalTo('Admin').once("value", (snapshot) => {
        // console.log(snapshot.val());
        res.send(snapshot.val())
    })
});

//controller for adding a new project to the system.
router.post('/addProject', (req, res, next) => {
    var projectKey = firebase.database.ref().child('projects').push().key;
    var projRef = firebase.database.ref('projects');

    projRef.child(projectKey).set({
        Name: req.body.name,
        Client: req.body.client,
        Description: req.body.description,
        StartDate: req.body.startDate,
        EndDate: req.body.endDate,
        Completion: false,
        Technologies: req.body.technologies,
        Tasks: req.body.tasks

    }).then((result) => {
        res.send({success: true, message: 'Project added successfully'});
    }).catch((err) => {
        console.log(err);
        res.send({success: true, message: err.message});
    })
});

//getting the list of all the projects available in the system
router.get('/getProjects', (req, res, next) => {
    var projRef = firebase.database.ref('projects');
    projRef.once("value", (snapshot) => {
        res.send(snapshot.val());
    });
});

router.post('/getCurrentProject', (req, res, next) => {
    var projRef = firebase.database.ref('projects');
    projRef.orderByChild('Name').equalTo(req.body.name).once("value", (snapshot) => {
        var key = Object.keys(snapshot.val())[0];
        res.json({successs: true, project: snapshot.val(), key: key});
    })
});

module.exports = router;