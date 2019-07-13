var express = require('express')
var plantRoutes = express.Router()

let Plant = require('../models/plant.model');

plantRoutes.get('/', function(req, res) {
    Plant.find({}).sort({sow_date: 1}).exec(function(err, plants) {
        if (err) {
            console.log(err);
        } else {
            res.json(plants);
        }
    });
});

plantRoutes.get('/plants', function(req, res) {
    Plant.find({}).sort({plant_species: 1}).exec(function(err, plants) {
        if (err) {
            console.log(err);
        } else {
            res.json(plants);
        }
    });
});

plantRoutes.get('/:id', function(req, res) {
    let id = req.params.id;
    Plant.findById(id, function(err, plant) {
      if (err) {
        console.log(err);
      } else {
        res.json(plant);
      }
    });
});

plantRoutes.post('/add', function(req, res) {
    let plant = new Plant(req.body);
    plant.save()
      .then(plant => {
        res.status(200).send('plant added successfully');
      })
      .catch(err => {
        res.status(400).send('adding new tray failed');
      });
});

plantRoutes.delete('/remove/:id', function(req, res) {
  Plant.findById(req.params.id, function(err, plant) {
    if (err) {
      res.status(404).send("Plant not found");
    }
    else {
      plant.remove().then()
    }
    // res.flash("success", "Tray has been deleted.")
    // return res.redirect("/");
  });
});

plantRoutes.post('/update/:id', function(req, res) {
    Plant.findById(req.params.id, function(err, plant) {
      if (!plant)
        res.status(404).send("Plant is not found");
      else
        plant.plant_species = req.body.plant_species;
        plant.seed_pot = req.body.seed_pot;
        plant.sow_date = req.body.sow_date;
        plant.source = req.body.source;
        plant.stepUp = req.body.stepUp;
        plant.condition = req.body.condition;

        plant.save().then(plant => {
          res.json('Planting updated!');
        })
          .catch(err => {
            res.status(400).send("Update not possible right now");
          });
    });
});

module.exports = plantRoutes
