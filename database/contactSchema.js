const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name:    { type: String, required: true },
  phoneno: { type: String, required: true },
  email:   { type: String, required: true }
}, { timestamps: true });

const Contact = mongoose.model('Contact', contactSchema, 'contacts');
module.exports = Contact;
