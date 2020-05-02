const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Note = new Schema(
  {
    'Entry Date': Date,
    'Entry Headers': Array,
    'Entry Contents': Array,
  },
  { collection: 'notes'}
);

const PlantExport = mongoose.model('Note', Note)

module.exports = PlantExport;
