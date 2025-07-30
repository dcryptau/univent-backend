if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Models
const User = require('./models/User');

// Routes
const userRoute = require('./routes/user');
const additionalDetailsRoute = require('./routes/additionalDetails');
const eventRoute = require('./routes/event');

// Cloudinary
const cloudinary = require('cloudinary');
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

// Connect to MongoDB

mongoose.connect(process.env.DB_URL)
    // .then(() => // console.log('Connected to MongoDB'))
    .catch(err => console.error('Connection error:', err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cookieParser())
app.use(cors());

// CORS headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// const allowedOrigins = [
//   'http://localhost:5173',                     // Dev frontend
//   'http://localhost:4173',                     // Dev build frontend
//     'https://univent-g6t5.onrender.com'     // Render frontend
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     // Allow requests with no origin (like Postman)
//     if (!origin) return callback(null, true);
//     if (allowedOrigins.includes(origin)) {
//       return callback(null, true);
//     } else {
//       return callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true, // if using cookies or auth headers
// }));

// Routes
app.use('/', userRoute);
app.use('/', additionalDetailsRoute);
app.use('/', eventRoute);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    // console.log(`Server listening on port ${PORT}`);
});
