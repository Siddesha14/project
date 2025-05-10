const mongoose = require('mongoose');

const hospitalSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    hospitalId: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    location: { type: String, required: true },
    contact: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Hospital', hospitalSchema);