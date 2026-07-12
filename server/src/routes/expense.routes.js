const express = require("express");
const { createExpense, getExpenses } = require("../controllers/expense.controllers");
const { isLoggedIn, authorizeRoles } = require("../middlewares/auth.middleware");

const router = express.Router();

// Full: Financial Analyst only
router.post("/", isLoggedIn, authorizeRoles("Financial Analyst"), createExpense);
router.get("/", isLoggedIn, authorizeRoles("Financial Analyst"), getExpenses);

module.exports = router;
