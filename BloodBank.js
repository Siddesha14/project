// models/BloodBank.js
const mongoose = require('mongoose');

const bloodBankSchema = new mongoose.Schema({
  bloodUnits: [
    {
      bloodType: { type: String, required: true },
      quantity: { type: Number, default: 0 },
      lastUpdated: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('BloodBank', bloodBankSchema);