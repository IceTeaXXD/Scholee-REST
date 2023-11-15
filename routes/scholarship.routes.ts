import express from "express"
import {
    createScholarship,
    getScholarships,
    getScholarship,
    updateScholarship,
    deleteScholarship,
    getAllScholarshipTypes,
    scholarshipCount,
    scholarshipAcceptance
} from "../controllers/scholarship.controller"

const router = express.Router()
router.post("/scholarship", createScholarship)
router.get("/scholarship", getScholarships)
router.get("/scholarship/:id", getScholarship)
router.patch("/scholarship/:id", updateScholarship)
router.delete("/scholarship/:id", deleteScholarship)
router.get("/scholarshiptype", getAllScholarshipTypes)
router.get("/scholarship/:id/count", scholarshipCount)
router.post("/scholarship/:sid/accept", scholarshipAcceptance)

module.exports = router
