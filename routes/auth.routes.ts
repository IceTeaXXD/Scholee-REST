import express, { Request, Response, Express } from "express";
import {
    handleLogin
} from "../controllers/authController";
const router = express.Router();

router.post('/login', handleLogin);

module.exports = router;