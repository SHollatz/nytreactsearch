const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var request = require("request");
var cheerio = require("cheerio");

var db = require("./models");
const PORT = process.env.PORT || 3001;
const app = express();

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger("dev"));
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("./build"));
}
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/nytreact"
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);
// Define API routes here
var articlesController = require("./server/controllers/article-controller");
var router = new express.Router();
// Define any API routes first
// Get saved articles
router.get("/api/saved", articlesController.find);
// Save articles
router.post("/api/saved", articlesController.insert);
// delete saved articles
router.delete("/api/saved/:id", articlesController.delete);
// Send every other request to the React app
router.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.use(router);
// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./build/index.html"));
});

app.get("/scrape", function (req, res) {
  request("http://www.dw.com/", function (error, response, html) {
    if (error) {
      console.log("error", error);
    }

    var $ = cheerio.load(html);
    //console.log("$", $);
    var result = {};
    //#bodyContent > div.col2.left > div:nth-child(1) > div > div > a > p
    $("div .css-6p6lnl h2").each(function (i, element) {
      console.log("element.children", $(element).children());
      var url = $(element).children().attr("href");
      result.url = url;;
      //console.log("$(element).children().text().trim()", $(element).children().text().trim());
      var title = $(element).children().text().trim();
      result.title = title;
      //var summary = $(element).find("p").text();
      //console.log("summary", summary);
      if (url.match(/2018/g)) {
        var linkParts = url.split("/")
        result.date = linkParts[4] + linkParts[5] + linkParts[3];
      } else {
        result.date = Date();
      }
      // console.log("result.title", result.title);
      //results.push(result);

      db.Article.create(result)
        .then(function (dbArticle) {
          // View the added result in the console
          //console.log(dbArticle);
        })
        .catch(function (err) {
          // If an error occurred, send it to the client
          return res.json(err);
        });
    });

    // If we were able to successfully scrape and save an Article, send a message to the client
    res.send("Scrape Complete");
  });
});

// Route for getting all Articles from the db
app.get("/articles", function (req, res) {
  // Grab every document in the Articles collection
  db.Article.find({})
    .then(function (dbArticle) {
      // If we were able to successfully find Articles, send them back to the client
      res.json(dbArticle);
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Route for grabbing a specific Article by id, populate it with it's note
app.get("/articles/:id", function (req, res) {
  // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
  db.Article.findOne({ _id: req.params.id })
    // ..and populate all of the notes associated with it
    .populate("note")
    .then(function (dbArticle) {
      // If we were able to successfully find an Article with the given id, send it back to the client
      res.json(dbArticle);
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Route for saving/updating an Article's associated Note
app.post("/articles/:id", function (req, res) {
  // Create a new note and pass the req.body to the entry
  db.Note.create(req.body)
    .then(function (dbNote) {
      // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
      // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
      // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
      return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
    })
    .then(function (dbArticle) {
      // If we were able to successfully update an Article, send it back to the client
      res.json(dbArticle);
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

app.put("/articles/:id", function (req, res) {
  // Create a new note and pass the req.body to the entry
  //console.log("inside put");
  //console.log("req.params.id", req.params.id);
  //console.log("article",db.Article.findOne({ _id: req.params.id }))
  db.Article.findOneAndUpdate({ _id: req.params.id }, {$unset: {note:""}})
    .then(function (article) {
      //console.log(article);
      //console.log("id" + article.note._id);
      // db.Article.findOneAndUpdate({_id:article._id}, {$unset: {note:article.note._id}});
      db.Note.findByIdAndDelete(article.note._id);
      return article 
    })
    .then(function (dbArticle) {
      // If we were able to successfully update an Article, send it back to the client
      res.json(dbArticle);
    })
    .catch(function (err) {
      console.log(err);
      // If an error occurred, send it to the client
      res.json(err);
    });
});


app.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});