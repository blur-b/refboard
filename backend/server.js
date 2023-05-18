const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// import routes
const authRoutes = require('./routes/authentication');
const { db } = require('./models/User');

// app
const app = express();

// db
const uri = process.env.ATLAS_URI
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

// middlewares
app.use(cors());
app.use(express.json());

// routes middleware
app.use('/user', authRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
