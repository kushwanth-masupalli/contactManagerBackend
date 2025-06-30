const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {type:String,required:true},
  phoneno:{type:String,required:true},
  email: { type: String, required: true},},
  {
       timestamps : true
   }
);

const contact = mongoose.model('Contact', userSchema,'contacts');
module.exports =contact;