import express from "express"
import {
  createScholarship,
  getScholarships,
  getScholarship,
  updateScholarship,
  deleteScholarship,
  getAllScholarshipTypes,
  scholarshipCount,
  scholarshipAcceptance,
  getCountOfUser
} from "../controllers/scholarship.controller"

const router = express.Router()
router.post("/scholarship", createScholarship)
router.get("/scholarship", getScholarships)
router.get("/scholarship/:id", getScholarship)
router.patch("/scholarship/:id", updateScholarship)
router.delete("/scholarship/:id", deleteScholarship)
router.get("/scholarshiptype", getAllScholarshipTypes)
router.get("/scholarship/:id/count", getCountOfUser)
router.post("/scholarship/acceptance/:sid", scholarshipAcceptance)

module.exports = router
