import express from "express"
import {
  createAssignment,
  deleteAssignment
} from "../controllers/assignment.controller"

const router = express.Router()

router.post("/assignment", createAssignment)
router.delete("/assignment/:sid/:aid", deleteAssignment)

module.exports = router
