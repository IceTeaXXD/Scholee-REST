import express from 'express';
import {
    getOrganizations,
    getOrganization,
    createOrganization,
    updateOrganization,
    deleteOrganization
} from '../controllers/organization.controller';

const router = express.Router()

router.get("/organization", getOrganizations)
router.get("/organization/:id", getOrganization)
router.post("/organization", createOrganization)
router.patch("/organization/:id", updateOrganization)
router.delete("/organization/:id", deleteOrganization)

module.exports = router