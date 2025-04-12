const mongoose = require('mongoose');

const machinDetailSchema = new mongoose.Schema({
  image: [String], // array of image URLs
  name: { type: String, required: true },
  machineId: { type: String, required: true, unique: true },
  status: { type: String, required: true },
  location: { type: String, required: true },
  installDate: { type: Date, required: true },
  lastMaintenance: { type: Date, required: true },
  nextMaintenance: { type: Date, required: true },
  manufacturer: { type: String, required: true },
  model: { type: String, required: true }
});

module.exports = mongoose.model('machinDetail', machinDetailSchema);