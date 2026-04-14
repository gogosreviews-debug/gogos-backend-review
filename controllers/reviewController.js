const Review = require("../models/Review");
const mongoose = require("mongoose");

const calculateAverageRating = (ratings = {}) => {
  const ratingValues = Object.values(ratings).filter(
    (value) => typeof value === "number" && !Number.isNaN(value)
  );

  if (!ratingValues.length) {
    return 0;
  }

  const total = ratingValues.reduce((sum, value) => sum + value, 0);
  return Number((total / ratingValues.length).toFixed(2));
};

// @desc    Submit a new review
// @route   POST /api/reviews
const submitReview = async (req, res) => {
  try {
    const { fullName, email, comment, ratings } = req.body;

    const review = await Review.create({ fullName, email, comment, ratings });
    const reviewObject = review.toObject();
    const averageRating = calculateAverageRating(reviewObject.ratings);

    return res.status(201).json({
      success: true,
      message: "Review submitted successfully.",
      data: {
        ...reviewObject,
        averageRating,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
      error: error.message,
    });
  }
};

// @desc    Get all reviews
// @route   GET /api/reviews
const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    const reviewsWithAverage = reviews.map((review) => {
      const reviewObject = review.toObject();
      return {
        ...reviewObject,
        averageRating: calculateAverageRating(reviewObject.ratings),
      };
    });

    const overallAverageRating = reviewsWithAverage.length
      ? Number(
          (
            reviewsWithAverage.reduce(
              (sum, review) => sum + review.averageRating,
              0
            ) / reviewsWithAverage.length
          ).toFixed(2)
        )
      : 0;

    return res.status(200).json({
      success: true,
      count: reviewsWithAverage.length,
      overallAverageRating,
      data: reviewsWithAverage,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
      error: error.message,
    });
  }
};

// @desc    Get single review by id
// @route   GET /api/reviews/:id
const getReviewById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid review id.",
      });
    }

    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found.",
      });
    }

    const reviewObject = review.toObject();
    const averageRating = calculateAverageRating(reviewObject.ratings);

    return res.status(200).json({
      success: true,
      data: {
        ...reviewObject,
        averageRating,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
      error: error.message,
    });
  }
};

// @desc    Delete review by id
// @route   DELETE /api/reviews/:id
const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid review id.",
      });
    }

    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found.",
      });
    }

    await review.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Review deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
      error: error.message,
    });
  }
};

module.exports = { submitReview, getReviews, getReviewById, deleteReview };
