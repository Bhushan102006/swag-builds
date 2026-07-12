const express = require("express");
const { createFuelLog, getFuelLogs } = require("../controllers/fuelLog.controllers");

const router = express.Router();

router.post("/", createFuelLog);
router.get("/", getFuelLogs);

module.exports = router;
