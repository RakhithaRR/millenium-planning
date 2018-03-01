const firebase = require('firebase');

//configuration key for the Firebase Realtime Database.
var config = {
    apiKey: "AIzaSyBpfusbBnMCvrK2stsYYrdTFogjRknm7mo",
    authDomain: "millenniumplanning-3f78a.firebaseapp.com",
    databaseURL: "https://millenniumplanning-3f78a.firebaseio.com",
    projectId: "millenniumplanning-3f78a",
    storageBucket: "millenniumplanning-3f78a.appspot.com",
    messagingSenderId: "270940786181"
};

//initializing the Firebase connection
const connection = firebase.initializeApp(config);

//creating the database connection
const db = connection.database();

//creating the authentication connection
const auth = connection.auth();

exports.database = db;
exports.authentication = auth;