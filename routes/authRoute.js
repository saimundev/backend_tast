import express from "express";
import { signIn, singUp } from "../controllers/authController.js";

const router = express.Router();

router.post("/sign-up", singUp);
router.post("/sign-in", signIn);

export default router;
