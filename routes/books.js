const express = require('express');
const router = express.Router();
const Book = require('../models').Book;

/* Handler function to wrap each route. */
function asyncHandler(cb){
  return async(req, res, next) => {
    try {
      await cb(req, res, next)
    } catch(error){
      res.status(500).send(error);
    }
  }
}

/* redirect to books listing. */
router.get('/', asyncHandler(async (req, res) => {
  const books = await Book.findAll({
    order: [['id', 'ASC']]
  })
  res.render("books/index", { books, title: "Books" });
}));

/* GET books listing. */
router.get('/books', asyncHandler(async (req, res) => {

  res.render("books/index", {books: {}, title: "Book"});
}));

/* GET new books listing. */
router.get('/new', asyncHandler(async (req, res) => {
  res.render("books/new-book", {book: {}, title: "New Book"});
}));

/* POST create new book and add to database */
router.post('/new', asyncHandler(async (req, res) => {
  try{
    const book = await Book.create(req.body);
    res.redirect("/books")
  } catch (error) {
    // catches and validates title, author, genre and year
    if (error.name === "SequelizeValidationError") {
      var book = Book.build(req.body);
        book.id = req.params.id
      res.render("books/new-book", {book, errors: error.errors, title: "New Book"})  
    } 
  }
}));

/* GET edit book */
router.get('/:id', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if(book) {
    res.render("books/update-book", {book, title: book.title})
  } else {
    // route error for non-existent book id
    res.render("books/route-error")
    res.sendStatus(404)
  }
}));


/* POST edit book */
router.post('/:id', asyncHandler(async (req, res) => {
  let book;
  try {
    const book = await Book.findByPk(req.params.id);
    if(book) {
      await book.update(req.body)
      res.redirect("/books");
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    // catches and validates title, author, genre and year
    if(error.name === "SequelizeValidationError") {
      book = await Book.build(req.body);
      book.id = req.params.id // needs correct book
      res.render("books/update-book", {book, errors: error.errors, title: "Edit Book"})
    } else {
      throw error;
    }
  }
}));

/* POST delete book */
router.post('/:id/delete', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if(book) {
    await book.destroy()
    res.redirect("/books");
  } else {
    res.sendStatus(404)
  }
}));


module.exports = router;
