const express = require("express");
const {
  createDriver,
  getDrivers,
  getDriverById,
  updateDriver,
  deleteDriver,
} = require("../controllers/driver.controllers");

const router = express.Router();

router.post("/", createDriver);
router.get("/", getDrivers);
router.get("/:id", getDriverById);
router.put("/:id", updateDriver);
router.delete("/:id", deleteDriver);

module.exports = router;
