const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');

app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(bodyParser.json());

const PORT = 1337;
const plantRoutes = require('./routes/nurseryRoutes');
const userRoutes = require('./routes/userRoutes');
const enviRoutes = express.Router();

let Enviro = require('./models/env.model');

mongoose.connect('mongodb+srv://scrubboi:'+ process.env.MONGO + '@testtestest-236by.mongodb.net/PlantMonitor?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.collection('seeds');
connection.once('open', function(){
  console.log("MongoDB database connection established, success!");
});


app.listen(PORT, function() {
  console.log("Server in year: " + PORT);
});

// entry_type: "seed"
// plant_name: {common_name: "Aquilegia canadensis", scientific_name: "Eastern Columbine"}
// plant_type: "Wildflower"
// source: "Paramus PT"
// obtain_date: {type: "2019-08-01", default: ƒ}
// seed_quantity: "10"
// picture_source: undefined

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
