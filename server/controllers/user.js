import { createError } from "../error.js";
import User from "../models/User.js";

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
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

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

export const getHistory = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user.history);
  } catch (err) {
    next(err);
  }
};
