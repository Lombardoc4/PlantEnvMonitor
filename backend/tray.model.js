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
    type: Date
  },
  light_date: {
    type: Date
  },
  harvest_date: {
    type: Date
  },
  yield:{
    type: Number
  }
});

module.exports = mongoose.model('Tray', Tray);
