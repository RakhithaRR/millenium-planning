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

//model for adding a new project
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

//model for updating a project
router.post('/updateProject', (req, res, next) => {
    var projRef = firebase.database.ref('projects');
    var key = req.body.key;

    projRef.child(key).update({
        Name: req.body.name,
        Client: req.body.client,
        Description: req.body.description,
        StartDate: req.body.startDate,
        EndDate: req.body.endDate,
        Completion: false,
        Technologies: req.body.technologies,
        Tasks: req.body.tasks

    }).then((result) => {
        res.send({success: true, message: 'Project updated successfully'});
    }).catch((err) => {
        console.log(err);
        res.send({success: true, message: err.message});
    })
});

//model for getting the list of all the projects available in the system
router.get('/getProjects', (req, res, next) => {
    var projRef = firebase.database.ref('projects');
    projRef.once("value", (snapshot) => {
        res.send(snapshot.val());
    });
});

//model for getting the details of an individual project
router.post('/getCurrentProject', (req, res, next) => {
    var projRef = firebase.database.ref('projects');
    projRef.orderByChild('Name').equalTo(req.body.name).once("value", (snapshot) => {
        var key = Object.keys(snapshot.val())[0];
        res.json({successs: true, project: snapshot.val(), key: key});
    })
});

//model to mark completion of a task.
router.post('/completion', (req, res, next) => {
    var key = req.body.key;
    var index = req.body.index;
    var taskRef = firebase.database.ref('projects/' + key + '/Tasks/' + index);
    taskRef.update({
        status: req.body.status
    })
        .then((result) => {
            res.json({success: true});
        })
        .catch((error) => {
            res.json({success: false, message: error.message});
        });

});

module.exports = router;