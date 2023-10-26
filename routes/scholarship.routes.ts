import express from 'express';
import {
    createScholarship,
    getScholarships,
    getScholarship,
    updateScholarship,
    deleteScholarship
} from '../controllers/scholarship.controller';

const router = express.Router()
router.post("/scholarship", createScholarship)
router.get("/scholarship", getScholarships)
router.get("/scholarship/:id", getScholarship)
router.patch("/scholarship/:id", updateScholarship)
router.delete("/scholarship/:id", deleteScholarship)
module.exports = router