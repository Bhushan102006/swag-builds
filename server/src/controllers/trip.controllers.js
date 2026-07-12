const mongoose = require("mongoose");
const Trip = require("../models/trip.model");
const Vehicle = require("../models/vehicle.model");
const Driver = require("../models/driver.model");

// Create a new Trip (with thorough business rules verification)
async function createTrip(req, res) {
  try {
    const { source, destination, vehicle: vehicleId, driver: driverId, cargoWeight, plannedDistance } = req.body;

    // 1. Basic validation of input
    if (!source || !destination || !vehicleId || !driverId || cargoWeight === undefined || plannedDistance === undefined) {
      return res.status(400).json({
        success: false,
        message: "Missing required trip fields (source, destination, vehicle, driver, cargoWeight, plannedDistance).",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(vehicleId) || !mongoose.Types.ObjectId.isValid(driverId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid vehicle or driver ID format.",
      });
    }

    // 2. Fetch Vehicle and verify business rules
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found.",
      });
    }

    // Check Vehicle Status: Available? NOT In Shop? NOT Retired? NOT On Trip?
    if (vehicle.status !== "Available") {
      return res.status(400).json({
        success: false,
        message: `Vehicle is not available for a new trip (Current status: ${vehicle.status}).`,
      });
    }

    // 3. Fetch Driver and verify business rules
    const driver = await Driver.findById(driverId);
    if (!driver) {
      return res.status(404).json({
        success: false,
        message: "Driver not found.",
      });
    }

    // Check Driver Status: Available? NOT Suspended? NOT On Trip?
    if (driver.status !== "Available") {
      return res.status(400).json({
        success: false,
        message: `Driver is not available for a new trip (Current status: ${driver.status}).`,
      });
    }

    // Check Driver License Expiration (License NOT Expired?)
    if (typeof driver.isLicenseExpired === "function" ? driver.isLicenseExpired() : new Date() > new Date(driver.licenseExpiryDate)) {
      return res.status(400).json({
        success: false,
        message: "Driver's license is expired.",
      });
    }

    // 4. Verify Cargo limit (Cargo <= Vehicle Capacity)
    if (Number(cargoWeight) > vehicle.maxLoadCapacity) {
      return res.status(400).json({
        success: false,
        message: `Cargo weight (${cargoWeight}) exceeds the vehicle's maximum load capacity (${vehicle.maxLoadCapacity}).`,
      });
    }

    // 5. Create Draft Trip
    const trip = await Trip.create({
      source,
      destination,
      vehicle: vehicleId,
      driver: driverId,
      cargoWeight,
      plannedDistance,
      status: "Draft",
    });

    return res.status(201).json({
      success: true,
      message: "Trip created successfully in Draft status",
      trip,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: messages,
      });
    }

    console.error("Create Trip Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

// Get all trips (with status and populate)
async function getTrips(req, res) {
  try {
    const { status } = req.query;
    const query = {};

    if (status) {
      query.status = status;
    }

    const trips = await Trip.find(query)
      .populate("vehicle")
      .populate("driver")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: trips.length,
      trips,
    });
  } catch (error) {
    console.error("Get Trips Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

// Get single trip by ID
async function getTripById(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid trip ID format.",
      });
    }

    const trip = await Trip.findById(id)
      .populate("vehicle")
      .populate("driver");

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found.",
      });
    }

    return res.status(200).json({
      success: true,
      trip,
    });
  } catch (error) {
    console.error("Get Trip By ID Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

// Dispatch Trip (PATCH /trip/:id/dispatch)
async function dispatchTrip(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid trip ID format.",
      });
    }

    // Fetch the Trip
    const trip = await Trip.findById(id);
    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found.",
      });
    }

    // Verify trip status is Draft
    if (trip.status !== "Draft") {
      return res.status(400).json({
        success: false,
        message: `Only Draft trips can be dispatched. (Current status: ${trip.status})`,
      });
    }

    // Fetch vehicle and driver to ensure they are still available
    const vehicle = await Vehicle.findById(trip.vehicle);
    const driver = await Driver.findById(trip.driver);

    if (!vehicle || vehicle.status !== "Available") {
      return res.status(400).json({
        success: false,
        message: "Vehicle is no longer available to be dispatched.",
      });
    }

    if (!driver || driver.status !== "Available") {
      return res.status(400).json({
        success: false,
        message: "Driver is no longer available to be dispatched.",
      });
    }

    // Update statuses
    trip.status = "Dispatched";
    trip.dispatchDate = new Date();

    vehicle.status = "On Trip";
    driver.status = "On Trip";

    // Save changes
    await vehicle.save();
    await driver.save();
    await trip.save();

    return res.status(200).json({
      success: true,
      message: "Trip successfully Dispatched",
      trip,
    });
  } catch (error) {
    console.error("Dispatch Trip Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

// Complete Trip (PATCH /trip/:id/complete)
async function completeTrip(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid trip ID format.",
      });
    }

    // Fetch the Trip
    const trip = await Trip.findById(id);
    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found.",
      });
    }

    // Verify trip status is Dispatched
    if (trip.status !== "Dispatched") {
      return res.status(400).json({
        success: false,
        message: `Only Dispatched trips can be completed. (Current status: ${trip.status})`,
      });
    }

    // Fetch vehicle and driver
    const vehicle = await Vehicle.findById(trip.vehicle);
    const driver = await Driver.findById(trip.driver);

    // Update statuses
    trip.status = "Completed";
    trip.completedDate = new Date();

    if (vehicle) {
      vehicle.status = "Available";
      await vehicle.save();
    }

    if (driver) {
      driver.status = "Available";
      await driver.save();
    }

    await trip.save();

    return res.status(200).json({
      success: true,
      message: "Trip successfully Completed",
      trip,
    });
  } catch (error) {
    console.error("Complete Trip Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

// Cancel Trip (PATCH /trip/:id/cancel)
async function cancelTrip(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid trip ID format.",
      });
    }

    // Fetch the Trip
    const trip = await Trip.findById(id);
    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found.",
      });
    }

    // Verify trip has not been completed or already cancelled
    if (trip.status === "Completed" || trip.status === "Cancelled") {
      return res.status(400).json({
        success: false,
        message: `Trip is already ${trip.status} and cannot be cancelled.`,
      });
    }

    const previousStatus = trip.status;
    trip.status = "Cancelled";

    // If trip was Dispatched, we must release the vehicle and driver back to Available status
    if (previousStatus === "Dispatched") {
      const vehicle = await Vehicle.findById(trip.vehicle);
      const driver = await Driver.findById(trip.driver);

      if (vehicle) {
        vehicle.status = "Available";
        await vehicle.save();
      }

      if (driver) {
        driver.status = "Available";
        await driver.save();
      }
    }

    await trip.save();

    return res.status(200).json({
      success: true,
      message: "Trip successfully Cancelled",
      trip,
    });
  } catch (error) {
    console.error("Cancel Trip Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

module.exports = {
  createTrip,
  getTrips,
  getTripById,
  dispatchTrip,
  completeTrip,
  cancelTrip,
};
