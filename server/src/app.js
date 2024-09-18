const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mapZoneRoutes = require("./routes/mapZoneRoutes.js");
const bodyParser = require('body-parser');
const Ai = require('./routes/Ai.routes.js');
const { Server } = require('socket.io');

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Parse application/json
app.use(bodyParser.json());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json({ limit: '20kb' }));
app.use(express.urlencoded({ extended: true, limit: '20kb' }));
app.use(express.static('public'));
app.use(cookieParser());

const userRouter = require('./routes/users.routes.js');
const campRouter = require('./routes/camp.routes.js');
app.use('/api/v1/users', userRouter);
app.use('/api/v1/camp', campRouter);
app.use('/api/mapzone', mapZoneRoutes);
app.use('/api/v1/ai', Ai);

module.exports = app;
