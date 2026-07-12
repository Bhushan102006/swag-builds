const mongoose = require("mongoose");
const Vehicle = require("../models/vehicle.model");

// Create a new vehicle
async function createVehicle(req, res) {
  try {
    const { registrationNumber, vehicleName, vehicleType, maxLoadCapacity, odometer, acquisitionCost, status } = req.body;

    const newVehicle = await Vehicle.create({
      registrationNumber,
      vehicleName,
      vehicleType,
      maxLoadCapacity,
      odometer,
      acquisitionCost,
      status,
    });

    return res.status(201).json({
      success: true,
      message: "Vehicle registered successfully",
      vehicle: newVehicle,
    });
  } catch (error) {
    // Handle double database entry validation (MongoDB duplicate key error)
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "A vehicle with this registration number is already registered.",
      });
    }

    // Handle mongoose validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: messages,
      });
    }

    console.error("Create Vehicle Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

// Get all vehicles (with filters)
async function getVehicles(req, res) {
  try {
    const { status, vehicleType, search } = req.query;
    const query = {};

    // Filter criteria
    if (status) {
      query.status = status;
    }
    if (vehicleType) {
      query.vehicleType = vehicleType;
    }
    if (search) {
      // Allow searching by registrationNumber or vehicleName
      query.$or = [
        { registrationNumber: { $regex: search, $options: "i" } },
        { vehicleName: { $regex: search, $options: "i" } },
      ];
    }

    const vehicles = await Vehicle.find(query).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: vehicles.length,
      vehicles,
    });
  } catch (error) {
    console.error("Get Vehicles Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

// Get a vehicle by ID
async function getVehicleById(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid vehicle ID format.",
      });
    }

    const vehicle = await Vehicle.findById(id);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found.",
      });
    }

    return res.status(200).json({
      success: true,
      vehicle,
    });
  } catch (error) {
    console.error("Get Vehicle By ID Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

// Update a vehicle
async function updateVehicle(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid vehicle ID format.",
      });
    }

    // Capture fields for updating
    const updateData = req.body;

    // Retrieve the vehicle to run odometer verification if the odometer or status is being updated
    let vehicle = await Vehicle.findById(id);
    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found.",
      });
    }

    // Safety checks for odometer update (prevent rollback)
    if (updateData.odometer !== undefined && updateData.odometer < vehicle.odometer) {
      return res.status(400).json({
        success: false,
        message: `Odometer reading cannot be rolled back. Current reading is ${vehicle.odometer}.`,
      });
    }

    // Use findByIdAndUpdate to perform updates, enforcing validators on the modified fields
    const updatedVehicle = await Vehicle.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      success: true,
      message: "Vehicle updated successfully.",
      vehicle: updatedVehicle,
    });
  } catch (error) {
    // Handle double database entry validation (MongoDB duplicate key error)
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "A vehicle with this registration number is already registered.",
      });
    }

    // Handle mongoose validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: messages,
      });
    }

    console.error("Update Vehicle Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

// Delete a vehicle
async function deleteVehicle(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid vehicle ID format.",
      });
    }

    const deletedVehicle = await Vehicle.findByIdAndDelete(id);

    if (!deletedVehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Vehicle deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Vehicle Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

module.exports = {
  createVehicle,
  getVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
};
