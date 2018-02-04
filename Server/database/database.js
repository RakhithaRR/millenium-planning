const firebase = require('firebase');

var config = {
    apiKey: "AIzaSyBpfusbBnMCvrK2stsYYrdTFogjRknm7mo",
    authDomain: "millenniumplanning-3f78a.firebaseapp.com",
    databaseURL: "https://millenniumplanning-3f78a.firebaseio.com",
    projectId: "millenniumplanning-3f78a",
    storageBucket: "millenniumplanning-3f78a.appspot.com",
    messagingSenderId: "270940786181"
};

const app = firebase.initializeApp(config);
const db = app.database();

exports.database = db;