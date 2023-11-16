import express from "express"
import { createUniversity } from "../controllers/university.controller"

const router = express.Router()

router.post("/university", createUniversity)

module.exports = router
