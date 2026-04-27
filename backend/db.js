const mongoose = require('mongoose');

// Defining the mongoDB connection URL
const mongoURL = 'mongodb://localhost:27017/alumni'

// Set up MongoDB connection
 mongoose.connect(mongoURL)
 
 //Get the default connection
 // Mongoose maintains a default db object representing the MongoDB connection.
 const db = mongoose.connection;

 //Defines event listeners for database connection

 db.on('connected',() =>{
   console.log("Connceted to MongoDB server");
 });

db.on('error',() =>{
   console.log("MongoDB connection error");
 });

db.on('disconnected',() =>{
   console.log("MongoDB server disconnected");
 });

 module.exports = db;