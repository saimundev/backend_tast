import joi from "joi";
import CourseModel from "../models/courseModel.js";

//create course
export const createCourse = async (req, res) => {
  const { name, description, price, duration, level, topics, schedule } =
    req.body;
  const { startDate, endDate, classDays, classTime } = schedule;

  //validation schema
  const validationSchema = joi.object({
    name: joi.string().min(5).max(200).required(),
    description: joi.string().min(5).max(500).required(),
    price: joi.number().required(),
    duration: joi.string().required(),
    level: joi.string().required(),
    topics: joi
      .array()
      .min(1)
      .message({ "array.min": "Topics can't be empty!" }),
    schedule: joi.object({
      startDate: joi.string().required(),
      endDate: joi.string().required(),
      classDays: joi
        .array()
        .min(1)
        .message({ "array.min": "Topics can't be empty!" }),
      classTime: joi.string().required(),
    }),
  });

  //validation error message
  const { error } = validationSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  try {
    //course save to the database
    await CourseModel.create(req.body);

    res.status(201).json({ message: "The course has been added successfully" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//get all course
export const getAllCourse = async (req, res) => {
  try {
    //course save to the database
    const course = await CourseModel.find({});
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

//get course by id
export const getCourseById = async (req, res) => {
  const { courseId } = req.params;
  try {
    const course = await CourseModel.findById({ _id: courseId });
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

//update  course
export const updateCourse = async (req, res) => {
  const { courseId } = req.params;

  try {
    await CourseModel.findByIdAndUpdate(
      { _id: courseId },
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({ message: "Course Update successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

//delete course
export const deleteCourse = async (req, res) => {
  const { courseId } = req.params;
  try {
    await CourseModel.findByIdAndDelete({ _id: courseId }, { new: true });
    res.status(200).json({ message: "Course Delete successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
