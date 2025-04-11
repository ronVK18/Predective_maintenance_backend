const express = require("express");
const MachineData = require("../models/machineData");
const router = express.Router();

router.post("/", async (req, res) => {
    try {
      const {
        airTemperature,
        processTemperature,
        rotationalSpeed,
        torque,
        toolWear,
      } = req.body; // Remove the await here
  
      console.log("Request body:", req.body); // Add this for debugging
  
      // Validate required fields
      if (
        airTemperature === undefined ||
        processTemperature === undefined ||
        rotationalSpeed === undefined ||
        torque === undefined ||
        toolWear === undefined
      ) {
        return res.status(400).json({ error: "All fields are required" });
      }
  
      const newData = new MachineData({
        airTemperature,
        processTemperature,
        rotationalSpeed,
        torque,
        toolWear,
      });
  
      const savedData = await newData.save();
      res.status(201).json(savedData);
    } catch (error) {
      console.error("Error saving data:", error);
      res.status(500).json({ error: "Server error while saving data" });
    }
  });

// 2. Route to fetch all data
router.get("/", async (req, res) => {
  try {
    const allData = await MachineData.find().sort({ timestamp: -1 });
    res.json(allData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Server error while fetching data" });
  }
});

// 3. Route to fetch latest entry
router.get("/latest", async (req, res) => {
  try {
    const latestData = await MachineData.findOne().sort({ timestamp: -1 });
    if (!latestData) {
      return res.status(404).json({ message: "No data found" });
    }
    res.json(latestData);
  } catch (error) {
    console.error("Error fetching latest data:", error);
    res.status(500).json({ error: "Server error while fetching latest data" });
  }
});
router.get('/recent', async (req, res) => {
    try {
      const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
      
      const recentData = await MachineData.find({
        timestamp: { $gte: thirtyMinutesAgo }
      }).sort({ timestamp: -1 });
      
      res.json(recentData);
    } catch (error) {
      console.error('Error fetching recent data:', error);
      res.status(500).json({ 
        error: 'Failed to fetch recent data',
        details: error.message 
      });
    }
  });
module.exports = router;