const mongoose = require("mongoose");
const Waiter = require("../models/Waiter");

const getValidatedWaiterId = (id) => mongoose.Types.ObjectId.isValid(id);

const createWaiter = async (req, res) => {
  try {
    const { fullName, phone, isActive, leftOn } = req.body;

    const waiter = await Waiter.create({
      fullName,
      phone,
      isActive: typeof isActive === "boolean" ? isActive : true,
      leftOn: leftOn || null,
      createdBy: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: "Waiter created successfully.",
      data: waiter,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
      error: error.message,
    });
  }
};

const getWaiters = async (req, res) => {
  try {
    const waiters = await Waiter.find()
      .populate("createdBy", "_id fullName email role")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: waiters.length,
      data: waiters,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
      error: error.message,
    });
  }
};

const getWaiterById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!getValidatedWaiterId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid waiter id.",
      });
    }

    const waiter = await Waiter.findById(id).populate("createdBy", "_id fullName email role");

    if (!waiter) {
      return res.status(404).json({
        success: false,
        message: "Waiter not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: waiter,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
      error: error.message,
    });
  }
};

const updateWaiterFullName = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName } = req.body;

    if (!getValidatedWaiterId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid waiter id.",
      });
    }

    const waiter = await Waiter.findById(id);

    if (!waiter) {
      return res.status(404).json({
        success: false,
        message: "Waiter not found.",
      });
    }

    waiter.fullName = fullName;
    await waiter.save();

    return res.status(200).json({
      success: true,
      message: "Waiter full name updated successfully.",
      data: waiter,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
      error: error.message,
    });
  }
};

const deleteWaiterById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!getValidatedWaiterId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid waiter id.",
      });
    }

    const waiter = await Waiter.findById(id);

    if (!waiter) {
      return res.status(404).json({
        success: false,
        message: "Waiter not found.",
      });
    }

    await waiter.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Waiter deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
      error: error.message,
    });
  }
};

module.exports = {
  createWaiter,
  getWaiters,
  getWaiterById,
  updateWaiterFullName,
  deleteWaiterById,
};
