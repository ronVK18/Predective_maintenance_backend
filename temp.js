const WebSocket = require('ws');

// Dummy dataset
const dummyData = [
    { id: 1, name: 'Alice', age: 25 },
    { id: 2, name: 'Bob', age: 30 },
    { id: 3, name: 'Charlie', age: 35 },
];

// Create WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

// Broadcast function
function broadcastDummyData() {
    const data = {
        type: 'newData',
        payload: dummyData,
    };

    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
}

// Handle WebSocket connection
wss.on('connection', (ws) => {
    console.log('New client connected');

    ws.on('message', (message) => {
        console.log('Received:', message);
        // Handle incoming messages if needed
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

// Periodically send dummy data to clients

