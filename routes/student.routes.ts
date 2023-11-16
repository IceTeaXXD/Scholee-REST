import express from "express"
import {
  getUserPhpInfo,
  getStudentFromScholarship
} from "../controllers/student.controller"

const router = express.Router()

router.get("/user/:uid", getUserPhpInfo)
router.get("/scholarship/user/:sid", getStudentFromScholarship)

module.exports = router
