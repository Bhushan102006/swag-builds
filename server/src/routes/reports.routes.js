const express = require("express");
const { getReports } = require("../controllers/reports.controllers");
const { isLoggedIn, authorizeRoles } = require("../middlewares/auth.middleware");

const router = express.Router();

// Analytics: Fleet Manager, Financial Analyst
router.get("/", isLoggedIn, authorizeRoles("Fleet Manager", "Financial Analyst"), getReports);

module.exports = router;
