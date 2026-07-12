const express = require("express");
const {
  createTrip,
  getTrips,
  getTripById,
  dispatchTrip,
  completeTrip,
  cancelTrip,
} = require("../controllers/trip.controllers");
const { isLoggedIn, authorizeRoles } = require("../middlewares/auth.middleware");

const router = express.Router();

// View: Dispatcher, Safety Officer
router.get("/", isLoggedIn, authorizeRoles("Dispatcher", "Safety Officer"), getTrips);
router.get("/:id", isLoggedIn, authorizeRoles("Dispatcher", "Safety Officer"), getTripById);

// Full: Dispatcher only
router.post("/", isLoggedIn, authorizeRoles("Dispatcher"), createTrip);
router.patch("/:id/dispatch", isLoggedIn, authorizeRoles("Dispatcher"), dispatchTrip);
router.patch("/:id/complete", isLoggedIn, authorizeRoles("Dispatcher"), completeTrip);
router.patch("/:id/cancel", isLoggedIn, authorizeRoles("Dispatcher"), cancelTrip);

module.exports = router;
