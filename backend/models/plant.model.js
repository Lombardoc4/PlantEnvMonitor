

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Plant = new Schema(
  {
    'Entry Type': String,
    'Container ID': String,
    'Common Name': String,
    'Scientific Name': String,
    'Plant Type': String,
    'Source':  String,
    'Obtain Date':  Date,
    'Plant Date': Date,
    'Seed Quantity': Number,
    'Germinated': Number,
    'Planted': Number,
    'Picture Source': String

  },
  { collection: 'nursery'}
);

    //     {
    //     (Both)    ContainerID --> Location of Plant (how do we know what the next id is on creation, )
    //     (Both)    Scientific Name --> Name (fill one name and autofill other)
    //     (Both)    Common Name --> Name (this is an array of names, fill one and autofill other)
    //     (Both)    Source --> Where seed/plant originateed
    //     (Both)    Date(seed only) --> Date plant bought or seed collected (this can be null)
    //     (Both)    Planted On/SteppedUp On --> [array of dates, first is planting, any after are stepup dates]
    //     (Edit)    Germinated (Number) --> Seeds from tray that germinated
    //     (Germ)    Planted (Number) --> Total seeds from tray
    //     (Both)    PlantType --> Dropdown
    //     (Seed, )    PictureSrc --> Image Preview
    //     (ContainerID)    Container Size --> Dropdown , creates tray ID
    //     }
const PlantExport = mongoose.model('Plant', Plant)

module.exports = PlantExport;
