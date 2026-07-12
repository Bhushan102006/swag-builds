const express = require("express");
const {
  createMaintenance,
  getMaintenances,
  getMaintenanceById,
  closeMaintenance,
} = require("../controllers/maintenance.controllers");

const router = express.Router();

router.post("/", createMaintenance);
router.get("/", getMaintenances);
router.get("/:id", getMaintenanceById);
router.patch("/:id/close", closeMaintenance);

module.exports = router;
