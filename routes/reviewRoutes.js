const express = require("express");
const router = express.Router();

const { submitReview, getReviews, getReviewById, deleteReview } = require("../controllers/reviewController");
const { reviewValidationRules, validate } = require("../middlewares/reviewValidator");

// POST /api/reviews  — Submit a review
router.post("/", reviewValidationRules, validate, submitReview);

// GET  /api/reviews  — Fetch all reviews
router.get("/", getReviews);

// GET  /api/reviews/:id  — Fetch single review by id
router.get("/:id", getReviewById);

// DELETE /api/reviews/:id  — Delete review by id
router.delete("/:id", deleteReview);

module.exports = router;
