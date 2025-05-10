const mongoose = require('mongoose');

const donorSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    age: { type: Number, required: true },
    sex: { type: String, enum: ['M', 'F', 'Other'], required: true },
    address: { type: String, required: true },
    bloodType: { type: String, required: true },
    bloodCode: { type: String },
    donationHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Donor', donorSchema);