var express = require('express')
var userRoutes = express.Router();

let User = require('../models/users.model');

userRoutes.post('/add', function(req, res) {
    let user = new User(req.body);
    user.save()
      .then(user => {
        res.status(200).send('User has been submitted');
      })
      .catch(err => {
        res.status(400).send('User creation failed');
      });
});

userRoutes.get('/', function(req, res) {
    User.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});

userRoutes.get('/:username', function(req, res) {
    let user = req.params.username;
    User.findOne({username: user}, function(err, user) {
      if (err) {
        console.log(err);
      } else {
        res.json(user);
      }
    });
});

module.exports = userRoutes;
