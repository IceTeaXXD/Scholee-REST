import express, { Request, Response, Express } from "express";
import {
    handleLogout
} from "../controllers/logoutController";
const router = express.Router();

router.post('/logout', handleLogout);

module.exports = router;