var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var PORT = 4000;
var trayRoutes = express.Router();

let Tray = require('./tray.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://Farmer1:farmer1@ds161335.mlab.com:61335/p-e-m', {useNewUrlParser: true});
var connection = mongoose.connection;

connection.once('open', function(){
  console.log("MongoDB database connection established, success!");
});

app.listen(PORT, function() {
  console.log("Server in year: " + PORT);
});

trayRoutes.route('/').get(function(req, res) {
    Tray.find(function(err, trays) {
        if (err) {
            console.log(err);
        } else {
            res.json(trays);
        }
    });
});

trayRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Tray.findById(id, function(err, tray) {
      if (err) {
        console.log(err);
      } else {
        res.json(tray);
      }
    });
});

trayRoutes.route('/add').post(function(req, res) {
    let tray = new Tray(req.body);
    tray.save()
      .then(tray => {
        res.status(200).json({'tray': 'tray added successfully'});
      })
      .catch(err => {
        res.status(400).send('adding new tray failed');
      });
});

trayRoutes.route('/update/:id').post(function(req, res) {
    Tray.findById(req.params.id, function(err, tray) {
      if (!tray)
        res.status(404).send("tray is not found");
      else
        tray.plant_species = req.body.plant_species;
        tray.grams_of_seed = req.body.grams_of_seed;
        tray.germ_date = req.body.germ_date;
        tray.light_date = req.body.light_date;
        tray.harvest_date = req.body.harvest_date;
        tray.yield = req.body.yield;

        tray.save().then(tray => {
          res.json('Tray updated!');
        })
          .catch(err => {
            res.status(400).send("Update not possible right now");
          });
    });
});

app.use('/trays', trayRoutes);
