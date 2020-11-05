require("dotenv").config();
if (!process.env.PRIVATE_KEY) {
  console.error("FATAL ERROR: Login Private key is not defined.");
  process.exit(1);
}
require('./db');
const express = require("express");
const app = express(); //set up express server
const port = process.env.SERVER_PORT;
const appServer = app.listen(port, () => console.log(`Backend app listening on port ${port}!`));

var morgan = require('morgan');
var path = require('path');
var moment = require('moment');
var rfs = require('rotating-file-stream');
if (process.env.NODE_ENV === "production") {
  const generator = (time, index) => {
    if (!time) return "file.log";
    var t = moment(time);
    return port + "-" + t.format("DD-MMM-YYYY_hh:mm:ss") + "-file.log";
  };
  var accessLogStream = rfs.createStream(generator, {
    interval: '1d', // rotate daily
    compress: "gzip", // compress rotated files
    path: path.join(__dirname, 'logs'),
    immutable: true,
  });
  accessLogStream.on("error", console.log);
  accessLogStream.on("warning", console.log);
  app.use(morgan('combined', { stream: accessLogStream }));
} else {
  app.use(morgan('dev'));
}

var cors = require("cors");
app.use(cors()); //to access api's from even a different source
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
var compression = require('compression');
app.use(compression());
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const usersRoute = require("./users.route");
const neosRoute = require("./neos.route");
app.use("/api/users", usersRoute);
app.use("/api/neos", neosRoute);
