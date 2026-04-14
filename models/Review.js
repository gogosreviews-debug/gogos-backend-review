const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 20,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 30,
    },
    comment: {
      type: String,
      trim: true,
      maxlength: 150,
      default: "",
    },
    ratings: {
      foodQuality: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
      },
      service: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
      },
      ambiance: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
      },
      environment: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
