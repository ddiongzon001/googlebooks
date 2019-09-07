// import mongoose
const mongoose = require ('mongoose');

// get Schema constructor out of mongoose;
const { Schema } = mongoose;

// create schema for books
const bookSchema = new Schema({
    bookId: {
        type: String
    },
    title: {
        type: String,
        required: true
    },
    authors: {
        type: Array,
        required: true
    },
    description: String,
    image: String,
    link: String

});

// creates the model
const Book = mongoose.model ("Book", bookSchema);

module.exports = Book;