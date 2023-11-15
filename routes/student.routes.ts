import express from "express"
import {
    getUserPhpInfo,
} from "../controllers/student.controller"

const router = express.Router()

router.get("/user/:uid", getUserPhpInfo)


module.exports = router