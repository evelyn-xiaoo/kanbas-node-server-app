import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as assignmentsDao from "../Assignments/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";
import * as quizDao from "../Quizzes/dao.js";

export default function CourseRoutes(app) {

    // COURSES

    app.get("/api/courses", async (req, res) => {
        const courses = await dao.findAllCourses();
        res.send(courses);
    });
    app.delete("/api/courses/:courseId", async (req, res) => {
        const { courseId } = req.params;
        await dao.deleteCourse(courseId);
        res.sendStatus(204);
    });
    app.put("/api/courses/:courseId", async (req, res) => {
        const { courseId } = req.params;
        const courseUpdates = req.body;
        await dao.updateCourse(courseId, courseUpdates);
        res.sendStatus(204);
    });

    app.post("/api/courses", async (req, res) => {
        const course = await dao.createCourse(req.body);
        res.json(course);
      });

    


      // MODULES

    app.get("/api/courses/:courseId/modules", async (req, res) => {
        const { courseId } = req.params;
        const modules = await modulesDao.findModulesForCourse(courseId);
        res.json(modules);
    });

    app.post("/api/courses/:courseId/modules", async (req, res) => {
        const { courseId } = req.params;
        const module = {
            ...req.body,
            course: courseId,
        };
        const newModule = await modulesDao.createModule(module);
        res.send(newModule);
    });


    // ASSIGNMENTS


    app.get("/api/courses/:courseId/Assignments", async (req, res) => {
        const { courseId } = req.params;
        const assignments = await assignmentsDao.findAssignmentsForCourse(courseId);
        res.json(assignments);
    });

    app.post("/api/courses/:courseId/Assignments", async (req, res) => {
        const { courseId } = req.params;
        const assignment = {
            ...req.body,
            course: courseId,
        };
        const newAssignment = await assignmentsDao.createAssignment(assignment);
        res.send(newAssignment);
    });

    

    // ENROLLMENTS
    app.post("/api/courses", async (req, res) => {
        const course = await dao.createCourse(req.body);
        const currentUser = req.session["currentUser"];
        if (currentUser) {
        await enrollmentsDao.enrollUserInCourse(currentUser._id, course._id);
        }
        res.json(course);
    });
           
        
      app.get("/api/courses/:cid/users", async (req, res) => {
        const { cid } = req.params;
        const users = await enrollmentsDao.findUsersForCourse(cid);
        res.json(users);
      });



      // QUIZZES
    app.post("/api/courses/:cid/quizzes", async (req, res) => {
        const { cid } = req.params;
        const quiz = {
          ...req.body,
          course: cid,
        };
        const newQuiz = await quizDao.createQuiz(quiz);
        res.send(newQuiz);
      });

      app.get("/api/courses/:cid/quizzes", async (req, res) => {
        const { cid } = req.params;
        const quizzes = await quizDao.findQuizzesForCourse(cid);
        res.json(quizzes);
      });
}