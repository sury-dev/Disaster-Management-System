require('dotenv').config();
const app = require('./app');
const connectDB = require('./db/index.js');
const { createServer } = require('http');
const { Server } = require('socket.io');

connectDB()
    .then(() => {
        const server = createServer(app);
        const io = new Server(server, {
            cors: {
                origin: "http://localhost:5173", // Update the URL to match your admin dashboard's URL
                methods: ["GET", "POST"]
            }
        });

        // Listen for incoming socket connections
        io.on('connection', (socket) => {
            console.log('A user connected:', socket.id);

            // Listen for live location updates from the user dashboard
            socket.on('user-location', (locationData) => {
                // Broadcast location updates to all connected admins
                socket.broadcast.emit('admin-receive-location', locationData);
            });

            socket.on('disconnect', () => {
                console.log('A user disconnected:', socket.id);
            });
        });

        server.listen(process.env.PORT || 8000, () => {
            console.log(`Server is active on ${process.env.PORT}`);
        });

        app.on("Error", (error) => {
            console.log("ERROR : " + error);
            throw error;
        });
    })
    .catch((err) => {
        console.log("Mongo DB connection failure !!! : ", err);
    });
