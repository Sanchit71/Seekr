import { createError } from "../error.js";
import User from "../models/User.js";

// This function is used to update the user
export const update = async (req, res, next) => {
  try {
    const updateUser = await User.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json(updateUser);
  } catch (err) {
    console.log(err);
  }
};

// This function is used to delete the user
export const Delete = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User Has been deleted");
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can delete your account only"));
  }
};

// This function is used to get the user
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// this function is used to post the history of the user video
export const postHistory = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        $push: { history: req.body },
      },
      { new: true }
    );
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// This function is used to get the history of the user
export const getHistory = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user.history);
  } catch (err) {
    next(err);
  }
};
