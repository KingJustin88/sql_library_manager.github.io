Project 8 - SQL Library Manager

Setup and Initialize Project:
node_modules folder and congig folder is stored in the 
.gitignore file 
Running npm install adds all necessary dependencies.
Running npm start launches the app.

Models:
Book
title - string
author - string
genre - string
year - integer
Uses the appropriate Model validation to ensure that the title,author, genre, and year properties will have values when the form is submitted.

Routes:
/ - get
/books - get
/books/new - get
/books/new - post
/books/:id - get
/books/:id - post
/books/:id/delete - post

Views:
layout.pug
index.pug
new-book.pug
update-book.pug
error.pug
route-error.pug
page-not-found.pug

Form Fields:
If title, author, genre, or year fields are empty, form will not submit and page shows friendly error message.
Forms employ Sequelize Model validation rather than HTML’s built in validation.
Clicking on an input’s label brings focus to corresponding input.

Errors:
If routing to a non-existent book id, project uses a global error handler to render a friendly route-error page.
If navigating to a non-existent route the project renders a user friendly "Page Not Found" page.

Styles and Layout:
Project uses supplied styles.
General layout matches example markup pages.

