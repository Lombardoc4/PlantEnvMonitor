const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Note = new Schema(
  {
    'date': {type: Date, default: Date.now},
    'subject': Array,
    'copy': Array,
  },
  { collection: 'notes'}
);

const PlantExport = mongoose.model('Note', Note)

module.exports = PlantExport;
