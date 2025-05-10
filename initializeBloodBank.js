const mongoose = require('mongoose');
const BloodBank = require('./models/BloodBank');
require('dotenv').config();

const initialize = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    const existing = await BloodBank.findOne();
    if (existing) {
      console.log('Blood Bank already exists');
      return;
    }

    const bloodBank = await BloodBank.create({
      bloodUnits: [
        { bloodType: "A+", quantity: 15 },
        { bloodType: "A-", quantity: 8 },
        { bloodType: "B+", quantity: 12 },
        { bloodType: "B-", quantity: 5 },
        { bloodType: "AB+", quantity: 7 },
        { bloodType: "AB-", quantity: 3 },
        { bloodType: "O+", quantity: 20 },
        { bloodType: "O-", quantity: 10 }
      ]
    });

    console.log('Blood Bank initialized:', bloodBank);
  } catch (error) {
    console.error('Initialization failed:', error);
  } finally {
    mongoose.disconnect();
  }
};

initialize();