const express = require("express");
const authRoutes = require("./src/routes/auth.routes");
const vehicleRoutes = require("./src/routes/vehicle.routes");
const driverRoutes = require("./src/routes/driver.routes");
const tripRoutes = require("./src/routes/trip.routes");
const maintenanceRoutes = require("./src/routes/maintenance.routes");
const dashboardRoutes = require("./src/routes/dashboard.routes");
const fuelLogRoutes = require("./src/routes/fuelLog.routes");
const expenseRoutes = require("./src/routes/expense.routes");
const reportsRoutes = require("./src/routes/reports.routes");

const app = express();
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/vehicle", vehicleRoutes);
app.use("/api/driver", driverRoutes);
app.use("/api/trip", tripRoutes);
app.use("/api/maintenance", maintenanceRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/fuel", fuelLogRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/reports", reportsRoutes);

app.get("/", (req, res) => {
  res.send("hello world");
});

module.exports = app;
