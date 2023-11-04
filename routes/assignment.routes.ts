import express from "express";
import { createAssignment, getAssignment } from "../controllers/assignment.controller";

const router = express.Router()

router.post("/assignment/create", createAssignment)
router.get("/assignment/:sid/:aid", getAssignment)

module.exports = router