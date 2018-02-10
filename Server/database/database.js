const firebase = require('firebase');

var config = {
    apiKey: "AIzaSyBpfusbBnMCvrK2stsYYrdTFogjRknm7mo",
    authDomain: "millenniumplanning-3f78a.firebaseapp.com",
    databaseURL: "https://millenniumplanning-3f78a.firebaseio.com",
    projectId: "millenniumplanning-3f78a",
    storageBucket: "millenniumplanning-3f78a.appspot.com",
    messagingSenderId: "270940786181"
};

const connection = firebase.initializeApp(config);
const db = connection.database();
const auth = connection.auth();

exports.database = db;
exports.authentication = auth;