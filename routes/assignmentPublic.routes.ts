import {
    getAssignmentBySid
} from '../controllers/assignment.controller'
import express from 'express'

const router = express.Router()

router.get("/assignment/:sid", getAssignmentBySid)

module.exports = router