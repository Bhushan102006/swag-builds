const mongoose = require("mongoose");

// Expose constants for statuses and types to make updates easier and reusable in controller validations
const VEHICLE_STATUSES = ["Available", "On Trip", "In Shop", "Retired"];
const VEHICLE_TYPES = [
  "Mini Truck",
  "Truck",
  "Van",
  "Pickup",
  "Container",
  "Trailer",
  "Bus",
  "Other",
];

const vehicleSchema = new mongoose.Schema(
  {
    registrationNumber: {
      type: String,
      required: [true, "Registration number is required"],
      unique: true,
      trim: true,
      uppercase: true,
      validate: {
        validator: function (v) {
          // Standard license plate validation: 4 to 15 characters, alphanumeric, optional hyphens or spaces
          return /^[A-Z0-9\-\s]{4,15}$/.test(v);
        },
        message: (props) =>
          `${props.value} is not a valid registration number structure! Use 4 to 15 characters, alphanumeric, spaces/hyphens.`,
      },
    },

    vehicleName: {
      type: String,
      required: [true, "Vehicle name is required"],
      trim: true,
    },

    vehicleType: {
      type: String,
      required: [true, "Vehicle type is required"],
      enum: {
        values: VEHICLE_TYPES,
        message: "{VALUE} is not a supported vehicle type",
      },
    },

    maxLoadCapacity: {
      type: Number,
      required: [true, "Maximum load capacity is required"],
      min: [0, "Maximum load capacity cannot be negative"],
    },

    odometer: {
      type: Number,
      required: [true, "Odometer reading is required"],
      default: 0,
      min: [0, "Odometer reading cannot be negative"],
    },

    acquisitionCost: {
      type: Number,
      required: [true, "Acquisition cost is required"],
      min: [0, "Acquisition cost cannot be negative"],
    },

    status: {
      type: String,
      required: [true, "Vehicle status is required"],
      enum: {
        values: VEHICLE_STATUSES,
        message: "{VALUE} is not a recognized vehicle status",
      },
      default: "Available",
    },
  },
  {
    timestamps: true,
  }
);

// Attach static lists for reusability outside of this model (e.g. in routes, controllers, middleware validation)
vehicleSchema.statics.VEHICLE_STATUSES = VEHICLE_STATUSES;
vehicleSchema.statics.VEHICLE_TYPES = VEHICLE_TYPES;

// Pre-save middleware to clean up registration number whitespaces
vehicleSchema.pre("save", async function () {
  if (this.isModified("registrationNumber") && this.registrationNumber) {
    // Normalise internal spaces: replace multiple spaces with a single space and trim
    this.registrationNumber = this.registrationNumber.replace(/\s+/g, " ").trim().toUpperCase();
  }
});

// Instance method to safe update odometer to prevent rollback issues
vehicleSchema.methods.updateOdometer = async function (newReading) {
  if (newReading < this.odometer) {
    throw new Error(
      `Odometer reading cannot be rolled back. Current reading is ${this.odometer}, attempted to update to ${newReading}.`
    );
  }
  this.odometer = newReading;
  return this.save();
};

// Instance method to check if vehicle is overdue/due for service based on service intervals
vehicleSchema.methods.needsService = function (lastServiceOdometer, interval = 10000) {
  if (typeof lastServiceOdometer !== "number" || lastServiceOdometer < 0) {
    lastServiceOdometer = 0;
  }
  return (this.odometer - lastServiceOdometer) >= interval;
};

module.exports = mongoose.model("Vehicle", vehicleSchema);
