const express = require("express");
const path = require("path");
const morgan = require("morgan");
const Eventemitter = require("events");
const eventEmitter = new Eventemitter();
const mongoose = require("mongoose");
const app = express();
const router = express.Router();

// connect to the database
mongoose
  .connect("mongodb://localhost/user")
  .then(() => console.log("Connected to mongoDB.."))
  .catch((err) => console.log("Unsuccesfully connect to mongoDB..", err));

app.use(express.json());
app.use(morgan());
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});
app.use("/", express.static(path.resolve(__dirname, "view")));
let PORT = process.env.PORT || 3005;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}..`));