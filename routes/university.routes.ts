import express from "express"
import {
  getUniversities,
  getUniversity,
  updateUniversity,
  deleteUniversity,
  getUniversityStats
} from "../controllers/university.controller"

const router = express.Router()

router.get("/university", getUniversities)
router.get("/university/:id", getUniversity)
router.patch("/university/:id", updateUniversity)
router.delete("/university/:id", deleteUniversity)
router.get("/university/stats/:id", getUniversityStats)

module.exports = router
