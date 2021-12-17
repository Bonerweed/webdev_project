const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let commentSchema = new Schema({
    thread: String,
    author: String,
    content: String,
    date: Date
});

module.exports = mongoose.model("Comment", commentSchema);
