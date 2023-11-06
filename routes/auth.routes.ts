import express from "express"
import {
    handleLogin,
    handleLogout,
    handleRefreshToken
} from "../controllers/auth.controller"

const router = express.Router()

router.post("/login", handleLogin)
router.post("/logout", handleLogout)
router.get("/refresh", handleRefreshToken)

module.exports = router
