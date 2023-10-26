import dotenv from "dotenv"
dotenv.config()

import express, { Request, Response, Express } from "express"
import cors from "cors"

const app = express()
const PORT = process.env.PORT || 3000

const defaultroute = require("./routes/default.routes")
const OrganizationRoute = require("./routes/organization.routes")

app.use(cors());
app.use(express.static("static"))
app.use(express.json())
app.use("/", defaultroute)
app.use("/api",OrganizationRoute)

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
})
