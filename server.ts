import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const defaultroute = require("./routes/default.routes");
const OrganizationRoute = require("./routes/organization.routes");
const ScholarshipRoute = require("./routes/scholarship.routes");
const UniversityRoute = require("./routes/university.routes");

app.use(cors());
app.use(express.static("static"));
app.use(express.json());
app.use("/", defaultroute);
app.use("/api", OrganizationRoute);
app.use("/api", ScholarshipRoute);
app.use("/api", UniversityRoute);

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
