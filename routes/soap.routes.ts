import express from "express"
import { scholarshipAcceptance } from "../controllers/soap.controller"
const router = express.Router()

router.post("/setacceptance", scholarshipAcceptance)

module.exports = router
