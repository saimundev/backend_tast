import express from "express";
import {
  createCourse,
  deleteCourse,
  getAllCourse,
  getCourseById,
  updateCourse,
} from "../controllers/courseController.js";
import authCheck, { adminCheck } from "../middleware/authCheck.js";

const router = express.Router();

router.post("/create-course", authCheck, adminCheck, createCourse);
router.get("/getAll-course", getAllCourse);
router.get("/getCourse-byId/:courseId", getCourseById);
router.put("/update-course/:courseId", authCheck, adminCheck, updateCourse);
router.delete("/delete-course/:courseId", authCheck, adminCheck, deleteCourse);

export default router;
