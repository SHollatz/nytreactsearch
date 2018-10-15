const express = require("express");
const bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
const routes = require("./routes");

var db = require("./models");
const PORT = process.env.PORT || 3001;
const app = express();

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger("dev"));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/nytreact");

app.use(routes);

app.listen(PORT, () => {
  console.log(`🌎 ==> Server now listening on port ${PORT}!`);
});