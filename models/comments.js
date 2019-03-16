var mongoose = require ("mongoose");

var Schema = mongoose.Schema;

var commentSchema = new Schema({
    _trailId: {
        type: Schema.Types.ObjectId,
        ref: "Trail"
    },
    author: {
        type: String,
        required: true
    },
    commentText: String
})
var Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;