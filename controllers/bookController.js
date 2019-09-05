// import our models folder
const { Book } = require('../models')

// export methods for handling our routes
modules.exports = {

    // get all books from the book mongo database
    getBooks: (req, res) => {
        Book.
        findAll({})
        .then(dbBookData  => res.status(200).json(dbBookData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    }

    // get ONE book from the book mongo database
    getOneBook: (req, res) => {
        Book
        .findById(req.params.id)
        .then(dbBookData => res.status(200).json(dbBookData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    }

    // insert a book into the book mongo database
    insertBook: (req, res) => {
        Book
        .create(req.body)
        .then(dbBookData => res.status(200).json(dbBookData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    }
    
    // remove a book from the book mongo database
    removeBook: (req, res) => {
        Book
        .findById(req.params.id)
        .then(dbBookData => dbBookData.remove())
        .then(dbBookData => res.json(dbBookData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    }
}
