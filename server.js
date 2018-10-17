const express = require("express");
const bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;


// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger("dev"));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(routes);
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/nytreact");

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app.listen(PORT, () => {
  console.log(`🌎 ==> Server now listening on port ${PORT}!`);
});