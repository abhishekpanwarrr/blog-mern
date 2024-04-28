import express from "express";
import {
  createGoolgeUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { verifyUser } from "../middleware/verify.js";

const router = express.Router();
router.post("/google", createGoolgeUser);
router.put("/update/:userId", verifyUser, updateUser);
router.delete("/delete/:userId", verifyUser, deleteUser);
export default router;
