const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const threadSchema = new Schema({
    title: String,
    content: String,
    author: String,
    authorID: String,
    date: Date,
    edited: Boolean
});

module.exports = mongoose.model("Thread", threadSchema);
