import mongoose from "mongoose";
const quizSchema = new mongoose.Schema(
 {
   title: String,
   course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel" },
 },
 { collection: "quizzes"}
);
export default quizSchema;