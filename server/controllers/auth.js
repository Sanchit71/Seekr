import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../error.js";
import Jwt from "jsonwebtoken";

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
{
  // "@progress/kendo-react-charts": "^5.12.0",
  // "@progress/kendo-react-treeview": "^5.12.0",
  // "@syncfusion/ej2-base": "21.1.35",
  // "@syncfusion/ej2-buttons": "21.1.35",
  // "@syncfusion/ej2-calendars": "21.1.35",
  // "@syncfusion/ej2-cards": "16.2.45",
  // "@syncfusion/ej2-charts": "21.1.35",
  // "@syncfusion/ej2-circulargauge": "21.1.35",
  // "@syncfusion/ej2-compression": "21.1.35",
  // "@syncfusion/ej2-data": "21.1.35",
  // "@syncfusion/ej2-dropdowns": "21.1.36",
  // "@syncfusion/ej2-excel-export": "21.1.35",
  // "@syncfusion/ej2-file-utils": "21.1.35",
  // "@syncfusion/ej2-filemanager": "21.1.35",
  // "@syncfusion/ej2-grids": "21.1.35",
  // "@syncfusion/ej2-heatmap": "21.1.35",
  // "@syncfusion/ej2-inputs": "21.1.35",
  // "@syncfusion/ej2-kanban": "21.1.35",
  // "@syncfusion/ej2-layouts": "21.1.35",
  // "@syncfusion/ej2-lineargauge": "21.1.35",
  // "@syncfusion/ej2-lists": "21.1.35",
  // "@syncfusion/ej2-maps": "21.1.35",
  // "@syncfusion/ej2-navigations": "21.1.35",
  // "@syncfusion/ej2-notifications": "21.1.35",
  // "@syncfusion/ej2-pdf-export": "21.1.35",
  // "@syncfusion/ej2-pivotview": "21.1.35",
  // "@syncfusion/ej2-popups": "21.1.35",
  // "@syncfusion/ej2-richtexteditor": "21.1.35",
  // "@syncfusion/ej2-schedule": "21.1.35",
  // "@syncfusion/ej2-splitbuttons": "21.1.35",
  // "@syncfusion/ej2-spreadsheet": "21.1.35"
}
