const mongoose = require("mongoose");

const MAINTENANCE_STATUSES = ["Open", "Closed"];
const MAINTENANCE_TYPES = [
  "Routine Service",
  "Oil Change",
  "Tyre Replacement",
  "Brake Repair",
  "Engine Repair",
  "Electrical",
  "Body Repair",
  "Inspection",
  "Other",
];

const maintenanceSchema = new mongoose.Schema(
  {
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: [true, "Vehicle reference is required"],
    },

    maintenanceType: {
      type: String,
      required: [true, "Maintenance type is required"],
      enum: {
        values: MAINTENANCE_TYPES,
        message: "{VALUE} is not a valid maintenance type",
      },
    },

    cost: {
      type: Number,
      default: 0,
      min: [0, "Cost cannot be negative"],
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    status: {
      type: String,
      enum: {
        values: MAINTENANCE_STATUSES,
        message: "{VALUE} is not a valid maintenance status",
      },
      default: "Open",
    },

    startDate: {
      type: Date,
      required: [true, "Start date is required"],
      default: Date.now,
    },

    endDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

maintenanceSchema.statics.MAINTENANCE_STATUSES = MAINTENANCE_STATUSES;
maintenanceSchema.statics.MAINTENANCE_TYPES = MAINTENANCE_TYPES;

module.exports = mongoose.model("Maintenance", maintenanceSchema);
