// import express & controller
const router = require('express').Router();
const bookController = require('../../controllers/bookController');

//define routes

// GET & POST for /api/notes
router
    .route('/')
    .get(bookController.getBooks)
    .post(bookController.insertBook)

// GET & PUT & DELETE
router
    .route('/:id')
    .get(bookController.getOneBook)
    .put(bookController.updateBook)
    .delete(bookController.removeBook)

module.exports = router;