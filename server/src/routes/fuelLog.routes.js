const express = require("express");
const { createFuelLog, getFuelLogs } = require("../controllers/fuelLog.controllers");
const { isLoggedIn, authorizeRoles } = require("../middlewares/auth.middleware");

const router = express.Router();

// Full: Financial Analyst only
router.post("/", isLoggedIn, authorizeRoles("Financial Analyst"), createFuelLog);
router.get("/", isLoggedIn, authorizeRoles("Financial Analyst"), getFuelLogs);

module.exports = router;
