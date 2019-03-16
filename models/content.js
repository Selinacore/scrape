var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var trailSchema = new Schema({
    title: { 
    type:String,
    required: true,
    unique: { index: { unique: true } }
},
    difficulty: String,
    location: String
})
var Trail = mongoose.model("Trails", trailSchema);

module.exports = Trail;