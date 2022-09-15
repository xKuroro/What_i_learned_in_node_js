const express = require("express");
const path = require("path");
const app = express();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const connectTimout = require("connect-timeout");
const session = require("express-session");
const router = express.Router();

app.use(connectTimout("5s"));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(haltOnTimedout);
var sess = {
  secret: "keyboard cat",
  cookie: {},
};

if (app.get("env") === "production") {
  app.set("trust proxy", 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies
}

app.use(session(sess));
app.use(function (req, res, next) {
  //   res.send("COnnecting")
  next();
});

app.use(express.json());

router.get("/", connectTimout("5s"), (req, res, next) => {
  console.log("this is the req : ");
  res.sendFile(path.join(__dirname + "/middleHTML.html"));
});

router.get("/humansData", (req, res, next) => {
  console.log(req);
  res.send();
});

function haltOnTimedout(req, res, next) {
  if (!req.timedout) next();
}
app.use("/", router);
const NODE_ENV = process.env.NODE_ENV;
// console.log(NODE_ENV);
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Running in port ${PORT}....`));
