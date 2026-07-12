const express = require("express");
const {
  createDriver,
  getDrivers,
  getDriverById,
  updateDriver,
  deleteDriver,
} = require("../controllers/driver.controllers");
const { isLoggedIn, authorizeRoles } = require("../middlewares/auth.middleware");

const router = express.Router();

// Full: Fleet Manager, Safety Officer
router.post("/", isLoggedIn, authorizeRoles("Fleet Manager", "Safety Officer"), createDriver);
router.get("/", isLoggedIn, authorizeRoles("Fleet Manager", "Safety Officer"), getDrivers);
router.get("/:id", isLoggedIn, authorizeRoles("Fleet Manager", "Safety Officer"), getDriverById);
router.put("/:id", isLoggedIn, authorizeRoles("Fleet Manager", "Safety Officer"), updateDriver);
router.delete("/:id", isLoggedIn, authorizeRoles("Fleet Manager", "Safety Officer"), deleteDriver);

module.exports = router;
