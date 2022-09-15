const { string } = require("joi");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const Human = require("./model/Humans.js");
const human = require("./humanData.js");
mongoose
  .connect("mongodb://localhost/humans")
  .then(() => console.log("Connected to mongoDB.."))
  .catch((err) => console.log("Unsuccesfully connect to mongoDB..", err));

// const humanSchema = new mongoose.Schema({
//   id: Number,
//   name: String,
//   age: Number,
//   location: String,
// });

// const Human = mongoose.model("Human", humanSchema);
// app.use(express.json());

// app.get("/humans", async (req, res, next) => {
//   res.send("Human");
// });

async function createHuman() {
  const human = new Human({
    name: "Frankenstein",
    age: 500,
    location: "unknown",
  });
  const result = await human.save();
  // console.log(result);
  return result;
  // if (findHuman(human)) {
  //   const result = await human.save();
  //   // console.log(result);
  //   return result;
  // } else {
  //   console.log("error");
  // }
}

createHuman();
// async function updateDoc(id) {
//   const result = await Human.updateOne(
//     { _id: id },
//     {
//       $set: {
//         name: "Abraham Lincoln",
//         age: 400,
//         location: "Jerman",
//       },
//     }
//   );
//   console.log(result);
// }
// updateDoc("6319840daef08c8e37b64527");
//updating document in mongoDB
// async function findHuman(id) {
//   const findHuman = await Human.findById(id);
//   if (!findHuman) return;

//   findHuman.name = "Abraham Lincoln";
//   findHuman.age = 400;
//   findHuman.location = "Amerika";

//   const result = await findHuman.save();
//   console.log(result);
// }

// findHuman("6319840daef08c8e37b64527");

// function displayHumansList(req, res, next) {}

//Removing a document

// async function removeDoc(id) {
//   const result = await Human.deleteOne({ _id: id });
//   console.log(result);
// }

// removeDoc("6319840daef08c8e37b64527");

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`Running in port ${PORT}...`));
