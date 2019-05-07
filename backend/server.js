var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var helmet = require('helmet');
var morgan = require('morgan');

var PORT = 1337;

var plantRoutes = express.Router();
var enviRoutes = express.Router();

let Plant = require('./models/plant.model');
let Enviro = require('./models/env.model');

app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(bodyParser.json());

mongoose.connect('mongodb://Farmer1:farmer1@ds161335.mlab.com:61335/p-e-m', {useNewUrlParser: true});
var connection = mongoose.connection;


connection.once('open', function(){
  console.log("MongoDB database connection established, success!");
});

app.listen(PORT, function() {
  console.log("Server in year: " + PORT);
});


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

app.use('/nursery', plantRoutes);

enviRoutes.get('/', function(req, res) {
  Enviro.find(function(err, envis) {
      if (err) {
          console.log(err);
      } else {
          res.json(envis);
      }
  });
});

enviRoutes.post('/', function(req, res) {
    let envi = new Enviro(req.body);
    console.log(req.body);
    envi.save()
      .then(envi => {
        res.status(200).send('new datapoint added');
      })
      .catch(err => {
        res.status(400).send('adding new data failed');
      });
});

app.use('/envi', enviRoutes);
