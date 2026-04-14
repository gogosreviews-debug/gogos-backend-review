const express = require("express");
const router = express.Router();

const { getDashboardStats } = require("../controllers/dashboardController");

// GET /api/dashboard — Returns total reviews count and average ratings
router.get("/", getDashboardStats);

module.exports = router;
