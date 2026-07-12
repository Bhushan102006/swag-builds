const express = require("express");
const {
  createMaintenance,
  getMaintenances,
  closeMaintenance,
} = require("../controllers/maintenance.controllers");
const { isLoggedIn, authorizeRoles } = require("../middlewares/auth.middleware");

const router = express.Router();

// Fleet Manager: full access | Safety Officer: full access
router.post("/", isLoggedIn, authorizeRoles("Fleet Manager", "Safety Officer"), createMaintenance);
router.get("/", isLoggedIn, authorizeRoles("Fleet Manager", "Safety Officer"), getMaintenances);
router.patch("/:id/close", isLoggedIn, authorizeRoles("Fleet Manager", "Safety Officer"), closeMaintenance);

module.exports = router;
