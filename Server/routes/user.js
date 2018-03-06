//importing packages
var express = require('express');
var router = express.Router();
var firebaseSDK = require('firebase');

//importing the database
const firebase = require('../database/database');



router.get('/check', function(req, res, next) {
    res.send('User endpoint');
});


//model for registering a new user in the system
router.post('/register', (req,res,next) => {

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

    //checking whether a certain username already exists in the system
    userRef.orderByChild("Username").equalTo(req.body.userName).once("value", (snapshot) => {
        var exists = (snapshot.val() !== null);
        usernameExists(exists);

    })
});


//model for logging in to the system
router.post('/login', (req,res) => {

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

//model for logging out a user from the system
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

//model for updating the user password for an existing user.
router.post('/update', (req,res,next) => {

    var user = req.body.auth;
    const credentials = firebaseSDK.auth.EmailAuthProvider.credential(req.body.email,req.body.currentPass);

    //reauthenticating the user before changing the password in order to ensure the validity.
    firebase.authentication.currentUser.reauthenticateWithCredential(credentials).then(() =>{
        firebase.authentication.currentUser.updatePassword(req.body.newPass).then(() => {
            res.json({success: true, message: "Password changed successfully"});
        }).catch((err) => {
            res.json({success: false, messsage:err.message});
        })
    }).catch((err) => {
        res.json({success: false, message:err.message});
    })
});


module.exports = router;