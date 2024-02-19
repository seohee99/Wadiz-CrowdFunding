require('dotenv').config();
var mongoose = require("mongoose");
var express = require('express');
var router = express.Router();
var insertDataToDB = require('../data/dataToDB.js')

// DB Connection
var DB_USER = process.env.DB_USER;
var DB_PASSWORD = process.env.DB_PASSWORD;
var DB_HOST = process.env.DB_HOST;
var DB_NAME = process.env.DB_NAME;

var DB_URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`;
mongoose.connect(DB_URL, { retryWrites: true, w: "majority"} )
        .then( () => {
          console.log("Connected Successful")
          insertDataToDB();})
        .catch(err => console.log(err));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
