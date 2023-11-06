import express from "express"
import {
    createUniversity,
    getUniversities,
    getUniversity,
    updateUniversity,
    deleteUniversity
} from "../controllers/university.controller"

const router = express.Router()

router.get("/university", getUniversities)
router.get("/university/:id", getUniversity)
router.post("/university", createUniversity)
router.patch("/university/:id", updateUniversity)
router.delete("/university/:id", deleteUniversity)

module.exports = router
