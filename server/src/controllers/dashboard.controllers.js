const Vehicle = require("../models/vehicle.model");
const Driver = require("../models/driver.model");
const Trip = require("../models/trip.model");
const Maintenance = require("../models/maintenance.model");

async function getDashboard(req, res) {
  try {
    const [
      totalVehicles,
      availableVehicles,
      onTripVehicles,
      inShopVehicles,
      totalDrivers,
      availableDrivers,
      activeTrips,
      completedTrips,
      maintenanceCount,
    ] = await Promise.all([
      Vehicle.countDocuments(),
      Vehicle.countDocuments({ status: "Available" }),
      Vehicle.countDocuments({ status: "On Trip" }),
      Vehicle.countDocuments({ status: "In Shop" }),
      Driver.countDocuments(),
      Driver.countDocuments({ status: "Available" }),
      Trip.countDocuments({ status: "Dispatched" }),
      Trip.countDocuments({ status: "Completed" }),
      Maintenance.countDocuments({ status: "Open" }),
    ]);

    // Fleet utilization: (On Trip / Total) * 100, rounded to 2 decimal places
    const fleetUtilization =
      totalVehicles > 0
        ? Math.round((onTripVehicles / totalVehicles) * 100 * 100) / 100
        : 0;

    return res.status(200).json({
      success: true,
      data: {
        totalVehicles,
        availableVehicles,
        onTripVehicles,
        inShopVehicles,
        totalDrivers,
        availableDrivers,
        activeTrips,
        completedTrips,
        maintenanceCount,
        fleetUtilization,
      },
    });
  } catch (error) {
    console.error("Dashboard Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

module.exports = { getDashboard };
