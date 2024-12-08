import mongoose from "mongoose";
const assignmentSchema = new mongoose.Schema(
 {
   title: String,
   course: { type: mongoose.Schema.Types.ObjectId, ref: "AssignmentModel" },
 },
 { collection: "assignments"}
);
export default assignmentSchema;