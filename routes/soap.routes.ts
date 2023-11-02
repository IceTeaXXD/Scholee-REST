import express from "express";
import { OrganizationRegistration } from "../controllers/soap.controller";

const router = express.Router();

router.post("/orgRegister", OrganizationRegistration);

module.exports = router;