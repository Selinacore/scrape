var express = require("express");
var mongoose = require("mongoose");

var PORT = 3000;

// Require all models
// var db = require("./models");
var routes = require("./controller/trailsController");
// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

app.use(routes);
// Connect to the Mongo DB

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scrape";

mongoose.connect(MONGODB_URI);

// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });