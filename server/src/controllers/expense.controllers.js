const mongoose = require("mongoose");
const Expense = require("../models/expense.model");

// POST /api/expenses - Create an expense
async function createExpense(req, res) {
  try {
    const { vehicle, expenseType, amount, description } = req.body;

    if (!vehicle || !expenseType || amount === undefined) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields (vehicle, expenseType, amount).",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(vehicle)) {
      return res.status(400).json({
        success: false,
        message: "Invalid vehicle ID format.",
      });
    }

    const expense = await Expense.create({ vehicle, expenseType, amount, description });

    return res.status(201).json({
      success: true,
      message: "Expense recorded successfully.",
      expense,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: "Validation Error", errors: messages });
    }
    console.error("Create Expense Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

// GET /api/expenses - Return all expenses (populated vehicle)
async function getExpenses(req, res) {
  try {
    const { vehicle } = req.query;
    const query = {};

    if (vehicle) {
      if (!mongoose.Types.ObjectId.isValid(vehicle)) {
        return res.status(400).json({ success: false, message: "Invalid vehicle ID format." });
      }
      query.vehicle = vehicle;
    }

    const expenses = await Expense.find(query)
      .populate("vehicle")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: expenses.length,
      expenses,
    });
  } catch (error) {
    console.error("Get Expenses Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

module.exports = { createExpense, getExpenses };
