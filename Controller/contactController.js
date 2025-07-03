const asyncHandler = require('express-async-handler');
const Contact = require('../database/contactSchema');

// ✅ GET all contacts of the logged-in user
const getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.user.id });
  res.status(200).json(contacts);
});

// ✅ GET a single contact by ID (only if it belongs to the user)
const getContactById = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact || contact.user_id.toString() !== req.user.id) {
    res.status(404);
    throw new Error('Contact not found or not authorized');
  }

  res.status(200).json(contact);
});

// ✅ CREATE a new contact for the logged-in user
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phoneno } = req.body;

  if (!name || !email || !phoneno) {
    res.status(400);
    throw new Error('All fields are mandatory');
  }

  // Example fix for creating a contact
const newContact = await Contact.create({
  user_id: req.user.user.id, // <-- FIXED
  name,
  email,
  phoneno,
});

  res.status(201).json(newContact);
});

// ✅ UPDATE a contact by ID (only if user owns it)
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact || contact.user_id.toString() !== req.user.id) {
    res.status(404);
    throw new Error('Contact not found or not authorized');
  }

  const { name, email, phoneno } = req.body;

  contact.name = name || contact.name;
  contact.email = email || contact.email;
  contact.phoneno = phoneno || contact.phoneno;

  const updatedContact = await contact.save();
  res.status(200).json(updatedContact);
});

// ✅ DELETE a contact by ID (only if user owns it)
const deleteContactById = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact || contact.user_id.toString() !== req.user.id) {
    res.status(404);
    throw new Error('Contact not found or not authorized');
  }

  await contact.remove();
  res.status(200).json({ message: `Deleted contact with id ${req.params.id}` });
});

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContactById,
};
