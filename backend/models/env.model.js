var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let Envi = new Schema({
  time : {
    type: String
  },
  // humidity: {
  //   type: Number
  // },
  temperature: {
    type: Number
  }
});

module.exports = mongoose.model('Envi', Envi);
