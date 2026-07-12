const mongoose = require("mongoose");

const fuelLogSchema = new mongoose.Schema(
  {
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: [true, "Vehicle reference is required"],
    },

    liters: {
      type: Number,
      required: [true, "Fuel quantity in liters is required"],
      min: [0, "Liters cannot be negative"],
    },

    cost: {
      type: Number,
      required: [true, "Fuel cost is required"],
      min: [0, "Cost cannot be negative"],
    },

    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("FuelLog", fuelLogSchema);
