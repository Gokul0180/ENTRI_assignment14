const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Customer = require('../models/Customer');

// @route GET /api/customers
// @desc Get all customers for user
router.get('/', auth, async (req, res) => {
  try {
    const customers = await Customer.find({ createdBy: req.user.id })
      .sort({ createdAt: -1 });

    res.json(customers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route POST /api/customers
// @desc Create a customer
router.post(
  '/',
  [auth, [check('name', 'Name is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, company, notes } = req.body;

    try {
      const newCustomer = new Customer({
        name,
        email,
        phone,
        company,
        notes,
        createdBy: req.user.id
      });

      const customer = await newCustomer.save();
      res.json(customer);

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route PUT /api/customers/:id
// @desc Update customer
router.put('/:id', auth, async (req, res) => {
  const { name, email, phone, company, notes } = req.body;

  const customerFields = {};
  if (name) customerFields.name = name;
  if (email) customerFields.email = email;
  if (phone) customerFields.phone = phone;
  if (company) customerFields.company = company;
  if (notes) customerFields.notes = notes;

  try {
    let customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({ msg: 'Customer not found' });
    }

    if (customer.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    customer = await Customer.findByIdAndUpdate(
      req.params.id,
      { $set: customerFields },
      { new: true }
    );

    res.json(customer);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route DELETE /api/customers/:id
// @desc Delete customer
router.delete('/:id', auth, async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({ msg: 'Customer not found' });
    }

    if (customer.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Customer.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Customer removed' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
