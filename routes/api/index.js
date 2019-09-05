const router = require("express").Router();
const bookRoutes = require("./book-router");

router.use('/books', bookRoutes)

module.exports = router;