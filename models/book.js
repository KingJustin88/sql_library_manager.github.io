'use strict';
const Sequelize = require('sequelize');
const moment = require('moment');

module.exports = (sequelize) => {
    class Book extends Sequelize.Model {    
    }
    Book.init({
        title: {
            type: Sequelize.STRING,
            validate: {
                notEmpty: {
                    msg: 'Title is required'
                }
            }
        },
        author: {
            type: Sequelize.STRING,
            validate: {
                notEmpty: {
                    msg: 'Author is required'
                }
            }
        },
        genre: {
            type: Sequelize.STRING,
            required: false,
            allowNull: true
        }, 
        year: {
            type: Sequelize.INTEGER,
            required: false,
            allowNull: true
        }
    },{ sequelize });

    return Book;
};