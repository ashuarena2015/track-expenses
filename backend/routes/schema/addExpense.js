const mongoose = require("mongoose");

const addExpenseSchema = new mongoose.Schema({
    id: { type: String, auto: true },
    description: { type: String, required: true, trim: true }, // Required name with trimming
    amount: { type: Number, required: true, min: 1 }, // Age must be at least 1
    date: { type: Number, required: true }, // Automatically set timestamp // already sending timestamp
    userId: { type: String, auto: true },
});

const updateExpenseSchema = new mongoose.Schema({
    description: { type: String, required: true, trim: true }, // Required name with trimming
    amount: { type: Number, required: true, min: 1 }, // Age must be at least 1
    date: { type: Number, required: true }, // Automatically set timestamp // already sending timestamp
}, { _id: false });

// Create and export User model
const AddExpense = mongoose.model("AddExpense", addExpenseSchema);
const UpdateExpenseSchema = mongoose.model("UpdateExpense", updateExpenseSchema);
module.exports = { AddExpense, UpdateExpenseSchema };
