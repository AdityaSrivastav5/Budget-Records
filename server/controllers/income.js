const IncomeSchema = require("../models/incomeModel");

exports.addIncome = async (req, res) => {
    // Extract data from request body
    const { title, amount, category, description, date } = req.body;

    // Create new income object
    const income = IncomeSchema({
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

        // Save income to database
        await income.save();
        res.status(200).json({ message: 'Income Added' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getIncome = async (req, res) => {
    try {
        // Retrieve all incomes and sort by createdAt in descending order
        const incomes = await IncomeSchema.find().sort({ createdAt: -1 });
        res.status(200).json(incomes);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.deleteIncome = async (req, res) => {
    const { id } = req.params;
    try {
        // Find income by ID and delete it
        const income = await IncomeSchema.findByIdAndDelete(id);
        if (!income) {
            return res.status(404).json({ message: 'Income not found' });
        }
        res.status(200).json({ message: 'Income Deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
