const express = require('express')
const plantRoutes = express.Router()

let Plant = require('../models/plant.model');
let Note = require('../models/note.model');

plantRoutes.get('/notes', function(req, res) {
  Note.find({}).exec(function(err, notes) {
      if (err) {
          console.log(err);
      } else {
          res.json(notes);
      }
  });
});

plantRoutes.post('/notes', function(req, res) {
  let note = new Note(req.body);
  note.save()
    .then(confirm => {
      res.status(200).send('added successfully');
    })
    .catch(err => {
      res.status(400).send('adding new note failed');
    });
});

// plantRoutes.get('/', function(req, res) {
//     Plant.find({}).sort({sow_date: 1}).exec(function(err, plants) {
//         if (err) {
//             console.log(err);
//         } else {
//             res.json(plants);
//         }
//     });
// });

// plantRoutes.get('/plants', function(req, res) {
//     Plant.find({}).sort({plant_species: 1}).exec(function(err, plants) {
//         if (err) {
//             console.log(err);
//         } else {
//             res.json(plants);
//         }
//     });
// });

// plantRoutes.get('/:id', function(req, res) {
//     let id = req.params.id;
//     Plant.findById(id, function(err, plant) {
//       if (err) {
//         console.log(err);
//       } else {
//         res.json(plant);
//       }
//     });
// });

plantRoutes.post('/add-life', function(req, res) {
    let plant = new Plant(req.body);
    plant.save()
      .then(plant => {
        res.status(200).send('added successfully');
      })
      .catch(err => {
        res.status(400).send('adding new tray failed');
      });
});

plantRoutes.get('/seeds', function(req, res) {
  Plant.find({'Entry Type': 'Seed'}).exec(function(err, plants) {
      if (err) {
          console.log(err);
      } else {
          res.json(plants);
      }
  });
});

plantRoutes.get('/plants', function(req, res) {
  Plant.find({'Entry Type': 'Plant'}).exec(function(err, plants) {
      if (err) {
          console.log(err);
      } else {
          res.json(plants);
      }
  });
});

plantRoutes.delete(['/plants/:id', '/seeds/:id'], function(req, res) {
  console.log(req.params.id)
  Plant.deleteOne({ _id : req.params.id }, function(err) {
    if (err) {
      res.status(404).send("Plant not found");
    }
    else {
      console.log("Successful deletion");
    }
    // res.flash("success", "Tray has been deleted.")
    // return res.redirect("/");
  });
});

plantRoutes.get(['/seeds/view/:id', '/plants/view/:id'] , function(req, res) {
    let id = req.params.id;
    Plant.findOne({ _id: id}, function(err, plant) {
      if (err) {
        console.log(err);
      } else {
        res.json(plant);
      }
    });
});

plantRoutes.get('/seeds/:filter', function(req, res) {
  let filter = req.params.filter;
  Plant.find({'Entry Type': 'Seed', 'Plant Type': filter}, function(err, plant) {
    if (err) {
      console.log(err);
    } else {
      res.json(plant);
    }
  });
});

plantRoutes.get(['/plants/:filter1', '/plants/:filter1/:filter2'], function(req, res) {
  let queryObject = {'Entry Type': 'Plant'};
  if (req.params.filter1 === 'Germinated' || req.params.filter2 === 'Germinated') {
    queryObject['Germinated'] = { $exists: true }
  }
  if (req.params.filter1 === 'Purchased' || req.params.filter2 === 'Purchased') {
    queryObject['Germinated'] = { $exists: false }
  }
  if (req.params.filter1 !== 'Purchased' && req.params.filter1 !== 'Germinated'){
    queryObject['Plant Type'] = req.params.filter1;
  }

  Plant.find(queryObject, function(err, plant) {
    if (err) {
      console.log(err);
    } else {
      res.json(plant);
    }
  });

});

plantRoutes.get(['/seeds/view/:id/edit', '/plants/view/:id/edit' ], function(req, res) {
  let id = req.params.id;
  Plant.findOne({ _id: id}, function(err, plant) {
    if (err) {
      console.log(err);
    } else {
      res.json(plant);
    }
  });
});

plantRoutes.post(['/seeds/view/:id/edit', '/plants/view/:id/edit' ], function(req, res) {
  let id = req.params.id;
  let plant = new Plant(req.body);
  Plant.updateOne({ _id: id}, plant, function(err, plant) {
    if (err) {
      console.log(err);
    } else {
      console.log('successfully updated')
      // res.json(plant);
    }
  });
});

plantRoutes.get('/container/:container', function(req, res) {
  let container = req.params.container;
  container = decodeURI(container);
  Plant.find({'Container ID': container}, function(err, plant) {
    if (err) {
      console.log(err);
    } else {
      res.json(plant);
    }
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
