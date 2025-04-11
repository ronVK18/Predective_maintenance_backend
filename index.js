require('dotenv').config();
const express = require('express');
const WebSocket = require('ws');
const path = require('path');
const connectDB = require('./db/connect');
const dataEntry=require('./routes/dataEntry');
const MachineData = require('./models/machineData');
const app = express();
const PORT = 3000;
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend URL
  credentials: true,
}));
const url=process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase';
connectDB(url)
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); 

const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const wss = new WebSocket.Server({ server });

async function broadcastData() {
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
      console.log("Fetching Latest Data")
    const recentData = await MachineData.find({
      timestamp: { $gte: thirtyMinutesAgo }
    }).sort({ timestamp: -1 });
  
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(recentData));
    }
  });
}

// WebSocket connection handler
wss.on('connection', (ws) => {
  console.log('New client connected');
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Broadcast data every 3 seconds
// setInterval(broadcastData, 20000);

app.get('/', (req, res) => {
  res.send("Working")
});
app.use("/api/data",dataEntry)