const { body, validationResult } = require("express-validator");

const reviewValidationRules = [
  body("fullName")
    .trim()
    .notEmpty()
    .withMessage("Full name is required.")
    .isLength({ min: 3, max: 100 })
    .withMessage("Full name must be between 3 and 100 characters."),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Please provide a valid email address.")
    .isLength({ max: 150 })
    .withMessage("Email must not exceed 150 characters."),

  body("comment")
    .optional({ checkFalsy: true })
    .trim()
    .isString()
    .withMessage("Comment must be a valid text.")
    .isLength({ max: 150 })
    .withMessage("Comment must not exceed 150 characters."),

  body("ratings.foodQuality")
    .notEmpty()
    .withMessage("Food quality rating is required.")
    .isInt({ min: 0, max: 5 })
    .withMessage("Food quality rating must be an integer between 0 and 5."),

  body("ratings.service")
    .notEmpty()
    .withMessage("Service rating is required.")
    .isInt({ min: 0, max: 5 })
    .withMessage("Service rating must be an integer between 0 and 5."),

  body("ratings.ambiance")
    .notEmpty()
    .withMessage("Ambiance rating is required.")
    .isInt({ min: 0, max: 5 })
    .withMessage("Ambiance rating must be an integer between 0 and 5."),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }
  next();
};

module.exports = { reviewValidationRules, validate };
