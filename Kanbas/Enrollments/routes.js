import * as enrollmentsDao from "./dao.js";

export default function AssignmentRoutes(app) {
    app.delete("/api/enrollments/:enrollmentId", async (req, res) => {
        const { enrollmentId } = req.params;
        await enrollmentsDao.deleteEnrollment(enrollmentId);
        res.sendStatus(204);
    });

    app.post("/api/users/:userId/enrollments", async (req, res) => {
        const { userId } = req.params;
        const enrollment = {
          ...req.body,
          user: userId,
        };
        const newEnrollment = await enrollmentsDao.createEnrollment(enrollment);
        res.send(newEnrollment);
      });
     
    app.put("/api/enrollments/:enrollmentId", async (req, res) => {
        const { enrollmentId } = req.params;
        const enrollmentUpdates = req.body;
        await enrollmentsDao.updateModule(enrollmentId, enrollmentUpdates);
        res.sendStatus(204);
    });

    app.get("/api/users/:userId/enrollments", async (req, res) => {
        const { userId } = req.params;
        const enrollments = await enrollmentsDao.findEnrollmentsForUser(userId);
        res.json(enrollments);
      });
}