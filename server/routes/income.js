const router = require('express').Router();

const { addIncome, getIncome, deleteIncome } = require('../controllers/income');

// Income routes
router.post('/add-income', addIncome);
router.get('/get-incomes', getIncome);
router.delete('/delete-income/:id', deleteIncome);

// Expense routes
router.post('/add-expense', addExpense);
router.get('/get-expenses', getExpense);
router.delete('/delete-expense/:id', deleteExpense);

module.exports = router;
