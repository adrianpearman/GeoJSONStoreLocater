const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const geoCoder = require("../utils/geocoder");

const StoreSchema = new Schema({
  storeId: {
    type: String,
    required: [true, "Please add a store ID"],
    unique: true,
    trim: true,
    maxlength: [10, "StoreID must be atleast 10 characters long"]
  },
  address: {
    type: String,
    required: [true, "Please add an address"]
  },
  location: {
    type: {
      type: String,
      enum: ["Point"]
    },
    coordinates: {
      type: [Number],
      index: "2dsphere"
    },
    formattedAddress: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

//Geocode & create location
StoreSchema.pre("save", async function(next) {
  const location = await geoCoder.geocode(this.address);
  const { longitude, latitude, formattedAddress } = location[0];
  this.location = {
    type: "Point",
    coordinates: [longitude, latitude],
    formattedAddress: formattedAddress
  };

  this.address = undefined;
  next();
});

module.exports = mongoose.model("Store", StoreSchema);
