const mongoose = require("mongoose");

const humanSchema = new mongoose.Schema({
  id: Number,
  name: String,
  age: Number,
  location: String,
});

const Human = mongoose.model("Human", humanSchema);

module.exports = Human;
