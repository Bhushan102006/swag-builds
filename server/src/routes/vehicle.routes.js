const express = require("express");
const {
  createVehicle,
  getVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
} = require("../controllers/vehicle.controllers");
const { isLoggedIn, authorizeRoles } = require("../middlewares/auth.middleware");

const router = express.Router();

// View: Fleet Manager, Dispatcher, Financial Analyst
router.get("/", isLoggedIn, authorizeRoles("Fleet Manager", "Dispatcher", "Financial Analyst"), getVehicles);
router.get("/:id", isLoggedIn, authorizeRoles("Fleet Manager", "Dispatcher", "Financial Analyst"), getVehicleById);

// Full: Fleet Manager only
router.post("/", isLoggedIn, authorizeRoles("Fleet Manager"), createVehicle);
router.put("/:id", isLoggedIn, authorizeRoles("Fleet Manager"), updateVehicle);
router.delete("/:id", isLoggedIn, authorizeRoles("Fleet Manager"), deleteVehicle);

module.exports = router;
