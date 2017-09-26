const express = require('express')
const mongoose = require('mongoose')
const app = express()

var db = mongoose.connect('mongodb://admin:csc490@108.234.184.90/admin');
mongoose.connection.on('error', function() {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
});