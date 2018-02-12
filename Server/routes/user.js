var express = require('express');
var router = express.Router();

const firebase = require('../database/database');

router.get('/check', function(req, res, next) {
    res.send('User endpoint');
});

router.post('/register', (req,res,next) => {
    // var userID = req.body.userName;
    //
    // function existsCallback(exists) {
    //     if(!exists){
    //         var userRef = firebase.database.ref('users/' +userID);
    //         userRef.set({
    //             Type: req.body.type,
    //             Name: req.body.name,
    //             Email: req.body.email,
    //             Designation: req.body.designation,
    //             Department: req.body.department,
    //             Password: req.body.password
    //         }, (error,results) => {
    //             if(error){
    //                 console.log(error);
    //                 res.json({success: false, message: "Server error. Please try again"});
    //             }
    //             else{
    //                 res.json({success: true, message: "User registered successfully"});
    //             }
    //         });
    //     }
    //     else{
    //         console.log('Username taken');
    //         res.json({success: false, message:'Username taken'});
    //     }
    // }
    //
    //
    // var userRef = firebase.database.ref('users');
    // userRef.child(userID).once('value', (snapshot) => {
    //     exists = (snapshot.val() !== null);
    //     existsCallback(exists);
    // });
    var userRef = firebase.database.ref('users');
    function usernameExists(exists) {
        if(exists){
            res.json({success: false, message:"Username already taken"});
        }
        else{
            firebase.authentication.createUserWithEmailAndPassword(req.body.email, req.body.password)
                .then((result) => {
                    userRef.child(result.uid).set({
                        Type: req.body.type,
                        Name: req.body.name,
                        Username: req.body.userName,
                        Designation: req.body.designation,
                        Department: req.body.department,
                    });
                    res.json({success: true, message: "User registered successfully"});
                })
                .catch((err) => {
                    var code = err.code;
                    var errMessage = err.message;
                    if(code === 'auth/email-already-in-use'){
                        res.json({success: false, message: "Email already in use"});
                    }
                    else{
                        res.json({success: false, message: errMessage});
                    }
                });
        }

    }


    userRef.orderByChild("Username").equalTo(req.body.userName).once("value", (snapshot) => {
        var exists = (snapshot.val() !== null);
        usernameExists(exists);

    })
});

router.post('/login', (req,res) => {
    // firebase.authentication.signOut().then(function(result) {
    //     console.log(result);
    //     res.json({success: true, message:"Signed out"})
    // }).catch(function(error) {
    //     // An error happened.
    //     console.log(error);
    // });
   var userRef = firebase.database.ref('users');
    firebase.authentication.signInWithEmailAndPassword(req.body.email, req.body.password)
        .then((result) => {
            firebase.authentication.currentUser.getIdToken(true)
                .then((token) => {
                    userRef.child(result.uid).on("value", (snapshot) => {
                        console.log(snapshot.val());
                        res.json({success: true, message: 'User logged in successfully', token: token, user: snapshot.val()});
                    });
                });
            // res.json({success: true, message: 'User logged in successfully'});
            // console.log(result.providerData);

        })
        .catch((error) => {
            var code = error.code;
            if(code === "auth/wrong-password"){
                res.json({success: false, message: "Incorrect password"});
            }
            else {
                res.json({success: false, message: error.message});
            }

    });

});

router.post('/logout',(req,res,next) => {
    firebase.authentication.signOut()
        .then(() => {
            res.json({success: true, message: "Signed out"})
        })
        .catch((err) => {
            console.log(err);
            res.json({success: false, message: err.message});
        });
});

router.post('/search', (req,res) => {
    var users = firebase.database.ref('users');
    users.orderByChild('NIC').equalTo('432432432V').on("child_added", (res) => {
        console.log(res.key.length);
    })


});

module.exports = router;