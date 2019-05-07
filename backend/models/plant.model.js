

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let Plant = new Schema({
  plant_species: {
    type: String
  },
  seed_pot: {
    type: Number
  },
  sow_date: {
    type: String
  },
  source: {
    type: String
  },
  stepUp: {
    type: String
  },
  condition:{
    type: String
  }
});

module.exports = mongoose.model('Plant', Plant);
