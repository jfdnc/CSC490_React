const express = require('express')
const mongoose = require('mongoose')
const app = express()

var db = mongoose.connect('mongodb://admin:csc490@108.234.184.90/admin');
mongoose.connection.on('error', function() {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
});

var Schema = mongoose.Schema

var testSchema = new Schema({
	title:{type: String, required: true},
	content: String,
	author: String
},{collection: 'test-data'});

var UserData = mongoose.model('firstTest',testSchema);




/*
mongoose.connection.collections['collectionName'].drop( function(err) { console.log('collection dropped');}); 

*/