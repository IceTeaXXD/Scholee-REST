import {
    getAssignmentBySid,
    getAssignment
} from '../controllers/assignment.controller'
import express from 'express'

const router = express.Router()

router.get("/assignment/:sid", getAssignmentBySid)
router.get("/assignment/:sid/:aid", getAssignment)

module.exports = router