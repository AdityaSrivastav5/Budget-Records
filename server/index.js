// index.js

const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
const { readdirSync } = require('fs');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3004;

app.use(cors({
    origin: 'https://budget-records-2.onrender.com'
}));
app.use(express.json());

// Dynamic route setup
const routesPath = './routes';
readdirSync(routesPath).forEach((file) => {
    if (file.endsWith('.js')) {
        const route = require(`${routesPath}/${file}`);
        app.use('/api/v1', route);
    }
});

// MongoDB connection
const server = async () => {
    try {
        await db();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
    }
};

server();
