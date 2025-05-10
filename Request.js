const mongoose = require('mongoose');

const requestSchema = mongoose.Schema(
  {
    hospital: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: true },
    bloodType: { type: String, required: true },
    quantity: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected', 'fulfilled'], default: 'pending' },
    urgency: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Request', requestSchema);