var express = require('express');
var router = express.Router();

const firebase = require('../database/database');

router.get('/check', function(req, res, next) {
    res.send('Register endpoint');
});

router.post('/register', (req,res) => {
   var users = firebase.database.ref('users').push();
   users.set({
       NIC: '432432432V',
       Name: 'Saitama',
       Email: 'darklord1995@live.co.uk',
       Designation: 'Cleaner'
   });

});

module.exports = router;