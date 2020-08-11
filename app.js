var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var routes = require('./routes/index');
var books = require('./routes/books');

var app = express(); 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/books', books);

// global 404 error handler
app.use('/', (req, res, next) => {
  console.log('Global 404 error handler called')
  res.status(404).render('books/page-not-found', {title: "Page Not Found"})
});

// globabl non-existent book id error handler
app.use((err, req, res, next) => {  
  console.log('Global non-existent book id error handler called')
  res.status(404).render('books/route-error', {title: "Error"});
});


module.exports = app;
