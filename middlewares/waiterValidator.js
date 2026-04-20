const { body, validationResult } = require("express-validator");

const createWaiterValidationRules = [
  body("fullName")
    .trim()
    .notEmpty()
    .withMessage("Waiter full name is required.")
    .isLength({ min: 2, max: 100 })
    .withMessage("Waiter full name must be between 2 and 100 characters."),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required.")
    .matches(/^\d{11}$/)
    .withMessage("Phone number must be exactly 11 digits."),
];

const editWaiterValidationRules = [
  body("fullName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Waiter full name cannot be empty.")
    .isLength({ min: 2, max: 100 })
    .withMessage("Waiter full name must be between 2 and 100 characters."),

  body("phone")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Phone number cannot be empty.")
    .matches(/^\d{11}$/)
    .withMessage("Phone number must be exactly 11 digits."),
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

module.exports = {
  createWaiterValidationRules,
  editWaiterValidationRules,
  validate,
};
