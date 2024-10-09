const mongoose = require('mongoose');

// schema is structure data

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    author: String,
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    }
});

// export model

// define the shema -> create model -> use the model
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
