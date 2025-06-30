const express = require("express");
const router = express.Router();
const {
  createContact,
    getAllContacts,
    getContactById,
    updateContact,
    deleteContactById
}  = require('../Controller/contactController');

router.route("/").get(getAllContacts).post(createContact);

router.route("/:id").get(getContactById).delete(deleteContactById).put(updateContact);

module.exports = router;
