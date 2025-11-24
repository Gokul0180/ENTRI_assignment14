const mongoose = require('mongoose');


const CustomerSchema = new mongoose.Schema({
name: { type: String, required: true },
email: { type: String },
phone: { type: String },
company: { type: String },
notes: { type: String },
createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Customer', CustomerSchema);