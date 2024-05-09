const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
const { addIncome, getIncome, deleteIncome } = require('./controllers/income');
const { addExpense, getExpense, deleteExpense } = require('./controllers/expense');
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

// Root route
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Server is running' });
});

// Income routes
app.post('/api/v1/add-income', addIncome);
app.get('/api/v1/get-incomes', getIncome);
app.delete('/api/v1/delete-income/:id', deleteIncome);

// Expense routes
app.post('/api/v1/add-expense', addExpense);
app.get('/api/v1/get-expenses', getExpense);
app.delete('/api/v1/delete-expense/:id', deleteExpense);

server();
