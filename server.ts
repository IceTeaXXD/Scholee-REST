import verifyJWT from "./middleware/verifyJWT";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sync } from "./polling/polling";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const cookies = require("cookie-parser");

const defaultroute = require("./routes/default.routes");
const OrganizationRoute = require("./routes/organization.routes");
const ScholarshipRoute = require("./routes/scholarship.routes");
const UniversityRoute = require("./routes/university.routes");
const authRoute = require("./routes/auth.routes")
const soapRoute = require("./routes/soap.routes");

app.use(cors());
app.use(cookies());
app.use(express.static("static"));
app.use(express.json());
app.use("/", defaultroute);
app.use("/api", authRoute);
app.use(verifyJWT);
app.use("/api", soapRoute);
app.use("/api", UniversityRoute);
app.use("/api", ScholarshipRoute);
app.use("/api", OrganizationRoute);

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
    sync();
});
