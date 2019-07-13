var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var helmet = require('helmet');
var morgan = require('morgan');

app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(bodyParser.json());

var PORT = 1337;
var plantRoutes = require('./routes/plantRoutes');
var userRoutes = require('./routes/userRoutes');
var enviRoutes = express.Router();

let Enviro = require('./models/env.model');

mongoose.connect('mongodb://Farmer1:farmer1@ds161335.mlab.com:61335/p-e-m', {useNewUrlParser: true});

var connection = mongoose.connection;
connection.once('open', function(){
  console.log("MongoDB database connection established, success!");
});


app.listen(PORT, function() {
  console.log("Server in year: " + PORT);
});

app.use('/nursery', plantRoutes);
app.use('/users', userRoutes);

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
