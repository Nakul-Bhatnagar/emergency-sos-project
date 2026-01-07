// routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
} = require('../controllers/contactController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getContacts);
router.post('/', protect, createContact);
router.put('/:id', protect, updateContact);
router.delete('/:id', protect, deleteContact);

module.exports = router;
