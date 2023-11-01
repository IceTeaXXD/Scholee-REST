import express from "express";
import {
    createScholarship,
    getScholarships,
    getScholarship,
    updateScholarship,
    deleteScholarship,
} from "../controllers/scholarship.controller";

import {
    getAssignment,
} from "../controllers/assignment.controller";

const router = express.Router();
router.post("/scholarship", createScholarship);
router.get("/scholarship", getScholarships);
router.get("/scholarship/:id", getScholarship);
router.patch("/scholarship/:id", updateScholarship);
router.delete("/scholarship/:id", deleteScholarship);
router.get("/scholarsip/:sid/assignment/:aid", getAssignment);
router.post("/scholarsip/:sid/assignment", getAssignment);

module.exports = router;
