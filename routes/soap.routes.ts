import express from "express";
import { OrganizationRegistration, createUniversity } from "../controllers/soap.controller";

const router = express.Router();

router.post("/orgRegister", OrganizationRegistration);
router.post("/createUniversitySOAP", createUniversity);

module.exports = router;