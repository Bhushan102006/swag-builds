const mongoose = require("mongoose");

const TRIP_STATUSES = ["Draft", "Dispatched", "Completed", "Cancelled"];

const tripSchema = new mongoose.Schema(
  {
    source: {
      type: String,
      required: [true, "Source location is required"],
      trim: true,
    },

    destination: {
      type: String,
      required: [true, "Destination location is required"],
      trim: true,
    },

    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: [true, "Vehicle reference is required"],
    },

    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
      required: [true, "Driver reference is required"],
    },

    cargoWeight: {
      type: Number,
      required: [true, "Cargo weight is required"],
      min: [0, "Cargo weight cannot be negative"],
    },

    plannedDistance: {
      type: Number,
      required: [true, "Planned distance is required"],
      min: [0, "Planned distance cannot be negative"],
    },

    status: {
      type: String,
      enum: {
        values: TRIP_STATUSES,
        message: "{VALUE} is not a valid trip status",
      },
      default: "Draft",
    },

    dispatchDate: {
      type: Date,
    },

    completedDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Expose statuses as static
tripSchema.statics.TRIP_STATUSES = TRIP_STATUSES;

module.exports = mongoose.model("Trip", tripSchema);
