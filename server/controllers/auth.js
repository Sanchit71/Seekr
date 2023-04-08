import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../error.js";
import Jwt from "jsonwebtoken";

// This function is used to signup the user
export const signup = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const savedUser = await new User({ ...req.body, password: hash }).save();
    console.log(req.body);
    res.status(200).json(savedUser._doc);
  } catch (error) {
    next(error);
  }
};

// This function is used to signin the user
export const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.username });
    if (!user) {
      return next(createError(404, "User not Found"));
    }
    const isCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isCorrect) {
      return next(createError(400, "wrong password"));
    }

    const token = Jwt.sign({ id: user._id }, process.env.JWT);
    const { password, ...others } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  } catch (error) {
    next(error);
  }
};

// This function is used to signout the user
export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = Jwt.sign({ id: user._id }, process.env.JWT);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(user._doc);
    } else {
      const newUser = new User({
        ...req.body,
        fromGoogle: true,
      });

      const savedUser = await newUser.save();
      const token = Jwt.sign({ id: savedUser._id }, process.env.JWT);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(savedUser._doc);
    }
  } catch (error) {
    next(error);
  }
};
