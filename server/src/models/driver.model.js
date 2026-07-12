const mongoose = require("mongoose");

const DRIVER_STATUSES = ["Available", "On Trip", "Off Duty", "Suspended"];

const driverSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Driver name is required"],
      trim: true,
    },

    licenseNumber: {
      type: String,
      required: [true, "License number is required"],
      unique: true,
      trim: true,
      uppercase: true,
    },

    licenseCategory: {
      type: String,
      required: [true, "License category is required"],
      trim: true,
    },

    licenseExpiryDate: {
      type: Date,
      required: [true, "License expiry date is required"],
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },

    safetyScore: {
      type: Number,
      default: 100,
      min: [0, "Safety score cannot be less than 0"],
      max: [100, "Safety score cannot exceed 100"],
    },

    status: {
      type: String,
      enum: {
        values: DRIVER_STATUSES,
        message: "{VALUE} is not a valid driver status",
      },
      default: "Available",
    },
  },
  {
    timestamps: true,
  }
);

// Expose statuses list as static for routes validation
driverSchema.statics.DRIVER_STATUSES = DRIVER_STATUSES;

// Helper instance method to check if license is expired
driverSchema.methods.isLicenseExpired = function () {
  if (!this.licenseExpiryDate) return false;
  return new Date() > this.licenseExpiryDate;
};

// Helper instance method to update safety score safely
driverSchema.methods.updateSafetyScore = async function (scoreDelta) {
  const newScore = this.safetyScore + scoreDelta;
  this.safetyScore = Math.max(0, Math.min(100, newScore));
  return this.save();
};

module.exports = mongoose.model("Driver", driverSchema);
