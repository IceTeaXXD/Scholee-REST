import express from "express"
import { createOrganization } from "../controllers/organization.controller"

const router = express.Router()

router.post("/organization", createOrganization)

module.exports = router
