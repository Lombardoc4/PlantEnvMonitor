var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let Tray = new Schema({
  plant_species: {
    type: String
  },
  grams_of_seed: {
    type: Number
  },
  germ_date: {
    type: String
  },
  light_date: {
    type: String
  },
  harvest_date: {
    type: String
  },
  yield:{
    type: Number
  }
});

module.exports = mongoose.model('Tray', Tray);
