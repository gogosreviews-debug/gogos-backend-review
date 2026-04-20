const express = require("express");
const router = express.Router();

const {
  createWaiter,
  getWaiters,
  getWaiterNameIdList,
  getWaitersByName,
  getWaiterById,
  editWaiter,
  deleteWaiterById,
} = require("../controllers/waiterController");
const {
  createWaiterValidationRules,
  editWaiterValidationRules,
  validate,
} = require("../middlewares/waiterValidator");
const { protect, restrictTo } = require("../middlewares/authMiddleware");
const { blockAdminWhenCriticalAlertPending } = require("../middlewares/adminAlertMiddleware");

router.post("/", protect, blockAdminWhenCriticalAlertPending, restrictTo(10, 20), createWaiterValidationRules, validate, createWaiter);
router.get("/", protect, blockAdminWhenCriticalAlertPending, restrictTo(10, 20), getWaiters);
router.get("/name-id-list", protect, blockAdminWhenCriticalAlertPending, restrictTo(10, 20, 40), getWaiterNameIdList);
router.get("/search/by-name", protect, blockAdminWhenCriticalAlertPending, restrictTo(10, 20, 40), getWaitersByName);
router.get("/:id", protect, blockAdminWhenCriticalAlertPending, restrictTo(10, 20), getWaiterById);
router.put("/edit/:id", protect, blockAdminWhenCriticalAlertPending, restrictTo(10, 20), editWaiterValidationRules, validate, editWaiter);
router.put("/:id", protect, blockAdminWhenCriticalAlertPending, restrictTo(10, 20), editWaiterValidationRules, validate, editWaiter);
router.delete("/:id", protect, blockAdminWhenCriticalAlertPending, restrictTo(10, 20), deleteWaiterById);

module.exports = router;
