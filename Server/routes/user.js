var express = require('express');
var router = express.Router();
var firebaseSDK = require('firebase');

const firebase = require('../database/database');



router.get('/check', function(req, res, next) {
    res.send('User endpoint');
});

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


    userRef.orderByChild("Username").equalTo(req.body.userName).once("value", (snapshot) => {
        var exists = (snapshot.val() !== null);
        usernameExists(exists);

    })
});

router.post('/login', (req,res) => {

   var userRef = firebase.database.ref('users');
    firebase.authentication.signInWithEmailAndPassword(req.body.email, req.body.password)
        .then((result) => {
        // var loggedUser = firebase.authentication.currentUser;
        // console.log(loggedUser);
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

router.post('/update', (req,res,next) => {
    // firebase.authentication.onAuthStateChanged((userObj) => {
    //     if(userObj){
    //         console.log('Success' +userObj);
    //     }
    //     else{
    //         console.log('Fail '+userObj);
    //     }
    // });
    // console.log(user);
    var user = req.body.auth;
    const credentials = firebaseSDK.auth.EmailAuthProvider.credential(req.body.email,req.body.currentPass);
    // var credentials ={email: req.body.email, password: req.body.currentPass};
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

// router.post('/search', (req,res) => {
//     var users = firebase.database.ref('users');
//     users.orderByChild('NIC').equalTo('432432432V').on("child_added", (res) => {
//         console.log(res.key.length);
//     })
//
//
// });

module.exports = router;