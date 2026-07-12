const express = require("express");
const { getDashboard } = require("../controllers/dashboard.controllers");

const router = express.Router();

router.get("/", getDashboard);

module.exports = router;
