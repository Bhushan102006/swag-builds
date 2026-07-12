const express = require("express");
const authRoutes = require("./src/routes/auth.routes");
const vehicleRoutes = require("./src/routes/vehicle.routes");
const driverRoutes = require("./src/routes/driver.routes");
const app = express();
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/vehicle", vehicleRoutes);
app.use("/api/driver", driverRoutes);


app.get("/", (req, res) => {
  res.send("hello world");
});

module.exports = app;
