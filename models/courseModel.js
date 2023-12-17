import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  topics: {
    type: Array,
    required: true,
  },
  schedule: {
    startDate: {
      type: String,
    },
    endDate: {
      type: String,
    },
    classDays: {
      type: Array,
    },
    classTime: String,
  },
});

const CourseModel = mongoose.model("Course", courseSchema);

export default CourseModel;
