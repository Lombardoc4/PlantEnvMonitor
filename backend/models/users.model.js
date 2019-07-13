const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let Users = new Schema({
  username: {
    type: String
  },
  password: {
    type: String
  },
  company: {
    type: String
  },
  role: {
    type: String
  },

});

module.exports = mongoose.model('Users', Users);
