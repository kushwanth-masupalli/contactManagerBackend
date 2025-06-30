const asyncHandler = require('express-async-handler');
const Contact = require('../database/contactSchema.js');

// GET all contacts
const getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
});

// GET contact by ID
const getContactById = asyncHandler(async (req, res) => {
  const newContact = await Contact.findById(req.params.id);
  if (!newContact) {
    res.status(404);
    throw new Error('Contact not found');
  }
  res.status(200).json(newContact);
});

// UPDATE contact by ID
const updateContact = asyncHandler(async (req, res) => {
  const newContact = await Contact.findById(req.params.id);
  if (!newContact) {
    res.status(404);
    throw new Error('Contact not found');
  }

  const { name, email, phoneno } = req.body;
  console.log(name, email, phoneno); 

  newContact.name = name || newContact.name;
  newContact.email = email || newContact.email;
  newContact.phoneno = phoneno || newContact.phoneno;

  const updatedContact = await newContact.save();
  res.status(200).json(updatedContact);
});

// CREATE new contact
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phoneno } = req.body;
  if (!name || !email || !phoneno) {
    res.status(400);
    throw new Error('All fields are mandatory');
  }

  const newContact = new Contact({
    name,
    email,
    phoneno,
  });

  const savedContact = await newContact.save();
  console.log('Contact saved successfully', savedContact);
  res.status(201).json(savedContact);
});

// DELETE contact by ID
const deleteContactById = asyncHandler(async (req, res) => {
  const newContact = await Contact.findById(req.params.id);
  if (!newContact) {
    res.status(404);
    throw new Error('Contact not found');
  }

  await newContact.remove();
  res.status(200).json({ message: `Deleted contact with id ${req.params.id}` });
});

module.exports = {
  getAllContacts,
  getContactById,
  updateContact,
  createContact,
  deleteContactById,
};
