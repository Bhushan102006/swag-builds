const express = require("express");
const {
  createTrip,
  getTrips,
  getTripById,
  dispatchTrip,
  completeTrip,
  cancelTrip,
} = require("../controllers/trip.controllers");

const router = express.Router();

router.post("/", createTrip);
router.get("/", getTrips);
router.get("/:id", getTripById);
router.patch("/:id/dispatch", dispatchTrip);
router.patch("/:id/complete", completeTrip);
router.patch("/:id/cancel", cancelTrip);

module.exports = router;
