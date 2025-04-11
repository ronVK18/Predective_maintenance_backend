const mongoose = require('mongoose');

const machineDataSchema = new mongoose.Schema({
  // Required parameters from your specification
  airTemperature: {  // in Kelvin
    type: Number,
    required: true
  },
  processTemperature: {  // in Kelvin
    type: Number,
    required: true
  },
  rotationalSpeed: {  // in rpm
    type: Number,
    required: true
  },
  torque: {  // in Newton-meters
    type: Number,
    required: true
  },
  toolWear: {  // in minutes
    type: Number,
    required: true
  },
  
  // Automatic timestamp
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  
});

// Create the model
const MachineData = mongoose.model('MachineData', machineDataSchema);

module.exports = MachineData;