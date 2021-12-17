const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let threadSchema = new Schema({
    content: String,
    author: String,
    authorID: String,
    date: Date,
    edited: Boolean
});

module.exports = mongoose.model("Thread", threadSchema);
