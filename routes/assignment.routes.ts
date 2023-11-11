import express from "express"
import {
    createAssignment,
    getAssignment,
    getAssignmentBySid
} from "../controllers/assignment.controller"

const router = express.Router()

router.post("/assignment/create", createAssignment)
router.get("/assignment/:sid/:aid", getAssignment)
router.get("/assignment/:sid", getAssignment)

router.get("/assignment/:sid", getAssignmentBySid)

module.exports = router
