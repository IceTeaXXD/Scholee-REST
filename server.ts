import verifyJWT from "./middleware/verifyJWT"
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { sync } from "./polling/sync"
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const cookies = require("cookie-parser")

const defaultroute = require("./routes/default.routes")
const OrganizationRoute = require("./routes/organization.routes")
const publicOrganization = require("./routes/organizationPublic.routes")
const ScholarshipRoute = require("./routes/scholarship.routes")
const UniversityRoute = require("./routes/university.routes")
const AssignmentRoute = require("./routes/assignment.routes")
const authRoute = require("./routes/auth.routes")
const soapRoute = require("./routes/soap.routes")
const fileRoute = require("./routes/files.routes")
const publicFile = require("./routes/filesPublic.routes")
const publicAssignment = require("./routes/assignmentPublic.routes")
const publicUniversity = require("./routes/universityPublic.routes")
const studentRoute = require("./routes/student.routes")

app.use(
  cors({
    origin: [process.env.SPA_URL as any, process.env.MONOLITH_URL as any],
    credentials: true
  })
)
app.use(cookies())
app.use(express.static("static"))
app.use(express.json())
app.use("/", defaultroute)
app.use("/api", authRoute)
app.use("/api", soapRoute)
app.use("/api", publicFile)
app.use("/api", publicAssignment)
app.use("/api", publicOrganization)
app.use("/api", publicUniversity)
app.use("/api", studentRoute)
app.use(verifyJWT)
app.use("/api", UniversityRoute)
app.use("/api", ScholarshipRoute)
app.use("/api", OrganizationRoute)
app.use("/api", AssignmentRoute)
app.use("/api", fileRoute)

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
  sync()
})
