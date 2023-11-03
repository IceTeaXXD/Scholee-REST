import express from "express";
import { scholarshipAcceptance, OrganizationRegistration } from "../controllers/soap.controller";

const router = express.Router();

router.post("/setAcceptance", scholarshipAcceptance);
router.get("/organizationRegis", OrganizationRegistration)

module.exports = router;