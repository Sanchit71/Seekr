import Express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
const app = Express();
app.use(cors());
app.use(Express.json());
app.use(cookieParser());

const connect = () => {
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("connected to DB");
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
const PORT = process.env.PORT || 8802;

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "something went wrong";

  return res
    .status(status)
    .json({ success: false, status: status, message: message });
});

app.listen(PORT, () => {
  connect();
  console.log("connected!");
});
