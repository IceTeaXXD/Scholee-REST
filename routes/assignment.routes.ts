import express from "express"
import {
  createAssignment,
} from "../controllers/assignment.controller"

const router = express.Router()

router.post("/assignment", createAssignment)

module.exports = router
