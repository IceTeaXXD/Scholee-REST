import express from "express";
import {
    handleLogin,
    handleLogout
} from "../controllers/auth.controller";


const router = express.Router();

router.post('/login', handleLogin);
router.post('/logout', handleLogout);

module.exports = router;