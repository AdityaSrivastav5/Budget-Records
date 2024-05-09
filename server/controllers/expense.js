const ExpenseSchema = require("../models/ExpenseModel");

exports.addExpense = async (req, res) => {
    // Extract data from request body
    const { title, amount, category, description, date } = req.body;

    // Create new expense object
    const expense = ExpenseSchema({
        title,
        amount,
        category,
        description,
        date
    });

    try {
        // Validation
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        if (amount <= 0 || typeof amount !== 'number') {
            return res.status(400).json({ message: 'Amount must be positive' });
        }

        // Save expense to database
        await expense.save();
        res.status(200).json({ message: 'Expense Added' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getExpense = async (req, res) => {
    try {
        // Retrieve all expenses and sort by createdAt in descending order
        const expenses = await ExpenseSchema.find().sort({ createdAt: -1 });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.deleteExpense = async (req, res) => {
    const { id } = req.params;
    try {
        // Find expense by ID and delete it
        const expense = await ExpenseSchema.findByIdAndDelete(id);
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        res.status(200).json({ message: 'Expense Deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
