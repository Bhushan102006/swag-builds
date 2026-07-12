const mongoose = require("mongoose");
const Maintenance = require("../models/maintenance.model");
const Vehicle = require("../models/vehicle.model");

// Create a maintenance record (Vehicle → In Shop)
async function createMaintenance(req, res) {
  try {
    const { vehicle: vehicleId, maintenanceType, cost, description, startDate } = req.body;

    if (!vehicleId || !maintenanceType) {
      return res.status(400).json({
        success: false,
        message: "vehicle and maintenanceType are required fields.",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid vehicle ID format.",
      });
    }

    // Fetch and validate the vechile 
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found.",
      });
    }

    // A vehicle that is already Retired cannot be sent for maintenance
    if (vehicle.status === "Retired") {
      return res.status(400).json({
        success: false,
        message: "A retired vehicle cannot be sent for maintenance.",
      });
    }

    // A vehicle already On Trip cannot be put In Shop
    if (vehicle.status === "On Trip") {
      return res.status(400).json({
        success: false,
        message: "Vehicle is currently On Trip and cannot be sent for maintenance.",
      });
    }

    // Create the maintenance record
    const maintenance = await Maintenance.create({
      vehicle: vehicleId,
      maintenanceType,
      cost: cost || 0,
      description: description || "",
      startDate: startDate || new Date(),
      status: "Open",
    });

    // Set vehicle status to In Shop
    vehicle.status = "In Shop";
    await vehicle.save();

    return res.status(201).json({
      success: true,
      message: "Maintenance record created and vehicle moved to In Shop.",
      maintenance,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: messages,
      });
    }

    console.error("Create Maintenance Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

// Get all maintenance records (with filters)
async function getMaintenances(req, res) {
  try {
    const { status, vehicle } = req.query;
    const query = {};

    if (status) query.status = status;
    if (vehicle && mongoose.Types.ObjectId.isValid(vehicle)) {
      query.vehicle = vehicle;
    }

    const records = await Maintenance.find(query)
      .populate("vehicle")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: records.length,
      maintenances: records,
    });
  } catch (error) {
    console.error("Get Maintenances Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

// Get a single maintenance record by ID
async function getMaintenanceById(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid maintenance ID format.",
      });
    }

    const maintenance = await Maintenance.findById(id).populate("vehicle");

    if (!maintenance) {
      return res.status(404).json({
        success: false,
        message: "Maintenance record not found.",
      });
    }

    return res.status(200).json({
      success: true,
      maintenance,
    });
  } catch (error) {
    console.error("Get Maintenance By ID Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

// Close a maintenance record (Vehicle → Available)
async function closeMaintenance(req, res) {
  try {
    const { id } = req.params;
    const { cost, description } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid maintenance ID format.",
      });
    }

    const maintenance = await Maintenance.findById(id);

    if (!maintenance) {
      return res.status(404).json({
        success: false,
        message: "Maintenance record not found.",
      });
    }

    // Guard: already closed
    if (maintenance.status === "Closed") {
      return res.status(400).json({
        success: false,
        message: "This maintenance record is already Closed.",
      });
    }

    // Update maintenance record
    maintenance.status = "Closed";
    maintenance.endDate = new Date();
    if (cost !== undefined) maintenance.cost = cost;
    if (description !== undefined) maintenance.description = description;

    await maintenance.save();

    // Set vehicle status back to Available
    const vehicle = await Vehicle.findById(maintenance.vehicle);
    if (vehicle) {
      vehicle.status = "Available";
      await vehicle.save();
    }

    return res.status(200).json({
      success: true,
      message: "Maintenance closed and vehicle is now Available.",
      maintenance,
    });
  } catch (error) {
    console.error("Close Maintenance Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

module.exports = {
  createMaintenance,
  getMaintenances,
  getMaintenanceById,
  closeMaintenance,
};
