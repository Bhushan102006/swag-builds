const mongoose = require("mongoose");
const Driver = require("../models/driver.model");

// Create a new driver
async function createDriver(req, res) {
  try {
    const { name, licenseNumber, licenseCategory, licenseExpiryDate, phone, safetyScore, status } = req.body;

    const newDriver = await Driver.create({
      name,
      licenseNumber,
      licenseCategory,
      licenseExpiryDate,
      phone,
      safetyScore,
      status,
    });

    return res.status(201).json({
      success: true,
      message: "Driver registered successfully",
      driver: newDriver,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "A driver with this license number is already registered.",
      });
    }

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: messages,
      });
    }

    console.error("Create Driver Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

// Get all drivers (with filters)
async function getDrivers(req, res) {
  try {
    const { status, licenseCategory, search } = req.query;
    const query = {};

    if (status) {
      query.status = status;
    }
    if (licenseCategory) {
      query.licenseCategory = licenseCategory;
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { licenseNumber: { $regex: search, $options: "i" } },
      ];
    }

    const drivers = await Driver.find(query).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: drivers.length,
      drivers,
    });
  } catch (error) {
    console.error("Get Drivers Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

// Get driver by ID
async function getDriverById(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid driver ID format.",
      });
    }

    const driver = await Driver.findById(id);

    if (!driver) {
      return res.status(404).json({
        success: false,
        message: "Driver not found.",
      });
    }

    return res.status(200).json({
      success: true,
      driver,
    });
  } catch (error) {
    console.error("Get Driver By ID Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

// Update driver details
async function updateDriver(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid driver ID format.",
      });
    }

    const updateData = req.body;

    const updatedDriver = await Driver.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedDriver) {
      return res.status(404).json({
        success: false,
        message: "Driver not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Driver updated successfully.",
      driver: updatedDriver,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "A driver with this license number is already registered.",
      });
    }

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: messages,
      });
    }

    console.error("Update Driver Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

// Delete a driver
async function deleteDriver(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid driver ID format.",
      });
    }

    const deletedDriver = await Driver.findByIdAndDelete(id);

    if (!deletedDriver) {
      return res.status(404).json({
        success: false,
        message: "Driver not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Driver deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Driver Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

module.exports = {
  createDriver,
  getDrivers,
  getDriverById,
  updateDriver,
  deleteDriver,
};
