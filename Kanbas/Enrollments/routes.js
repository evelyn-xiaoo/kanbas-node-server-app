import * as enrollmentsDao from "./dao.js";
import enrollments from "../Database/enrollments.js";
export default function AssignmentRoutes(app) {
    app.delete("/api/enrollments/:enrollmentId", (req, res) => {
        const { enrollmentId } = req.params;
        enrollmentsDao.deleteEnrollment(enrollmentId);
        res.sendStatus(204);
    });
}