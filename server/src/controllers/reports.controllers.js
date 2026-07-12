const FuelLog = require("../models/fuelLog.model");
const Maintenance = require("../models/maintenance.model");
const Trip = require("../models/trip.model");

async function getReports(req, res) {
  try {
    // Run all aggregations in parallel
    const [fuelResult, maintenanceResult, totalTrips, completedTrips] = await Promise.all([
      // Sum of all fuel costs
      FuelLog.aggregate([
        { $group: { _id: null, total: { $sum: "$cost" } } },
      ]),
      // Sum of all maintenance costs
      Maintenance.aggregate([
        { $group: { _id: null, total: { $sum: "$cost" } } },
      ]),
      Trip.countDocuments(),
      Trip.countDocuments({ status: "Completed" }),
    ]);

    const totalFuelCost = fuelResult.length > 0 ? fuelResult[0].total : 0;
    const totalMaintenanceCost = maintenanceResult.length > 0 ? maintenanceResult[0].total : 0;
    const totalExpenses = totalFuelCost + totalMaintenanceCost;

    return res.status(200).json({
      success: true,
      data: {
        totalFuelCost,
        totalMaintenanceCost,
        totalExpenses,
        totalTrips,
        completedTrips,
      },
    });
  } catch (error) {
    console.error("Reports Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

module.exports = { getReports };
