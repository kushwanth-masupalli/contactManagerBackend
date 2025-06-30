const mongoose = require('mongoose');

const connectToDb = ()=>{
    mongoose.connect('mongodb://127.0.0.1:27017/contactsDB')
  .then(() => console.log('Connected to MongoDB via Mongoose'))
  .catch((err) => console.error('MongoDB connection error:', err));

}

module.exports = connectToDb;