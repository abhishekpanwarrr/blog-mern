import express from "express";
import { createGoolgeUser } from "../controllers/user.controller.js";

const router = express.Router();
router.post("/google", createGoolgeUser);
export default router;
