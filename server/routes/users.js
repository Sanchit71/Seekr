import Express from "express";
import {
  update,
  Delete,
  getUser,
  postHistory,
  getHistory,
} from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";
const router = Express.Router();

router.put("/:id", update);
router.delete("/:id", verifyToken, Delete);
router.get("/find/:id", getUser);
router.get("/history/:id", getHistory);
router.put("/history/:id", postHistory);

export default router;
