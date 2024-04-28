import express from "express";
import {
  createGoolgeUser,
  updateUser,
} from "../controllers/user.controller.js";
import { verifyUser } from "../middleware/verify.js";

const router = express.Router();
router.post("/google", createGoolgeUser);
router.put("/update/:userId", verifyUser, updateUser);
export default router;
