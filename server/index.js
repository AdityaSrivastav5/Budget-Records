const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3004;

app.use(cors({
    origin: 'https://budget-records-2.onrender.com'
}));
app.use(express.json());

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

// Importing routes
const incomeRoutes = require('./routes/income');
const expenseRoutes = require('./routes/expense');

// Route setup
app.use('/api/v1', incomeRoutes);
app.use('/api/v1', expenseRoutes);

// Default route
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Server is running' });
});

module.exports = app;
