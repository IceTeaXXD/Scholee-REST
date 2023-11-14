import express from "express"
import {
  createAssignment,
  updateAssignment,
  deleteAssignment
} from "../controllers/assignment.controller"

const router = express.Router()

router.post("/assignment", createAssignment)
router.patch("/assignment/:sid/:aid", updateAssignment)
router.delete("/assignment/:sid/:aid", deleteAssignment)

module.exports = router
