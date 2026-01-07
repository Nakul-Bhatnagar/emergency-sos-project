const Contact = require('../models/Contact');

// GET /api/contacts
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ contacts });
  } catch (err) {
    console.error('Get contacts error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/contacts
const createContact = async (req, res) => {
  try {
    const { name, phone, relation } = req.body;
    const contact = await Contact.create({
      user: req.user._id,
      name,
      phone,
      relation,
    });
    res.status(201).json({ contact });
  } catch (err) {
    console.error('Create contact error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// PUT /api/contacts/:id
const updateContact = async (req, res) => {
  try {
    const contact = await Contact.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json({ contact });
  } catch (err) {
    console.error('Update contact error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE /api/contacts/:id
const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json({ message: 'Contact deleted' });
  } catch (err) {
    console.error('Delete contact error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
};
