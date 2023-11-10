import express from "express"
import {
    handleGetRoles,
    handleLogin,
    handleLogout,
    handleRefreshToken
} from "../controllers/auth.controller"

const router = express.Router()

router.post("/login", handleLogin)
router.post("/logout", handleLogout)
router.get("/refresh", handleRefreshToken)
router.get("/roles", handleGetRoles)
module.exports = router
