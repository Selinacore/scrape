var express = require("express");
var router = express.Router();
var cheerio = require("cheerio");
var axios = require("axios");

var db = require("../models");
// require our db modals

router.get("/", function(req,res) {
  db.Trail.find().then(function(data){
    // res.json(data);
    res.render("index",{ trails:data });
  })
});

router.get("/scrape", function(req,res) {
    axios.get("https://www.alltrails.com/us/colorado/off-road-driving").then(function(response) {

        // Load the HTML into cheerio and save it to a variable
        // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
        var $ = cheerio.load(response.data);

        // An empty array to save the data that we'll scrape
        var results = [];

        // With cheerio, find each p-tag with the "title" class
        // (i: iterator. element: the current element)
        $("div.trail-result-card").each(function(i, element) {

          // Save the text of the element in a "title" variable
          var title = $(element).find("h3.name").text();

          // In the currently selected element, look at its child elements (i.e., its a-tags),
          // then save the values for any "href" attributes that the child elements may have
          var difficulty = $(element).find("span.diff").text();
          var location = $(element).find("span.location-label").text()
          // Save these results in an object that we'll push into the results array we defined earlier
          results.push({
            title: title,
            difficulty: difficulty,
            location: location
          });

        });


        // Log the results once you've looped through each of the elements found with cheerio
        console.log(results);
        db.Trail.create(results);

      });
    res.json("scrape complete");
})

router.get("/comments/:id", function(req,res) {
  console.log("GET COMMENT", req.params.id)

  db.Trail.findById(req.params.id).populate("Trail").then(function (trailData){
    console.log("TRAIL")
    mergedData = trailData
    console.log(mergedData)

    db.Comment.find({ _trailId: req.params.id }).populate("Comments").then(function (commentsData) {
      console.log("TRAIL COMMENTS")
      console.log(commentsData)

      return res.render("comments", { data: trailData, comments: commentsData });
    })
  })
})

router.post("/comments/:id", function(req,res) {
  console.log("POST COMMENT", req.params.id)

  console.log(req.body)

  db.Comment.create(req.body).then(function(data){
    res.json(data);
  })
})
module.exports = router;