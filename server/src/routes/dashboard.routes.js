const express = require("express");
const { getDashboard } = require("../controllers/dashboard.controllers");
const { isLoggedIn, authorizeRoles } = require("../middlewares/auth.middleware");

const router = express.Router();

// Analytics: Fleet Manager, Financial Analyst
router.get("/", isLoggedIn, authorizeRoles("Fleet Manager", "Financial Analyst"), getDashboard);

module.exports = router;
