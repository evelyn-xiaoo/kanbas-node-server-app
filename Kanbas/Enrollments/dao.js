import model from "./model.js";

export async function findCoursesForUser(userId) {
    const enrollments = await model.find({ user: userId }).populate("course");
    return enrollments.map((enrollment) => enrollment.course);
   }

   export function enrollUserInCourse(user, course) {
    return model.create({ user, course });
   }

   export function unenrollUserFromCourse(user, course) {
    return model.deleteOne({ user, course });
   }

   export async function findUsersForCourse(courseId) {
    const enrollments = await model.find({ course: courseId }).populate("user");
    return enrollments.map((enrollment) => enrollment.user);
   }

   export function createEnrollment(enrollment) {
    delete enrollment._id
    return model.create(enrollment);
}
   
   
/*
export async function findEnrollmentsForUser(userId) {
    model.find({userId})
}
export function enrollUserInCourse(user, course) {
 return model.create({ user, course });
}


export function unenrollUserFromCourse(user, course) {
 return model.deleteOne({ user, course });
}



// idk if this goes here or in courses
export function findCoursesForEnrolledUser(userId) {
    const { courses, enrollments } = Database;
    const enrolledCourses = courses.filter((course) =>
    enrollments.some((enrollment) => enrollment.user === userId && enrollment.course === course._id));
    return enrolledCourses;
}
*/