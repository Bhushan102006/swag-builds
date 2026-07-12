const mongoose = require("mongoose");
const FuelLog = require("../models/fuelLog.model");

// POST /api/fuel - Create a fuel log entry
async function createFuelLog(req, res) {
  try {
    const { vehicle, liters, cost, date } = req.body;

    if (!vehicle || liters === undefined || cost === undefined) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields (vehicle, liters, cost).",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(vehicle)) {
      return res.status(400).json({
        success: false,
        message: "Invalid vehicle ID format.",
      });
    }

    const fuelLog = await FuelLog.create({ vehicle, liters, cost, date });

    return res.status(201).json({
      success: true,
      message: "Fuel log created successfully.",
      fuelLog,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: "Validation Error", errors: messages });
    }
    console.error("Create FuelLog Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

// GET /api/fuel - Return all fuel logs (populated vehicle)
async function getFuelLogs(req, res) {
  try {
    const { vehicle } = req.query;
    const query = {};

    if (vehicle) {
      if (!mongoose.Types.ObjectId.isValid(vehicle)) {
        return res.status(400).json({ success: false, message: "Invalid vehicle ID format." });
      }
      query.vehicle = vehicle;
    }

    const fuelLogs = await FuelLog.find(query)
      .populate("vehicle")
      .sort({ date: -1 });

    return res.status(200).json({
      success: true,
      count: fuelLogs.length,
      fuelLogs,
    });
  } catch (error) {
    console.error("Get FuelLogs Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

module.exports = { createFuelLog, getFuelLogs };
