import express from "express"
import {
    createAssignment,
    getAssignment,
    getAssignmentAll
} from "../controllers/assignment.controller"

const router = express.Router()

router.post("/assignment/create", createAssignment)
router.get("/assignment/:sid/:aid", getAssignment)
router.get("/assignment", getAssignmentAll)

module.exports = router
