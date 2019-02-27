var express = require("express");
var router = express.Router();
var cheerio = require("cheerio");
var axios = require("axios");

// require our db modals 

router.get("/", function(req,res) {
    res.render("index");
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
      });
        
})
module.exports = router;